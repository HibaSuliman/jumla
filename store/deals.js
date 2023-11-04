
export const state = () => ({
  deals: [],
  loading: true,
})

export const getters = {
  getData(state) {
    return state.deals
  },
  getLoading(state) {
    return state.loading
  },
}

export const mutations = {
  storeData(state, data) {
    state.deals = data
  },

  switchLoading(state,status){
    state.loading = status
  },
}

export const actions = {
  fetchData(store)
  {
    store.commit('switchLoading',true)
    this.$axios.get('deals',{}).then(res => {
      if(res.data.status == 'success') store.commit('storeData',res.data.data);
    }).finally(() => {
      store.commit('switchLoading',false)
    });
  }
}

