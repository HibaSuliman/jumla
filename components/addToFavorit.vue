<template>
  <div>

    <v-tooltip bottom >
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="details" v-on="on" v-bind="attrs" @click="add" large outlined class="mx-0" color="red">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn v-else @click="add" v-on="on" v-bind="attrs" icon color="primary"><v-icon>mdi-heart-outline</v-icon></v-btn>
      </template>
      <span v-if="!$auth.loggedIn">{{ $t('youNeedToLogin') }}</span>
      <span v-else>{{ $t('addToFavorit') }}</span>
    </v-tooltip>

  </div>
</template>

<script>
import {mapActions} from "vuex";
export default {
  name: "addToFavorit",

  props: {
    details: Boolean,
    Product: String
  },
  methods: {
    ...mapActions({
      storeData: 'favorite/storeData'
    }),
    add() {
      console.log(this.$auth.user)
      this.storeData({
        product_slug: this.Product,
        token: this.$cookies.get('cart_token') ?? null,
        user_id: this.$auth.loggedIn ? this.$auth.user.id : null
      });
    }
  }
}
</script>

<style scoped>

</style>
