<template>
  <div>
    <label for="birthDate">Birth Date: </label>
    <input 
      type="text" 
      name="birthDate"
      placeholder="DD-MM-AAAA"
      v-model="formattedBirthDate"
      maxlength="10"
      :pattern="dateStringRegex"
      :class="isValid ? '' : 'invalid'"
      @blur="onBlur"
      >
  </div>
</template>

<script>
export default {
  name: 'InputBirthDate',
  data() {
    return {
      isValid: true,
      birthDate: '',
      dateStringRegex: '^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\\d\\d$'
    }
  },
  computed: {
    formattedBirthDate: {
      get() {
        return this.birthDate
      },
      set(newValue) {
        this.birthDate = this.dateFormatter(newValue)
      }
    }
  },
  methods: {
    dateFormatter (value) {
      if (!value) return value

      const currentValue = value.replace(/[^\d]/g, '')
      const currentValueLength = currentValue.length

      if (currentValueLength < 2) return currentValue

      if (currentValueLength < 4) return `${currentValue.slice(0, 2)}-${currentValue.slice(2, 4)}`

      return `${currentValue.slice(0, 2)}-${currentValue.slice(2, 4)}-${currentValue.slice(4, 8)}`
    },
    onBlur(event) {
      const dateString = event.target.value
      const isValid = this.validateBirthDate(dateString)
      if (isValid) {
        this.isValid = true
        this.$emit('birth-date-changed', dateString)
        return
      }

      this.isValid = false
    },
    validateBirthDate(dateString) {
      const regex = new RegExp(this.dateStringRegex)
      return regex.test(dateString)
    }
  },
}
</script>

<style scoped>
  .invalid {
    border: 2px solid red;
  }
</style>
