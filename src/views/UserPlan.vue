<template>
  <div id="my-plan">
    <user-nav-bar/>
    <user-calendar />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import UserCalendar from '@/components/UserCalendar.vue'
import UserNavBar from '@/components/UserNavBar.vue'


export default {
  components: {
    UserCalendar,UserNavBar
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
