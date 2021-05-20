<template>
  <div class="select-wrapper">
    <label>{{label}}:</label>
    <select
      v-model="selected"
      @change="onSelect()"
    >
      <option disabled>Choose Phase</option>
      <option 
        v-for="option in options"
        :key="option"
      >
        {{option}}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      default: ['None'],
    },
    label: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      selected: this.value || this.options[0],
    };
  },
  methods: {
    onSelect() {
      this.$emit('select', this.selected);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./Select.scss";
</style>