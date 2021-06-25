<template>
  <div
    id="login-form-container"
    class="user-menu-form-container"
    >
    <button
      id="login-register-toggle"
      @click="onLoginRegisterToggle"
      >
      {{ loginRegisterText }}
    </button>
    <form
      id="login-form"
      class="user-menu-form"
      @submit.prevent="onSubmit"
      >
      <Input
        name="email"
        type="email"
        label="Email"
        :required="true"
        @email-changed="onEmailInput"
      />
      <Input
        name="password"
        type="password"
        label="Password"
        :required="true"
        @password-changed="onPasswordInput"
      />
      <Input
        v-if="isRegister"
        name="confirm-password"
        type="password"
        label="Confirm Password"
        :required="true"
        @confirm-password-changed="onConfirmPasswordInput"
      />
      <button
        type="submit"
      >
        {{ isRegister ? 'Registrar' : 'Login'}}
      </button>
    </form>
  </div>
</template>

<script>
import api from '../../utils/api'
import { Input } from '@atoms'
export default {
  name: 'LoginForm',
  components: {
    Input
  },
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      isRegister: false
    }
  },
  computed: {
    onSubmit () {
      return this.isRegister ? this.onRegisterSubmit : this.onLoginSubmit
    },
    loginRegisterText () {
      return this.isRegister ? 'Fazer login' : 'Registrar-se'
    }
  },
  methods: {
    onEmailInput (email) {
      this.email = email
      this.$emit('email-changed', email)
    },
    onPasswordInput (password) {
      this.password = password
    },
    onConfirmPasswordInput (confirmPassword) {
      this.confirmPassword = confirmPassword
    },
    onLoginRegisterToggle () {
      this.isRegister = !this.isRegister
    },
    async onLoginSubmit () {
      const result = await api.login(this.email, this.password)
      if (result.status !== 'success') {
        return
      }

      const { token } = result.data
      localStorage.setItem('token', token)
      this.$emit('logged-in-changed', true)
    },
    async onRegisterSubmit () {
      if (this.password !== this.confirmPassword) {
        return
      }

      const result = await api.register(this.email, this.password)
      if (result.status !== 'success') {
        return
      }

      this.isRegister = false
    }
  }
}
</script>
<style scoped>
  #login-register-toggle {
    margin: auto 10px
  }
</style>
