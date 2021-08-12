import { useState } from 'react'
import Layout from '../components/layout'
import { getSortedArtistsData } from '../lib/artists'
import Link from 'next/link'
import Date from '../components/date'

export default function Home({ artistData }) {
  return (
    <Layout home>
      <div className="text-center py-96">
        <ul>
          {Object.keys(artistData).map((slug, i) => (
            <li key={i}>
              <Link href={`/${slug}`}>
                <a>{artistData[slug].name}</a>
              </Link>
              <br />
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const artistData = getSortedArtistsData()
  return {
    props: {
      artistData,
    },
  }
}
