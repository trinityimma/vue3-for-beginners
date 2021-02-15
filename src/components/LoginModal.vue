<template>
    <div v-if="isLoginOpen">
     <section class="z-20 h-screen w-screen bg-gray-500 fixed
        top-0 opacity-50" @click="close"> </section>
        <div class="absolute inset-0 ">
          <div class="flex h-full">
             <div class="z-30 m-auto bg-white p-2 rounded w-1/3">
                <div class="p-2 border">
                    <h1 class="text-2xl text-center">Login</h1>
                    <GoogleLogin @close-login-modal-from-google="close"/>
                    <p class="my-3 text-center">Or</p>
                    <form class="p-2 my-2" @submit.prevent="submit">
                        <div class="my-4 flex flex-col">
                            <label for="email">Email or Username</label>
                            <input v-model="form.email" 
                              ref="emailRef"
                              class="rounded shadow p-2 w-ull"
                             placeholder="Enter your email or username">
                        </div>
                        <div class="my-4 flex flex-col">
                            <label for="email">Password</label>
                            <input v-model="form.password" 
                            class="rounded shadow p-2 w-ull" type="password"
                            placeholder="Enter your password here">
                        </div>
                        <div class="my-4">
                            <button type="submit" class="w-full rounded
                             shadow-md bg-gradient-to-r from-red-800
                             to-pink-600 text-white p-2">
                             <span v-if="!isLoading">Login</span>
                             <span v-else>⌛</span>
                            </button>                        
                        </div>
                    </form>
                </div>
             </div>
          </div>
        </div>
    </div>
</template>

<script>
import firebase from '../utilities/firebase';
import GoogleLogin from './Login/GoogleLogin';
export default {
  components: { GoogleLogin },
  computed: {
    isLoginOpen (){
        return this.$store.state.isLoginOpen; 
    },

  },
  data() {
      return { 
        form: {
            email: 'trinityimma@yahoo.com',
            password: 'password',
        },
        isLoading: false,
      }
  },
//   mounted() {
//       this.$refs.emailRef.focus();
//   },
  methods: {
    submit() {
        this.isLoading = true;
        firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
            this.form.email = '';
            this.form.password = '';
            this.isLoading = false;
            this.close();
        })
        .catch((error) => {
            console.log(error);
            this.isLoading = false;
        });
    },
    close() {
        this.$store.commit('setLoginModal', false);
    },
  },
}
</script>