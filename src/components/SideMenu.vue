<template>
  <div>
    <div class="row ">
      <div class="col">
        <router-link to="/">
          <button class="btn btn-block btn-lg">
            <b-icon icon="house"></b-icon>
          </button>
        </router-link>
      </div>
      <div class="col">
        <router-link to="/report">
          <button class="btn btn-block btn-lg">
            <b-icon icon="clipboard"></b-icon>
          </button>
        </router-link>
      </div>
      <div class="col">
        <router-link to="#">
          <button class="btn btn-block btn-lg" @click="$emit('addmodal')">
            <!-- @click="$emit('addmodal')" -->
            <b-icon icon="plus-circle"></b-icon>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>
