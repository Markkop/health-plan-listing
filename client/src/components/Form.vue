<template>
  <section class="page">
    <form @submit.prevent="onSubmit" id="plans-form">
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
      <InputBirthDate
        @birth-date-changed="onBirthDateChange"
      />
      <button
        type="submit"
        id="form-submit-button"
        :disabled="!isFormValid"
        >
        {{ submitFormText }}
      </button>
    </form>
  </section>
</template>

<script>
import Select from './Select.vue'
import InputBirthDate from './InputBirthDate.vue'

export default {
  name: 'Form',
  components: {
    Select,
    InputBirthDate
  },
  data () {
    return {
      city: {
        list: [],
        selected: null,
        isLoading: false
      },
      state: {
        list: [],
        selected: null,
        isLoading: false
      },
      profession: {
        list: [],
        selected: null,
        isLoading: false
      },
      entity: {
        list: [],
        selected: null,
        isLoading: false
      },
      birthDate: '',
      submitFormText: 'Consultar Planos'
    }
  },
  computed: {
    selectedCity () {
      return this.city.selected
    },
    selectedState () {
      return this.state.selected
    },
    selectedProfession () {
      return this.profession.selected
    },
    selectedEntity () {
      return this.entity.selected
    },
    isFormValid () {
      return Boolean(this.city.selected &&
        this.state.selected &&
        this.profession.selected &&
        this.entity.selected &&
        this.birthDate)
    }
  },
  watch: {
    async selectedState () {
      const stateId = this.state.selected.id
      const cities = await this.getCities(stateId)
      this.setCities(cities)
      this.city.selected = null
    },
    async selectedCity () {
      this.setProfessions([])
      this.profession.selected = null
      if (!this.city.selected) {
        return
      }
      const cityName = this.city.selected.nome
      const stateInitials = this.state.selected.sigla
      const professions = await this.getProfessions(stateInitials, cityName)
      this.setProfessions(professions)
    },
    async selectedProfession () {
      this.setEntities([])
      this.entity.selected = null
      if (!this.profession.selected) {
        return
      }
      const cityName = this.city.selected.nome
      const stateInitials = this.state.selected.sigla
      const profession = this.profession.selected.nome
      const entities = await this.getEntities(stateInitials, cityName, profession)
      this.setEntities(entities)
    }
  },
  methods: {
    async fetchAndSetLoading (url, type) {
      this[type].isLoading = true
      const response = await fetch(url)
      const cities = await response.json()
      this[type].isLoading = false
      return cities
    },
    async getCities (stateId) {
      const citiesUrl = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`
      return this.fetchAndSetLoading(citiesUrl, 'city')
    },
    async getStates () {
      const statesUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      return this.fetchAndSetLoading(statesUrl, 'state')
    },
    async getProfessions (stateInitials, cityName) {
      const cityNameUtf8 = Buffer.from(cityName, 'utf-8')
      const professionsUrl = `https://apisimulador.qualicorp.com.br/profissao/${stateInitials}/${cityNameUtf8}?api-key=ddd70c32-fc98-4618-b494-a9698f824353`
      return this.fetchAndSetLoading(professionsUrl, 'profession')
    },
    async getEntities (stateInitials, cityName, profession) {
      const cityNameUtf8 = Buffer.from(cityName, 'utf-8')
      const entitiesUrl = `https://apisimulador.qualicorp.com.br/entidade/${profession}/${stateInitials}/${cityNameUtf8}?api-key=4b94dba2-5524-4632-939b-92df1c50a645`
      return this.fetchAndSetLoading(entitiesUrl, 'entity')
    },
    async setStates (states) {
      this.sortByName(states)
      this.state.list = states
    },
    async setCities (cities) {
      this.sortByName(cities)
      this.city.list = cities
    },
    async setProfessions (professions) {
      const mappedProfessions = professions.map(({ profissao }) => ({
        id: profissao,
        nome: profissao
      }))
      this.sortByName(mappedProfessions)
      this.profession.list = mappedProfessions
    },
    async setEntities (entities) {
      const mappedEntities = entities.map(({ NomeFantasia, RazaoSocial }) => ({
        id: NomeFantasia,
        nome: `${NomeFantasia} - ${RazaoSocial}`
      }))
      this.sortByName(mappedEntities)
      this.entity.list = mappedEntities
    },
    sortByName (list) {
      list.sort((itemA, itemB) => itemA.nome.localeCompare(itemB.nome))
    },
    setSelectedOption (type, selectedOption) {
      this[type].selected = selectedOption
    },
    onBirthDateChange (dateString) {
      this.birthDate = dateString
    },
    async onSubmit () {
      if (!this.isFormValid) {
        this.handleInvalidForm()
        return
      }
      const url = 'https://apisimulador.qualicorp.com.br/plano?api-key=261fd4d0-fd9f-468a-afa9-f5a89ed3701c'
      const formattedDateString = this.birthDate.split('-').reverse().join('-')
      const body = {
        entidade: this.entity.selected.id,
        uf: this.state.selected.sigla,
        cidade: this.city.selected.nome,
        datanascimento: [formattedDateString]
      }
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json;charset=UTF-8'
        }
      })
      const plans = await response.json()
      this.$emit('plans-changed', plans)
    },
    handleInvalidForm () {
      const defaultSubmitText = this.submitFormText
      this.submitFormText = 'Preencha todos os campos corretamente'
      setTimeout(() => {
        this.submitFormText = defaultSubmitText
      }, 2000)
    }
  },
  async created () {
    const states = await this.getStates()
    this.setStates(states)
  }
}
</script>

<style>
  #form-submit-button {
    transition: width 2s;
    align-self: center;
  }

  #plans-form {
    display: flex;
    flex-direction: column;
  }
  #plans-form > * {
    margin: 5px 0
  }

  .form-input {
    width: 300px;
  }
</style>
