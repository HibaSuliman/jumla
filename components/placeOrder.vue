<template>
  <div>
    <div v-if="!orderComplete">
      <addresses details/>
      <add-address />
      <v-divider class="mt-4 mb-4"/>
      <v-text-field
        outlined
        prepend-inner-icon="mdi-phone"
        :label="$t('auth.phone')"
        :rules="[
                        (v) => !!v || $t('validation.required'),
                        (v) => v && (v.length - 10)*(v.length - 9) <= 0  || $t('validation.phone'),
                        //(v) => (v.length - 10)*(v.length - 9) <= 0  || $t('validation.phone'),
                        (v) => /^\d+$/.test(v)  || $t('validation.phone'),
                      ]"
        color="primary"
        v-model="phone"
      />
      <v-divider class="mt-4 mb-4"/>
      <delivery class="mt-4 mb-4" details/>
      <v-btn :disabled="!$cookies.get('address')" block color="secondary" @click="placeOrder">{{ $t('placeOrder') }}</v-btn>
    </div>
    <div v-else>
      <h3 class="text-center">{{ $t('thanksyourOrderHasBeenPlacedWithSuccess') }}</h3>
      <v-layout>
        <v-spacer/>
        <v-btn color="secondary" outlined class="mt-4" nuxt :to="localePath('/orders')">{{ $t('browseOrders') }}</v-btn>
        <v-spacer/>
      </v-layout>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "placeOrder",
  props: ['coupon'],
  data(){
    return {
      addressDialog: false,
      phone:null,
      orderComplete: false,
    }
  },
  mounted() {
    console.log('user:',this.$auth.user)
    this.phone = this.$auth.user.phone
  },
  methods: {
    ...mapActions({
      getCart: 'cart/fetchData'
    }),
    placeOrder()
    {
      let delivery_day = this.$cookies.get('delivery_date');
      let delivery_time = this.$cookies.get('delivery_time');
      let address_id = this.$cookies.get('address');
      let token = this.$cookies.get('cart_token');
      let coupon = this.coupon;
      let phone = this.phone
      this.$axios.post('order/store',{
        delivery_time,
        delivery_day,
        address_id,
        token,
        phone,
        coupon
      }).then(res => {
        if(res.data.status == 'success')
        {
          this.orderComplete = true;
          this.getCart(this.$cookies.get('cart_token'))
          window.location.href = this.localePath('/orders')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
