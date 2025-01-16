<template>
  <el-progress :percentage="percentage" :color="color" v-bind="$attrs" />
</template>

<script>
export default {
  name: 'Progress',
  props: {
    color: {
      type: [String, Array, Function],
      default: () => [
        { color: '#FA865E', percentage: 40 },
        { color: '#3B96FC', percentage: 60 },
        { color: '#00BABF', percentage: 80 },
        { color: '#00BF73', percentage: 100 }
      ]
    },
    percentage: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>
