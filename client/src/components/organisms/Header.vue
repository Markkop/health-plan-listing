<template>
  <header id="page-header">
    <UserMenu/>
  </header>
</template>

<script>
import UserMenu from './UserMenu'

export default {
  name: 'Header',
  components: {
    UserMenu
  }
}
</script>
<style scoped>
  #page-header {
    border-bottom: 2px solid black;
    background-image: linear-gradient(141deg, var(--color5) 0%, var(--color3) 100%);
  }
</style>
