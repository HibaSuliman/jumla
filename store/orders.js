
export const state = () => ({
  orders: [],
  loading: true,
})

export const getters = {
  getData(state) {
    return state.orders
  },
  getLoading(state) {
    return state.loading
  },
}

export const mutations = {
  storeData(state, data) {
    state.orders = data
  },

  switchLoading(state,status){
    state.loading = status
  },
}

export const actions = {
  fetchData(store,token)
  {
    store.commit('switchLoading',true)
    this.$axios.get('orders?token=' + token,{}).then(res => {
      if(res.data.status == 'success') store.commit('storeData',res.data.data);
    }).finally(() => {
      store.commit('switchLoading',false)
    });
  }
}

