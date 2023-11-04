
export const state = () => ({
  address: [],
  selectedAddress: null,
  loading: true,
})

export const getters = {
  getData(state) {
    return state.address
  },
  getSelectedAddress(state)
  {
    return state.selectedAddress
  },
  getLoading(state) {
    return state.loading
  },
}

export const mutations = {
  storeData(state, data) {
    state.address = data
  },

  switchLoading(state,status){
    state.loading = status
  },

  setSelectedAddress(state,status)
  {
    if(state.address.length > 0 && this.$cookies.get('address')){
      state.address.map(item => {
        if(item.id == this.$cookies.get('address')) state.selectedAddress = item
      })
    }
  }
}

export const actions = {
  fetchData(store,token)
  {
    store.commit('switchLoading',true)
    this.$axios.get('address/get?token=' + token,{}).then(res => {
      if(res.data.status == 'success')
      {
        store.commit('storeData',res.data.data);
        store.commit('setSelectedAddress')
      }
    }).finally(() => {
      store.commit('switchLoading',false)
    });
  },
  selectAddress(store)
  {
    store.commit('setSelectedAddress')
  }
}

