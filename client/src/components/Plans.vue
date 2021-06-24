<template>
  <section id="plans-container">
    {{ hasPlans ? 'Planos oferecidos:' : 'Os planos disponíveis para você aparecerão aqui ;)'}}
    <ul v-if="hasPlans" id="plans-list">
      <li
        v-for="plan in plans"
        :key="plan.id"
      >
        {{ plan.nome_plano_ans}}
      </li>
    </ul>
  </section>
</template>

<script>

export default {
  name: 'Plans',
  props: {
    plans: Array
  },
  computed: {
    hasPlans () {
      return this.plans.length
    }
  }
}
</script>
<style scoped>
  #plans-list {
    overflow-y: scroll;
    height: 70vh;
  }
</style>
