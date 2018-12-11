<template>
  <div>
    <MyHeader></MyHeader>
    <MyMain></MyMain>
    <!--<Navfooter></Navfooter>-->
  </div>
</template>

<script>
import MyHeader from './components/header'
import Navfooter from '../Navfooter/Navfooter'
import MyMain from './components/main'
export default {
  name: 'My',
  components: {
    MyHeader,
    MyMain,
    Navfooter
  }
}
</script>

<style scoped></style>
