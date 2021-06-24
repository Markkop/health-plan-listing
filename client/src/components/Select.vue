<template>
  <div class="select-container">
    <label 
      :id="`${type}-select-label`"
      class='select-label'
      :for="type"
      >
      {{texts[type]}}: 
    </label>
    <select 
      :name="type" 
      :id="`${type}-select`"
      class='form-select form-input'
      @change="onChange"
      :disabled="!hasRequiredSelection || isLoading"
      >
      <option
        selected
        hidden
        >
        {{ placeholderOptionText }}
      </option>
      <option
        v-for="option in options" 
        :value="option.id"
        :key="option.id"
        >
        {{ option.nome }}
      </option>
    </select>
  </div>
</template>

<script>
import mixins from '../mixins'

export default {
  name: 'Select',
  mixins: [
    mixins.texts()
  ],
  props: {
    type: {
      type: String,
      validator: type => ['state', 'city', 'profession', 'entity'].includes(type)
    },
    hasRequiredSelection: {
      type: Boolean,
      default: true
    },
    options: Array,
    isLoading: Boolean,
  },
  computed: {
    placeholderOptionText() {
      if (this.isLoading) {
        return 'Carregando...'
      }

      if (!this.hasRequiredSelection) {
        return `Selecione o campo anterior`
      }

      return `Selecione um(a) ${this.texts[this.type]}`
    },
  },
  methods: {
    onChange(event) {
      const optionValue = event.target.value
      const selectedOption = this.options.find(option => {
        return String(option.id) === optionValue
      })
      this.$emit('change', this.type, selectedOption)
    }
  },
}
</script>

<style scoped>
  .select-container {
    display: flex;
    flex-direction: row;
  }

  .select-label {
    text-transform: capitalize;
    width: 75px;
  }

</style>
