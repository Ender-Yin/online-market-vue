<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="things" :options="options">

      </v-client-table>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import VueTables from 'vue-tables-2'
    import MarketService from "@/services/MarketService";

    Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

    export default {
        name: 'Things',
        data () {
            return {
                messagetitle: ' Things List ',
                things: [],
                errors: [],
                columns: ['_id', 'name', 'seller', 'price'],
                options: {
                    headings:{
                        _id: 'ID',
                        name : 'Name',
                        seller : 'Seller',
                        price : 'Price'
                    }
                }
            }
        },
        // Fetches Donations when the component is created.
        created () {
            this.loadThings()
        },
        methods: {
            loadThings: function () {
                MarketService.fetchThings()
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.things = response.data
                        console.log(this.things)
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
    width: 60%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
