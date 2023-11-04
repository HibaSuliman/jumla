<template>
  <div>
    <section class="mb-12">
      <v-carousel
        continuous
        cycle
        show-arrows
        hide-delimiter-background
        delimiter-icon="mdi-minus"
        :height="fullHeight"
        v-if="slider"
      >
        <v-carousel-item
          v-for="(slide, i) in slider.items"
          :key="i"
        >
          <v-img height="100%" :src="slide.image"/>
        </v-carousel-item>
      </v-carousel>
<!--      <v-container fluid>
        <v-slide-group>
          <v-slide-item v-for="category in categories">
            <category :category="category" :slug="category.slug" class="mx-4" />
          </v-slide-item>
        </v-slide-group>
      </v-container>-->
      <v-container class="mt-6">
        <div v-if="deal.deals && deal.deals.length > 0" v-for="deal in deals" class="mt-6">
          <h1 class="text-center">{{ deal.name }}</h1>
          <v-divider />
          <v-row class="mt-1" justify="center" align="center">
            <v-col cols="12" md="4">
              <div class="pa-4">
                <v-card outlined>
                  <v-card-text class="pa-1">
                    <v-img v-if="$vuetify.breakpoint.mdAndUp" height="450px" width="100%" :src="deal.image" />
                  </v-card-text>
                </v-card>
                <v-layout>
                  <v-spacer/>
                  <v-btn class="mt-3" color="secondary" nuxt :to="localePath('/category/' + deal.slug)">shop now</v-btn>
                  <v-spacer/>
                </v-layout>
              </div>
            </v-col>
            <v-col cols="12" md="8">
              <v-layout wrap justify-center>
                <product v-for="product in deal.deals" class="mx-4" :product="product" />
              </v-layout>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </section>
  </div>
</template>

<script>
import Product from "@/components/Product.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'IndexPage',
  components: {Product},
  computed:{
    ...mapGetters({
      categories: 'categories/getData',
      deals: 'deals/getData',
      loading: 'categories/getLoading',
      slider: 'sliders/getData'
    }),
    fullHeight()
    {
      return window.innerHeight - 120;
    }
  },
  data () {
    return {
      products: null,
      cycle: false,
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
    }
  },
  mounted() {
    this.getCategories();
    this.getDeals();
    this.getSlider(1);
  },
  methods: {
    ...mapActions({
      getCategories: 'categories/fetchData',
      getDeals: 'deals/fetchData',
      getSlider: 'sliders/fetchData'
    }),
  }
}
</script>
