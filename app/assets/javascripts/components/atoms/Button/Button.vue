<template>
  <button
    @click="onClick()"
    :class="[variant, className]"
    :type="type"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    variant: {
      type: String,
      validator: (prop) => ['primary','save', 'cancel'].includes(prop),
      default: 'primary',
    },
    type: {
      type: String,
      validator: (prop) => ['button','submit'].includes(prop),
      default: 'button',
    },
    className: {
      type: String,
      default: '',
    },
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
  @import './Button.scss';
</style>