<template>
  <div>
    <label
      :for="name"
      class="login-input-label"
      >
      {{ label }}:
    </label>
    <input
      :type="type"
      :name="name"
      :required="required"
      class="login-input"
      @change="onChange"
      >
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    name: String,
    label: String,
    type: String,
    required: Boolean
  },
  methods: {
    onChange (event) {
      this.$emit(`${this.name}-changed`, event.target.value)
    }
  }
}
</script>

<style scoped>

</style>
