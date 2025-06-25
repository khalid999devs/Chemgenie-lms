import { useEffect } from 'react';
import { env } from '../assets/requests';

const useContentProtection = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (env === 'development') return;

    const overlay = document.createElement('div');
    overlay.id = 'content-protection-overlay';
    Object.assign(overlay.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'black',
      opacity: '0.9',
      zIndex: '999999',
      pointerEvents: 'none',
      display: 'none',
      transition: 'all 0.2s ease-in-out',
    });
    document.body.appendChild(overlay);

    const showOverlay = () => {
      overlay.style.display = 'block';
    };

    const hideOverlay = () => {
      overlay.style.display = 'none';
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();

      // Disable DevTools shortcuts
      if (
        (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(key)) || // Ctrl+Shift+I/J/C
        (e.metaKey && e.altKey && ['i', 'j', 'c'].includes(key)) || // Cmd+Opt+I/J/C on Mac
        e.key === 'F12' || // F12
        (e.ctrlKey && key === 'u') // Ctrl+U
      ) {
        e.preventDefault();
        alert('Developer tools are disabled.');
      }

      if (key === 'printscreen') {
        showOverlay();
        setTimeout(hideOverlay, 1000);
      }
    };

    const handleWindowBlur = () => {
      showOverlay();
    };

    const handleWindowFocus = () => {
      hideOverlay();
    };

    // Attach all listeners
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      // Cleanup
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      const el = document.getElementById('content-protection-overlay');
      if (el) el.remove();
    };
  }, []);
};

export default useContentProtection;
