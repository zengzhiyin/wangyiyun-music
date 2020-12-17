<template>
  <div
    class="new-mvs"
    v-if="mvs.length"
  >
    <Title>推荐MV</Title>
    <div class="list-wrap">
      <div class="list-item" v-for="mv in mvs" :key="mv.id">
        <MvCard 
          :author="mv.artistName"
          :id="mv.id"
          :img="mv.picUrl"
          :name="mv.name"
          :playCount="mv.playCount"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getPersonalizedMv } from "@/api"
import MvCard from "@/components/mv-card"
export default {
  components:{
    MvCard
  },
  async created(){
    const { result } = await getPersonalizedMv()
    this.mvs = result
  },
  data(){
    return {
      mvs:[]
    }
  },
  methods:{
  },
  computed:{
  }
}
</script>

<style lang="scss" scoped>
.new-mvs {
  @include list(25%);
}
</style>