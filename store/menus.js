
export const state = () => ({
  menus: [],
  loading: true,
})

export const getters = {
  getData(state) {
    return state.menus
  },
  getLoading(state) {
    return state.loading
  },
}

export const mutations = {
  storeData(state, data) {
    state.menus = data
  },

  switchLoading(state,status){
    state.loading = status
  },
}

export const actions = {
  fetchData(store)
  {
    store.commit('switchLoading',true)
    this.$axios.get('menus',{}).then(res => {
      if(res.data.status == 'success') store.commit('storeData',res.data.menus);
    }).finally(() => {
      store.commit('switchLoading',false)
    });
  }
}

