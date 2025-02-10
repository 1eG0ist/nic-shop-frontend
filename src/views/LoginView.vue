<template>
  <div class="page">
    <default-box class="content-box">
      <form class="content-wrapper" @submit.prevent="login">
        <div class="title">Login</div>
        <default-input v-model="email" type="email" placeholder="Email" required/>
        <default-input v-model="password" type="password" placeholder="Password" required/>

        <default-button type="submit">Login</default-button>
      </form>
      <div @click="swap" class="swap-text">
        Регистрация
      </div>
    </default-box>
  </div>
</template>

<script>
import axios from '@/api/axios.js';
import DefaultBox from "@/components/UI/DefaultBox.vue";
import DefaultInput from "@/components/UI/DefaultInput.vue";
import DefaultButton from "@/components/UI/DefaultButton.vue";
import {mapActions} from "vuex";

export default {
  components: {DefaultButton, DefaultInput, DefaultBox},
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions('auth', ['loginUser']),
    async login() {
      try {
        const response = await axios.post('auth/login', {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        await this.loginUser(response.data.user);
        this.$router.push('/');
      } catch (error) {
        console.error('Login failed', error);
      }
    },
    swap() {
      this.$router.push('/registration');
    }
  },
};
</script>

<style scoped>
.page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swap-text {
  display: flex;
  flex-direction: column;
  align-items: end;
  color: blue;
  cursor: pointer;
}

.swap-text:hover {
  text-decoration: underline;
}

.content-box {
  width: 100%;
  max-width: 400px; /* Максимальная ширина */
  min-width: 200px; /* Минимальная ширина */
  padding: 20px;
  box-sizing: border-box;
}
</style>