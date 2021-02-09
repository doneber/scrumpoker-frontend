<template>
  <div class="container" style="height: 90vh">
    <h2>Scrum Teams</h2>
    <p>
      {{ room.name }} / <span>ID: {{ room.id }} </span>
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
          <scrum-card class="enemy-card" :value="user.value" :hidden="true">
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
            {{ generalValue }}
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
          :value="value"
          :hidden="false"
          @click="sendMyAnswer(value)"
        >
          {{ value }}
        </scrum-card>
      </div>
    </div>
  </div>
</template>
<script>
import ScrumCard from "@/components/ScrumCard.vue";
export default {
  name: "Game",
  data() {
    return {
      idRoom: 2,
      idUser: 5,
      room: { name: 'Room test', id: '007' },
      cards: [1, 2, 3, 5, 8, 13, 21, 34, 55],
      users: [
        { id: 3, name: "name 3", value: 5 },
        { id: 4, name: "name 4", value: 8 },
        { id: 5, name: "name 5", value: 5 },
        { id: 6, name: "name 6", value: 13 },
      ],
    };
  },
  components: {
    ScrumCard,
  },
  methods: {
    async sendMyAnswer(value) {
      console.log(value);
      const data = { id: this.idUser, name: "don eber", value };
      const response = await fetch(
        `http://localhost:3000/rooms/${this.idRoom}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((e) => {
          console.log;
        })
        .catch((e) => alert("No pudimos enviar tu respuesta :("));
    },
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
span {
  font-weight: bold;
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