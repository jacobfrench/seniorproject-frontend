import axios from 'axios'

const url = "http://45.33.39.105:8080";

const instance = axios.create({
  baseURL: url
});

export default instance;