// Defaults below; override in Cloudflare Pages with VITE_* env vars at build time.
// 1) WhatsApp: country code, no + or spaces (Indonesia = 62, drop leading 0).
export const WA_NUMBER = import.meta.env.VITE_WA_NUMBER || '6281770160126'

// 2) GA4 measurement ID (like G-ABCD123456). Leave placeholder to disable tracking.
export const GA_ID = import.meta.env.VITE_GA_ID || 'G-XXXXXXXXXX'

// 3) Email for requests. Set VITE_EMAIL="" in Cloudflare to hide the Email link.
export const EMAIL = import.meta.env.VITE_EMAIL ?? 'balidoctornow@gmail.com'

export const WA_TEXT = `Hi Bali Doctor Now, I need a doctor.

Name: 
Area: 
Hotel/Villa & room: 
Patient age: 
Symptoms: 
Since when: 
Allergies/medication (optional): 

Source: balidoctornow.com

I will send my location pin after this message.`

export const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT)}`

export const mailUrl = EMAIL
  ? `mailto:${EMAIL}?subject=${encodeURIComponent('Doctor request - Bali Doctor Now')}&body=${encodeURIComponent(WA_TEXT.replace(/\n/g, '\r\n'))}`
  : ''

export function isTrackingEnabled() {
  return /^G-[A-Z0-9]{6,}$/.test(GA_ID) && GA_ID !== 'G-XXXXXXXXXX'
}
