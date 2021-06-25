<template>
  <div id="delete-account-container">
    <button @click="onDeleteAccountDisplayToggle" >
    Deletar Conta
    </button>
    <form
      v-if="isDeleteAccountFormDisplayed"
      id="delete-account-form"
      @submit.prevent="onChangePasswordSubmit"
      >
      <Input
        name="password"
        type="password"
        label="Password"
        :required="true"
        @password-changed="onPasswordInput"
      />
      <button type="submit" >
        Deletar
      </button>
    </form>
  </div>
</template>

<script>
import api from '../utils/api'
import Input from './Input.vue'
export default {
  name: 'DeleteAccount',
  components: {
    Input
  },
  props: {
    email: String
  },
  data () {
    return {
      password: '',
      isDeleteAccountFormDisplayed: false
    }
  },
  methods: {
    onPasswordInput (password) {
      this.password = password
    },
    onDeleteAccountDisplayToggle () {
      this.isDeleteAccountFormDisplayed = !this.isDeleteAccountFormDisplayed
    },
    async onChangePasswordSubmit () {
      const result = await api.deleteUser(this.email, this.password)
      if (result.status !== 'success') {
        return
      }
      this.isDeleteAccountFormDisplayed = false
      this.$emit('logged-in-changed', false)
    }
  }
}
</script>
<style scoped>
  #delete-account-container {
    display: flex;
  }

  #delete-account-form {
    display: flex;
  }
</style>
