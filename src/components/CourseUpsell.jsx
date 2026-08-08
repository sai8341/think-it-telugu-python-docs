import React from 'react';
import Link from '@docusaurus/Link';

export default function CourseUpsell({ title, description, url = "https://thinkittelugu.graphy.com" }) {
  return (
    <div className="course-upsell-banner">
      <h3 className="course-upsell-title">{title || "Unlock the Full Video Course"}</h3>
      <p className="course-upsell-desc">
        {description || "Enjoying this written guide? Get access to our structured Video Lectures, real-world Assignments, and Coding Practice sessions in the Premium Course."}
      </p>
      <div className="course-upsell-features">
        <span className="course-upsell-feature">Video Lectures</span>
        <span className="course-upsell-feature">Assignments & MCQs</span>
        <span className="course-upsell-feature">Coding Practice Sessions</span>
        <span className="course-upsell-feature">Doubt Solving Sessions</span>
        <span className="course-upsell-feature">Mentorship</span>
      </div>
      <Link href={url} className="course-upsell-button">
        Enroll Now
      </Link>
    </div>
  );
}
