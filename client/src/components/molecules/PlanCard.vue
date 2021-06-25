<template>
  <div class="plan-card">
    <div class="plan-title-container">
      <img :src="logoOperator" />
      <h1>
        {{ planTitle }}
      </h1>
      </div>
    <ul>
      <li> Operadora: {{ operator }} </li>
      <li> Coparticipação: {{ coparticipation ? 'Sim' : 'Não' }} </li>
      <li> Nível: {{ level }} </li>
      <li> Plano: {{ planType }} </li>
      <li> Reembolso: {{ refund ? 'Sim' : 'Não' }} </li>
      <li> Segmentação: {{ segmentation }} </li>
      <li> Preço: {{ formattedPrice }} </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'PlanCard',
  props: {
    planTitle: String,
    logoOperator: String,
    operator: String,
    coparticipation: Boolean,
    level: String,
    planType: String,
    refund: Boolean,
    segmentation: String,
    price: String
  },
  computed: {
    formattedPrice () {
      const priceNumber = this.price.replace(/\D/g, '') / 100
      return priceNumber.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }
  }
}
</script>

<style scoped>
  .plan-title-container {
    display: flex;
    justify-content: flex-start;
    margin-left: 20px;
    margin-bottom: 10px;
  }

  .plan-title-container img {
    height: 40px;
    border: 1px solid black
  }

  .plan-title-container h1 {
    font-size: 15px;
    margin-left: 5px;
  }

  .plan-card {
    margin: 20px 3px;
  }
</style>
