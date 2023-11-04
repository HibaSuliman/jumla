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
      <v-card v-if="!loading">
        <v-card-title>
          <v-spacer/>
          {{ post.title }}
          <v-spacer/>
        </v-card-title>
        <v-divider class="mt-4 mb-4"/>
        <v-img max-height="250px" width="auto" class="mx-7" :src="post.image"/>
        <v-card-text class="black--text" v-html="post.body"/>
      </v-card>
    </v-container>
</template>

<script>
export default {
    name: 'Slug',
    head() {
        return {
            title: this.post ? this.post.title : ''
        }
    },
    data() {
        return {
            post: null,
            loading: true
        }
    },
    mounted() {
        this.getPost()
    },
    methods: {
        getPost() {
            const slug = this.$route.params.slug

            return this.$axios
                .get('post/' + slug)
                .then((res) => {
                    console.log(res.data)
                    if(res.data.status === 'success')
                    {
                      this.post = res.data.post
                      this.loading = false
                    }
                })
        }
    }
}
</script>

<style scoped></style>
