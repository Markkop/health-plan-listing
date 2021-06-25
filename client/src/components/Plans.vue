<template>
  <section id="plans-container">
    {{ hasPlans ? 'Planos oferecidos:' : 'Os planos disponíveis para você aparecerão aqui ;)'}}
    <ul v-if="hasPlans" id="plans-list">
      <PlanCard
        v-for="plan in plans"
        :key="plan.idProdutoFatura"
        :planTitle="plan.nome_plano_ans"
        :logoOperator="plan.operadoraLogo"
        :operator="plan.operadora"
        :coparticipation="plan.coparticipacao"
        :level="plan.nivel"
        :planType="plan.plano"
        :refund="plan.reembolso"
        :segmentation="plan.segmentacao"
        :price="plan.precos.total"
      />
    </ul>
  </section>
</template>

<script>
import PlanCard from './PlanCard'
export default {
  name: 'Plans',
  components: {
    PlanCard
  },
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
    padding: 0;
  }
</style>
