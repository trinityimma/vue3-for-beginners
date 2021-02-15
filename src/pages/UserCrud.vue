<template>
  <section class="flex w-full">
      <div class="m-auto">
          <div class="mt-10">
              <Create @new-user-added="addUser"/>
              <table>
                  <thead>
                      <tr>
                          <th class="px-4 py-2 border">ID</th>
                          <th class="px-4 py-2 border">Avatar</th>
                          <th class="px-4 py-2 border">Name</th>
                          <th class="px-4 py-2 border">Email</th>
                          <th class="px-4 py-2 border">Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="user in state.users" :key="user.id">
                          <td class="border px-4 py-2">{{ user._id }}</td>
                          <td class="border px-4 py-2">
                              <img :src="user.avatar " 
                              alt="user.first_name"
                              width="80" class="rounded-full"
                            >
                          </td>
                          <td class="border px-4 py-2">{{ user.name }}</td>
                         <td class="border px-4 py-2">{{ user.email }}</td>
                         <td class="border px-4 py-2" >
                            <button 
                             @click="deleteUser(user._id)"
                             class="px-2 py-1 my-2 bg-red-800 rounded text-white"
                            > Delete
                            </button>
                            <button 
                             @click="submit(user)"
                             class="px-2 py-1 bg-red-400 rounded text-white"
                            >
                              Edit
                            </button>
                         </td>
                      </tr>
                  </tbody>
              </table>
              <div class="flex justify-between mt-2">
                 <button 
                  :class="state.users.page === 1 ? 'bg-gray-100 cursor-not-allowed' : 'hover:shadow'"
                  :disabled="state.users.page === 1"
                  class="px-3 py-2 border rounded"
                  @click="prev"
                  >
                     Prev
                 </button>
                  <button
                  :class="state.users.page === state.users.total_pages ? 'bg-gray-100 cursor-not-allowed' : 'hover:shadow'"
                  :disabled="state.users.page === state.users.total_pages"
                   class="px-3 py-2 border rounded"
                    @click="next"
                    >
                     Next
                  </button>
              </div>
          </div>
      </div>
  </section>
  
</template>

<script>
import { onMounted, reactive} from 'vue';
import axios from '../plugins/axios';
import Create from '../components/UserCrud/Create';

export default {
    components: { Create },
    setup() {
         const state = reactive({
            users: [],
            page: 1,
        });

      onMounted(async () => {
          const {data} = await axios.get('/users');
          state.users = data;
      });

     const next = async () =>{
         state.page++;
         const {data} = await axios.get(`/users?page=${state.page}`);
          state.users = data;
     }
     const prev = async () =>{
         state.page--;
         const {data} = await axios.get(`/users?page=${state.page}`);
          state.users = data;
     }
     const deleteUser = async (id) => {
         await axios.delete(`/users/${id}`);
         state.users = state.users.filter(user => user._id !== id )
     }
  
    const addUser = (data) => {
        state.users.push(data);
    }
      return { next, state, prev, deleteUser, addUser};
    },

}
</script>

<style>

</style>