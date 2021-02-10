<template>
  <div class="container" style="height: 90vh; ">
    <h2 style="text-align:center">Scrum Teams</h2>
    <p style="text-align:center">
      {{ roomName+'1s' }} / <span>ID: {{ roomId }} </span>
    </p>
    <!-- Card user: -->
    <div style="height: 25vh; overflow-y: auto" class="mb-4">
      <div class="d-flex flex-wrap justify-content-around">
        <div
          class="d-flex flex-column align-items-center justify-content-center mx-3 my-2"
          v-for="(user, index) in users"
          :key="`${index}-card-user`"
        >
          <div class="d-inline-flex">
            <h5>{{ user.name }}</h5>
          </div>
          <scrum-card class="enemy-card" :value="parseInt(user.value)" :hidden="true">
          </scrum-card>
        </div>
      </div>
    </div>
    <!-- Table scrum: -->
    <div
      class="d-flex align-content-center justify-content-center"
      style="height: 30vh"
    >
      <div class="table-scrum">
        <div
          class="table-scrum-child d-flex align-items-center justify-content-center"
        >
          <h1>
            {{ avgValue() }}
          </h1>
        </div>
      </div>
    </div>
    <!-- My card -->
    <div style="overflow-y: auto">
      <div class="d-flex flex-wrap justify-content-around mt-3 py-2 px-3">
        <scrum-card
          class="my-card"
          v-for="(value, index) in cards"
          :key="`${index}-card-value`"
          :value="parseInt(value)"
          :hidden="false"
          @click="sendMyAnswer(parseInt(value))"
        >
          {{ value }}
        </scrum-card>
      </div>
    </div>
  </div>
</template>
<script>
import ScrumCard from "@/components/ScrumCard.vue";
import { mapState, mapMutations } from "vuex"
export default {
  name: "Game",
  async created() {
    const savedScrumPokerData = await JSON.parse(localStorage.getItem('scrum-poker-data'))
    if (savedScrumPokerData && !this.userState.roomId) {
      this.$store.commit('SET_USER_STATE', savedScrumPokerData)
    }
    this.roomId = this.userState.roomId
    this.userId = this.userState.userId
    this.roomName = this.userState.roomName
    this.userName = this.userState.userName

    const vRoom = await fetch(
      `http://localhost:3000/rooms/${this.roomId}`
    ).then((response) => response.json());

    const usersRecieved = await fetch(
      `http://localhost:3000/rooms/${this.roomId}/users`
    ).then(e=>e.json())
    this.users = usersRecieved
  },
  data() {
    return {
      roomId: null,
      userId: null,
      roomName: null,
      userName: null,
      cards: [1, 2, 3, 5, 8, 13, 21, 34, 55],
      users: [],
    };
  },
    computed: {
      ...mapState(['userState']),

    },
  components: {
    ScrumCard,
  },
  methods: {
    ...mapMutations(['SET_USER_STATE']),
    async sendMyAnswer(value) {
      const response = await fetch(
        `http://localhost:3000/rooms/${this.roomId}/users/${this.userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({value}),
        }
      )
    },
    avgValue(){
      // return this.users?Object.values(this.users).reduce((t, {value}) => t + value, 0):0
      return this.users?this.users.reduce((sum, {value}) => sum + value, 0):0
    }
  },
};
</script>
<style>
.table-scrum {
  height: 85%;
  width: 80%;
  background-color: whitesmoke;
  border-radius: 25px;
  border: gray solid 0.5px;
  padding: 15px;
  opacity: 90%;
}
.table-scrum-child {
  height: 100%;
  width: 100%;
  background-color: white;
  border-radius: 25px;
  padding: 10px;
  opacity: 90%;
}
.enemy-card {
  height: 140px;
  width: 115px;
}
.enemy-card:hover {
  transform: scale(1.1);
  z-index: 100;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.16), 0 6px 12px rgba(0, 0, 0, 0.23);
}
.my-card {
  height: 135px;
  width: 110px;
}
.my-card:hover {
  transform: rotateY(180deg) scale(1.15);
  z-index: 100;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.16), 0 6px 12px rgba(0, 0, 0, 0.23);
  cursor: pointer;
}
</style>