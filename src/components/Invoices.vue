<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="invoices" :options="options">

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
        name: "Invoices",
        data() {
            return {
                messagetitle: 'Invoices List',
                invoices: [],
                errors: [],
                props: ['_id'],
                columns: ['_id', 'name', 'seller', 'buyer', 'message'],
                options: {
                    filterable: ['name', 'seller', 'buyer'],
                    headings:{
                        _id: 'ID',
                        name : 'Name',
                        seller : 'Seller',
                        price : 'Price'
                    }
                }
            }
        },
        created() {
            this.loadInvoices()
        },
        methods : {
            loadInvoices : function () {
                MarketService.fetchInvoices()
                    .then(response => {
                        this.invoices = response.data
                        console.log(this.invoices)
                    })
                    .catch(error =>{
                        this.error.push(error)
                        console.log(error)
                    })
            },
            leaveMessage : function (id) {
                this.$router.params = id
                this.$router.push('leavemessage')
            },
            deleteAInvoice: function (id) {
                MarketService.deleteAInvoice(id)
                    .then(response => {
                        this.loadInvoices()
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
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
