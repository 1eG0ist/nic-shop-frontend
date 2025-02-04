<template>
  <div class="page">
    <default-box class="content-box">
      <form class="content-wrapper" @submit.prevent="register">
        <default-input v-model="name" type="text" placeholder="Name" required />
        <default-input v-model="surname" type="text" placeholder="Surname" required />
        <default-input v-model="email" type="email" placeholder="Email" required />
        <default-input v-model="password" type="password" placeholder="Password" required />
        <default-button type="submit">Register</default-button>
      </form>
      <div @click="swapToLogin" class="swap-text">
        Уже есть аккаунт?
      </div>
    </default-box>
  </div>
</template>

<script>
import axios from 'axios';
import DefaultBox from "@/components/UI/DefaultBox.vue";
import DefaultInput from "@/components/UI/DefaultInput.vue";
import DefaultButton from "@/components/UI/DefaultButton.vue";
import { mapActions } from 'vuex';

export default {
  components: {DefaultButton, DefaultInput, DefaultBox},
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions('auth', ['loginUser']),

    async register() {
      try {
        const response = (await axios.post('api/auth/registration', {
          name: this.name,
          surname: this.surname,
          email: this.email,
          password: this.password,
        }));

        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        await this.loginUser(response.data.user);
        this.$router.push('/');
      } catch (error) {
        console.error('Registration failed', error);
      }
    },

    swapToLogin() {
      this.$router.push('/login');
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

.content-box {
  width: 100%;
  max-width: 400px;
  min-width: 200px;
  padding: 20px;
  box-sizing: border-box;
}

.swap-text {
  display: flex;
  flex-direction: column;
  align-items: end;
  color: blue;
  cursor: pointer;
}
</style>