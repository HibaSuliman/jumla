<template>
  <v-card nuxt :to="localePath('/category/' + slug)" flat elevation="0">
    <v-layout>
      <v-spacer/>
      <v-img :src="category.image" width="150px" height="150px" class="rounded-circle" v-if="category.image"/>
      <v-sheet v-else color="primary" width="150px" height="150px" class="rounded-circle">

      </v-sheet>
      <v-spacer/>
    </v-layout>
    <v-card-title>
      <v-spacer/>
      {{ category.name }}
      <v-spacer/>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "category",
  props: ['slug','category']
}
</script>

<style scoped>

</style>
