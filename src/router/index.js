import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Things from "@/components/Things";
import Invoices from "../components/Invoices";
import Put from "../components/Put";
import Buy from "@/components/Buy";
import Edit from "@/components/Edit";
import LeaveMessage from "@/components/LeaveMessage";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/things',
      name: 'Things',
      component: Things
    },
    {
      path: '/invoices',
      name: 'Invoices',
      component: Invoices
    },
  ]
})
