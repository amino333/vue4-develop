<template>
  <div>
    <h1>新規登録画面</h1>
    <center>
      <table>
        <tr>
          <th>ユーザー名:</th>
          <td>
            <input type="text" placeholder="userName" @input="createName" />
          </td>
        </tr>
        <tr>
          <th>メールアドレス:</th>
          <td>
            <input type="text" placeholder="E-mail" @input="createEmail" />
          </td>
        </tr>
        <tr>
          <th>パスワード:</th>
          <td>
            <input type="password" placeholder="Password" @input="createPassword" />
          </td>
        </tr>
      </table>
    </center>
    <br />

    <button @click="signUp" class="button">新規登録</button>

    <br />
    <router-link to="/">ログインはこちら</router-link>
    <br />
  </div>
</template>

<script>
export default {
  methods: {
    createName(e) {
      this.$store.commit("createName", e.target.value);
    },
    createEmail(e) {
      this.$store.commit("createEmail", e.target.value);
    },
    createPassword(e) {
      this.$store.commit("createPassword", e.target.value);
    },
    signUp() {
      this.$store.dispatch("createUser");
    },
  },
};
</script>

<style>
.button {
  border: solid aqua;
  border-radius: 10px;
  padding: 10px;
  color: aqua;
  background: white;
}
</style>