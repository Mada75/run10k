<template>
  <section id="home-text">
    <div>
      <h1 class="heading-title">10k training plan</h1>
      <p class="sub-heading">
        Running is a great way to get fit, feel better and even form new
        relationships with other runners. Starting a new running habit doesn’t
        have to be hard - all it takes is a comfortable pair of shoes and a
        willingness to move a little or a lot, all at your own pace.
        <br />This training plan allows you to see your running fitness rocket
        over a period of eight weeks.
      </p>
    </div>

    <div class="train-box">
      <h5>first pick a race</h5>
      <p>
        The absolute best way to keep yourself running is to find a race, sign
        up for it, pay for it and put it on your calendar.
        <strong>
          A fixed race date will help you stay focused, and keep you on a
          regular running schedule.</strong
        >
        You can run any race — you just need to allow enough time to train for
        it. Pick your distance and use an online race finder like the
        <a
          href="https://www.runnersworld.com/training/a20803105/race-finder/"
          target="_blank"
          >Runner’s World Race Finder</a
        >
        to help you find the right race for you.
      </p>
    </div>

    <div class="train-box">
      <h5>running form</h5>
      <p>
        Some people are natural heel-strikers while others tend to lead with
        their toes. The good news: neither form is inherently better than the
        other. And you are less likely to become injured if you simply maintain
        your natural stride.
        <strong>
          The more you run, the more comfortable that stride will feel the more
          efficient your body will become.
        </strong>
      </p>
    </div>
    <div class="train-box">
      <h5>choose a training plan</h5>
      <p>
        You can find any number of elaborate training plans online and in print,
        but I believe in keeping it simple. <a href="#week-view">Below</a> you
        will find a training plan modelled on
        <a
          href="https://www.runnersworld.com/uk/training/10km/a760075/rws-8-week-10k-schedule-5-days-per-week/"
          >Runner's World 8-week 10K training plan, running 5 days a week</a
        >
        a great formula for a great training plan.
      </p>
    </div>
    <img :src="image.location" :alt="image.alt" :title="image.title" />

    <div>
      <h3>What's in a plan?</h3>
      <p>
        It’s important that you’re flexible in your approach in respect to
        effort and recovery. Before starting this training plan, try and build
        up to running around 35-40k per week.
      </p>
      <p>
        Vary your pace slightly during these runs and save the real speed work
        for the eight weeks covered in the plan below.
      </p>
      <p>
        Following this training plan should get you across the line in
        approximately 40-50 minutes. You'll do a number of different sessions to
        help improve your fitness, including
        <!-- 
          each click opens the modal in the app-modal which makes popup appear
        -->
        <a @click="speedwork.modal = true">speedwork</a>,
        <a @click="strides.modal = true">strides</a>,
        <a @click="intervals.modal = true">intervals</a>,
        <a @click="tempo.modal = true">tempo</a> and
        <a @click="fartlek.modal = true">fartlek</a> runs.
      </p>
    </div>

    <!--
      app-modal only renders when activity.modal = true
    -->
    <section>
      <modal-slot :activity="strides" />
      <modal-slot :activity="intervals" />
      <modal-slot :activity="fartlek" />
      <modal-slot :activity="tempo" />
      <modal-slot :activity="speedwork" />
    </section>
  </section>
</template>

<script>
import ModalSlot from '@/components/ModalSlot'
export default {
  components: {
    ModalSlot
  },
  data() {
    return {
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
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/app.scss';
//@import '@/assets/scss/_global.scss';
</style>
