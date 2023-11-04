<template>
  <div>
    <v-row class="mb-7">
      <v-col v-for="(address, key ) in addresses" cols="12" md="4">
        <v-card outlined>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="editAddressDialog(address,key)" icon color="blue">
              <v-icon>mdi-file-edit</v-icon>
            </v-btn>
            <v-btn @click="deleteAddress(address,key)" icon color="red">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-text>
            <p><span>{{ $t('address.address') }}</span>  {{ address.address }}</p>
            <p><span>{{ $t('country') }}</span> {{ address.country }}</p>
            <p v-if="address.city"><span>{{ $t('address.city') }}</span> {{ address.city.name }}</p>
            <p><span>{{ $t('area') }}</span> {{ address.area }}</p>
            <p><span>{{ $t('nearby') }}</span> {{ address.nearby }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" style="height: auto">
        <v-card @click="addAddress" outlined height="100%" class="d-flex align-center justify-center">
          <v-icon class="text-center" size="50">mdi-plus</v-icon>
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="mt-4 mb-4"/>

    <v-dialog v-model="formAddress">
      <v-card>
        <v-card-text class="pa-4">
          <v-form>
            <v-layout>
              <v-text-field disabled outlined class="mx-2" value="United Arab Emirates" :label="$t('address.country')"/>
              <v-autocomplete autocomplete="off" aria-autocomplete="none" item-text="name" item-value="id" :items="cities" outlined class="mx-2" v-model="fields.city_id" :label="$t('address.city')"/>
            </v-layout>
            <v-text-field outlined class="mx-2" v-model="fields.address" :label="$t('address.address')"/>
            <v-text-field outlined class="mx-2" v-model="fields.address2" :label="$t('2', {t: $t('address.address')})"/>
            <v-layout>
              <v-text-field outlined class="mx-2" v-model="fields.area" :label="$t('area')"/>
              <v-text-field outlined class="mx-2" v-model="fields.nearby" :label="$t('nearby')"/>
            </v-layout>
            <v-radio-group row v-model="fields.type">
              <v-radio :label="$t('workspace')" value="workspace"/>
              <v-radio :label="$t('house')" value="house"/>
              <v-radio :label="$t('company')" value="company"/>
            </v-radio-group>

            <v-btn color="secondary" class="text-capitalize" v-if="!fields.id" block @click="saveAddress">{{ $t('saveAddress') }}</v-btn>
            <v-btn color="secondary" class="text-capitalize" v-if="fields.id" block @click="updateAddress">{{ $t('editAddress') }}</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "editAddress",
  data() {
    return {
      formAddress: false,
      cities: [],
      fields: {
        token: null,
        address: null,
        address2: null,
        country: 'United Arab Emirates',
        city: null,
        area: null,
        nearby: null,
        type: null,
      },
      loading: false,
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
    editAddressDialog(address)
    {
      this.fields = address;
      this.fields = {
        id: address.id,
        token: address.token,
        address: address.address,
        address2: address.address2,
        country: address.country,
        city_id: address.city_id,
        area: address.area,
        nearby: address.nearby,
        type: address.type,
      }
      this.formAddress = true;
    },
    addAddress() {
      this.formAddress = true;
      this.fields = {
        token: this.$cookies.get('cart_token'),
        address: null,
        address2: null,
        country: null,
        city_id: null,
        area: null,
        nearby: null,

      }
    },
    deleteAddress(address,key)
    {
      let fields = {
        address_id: address.id,
        token: address.token
      }
      this.$axios.post('address/delete',fields).then(res => {
        if(res.data.status == 'success')
        {
          this.getAddresses(this.$cookies.get('cart_token'));
        }
      })
    },
    saveAddress()
    {
      this.loading = true;
      this.$axios.post('address/store',this.fields).then(res => {
        if(res.data.status == 'success')
        {
          this.formAddress = false;
          this.getAddresses(this.$cookies.get('cart_token'));
        }
      }).finally(() => {
        this.loading = false;
      })
    },
    updateAddress()
    {
      this.loading = true;
      this.$axios.post('address/update',this.fields).then(res => {
        if(res.data.status == 'success')
        {
          this.formAddress = false;
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
