<template>
  <div id="user-options-container" >
    {{ `[${email}]` }}
    <ChangePassword
      :email="email"
    />
    <DeleteAccount
      :email="email"
      @logged-in-changed="onLogout"
    />
    <button @click="onLogout" >
      Sair
    </button>
  </div>
</template>

<script>
import ChangePassword from './ChangePassword'
import DeleteAccount from './DeleteAccount'
export default {
  name: 'UserOptions',
  components: {
    ChangePassword,
    DeleteAccount
  },
  props: {
    email: String
  },
  methods: {
    onLogout () {
      this.$emit('logged-in-changed', false)
      localStorage.setItem('token', '')
    }
  }
}
</script>
<style scoped>
  #user-options-container {
    display: flex;
  }
</style>
