<template>
  <div>
    <Heading>Delete {{ text }}?</Heading>
    <div class="buttons">
      <Button
        :variant="'cancel'"
        @click="cancelAction()"
        :disabled="disableButtons"
      >
        Cancel
      </Button>
      <Button
        :variant="'save'"
        @click="deleteAction()"
        :disabled="disableButtons"
      >
        Delete
      </Button>
    </div>
  </div>
</template>

<script>
import Button from '@components/atoms/Button/Button'
import Heading from '@components/atoms/Heading/Heading'
export default {
  name: 'DeleteConfirmation',
  props: {
    text: String,
    deleteAction: Function,
    cancelAction: Function,
    disableButtons: Boolean,
  },
  components: {
    Button,
    Heading
  }
}
</script>

<style lang="scss" scoped>
@import "./DeleteConfirmation.scss";
</style>
