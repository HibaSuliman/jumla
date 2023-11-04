<template>
    <v-container style="direction: ltr" class="text-left">
      <v-card outlined v-if="order">
        <v-card-text>
          <v-layout class="mx-4 mt-4 mb-4" row justify-center align-center>
            <div>
              <h1 class="text-uppercase">Invoice #{{ order.id }}</h1>
              <p>{{ order.created_at }}</p>
            </div>
            <v-spacer/>
            <img style="max-width: 80px" src="/icon.png" />
          </v-layout>
          <v-divider class="mb-4"/>
          <v-layout class="mx-4 mt-4 mb-4" row>
            <div>
              <h3 class="text-uppercase">Invoice to</h3>
              <p>{{ order.phone }}</p>
              <p>{{ order.address.address }} - {{ order.address.city }} ({{ order.address.country }})</p>
              <p>{{ order.address.area }} {{ order.address.nearby }}</p>
            </div>
            <v-spacer />
            <div>
              <h2>Biljumla</h2>
              <p>+971 50 540 5424</p>
            </div>
          </v-layout>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr class="text-uppercase">
                <th class="text-left">
                  Product
                </th>
                <th class="text-left">
                  QTY
                </th>
                <th class="text-left">
                  PRICE
                </th>
                <th class="text-left">
                  TOTAL
                </th>
              </tr>
              </thead>
              <tbody>
                <tr v-for="item in order.items">
                  <td>
                    {{ item.product.name }}
                    <br>
                    <span v-if="item.product.translations">
                      {{ item.product.translations[0].value }}
                    </span>
                  </td>
                  <td v-text="item.quantity" />
                  <td v-text="(item.product.reduction ? item.product.reduction : item.product.price) + ' ' +  $t('aed')"/>
                  <td v-text="item.price + ' ' +  $t('aed')"/>
                </tr>
              <tr>
                <td colspan="2">

                </td>
                <td colspan="2">
                  <div class="text-center">
                    <h3 class="mt-2 text-uppercase">amount: {{ order.net_total }} {{ $t('aed') }}</h3>
                    <h3 class="mt-2 text-uppercase" v-if="order.coupon_reduction">reduction: -{{ order.coupon_reduction }} {{ $t('aed') }}</h3>
                    <h3 class="mt-2 text-uppercase">delivery price: {{ order.delivery_price }} {{ $t('aed') }}</h3>
                    <h3 class="mt-2 text-uppercase">tax: {{ order.fees }} {{ $t('aed') }}</h3>
                    <v-divider class="black mt-3 mb-3"/>
                    <h1>TOTAL : {{ order.total }} {{ $t('aed') }}</h1>
                  </div>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn class="d-print-none" icon color="blue" @click="printWindow"><v-icon>mdi-printer</v-icon></v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-container>
</template>

<script>
export default {
  name: "_id",
  layout: 'empty',
  data()
  {
    return {
      order: null,
    }
  },
  mounted() {
    let order_id = this.$route.params.id
    let token = this.$route.query.token
    if(!token) token = this.$cookies.get('cart_token')
    this.$axios.get('order?order_id=' + order_id + '&token=' + token).then(res => {
      if(res.data.status == 'success') this.order = res.data.data
    })
  },
  methods: {
    printWindow()
    {
      window.print();
    }
  }
}
</script>

<style scoped>

</style>
