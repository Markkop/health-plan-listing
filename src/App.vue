<template>
  <div id="app">
    <Header/>
    <Home/>
  </div>
</template>

<script>
import Home from './components/Home';
import Header from './components/Header';

export default {
  name: 'App',
  components: {
    Home,
    Header
  }
}
</script>
