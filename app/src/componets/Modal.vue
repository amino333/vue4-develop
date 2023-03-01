<template>
  <transition name="modal" appear>
    <div id="overlay" @click="closeModal1">
      <div>
        <div id="content">
          <p>{{ userName }} さんの残高</p>
          <p>{{ userWallet }}</p>
          <footer class="modal-footer">
            <button @click="closeModal1">close</button>
          </footer>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal1",
  methods: {
    closeModal1() {
      this.$store.commit("closeModal1");
    },
  },
  computed: {
    userName() {
      return this.$store.getters.username;
    },
    userWallet() {
      return this.$store.getters.userwallet;
    },
  },
};
</script>

<style>
#content {
  z-index: 10;
  width: 30%;
  background-color: #fff;
  border-radius: 4px;
  position: fixed;
  bottom: 0%;
  left: 35%;
}
#content p {
  margin: 10px 0;
}
#overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-footer {
  background: #ccc;
  padding: 10px;
  text-align: right;
  margin-top: 10px;
}
.modal-footer button {
  margin: 0;
  color: #fff;
  background-color: #e64565;
  border: 2px solid #e64565;
  padding: 3px 15px;
  border-radius: 2px;
  transition: 0.4s;
  outline: 0px;
}
</style>