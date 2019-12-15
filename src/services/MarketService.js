import Api from '@/services/api'

export default {
  fetchThings () {
    return Api().get('/things')
  },
  fetchAThing (id) {
    return Api().get(`/things/${id}`)
  },
  fetchAThingByUsername (username){
    return Api().get(`/things/users/${username}`)
  },
  fetchInvoices () {
    return Api().get('/invoices')
  },
  fetchAInvoice (id) {
    return Api().get(`/invoices/${id}`)
  },
  postAThing (thing) {
    return Api().post('/things', thing,
      { headers: {'Content-type': 'application/json'} })
  },
  editAThing (id, thing) {
    console.log('REQUESTING ' + thing._id + ' ' +
      JSON.stringify(thing, null, 5))
    return Api().put(`/things/${id}`, thing,
      { headers: {'Content-type': 'application/json'} })
  },
  deleteAThing (id) {
    return Api().delete(`/things/${id}`)
  },
  deleteAInvoice (id){
    return Api().delete(`/invoices/${id}`)
  },
  buyAThing (idbuyer){
    return Api().post('/invoices', idbuyer,
      { headers: {'Content-type': 'application/json'} })
  },
  leaveMessage (id, message) {
    return Api().put(`/invoices/${id}` , message,
      { headers: {'Content-type': 'application/json'} })
  },
  logindetect (account) {
    return Api().post("/users/login", account)
  }

}
