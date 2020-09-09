<template>
  <div>
    <div class="container-fluid border">
      <div class="row">
        <div class="col-lg-8 col-12">
          <Header :noHeaderSearch="false" @toggle="toggleMenu"/>
          <div class="row">
            <div class="col-lg-1 col-12" v-if="isHidden">
              <SideMenu @addmodal="$bvModal.show('addmodal')"/>
            </div>
            <div class="col">
              <div class="col">
                <div class="row border">
                  <div class="col p-3">
                    <b-input-group>
                      <b-form-input
                        id="input-1"
                        type="text"
                        v-model="name"
                        placeholder="Search"
                      ></b-form-input>
                      <div class="btn btn-outline-primary">
                        <b-icon icon="search" @click="searchProduct"></b-icon>
                      </div>
                    </b-input-group>
                  </div>
                  <div class="col p-3 text-right">
                    <b-dropdown id="dropdown-1" variant="outline-success" right text="Sort">
                      <b-dropdown-item @click="fetchApi(sortBy=('id_product'))">Default</b-dropdown-item>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-item @click="fetchApi(sortBy=('name_product'))">Name</b-dropdown-item>
                      <b-dropdown-item @click="fetchApi(sortBy=('price_product'))">Price</b-dropdown-item>
                      <b-dropdown-item @click="fetchApi(sortBy=('date_product'))">Date</b-dropdown-item>
                      <b-dropdown-item @click="fetchApi(sortBy=('name_category'))">Category</b-dropdown-item>
                    </b-dropdown>
                  </div>
                </div>
              </div>
              <div class="col border">
                <div class="row justify-content-center align-items-center">
                  <div class="p-3 text-center" v-if="products.length === 0">
                    <img src="../assets/pepe_dance.gif" />
                    <h3 class="mt-5"><b>Product not Found</b></h3>
                  </div>
                  <div v-else class="p-3 text-center" v-for="(item, index) in products" :key="index">
                    <ProductList :product="item" @getId="getDetail" @getId2="itemCart"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-12 border p-3">
            <div class="col">
              <div class="col-12 text-center mb-5">
                <h3>CART</h3>
              </div>
                <Cart :empty="empty" :itemCart="cartProduct" @reset="reset()"/>
            </div>
        </div>
      </div>
    </div>
    <AddModal @toastAdd="addToast"/>
    <DetailModal :productId="productId" @toastDel="delToast"/>
  </div>
</template>

<script>
import Header from '../components/Header'
import SideMenu from '../components/SideMenu'
import ProductList from '../components/ProductList'
import Cart from '../components/Cart'
import AddModal from '../components/AddModal'
import DetailModal from '../components/DetailModal'

import axios from 'axios'

export default {
  data () {
    return {
      isHidden: false,
      products: [],
      limit: 20,
      name: '',
      sortBy: null,
      idProduct: null,
      productId: [],
      meta: [],
      page: '',
      totalData: null,
      totalPage: null,
      cartProduct: [],
      idProductCart: null,
      empty: true
    }
  },
  components: {
    Header,
    SideMenu,
    ProductList,
    Cart,
    AddModal,
    DetailModal
  },
  methods: {
    fetchApi () {
      axios.get(`http://127.0.0.1:4000/POSAPP/product/getall?sorting=${this.sortBy}&name=${this.name}&typesort=ASC&limit=${this.limit}`).then((response) => {
        this.products = response.data.data
        this.page = response.data.meta.page
        this.totalData = response.data.meta.totalData
        this.totalPage = response.data.meta.totalPage
      }).catch((err) => {
        console.log(err)
      })
    },
    toggleMenu () {
      this.isHidden = !this.isHidden
    },
    searchProduct () {
      if (this.name !== '') {
        axios.get(`http://127.0.0.1:4000/POSAPP/product/getall?sorting=${this.sortBy}&name=${this.name}&typesort=ASC&page=1&limit=${this.limit}`).then((response) => {
          this.products = response.data.data
        // console.log(this.products)
        }).catch((err) => {
          console.log(err)
        })
        this.products = null
      } else {
        this.fetchApi()
      }
    },
    getDetail (payload) {
      this.$bvModal.show('detailmodal')
      this.idProduct = payload
      // console.log(this.idProduct)
      axios.get(`http://127.0.0.1:4000/POSAPP/product/getproduct/${this.idProduct}`).then((response) => {
        this.productId = response.data.data[0]
        // console.log(response.data.data)
      }).catch((err) => {
        console.log(err)
      })
    },
    itemCart (payload) {
      this.empty = false
      this.idProductCart = payload
      axios.get(`http://127.0.0.1:4000/POSAPP/product/getproduct/${this.idProductCart}`).then((response) => {
        this.cartProduct = response.data.data[0]
        // console.log(this.cartProduct)
      }).catch((err) => {
        console.log(err)
      })
    },
    addToast () {
      this.fetchApi()
      this.$bvToast.toast('Add data Success', {
        title: 'Add',
        autoHideDelay: 5000
      })
    },
    delToast () {
      this.fetchApi()
      this.$bvToast.toast('Delete data success', {
        title: 'Delete',
        autoHideDelay: 5000
      })
    },
    reset () {
      this.empty = true
      this.cartProduct = []
    }
  },
  mounted () {
    this.fetchApi()
  }
}
</script>
