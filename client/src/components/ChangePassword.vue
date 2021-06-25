<template>
  <div
    id="change-password-container"
    class="user-menu-form-container"
    >
    <button @click="onChangePasswordDisplayToggle" >
      {{ isPasswordChangeFormDisplayed ? 'Cancelar' : 'Mudar senha'}}
    </button>
    <form
      v-if="isPasswordChangeFormDisplayed"
      id="change-password-form"
      class="user-menu-form"
      @submit.prevent="onChangePasswordSubmit"
      >
      <Input
        name="password"
        type="password"
        label="Current Password"
        :required="true"
        @password-changed="onPasswordInput"
      />
      <Input
        name="new-password"
        type="password"
        label="New Password"
        :required="true"
        @new-password-changed="onNewPasswordInput"
      />
      <button
        type="submit"
      >
        Mudar
      </button>
    </form>
  </div>
</template>

<script>
import api from '../utils/api'
import Input from './Input.vue'
export default {
  name: 'ChangePassword',
  components: {
    Input
  },
  props: {
    email: String
  },
  data () {
    return {
      password: '',
      newPassword: '',
      isPasswordChangeFormDisplayed: false
    }
  },
  methods: {
    onPasswordInput (password) {
      this.password = password
    },
    onNewPasswordInput (newPassword) {
      this.newPassword = newPassword
    },
    onChangePasswordDisplayToggle () {
      this.isPasswordChangeFormDisplayed = !this.isPasswordChangeFormDisplayed
    },
    async onChangePasswordSubmit () {
      const result = await api.changePassword(this.email, this.password, this.newPassword)
      if (result.status !== 'success') {
        return
      }
      this.isPasswordChangeFormDisplayed = false
    }
  }
}
</script>
<style scoped>

</style>
