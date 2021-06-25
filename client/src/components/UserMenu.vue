<template>
    <div id="user-container">
      <LoginForm
        v-if="!isLoggedIn"
        :isRegister="isRegister"
        @logged-in-changed="onLoggedInChange"
        @email-changed="onEmailChanged"
      />
      <UserOptions
        v-else
        :email="email"
        @logged-in-changed="onLoggedInChange"
      />
    </div>
</template>

<script>
import LoginForm from './LoginForm'
import UserOptions from './UserOptions'
export default {
  name: 'UserMenu',
  components: {
    LoginForm,
    UserOptions
  },
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      isRegister: false,
      isLoggedIn: false
    }
  },
  computed: {
  },
  methods: {
    onEmailChanged (email) {
      this.email = email
    },
    onLoggedInChange (isLoggedIn) {
      this.isLoggedIn = isLoggedIn
    },
    onLogout () {
      this.userName = ''
      this.isLoggedIn = false
      localStorage.setItem('token', '')
    }
  }
}
</script>
<style scoped>
  #user-container {
    display: flex;
  }
</style>
