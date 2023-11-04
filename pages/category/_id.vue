<template>
  <div>
    <v-container fluid>
      <v-breadcrumbs :items="[
        {
          text: $t('home'),
          disabled: false,
          href: localePath('/'),
        },
        {
          text: $t('categories'),
          disabled: false,
          href: localePath('/'),
        },
        {
          text: $t('categories'),
          disabled: false,
          href: localePath('/'),
        }
      ]">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
      <v-row>
        <v-col cols="12" lg="3">
          <v-card outlined>
            <v-card-text>
              <v-list-group
                v-if="subCategories.length > 0"
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>{{ $t('subCategory') }}</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item
                  v-for="subCategory in subCategories"
                  :key="subCategory.id"
                  link
                >
                  <v-list-item-content>
                    <v-checkbox :value="subCategory.slug" v-model="subCategoriesValues" :label="subCategory.name"/>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" lg="9">
          <v-layout wrap>
            <div class="mx-3" v-for="product in products">
              <product :product="product" />
            </div>
          </v-layout>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";


export default {
  name: "_id",
  computed:{
    ...mapGetters({
      products: 'products/getData',
      loading: 'products/getLoading'
    })
  },
  data()
  {
    return {
      subCategories: [],
      subCategoriesValues: [],
    }
  },
  created() {
    this.getProducts(this.$route.params.id);
    this.$axios.get('subCategories/' + this.$route.params.id).then(res => {
      this.subCategories = res.data.data
    })
  },
  methods: {
    ...mapActions({
      getProducts: 'products/fetchData'
    }),
  }
}
</script>

<style scoped>

</style>
