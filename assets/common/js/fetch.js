// export const fetchData = (data, callback, album = false, artist = false) => {
//   let URL = "https://deezerdevs-deezer.p.rapidapi.com/"
//   if (album && artist) {
//     URL += `artist/${data}/albums`
//   } else if (album) {
//     URL += `album/${data}`
//   } else if (artist) {
//     URL += `artist/${data}`
//   } else {
//     URL += `search?q=${data}`
//   }
//   fetch(`${URL}`, {
//     method: "GET",
//     headers: {
//       "x-rapidapi-key": "0750e50bdfmsh5caa63f730b70d9p1a24d2jsn08753afd75e9",
//       "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//     },
//   })
//     .then((res) => res.json())
//     .then((fetchedData) => {
//       // console.log(fetchedData)
//       // ((artist && !album) || album)
//       //   ? callback(fetchedData)
//       //   : callback(fetchedData.data)
//       if (artist && album) {
//         callback(fetchedData.data)
//       } else if (!artist && !album) {
//         callback(fetchedData.data)
//       } else {
//         callback(fetchedData)
//       }
//     })
//     .catch((err) => {
//       console.log(err)
//       fetchData(data, album, artist, callback)
//     })
// }

// Fetch tracks by search query
// Response is an object containing a 'data' array of tracks
// Invokes callback with the 'data' array
export const fetchSearch = (query, callback) => {
  fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`, {
    headers: {
      "x-rapidapi-key": "7d208f71b8mshfd6cd40bfde572fp107ab9jsnfda73eb5809a",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then(res => res.json())
    .then(tracksObj => callback(tracksObj.data))
    .catch(err => {
      console.log(err)
      fetchSearch(query, callback)
    })
}

// Fetch artist by artist ID
// Response is an object containing the artist info
// Invokes callback with the object
export const fetchArtist = (artistId, callback) => {
  fetch(`https://deezerdevs-deezer.p.rapidapi.com/artist/${artistId}`, {
    headers: {
      "x-rapidapi-key": "7d208f71b8mshfd6cd40bfde572fp107ab9jsnfda73eb5809a",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then(res => res.json())
    .then(artistObj => callback(artistObj))
    .catch(err => {
      console.log(err)
      fetchArtist(artistId, callback)
    })
}

// Fetch artist's albums by artist ID
// Response is an object containing a 'data' array of albums
// Invokes callback with the 'data' array
export const fetchArtistAlbums = (artistId, callback) => {
  fetch(`https://deezerdevs-deezer.p.rapidapi.com/artist/${artistId}/albums`, {
    headers: {
      "x-rapidapi-key": "7d208f71b8mshfd6cd40bfde572fp107ab9jsnfda73eb5809a",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then(res => res.json())
    .then(albumsObj => callback(albumsObj.data))
    .catch(err => {
      console.log(err)
      fetchArtistAlbums(artistId, callback)
    })
}

// Fetch tracks by search query with artist name
// Response is an object containing a 'data' array of tracks
// Filters only the tracks whose artist is the required artist into an array
// Invokes callback with the filtered array
export const fetchArtistTracks = (artistName, callback) => {
  fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${artistName}`, {
    headers: {
      "x-rapidapi-key": "7d208f71b8mshfd6cd40bfde572fp107ab9jsnfda73eb5809a",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then(res => res.json())
    .then(tracksObj => callback(tracksObj.data.filter(track => track.artist.name.toLowerCase().includes(artistName.toLowerCase()))))
    .catch(err => {
      console.log(err)
      fetchArtistTracks(artistName, callback)
    })
}

// Fetch album by album ID
// Response is an object containing the album info
// Invokes callback with the object
export const fetchAlbum = (albumId, callback) => {
  fetch(`https://deezerdevs-deezer.p.rapidapi.com/album/${albumId}`, {
    headers: {
      "x-rapidapi-key": "7d208f71b8mshfd6cd40bfde572fp107ab9jsnfda73eb5809a",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then(res => res.json())
    .then(albumObj => callback(albumObj))
    .catch(err => {
      console.log(err)
      fetchAlbum(albumId, callback)
    })
}

// Fetch top radios
// Response is an object containing a 'data' array of radios
// Invokes callback with the 'data' array
export const fetchTopRadios = callback => {
  fetch(`https://deezerdevs-deezer.p.rapidapi.com/radio/top`, {
    headers: {
      "x-rapidapi-key": "7d208f71b8mshfd6cd40bfde572fp107ab9jsnfda73eb5809a",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then(res => res.json())
    .then(radiosObj => callback(radiosObj.data))
    .catch(err => {
      console.log(err)
      fetchTopRadios(callback)
    })
}

// Fetch radio's tracklist by radio ID
// Response is an object containing a 'data' array of tracks
// Invokes callback with the 'data' array
export const fetchRadioTracks = (radioId, callback) => {
  fetch(`https://deezerdevs-deezer.p.rapidapi.com/radio/${radioId}/tracks`, {
    headers: {
      "x-rapidapi-key": "7d208f71b8mshfd6cd40bfde572fp107ab9jsnfda73eb5809a",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then(res => res.json())
    .then(tracksObj => callback(tracksObj.data))
    .catch(err => {
      console.log(err)
      fetchRadioTracks(radioId, callback)
    })
}
