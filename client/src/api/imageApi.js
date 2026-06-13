import axios from 'axios'

export async function fetchImages() {
  const response = await axios.get("http://localhost:2000/fetchUrl")
  return response.data
}

export async function uploadImage(url) {
  const response = await axios.post("http://localhost:2000/upload", { url })
  return response.data
}