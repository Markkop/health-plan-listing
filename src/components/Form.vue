<template>
  <main class="page">
    <form>
      <select 
        name="city" 
        id="city-select"
        >
        <option
          v-for="city in cities" 
          :value="city"
          :key="city"
          :disabled="isCitySelectorDisabled"
          :selected="isCitySelectorDisabled"
          :hidden="isCitySelectorDisabled"
          >
          {{ city }}
        </option>

      </select>
      <select 
        name="state" 
        id="state-select"
        @change="setSelectedState"
        >
        <option 
          v-for="state in states" 
          :value="state.id"
          :key="state.id"
          >
          {{ state.nome }}
        </option>
      </select>
    </form>
  </main>
</template>

<script>
export default {
  name: 'Form',
  data() {
    return {
      cities: ['Selecione um estado'],
      selectedCity: null,
      selectedState: null,
      isLoadingCities: false,
      states: []
    }
  },
  computed: {
    isCitySelectorDisabled() {
      return this.isLoadingCities || !this.selectedState
    }
  },
  watch: {
    async selectedState() {
      const cities = await this.getCities(this.selectedState)
      this.setCities(cities)
    }
  },
  methods: {
    async getCities(state) {
      this.isLoadingCities = true
      this.cities = ['Carregando...']
      const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`)
      const cities = await response.json()
      this.isLoadingCities = false
      return cities
    },
    async getStates() {
      const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      const states = await response.json()
      return states
    },
    async setStates() {
      const states = await this.getStates()
      states.sort((stateA, stateB) => stateA.nome.localeCompare(stateB.nome))
      this.states = states
    },
    async setCities() {
      const cities = await this.getCities(this.selectedState)
      const citiesNames = cities.map(({ nome }) => nome)
      citiesNames.sort()
      this.cities = citiesNames
    },
    setSelectedState(event) {
      this.selectedState = event.target.value
    }
  },
  async created() {
    this.setStates()
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
