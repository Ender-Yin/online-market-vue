import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: 'http://localhost:3000/'
    //baseURL: 'https://donationweb-ssd-nodeserver.herokuapp.com/'
    //baseURL:'https://online-market-api-prod.herokuapp.com/'
  })
}
