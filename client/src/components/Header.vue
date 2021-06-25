<template>
  <header id="page-header">
    <UserMenu/>
  </header>
</template>

<script>
import UserMenu from './UserMenu.vue'
export default {
  name: 'Header',
  components: {
    UserMenu
  }
}
</script>
<style scoped>
  #page-header {
    height: 30px;
    border-bottom: 2px solid black;
  }
</style>
