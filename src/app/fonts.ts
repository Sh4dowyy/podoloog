import localFont from 'next/font/local'
import { Montserrat } from 'next/font/google'

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-montserrat',
  display: 'swap',
})

export const calSans = localFont({
  src: [
    {
      path: '../../fonts/CalSans-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-heading',
  display: 'swap',
})


