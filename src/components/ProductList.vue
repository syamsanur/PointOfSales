<template>
  <div>
    <div v-if="product.length === 0">
      <h1>test</h1>
    </div>
    <div v-else>
      <b-card
        :img-src="`http://127.0.0.1:4000/${product.image}`"
        img-alt="Image"
        style="max-width: 20rem;"
        id="productContent"
      >
        <b-card-text>
          <h6>{{product.name_product}}</h6>
          <h6>Rp.{{product.price_product}}</h6>
        </b-card-text>
        <b-card-text>
          <b-btn class="btn btn-success btn-block btn-sm" @click="getId()">Lihat detail</b-btn>
          <b-btn variant="primary" block size="sm" :disabled="isDisabled" @click="getId2($event)">Beli</b-btn>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product', 'index'],
  data () {
    return {
      isDisabled: false
    }
  },
  methods: {
    getId (event) {
      // this.id = this.product.id_product
      // console.log(this.index)
      this.$emit('getId', this.product.id_product, this.index)
      // console.log(this.product.id_product)
    },
    getId2 (event) {
      this.$emit('getId2', this.product.id_product)
      // console.log(this.product.id_product)
      // this.isDisabled = !this.isDisabled
    }
  }
}
</script>
