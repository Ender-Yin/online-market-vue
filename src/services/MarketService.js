import Api from '@/services/api'

export default {
  fetchThings () {
    return Api().get('/things')
  }
}
