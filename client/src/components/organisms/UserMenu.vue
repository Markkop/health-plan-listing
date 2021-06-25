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
import { LoginForm, UserOptions } from '@molecules'
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
<style>
  #user-container {
    display: flex;
  }

  .user-menu-form-container {
    display: flex;
    margin: 10px 0;
  }

  .user-menu-form {
    display: flex;
  }

  @media (max-width: 768px) {
    #user-container {
      flex-direction: column;
      align-items: center;
    }

    #user-options-container {
      flex-direction: column;
    }

    .user-menu-form {
      flex-direction: column;
    }

    .user-menu-form-container {
      flex-direction: column;
    }

    .user-menu-input-container {
      display: flex;
      flex-direction: column;
    }
  }
</style>
