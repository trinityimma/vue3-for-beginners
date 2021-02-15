<template>
  <section class="flex flex-wrap w-full">
      <div class="m-auto">
          <h1 class="text-2xl my-5">Re-useable Modal</h1>
          <Modal v-if="isRedModalOpen" @close-modal="isRedModalOpen = false">
              <template #title>
                  Red Modal
              </template>
              <template #body>
                  <p>This is the body sloty</p>
                  <section>Red Modal Body</section>
              </template>
          </Modal>
          <button class="m-2 border rounded bg-red-400" @click="isRedModalOpen = true">Red Modal</button>
          <Modal v-if="isBlueModalOpen" @close-modal="isBlueModalOpen = false">
                <template #title>
                  Blue Modal
              </template>
              <template #body>
                  <p>This is the body sloty</p>
                  <section>Bue Modal Body</section>
              </template>
          </Modal>
          <button class="m-2 border rounded bg-blue-400" @click="isBlueModalOpen = true">Blue Modal</button>
      </div>
  </section>
</template>

<script>
import Modal from '../components/Modal';
import {ref} from 'vue';
export default {
    components: { Modal },
    setup() {
        const isRedModalOpen = ref(false);
        const isBlueModalOpen = ref(false);

        return { isRedModalOpen,isBlueModalOpen }
    }
}
</script>
