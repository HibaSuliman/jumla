<!--
  - Copyright (c) 2020.
  - Author:  Belgacemi mohamed seddik
  - github:  http://github.com/seddik32
  - facebook: https://www.facebook.com/Qsd5k
  - email: sed75dik@gmail.com
  - Last modified: 6/12/20, 1:21 PM
  -->

<template>
  <section>
    <v-snackbar :color="message.color" v-model="message.activate">
      {{ $t(message.text) }}
      <v-btn @click="message.activate = false" color="white" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-container class="mt-4">
      <div>
        <v-card flat elevation="0" v-if="!loading">
          <v-row>
            <v-col cols="12" md="6">
              <v-carousel
                      cycle
                      delimiter-icon="mdi-minus"
                      hide-delimiter-background
                      hide-delimiters
                      show-arrows-on-hover
                      v-model="carousel"
              >
                <v-carousel-item
                        :src="item"
                        v-for="item in product.images"
                />
              </v-carousel>
              <v-slide-group
                      center-active
                      class="pa-2 mt-2"
                      show-arrows
                      v-model="carousel"
              >
                <v-slide-item
                        :key="key"
                        v-for="(item, key) in product.images"
                        v-slot:default="{ active, toggle }"
                >
                  <v-card
                          :color="active ? 'blue' : 'grey lighten-1'"
                          @click="toggle"
                          class="ma-2"
                          height="75"
                          width="75"
                  >
                    <v-avatar size="75" tile>
                      <v-img :src="item">
                        <v-overlay absolute v-if="active"/>
                      </v-img>
                    </v-avatar>
                  </v-card>
                </v-slide-item>
              </v-slide-group>
            </v-col>
            <v-col cols="12" md="6">
              <v-card flat height="100%">
                <v-row align="center" class="mx-0">
                  <v-rating
                          :value="4.4"
                          color="amber"
                          half-increments
                          readonly
                          size="17"
                  ></v-rating>
                  <div class="grey--text ml-4">
                    ({{ rate }})
                  </div>
                </v-row>
                <v-card-title class="ma-4">{{ product.name }}</v-card-title>
                <v-chip
                        v-if="product.category"
                        :to="'/category/' + product.category.slug"
                        class="white--text"
                        color="primary"
                        nuxt
                >{{ product.category.name }}
                </v-chip
                >
                <h3 class="ma-3" v-if="product.reduction">
                <span class="red--text" style="text-decoration: line-through;"
                >{{ product.price }}{{ $t('aed') }}</span
                >
                  - {{ product.reduction }} {{ $t('aed') }}
                </h3>
                <h3 class="ma-3" v-else>
                  {{ product.price }} <span>{{ $t('aed') }}</span>
                </h3>
                <div>
                  <h3 class="ma-3 grey--text" v-if="product.stock > 1">{{ $t('stock') }}: {{ product.stock }}</h3>
                  <h3 class="ma-3 grey--text" v-else>{{ $t('outOfStock') }}</h3>
                </div>
                <div class="ma-3">
                  <div>{{ $t('quantity') }} :</div>
                  <v-btn @click="minQuantity" color="red" icon slot="prepend"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn
                  >
                  {{ quantity }}
                  <v-btn @click="plusQuantity" color="green" icon slot="append"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn
                  >
                </div>

                <v-card-actions>
                  <add-to-cart :out-of-stock="product.stock < 1" :product="product.slug" details/>
                  <add-to-favorit :product="product.slug" details />
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
        <v-row v-else>
          <v-col cols="12" md="6">
            <v-skeleton-loader
                    class="mx-auto"
                    ref="skeleton"
                    type="image"
            ></v-skeleton-loader>
          </v-col>
          <v-col cols="12" md="6">
            <v-skeleton-loader type="card-avatar"/>
            <v-skeleton-loader type="article"/>
            <v-skeleton-loader type="actions"/>
          </v-col>
        </v-row>
      </div>

    </v-container>
    <v-container fluid>
      <v-tabs
        grow
        v-if="!loading"
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab>
          {{ $t('description') }}
        </v-tab>
        <v-tab-item>
          <v-card class="mt-4" flat>
            <v-card-text>
              <p class="grey--text" v-html="product.description">
              </p>

              <v-simple-table v-if="product.specification">
                <template v-slot:default>
                  <tbody>
                  <tr v-for="item in product.specification">
                    <td>{{ item.name }}</td>
                    <td>{{ item.value }}</td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab>
          {{ $t('reviews') }}
        </v-tab>
        <v-tab-item>
          <v-card class="mt-4" flat>
            <v-card-text>
              <div v-for="review in product.reviews">
                <v-list>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-rating
                          :value="review.rate"
                          color="amber"
                          dense
                          half-increments
                          readonly
                          size="14"
                        />
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ review.created_at }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-divider/>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-container>
  </section>
</template>

<script>


  export default {
    name: 'Id',
    data() {
      return {
        conversationDialog: false,
        product: {},
        refundDate: '',
        carousel: 0,
        images: [],
        features: [],
        videoLink: null,
        delivery: null,
        productId: this.$route.params.id,
        loading: true,
        quantity: 1,
        delivery_date: null,
        delivery_time: null,
        message: {
          activate: false,
          message: '',
          color: null
        },
        valid: true
      }
    },
    head() {
      return {
        title: this.product.name,
      }
    },
    mounted() {
      this.$axios.get('product/' + this.productId).then(res => {
        if(res.data.status == 'success')
        {
          this.product = res.data.data
          this.loading = false
        }
      })
    },
    methods: {

      addToCart() {
        const product_id = this.product.id
        const quantity = parseInt(this.quantity)
        const options = '{}'
        const delivery_id = this.delivery
        const delivery_date = this.delivery_date
        const delivery_time = this.delivery_time

        /*
         * this.$store.commit('set_content',res.data);
         * */
        if (this.$auth.loggedIn) {
          if (this.product.stock < 1) {
            this.message = {
              activate: true,
              text: 'out_of_stock',
              color: 'error'
            }
          } else if (this.product.deliveries.length > 0 && !this.delivery) {
            this.message = {
              activate: true,
              text: 'chose_delivery',
              color: 'warning'
            }
          } else {

          }
        } else {
          this.$router.push('/auth/login')
        }
      },
      minQuantity() {
        if (this.quantity > 1) {
          this.quantity--
        }
      },
      plusQuantity() {
        if (this.quantity < this.product.stock) {
          this.quantity++
        }
      },
      addToWishlist() {
        const product_id = this.product.id
        if (this.$auth.loggedIn) {

        } else {
          this.$router.push('/auth/login')
        }
      },
    }
  }
</script>

<style scoped>
  .h-100 {
    height: 100% !important;
  }
</style>
