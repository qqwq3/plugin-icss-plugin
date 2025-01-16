<template>
  <div v-clickoutside="handleClose" class="SelectButtonTree pst">
    <div class="head-btn dspib vt">
      <el-button type="primary" class="input-box vt" plain @click.native="handleShow">
        <slot name="buttonText">选择</slot>
      </el-button>
    </div>
    <div class="ml16 font14 lh32 dspib vt" style="white-space:pre-line">{{ selectNodesShowText }}</div>
    <transition name="el-zoom-in-top">
      <div v-show="showTreeBox" class="treeBox">
        <div class="treeShowBox">
          <el-tree
            ref="treeBox"
            :data="treeData"
            :props="props"
            :highlight-current="true"
            :expand-on-click-node="false"
            :node-key="nodeKey"
            @node-click="handleNodeClick"
          >
            <div slot-scope="{ data }" class="custom-tree-node">
              <div>
                <label v-if="type === 'checkbox'" class="el-checkbox">
                  <span
                    class="el-checkbox__input"
                    :class="{'is-checked': selectNodes.map(v=>v[nodeKey]).includes(data[nodeKey])}"
                  >
                    <span class="el-checkbox__inner" />
                  </span>
                </label>
                <label v-else class="el-radio">
                  <span
                    class="el-radio__input"
                    :class="{'is-checked':selectNodes.map(v=>v[nodeKey]).includes(data[nodeKey])}"
                  >
                    <span class="el-radio__inner" />
                  </span>
                </label>
                <el-tooltip effect="dark" :content="data.path" placement="left" :enterable="false">
                  <span class="ml8" v-html="data[props.label]" />
                </el-tooltip>
              </div>
            </div>
          </el-tree>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Clickoutside from 'element-ui/lib/utils/clickoutside'

export default {
  name: 'SelectButtonTree',
  directives: { Clickoutside },
  model: {
    prop: 'selected', // 指向props的参数名
    event: 'change' // 事件名称
  },
  props: {
    // 数据源
    initData: {
      type: Array,
      required: true
    },
    // 复选(checkbox)、单选(radio)
    type: {
      type: String,
      required: true
    },
    // 选中节点
    selected: {
      default: () => {
      },
      validator: (value) => value instanceof Object
    },
    // el-tree 组件参数
    nodeKey: {
      type: String,
      default() {
        return 'id'
      }
    },
    // el-tree 组件参数
    props: {
      type: Object,
      default() {
        return {
          label: 'name',
          children: 'children',
          disabled: 'disabled',
          isLeaf: 'isLeaf'
        }
      }
    }
  },
  data() {
    return {
      // 是否显示
      showTreeBox: false,
      // 显示树数据（层级）
      treeData: [],
      // 显示树数据（id-name）
      treeMaps: {},
      // 选中数据
      selectNodes: []
    }
  },
  computed: {
    selectNodesShowText() {
      return this.selectNodes.map(item => {
        return this.treeMaps[item[this.nodeKey]].path || ''
      }).join('\n')
    }
  },
  watch: {
    initData(value) {
      this.treeData = value
      this.treeMaps = this.mapData(this.treeData)
    },
    // 监听值变化，再赋值给selected
    selectNodes(value) {
      if (this.type === 'checkbox') {
        this.$emit('change', value)
      } else {
        this.$emit('change', value.length ? value[0] : null)
      }
    },
    // 监听值变化，再赋值给selectNodes
    selected(value) {
      if (this.type === 'checkbox') {
        this.selectNodes = value
      } else {
        this.selectNodes = value ? [value] : []
        value && this.$refs.treeBox.setCurrentKey(value[this.nodeKey])
      }
    }
  },
  created() {
    this.treeData = this.initData
    this.treeMaps = this.mapData(this.treeData)
    if (this.selected) {
      if (this.type === 'checkbox') {
        this.selectNodes = this.selected
      } else {
        this.selectNodes = [this.selected]
        this.$nextTick(() => {
          this.$refs.treeBox.setCurrentKey(this.selected[this.nodeKey])
        })
      }
    }
  },
  methods: {
    handleClose() {
      this.showTreeBox = false
    },
    handleShow() {
      this.showTreeBox = true
    },
    handleNodeClick(data) {
      if (this.type === 'checkbox') {
        if (this.selectNodes.filter(item => item[this.nodeKey] === data[this.nodeKey]).length === 0) {
          this.selectNodes.push(data)
        } else {
          this.selectNodes = this.selectNodes.filter(item => item[this.nodeKey] !== data[this.nodeKey])
        }
      } else {
        this.selectNodes = [data]
        this.showTreeBox = false
      }
    },
    mapData(list = [], name = '', dataMap = {}) {
      const _this = this
      list.forEach(item => {
        item['path'] = name + item[_this.props.label]
        dataMap[item[_this.nodeKey]] = item
        _this.mapData(item[_this.props.children] || [], item['path'] + '/', dataMap)
      })
      return dataMap
    }
  }
}
</script>

<style lang="scss" scoped>
  .input-box {
    ::v-deep input {
      cursor: pointer;
    }
  }

  .treeBox {
    position: absolute;
    width: 100%;
    box-shadow: var(--box-shadow-base);
    top: 38px;
    margin-top: 0;
    padding: 10px;
    border-radius: 4px;
    background-color: #FFFFFF;
    z-index: 11;

    .treeShowBox {

      .el-tree {
        max-height: 215px;
        overflow: auto;
      }

      ::v-deep .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: var(--font-size-base);
        padding-right: 8px;

        &.selected {
          color: var(--color-primary);

          &:after {
            font-family: element-icons;
            content: "\e6da";
          }
        }

        .el-button.is-circle {
          padding: 0;
        }
      }

      ::v-deep .el-tree-node__content {
        height: 32px;
        line-height: 32px;
      }

      ::v-deep .el-radio {
        margin-right: 0;
      }
    }
  }
</style>
