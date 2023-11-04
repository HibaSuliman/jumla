<template>
    <v-container>
      <v-layout wrap v-if="favorit.items.length > 0">
        <div class="mx-3" v-for="item in favorit.items">
            <product :product="item.product"/>
        </div>
      </v-layout>
      <no-data v-else :message="$t('noFavoritAvailible')"/>
    </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "favorit",
  middleware: 'auth',
  computed:{
    ...mapGetters({
      favorit: "favorite/getData",
    })
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapActions({
      fetchData: 'favorite/fetchData',
    }),
  }
}
</script>

<style scoped>

</style>
