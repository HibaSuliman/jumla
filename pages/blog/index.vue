<!--
  - Copyright (c) 2020.
  - Author:  Belgacemi mohamed seddik
  - github:  http://github.com/seddik32
  - facebook: https://www.facebook.com/Qsd5k
  - email: sed75dik@gmail.com
  - Last modified: 4/16/20, 11:38 PM
  -->

<template>
    <v-container>
      <v-list>
        <div v-for="post in posts">
          <v-list-item >
            <v-list-item-avatar size="80" tile><v-img :alt="post.title" :src="post.image"/></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ post.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ post.excerpt }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn :to="'/post/' + post.slug" color="blue" nuxt text>{{
                  $t('read_more')
                }}
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider class="mt-2 mb-2" />
        </div>

      </v-list>
    </v-container>
</template>

<script>
    export default {
        name: 'Index',
        head() {
            return {
                title: this.$t('blog')
            }
        },
        data() {
            return {
                page: 1,
                posts: [],
                paginatorInfo: {},
                loading: true
            }
        },
        mounted() {
            this.getPosts()
        },
        methods: {
            getPosts() {
                const page = this.page
                console.log(page)
                this.$axios
                    .get('posts?page=' + this.page)
                    .then((res) => {
                        console.log(res)
                        this.posts = res.data.posts

                    })
                    .catch((e) => {
                        console.error(e)
                    })
                    .finally(() => {
                        this.loading = false
                    })
            }
        }
    }
</script>

<style scoped></style>
