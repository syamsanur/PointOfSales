<template>
  <div>
    <div class="row p-2 text-center">
      <div class="col lg-1 col-1">
        <div>
          <div class="btn btn-outline" @click="$emit('toggle')">
            <b-icon icon="justify" class="h4"></b-icon>
          </div>
        </div>
      </div>
      <div class="col">
        <h3>POS APP</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['noHeaderSearch'],
  data () {
    return {
      name: ''
    }
  },
  methods: {
    search (event) {
      this.$emit('search', this.name)
    }
  }
}
</script>
