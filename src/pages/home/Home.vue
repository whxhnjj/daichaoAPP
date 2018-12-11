<template>
  <div>
    <HomeSwiper></HomeSwiper>
    <Bog></Bog>
    <HomeMail></HomeMail>
    <!--<Navfooter></Navfooter>-->
  </div>
</template>
<script>
import HomeSwiper from './components/swiper'
import Bog from './components/Bog'
import HomeMail from './components/main'
import Navfooter from '../Navfooter/Navfooter'
export default {
  name: 'Home',
  components: {
    HomeSwiper,
    Bog,
    HomeMail,
    Navfooter
  }
}
</script>
<style scoped>
</style>
