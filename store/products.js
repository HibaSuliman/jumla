
export const state = () => ({
  products: [],
  loading: true,
})

export const getters = {
  getData(state) {
    return state.products
  },
  getLoading(state) {
    return state.loading
  },
}

export const mutations = {
  storeData(state, data) {
    state.products = data
  },

  switchLoading(state,status){
    state.loading = status
  },
}

export const actions = {
  fetchData(store,category_slug)
  {
    store.commit('switchLoading',true)
    this.$axios.get('products/' + category_slug,{}).then(res => {
      if(res.data.status == 'success') store.commit('storeData',res.data.data);
    }).finally(() => {
      store.commit('switchLoading',false)
    });
  },

  filterData(store,data)
  {
    store.commit('switchLoading',true)
    this.$axios.get('products/filter',{
      data: data
    }).then(res => {
      if(res.data.status == 'success') store.commit('storeData',res.data.data);
    }).finally(() => {
      store.commit('switchLoading',false)
    });
  },
}

