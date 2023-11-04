<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="9">
        <v-card flat>
          <v-card-text>
            <v-text-field v-model="query" class="mt-6" outlined dense append-icon="mdi-magnify" @click:append="search()"/>
            <p><span>{{ $t('searchResultOf') }} </span><span> : {{ query }}</span></p>
            <v-layout wrap justify-center align-center>
              <product class="mx-1" v-for="product in products" :product="product"/>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card>
          <v-card-text>
            <h3>{{ $t('categories') }}</h3>
            <v-virtual-scroll height="300" :item-height="30" :items="categories">
              <template v-slot:default="{ item }">
                <v-checkbox class="mt-1 mb-1" :value="item.id" :label="item.name" v-model="categories_query"></v-checkbox>
              </template>
            </v-virtual-scroll>
            <v-divider />
            <v-range-slider
              class="mt-3"
              v-model="prince_range"
              max="500"
              min="1"
              :label="$t('priceRange')"
              step="10"
              ticks="always"
            >
              <template v-slot:thumb-label="props">
                {{ props.value }}
              </template>
            </v-range-slider>
          </v-card-text>
          <v-card-actions>
            <v-btn block color="secondary" @click="search()">{{ $t('filter') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "search",
  data()
  {
    return {
      products: [],
      prince_range: [1,200],
      categories_query: [],
      query: null
    }
  },
  computed:{
    ...mapGetters({
      categories: 'categories/getData',
    })
  },
  mounted() {

    if(this.$route.query.query) this.query = this.$route.query.query;


    this.search();
    this.getCategories();
  },
  methods: {
    ...mapActions({
      getCategories: 'categories/fetchData',
    }),
    search()
    {
      let params = new URLSearchParams({
        query: this.query,
        categories_query: this.categories_query,
        price_range: this.prince_range,
      })
      this.$axios.get('products/search',{
        params
      }).then(res => {
        if(res.data.status == 'success') this.products = res.data.data
      })
    }
  }
}
</script>

<style scoped>

</style>
