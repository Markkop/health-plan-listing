<template>
  <main id="home-main">
    <PlansForm
      @plans-changed="OnPlansChanged"
    />
    <Plans
      :plans="plans"
      :isWaitingUserInput="isWaitingUserInput"
    />
  </main>
</template>

<script>
import Plans from './Plans'
import PlansForm from './PlansForm'

export default {
  name: 'Home',
  components: {
    Plans,
    PlansForm
  },
  data () {
    return {
      isWaitingUserInput: true,
      plans: {
        list: [],
        isLoading: false
      }
    }
  },
  methods: {
    OnPlansChanged (plans) {
      this.isWaitingUserInput = false
      this.plans = plans
    }
  }
}
</script>
<style scoped>
  #home-main {
    justify-content: space-evenly;
    align-items: center;
    margin: 0 auto 0 auto;
    display: flex;
    flex-direction: row;
    background-image: linear-gradient(141deg, var(--color4) 0%, var(--color3) 100%);
    min-height: 90vh;
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
