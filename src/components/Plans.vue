<template>
  <section>
    <ul>
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
  }
};
</script>
