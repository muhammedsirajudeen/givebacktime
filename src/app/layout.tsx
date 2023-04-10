import './globals.css'
import Navbar from '@/Components/Navbar/Navbar'
import { Providers } from '@/State/Providers'


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
      <Providers>{children}</Providers>
      </body>
    </html>
  )
}
