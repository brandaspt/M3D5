export const fetchData = (data, callback, album = false, artist = false) => {
  let URL = "https://deezerdevs-deezer.p.rapidapi.com/"
  if (album && artist) {
    URL += `artist/${data}/albums`
  } else if (album) {
    URL += `album/${data}`
  } else if (artist) {
    URL += `artist/${data}`
  } else {
    URL += `search?q=${data}`
  }
  fetch(`${URL}`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "0750e50bdfmsh5caa63f730b70d9p1a24d2jsn08753afd75e9",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((res) => res.json())
    .then((fetchedData) => {
      // console.log(fetchedData)
      // ((artist && !album) || album)
      //   ? callback(fetchedData)
      //   : callback(fetchedData.data)
      if (artist && album) {
        callback(fetchedData.data)
      } else if (!artist && !album) {
        callback(fetchedData.data)
      } else {
        callback(fetchedData)
      }
    })
    .catch((err) => {
      console.log(err)
      // fetchData(data, album, artist, callback)
    })
}
