
export const state = () => ({
  slider: {},
  loading: true,
})

export const getters = {
  getData(state) {
    return state.slider
  },
  getLoading(state) {
    return state.loading
  },
}

export const mutations = {
  storeData(state, data) {
    state.slider = data
  },
  switchLoading(state,status){
    state.loading = status
  },
}

export const actions = {
  fetchData(store,slider_id)
  {
    store.commit('switchLoading',true)
    this.$axios.get('slider/' + slider_id,{}).then(res => {
      if(res.data.status == 'success') store.commit('storeData',res.data.data);
    }).finally(() => {
      store.commit('switchLoading',false)
    });
  }
}

