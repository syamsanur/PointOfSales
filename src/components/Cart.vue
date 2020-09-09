<template>
  <div>
    <div v-if="empty === true">
      <div class="col-12 p-3 mt-2 text-center">
        <div class="col">
          <img src="../assets/food-and-restaurant.png" />
        </div>
        <div class="col">
          <h3 class="mb-5">
            <b>Your Cart is Empty</b>
          </h3>
          <h6>Please Add Some Item</h6>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="card">
        <div class="row">
          <div class="col">
            <b-card :img-src="`http://127.0.0.1:4000/${itemCart.image}`" img-alt="Image" no-body></b-card>
          </div>
          <div class="col text-center">
            <h4>{{itemCart.name_product}}</h4>
            <b-row>
              <b-col class="mt-5">
                <h6>Rp{{itemCart.price_product}}</h6>
              </b-col>
              <b-col class="mt-5 mr-1" align-v="stretch">
                <b-btn-group>
                  <b-btn size="sm" variant="outline-success" @click="minus()">-</b-btn>
                  <b-btn size="sm" variant="success" disabled>1</b-btn>
                  <b-btn size="sm" variant="outline-success" @click="add()">+</b-btn>
                </b-btn-group>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
      <b-row align-v="end">
        <div class="col-lg-12 mt-5 mb-2">
          <div class="row">
            <div class="col-lg">
              <div class="row">
                <div class="col-lg-8 col-8">
                  <h5 class="float-left">Total:</h5>
                </div>
                <div class="col-lg-4 col-4">
                  <h6 class="float-right">Rp. {{itemCart.price_product}}</h6>
                </div>
              </div>
            </div>
            <div class="col-lg-12">
              <p class="float-left">*Belum Termasuk Ppn</p>
            </div>
            <div class="col-lg-12">
              <button
                class="btn btn-primary btn-outline-light btn-block mt-2"
                v-b-modal.modalCheckOut
              >Checkout</button>
            </div>
            <div class="col-lg-12">
              <button class="btn btn-danger btn-outline-light btn-block mt-2 mb-2" @click="reset()">Cancel</button>
            </div>
          </div>
        </div>
      </b-row>
    </div>
    <b-modal id="modalCheckOut" title="CheckOut">
      <div class="row">
        <div class="col-12">
          <div class="row mb-3">
            <div class="col-6">
              <h6 >Cashier : Pevita Pearce</h6>
            </div>
            <div class="col-6">
              <h6>Receipt no: #010410919</h6>
            </div>
          </div>
        </div>
        <div class="col-12 ">
          <div class="row">
            <div class="col-8" :name_product="itemCart.name_product">
              <h5>{{itemCart.name_product}} 1x:</h5>
            </div>
            <div class="col-4" :price_product="itemCart.price_product">
              <h5>Rp.{{itemCart.price_product}}</h5>
            </div>
            <div class="col-8 mt-3">
              <h5 class="float-right">Total:</h5>
            </div>
            <div class="col-4 mt-3">
              <h5>Rp.{{itemCart.price_product}}</h5>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>

export default {
  props: ['itemCart', 'empty'],
  data () {
    return {
      name_product: null,
      price_product: null
    }
  },
  methods: {
    reset () {
      this.$emit('reset')
    }
  }
}
</script>
