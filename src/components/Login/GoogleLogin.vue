<template>
      <section class="mt-5 text-center">
            <button class="border px-2 rounded"
            @click="loginWithGoogle">Login with Google</button>
     </section>
</template>

<script>
import firebase from "../../utilities/firebase";
export default {
   methods: {
      loginWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(() =>{
            this.$emit('close-login-modal-from-google');
        });
      }
   },   
}
</script>
