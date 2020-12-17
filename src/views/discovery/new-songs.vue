<template>
  <div
    class="new-songs"
    v-if="list.length"
  >
    <Title>推荐歌单</Title>
    <div class="list-wrap">
      <div v-for="(list,listIndex) in thunkedList" :key="listIndex" class="list">
          <SongCard 
          :key="item.id"
          :order="getSongOrder(listIndex, index)"
          class="song-card"
          v-bind="nomalizeSong(item)"
          v-for="(item,index) in list"
          />
      </div>
    </div>
  </div>
</template>

<script>
import { getNewSongs } from "@/api"
import SongCard from "@/components/song-card"
import { createSong } from "@/utils"
export default {
  components:{
    SongCard
  },
  async created(){
    const { result } = await getNewSongs()
    this.halfLimit = Math.ceil(result.length / 2)
    this.list = result
  },
  data(){
    return {
      halfLimit:5,
      list:[]
    }
  },
  methods:{
    getSongOrder(listIndex, index) {
      return listIndex * this.halfLimit + index + 1
    },
    nomalizeSong(song) {
      const {
        id,
        name,
        song: {
          mvid,
          artists,
          album: { blurPicUrl },
          duration
        }
      } = song
      return createSong({
        id,
        name,
        img: blurPicUrl,
        artists,
        duration,
        mvId: mvid
      })
    },
  },
  computed:{
    thunkedList(){
      return [
        this.list.slice(0, this.halfLimit),
        this.list.slice(this.halfLimit, this.list.length)
      ] 
    }
  }
}
</script>

<style lang="scss" scoped>
.new-songs {
  margin-bottom: 36px;
  .list-wrap {
    display: flex;
    .list {
      flex: 1;
      overflow: hidden;
      padding: 0 8px;
    }
  }
}
</style>