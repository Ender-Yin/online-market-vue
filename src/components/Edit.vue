<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <template v-if="childDataLoaded">
            <thing-form :thing="thing" ThingBtnTitle="Update thing"
                           @thing-is-created-updated="updateThing"></thing-form>

            <p>
              <button class="btn btn-primary btn1" TYPE="submit" @click="gothing"> view my things </button>
            </p>
          </template>
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
                messagetitle: ' Update this Thing '
            }
        },
        components: {
            'thing-form': PutForm
        },
        created () {
            this.getThing()
        },
        methods: {
            gothing : function() {
                this.$router.params = this.thing.seller
                this.$router.push('mythings')
                /*this.$router.push({
                    path: '/mythings',
                    query:{
                        accessusername: this.accessusername
                    }
                })
                this.$router.push('mythings')*/
            },
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
            updateThing: function (thing) {
                console.log('Before PUT ' + JSON.stringify(thing, null, 5))
                MarketService.editAThing(this.$router.params, thing)
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
</style>
