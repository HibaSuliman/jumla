<template>
    <v-container class="mt-10 mb-10">
      <v-card>
        <v-card-title>{{ $t('editAddress') }}</v-card-title>
        <v-card-text>
          <addresses details/>
          <edit-address />
        </v-card-text>
      </v-card>
    </v-container>
</template>

<script>
export default {
  name: "address"
}
</script>

<style scoped>

</style>
