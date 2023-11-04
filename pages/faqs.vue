<template>
    <div>
      <h1 class="text-center mt-6">{{ $t('faqs') }}</h1>
      <v-container>
        <v-expansion-panels class="mt-4">
          <v-expansion-panel
            class="mt-4"
            v-for="faq in faqs"
          >
            <v-expansion-panel-header>{{ faq.question }}</v-expansion-panel-header>
            <v-expansion-panel-content>{{ faq.answer }}</v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </div>
</template>

<script >
export default {
  name: "faqs",
  computed:{

  },
  data()
  {
    return {
      faqs: null,
    }
  },
  mounted() {
    this.$axios.get('faqs').then(res => {
      console.log(res.data)
      if(res.data)
      {
        this.faqs = res.data.data
      }
    })
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
