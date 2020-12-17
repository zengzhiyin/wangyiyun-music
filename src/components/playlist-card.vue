<template>
  <div @click="onClickCard" class="playlist-card">
    <div class="img-wrap">
      <img v-lazy="$utils.genImgUrl(img, 300)" />
      <div class="desc-wrap" v-if="playCount">
        <span class="desc">
          <i class="el-icon-caret-right"></i> 
            {{ $utils.changTotalThousand(playCount) }}
          </span>
      </div>
      <PlayIcon :size="36" class="play-icon" />
    </div>
    <p class="name">{{ name }}</p>
  </div>
</template>

<script>
export default {
  components:{
  },
  props: ["id", "img", "name", "desc", "playCount"],
  methods: {
    onClickCard() {
      this.$router.push(`/playlist/${this.id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.playlist-card {
  position: relative;
  width: calc(20% - 8px);
  margin: 4px;
  margin-bottom: 32px;
  cursor: pointer;

  .img-wrap {
    position: relative;
    width: 100%;
    padding-top: 100%;
    margin-bottom: 8px;
    border-radius: 4px;
    overflow: hidden;

    img {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    .desc-wrap {
      position: absolute;
      padding: 6px;
      left: 0;
      right: 0;
      top: 0;
      // background-color: rgba(0, 0, 0, 0.4);
      transition: all 0.3s;
      text-align: right;
      .desc {
        color: $white;
        font-size: $font-size-sm;
      }
    }

    .play-icon {
      opacity: 0;
      position: absolute;
      right: 4px;
      bottom: 4px;
      font-size: 24px;
      transition: all 0.3s;
      color: $white;
    }

    &:hover {
      .play-icon {
        opacity: 1;
      }
    }
  }

  .name {
    font-size: $font-size-medium-sm;
    line-height: 1.5;
    @include text-ellipsis-multi(2);
  }
}
</style>
