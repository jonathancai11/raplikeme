interface IArtist {
  name: string
  slug: string
}

const artists: IArtist[] = [
  { name: 'Drake', slug: 'drake' },
  { name: 'Kanye West', slug: 'kanye-west' },
  { name: 'J. Cole', slug: 'j-cole' },
  { name: 'Jay Z', slug: 'jay-z' },
  { name: 'Mac Miller', slug: 'mac-miller' },
  { name: 'Lil Baby', slug: 'lil-baby' },
  { name: 'Gunna', slug: 'gunna' },
  { name: 'Polo G', slug: 'polo-g' },
  { name: 'Juice WRLD', slug: 'juice-wrld' },
  { name: 'The Kid Laroi', slug: 'the-kid-laroi' },
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
