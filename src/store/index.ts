import { createStore } from "vuex";

export default createStore({
  state: {
    userState: {userName: 'defaultUserName', userId: 5, roomName: 'defaultRoomName', roomId: 2,}
  },
  mutations: {
    SET_USER_STATE (state, {userName,
      userId,
      roomName,
      roomId}) {
      state.userState.userName= userName
      state.userState.userId= userId
      state.userState.roomName= roomName
      state.userState.roomId= roomId
      console.log('state',state.userState.userName)
      console.log('state',state.userState.userId)
      console.log('state',state.userState.roomName)
      console.log('state',state.userState.roomId)
      
    },
  },
  actions: {},
  modules: {}
});
