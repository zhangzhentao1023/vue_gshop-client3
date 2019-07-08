<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-if="$route.meta.isShowFooter"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
export default {
  name: 'App',
  data () {
    return {
      msg: 'App component'
    }
  },
   async mounted () {
      // 分发actoin, 从后台获取数据到state中

      this.$store.dispatch('getAddress')
    },
  components: {
    FooterGuide
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#app
  width 100%
  height 100%
  background #f5f5f5
  position relative
</style>
