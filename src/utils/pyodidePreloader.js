const PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/';

/**
 * Global cache objects on window to survive component remounts and SPA page navigation.
 * Eagerly preloads Pyodide runtime in browser idle time so PythonLab opens instantly.
 */
export function initGlobalPyodidePreloader() {
  if (typeof window === 'undefined') return;

  if (!window.__pyodide_global_instance && !window.__pyodide_global_promise) {
    const startPreload = () => {
      if (window.__pyodide_global_instance || window.__pyodide_global_promise) return;

      window.__pyodide_global_promise = (async () => {
        try {
          if (!window.loadPyodide) {
            const script = document.createElement('script');
            script.src = `${PYODIDE_CDN}pyodide.js`;
            script.async = true;
            await new Promise((resolve, reject) => {
              script.onload = resolve;
              script.onerror = reject;
              document.head.appendChild(script);
            });
          }
          const pyodide = await window.loadPyodide({ indexURL: PYODIDE_CDN });
          window.__pyodide_global_instance = pyodide;
          return pyodide;
        } catch (err) {
          console.warn('Pyodide background preloading failed:', err);
          window.__pyodide_global_promise = null;
          return null;
        }
      })();
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(startPreload, { timeout: 2500 });
    } else {
      setTimeout(startPreload, 1500);
    }
  }
}
