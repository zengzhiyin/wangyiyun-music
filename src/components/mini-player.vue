// 底部播放栏组件
<template>
  <div class="mini-player" id="mini-player">
    <!-- 歌曲内容 -->
    <div class="song">
      <template>
        <div class="img-wrap">
          <div class="mask"></div>
          <img src="https://p1.music.126.net/kSa0W8zMSqn0u8HvAgepAg==/109951165524847248.jpg?param=80y80" class="blur" />
          <div class="player-control">
            <Icon :size="24" type="open" color="white" />
          </div>
        </div>
        <div class="content">
          <div class="top">
            <p class="name">思念成疾</p>
            <p class="split">-</p>
            <p class="artists">作者</p>
          </div>
          <div class="time">
            <span class="played-time">00:00</span>
            <span class="split">/</span>
            <span class="total-time">02:46</span>
          </div>
        </div>
      </template>
    </div>
    <!-- 控制台 -->
    <div class="control">
      <Icon :size="24" class="icon" type="prev" />
      <el-popover
        :value="isPlayErrorPromptShow"
        placement="top"
        trigger="manual"
        width="160"
      >
        <p>请点击开始播放。</p>
        <div class="play-icon" slot="reference">
          <Icon :size="24" :type="playIcon"  @click="togglePlay"/>
        </div>
      </el-popover>

      <Icon :size="24" class="icon" type="next" />
    </div>
    <div class="mode">
      <el-popover placement="top" trigger="hover" width="160">
        <p>{{ playModeText }}</p>
        <Icon
          :size="20"
          :type="modeIcon"
          @click="onChangePlayMode"
          class="mode-item"
          slot="reference"
        />
      </el-popover>
      <!-- 播放列表 -->
      <el-popover
        placement="top"
        trigger="manual"
        width="160"
      >
        <p>已更新歌单</p>
        <Icon
          :size="20"
          @click="togglePlaylistShow"
          class="mode-item"
          slot="reference"
          type="playlist"
        />
      </el-popover>
      <!-- 音量 -->
      <div class="volume-item">
        <Volume :volume="volume" @volumeChange="onVolumeChange" />
      </div> 
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { playModeMap } from "@/utils"
import Storage from "good-storage"
const DEFAULT_VOLUME = 0.75
export default {
  data() {
    return {
      isPlayErrorPromptShow: false,
      songReady: false,
      volume: DEFAULT_VOLUME,
      playing:false,
      playMode:'sequence',
      hasCurrentSong:false
    }
  },
  mounted() {
  },
  methods:{
    togglePlay(){
      this.playing = !this.playing
    },
    togglePlaylistShow(){

    },
    onChangePlayMode(){ //改变播放模式
      const modeKeys = Object.keys(playModeMap)
      const currentModeIndex = modeKeys.findIndex(
        key => playModeMap[key].code === this.playMode
      )
      const nextIndex = (currentModeIndex + 1) % modeKeys.length
      const nextModeKey = modeKeys[nextIndex]
      const nextMode = playModeMap[nextModeKey]
      this.playMode = nextMode.code
    },
    onVolumeChange(percent) {
      Storage.set(percent)
    },
  },
  watch: {},
  computed: {
    playIcon(){
      return this.playing ? "pause" : "play"
    },
    currentMode() {
      return playModeMap[this.playMode]
    },
    modeIcon() {
      return this.currentMode.icon
    },
    playModeText() {
      return this.currentMode.name
    },
  },
  components: {  }
}
</script>

<style lang="scss" scoped>
.mini-player {
  position: relative;
  position: fixed;
  z-index: $mini-player-z-index;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  height: $mini-player-height;
  padding: 8px 16px;
  padding-right: 24px;
  background: var(--body-bgcolor);

  .song {
    display: flex;
    flex: 4;
    overflow: hidden;

    .img-wrap {
      position: relative;
      margin-right: 8px;
      border-radius: 6px;
      overflow: hidden;
      cursor: pointer;
      @include img-wrap(40px);

      img {
        &.blur {
          filter: blur(2px);
        }
      }

      .player-control {
        @include abs-center;
      }

      .mask {
        @include abs-stretch;
        background: rgba(0, 0, 0, 0.2);
      }
    }

    .content {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .top {
        display: flex;
        align-items: flex-end;
        white-space: nowrap;

        .name {
          color: var(--font-color-white);
          @include text-ellipsis;
        }

        .split {
          font-size: $font-size-xs;
          margin: 0 4px;
        }

        .artists {
          font-size: $font-size-xs;
          @include text-ellipsis;
        }
      }

      .time {
        font-size: $font-size-xs;
        color: var(--font-color-grey);

        .split {
          margin: 0 4px;
        }
      }
    }
  }

  .control {
    position: absolute;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    @include flex-center();

    .play-icon {
      @include flex-center();
      position: relative;
      width: 45px;
      height: 45px;
      margin: 0 16px;
      border-radius: 50%;
      background: $theme-color;
      cursor: pointer;

      i {
        color: #fff;
      }
      .icon-play {
        transform: translateX(1px);
      }
    }

    .icon {
      color: $theme-color;
    }
  }

  .mode {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 6;

    .mode-item {
      display: block;
      margin-right: 16px;
      width: 22px;
    }

    .volume-item {
    }
  }

  .progress-bar-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: -14px;
  }
}

.icon {
  color: var(--font-color);
  cursor: pointer;
}
</style>
