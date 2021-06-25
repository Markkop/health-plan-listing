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
import Plans from './Plans'
import Form from './Form'
import mockedPlans from '../mocks/plans'

export default {
  name: 'Home',
  components: {
    Plans,
    Form
  },
  data () {
    return {
      plans: mockedPlans
    }
  },
  methods: {
    OnPlansChanged (plans) {
      this.plans = plans.planos
    }
  }
}
</script>
<style scoped>
  #home-main {
    justify-content: space-evenly;
    align-items: center;
    margin: 0 auto 30px auto;
    display: flex;
    flex-direction: row;
    background-image: linear-gradient(141deg, var(--color4) 0%, var(--color3) 100%);
  }

  #home-main section {
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    #home-main {
      flex-direction: column;
    }
  }
</style>
