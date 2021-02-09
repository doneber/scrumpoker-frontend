<template>
  <div class="scrum-card">
    <div :class="[hidden?'escudo':'cara']" style="background:white">
      {{ value }}
    </div>
    <div :class="[hidden?'cara':'escudo']" style="background:whitesmoke">
      {{ ["♦", "♣", "♠", "♥"][parseInt(Math.random() * 4)] }}
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    value: String,
    hidden: Boolean,
  },
})
export default class Navbar extends Vue {
  value!: string;
  hidden!: boolean;
}
</script>
<style scoped>
.scrum-card {
  height: 140px;
  width: 115px;
  margin: 4px;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-style: preserve-3d;
}
.cara{
  height: 100%;
  width: 100%;
  font-size: 3.25em;
  padding: 15px;
  text-align: center;
  background: white;
  position: absolute;
  border: whitesmoke 4px solid;
  transform: translateZ(1px);
}
.escudo{
  position: absolute;
  height: 100%;
  width: 100%;
  font-size: 4em;
  background-color: whitesmoke;
  text-align: center;
  padding: 15px 0;
}
.gray {
  background-color: whitesmoke;
}
</style>