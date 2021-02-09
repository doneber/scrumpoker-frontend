<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">ScrumPoker</router-link>
      <span class="navbar-text"> {{ userState.userName }} </span>
    </div>
  </nav>
</template>

<script lang="ts">
import { mapState } from "vuex";
export default {
  computed:{
    ...mapState(['userState'])
  }
}
</script>