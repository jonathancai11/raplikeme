import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Layout({ children, home }) {
  return (
    <div className="relative">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Learn how to build a personal website using Next.js" />
        <meta name="og:title" content="Site title." />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {/* <header>Navbar</header> */}
      <main>{children}</main>
      {!home && (
        <div className="absolute top-8 left-8">
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
