<template>
  <div>
    <RecommendMain></RecommendMain>
    <!--<Navfooter></Navfooter>-->
  </div>
</template>

<script>
import RecommendMain from './components/main'
import Navfooter from '../Navfooter/Navfooter'
export default {
  name: 'Recommend',
  components: {
    RecommendMain,
    Navfooter
  }
}
</script>

<style lang="stylus" scoped>
  .tuijian
    color #FFA219
</style>
