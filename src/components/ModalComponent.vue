<template>
  <div id="modal">
    <transition appear name="modal">
      <div class="modal-mask" @click="$emit('close')">
        <div class="modal-wrapper">
          <div class="modal-container" @click.stop>
            <div class="modal-header">
              <slot name="header"></slot>
              <a @click="$emit('close')" title="Close Window">
                <fa-icon icon="times" class="time"/>
              </a>
            </div>
            <div class="modal-body">
              <slot name="bodyA"></slot>
              <br>
              <slot name="bodyB"></slot>
            </div>
            <div class="modal-footer">
              <button @click="$emit('close')">Close</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/app.scss';

.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(#34495e, 0.3);
  display: table;
  transition: opacity 0.3s ease;
  z-index: 9998;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  margin: 0px auto;
  color: #34495e;
  background: $bg-dark;
  box-shadow: 0 0 3px 0 rgba(orange, 1);
  border: 3px solid $white;
  transition: all 0.3s ease;
  overflow-y: auto;
}
.modal-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: rgba(21, 29, 52, 1);
  text-transform: capitalize;
  color: $white;
}
#modal {
  .modal-mask {
    a {
      margin-right: 50px;
      font-size: 10px;
      width: 20px;
      padding: 0.4rem;
      border-radius: 10px;
      text-align: center;
      color: white;
      font-size: 2rem;
      &:hover {
        color: orange;
      }
    }
    button {
      background: rgba(21, 29, 52, 1);
      color: white;
      border: none;
      padding: 1rem;
      box-shadow: 3px 3px rgba(21, 29, 52, 0.3);
      margin: 1rem;
      &:hover {
        cursor: pointer;
        color: orange;
        text-decoration: underline;
      }
    }
  }
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

/* If the screen size is 601px wide or more */
@media screen and (min-width: 743px) {
  .modal-mask {
    height: 100%;
  }

  .modal-container {
    width: 1200px;
    max-width: calc(100vw - 100px);
    max-height: calc(100vh - 10%);
 //   margin-left:  10%;
 //   margin-right:  50%;
  }
}
/* If the screen size is 600px wide or less */
@media screen and (max-width: 742px) {
  .modal-mask {
    // height: 100%; trying vh to get around mobile scroll
    min-height: 100vh;
  }

  .modal-wrapper {
    padding: 0;
  }
  .modal-container {
    width: 96%;
    padding: 0.5rem 0.5rem;
    max-height: calc(100vh - 5%);
    font-size: 1rem;
  }
  .modal-body {
    margin: 1rem 0;
    line-height: 1.2;
  }
}
</style>
