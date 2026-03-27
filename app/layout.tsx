import type { Metadata } from "next";
import Header from '../components/layout/Header'
import DefaultLayout from '../components/layout/DefaultLayout'
import Footer from '../components/layout/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vivo Fibra - A Melhor Internet Banda Larga da América Latina',
  description: 'A Melhor Internet Banda Larga da América Latina',
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        <DefaultLayout>
          {children}
          <Footer/>
        </DefaultLayout>
      </body>
    </html>
  )
}