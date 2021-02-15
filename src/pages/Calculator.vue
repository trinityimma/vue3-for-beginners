<template>
  <section class="flex w-full ">
      <div class="m-auto">
         <h1 class="text-2xl text-center my-2" >Calculator</h1> 
         <p class="text-3xl text-right mt-10
          w-42 h-12 overflow-x-scroll overflow-y-hidden" 
        >
            {{ currentNum }}
          </p>
          <div class="h-10">
          <small v-if="selectedOperation">{{ leftTerm }} {{ selectedOperation }} {{ currentNum }}</small>
          </div>
         <div class="grid grid-cols-4 gap-2">
             <button @click="pressed('1')" class="p-2 w-10 h-10 border rounded shadow">1</button>
             <button @click="pressed('2')" class="p-2 w-10 h-10 border rounded shadow">2</button>
             <button @click="pressed('3')" class="p-2 w-10 h-10 border rounded shadow">3</button>
             <button @click="pressed('+')" class="p-2 w-10 h-10 border rounded shadow">+</button>
             <button @click="pressed('4')" class="p-2 w-10 h-10 border rounded shadow">4</button>
             <button @click="pressed('5')" class="p-2 w-10 h-10 border rounded shadow">5</button>
             <button @click="pressed('6')" class="p-2 w-10 h-10 border rounded shadow">6</button>
             <button @click="pressed('-')" class="p-2 w-10 h-10 border rounded shadow">-</button>
             <button @click="pressed('7')" class="p-2 w-10 h-10 border rounded shadow">7</button>
             <button @click="pressed('8')" class="p-2 w-10 h-10 border rounded shadow">8</button>
             <button @click="pressed('9')" class="p-2 w-10 h-10 border rounded shadow">9</button>
             <button @click="pressed('*')" class="p-2 w-10 h-10 border rounded shadow">*</button>
             <button @click="pressed('c')" class="p-2 w-10 h-10 border rounded shadow">C</button>
             <button @click="pressed('0')" class="p-2 w-10 h-10 border rounded shadow">0</button>
             <button @click="pressed('=')" class="p-2 w-10 h-10 border rounded shadow">=</button>
             <button @click="pressed('/')" class="p-2 w-10 h-10 border rounded shadow">/</button>
         </div>
      </div>
  </section>
</template>

<script>
import {ref, } from 'vue';
import useWindowEvent from '../utilities/composition/useWindowEvent';
export default {
    setup() {
        const operations = ['+','-','*','/'];
        const numbers = ['1','2','3','4','5','6','7','8','9','0'];
        const currentNum = ref('');
        const leftTerm = ref("");
        const selectedOperation = ref("");

        function pressed(value){
            if(value === '=' ||value === "Enter" ) calculate();
            else if(value === 'c' ||value === "Backspace") clear();
            else if(operations.includes(value)) applyOperation(value);
            else if(numbers.includes(value)) appendNumber(value);
        }
        function appendNumber(value){
             currentNum.value += value;
        }
        function applyOperation(value){
            calculate();
            leftTerm.value = currentNum.value;
            clear();
            selectedOperation.value = value;
        }
        function calculate() {
            switch(selectedOperation.value) {
                case '+':
                    sum();
                    break;
                case '-':
                    subtract();
                     break;
                case '*':
                    multiply();
                     break;
                case '/':
                     divide();
                    break;
            }
            leftTerm.value = "";
            selectedOperation.value = "";
        }
        const multiply = () => currentNum.value = leftTerm.value * currentNum.value;
        
        const divide = () => currentNum.value = leftTerm.value/currentNum.value;
        
        const sum = () => currentNum.value = +leftTerm.value + +currentNum.value;
        
        const subtract = () => currentNum.value = leftTerm.value - currentNum.value;
        
        const clear = () => currentNum.value = "";
        
        const handleKeydown = (e) => pressed(e.key);
        
        useWindowEvent( "keydown", handleKeydown);

        return { leftTerm, selectedOperation,currentNum, pressed};
    },
    
}
</script>

