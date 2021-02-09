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
          <form action="#">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Your name"
                v-model="nameUser"
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Room name"
                v-model="nameRoom"
              />
            </div>
            <button class="btn btn-secondary" @click="createRoom()">
              Create Room
            </button>
          </form>
        </div>
        <div class="col-sm">
          <h2>Join Room</h2>
          <p>Go to a room</p>
          <form action="#">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Your name"
                v-model="nameUser"
              />
            </div>
            <div class="form-group">
              <input type="number" class="form-control" placeholder="Room id" />
            </div>
            <button class="btn btn-secondary">Join Room</button>
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

export default {
  name: "Home",
};
</script>

