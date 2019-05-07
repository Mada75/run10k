<template>
  <div>
    <div id="app">
      <div>
        First Name:
        <input
          type="text"
          ref="first_name"
          :value="user.firstName"
          :disabled="!isEditing"
          :class="{ view: !isEditing }"
        />
      </div>
      <button @click="isEditing = !isEditing" v-if="!isEditing">Edit</button>
      <button @click="save" v-else-if="isEditing">Save</button>

      <button v-if="isEditing" @click="isEditing = false">Cancel</button>
    </div>
    <div>
      <set-master-data />
      <set-user-data />
      <add-document />
      <read-document />
      <set-document />
      <data-types />
      <update-document />
      <timestamp-document />
      <read-write-transactions />
      <write-batch />
      <delete-data />
      <get-data />
      <realtime-updates />
      <vue-firestore />
    </div>
  </div>
</template>
<script>
import addDocument from '@/components/firestore/addDocument'
import readDocument from '@/components/firestore/readDocument'
import setDocument from '@/components/firestore/setDocument'
import dataTypes from '@/components/firestore/dataTypes'
import updateDocument from '@/components/firestore/updateDocument'
import timestampDocument from '@/components/firestore/timestampDocument'
import readWriteTransactions from '@/components/firestore/readWriteTransactions'
import writeBatch from '@/components/firestore/writeBatch'
import deleteData from '@/components/firestore/deleteData'
import getData from '@/components/firestore/getData'
import realtimeUpdates from '@/components/firestore/realtimeUpdates'
import vueFirestore from '@/components/firestore/vueFirestore'
import SetUserData from '@/components/data/SetUserData'
import SetMasterData from '@/components/data/SetMasterData.vue'
export default {
  components: {
    SetMasterData,
    addDocument,
    readDocument,
    setDocument,
    dataTypes,
    updateDocument,
    timestampDocument,
    readWriteTransactions,
    writeBatch,
    deleteData,
    getData,
    realtimeUpdates,
    vueFirestore,
    SetUserData
  },
  data() {
    return {
      isEditing: false,
      user: {
        firstName: 'John',
        lastName: 'Smith'
      }
    }
  },
  methods: {
    save() {
      this.user.firstName = this.$refs['first_name'].value
      this.user.lastName = this.$refs['last_name'].value
      this.isEditing = !this.isEditing
    }
  }
}
</script>

<style lang="scss" scoped></style>
