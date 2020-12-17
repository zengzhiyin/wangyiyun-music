<template>
  <div class="volume">
    <Icon
      :size="20"
      :type="getIconType()"
      @click="toggleSilence"
      class="icon"
    />
    <div class="progress-wrap">
      <ProgressBar
      />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Volume',
  props: {
    volume: {
      type: Number,
      default: 1,
    }
  },
  data() {
    return {
      volumePercent: this.volume
    }
  },
  methods: {
    onProgressChange(percent) {
      if (percent < 0.05) {
        percent = 0
      }
      this.volumePercent = percent
      this.$emit('volumeChange', percent)
    },
    getIconType() {
      return this.isSilence ? 'silence' : 'horn'
    },
    toggleSilence() {
      this.isSilence = !this.isSilence
    }
  },
  computed: {
    isSilence: {
      get() {
        return this.volumePercent === 0
      },
      set(newSilence) {
        const target = newSilence ? 0 : this.lastVolume
        if (newSilence) {
          this.lastVolume = this.volumePercent
        }
        this.volumePercent = target
        this.onProgressChange(target)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.volume {
  position: relative;
  .icon {
    color: var(--font-color);
    cursor: pointer;
    margin-right: 8px;
  }
  .progress-wrap {
    position: absolute;
    // display: none;
    left: 0;
    bottom: 0;
    height: 130px;
    width: 30px;
    padding-bottom: 40px;
    margin-left: -6px;
  }
}
.volume:hover .progress-wrap{
  display: block;
}
</style>
