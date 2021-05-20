<template>
  <div :class="['input-wrapper', className ? className : '']">
    <input
      :type="type"
      :placeholder="placeholder"
      v-model="inputValue"
      @input="onChange()"
      :required="required"
      :disabled="disabled"
    />
    <label :class="chooseLabelClass()">
      {{ label }}
    </label>
    <span class="error">
      {{ printErrors() }}
    </span>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      validator: (prop) =>
        ["text", "password", "number", "email"].includes(prop),
    },
    placeholder: {
      type: String,
      default: "",
    },
    value: [Number, String],
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: "",
    },
    errors: [String, Array],
  },
  data() {
    return {
      inputValue: this.value,
    };
  },
  methods: {
    onChange() {
      this.$emit("change", this.inputValue);
    },
    printErrors() {
      let errorsMessage = "";

      if (Array.isArray(this.errors)) {
        this.errors.forEach((error, i) => {
          errorsMessage += `${this.label} ${error}`;
          if (this.errors.length - 1 !== i) errorsMessage += ", ";
        });
      }
      return errorsMessage;
    },
    chooseLabelClass() {
      return this.inputValue ? "input-not-empty" : "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./Input.scss";
</style>