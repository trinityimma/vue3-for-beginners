  <template>
    <div class="subcontainer">
      <h1>Dc Heroes {{herosCount}}</h1>
      <ul>
        <li
          v-for="(hero,index) in dcHeroes"  :key="hero.name">
            <div>{{ hero.name }}</div>
          <button class="delete" @click="removeHero(index)">X</button>
         </li>
      </ul>
      <form @submit.prevent="addHero">
        <input v-model.trim="newHero" 
         placeholder="Type Hero Name Here" ref="newHeroRef"/>
        <button class="border rounded bg-graddients-to-r from-red-700 to-pink-500 text-sm text-white" type="sumbit">Add Hero</button>
      </form>
    </div>
  </template>

<script>
  import {onMounted, computed, ref} from 'vue';
  export default {
    setup() {
      const newHeroRef = ref("");
      const newHero = ref('');
      const dcHeroes = ref([
          {name: 'SuperGirl'},
          { name: 'Flash'},
          { name:'Batman'},  
          { name: 'Arrow'},
          { name:'SuperMan'},
        ]);

      const herosCount = computed({
        get: ()=> dcHeroes.value.length,
      });

      onMounted(() =>{
        newHeroRef.value.focus();
      }); 
     
      function removeHero(index) {
        dcHeroes.value = dcHeroes.value.filter((hero,i)=> i !==index);
      }

      function addHero(){
        if(newHero.value !== ''){
          dcHeroes.value.unshift({name: newHero.value});
          newHero.value = '';
        }
      }
      return {dcHeroes, newHero, removeHero, addHero, newHeroRef, herosCount};
    },
  }
</script>