import './globals.css'
import Auth0Provider from '../context/AuthContext';
import LoadingProvider from '../context/LoadingProvider';
import ToastProvider from '../context/ToastProvider';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LoadingProvider>
        <ToastProvider>
          <Auth0Provider>
            {children}
          </Auth0Provider>
        </ToastProvider>
        </LoadingProvider>
      </body>
    </html>
  )
}