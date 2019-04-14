<template>
  <div>
    <div>
      <set-user-data />
      <add-document/>
      <read-document/>
      <set-document/>
      <data-types/>
      <update-document/>
      <timestamp-document/>
      <read-write-transactions/>
      <write-batch/>
      <delete-data/>
      <get-data/>
      <realtime-updates/>
      <vue-firestore/>
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
export default {
  components: {
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
  methods: {}
}
</script>

<style lang="scss" scoped></style>
