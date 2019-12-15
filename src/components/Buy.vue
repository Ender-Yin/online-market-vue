<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">

            <table border="1">
              <tr>
                <td>product name:</td> <td>{{thing.name}}</td>
              </tr>
              <tr>
                <td>seller:</td> <td>{{thing.seller}}</td>
              </tr>
              <tr>
                <td>price:</td> <td>{{thing.price}}</td>
              </tr>
            </table>

          <div class="form-group">
            <label class="form-label">Your Name (buyer name)</label>
            <input data-test="buyer" class="form-control" type="text" v-model="buyer" id="buyer" name="buyer" placeholder="enter your name here" />
          </div>

          <button class="btn" TYPE="submit" @click="BuyAThing"> Purchase </button>

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
                thing: {},
                childDataLoaded: false,
                temp: {},
                buyer : '',
                idbuyer : '',
                messagetitle: ' Buy it !! '
            }
        },
        components: {
            'thing-form': PutForm
        },
        created () {
            this.getThing()
        },
        methods: {
            getThing: function () {
                MarketService.fetchAThing(this.$router.params)
                    .then(response => {
                        this.temp = response.data
                        this.thing = this.temp[0]
                        this.childDataLoaded = true
                        console.log('Getting Thing in Edit: ' + JSON.stringify(this.thing, null, 5))
                    })
                    .catch(error => {
                        this.errors.push(error)
                        console.log(error)
                    })
            },
            BuyAThing: function (thing) {
                console.log('Before PUT ' + JSON.stringify(thing, null, 5))
                this.idbuyer = { _id : this.thing._id, buyer : this.buyer}
                MarketService.buyAThing(this.idbuyer)
                    .then(response => {
                        console.log(response)
                        console.log('AFTER PUT ' + JSON.stringify(thing, null, 5))
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
