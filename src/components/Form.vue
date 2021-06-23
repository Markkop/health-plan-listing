<template>
  <main class="page">
    <form>
      <Select
        type="state"
        :options="states"
        :isLoading="isLoadingStates"
        @change="setSelectedOption"
      />
      <Select
        type="city"
        :options="cities"
        :isLoading="isLoadingCities"
        :hasRequiredSelection="Boolean(selectedState)"
        @change="setSelectedOption"
      />
      <Select
        type="profession"
        :options="professions"
        :isLoading="isLoadingProfessions"
        :hasRequiredSelection="Boolean(selectedCity)"
        @change="setSelectedOption"
      />
      <Select
        type="entity"
        :options="entities"
        :isLoading="isLoadingEntities"
        :hasRequiredSelection="Boolean(selectedProfession)"
        @change="setSelectedOption"
      />
    </form>
  </main>
</template>

<script>
import Select from './Select.vue'

export default {
  name: 'Form',
  components: {
    Select
  },
  data() {
    return {
      cities: [],
      states: [],
      professions: [],
      entities: [],
      selectedCity: null,
      selectedState: null,
      selectedProfession: null,
      selectedEntity: null,
      isLoadingCities: false,
      isLoadingStates: false,
      isLoadingProfessions: false,
      isLoadingEntities: false,
    }
  },
  watch: {
    async selectedState() {
      const stateId = this.selectedState.id
      const cities = await this.getCities(stateId)
      this.setCities(cities)
      this.selectedCity = null
    },
    async selectedCity() {
      this.setProfessions([])
      this.selectedProfession = null
      const cityName = this.selectedCity.nome
      const stateInitials =  this.selectedState.sigla
      const professions = await this.getProfessions(stateInitials, cityName)
      this.setProfessions(professions)
    },
    async selectedProfession() {
      this.setEntities([])
      this.selectedEntity = null
      const cityName = this.selectedCity.nome
      const stateInitials =  this.selectedState.sigla
      const profession = this.selectedProfession.nome
      const entities = await this.getEntities(stateInitials, cityName, profession)
      this.setEntities(entities)
    }
  },
  methods: {
    async fetchAndSetLoading(url, loadingPropertyName) {
      this[loadingPropertyName] = true
      const response = await fetch(url)
      const cities = await response.json()
      this[loadingPropertyName] = false
      return cities
    },
    async getCities(stateId) {
      const citiesUrl = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`
      return this.fetchAndSetLoading(citiesUrl, 'isLoadingCities')
    },
    async getStates() {
      const statesUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      return this.fetchAndSetLoading(statesUrl, 'isLoadingStates')
    },
    async getProfessions(stateInitials, cityName) {
      const cityNameUtf8 = Buffer.from(cityName, 'utf-8');
      const professionsUrl = `http://lb-aws-1105894158.sa-east-1.elb.amazonaws.com/profissao/${stateInitials}/${cityNameUtf8}?api-key=ddd70c32-fc98-4618-b494-a9698f824353`
      return this.fetchAndSetLoading(professionsUrl, 'isLoadingProfessions')
    },
    async getEntities(stateInitials, cityName, profession) {
      const cityNameUtf8 = Buffer.from(cityName, 'utf-8');
      const entitiesUrl = `http://lb-aws-1105894158.sa-east-1.elb.amazonaws.com/entidade/${profession}/${stateInitials}/${cityNameUtf8}?api-key=4b94dba2-5524-4632-939b-92df1c50a645`
      return this.fetchAndSetLoading(entitiesUrl, 'isLoadingEntities')
    },
    async setStates(states) {
      this.sortByName(states)
      this.states = states
    },
    async setCities(cities) {
      this.sortByName(cities)
      this.cities = cities
    },
    async setProfessions(professions) {
      const mappedProfessions = professions.map(({ profissao }) => ({
        id: profissao,
        nome: profissao
      }))
      this.sortByName(mappedProfessions)
      this.professions = mappedProfessions
    },
    async setEntities(entities) {
      const mappedEntities = entities.map(({ NomeFantasia, RazaoSocial }) => ({
        id: NomeFantasia,
        nome: `${NomeFantasia} - ${RazaoSocial}`
      }))
      this.sortByName(mappedEntities)
      this.entities = mappedEntities
    },
    sortByName(items) {
      items.sort((itemA, itemB) => itemA.nome.localeCompare(itemB.nome))
    },
    setSelectedOption(type, selectedOption) {
      switch (type) {
        case 'city':
          this.selectedCity = selectedOption
          break;
        case 'state':
          this.selectedState = selectedOption
          break;
        case 'profession':
          this.selectedProfession = selectedOption
          break;
        case 'entity':
          this.selectedEntity = selectedOption
          break;
        default:
          break;
      }
    }
  },
  async created() {
    const states = await this.getStates()
    this.setStates(states)
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
