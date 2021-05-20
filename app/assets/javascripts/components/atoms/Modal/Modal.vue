<template>
  <div class="modal-backdrop" 
    v-show="type === 'mounted' ? showModal : true" 
    v-if="type === 'unmounted' ? showModal : true" 
    @click="closeModal()"
    @click.stop
  >
    <div
      class="modal-container"
      @click.stop
    >
      <span aria-hidden="true" class="close-x" @click="closeModal()"
        >&times;</span
      >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      validator: (prop) => ['mounted', 'unmounted'].includes(prop),
      default: 'mounted',
    }
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

<style lang="scss" scoped>
  @import './Modal.scss';
</style>