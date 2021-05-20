<script>
export default Vue.component("heading", {
  render: function (createElement) {
    return createElement(
      "h" + this.level,
      {
        attrs: {
          class: this.className,
        },
      },
      this.$slots.default
    );
  },
  name: "Heading",
  props: {
    level: {
      type: String,
      validator: (prop) => ["1", "2", "3", "4", "5"].includes(prop),
      default: "5",
    },
    className: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./Heading.scss";
</style>
