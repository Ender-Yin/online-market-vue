<template>
  <div id="app1" class="put">
    <h3 class="vue-title"><i class="fa fa-money" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <thing-form :thing="thing" ThingBtnTitle="Put Your Thing !!"
                         @thing-is-created-updated="submitThing"></thing-form>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>

<script>
    import MarketService from "../services/MarketService";
    import PutForm from "./PutForm";

    export default {
        name: "Put",
        data() {
            return {
                thing : {name : '', price : 0, seller : ''},
                messagetitle : 'Put Your Thing !!'
            }
        },
        components: {
            'thing-form' : PutForm
        },
        methods: {
            submitThing: function (thing) {
                MarketService.postAThing(thing)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => {
                        this.error.push(error)
                        console.log(error)
                    })
            }
        }
    }
</script>

<style scoped>

</style>
