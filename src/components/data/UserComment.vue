<template>
  <!-- https://stackoverflow.com/questions/46166359/editing-a-form-with-save-and-cancel-options -->
  <div>
    <div>
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
          icon="times"
          class="icon"
          v-show="isEditing"
          @click="escapedCommentButton(day)"
          title="Cancel comment"
        />
        <fa-icon
          icon="check"
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
      text: 'enter comment'
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

<style lang="scss" scoped>
@import 'src/assets/scss/_global.scss';

.comment-box {
  font-style: italic;
  cursor: text;
  color: #00008b;
  font-size: 0.9rem;
  &:hover {
    color: $primary;
    background: rgba(white, 0.7);
  }
}
.comment-box.click-to-edit:hover {
  cursor: pointer;
}
.icon-group {
  padding: 0.4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.comment-box.day-edit {
  background: rgba(white, 0.5);
}
.day-complete {
  background: rgba(lightgreen, 0.5);
}
.comment-box.day-incomplete {
  background: rgba($medium, 0.1);
  &:hover {
    color: $primary;
    background: rgba(white, 0.7);
  }
}

.icon {
  cursor: pointer;
  flex: 0 1 50%;
  color: #00008b;
  transition: all 100ms ease;
  &:hover {
    color: $primary;
  }
}
.user-complete {
  flex: 0 0 50%;
}

.loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba($dark, 0.4);
  z-index: 9999;

  p {
    background: $white;
    width: 150px;
    text-align: center;
    margin: 40vh auto 0;
    padding: 40px 0;
    border-radius: 3px;
    box-shadow: 0 0 20px 0 rgba($dark, 0.5);
  }
}
</style>
