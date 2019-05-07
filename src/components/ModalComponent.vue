<template>
  <div>
    <transition appear name="modal">
      <div class="modal-mask" @click="$emit('close')">
        <div class="modal-wrapper">
          <div class="modal-container" @click.stop>
            <div class="modal-header">
              <slot name="header"></slot>
              <a @click="$emit('close')" title="Close window" class="button-x"
                >X</a
              >
            </div>
            <div class="modal-body">
              <slot name="bodyA"></slot>
              <br />
              <slot name="bodyB"></slot>
            </div>
            <div class="modal-footer">
              <button class="button" @click="$emit('close')">Close</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(#34495e, 0.6);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 0 1rem 0 rgba(blue, 0.5);
  transition: all 0.3s ease;
  overflow-y: auto;
}
.modal-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 0;
  background: #e6ecf0;
  color: #00008b;
  padding: 0.3rem 1rem;
  text-transform: capitalize;
}
a {
  font-size: 10px;
  width: 20px;
  padding: 0.4rem;
  border-radius: 10px;
  text-align: center;
}
a:hover {
  color: white;
}
.modal-enter {
  opacity: 0;
}
.button {
  padding: 0.5rem;
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

  .modal-wrapper {
    padding: 0 10%;
  }
  .modal-container {
    width: calc(100vw - 20%);
    max-height: calc(100vh - 10%);
    padding: 0.5rem;
  }
  .modal-body {
    margin: 1.5rem 0;
    line-height: 1.5;
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
