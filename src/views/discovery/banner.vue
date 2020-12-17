<template>
    <div class="music-banner">
        <el-carousel :interval="5000" type="card" class="banner-carousel">
            <el-carousel-item v-for="item in banners" :key="item.imageUrl">
                <img :src="$utils.genImgUrl(item.imageUrl, 1000, 400)" class="banner-img">
                <span class="type-title">{{item.typeTitle}}</span>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import { getBanner } from "@/api"
export default {
    async created(){
        // console.log(this)
        const { banners } = await getBanner()
        this.banners = banners
    },
    data(){
        return{
            banners: [],
        }
    }
}
</script>

<style lang="scss" scoped>
.banner-carousel {
  ::v-deep .el-carousel__container {
    height: 200px;
  }
  .banner-img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
  ::v-deep .el-carousel__button{
      width: 8px;
      height: 8px;
      border-radius: 50%;
  }
  ::v-deep .el-carousel__indicator{
      padding: 12px 6px;
  }
  .type-title{
      position: absolute;
      right: 0;
      bottom: 0;
      color: #fff;
      background: #d33a31;
      font-size: 12px;
      display: inline-block;
      padding: 4px 8px;
      border-top-left-radius: 4px;
      border-bottom-right-radius: 4px;
  }
}
</style>