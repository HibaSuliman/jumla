<template>
    <div>
      <v-btn v-if="details" @click="add" :disabled="outOfStock" large min-width="250px" class="mx-4" color="secondary">
        {{ $t('addToCart') }}
      </v-btn>

      <v-btn :disabled="outOfStock"  @click="add" v-else color="secondary">{{ $t('addToCart') }}</v-btn>
    </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "addToCart",
  props: {
    details: Boolean,
    Product: String,
    outOfStock: Boolean
  },
  methods: {
    ...mapActions({
      storeData: 'cart/storeData'
    }),
    add() {
      console.log(this.$auth.user)
      this.storeData({
        product_slug: this.Product,
        quantity: 1,
        token: this.$cookies.get('cart_token') ?? null,
        user_id: this.$auth.loggedIn ? this.$auth.user.id : null
      });
    }
  }
}
</script>

<style scoped>

</style>
