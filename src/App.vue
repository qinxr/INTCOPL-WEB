<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
			return {
				reload: this.reload
			}
		},
		data() {
			return {
				isRouterAlive: true
			}
		},
		methods: {
			reload() {
				this.isRouterAlive = false
				this.$nextTick(() => (this.isRouterAlive = true))
			}
		}
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}

html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
.ivu-table-cell{
		text-align: center;
		padding-left: 4px !important;
		padding-right: 4px !important;
	}
</style>
