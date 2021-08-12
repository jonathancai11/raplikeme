interface IArtist {
  name: string
  slug: string
}

const artists: IArtist[] = [
  { name: 'Mac Miller', slug: 'mac-miller' },
  { name: 'Lil Baby', slug: 'lil-baby' },
]

const artistData = artists.reduce((arr, artist) => {
  return {
    ...arr,
    [artist.slug]: artist,
  }
}, {})

export function getSortedArtistsData() {
  return artistData
}

export function getAllArtistIds() {
  return artists.map(({ slug }) => {
    return {
      params: {
        slug,
      },
    }
  })
}

export async function getArtistData(slug) {
  return artistData[slug]
}
