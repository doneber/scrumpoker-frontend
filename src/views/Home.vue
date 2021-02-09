<template>
  <div>
    <div
      class="d-flex align-items-center justify-content-center"
      style="height: 30vh"
    >
      <h1>Scrum Poker</h1>
    </div>
    <main class="container" style="height: 55vh">
      <div class="row">
        <div class="col-sm">
          <h2>Create Room</h2>
          <p>Be a host and create a room</p>
          <form @submit.prevent="submitFormHost">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Your name"
                v-model="userName"
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Room name"
                v-model="roomName"
              />
            </div>
            <button type="submit" class="btn btn-secondary">Create Room</button>
          </form>
        </div>
        <div class="col-sm">
          <h2>Join Room</h2>
          <p>Go to a room</p>
          <form @submit.prevent="submitFormInvite">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Your name"
                v-model="userName"
              />
            </div>
            <div class="form-group">
              <input
                type="number"
                class="form-control"
                placeholder="Room id"
                v-model="roomId"
              />
            </div>
            <button type="submit" class="btn btn-secondary">Join Room</button>
          </form>
        </div>
      </div>
    </main>
    <footer class="mt-auto" style="text-align: center">
      <p>@2021</p>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapMutations } from "vuex"
export default {
  name: "Home",
  data() {
    return {
      userName: "Im the user",
      userId: 6,
      roomName: "roomName",
      roomId: 2,
    };
  },
  methods: {
    ...mapMutations(['SET_USER_STATE']),
    async submitFormInvite() {
      console.log("Submit form invite");
      const theUser = await fetch(`http://localhost:3000/rooms/${this.roomId}`)
      .then((room) =>  room.json())
      .then((room) => {
        console.log("ROOM NEW ->", room);
        this.roomName = room.name // 4 vuex
        this.roomId = room.id // 4 vuex
        const dataUser = { name: this.userName, value: -1 };
        const newUser = fetch(
          `http://localhost:3000/rooms/${room.id}/users`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataUser),
          }
        );
        return newUser;
      })
      .then((user) => user.json())
      .catch((e) => alert("No pudimos enviar tu respuesta :("));
      this.userName = theUser.name // 4 vuex
      this.userId = theUser.id // 4 vuex
      this.$store.commit('SET_USER_STATE', {userName:this.userName, userId:this.userId, roomName:this.roomName, roomId:this.roomId,})
      this.$router.push('/game')
    },
    async submitFormHost() {
      console.log("Submit form Host");
      const data = { roomName: this.roomName };
      const response = await fetch(`http://localhost:3000/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((room) => {
          console.log("ROOM NEW ->", room);
          const dataUser = { name: this.userName, value: -1 };
          const newUser = fetch(
            `http://localhost:3000/rooms/${room.id}/users`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(dataUser),
            }
          );
          return newUser;
        })
        .then((user) => user.json())
        .catch((e) => alert("No pudimos enviar tu respuesta :("));
      console.log("User: ", response);
    },
  },
};
</script>

