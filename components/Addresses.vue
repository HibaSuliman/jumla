<template>
  <div>
    <div v-if="details">
      <v-radio-group @change="changeAddress" class="mt-0" v-model="address">
        <v-list>
          <v-list-item two-line v-for="address in addresses">
            <v-list-item-avatar>
              <v-icon color="primary">mdi-map</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ address.address }} </v-list-item-title>
              <v-list-item-subtitle v-if="address.city">{{ address.city.name }} ({{ address.area }})</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-radio :value="address.id"/>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-radio-group>
      <v-divider class="mt-4 mb-4" />
    </div>
    <v-menu
      v-else
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="300"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          color="primary"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-map-marker</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-text class="px-0">
          <h4 class="mx-4">{{ $t('yourAddress') }}</h4>
          <v-radio-group @change="changeAddress" class="mt-0" v-model="address">
            <v-list>
              <v-list-item two-line v-for="address in addresses">
                <v-list-item-avatar>
                  <v-icon color="primary">mdi-map</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ address.address }} </v-list-item-title>
                  <v-list-item-subtitle v-if="address.city">{{ address.city.name }} ({{ address.area }})</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-radio :value="address.id"/>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-radio-group>
          <v-divider></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-btn
            block
            color="secondary"
            outlined
            class="text-capitalize"
            nuxt
            @click="menu = false"
            :to="localePath('address')"
          >
            {{ $t('addAddress') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Addresses",
  props: {
    details: Boolean
  },
  data()
  {
    return {
      menu: false,
      address: null,
    }
  },
  computed:
  {
  ...mapGetters({
    addresses: 'addresses/getData',
    loading: 'addresses/getLoading',
  })
  },
  mounted() {
    this.getAddresses(this.$cookies.get('cart_token'));
    this.address = this.$cookies.get('address')
    this.setSelectedAddress();
  },
  methods: {
    ...mapActions({
      getAddresses: 'addresses/fetchData',
      setSelectedAddress: 'addresses/selectAddress',
      getDays: 'days/fetchData'
    }),
    changeAddress()
    {
      this.$cookies.set('address',this.address);
      this.setSelectedAddress();
      this.getDays(this.address);
    }
  }
}
</script>

<style scoped>

</style>
