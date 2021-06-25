<template>
  <section id="plans-container">
    {{ plansListTitle }}
    <ul v-if="hasPlans" id="plans-list">
      <PlanCard
        v-for="plan in plans.list"
        :key="`${plan.id}-${plan.idProdutoFatura}`"
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
    plans: Object,
    isWaitingUserInput: Boolean
  },
  computed: {
    hasPlans () {
      return this.plans.list.length
    },
    plansListTitle () {
      if (this.plans.isLoading) {
        return 'Carregando planos...'
      }

      if (this.isWaitingUserInput) {
        return 'Os planos disponíveis para você aparecerão aqui ;)'
      }

      return this.hasPlans ? 'Planos oferecidos:' : 'Nenhum plano encontrado :('
    }
  }
}
</script>
<style scoped>
  #plans-list {
    overflow-y: scroll;
    max-height: 60vh;
    padding: 0;
  }
</style>
