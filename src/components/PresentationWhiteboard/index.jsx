import React, { useRef, useState, useEffect } from 'react';
import './styles.css';

// GoodNotes Laser Pen Color Presets (matching the hollow laser beam in the user's image)
const LASER_COLORS = {
  red: { stroke: '#FF1E56', core: '#FFE4EC', glow: '#FF1E56' },
  cyan: { stroke: '#00F5D4', core: '#E0FFFF', glow: '#00F5D4' },
  yellow: { stroke: '#FFE600', core: '#FFFFE0', glow: '#FFE600' },
};

// Inactivity threshold: All letters stay 100% alive together while writing.
// Fade only starts after 1400ms of complete pen inactivity.
const SESSION_IDLE_TIMEOUT_MS = 1400;
const FADE_DURATION_MS = 850;

export default function PresentationWhiteboard({ onExit }) {
  const canvasRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [currentColorKey, setCurrentColorKey] = useState('red');

  // Active strokes and session lifecycle refs
  const strokesRef = useRef([]); // Array of { points: [{x,y}], colorKey }
  const currentStrokeRef = useRef(null);
  const isPenDownRef = useRef(false);
  const lastActiveTimeRef = useRef(performance.now());
  const animFrameIdRef = useRef(null);

  // Click vs Draw distinction ref
  const pointerStartRef = useRef(null); // { x, y, time, targetZoomable, targetInteractive }
  const lastHoveredZoomableRef = useRef(null);

  // Helper to find clickable elements beneath the canvas overlay
  const findUnderlyingTargets = (clientX, clientY) => {
    const elements = document.elementsFromPoint(clientX, clientY) || [];
    let targetZoomable = null;
    let targetInteractive = null;

    for (let el of elements) {
      if (el === canvasRef.current) continue;

      if (!targetZoomable) {
        if (el.classList?.contains('zoomable-image-wrapper')) {
          targetZoomable = el;
        } else if (el.closest?.('.zoomable-image-wrapper')) {
          targetZoomable = el.closest('.zoomable-image-wrapper');
        } else if (el.tagName === 'IMG' && el.classList?.contains('zoomable-image')) {
          targetZoomable = el.closest('.zoomable-image-wrapper') || el;
        }
      }

      if (!targetInteractive) {
        if (el.tagName === 'BUTTON' || el.tagName === 'A' || el.classList?.contains('quiz-option-btn')) {
          targetInteractive = el;
        } else if (el.closest?.('button') || el.closest?.('a') || el.closest?.('.quiz-option-btn')) {
          targetInteractive = el.closest('button') || el.closest('a') || el.closest('.quiz-option-btn');
        }
      }
    }

    return { targetZoomable, targetInteractive };
  };

  // Resize canvas to cover window with high DPI
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (lastHoveredZoomableRef.current) {
        lastHoveredZoomableRef.current.classList.remove('presentation-hover');
      }
    };
  }, []);

  // Continuous 60/120fps GoodNotes Laser Render Loop with Session Memory
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = () => {
      const now = performance.now();
      const dpr = window.devicePixelRatio || 1;

      // Clear Canvas
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      // Determine session opacity
      let groupAlpha = 1.0;

      if (isPenDownRef.current) {
        groupAlpha = 1.0;
        lastActiveTimeRef.current = now; // keep session refreshed while writing
      } else {
        const timeSinceLastAction = now - lastActiveTimeRef.current;
        if (timeSinceLastAction <= SESSION_IDLE_TIMEOUT_MS) {
          groupAlpha = 1.0;
        } else {
          // After idle timeout, all strokes fade away smoothly together
          const fadeElapsed = timeSinceLastAction - SESSION_IDLE_TIMEOUT_MS;
          groupAlpha = Math.max(0, 1.0 - (fadeElapsed / FADE_DURATION_MS));

          // When fully faded, clear memory
          if (groupAlpha <= 0) {
            strokesRef.current = [];
            currentStrokeRef.current = null;
          }
        }
      }

      if (groupAlpha > 0.01 && strokesRef.current.length > 0) {
        const strokes = strokesRef.current;

        for (let s = 0; s < strokes.length; s++) {
          const stroke = strokes[s];
          const points = stroke.points;
          if (!points || points.length === 0) continue;

          const colorConfig = LASER_COLORS[stroke.colorKey] || LASER_COLORS.red;

          // Single Point / Dot tap
          if (points.length === 1) {
            ctx.save();
            ctx.globalAlpha = groupAlpha;
            ctx.shadowColor = colorConfig.glow;
            ctx.shadowBlur = 4;
            ctx.fillStyle = colorConfig.stroke;
            ctx.beginPath();
            ctx.arc(points[0].x, points[0].y, 3.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.shadowBlur = 0;
            ctx.fillStyle = colorConfig.core;
            ctx.beginPath();
            ctx.arc(points[0].x, points[0].y, 1.6, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            continue;
          }

          // --- Pass 1: Outer Crisp Neon Red Line (Like GoodNotes) ---
          ctx.save();
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.globalAlpha = groupAlpha * 0.95;
          ctx.strokeStyle = colorConfig.stroke;
          ctx.lineWidth = 5.5;
          ctx.shadowColor = colorConfig.glow;
          ctx.shadowBlur = 4;

          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);

          for (let i = 1; i < points.length - 1; i++) {
            const midX = (points[i].x + points[i + 1].x) / 2;
            const midY = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
          }

          const lastPoint = points[points.length - 1];
          ctx.lineTo(lastPoint.x, lastPoint.y);
          ctx.stroke();
          ctx.restore();

          // --- Pass 2: High-Precision Bright Center Core (Laser Beam) ---
          ctx.save();
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.globalAlpha = groupAlpha * 0.98;
          ctx.strokeStyle = colorConfig.core;
          ctx.lineWidth = 2.0;
          ctx.shadowBlur = 0;

          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);

          for (let i = 1; i < points.length - 1; i++) {
            const midX = (points[i].x + points[i + 1].x) / 2;
            const midY = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
          }

          ctx.lineTo(lastPoint.x, lastPoint.y);
          ctx.stroke();
          ctx.restore();
        }
      }

      ctx.restore();
      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  // Pointer / Pen Tablet Event Handlers
  const handlePointerDown = (e) => {
    if (!isEnabled) return;

    // Detect if clicking on a zoomable image or interactive component underneath
    const { targetZoomable, targetInteractive } = findUnderlyingTargets(e.clientX, e.clientY);

    pointerStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: performance.now(),
      targetZoomable,
      targetInteractive,
    };

    isPenDownRef.current = true;
    lastActiveTimeRef.current = performance.now();

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newStroke = {
      colorKey: currentColorKey,
      points: [{ x, y }],
    };

    currentStrokeRef.current = newStroke;
    strokesRef.current.push(newStroke);
  };

  const handlePointerMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // When pen is UP: handle interactive hover feedback (cursor and badge)
    if (!isPenDownRef.current) {
      if (isEnabled) {
        const { targetZoomable } = findUnderlyingTargets(e.clientX, e.clientY);

        if (lastHoveredZoomableRef.current && lastHoveredZoomableRef.current !== targetZoomable) {
          lastHoveredZoomableRef.current.classList.remove('presentation-hover');
        }

        if (targetZoomable) {
          targetZoomable.classList.add('presentation-hover');
          lastHoveredZoomableRef.current = targetZoomable;
          canvas.style.cursor = 'zoom-in';
        } else {
          lastHoveredZoomableRef.current = null;
          canvas.style.cursor = 'crosshair';
        }
      }
      return;
    }

    if (!currentStrokeRef.current || !isEnabled) return;
    lastActiveTimeRef.current = performance.now();
    const rect = canvas.getBoundingClientRect();

    // Capture ultra-smooth high-frequency pen stylus points
    if (e.getCoalescedEvents) {
      const coalesced = e.getCoalescedEvents();
      for (let i = 0; i < coalesced.length; i++) {
        const ev = coalesced[i];
        currentStrokeRef.current.points.push({
          x: ev.clientX - rect.left,
          y: ev.clientY - rect.top,
        });
      }
    } else {
      currentStrokeRef.current.points.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handlePointerUp = (e) => {
    if (pointerStartRef.current) {
      const { x, y, time, targetZoomable, targetInteractive } = pointerStartRef.current;
      const distance = Math.hypot(e.clientX - x, e.clientY - y);
      const duration = performance.now() - time;

      // Click / Tap detection: minimal movement (<10px) and fast (<450ms)
      if (distance < 10 && duration < 450) {
        if (targetZoomable) {
          // Remove temporary single-dot stroke created on pointer down
          if (strokesRef.current.length > 0 && currentStrokeRef.current === strokesRef.current[strokesRef.current.length - 1]) {
            strokesRef.current.pop();
          }
          currentStrokeRef.current = null;
          isPenDownRef.current = false;
          pointerStartRef.current = null;

          // Open zoom lightbox
          targetZoomable.click();
          return;
        } else if (targetInteractive) {
          // Remove temporary single-dot stroke
          if (strokesRef.current.length > 0 && currentStrokeRef.current === strokesRef.current[strokesRef.current.length - 1]) {
            strokesRef.current.pop();
          }
          currentStrokeRef.current = null;
          isPenDownRef.current = false;
          pointerStartRef.current = null;

          targetInteractive.click();
          return;
        }
      }
    }

    isPenDownRef.current = false;
    lastActiveTimeRef.current = performance.now();
    currentStrokeRef.current = null;
    pointerStartRef.current = null;
  };

  // Keyboard Shortcuts for Instructor
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isInput = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA';
      if (isInput) return;

      const key = e.key.toLowerCase();

      // Intercept Ctrl + Shift + D to prevent Chrome "Bookmark all tabs" popup
      if (e.ctrlKey && e.shiftKey && key === 'd') {
        e.preventDefault();
        e.stopPropagation();
        setIsEnabled((prev) => !prev);
        return;
      }

      // Single key 'D' or 'Alt + D': Toggle Laser Pen ON / OFF
      if (key === 'd' || (e.altKey && key === 'd')) {
        e.preventDefault();
        setIsEnabled((prev) => !prev);
      }
      // Single key 'S': Switch to Scroll / Pointer mode
      else if (key === 's') {
        e.preventDefault();
        setIsEnabled(false);
      }
      // 'C': Instant Clear
      else if (key === 'c') {
        e.preventDefault();
        strokesRef.current = [];
        currentStrokeRef.current = null;
      }
      // '1': Neon Red (GoodNotes default)
      else if (key === '1') {
        setCurrentColorKey('red');
        setIsEnabled(true);
      }
      // '2': Neon Cyan
      else if (key === '2') {
        setCurrentColorKey('cyan');
        setIsEnabled(true);
      }
      // '3': Neon Yellow
      else if (key === '3') {
        setCurrentColorKey('yellow');
        setIsEnabled(true);
      }
      // Escape: Exit Presentation Mode
      else if (key === 'Escape') {
        if (onExit) onExit();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [onExit]);

  return (
    <div className="goodnotes-laser-root">
      {/* 100% Clean Canvas Overlay (Zero Toolbar Clutter) */}
      <canvas
        ref={canvasRef}
        className={`goodnotes-laser-canvas ${isEnabled ? 'laser-enabled' : 'laser-disabled'}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />
    </div>
  );
}
