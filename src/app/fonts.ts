import localFont from 'next/font/local'

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


