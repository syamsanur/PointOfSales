<template>
  <div>
    <b-modal id="detailmodal" title="Product" hide-footer ok-only no-stacking>
      <b-row  class="justify-content-center align-items-center text-center">
        <div class="col-6">
          <b-card
          :img-src="`http://127.0.0.1:4000/${productId.image}`"
          img-alt="Image"
          no-body
          >
          </b-card>
        </div>
        <div class="col-6">
            <b-card-body class="border">
              <h4><b>{{productId.name_product}}</b></h4>
              <h5>Rp.{{productId.price_product}}</h5>
              <h6 class="">{{productId.name_category}}</h6>
              <div class="row class justify-content-center align-items-center text-center mt-5">
                <div class="btn btn-warning mr-2 ml-2" @click="editData">Edit</div>
                <div class="btn btn-danger mr-2 ml-2" @click="deleteData">Hapus</div>
              </div>
            </b-card-body>
          </div>
      </b-row>
    </b-modal>
    <!-- MODAL UPDATE -->
    <b-modal id="modalEdit" title="Update Product" hide-footer>
    <b-form @submit="updated()">
        <b-form-group label-cols="4" label="Enter Product Name" enctype="multipart/form-data">
          <b-form-input v-model="productId.name_product" :name_product="productId.name_product" required>{{productId.name_product}}</b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label="Enter Price">
          <b-form-input v-model="productId.price_product" :price_product="productId.price_product" required type="number"></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label="Enter Date">
          <b-form-datepicker v-model="productId.date_product" :date_product="productId.date_product" required></b-form-datepicker>
        </b-form-group>
        <b-form-group label-cols="4" label="Enter Image">
          <b-form-file v-model="productId.image" :image="productId.image" @change="fileProcess" required></b-form-file>
        </b-form-group>
        <b-form-group label-cols="4" label="Enter Category">
          <b-form-select v-model="productId.category_id" :category_id="productId.category_id" >
            <b-form-select-option v-for="(item, index) in category" :key="index" :value="item.id_category" required>
              {{item.name_category}}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
        <div class="col float-right">
          <div class="row">
            <div class="col">
              <button class="btn btn-danger btn-block ml-2 mr-2" @click="hideModal($event)">Cancel</button>
            </div>
            <div class="col">
              <!-- <button class="btn btn-primary btn-block ml-2 mr-2" @click="addProduct($event)">Add</button> -->
              <b-button block class="ml-2 mr-2" type="submit" variant="primary">Submit</b-button>
            </div>
          </div>
        </div>
      </b-form>
  </b-modal>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['productId', 'indexModalEdit', 'dataAll'],
  data () {
    return {
      name_product: null,
      price_product: null,
      date_product: null,
      category_id: null,
      category: []
    }
  },
  methods: {
    fileProcess (event) {
      this.image = event.target.files[0]
    },
    getCategory () {
      axios.get('http://127.0.0.1:4000/POSAPP/category/getall').then((response) => {
        this.category = response.data.data
        // console.log(this.category)
      }).catch((err) => {
        console.log(err)
      })
    },
    editData () {
      this.$bvModal.show('modalEdit')
      event.preventDefault()
    },
    updated () {
      const fd = new FormData()
      fd.append('image', this.productId.image)
      fd.append('name_product', this.productId.name_product)
      fd.append('price_product', this.productId.price_product)
      fd.append('date_product', this.productId.date_product)
      fd.append('category_id', this.productId.category_id)

      // for (var value of fd.values()) {
      //   console.log(value)
      // }
      axios.put(`http://127.0.0.1:4000/POSAPP/product/update/${this.productId.id_product}`, fd).then((response) => {
        this.$bvModal.hide('modalEdit')
        this.$emit('editToast')
      }).catch((err) => {
        console.log(err)
      })
    },
    hideModal () {
      this.$bvModal.hide('modalEdit')
      this.$bvModal.show('detailmodal')
    },
    deleteData () {
      if (confirm('Delete ?')) {
        console.log(this.productId.id_product)
        axios.delete(`http://127.0.0.1:4000/POSAPP/product/delete/${this.productId.id_product}`).then((response) => {
          console.log(response)
          this.$bvModal.hide('detailmodal')
          this.$emit('toastDel')
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  },
  mounted () {
    this.getCategory()
  }
}
</script>
