
export const state = () => ({
  cart: {
    token: null,
    items: [],
    total_items:0,
    fees: 0,
    fees_percentage: 0,
    coupon_reduction: 0,
    total: 0
  },
  loading: true,
})

export const getters = {
  getData(state) {
    return state.cart
  },
  getLoading(state) {
    return state.loading
  },
}

export const mutations = {
  storeData(state, data) {
    state.cart = data
  },
  switchLoading(state,status){
    state.loading = status
  },

  changeQuantity(state,data)
  {

    if(data.method == 'increase')
    {
      if(state.cart.items[data.itemKey].product && state.cart.items[data.itemKey].product.stock > state.cart.items[data.itemKey].quantity + 1)
        state.cart.items[data.itemKey].quantity++
      this.$axios.post('cartItem/quantity',{
        token: state.cart.token,
        product_slug: state.cart.items[data.itemKey].product.slug,
        quantity: state.cart.items[data.itemKey].quantity
      }).then(res => {

      })
    }
    else if(data.method == 'decrease')
    {
      state.cart.items[data.itemKey].quantity--
      this.$axios.post('cartItem/quantity',{
        token: state.cart.token,
        product_slug: state.cart.items[data.itemKey].product.slug,
        quantity: state.cart.items[data.itemKey].quantity
      }).then(res => {

      })
    }else {
      state.cart.items[data.itemKey].quantity = data.quantity
    }
  },
  updateCart(state)
  {
    state.cart.total = 0;
    state.cart.total_items = 0;
    state.cart.items.map(item => {
      let itemPrice = item.product.reduction ? item.product.reduction : item.product.price
      state.cart.total += itemPrice * item.quantity
      state.cart.total_items += item.quantity
    })
    state.cart.fees = state.cart.total * state.cart.fees_percentage
  },
  deleteItem(state,itemKey)
  {
    this.$axios.post('cartItem/delete',{
      token: state.cart.token,
      product_slug: state.cart.items[itemKey].product.slug,
    })
    state.cart.items.splice(itemKey,1)
  }
}

export const actions = {
  fetchData(store,token)
  {
    store.commit('switchLoading',true)
    this.$axios.get('cart/' + token,{}).then(res => {
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
    this.$axios.post('/cart/store',data).then(res => {
      if(res.data.status == 'success'){
        this.$cookies.set('cart_token',res.data.data.token)
        store.commit('storeData',res.data.data);
      }
    })
  },
  applyCoupon(store,data)
  {
    store.commit('switchLoading',true)
    this.$axios.post('/coupon/apply',data).then(res => {
      if(res.data.status == 'success'){
        this.$cookies.set('cart_token',res.data.data.token)
        store.commit('storeData',res.data.data);
      }
    })
  },
  changeQuantity(store, data) {
    store.commit('changeQuantity', data)
    store.commit('updateCart')
  },
  deleteItem(store, itemKey) {
    store.commit('deleteItem', itemKey)
    store.commit('updateCart')
  }
}

