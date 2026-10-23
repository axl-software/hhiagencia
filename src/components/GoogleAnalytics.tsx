import Script from 'next/script'
import { GA_ID } from '@/lib/google'

/* Google Analytics 4. Solo se carga si existe NEXT_PUBLIC_GA_ID (ver .env.example).
   Modo de consentimiento: el almacenamiento de analítica parte DENEGADO, así que no se guardan cookies de Google en el
   navegador del visitante. Si más adelante se agrega un aviso de cookies, basta con llamar a
   gtag('consent', 'update', { analytics_storage: 'granted' }) cuando la persona acepte. */
export default function GoogleAnalytics() {
  if (!GA_ID) return null
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  )
}
