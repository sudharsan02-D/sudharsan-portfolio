import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import AIChat from "@/components/AIChat"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sudharsan M - Computer Science Engineering Student",
  description: "Portfolio of Sudharsan M - Computer Science Engineering Student",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <AIChat />
      </body>
    </html>
  )
}
