import './globals.css'
import Providers from './providers'
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>

        <Providers>
          {children}
        </Providers>

        <Script
          src="https://checkout.culqi.com/js/v4"
          strategy="afterInteractive"
        />

      </body>
    </html>
  )
}