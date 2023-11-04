<template>
  <v-container>
    <v-card class="mt-4 mb-4" v-for="(order,i) in orders">
      <v-card-text>
        <h2 class="text-center">#{{ order.id }}</h2>
        <v-row justify="center" align="center">
          <v-col cols="12" md="4">
            <p><span>{{ $t('amount') }} : </span>{{ order.net_total }} {{ $t('aed') }}</p>
            <p><span>{{ $t('tax') }} : </span>{{ order.fees }} {{ $t('aed') }}</p>
            <p><span>{{ $t('deliveryFee') }} : </span>{{ order.delivery_price }} {{ $t('aed') }}</p>
            <p><span>{{ $t('total') }} : </span>{{ order.total }} {{ $t('aed') }}</p>
          </v-col>
          <v-col cols="12" md="4">
            <p><span>{{ $t('status') }} : </span><v-chip :color="generateColor(order.status)" dark>{{ order.status }}</v-chip></p>
            <p><span>{{ $t('payment') }} : </span><v-chip :color="generateColor(order.payment_status)" dark>{{ order.payment_status }}</v-chip></p>
            <p><span>{{ $t('deliveryDay') }} : </span><v-chip>{{ order.delivery_day }}</v-chip></p>
            <p><span>{{ $t('deliveryTime') }} : </span><v-chip>{{ order.delivery_time }}</v-chip></p>
          </v-col>
          <v-col cols="12" md="12">
            <v-layout>
              <v-btn v-if="order.status == 'pending'" text color="red" @click="openCancelDialog(order)">{{ $t('cancel') }}</v-btn>
              <v-spacer/>
              <v-btn :href="/invoice/ + order.id" target="_blank" icon color="blue">
                <v-icon>mdi-printer</v-icon>
              </v-btn>
              <v-spacer/>
            </v-layout>
          </v-col>
        </v-row>
      </v-card-text>
      <v-expansion-panels flat class="mb-6">
        <v-expansion-panel
          :key="i"
        >
          <v-expansion-panel-header>{{ $t('orderItems') }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list>
              <div v-for="item in order.items">
                <v-list-item >
                  <v-list-item-avatar><v-img :src="item.product.image"/></v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.product.name }} ({{ item.quantity }})</v-list-item-title>
                    <v-list-item-subtitle>{{ item.price }} {{ $t('aed') }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn color="amber" icon @click="openReviewDialog(item.product)">
                      <v-icon>
                        mdi-message-draw
                      </v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
                <v-divider />
              </div>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <v-dialog max-width="500px" v-model="reviewDialog">
      <v-card>
        <v-card-title>{{ $t('productReview') }}</v-card-title>
        <v-card-text>
          <v-list-item v-if="product">
            <v-list-item-avatar><v-img :src="product.image"/></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ product.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-textarea v-model="content" :label="$t('reviewContent')">

          </v-textarea>
          <v-rating color="amber" v-model="rating"></v-rating>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="setReview" color="secondary">{{ $t('setReview') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog max-width="500px" v-model="cancelDialog">
      <v-card>
        <v-card-title>{{ $t('cancelOrder') }}</v-card-title>
        <v-card-text>
          Are you sure you want to cancel this order
        </v-card-text>
        <v-card-actions>
          <v-btn @click="cancelOrder" dark color="blue">{{ $t('yes') }}</v-btn>
          <v-btn @click="cancelDialog = false" dark color="red">{{ $t('no') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "orders",
  data()
  {
    return {
      reviewDialog: false,
      product: null,
      rating: 3,
      orderId: null,
      cancelDialog: false,
      content: null,
    }
  },
  computed:
    {
      ...mapGetters({
        orders: 'orders/getData',
        loading: 'orders/getLoading',
      })
    },
  mounted() {
    if(this.$cookies.get('cart_token')) this.getOrders(this.$cookies.get('cart_token'))
  },
  methods: {
    ...mapActions({
      getOrders: 'orders/fetchData',
    }),
    generateColor(status)
    {
      if(status == 'success') return 'success'
      if(status == 'progress') return 'info'
      if(status == 'pending') return 'orange'
      if(status == 'refunded') return 'purple'
    },
    openReviewDialog(product)
    {
      this.product = product;
      this.reviewDialog = true;
      this.rating = 3;
      this.content = null;
    },
    setReview()
    {
      this.$axios.post('review/store',{
        token: this.$cookies.get('cart_token'),
        rating: this.rating,
        content: this.content,
        product_slug: this.product.slug
      }).then(res => {
        if(res.data.status == "success") this.reviewDialog = false
      })
    },
    openCancelDialog(order)
    {
      this.orderId = order.id;
      this.cancelDialog = true;
    },
    cancelOrder()
    {
      this.$axios.post('order/cancel',{
        token: this.$cookies.get('cart_token'),
        order_id: this.orderId
      }).then(res => {
        if(res.data.status == "success") this.cancelDialog = false
        if(this.$cookies.get('cart_token')) this.getOrders(this.$cookies.get('cart_token'))
      })
    }
  }
}
</script>

<style scoped>

</style>
