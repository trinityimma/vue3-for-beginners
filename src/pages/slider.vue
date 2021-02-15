<template>
   <div class="flex flex-wrap w-full relative">
       <div class="absolute w-full" v-for="(color,index) in sliders" :key="color">
           <transition name="fade">
              <div :class="color" style="height:350px"
              v-if="currentSlide == index"></div>
           </transition>
       </div>
       <div class="w-full" style="height:340px">
           <div class="absolute bottom-0 w-full flex justify-center">
             <div v-for="(slider, index) in sliders"
              :key="slider" @click="makeActive(index)"
             :class="currentSlide == index ? 'bg-gray-700' : 'bg-gray-300'"
             class="w-4 h-4 rounded-full mx-2 cursor-pointer shadow-md"></div>
           </div>
       </div>
   </div>
</template>

<script>
export default {
    data() {
        return {
            currentSlide: 0,
            interval: "", 
            isTitleShowing: true,
            sliders: ['bg-yellow-600', 'bg-blue-600', 'bg-red-600'],
        };
    },
    methods: {
        makeActive(index){
            this.currentSlide = index;
        }
    },
    mounted() {
        this.interval = setInterval(() => {
            this.currentSlide = this.currentSlide === 2 ? 0: this.currentSlide+1;
        },2000);
    },
    beforeUnmount() {
        clearInterval(this.interval);
    }
}
</script>

<style>

.fade-enter-active,
.fade-leave-active {
    transition: all 1s ease;
}
.fade-enter-from {
     opacity: 100;
    transform: translateX(-100%);
}
.fade-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
</style>