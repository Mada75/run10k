<template>
  <section>
    <div class="heading">
      <h1 class="heading-title">{{ heading }}</h1>
      <div class="sub-heading">{{ subHeading }}</div>
    </div>
    <img :src="image.location" :alt="image.alt" :title="image.title" />
    <div class="plan">
      <h2 class="plan-title">{{ planTitle }}</h2>
      <p class="sub-heading">
        It’s important that you’re flexible in your approach in respect to
        effort and recovery. Before starting this training plan, try and build
        up to running around 35-40k per week.
      </p>
      <p class="sub-heading">
        Vary your pace slightly during these runs and save the real speed work
        for the eight weeks covered in the plan below.
      </p>
      <p class="sub-heading">
        Following this training plan should get you across the line in
        approximately 40-50 minutes. You'll do a number of different sessions to
        help improve your fitness, including
        <!-- 
          each click opens the modal in the app-modal which makes popup appear
        -->
        <a @click="speedwork.modal = true">speedwork</a>,
        <a @click="strides.modal = true">strides</a>,
        <a @click="intervals.modal = true">intervals</a>,
        <a @click="intervals.modal = true">tempo</a> and
        <a @click="fartlek.modal = true">fartlek</a> runs.
      </p>
    </div>

    <!--
      app-modal only renders when activity.modal = true
    -->
    <div>
      <modal-slot :activity="strides" />
      <modal-slot :activity="intervals" />
      <modal-slot :activity="fartlek" />
      <modal-slot :activity="tempo" />
      <modal-slot :activity="speedwork" />
    </div>
    <home-calendar />
  </section>
</template>

<script>
import ModalSlot from '@/components/ModalSlot'
import HomeCalendar from '@/components/HomeCalendar'
export default {
  components: { ModalSlot, HomeCalendar },
  data() {
    return {
      heading: '10k training plan',
      subHeading:
        'This training plan allows you to see your 10k fitness rocket over a period of eight weeks',
      image: {
        location: require('../../public/hill-runner.jpg'),
        alt: 'hill-runner',
        title: ''
      },
      planTitle: "what's in a plan",
      speedwork: {
        modal: false,
        type: 'speedwork',
        bodyA:
          'Speedwork pushes your limits to make you fitter, faster and ultimately helping you to run harder for longer across all distances. Running at a faster pace places high demands on muscles and joints that may already be fatigued from all the marathon miles so a warm up is essential.',
        bodyB:
          'If you’re new to speed, start with strides and tempo sessions rather than all-out sprint reps to allow your body to adapt and get your body used to pacework. You’ll enter the anaerobic training zone - which means tapping into different energy systems than in your regular long, slow runs so expect the sessions to be uncomfortable – speedwork is tough, but it pays!'
      },
      strides: {
        modal: false,
        type: 'strides',
        bodyA:
          'Strides are short bursts of acceleration in a regular mid-week run. Gradually build up speed for 20-25 seconds then decelerate back down to a jog. Repeat five or six times and take a minute or so to recover and catch your breath between each stride.',
        bodyB:
          'Good for: runners new to speedwork and as a maintenance speed session throughout the year.'
      },
      intervals: {
        modal: false,
        type: 'intervals',
        bodyA:
          'These are periods of hard running at 5K pace or faster, between 200m and 1200m in length, or 30 seconds and five minutes. Recovery periods can be short (30-90 seconds), or of an equal time or distance to the reps. Running at harder than race pace for short periods not only improves speed and fitness, but also allows you to work on your running form.',
        bodyB:
          'Good for: runners developing speedwork and anyone wanting to shake up their running. With a myriad interval variations, boredom is impossible.'
      },
      tempo: {
        modal: false,
        type: 'tempo',
        bodyA:
          'Tempo runs are run a little slower than your 5K pace and work a bit like threshold runs – they raise the point at which lactic acid builds up in the muscles. These are longer than ordinary intervals, taking between 90 seconds and 10 minutes, or between 400m and two miles.',
        bodyB: 'Good for: runners new to speedwork.'
      },
      fartlek: {
        modal: false,
        type: 'fartlek',
        bodyA:
          'Fartlek sessions makes speedwork fun. If you don’t like structured sessions requiring you to pore over your pace, fartlek could be for you. The Swedish word for ‘speed play’, fartlek sessions mix surges of hard running with periods of easy running. Run fast between lampposts or trees when you feel like it, and as hard you like. There’s no point cheating however – you need to push yourself to get results.',
        bodyB:
          'Good for: runners who don’t like overly structured sessions and anyone new to speedwork.'
      }
    }
  },
  methods: {},
  mounted() {
    // receives on eventbus
  }
}
</script>

<style lang="scss" scoped>
.heading-title {
  text-transform: uppercase;
}
img {
  width: 100%;
  height: auto;
}
.plan-title {
  text-transform: uppercase;
}
.sub-heading {
  line-height: 1.2;
}
/* If the screen size is 601px wide or more */
@media screen and (min-width: 601px) {
  .heading {
    padding: 4rem;
  }
  .heading-title {
    font-size: 3.5rem;
  }
  .sub-heading {
    font-size: 1.2rem;
  }
  .plan {
    padding: 2rem 10%;
  }
  .plan-title {
    font-size: 2.2rem;
  }
}
/* If the screen size is 600px wide or less */
@media screen and (max-width: 600px) {
  .heading {
    padding: 1rem;
  }
  .heading-title {
    font-size: 2.3rem;
  }
  .sub-heading {
    font-size: 1rem;
  }
  .plan {
    padding: 1rem;
  }
  .plan-title {
    font-size: 1.2rem;
  }
}
</style>
