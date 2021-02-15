<template>
   <section class="flex w-full">
      <div class="m-auto">
         <div class="mt-10">
            <div class="w-full text-center">
               <h1 class="text-2xl mt-4">Tensorflow Object Detection</h1>
               <small>Only detect few things!</small>
            </div>
               <div class="flex flex-wrap justify-center my-2">
                  <div class="w-full flex justify-center">
                      <button 
                      v-if="!isStreaming"
                        @click="openCamera" 
                         class="w-32 rounded shadow-md bg-gradient-to-r
                         from-blue-800 to-indigo-800 px-2 py-1
                            text-center text-white ">
                      Open Camera
                     </button>
                     <div v-else class="flex justify-between">
                         <button 
                           @click="snapshot" 
                           class="w-32 rounded shadow-md bg-gradient-to-r
                           from-blue-800 to-indigo-800 px-2 py-1
                              text-center text-white ">
                           Snapshot
                        </button>
                         <button 
                           @click="stopStreaming" 
                           class="w-32 rounded shadow-md bg-gradient-to-r
                           from-blue-800 to-indigo-800 px-2 py-1
                              text-center text-white ">
                           Stop Streaming
                        </button>
                     </div>
                  </div>
                  <video 
                  ref="videoRef" 
                  autoplay="true" 
                  width="100">
                  </video>
               </div>
            <div class="flex flex-wrap justify-center">
             <img 
               ref="imgRef"
                src="https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb" 
                width="200" alt="Mobile Image"
                crossorigin="anonymous"
             />
             <div class="w-full text-center my-4">
               <button @click="detectImage" class="w-50 rounded shadow-md bg-gradient-to-r
               from-red-800 to-pink-800 p-2 mb-2 text-center text-white">
                  <span v-if="isLoading">Loading ...</span>
                  <span v-else>Detect Object</span>
               </button>
                <div v-if="result.length > 0">
                   <p >{{ result[0].class }}</p>
                </div>
             </div>
            </div>
         </div>
      </div>
   </section>
</template>
<script>
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { ref,} from 'vue';
export default {
 setup (){
   const imgRef = ref("");
   const videoRef = ref("");
   const isLoading = ref(false);
   const isStreaming = ref(false);
   const result = ref([]);
   const modelPromise = ref('');

    const detectImage = async () => {
      const img = imgRef.value;
      isLoading.value = true;
      const  model = await cocoSsd.load();
      result.value = await model.detect(img);
      isLoading.value = false;
    }
    const openCamera = async () => {
      if(navigator.mediaDevices.getUserMedia){
         navigator.mediaDevices.getUserMedia({video: true})
         .then(stream =>{
            isStreaming.value = true;
            videoRef.value.srcObject = stream;
         });
      }
    }
  const stopStreaming = ()=>{
     const stream = videoRef.value.srcObject;
     const tracks = stream.getTracks()
     tracks.map(track => track.stop());
     isStreaming.value = false;
  }
  const snapshot = ()=>{
     const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.value,0,0,200,200);
      const data = canvas.toDataURL('image/png');
      imgRef.value.setAttribute('src', data);
  }
    return {
        imgRef,
         videoRef, 
         result,
         openCamera,
         detectImage,
         isStreaming,
         isLoading,
         modelPromise,
         stopStreaming,
         snapshot,
    };
 }
  
  
}
</script>
