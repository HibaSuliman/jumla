<template>
  <v-container fluid>
    <v-card>
      <v-tabs color="secondary" centered :vertical="$vuetify.breakpoint.mdAndUp">
        <v-tab class="mx-0">
          <v-icon>
            mdi-map
          </v-icon>
          {{ $t('editAddress') }}
        </v-tab>
        <v-tab>
          <v-icon>
            mdi-account
          </v-icon>
          {{ $t('editProfile') }}
        </v-tab>
        <v-tab>
          <v-icon>
            mdi-lock
          </v-icon>
          {{ $t('change_password') }}
        </v-tab>
        <v-tab>
          <v-icon>
            mdi-clipboard
          </v-icon>
          {{ $t('browseOrders') }}
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <edit-address />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <edit-profile />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <password />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <orders />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
import EditProfile from "@/components/profile/editProfile.vue";
import Orders from "@/pages/orders.vue";
import Password from "@/pages/setting/password.vue";

export default {
  name: "account",
  components: {Password, Orders, EditProfile},
  middleware: 'auth',

}
</script>

<style>
.v-slide-group__content {
  align-items: flex-start !important;
}
</style>
