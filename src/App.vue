<template>
  <div id="app">
    <Layout />
    <!-- <Playlist /> -->
    <MiniPlayer />
  </div>
</template>
<script>
  import Layout from "@/layout"
  // import Playlist from "@/components/playlist"
  import MiniPlayer from "@/components/mini-player"
	export default {
    components: { Layout,MiniPlayer }
  }
</script>
<style lang="scss">
#app {
  height: 100%;
  background-color: var(--body-bgcolor);
  font-size: $font-size;
}
</style>
