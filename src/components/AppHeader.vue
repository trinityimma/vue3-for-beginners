<template>
    <nav class="w-full bg-gradient-to-r 
    from-blue-800 to-blue-600 
    text-white px-4 py-5">

    <router-link
      v-for="item in list"
      class="mx-2" 
      :key="item.to"
      :to="item.to"
      >
      {{ item.title }}
    
     </router-link>
    <button v-if="isLoggedIn" class="mx-2" @click="logout">Logout</button>
    <button v-else class="mx-2" @click="openLogin">Login</button>
    </nav>
</template>

<script>
import firebase from '../utilities/firebase';
export default {
    data() {
      return {
          list: [
              {title: "Dc Heroes", to: "/dc-heroes"},
              {title: "Calendar", to: "/calendar"},
              {title: "Markdown", to: "/markdown"},
              {title: "Slider", to: "/slider"},
              {title: "Calculator", to: "/calculator"},
              {title: "Modal", to: "/reuseable-modal"},
              {title: "Chat", to: "/chat"},
              {title: "User Crud", to: "/user-crud"},
              {title: "Tensorflow", to: "/tensorflow"},
          ],
      }
    },
    computed: {
        isLoggedIn() {
            return this.$store.state.isLoggedIn;
        }
    },
    methods: {
        logout() {
            firebase.auth().signOut().then(() => {
               console.log(" You are logged out!");
            }).catch((e) => {
                console.log(e);
            });
        },
        openLogin() {
            this.$store.commit('setLoginModal', true);
        }
    }
}
</script>

