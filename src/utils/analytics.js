export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}
