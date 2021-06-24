<template>
  <main id="home-main">
    <Form
      @plans-changed="OnPlansChanged"
    />
    <Plans
      :plans="plans"
    />
  </main>
</template>

<script>
import Plans from './Plans';
import Form from './Form';
import mockedPlans from '../mocks/plans'

export default {
  name: 'Home',
  components: {
    Plans,
    Form,
  },
  data() {
    return {
      plans: mockedPlans
    }
  },
  methods: {
    OnPlansChanged(plans) {
      this.plans = plans.planos
    }
  }
};
</script>
<style scoped>
  #home-main {
    justify-content: space-evenly;
    align-items: center;
    margin: 30px auto;
    display: flex;
    flex-direction: row;
  }

  #home-main section {
    margin-top: 20px;
  }
</style>
