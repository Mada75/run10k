<template>
  <section>
    <home-text />
    <home-calendar />
  </section>
</template>

<script>
import HomeText from '@/components/HomeText'
import HomeCalendar from '@/components/HomeCalendar'

export default {
  components: {
    HomeText,
    HomeCalendar
  }
}
</script>
