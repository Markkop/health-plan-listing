<template>
  <main class="page">
    <form>
      <Select
        type="state"
        :options="state.list"
        :isLoading="state.isLoading"
        @change="setSelectedOption"
      />
      <Select
        type="city"
        :options="city.list"
        :isLoading="city.isLoading"
        :hasRequiredSelection="Boolean(selectedState)"
        @change="setSelectedOption"
      />
      <Select
        type="profession"
        :options="profession.list"
        :isLoading="profession.isLoading"
        :hasRequiredSelection="Boolean(selectedCity)"
        @change="setSelectedOption"
      />
      <Select
        type="entity"
        :options="entity.list"
        :isLoading="entity.isLoading"
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
      city: {
        list: [],
        selected: null,
        isLoading: false,
      },
      state: {
        list: [],
        selected: null,
        isLoading: false,
      },
      profession: {
        list: [],
        selected: null,
        isLoading: false,
      },
      entity: {
        list: [],
        selected: null,
        isLoading: false,
      }
    }
  },
  computed: {
    selectedCity() {
      return this.city.selected
    },
    selectedState() {
      return this.state.selected
    },
    selectedProfession() {
      return this.profession.selected
    },
    selectedEntity() {
      return this.entity.selected
    }
  },
  watch: {
    async selectedState() {
      const stateId = this.state.selected.id
      const cities = await this.getCities(stateId)
      this.setCities(cities)
      this.city.selected = null
    },
    async selectedCity() {
      this.setProfessions([])
      this.profession.selected = null
      if (!this.city.selected) {
        return
      }
      const cityName = this.city.selected.nome
      const stateInitials =  this.state.selected.sigla
      const professions = await this.getProfessions(stateInitials, cityName)
      this.setProfessions(professions)
    },
    async selectedProfession() {
      this.setEntities([])
      this.entity.selected = null
      if (!this.profession.selected) {
        return
      }
      const cityName = this.city.selected.nome
      const stateInitials =  this.state.selected.sigla
      const profession = this.profession.selected.nome
      const entities = await this.getEntities(stateInitials, cityName, profession)
      this.setEntities(entities)
    }
  },
  methods: {
    async fetchAndSetLoading(url, type) {
      this[type].isLoading = true
      const response = await fetch(url)
      const cities = await response.json()
      this[type].isLoading = false
      return cities
    },
    async getCities(stateId) {
      const citiesUrl = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`
      return this.fetchAndSetLoading(citiesUrl, 'city')
    },
    async getStates() {
      const statesUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      return this.fetchAndSetLoading(statesUrl, 'state')
    },
    async getProfessions(stateInitials, cityName) {
      const cityNameUtf8 = Buffer.from(cityName, 'utf-8');
      const professionsUrl = `http://lb-aws-1105894158.sa-east-1.elb.amazonaws.com/profissao/${stateInitials}/${cityNameUtf8}?api-key=ddd70c32-fc98-4618-b494-a9698f824353`
      return this.fetchAndSetLoading(professionsUrl, 'profession')
    },
    async getEntities(stateInitials, cityName, profession) {
      const cityNameUtf8 = Buffer.from(cityName, 'utf-8');
      const entitiesUrl = `http://lb-aws-1105894158.sa-east-1.elb.amazonaws.com/entidade/${profession}/${stateInitials}/${cityNameUtf8}?api-key=4b94dba2-5524-4632-939b-92df1c50a645`
      return this.fetchAndSetLoading(entitiesUrl, 'entity')
    },
    async setStates(states) {
      this.sortByName(states)
      this.state.list = states
    },
    async setCities(cities) {
      this.sortByName(cities)
      this.city.list = cities
    },
    async setProfessions(professions) {
      const mappedProfessions = professions.map(({ profissao }) => ({
        id: profissao,
        nome: profissao
      }))
      this.sortByName(mappedProfessions)
      this.profession.list = mappedProfessions
    },
    async setEntities(entities) {
      const mappedEntities = entities.map(({ NomeFantasia, RazaoSocial }) => ({
        id: NomeFantasia,
        nome: `${NomeFantasia} - ${RazaoSocial}`
      }))
      this.sortByName(mappedEntities)
      this.entity.list = mappedEntities
    },
    sortByName(list) {
      list.sort((itemA, itemB) => itemA.nome.localeCompare(itemB.nome))
    },
    setSelectedOption(type, selectedOption) {
      switch (type) {
        case 'city':
          this.city.selected = selectedOption
          break;
        case 'state':
          this.state.selected = selectedOption
          break;
        case 'profession':
          this.profession.selected = selectedOption
          break;
        case 'entity':
          this.entity.selected = selectedOption
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
