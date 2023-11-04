
export const state = () => ({
  days: [],
  loading: true,
})

export const getters = {
  getData(state) {
    return state.days
  },
  getLoading(state) {
    return state.loading
  },
}

export const mutations = {
  storeData(state, data) {
    state.days = data
  },

  switchLoading(state,status){
    state.loading = status
  },
}

export const actions = {
  fetchData(store,city_id)
  {
    store.commit('switchLoading',true)
    this.$axios.get('city/days?address_id=' +  city_id,{}).then(res => {
      if(res.data.status == 'success') store.commit('storeData',res.data.data);
    }).finally(() => {
      store.commit('switchLoading',false)
    });
  }
}

