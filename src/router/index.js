import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Things from "@/components/Things";
import Invoices from "../components/Invoices";
import Put from "../components/Put";
import Buy from "@/components/Buy";
import Edit from "@/components/Edit";
import LeaveMessage from "@/components/LeaveMessage";
import login from "@/components/login";
import mythings from "@/components/mythings";
import myinvoices from "@/components/myinvoices";
import register from "@/components/register";

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
    {
      path: '/put',
      name: 'Put',
      component: Put
    },
    {
      path: '/buy',
      name: 'Buy',
      component: Buy,
      props: true
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit,
      props: true
    },
    {
      path: '/leavemessage',
      name: 'LeaveMessage',
      component: LeaveMessage,
      props: true
    },
    { path: '/login', name: 'login', component:login,props: true},
    { path: '/register', name: 'register', component:register,props: true},
    { path: '/mythings', name: 'mythings', component:mythings, props: true},
    { path: '/myinvoices', name: 'myinvoices', component:myinvoices, props: true}

  ]
})
