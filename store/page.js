
export const state = () => ({
  page: {},
  loading: true,
})

export const getters = {
  getData(state) {
    return state.page
  },
  getLoading(state) {
    return state.loading
  },
}

export const mutations = {
  storeData(state, data) {
    state.page = data
  },
  switchLoading(state,status){
    state.loading = status
  },
}

export const actions = {
  fetchData(store,page_id)
  {
    store.commit('switchLoading',true)
    this.$axios.get('page/' + page_id,{}).then(res => {
      if(res.data.status == 'success') store.commit('storeData',res.data.page);
    }).finally(() => {
      store.commit('switchLoading',false)
    });
  }
}

