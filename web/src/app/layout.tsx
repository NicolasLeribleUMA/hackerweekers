import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Botijo",
    template: "%s | Botijo"
  },
  description: 'Generated with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
