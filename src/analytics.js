import { GA_ID, isTrackingEnabled } from './config'

export function initAnalytics() {
  if (!isTrackingEnabled()) return () => {}

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)

  return () => {
    script.remove()
  }
}

export function track(name, params) {
  if (isTrackingEnabled() && typeof window.gtag === 'function') {
    window.gtag('event', name, params || {})
  }
}
