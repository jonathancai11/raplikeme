import Layout from '../components/layout'
import { getAllArtistIds, getArtistData } from '../lib/artists'
import { submitCompletion } from '../lib/openai'

export default function ArtistPage({ artistData }) {
  const onClick = () => {
    submitCompletion(artistData.name)
  }

  return (
    <Layout home={false}>
      <div className="text-center py-96">
        <h1>{artistData.name}</h1>
        <button onClick={onClick}>Generate Lyrics!</button>
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
