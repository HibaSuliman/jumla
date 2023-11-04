<template>
  <v-container fluid>
    <div>
      <h2>{{ $t('shoppingCart') }}</h2>
      <v-row class="mt-4 mb-4" justify="center" align="stretch" style="height: 100%;">
        <v-col cols="12" md="8" lg="6" class="d-flex flex-column">
          <v-card outlined class="flex-grow-1">
            <v-card-text>
              <div v-if="cart.total_items > 0">
                <div class="mb-4">
                  <p>{{ $t('totalItems') }} <span> {{ cart.total_items }} </span></p>
                </div>
                <v-simple-table>
                  <tbody>
                  <tr
                    v-for="(item,key) in cart.items"
                    :key="item.name"
                  >
                    <td>
                      <v-layout>
                        <v-img height="80px" max-height="50" max-width="50" width="50px" :src="item.product.image"/>
                        <div>
                          <h3 class="mt-3 mx-4">
                            {{ item.product.name }} <span>({{ item.quantity }})</span>
                          </h3>
                        </div>
                      </v-layout>
                    </td>
                    <td>
                      <span>{{ $t('stock') }} : <span v-if="item.product">{{ item.product.stock }}</span></span>
                      <div class="mt-5">
                        <v-text-field dense append-outer-icon="mdi-plus" readonly prepend-icon="mdi-minus" outlined filled :items="10" @input="(e) => increaseQuantity(parseInt(e),key)" :value="item.quantity" style="max-width: 120px;min-width: 120px">
                          <template slot="append-outer">
                            <v-icon @click="changeQuantity({ itemKey:key , quantity: 10, method: 'increase' })" color="green">mdi-plus</v-icon>
                          </template>
                          <template slot="prepend">
                            <v-icon v-if="item.quantity > 1" @click="changeQuantity({ itemKey:key , quantity: 5 , method: 'decrease' })" color="red">mdi-minus</v-icon>
                            <v-icon color="red" v-else @click="deleteItem(key)">mdi-delete</v-icon>
                          </template>
                        </v-text-field>
                      </div>
                    </td>
                    <td>
                      <div class="mt-2">
                        <h3 class="mx-6">
                          <span v-if="item.product.reduction">{{ parseFloat(item.quantity * item.product.reduction) }}</span>
                          <span v-else>{{ parseFloat(item.quantity * item.product.price) }}</span>
                          {{ $t('aed') }}
                        </h3>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td><h3>{{ $t('total') }}</h3></td>
                    <td>
                      <div class="mt-2">
                        <h3 class="mx-12">
                          <span>{{ cart.total_items }}</span>
                        </h3>
                      </div>
                    </td>
                    <td>
                      <div class="mt-2">
                        <h3 class="mx-6">
                          <span>{{ cart.total }}</span>
                          {{ $t('aed') }}
                        </h3>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </v-simple-table>
              </div>
              <div v-else>
                <h3 class="text-center">{{ $t('noItemFount') }}</h3>
                <v-layout class="mt-4">
                  <v-spacer/>
                  <v-btn nuxt :to="localePath('/')" outlined color="secondary">{{ $t('browsProducts') }}</v-btn>
                  <v-spacer/>
                </v-layout>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" lg="4">
          <div>
            <v-card class="mb-4" outlined>
              <v-card-text>
                <v-text-field v-model="coupon" :label="$t('coupon')">
                  <template v-slot:append-outer>
                    <v-btn color="primary" small @click="checkCoupon">{{ $t('submit') }}</v-btn>
                  </template>
                </v-text-field>
                <p>{{ $t('totalItems') }} <span> {{ cart.total_items }} </span></p>
                <v-divider />
                <p v-if="cart.coupon_reduction > 0"><span>{{ $t('couponReduction') }}</span> : <span> {{ parseFloat(cart.coupon_reduction).toFixed(2) }} {{ $t('aed') }}</span></p>
                <p>{{ $t('amount') }} : <span> {{ parseFloat(cart.total).toFixed(2) }} {{ $t('aed') }}</span></p>
                <p v-if="selectedAddress">{{ $t('deliveryFee') }} <span v-if="selectedAddress.city"> {{ parseFloat(selectedAddress.city.delivery_price).toFixed(2) }} {{ $t('aed') }}</span></p>
                <p v-if="cart.fees">{{ $t('tax') }} : <span> {{ parseFloat(cart.fees).toFixed(2) }} {{ $t('aed') }}</span></p>
                <p>{{ $t('total') }} : <span> {{ calculateTotal }} {{ $t('aed') }}</span></p>

              </v-card-text>
            </v-card>
            <v-card class="mt-4" outlined v-if="!placeOrder">
              <v-card-text>
                <v-layout>
                  <v-spacer />
                  <v-btn :disabled="cart.total < 1" color="secondary" class="text-capitalize" @click="placeOrder = true">{{ $t('placeOrder') }}</v-btn>
                  <v-spacer />
                </v-layout>
              </v-card-text>
            </v-card>
            <v-card class="mt-4" outlined v-if="placeOrder">
              <v-card-text>
                <place-order :coupon="coupon" v-if="cart.total > 0" />
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "checkout",
  middleware: 'auth',
  data(){
    return {
      coupon: null,
      quantity: [
        0,1,2
      ],
      placeOrder: false,
    }
  },
  computed:{
    ...mapGetters({
      cart: "cart/getData",
      selectedAddress: 'addresses/getSelectedAddress'
    }),
    calculateTotal()
    {
      let deliveryFee = 0;
      let reduction = 0;
      if(this.selectedAddress && this.selectedAddress.city)
      {
        deliveryFee = parseFloat(this.selectedAddress.city.delivery_price)
      }
      if(this.cart.coupon_reduction) reduction = parseFloat(this.cart.coupon_reduction)
      let total = (parseFloat(this.cart.total) + deliveryFee + parseFloat(this.cart.fees));// - reduction;
      return (total > 0) ? parseFloat(total).toFixed(2) : 0
    }
  },
  methods: {
    ...mapActions({
      changeQuantity: 'cart/changeQuantity',
      applyCoupon: 'cart/applyCoupon',
      deleteItem: 'cart/deleteItem'
    }),
    checkCoupon()
    {
      this.applyCoupon({
        cart_token: this.$cookies.get('cart_token'),
        coupon: this.coupon})
    },
    increaseQuantity(value,key)
    {
      if(value > 0) this.changeQuantity({ itemKey:key , quantity: value })
    }
  }
}
</script>

<style scoped>

</style>
