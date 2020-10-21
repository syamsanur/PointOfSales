import Axios from 'axios'

const state = () => {
  return {
    products: {
      data: [],
      meta: []
    },
    detail: [],
    category: []
  }
}

const getters = {
  getAllProduct (state) {
    return state.products.data
  },
  getProductMeta (state) {
    return state.products.meta
  },
  getDetail (state) {
    return state.detail
  },
  getCategory (state) {
    return state.category
  }
}

const mutations = {
  SET_PRODUCTS_DATA (state, payload) {
    state.products.data = payload
  },
  SET_PRODUCTS_META (state, payload) {
    state.products.meta = payload
  },
  SET_DETAIL (state, payload) {
    state.detail = payload
  },
  SET_CATEGORY (state, payload) {
    state.category = payload
  }
}

const actions = {
  getAllProduct (context, payload) {
    return new Promise((resolve, reject) => {
      Axios.get('/product/getall')
        .then((response) => {
          // console.log(response.data.data)
          context.commit('SET_PRODUCTS_DATA', response.data.data)
          context.commit('SET_PRODUCTS_META', response.data.meta)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getFilter (context, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      Axios.get(`/product/getall?name=${payload.name}&sorting=${payload.sorting}&page=${payload.page}`)
        .then((response) => {
          context.commit('SET_PRODUCTS_DATA', response.data.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getDetail (context, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      Axios.get(`/product/getproduct/${payload}`)
        .then((response) => {
          // console.log(response.data.data[0])
          context.commit('SET_DETAIL', response.data.data[0])
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  addProduct (context, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      Axios.post('/product/insert', payload)
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  updateProduct (context, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      Axios.put(`/product/update/${payload.id_product}`, payload)
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  deleteProduct (context, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      Axios.delete(`/product/delete/${payload.id_product}`)
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getCategory (context, payload) {
    return new Promise((resolve, reject) => {
      Axios.get('/category/getAll')
        .then((response) => {
          context.commit('SET_CATEGORY', response.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
