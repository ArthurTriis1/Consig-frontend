import axios from 'axios'

const SigService = axios.create({
  baseURL: 'http://localhost:1337'
})

export { SigService }
