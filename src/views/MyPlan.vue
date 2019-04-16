<template>
  <div>
    <user-calendar/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import UserCalendar from '@/components/UserCalendar.vue'

export default {
  components: {
    UserCalendar
  },
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}
</style>
