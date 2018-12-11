<template>
  <div>
    <BorrowMain></BorrowMain>
    <!--<Navfooter></Navfooter>-->
  </div>
</template>

<script>
import BorrowMain from './components/main'
import BorrowFooter from './components/footer'
import Navfooter from '../Navfooter/Navfooter'
export default {
  name: 'borrow',
  components: {
    Navfooter,
    BorrowMain,
    BorrowFooter
  }
}
</script>

<style lang="stylus" scoped>
  .borrow
    color #FFA219
</style>
