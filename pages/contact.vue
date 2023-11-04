<template>
  <div>
    <h1 class="text-center mt-6">{{ $t('contactUs') }}</h1>
    <p class="text-center">{{ $t('anyQuestionOrRemarksJustWriteUsAMessage') }}</p>
    <v-container>
      <v-row class="mb-5">
        <v-col cols="12" md="6">
          <v-form v-model="valid">
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field :label="$t('auth.name')" :rules="[
                      v => !!v || $t('validation.required'),

                      ]" v-model="formData.full_name"/>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field :label="$t('auth.email')" :rules="[
                      v => !!v || $t('validation.required'),
                      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || $t('validation.email')
                      ]" v-model="formData.email"/>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field :label="$t('auth.phone')" :rules="[
            (v) => !!v || $t('validation.required'),
            v => v.length == 10  || $t('validation.required'),
            v => Number.isInteger(Number(v)) || $t('validation.phone'),
        ]" v-model="formData.phone"/>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-textarea :rules="[
                      v => !!v || $t('validation.required'),
                      ]" :label="$t('message')" v-model="formData.message"/>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-btn :disabled="!valid" v-text="$t('submit')" block color="black" class="white--text" @click="submitForm"/>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
        <v-col cols="12" md="6">
          <div class="mx-12">
            <p>{{ $t('emailAddress') }} : <span>info@biljumla.com</span></p>
            <p></p>
            <p>{{ $t('phoneNumber') }} : <span>+971 50 540 5424</span></p>
            <p></p>
            <p>{{ $t('basedIn') }} : {{ $t('unitedArabEmirates') }}</p>
            <p></p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "faqs",
  computed: {},
  data() {
    return {
      valid: false,
      formData: {
        full_name: null,
        email: null,
        phone: '',
        message: null
      },
    }
  },
  mounted() {
    this.$axios.get('faqs').then(res => {
      console.log(res.data)
      if (res.data) {
        this.faqs = res.data.data
      }
    })
  },
  methods: {
    submitForm() {
      this.$axios.post('contact', this.formData).then(res => {
        if (res.data.status == 'success') {
          this.$toast.showMessage({
            status: 'success',
            message: 'message sent with success'
          })
          this.formData = {
              full_name: null,
              email: null,
              phone: '',
              message: null
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
