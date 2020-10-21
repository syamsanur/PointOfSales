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
                      <div class="btn btn-outline-primary" @click="getFilter">
                        <b-icon icon="search"></b-icon>
                      </div>
                    </b-input-group>
                  </div>
                  <div class="col p-3 text-right">
                    <button class="btn btn-outline-secondary mr-4" @click="resetFilter">Reset</button>
                    <b-dropdown id="dropdown-1" variant="outline-success" right text="Sort">
                      <b-dropdown-item @click="getFilter(sortBy=('id_product'))">Default</b-dropdown-item>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-item @click="getFilter(sortBy=('name_product'))">Name</b-dropdown-item>
                      <b-dropdown-item @click="getFilter(sortBy=('price_product'))">Price</b-dropdown-item>
                      <b-dropdown-item @click="getFilter(sortBy=('date_product'))">Date</b-dropdown-item>
                      <b-dropdown-item @click="getFilter(sortBy=('name_category'))">Category</b-dropdown-item>
                    </b-dropdown>
                  </div>
                </div>
              </div>
              <div class="col border">
                <div class="row justify-content-center align-items-center">
                  <div class="p-3 text-center" v-if="allProduct.length === 0">
                    <h3 class="mt-5"><b>Product not Found</b></h3>
                  </div>
                  <div v-else class="p-3 text-center" v-for="(item, index) in allProduct" :key="index">
                    <ProductList :product="item" @getId="getDetail" @getId2="itemCart"/>
                  </div>
                </div>
                <!-- <div class="overflow-auto">
                  <b-pagination
                    v-model="page"
                    :total-rows="metaProduct.totalData"
                    :per-page="metaProduct.limit"
                  ></b-pagination>
                  {{this.page}}
                </div> -->
                <div class="row">
                  <div class="col text-center">
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <button type="button" class="btn btn-outline-primary" @click="paginationBack"> Back </button>
                      <button type="button" class="btn btn-outline-primary btn-lg disabled">{{this.page}}</button>
                      <button type="button" class="btn btn-outline-primary" @click="paginationNext"> Next </button>
                    </div>
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

// import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      isHidden: false,
      products: [],
      limit: 20,
      name: '',
      sortBy: 'id_product',
      idProduct: null,
      productId: [],
      meta: [],
      totalData: null,
      totalPage: null,
      cartProduct: [],
      idProductCart: null,
      empty: true,
      page: 1
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
      this.onGetProduct()
    },
    getFilter () {
      const data = {
        name: this.name,
        sorting: this.sortBy,
        page: this.page
      }
      this.$router.push({
        path: '/',
        query: { name: this.name, page: this.page, sorting: this.sortBy }
      })
      this.onFilter(data)
      // this.name = ''
    },
    resetFilter () {
      const data = {
        name: '',
        sorting: 'id_product',
        page: 1
      }
      this.$router.push({
        path: '/'
      })
      this.onFilter(data)
      this.name = ''
      this.page = 1
      this.sortBy = 'id_product'
    },
    ...mapActions({
      onGetProduct: 'Product/getAllProduct',
      onFilter: 'Product/getFilter',
      onDetail: 'Product/getDetail'
    }),
    paginationBack () {
      if (this.page <= 1) {
        alert('first page')
      } else {
        this.page -= 1
        this.getFilter()
        // this.$router.push({ path: '/', query: { page: this.page } })
        // this.onPagination(this.page)
      }
    },
    paginationNext () {
      // this.page += 1
      if (this.page >= this.allProduct.length) {
        alert('last page')
      } else {
        this.page += 1
        this.getFilter()
      }
    },
    // fetchApi () {
    //   axios.get(`http://127.0.0.1:4000/POSAPP/product/getall?sorting=${this.sortBy}&name=${this.name}&typesort=ASC&limit=${this.limit}`).then((response) => {
    //     this.products = response.data.data
    //     this.page = response.data.meta.page
    //     this.totalData = response.data.meta.totalData
    //     this.totalPage = response.data.meta.totalPage
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // },
    toggleMenu () {
      this.isHidden = !this.isHidden
    },
    searchProduct () {
    //   if (this.name !== '') {
    //     axios.get(`http://127.0.0.1:4000/POSAPP/product/getall?sorting=${this.sortBy}&name=${this.name}&typesort=ASC&page=1&limit=${this.limit}`).then((response) => {
    //       this.products = response.data.data
    //     // console.log(this.products)
    //     }).catch((err) => {
    //       console.log(err)
    //     })
    //     this.products = null
    //   } else {
    //     this.fetchApi()
    //   }
    },
    getDetail (payload) {
      this.$bvModal.show('detailmodal')
      this.idProduct = payload
      this.onDetail(this.idProduct)
    },
    itemCart (payload) {
    //   this.empty = false
    //   this.idProductCart = payload
    //   axios.get(`http://127.0.0.1:4000/POSAPP/product/getproduct/${this.idProductCart}`).then((response) => {
    //     this.cartProduct = response.data.data[0]
    //     // console.log(this.cartProduct)
    //   }).catch((err) => {
    //     console.log(err)
    //   })

    //   // this.empty = false
    //   // this.idProductCart = payload
    //   // const satu = this.dua.filter(e => e.id_product === this.idProductCart)
    //   // if (satu.length === 0) {
    //   //   const data = this.products.filter(e => e.id_product === this.idProductCart)
    //   //   data[0].qty = 1
    //   //   this.dua = [...this.dua, data[0]]
    //   // } else {
    //   //   const tiga = this.dua.map(e => {
    //   //     if (e.id_product === this.idProductCart) {
    //   //       e.qty += 1
    //   //     }
    //   //     return e
    //   //   })
    //   //   this.dua = tiga
    //   // }
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
  computed: {
    ...mapGetters({
      allProduct: 'Product/getAllProduct',
      metaProduct: 'Product/getProductMeta'
    }),
    pagination () {
      return this.page
    }
  },
  mounted () {
    this.fetchApi()
  }
}
</script>
