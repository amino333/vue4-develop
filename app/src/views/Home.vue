<template>
  <div>
    <div class="title">
      <h2>{{username}}さんようこそ!!</h2>
      <p>
        {{wallet}}残高:
        <button @click="logout">ログアウト</button>
      </p>
    </div>
    <h1 class="list">ユーザー覧</h1>
    <div class="list">
      <table>
        <tr>
          <th>ユーザー名</th>
        </tr>
        <tr v-for="(user,index) in userList" v-bind:key="index">
          <td>{{ user.name }}</td>
          <td>
            <button @click="openModal1( user, index )">walletを見る</button>
          </td>
          <td>
            <button @click="openModal2(user, index )">送る</button>
          </td>
        </tr>
      </table>
    </div>

    <modal1 v-if="showModal1"></modal1>
    <modal2 v-if="showModal2"></modal2>
  </div>
</template>
 
<script>
import Modal1 from "../componets/Modal.vue";
import Modal2 from "../componets/Modal2.vue";

export default {
  components: {
    Modal1,
    Modal2,
  },
  data() {
    return {};
  },

  mounted() {
    this.$store.commit("resetUserList");
    this.$store.dispatch("createUserList");
  },

  methods: {
    openModal1(user, index) {
      this.$store.commit("openModal1");
      this.$store.commit("setUserInfo", { user, index });
    },
    openModal2(user, index) {
      this.$store.commit("openModal2");
      this.$store.commit("setUserInfo", { user, index });
    },

    logout() {
      this.$store.dispatch("logoutUser");
    },
  },
  computed: {
    username() {
      return this.$store.getters.name;
    },
    wallet() {
      return this.$store.getters.wallet;
    },
    showModal1() {
      return this.$store.getters.showModal1;
    },
    showModal2() {
      return this.$store.getters.showModal2;
    },
    userList() {
      return this.$store.getters.userList;
    },
  },
};
</script>
 
<style>
.list {
  width: 70;
  margin: 0 auto;
  max-width: 500px;
}
.title {
  width: 100%;
}
h2 {
  text-align: left;
  float: left;
  font-size: 18px;
  padding-left: 20%;
  margin: 0;
}
div.title p {
  font-size: 14px;
  text-align: right;
  padding: 0;
  margin: 0;
  padding-right: 20%;
}
</style>
