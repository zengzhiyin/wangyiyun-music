<template>
  <div
    class="recommend"
    v-if="list.length"
  >
    <Title>推荐歌单</Title>
    <div class="list-wrap">
      <PlaylistCard
        :playCount="item.playCount"
        :id="item.id"
        :img="item.picUrl"
        :key="item.id"
        :name="item.name"
        v-for="item in list"
      />
    </div>
  </div>
</template>

<script>
import PlaylistCard from "@/components/playlist-card"
import { getPersonalized } from "@/api"
export default {
  components:{
    PlaylistCard
  },
  async created() {
    const { result } = await getPersonalized({ limit: 10 })
    this.list = result
  },
  data(){
    return {
      list:[]
    }
  }
}
</script>

<style lang="scss" scoped>
.list-wrap {
  margin: 0 -4px;
  display: flex;
  flex-wrap: wrap;
}
</style>