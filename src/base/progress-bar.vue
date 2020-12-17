<template>
  <div class="progress-bar">
    <div class="bar-inner">
      <div class="progress-btn-wrapper">
        <div class="progress-btn" draggable="true" @dragstart="dragstartEvent($event)"  @drag="drag($event)"></div>
      </div>
      <div class="progress"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props:{
    fixedDragTag:{
      type:Number,
      default:0
    }
  },
  methods:{
    dragstartEvent(ev){
      this.fixedDragTag = ev.x
    },
    drag(ev){
      ev.x = this.fixedDragTag
      console.info("拖动",ev)
    }
  }
}
</script>

<style scoped lang="scss">
.progress-bar {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 8px;
  justify-content: center;
  box-shadow: 0 0 2px #dcdbc0;
  cursor: pointer;
  .bar-inner {
    position: relative;
    width: 2px;
    height: 100%;
    background: var(--progress-bgcolor);
    .progress {
      position: absolute;
      width: 100%;
      bottom: 0;
      height: 2.92857rem;
      background: $theme-color;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -14px;
      bottom: -13px;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: translate3d(0, -2.92857rem, 0px);
      .progress-btn {
        display: block;
        margin: auto;
        box-sizing: border-box;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: $theme-color;
        &.show {
          display: block;
        }
      }
    }
  }
}
.progress-bar::after{
  content: '';
  border: 6px solid transparent;
  border-top: 6px solid #efeee2;
  position: absolute;
  bottom: -13px;
  left: 0;
  margin-left: 9px;
}
</style>