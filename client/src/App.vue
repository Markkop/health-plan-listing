<template>
  <div id="app">
    <Header/>
    <Home/>
  </div>
</template>

<script>
import Home from './components/Home'
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Home,
    Header
  }
}
</script>
<style>
  #app {
    --color1: #ffe74c;
    --color2: #ff5964;
    --color3: #ffffff;
    --color4: #9bfda5;
    --color5: #35a7ff;
    --color6: #004e64;
    margin: 0;
    padding: 0;
    height: 100vh;
  }
</style>
