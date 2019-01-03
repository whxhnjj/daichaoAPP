<template>
  <div id="app">
    <router-view v-if="isrouteractive" v-wechat-title="$route.meta.title"/>
  </div>
</template>
<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isrouteractive: true
    }
  },
  methods: {
    // 刷新当前页面
    reload: function () {
      this.isrouteractive = false
      // 该方法会在dom更新后执行
      this.$nextTick(function () { this.isrouteractive = true })
    }
  }
}
</script>
<style>
</style>
