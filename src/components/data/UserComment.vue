<template>
  <!-- https://stackoverflow.com/questions/46166359/editing-a-form-with-save-and-cancel-options -->
  <div id="user-comment">
    <div
      ref="edit"
      type="text"
      :contenteditable="isEditing"
      @click="save($event.target.innerHTML)"
      v-html="day.comment || text"
      @keyup.esc="escapedComment()"
      @keyup.enter="setComment(day.dayId, $event.target.innerHTML)"
      class="comment-box"
      :class="[
        day.complete == true ? 'day-complete' : 'day-incomplete',
        isEditing == true ? 'day-edit' : 'click-to-edit'
      ]"
    ></div>
    <div class="icon-group">
      <fa-icon
        icon="trash-alt"
        class="icon"
        v-show="isEditing"
        @click="escapedCommentButton(day)"
        title="Cancel comment"
      />
      <fa-icon
        icon="save"
        class="icon"
        v-show="isEditing"
        @click="setCommentButton(day.dayId, $refs.edit.innerHTML)"
        title="Save comment"
      />
      <fa-icon
        icon="comment"
        class="icon"
        @click="saveButton()"
        v-if="!isEditing"
        title="Leave a comment"
      />
      <user-complete :day="day" class="user-complete" />
    </div>
    <transition name="fade">
      <div v-if="performingRequest" class="loading">
        <p>Updating Comment...</p>
      </div>
    </transition>
  </div>
</template>
<script>
import UserComplete from '@/components/data/UserComplete.vue'
import { mapState } from 'vuex'
import { db } from '../../firebaseConfig.js'

export default {
  props: {
    day: {
      type: Object,
      required: true
    }
  },
  components: {
    UserComplete
  },
  data() {
    return {
      errors: [],
      performingRequest: false,
      isEditing: false,
      text: 'Add a comment'
    }
  },
  mounted() {},
  computed: {
    ...mapState(['currentUser'])
  },

  methods: {
    save(text) {
      console.log('storing => ', text)
      this.isEditing = true
      this.$nextTick(() => this.$refs.edit.focus())
      this.text = text
      if (this.text == 'Add a comment') {
        this.$refs.edit.innerHTML = ''
      }
    },
    saveButton() {
      console.log('storing => ', this.$refs.edit.innerHTML)
      this.isEditing = !this.isEditing
      this.$nextTick(() => this.$refs.edit.focus())
      this.text = this.$refs.edit.innerHTML
    },
    /*     escapedComment() {
      let self = this
      let text = this.text
      setTimeout(function() {
        console.log('delayed?')
        console.log('reverting to => ', text)
        self.$refs.edit.innerHTML = text
        self.isEditing = false
      }, 500)
    },
 */

    escapedComment() {
      console.log('reverting to => ', this.text)
      this.$refs.edit.innerHTML = this.text
      this.isEditing = false
    },
    escapedCommentButton() {
      console.log('reverting to => ', this.text)
      this.$refs.edit.innerHTML = this.text
      this.isEditing = false
    },
    setComment(dayId, inner) {
      var sanitizedString = inner.replace(/(<([^>]+)>)/gi, '')

      console.log('sending', dayId, sanitizedString)
      this.performingRequest = true
      this.isEditing = false
      let colRef = db
        .collection('users')
        .doc(this.currentUser.uid)
        .collection('10k')
        .doc(dayId)
      if (sanitizedString.length <= 0) {
        console.log('no comment input')
        colRef
          .update({ comment: '' })
          .then(function() {
            console.log('Comment: ', '')
          })
          .catch(function(error) {
            // The document probably doesn't exist.
            console.error('Error updating document: ', error)
          })
      } else if (sanitizedString.length >= 1) {
        colRef
          .update({ comment: sanitizedString })
          .then(function() {
            console.log('Comment: ', sanitizedString)
          })
          .catch(function(error) {
            // The document probably doesn't exist.
            console.error('Error updating document: ', error)
          })
      }
      this.performingRequest = false
    },
    setCommentButton(dayId, inner) {
      console.log('icon', dayId, inner)
      var sanitizedString = inner.replace(/(<([^>]+)>)/gi, '')

      console.log('sending', dayId, sanitizedString)
      this.performingRequest = true
      this.isEditing = false
      let colRef = db
        .collection('users')
        .doc(this.currentUser.uid)
        .collection('10k')
        .doc(dayId)
      if (sanitizedString.length <= 0) {
        console.log('no comment input')
        colRef
          .update({ comment: '' })
          .then(function() {
            console.log('Comment: ', '')
          })
          .catch(function(error) {
            // The document probably doesn't exist.
            console.error('Error updating document: ', error)
          })
      } else if (sanitizedString.length >= 1) {
        colRef
          .update({ comment: sanitizedString })
          .then(function() {
            console.log('Comment: ', sanitizedString)
          })
          .catch(function(error) {
            // The document probably doesn't exist.
            console.error('Error updating document: ', error)
          })
      }
      this.performingRequest = false
    }
  }
}
</script>
