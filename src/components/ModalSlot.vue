<template>
  <div>
    <modal-component v-if="activity.modal" @close="activity.modal = false">
      <h3 slot="header">{{ activity.type }}</h3>
      <p slot="bodyA">{{ activity.bodyA }}</p>
      <p slot="bodyB">{{ activity.bodyB }}</p>
    </modal-component>
  </div>
</template>

<script>
import ModalComponent from "@/components/ModalComponent";
export default {
  props: {
    activity: {
      type: Object,
      required: true,
      default: function() {
        return { message: "hello" };
      }
    }
  },
  components: {
    ModalComponent
  },
  data() {
    return {};
  },
  // escape key closes modal
  mounted: function() {
    document.addEventListener("keydown", e => {
      if (this.activity.modal && e.keyCode == 27) {
        this.activity.modal = false;
      }
    });
  }
};
</script>

<style lang="scss" scoped></style>
