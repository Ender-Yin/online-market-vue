<template>
  <div id="app">
    <b-navbar toggleable="md" variant="dark" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <img src="./assets/market.png" class="img-circle" style="padding: 5px">

      <b-navbar-brand to="/">Online Market</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item to="/#"><i class="fa fa-home" style="padding: 5px">Home</i></b-nav-item>
          <b-nav-item to="/things"><img src="./assets/things.png" class="img-circle" style="padding: 5px">
            <i style="padding: 5px">Things</i></b-nav-item>
          <b-nav-item data-test="thingbtn" to="/put"><i class="fa fa-upload" style="padding: 5px">Put your Thing</i></b-nav-item>
          <b-nav-item to="/invoices"><i class="fa fa-list" style="padding: 5px">            Invoices</i></b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/mythings"><i class="fa fa-list" style="padding: 5px">my things</i></b-nav-item>
          <b-nav-item to="/myinvoices"><i class="fa fa-list" style="padding: 5px">my invoices</i></b-nav-item>
          <b-nav-item to="/login"><i class="fa fa-sign-in" style="padding: 5px"> Login </i></b-nav-item>
          <b-nav-item to="/register"><i class="fa fa-register" style="padding: 5px"> register </i></b-nav-item>
          <i class="fa fa-pied-piper-alt fa-1x" style="padding: 5px; color: white;"></i>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background: url("./assets/homebackground.jpg") repeat center top;
}
</style>
