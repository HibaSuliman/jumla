
export const state = () => ({
  favorite: {
    items: [],
    total_items:0,
  },
  loading: true,
})

export const getters = {
  getData(state) {
    return state.favorite
  },
  getLoading(state) {
    return state.loading
  },
}

export const mutations = {
  storeData(state, data) {
    state.favorite = data
  },
  switchLoading(state,status){
    state.loading = status
  },

  updateFavorite(state)
  {
    state.favorite.total_items = state.items.length;
  },
  deleteItem(state,itemKey)
  {
    this.$axios.post('favorite/delete',{
      token: state.cart.token,
      product_slug: state.cart.items[itemKey].product.slug,
    })
    state.cart.items.splice(itemKey,1)
  }
}

export const actions = {
  fetchData(store)
  {
    store.commit('switchLoading',true)
    this.$axios.get('/favorite/get',{}).then(res => {
      if(res.data.status == 'success'){
        store.commit('storeData',res.data.data);

      }
    }).finally(() => {
      store.commit('switchLoading',false)
    });
  },
  storeData(store,data)
  {
    store.commit('switchLoading',true)
    this.$axios.post('/favorite/store',data).then(res => {
      if(res.data.status == 'success'){
        this.$cookies.set('cart_token',res.data.data.token)
        store.commit('storeData',res.data.data);
      }
    })
  },
}

