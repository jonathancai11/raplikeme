import { useState } from 'react'
import Layout from '../components/layout'
import { getAllArtistIds, getArtistData } from '../lib/artists'
import { submitCompletion } from '../lib/openai'

export default function ArtistPage({ artistData }) {
  const [lyrics, setLyrics] = useState()

  const onClick = async () => {
    const artistName = artistData.name
    const prompt = `This is lyrics to new rap song by ${artistName}. Most of the lines end with a word that rhymes with the last line.\n[Verse 1: ${artistName}]\n`
    const result = await submitCompletion(prompt)
    console.log({ result })
    setLyrics(result.text)
  }

  return (
    <Layout home={false}>
      <div className="text-center py-24">
        <h1>{artistData.name}</h1>
        <button onClick={onClick}>Generate Lyrics!</button>
        <div className="w-96 mx-auto">
          <p>{lyrics}</p>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllArtistIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const artistData = await getArtistData(params.slug)
  return {
    props: {
      artistData,
    },
  }
}
