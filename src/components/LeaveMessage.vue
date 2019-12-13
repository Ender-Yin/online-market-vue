<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">

          <table border="1">
            <tr>
              <td>product name:</td> <td>{{invoices.name}}</td>
            </tr>
            <tr>
              <td>seller:</td> <td>{{invoices.seller}}</td>
            </tr>
            <tr>
              <td>buyer:</td> <td>{{invoices.buyer}}</td>
            </tr>
            <tr>
              <td>message:</td> <td>{{invoices.message}}</td>
            </tr>
          </table>

          <div class="form-group">
            <label class="form-label">Your Message</label>
            <input class="form-control" type="text" v-model="message" id="message" name="message" placeholder="enter your message here" />
          </div>

          <button class="btn" TYPE="submit" @click="LeaveMessage"> Add </button>

        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>

<script>
    import MarketService from "../services/MarketService";
    import PutForm from "./PutForm";
    export default {
        data () {
            return {
                invoices: {},
                childDataLoaded: false,
                temp: {},
                message : '',
                jsonmessage : '',
                messagetitle: ' leave a message '
            }
        },
        components: {
            'thing-form': PutForm
        },
        created () {
            this.getInvoice()
        },
        methods: {
            getInvoice: function () {
                MarketService.fetchAInvoice(this.$router.params)
                    .then(response => {
                        this.temp = response.data
                        this.invoices = this.temp[0]
                        this.childDataLoaded = true
                        console.log('Getting Thing in Edit: ' + JSON.stringify(this.invoices, null, 5))
                    })
                    .catch(error => {
                        this.errors.push(error)
                        console.log(error)
                    })
            },
            LeaveMessage: function (invoice) {
                console.log('Before PUT ' + JSON.stringify(invoice, null, 5))
                this.jsonmessage = { message : this.message}
                MarketService.leaveMessage(this.invoices._id, this.jsonmessage)
                    .then(response => {
                        console.log(response)
                        console.log('AFTER PUT ' + JSON.stringify(this.invoices, null, 5))
                    })
                    .catch(error => {
                        this.errors.push(error)
                        console.log(error)
                    })
            }
        }
    }
</script>

<style scoped>
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
  label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }
  .btn {
    width: 300px;
    font-size: x-large;
  }
</style>

