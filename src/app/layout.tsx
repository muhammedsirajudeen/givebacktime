import './globals.css'
import Navbar from '@/Navbar/Navbar'
export const metadata = {
  title: 'Givebacktime Donate your time and skills',
  description: 'Sustainable development for the betterment of society',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <Navbar/>
      {children}
      </body>
    </html>
  )
}
