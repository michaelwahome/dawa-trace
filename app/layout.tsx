import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Web3ModalProvider } from "@/context/Web3Modal";
import { SessionProvider } from '@/context/SessionContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dawa Trace',
  description: 'Ethereum Blockchain Based Pharmaceutical Supply Chain Web Application System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3ModalProvider>
          <SessionProvider>{children}</SessionProvider>
        </Web3ModalProvider>
      </body>
    </html>
  )
}
