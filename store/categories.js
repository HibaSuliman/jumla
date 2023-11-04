
export const state = () => ({
  categories: [],
  loading: true,
})

export const getters = {
  getData(state) {
    return state.categories
  },
  getLoading(state) {
    return state.loading
  },
}

export const mutations = {
  storeData(state, data) {
    state.categories = data
  },

  switchLoading(state,status){
    state.loading = status
  },
}

export const actions = {
  fetchData(store)
  {
    store.commit('switchLoading',true)
    this.$axios.get('categories',{}).then(res => {
      if(res.data.status == 'success') store.commit('storeData',res.data.data);
    }).finally(() => {
      store.commit('switchLoading',false)
    });
  },

}

