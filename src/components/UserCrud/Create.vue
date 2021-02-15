<template>
   <button class="px-2 py-1 border rounded m-4"
               @click="isModalOpen = true"
              >
              Add User
    </button>
  <teleport to="body">
      <Modal 
      v-if="isModalOpen" 
      @close-modal="isModalOpen = true">
          <template #title>
              Add New User
          </template>
          <template #body>
              <form @submit.prevent="submit">
                  <div class="p-2">
                      <label class="py-2" for="name">Name: </label>
                      <input id="name"
                       class="w-full p-2 rounded border"
                       v-model="state.form.name"
                       placeholder="User's Name" />
                  </div>
                  <div class="p-2">
                      <label class="py-2" for="email">Email: </label>
                      <input id="email"
                       class="w-full p-2 rounded border" 
                       v-model="state.form.email"
                       placeholder="User Email" type="email" />
                  </div>
                  <div class="p-2">
                      <label class="py-2" for="avatar">Avatar Url: </label>
                      <input id="avatr"
                       class="w-full p-2 rounded border"
                       v-model="state.form.avatar"
                        placeholder="Avatar Url" type="text" />
                  </div>
                  <div class="p-2">
                      <input
                        @click="state.mode = 'add'"
                        class="w-full p-2 rounded border hover:bg-gray-300"
                        placeholder="Avatar Url" 
                        type="submit" value="Create" />
                  </div>
              </form>
          </template>
      </Modal>
  </teleport>
</template>

<script>
import Modal from "../Modal";
import { ref, reactive } from "vue";
import axios from "../../plugins/axios";
export default {
    components: {Modal},
    setup(_,{ emit }) {
    const isModalOpen = ref(false);
     const state = reactive({
            users: [],
            page: 1,
            form: {
                name: "",
                email: "",
                avatar: "",
            },
    });

     const submit = async () => {
        const {data} = await axios.post('/users', state.form);
         emit('new-user-added', data);
         state.form.email = '';
         state.form.name = '';
         state.form.avatar = '';
         isModalOpen.value = false;
     }

        return {isModalOpen, submit, state};
    }
}
</script>

<style>

</style>