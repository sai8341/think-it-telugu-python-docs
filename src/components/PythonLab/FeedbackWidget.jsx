import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function FeedbackWidget() {
  const { siteConfig } = useDocusaurusContext();
  const [showFeedbackCard, setShowFeedbackCard] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(null); // 'like' | 'dislike' | null
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedbackSubmit = async () => {
    if (!feedbackRating) return;

    const payload = {
      event: 'python_lab_feedback',
      category: 'Feedback',
      action: 'Submit Feedback',
      label: feedbackRating, // 'like' or 'dislike'
      value: feedbackComment,
      pagePath: typeof window !== 'undefined' ? window.location.pathname : '',
      timestamp: new Date().toISOString()
    };

    // Track in Google Analytics dataLayer
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(payload);
    }

    // Call Webhook if configured in docusaurus.config.js customFields
    const webhookUrl = siteConfig.customFields?.feedbackWebhookUrl;
    if (webhookUrl) {
      try {
        fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }).catch(err => console.error('Feedback webhook fetch error:', err));
      } catch (e) {
        console.error('Feedback webhook setup error:', e);
      }
    }

    setFeedbackSubmitted(true);

    // Auto-close feedback card after 2.5 seconds and reset form
    setTimeout(() => {
      setShowFeedbackCard(false);
      setTimeout(() => {
        setFeedbackSubmitted(false);
        setFeedbackRating(null);
        setFeedbackComment('');
      }, 300);
    }, 2500);
  };

  return (
    <div className="pylab-feedback-widget">
      {showFeedbackCard && (
        <div className="pylab-feedback-card">
          {feedbackSubmitted ? (
            <div className="pylab-feedback-success">
              <span className="pylab-feedback-success-icon">🎉</span>
              <h4>Got it!</h4>
              <p>Thanks for helping us improve.</p>
            </div>
          ) : (
            <div className="pylab-feedback-form">
              <h4>Help us improve! 📝</h4>
              <p>Did you like this Python Lab?</p>

              <div className="pylab-feedback-rating">
                <button
                  className={`pylab-rating-btn pylab-rating-like ${feedbackRating === 'like' ? 'active' : ''}`}
                  onClick={() => setFeedbackRating('like')}
                  title="Like 👍"
                  aria-label="Like"
                >
                  👍
                </button>
                <button
                  className={`pylab-rating-btn pylab-rating-dislike ${feedbackRating === 'dislike' ? 'active' : ''}`}
                  onClick={() => setFeedbackRating('dislike')}
                  title="Dislike 👎"
                  aria-label="Dislike"
                >
                  👎
                </button>
              </div>

              <textarea
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                placeholder="Any suggestions? Let us know what you think... (Optional)"
                rows="3"
              />

              <div className="pylab-feedback-actions">
                <button
                  className="pylab-feedback-cancel"
                  onClick={() => setShowFeedbackCard(false)}
                >
                  Not Now
                </button>
                <button
                  className="pylab-feedback-submit"
                  onClick={handleFeedbackSubmit}
                  disabled={!feedbackRating}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <button
        className="pylab-feedback-toggle-btn"
        onClick={() => setShowFeedbackCard(prev => !prev)}
        title="Give Feedback"
        aria-label="Give Feedback"
      >
        💬 Feedback
      </button>
    </div>
  );
}
