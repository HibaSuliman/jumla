<template>
  <div>
    <v-btn
      color="secondary"
      outlined
      class="text-capitalize"
      @click="addAddress"
    >
      {{ $t('addAddress') }} <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="addressDialog">
      <v-card>
        <v-card-title>{{ $t('addAddress') }}</v-card-title>
        <v-card-text class="pa-4">
          <v-form>
            <v-layout>
              <v-text-field disabled outlined class="mx-2" value="United Arab Emirates" :label="$t('address.country')"/>
              <v-autocomplete autocomplete="off" aria-autocomplete="none" item-text="name" item-value="id" :items="cities" outlined class="mx-2" v-model="fields.city_id" :label="$t('address.city')"/>
            </v-layout>
            <v-text-field outlined class="mx-2" v-model="fields.address" :label="$t('address.address')"/>
            <v-text-field outlined class="mx-2" hint="optional" v-model="fields.address2" :label="$t('2', {t: $t('address.address')})"/>
            <v-layout>
              <v-text-field outlined class="mx-2" hint="optional"  v-model="fields.area" :label="$t('area')"/>
              <v-text-field outlined class="mx-2" hint="optional"  v-model="fields.nearby" :label="$t('nearby')"/>
            </v-layout>
            <v-radio-group row v-model="fields.type">
              <v-radio :label="$t('workspace')" value="workspace"/>
              <v-radio :label="$t('house')" value="house" />
              <v-radio :label="$t('company')" value="company"/>
            </v-radio-group>

            <v-btn color="secondary" class="text-capitalize" block @click="saveAddress">{{ $t('saveAddress') }}</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "addAddress",
  data() {
    return {
      formAddress: false,
      addressDialog: false,
      cities: [],
      fields: {
        type: "house",
        token: null,
        address: null,
        address2: null,
        country: 'United Arab Emirates',
        city: null,
        area: null,
        nearby: null,
      },
      loading: false,
    }
  },
  created() {
    this.$axios.get('/cities').then(res => {
      console.log(res.data)
      this.cities = res.data.data
    })
  },
  methods: {
    ...mapActions({
      getAddresses: 'addresses/fetchData',
      getDays: 'days/fetchData'
    }),
    addAddress() {
      this.addressDialog = true;
      this.fields = {
        token: this.$cookies.get('cart_token'),
        address: null,
        address2: null,
        country: null,
        city_id: null,
        area: null,
        nearby: null,
        type: "house"
      }
    },
    saveAddress()
    {
      this.loading = true;
      this.$axios.post('address/store',this.fields).then(res => {
        if(res.data.status == 'success')
        {
          this.formAddress = false;
          this.addressDialog = false;
          this.getAddresses(this.$cookies.get('cart_token'));
        }
      }).finally(() => {
        this.loading = false;
      })
    }
  }
}
</script>

<style scoped>

</style>
