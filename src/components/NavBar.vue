<template>
  <div class="navbar">
    <div class="user-info" v-if="isAuthenticated">
      <span class="fio">{{ user.surname }} {{ user.name.charAt(0).toUpperCase() }}.</span>
      <div @click="logout" style="cursor: pointer">Выйти</div>
    </div>
    <router-link to="/login" v-else>Войти</router-link>
    <div class="cart">
      Корзина
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'nav-bar',
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    logout() {
      this.logoutUser();
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  background: var(--background-secondary-color);
  height: 50px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: right;
  padding-right: 200px;
  gap: 40px;
}

.navbar a {
  margin: 0 10px;
  text-decoration: none;
  color: inherit;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info span {
  margin-right: 10px;
}

.cart {
  align-self: center;
  align-items: center;
}

.fio {
  color: blue;
  font-size: 20px;
  font-weight: bold;
}
</style>
