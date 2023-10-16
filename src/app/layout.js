import './globals.css'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Projeto TCC',
  description: 'Um projeto de gestão academica',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>{children}</body>
    </html>
  )
}
