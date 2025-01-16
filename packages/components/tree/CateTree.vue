<template>
  <el-tree
    ref="cateTree"
    class="icss-cate-tree-box"
    :lazy="true"
    :props="props"
    :load="loadNode"
    accordion
    @node-click="handleNodeClick"
  />
</template>

<script>
export default {
  name: 'CateTree',
  data() {
    return {
      props: {
        label: 'name',
        isLeaf: 'isLeaf'
      },
      // 选中节点
      selected: null
    }
  },
  methods: {
    // 加载节点数据
    loadNode(node, resolve) {
      const _this = this
      const nodeId = node.level === 0 ? '' : node.id
      _this.$emit('loadNode', nodeId, (res) => {
        return resolve(res)
      })
    },
    // 点击节点
    handleNodeClick(node) {
      this.selected = node
      this.$emit('handleNodeClick', node)
    },
    // 回到顶部
    goTop() {
      this.$refs.cateTree.scrollIntoView()
    }
  }
}
</script>

<style scoped>

</style>
