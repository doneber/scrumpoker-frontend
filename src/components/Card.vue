<template>
  <div
    class="d-flex flex-column align-items-center justify-content-center mx-3 my-2"
  >
    <div class="d-inline-flex">
      <h5>{{ user.name }}</h5>
    </div>
    <div class="card-scrum mx-0 px-0">
      <p>{{ 'F' }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    user: Object,
  },
})
export default class Navbar extends Vue {
  user!: string;
}
</script>
<style scoped>
.card-scrum {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: 115px;
  height: 140px;
  font-size: 4em;
  background-color: whitesmoke;
  text-align: center;
  padding: 15px 0;
}
</style>