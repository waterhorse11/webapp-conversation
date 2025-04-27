import './styles/globals.css'
import './styles/markdown.scss'
import dynamic from 'next/dynamic'

// 完全禁用SSR，使用客户端渲染
const ClientRootNoSSR = dynamic(() => import('./components/ClientRoot'), {
  ssr: false,
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/WAC-LOGO.svg" />
      </head>
      <body className="h-full">
        <ClientRootNoSSR>
          {children}
        </ClientRootNoSSR>
      </body>
    </html>
  )
}
