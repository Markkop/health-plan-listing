<template>
  <main>
    <Form
      @plans-changed="OnPlansChanged"
    />
    <Plans
      v-if="plans.length"
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
