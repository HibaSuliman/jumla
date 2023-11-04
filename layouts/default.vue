<template>
  <v-app>
    <v-app-bar
      height="120px"
      :clipped-left="clipped"
      fixed
      flat
      color="primary"
      app

    >
      <v-toolbar-title>
        <nuxt-link class="text-decoration-none d-flex align-center justify-center" :to="localePath('/')">
          <v-img max-width="60px" height="100px" max-height="100px" src="/logo.png"></v-img></nuxt-link></v-toolbar-title>
      <v-spacer/>
      <v-btn href="https://www.facebook.com/biljumlastore/" target="_blank" icon color="white">
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
      <v-btn href="https://www.instagram.com/biljumlastore/" target="_blank"  icon color="white">
        <v-icon>mdi-instagram</v-icon>
      </v-btn>
    </v-app-bar>
    <v-toolbar color="white"  style="top: 120px;position: fixed;z-index: 5;width: 100%" dense>
      <!--            <mega-menu v-if="$vuetify.breakpoint.lgAndUp" :title="menu.name" :items="menu.items" v-for="menu in menus"/>-->
      <!--            <v-btn icon nuxt :to="localePath('/')"><v-icon>mdi-home</v-icon></v-btn>-->
      <v-btn
        color="primary"
        icon
        @click="loginDialog = true"
        v-if="!$auth.loggedIn"

      >
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <profile-menu v-if="$auth.loggedIn" />
      <!--      <delivery />-->
      <v-btn color="primary" icon @click="shopping_cart = !shopping_cart">
        <v-badge overlap color="red" bordered  :content="cart.total_items" v-if="cart.token">
          <v-icon>mdi-shopping</v-icon>
        </v-badge>
        <v-icon v-else>mdi-shopping</v-icon>
      </v-btn>

      <v-spacer />
      <v-text-field v-model="query" class="mt-6" outlined dense append-icon="mdi-magnify" @click:append="search()"/>
      <v-spacer />
      <change-language />
      <v-btn @click="rightDrawer = !rightDrawer" icon><v-icon>mdi-menu</v-icon></v-btn>
    </v-toolbar>
    <v-main style="margin-top: 60px">
      <toast-notification />
      <Nuxt />
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :left="this.$vuetify.rtl"
      :right="!this.$vuetify.rtl"
      temporary
      app
    >
      <v-card flat>
        <v-card-text class="text-capitalize">
          <v-list-item nuxt :to="localePath('/')">
            <v-list-item-content>{{ $t('home') }}</v-list-item-content>
          </v-list-item>
          <v-list-item nuxt :to="localePath('/search')">
            <v-list-item-content>{{ $t('shop') }}</v-list-item-content>
          </v-list-item>
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-title>{{ $t('categories') }}</v-list-item-title>
            </template>
            <v-list dense>
              <menus-list :title="menu.name" :menu="menu" :items="menu.items" v-for="menu in categories"/>
            </v-list>
          </v-list-group>
          <v-divider />
          <v-list-item nuxt :to="localePath('/page/about-us')">
            <v-list-item-content>{{ $t('about_us') }}</v-list-item-content>
          </v-list-item>
          <v-list-item nuxt :to="localePath('/contact')">
            <v-list-item-content>{{ $t('contactUs') }}</v-list-item-content>
          </v-list-item>
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
    <v-navigation-drawer
      temporary
      v-model="shopping_cart"
      :left="!this.$vuetify.rtl"
      :right="this.$vuetify.rtl"
      app
    >
      <v-card flat height="100%">
        <v-card-text>
          <v-subheader>{{ $t('shoppingCart') }}</v-subheader>
          <v-list dense style="position: relative;bottom: 20px;top:5px">
            <div>
              <v-list-item v-for="item in cart.items">
                <v-list-item-avatar tile>
                  <v-img :src="item.product.image"/>
                </v-list-item-avatar>
                <v-list-item-title><span class="text--primary">({{ item.quantity }})</span> {{ item.product.name }}</v-list-item-title>
                <v-list-item-content>
                  <span class="text--primary">({{ item.quantity }})</span>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list>
        </v-card-text>
        <div class="white" style="position: fixed;bottom: 0px;width: 100%">
          <div class="d-block mx-auto" style="width: calc(100% - 50px);">
            <v-btn v-if="$auth.loggedIn" nuxt :to="localePath('/checkout')" class=" mb-4 mt-4" block color="secondary" >{{ $t('checkout') }}</v-btn>
            <v-btn v-if="!$auth.loggedIn" @click="loginDialog = true" class=" mb-4 mt-4" block color="secondary" >{{ $t('checkout') }}</v-btn>
          </div>
        </div>
      </v-card>
    </v-navigation-drawer>
    <v-dialog v-model="loginDialog" v-if="!$auth.loggedIn" max-width="700">
      <v-card>
        <login-card v-if="!registerCard" />
        <register-card :login-dialog="loginDialog" v-else />
        <v-card-text>
          <v-btn v-if="!registerCard" text @click="registerCard = true">{{
              $t('auth.register')
            }}
          </v-btn>
          <v-btn v-else text @click="registerCard = false">{{
              $t('auth.login')
            }}
          </v-btn>
        </v-card-text>

      </v-card>
    </v-dialog>
    <app-footer />
    <v-btn
      href="https://wa.me/971542525662" target="_blank"
      style="position:fixed;bottom: 70px;right: -65px;transform: rotate(-90deg);border-radius: 15px 15px 0px 0px"
      class="mx-2"
      rounded
      dark
      large
      color="green"
    >
      حياك واتساب
      <v-icon dark>
        mdi-whatsapp
      </v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      loginDialog: false,
      registerCard: false,
      shopping_cart: false,
      fixed: false,
      query: null,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'بالجملة'
    }
  },
  computed:{
    ...mapGetters({
      menus: 'menus/getData',
      categories: 'categories/getData',
      loading: 'menus/getLoading',
      cart: "cart/getData",
    })
  },
  mounted() {
    this.getMenus()
    this.getCategories()
    this.getCart(this.$cookies.get('cart_token'))
  },
  methods: {
    ...mapActions({
      getMenus: 'menus/fetchData',
      getCategories: 'categories/fetchData',
      getCart: 'cart/fetchData'
    }),
    search()
    {
      this.$router.push(this.localePath('/search?query=' + this.query))
    }
  }
}
</script>
<style>
input[type="password"]
{
  font-family: auto;
}
</style>
