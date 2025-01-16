<template>
  <div ref="selectTree" v-clickoutside="handleClose" class="SelectTree pst">
    <div class="input-box" @click="handleShow">
      <template v-if="type === 'checkbox'">
        <el-input
          autocomplete="off"
          readonly
          :placeholder="selectNodes.length ? '': placeholder"
          :suffix-icon="showTreeBox ? 'el-icon-arrow-up' : 'el-icon-arrow-down' "
          :validate-event="false"
          :disabled="disabled"
        />
        <div v-if="selectNodes.length" class="tags-box">
          <div class="tags-show-box">
            <el-tag
              size="small"
              type="info"
              :class="{ 'is-disabled' : disabled}"
              :closable="!disabled"
              @close="selectNodes.shift()"
            >
              {{ selectNodesShowText }}
            </el-tag>
            <el-tooltip v-if="selectNodes.length > 1" effect="dark" placement="right" :enterable="false">
              <div slot="content">
                <template v-for="(item,idx) in selectNodes">
                  <p v-if="idx !== 0" :key="item[nodeKey]">
                    {{ item.path || (treeMaps[item[nodeKey]] ? treeMaps[item[nodeKey]].path : '') }}
                  </p>
                </template>
              </div>
              <el-tag size="small" type="info" class="ml10">+{{ selectNodes.length - 1 }}</el-tag>
            </el-tooltip>
          </div>
        </div>
      </template>
      <template v-else>
        <el-input
          :value="selectNodesShowText"
          :validate-event="false"
          autocomplete="off"
          readonly
          :placeholder="placeholder"
          :disabled="disabled"
        >
          <i
            slot="suffix"
            class="el-input__icon"
            :class="showTreeBox ? 'el-icon-circle-close cp' : 'el-icon-arrow-down'"
            @click="handleClear"
          />
        </el-input>
      </template>
    </div>
    <transition name="el-zoom-in-top">
      <div v-show="showTreeBox" class="treeBox" :style="addStyle">
        <div class="treeSearchBox">
          <el-input
            v-model="filterText"
            class="icss-not-validator"
            placeholder="请输入搜索内容"
            suffix-icon="el-icon-search"
            :validate-event="false"
          />
        </div>
        <el-row class="treeShowBox dspf">
          <el-col
            :span="type === 'checkbox' && showCheckedBox ? 12 : 24"
            :class="{'pr8' : type === 'checkbox' && showCheckedBox}"
          >
            <p v-if="type === 'checkbox' && showCheckedBox" class="font14 lh36">可选：</p>
            <el-tree
              ref="treeBox"
              :data="filterData"
              :props="props"
              :highlight-current="true"
              :expand-on-click-node="false"
              :node-key="nodeKey"
              @node-click="handleNodeClick"
            >
              <div slot-scope="{ data }" class="custom-tree-node">
                <label v-if="!data[props.disabled] && type === 'checkbox'" class="el-checkbox">
                  <span
                    class="el-checkbox__input"
                    :class="{'is-checked':selectNodes.map(v=>v[nodeKey]).includes(data[nodeKey])}"
                  >
                    <span class="el-checkbox__inner" />
                  </span>
                </label>
                <label v-if="!data[props.disabled] && type === 'radio'" class="el-radio">
                  <span
                    class="el-radio__input"
                    :class="{'is-checked':selectNodes.map(v=>v[nodeKey]).includes(data[nodeKey])}"
                  >
                    <span class="el-radio__inner" />
                  </span>
                </label>
                <ToolTipWithEllipsis class="text" :content="data.path" placement="top" :enterable="false">
                  <p class="text-ellipsis" v-html="data[props.label]" />
                </ToolTipWithEllipsis>
              </div>
            </el-tree>
          </el-col>
          <el-col v-if="type === 'checkbox' && showCheckedBox" :span="12" class="pl8">
            <p class="font14 lh36">已选：</p>
            <el-tooltip
              v-for="(item,idx) in selectNodes"
              :key="item[nodeKey]"
              :content="item.path || (treeMaps[item[nodeKey]] ? treeMaps[item[nodeKey]].path : '')"
              :enterable="false"
              effect="dark"
              placement="left"
            >
              <el-tag size="small" type="info" closable @close="selectNodes.splice(idx, 1)">
                {{ item.path || (treeMaps[item[nodeKey]] ? treeMaps[item[nodeKey]].path : '') }}
              </el-tag>
            </el-tooltip>
          </el-col>
        </el-row>
      </div>
    </transition>
  </div>
</template>

<script>
import Clickoutside from 'element-ui/lib/utils/clickoutside'
import ToolTipWithEllipsis from '../../toolTip/ToolTipWithEllipsis'

export default {
  name: 'SelectTree',
  components: { ToolTipWithEllipsis },
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
    },
    // 弹窗固定位置
    isBottom: Boolean,
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    showCheckedBox: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 是否显示
      showTreeBox: false,
      // 显示树数据（层级）
      treeData: [],
      // 显示树数据（平级）
      treeList: [],
      // 显示树数据（key-item）
      treeMaps: {},
      // 选中数据
      selectNodes: [],
      // 筛选文字
      filterText: '',
      addStyle: ''
    }
  },
  computed: {
    selectNodesShowText() {
      return this.selectNodes.length ? (this.selectNodes[0].path ||
        (this.treeMaps[this.selectNodes[0][this.nodeKey]] ? this.treeMaps[this.selectNodes[0][this.nodeKey]].path : '')
      ) : ''
    },
    filterData() {
      return this.filterText.trim() ? this.treeList.filter(v => !v[this.props.disabled] && v[this.props.label].indexOf(this.filterText.trim()) !== -1).map(v => {
        const obj = {}
        obj[this.nodeKey] = v[this.nodeKey]
        obj[this.props.label] = v.path.replaceAll(this.filterText.trim(), '<b class="linkred">' + this.filterText.trim() + '</b>')
        obj['path'] = v.path
        return obj
      }) : this.treeData
    }
  },
  watch: {
    initData(value) {
      this.treeData = value
      this.treeMaps = this.mapData(this.treeData)
      this.treeList = []
      for (const key in this.treeMaps) {
        this.treeList.push(this.treeMaps[key])
      }
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
    this.treeList = []
    for (const key in this.treeMaps) {
      this.treeList.push(this.treeMaps[key])
    }
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
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      const target = _this.$refs.selectTree
      if (!this.isBottom && window.innerHeight - target.getBoundingClientRect().y - target.getBoundingClientRect().height < 350) {
        _this.addStyle = 'transform: translateY(-100%);top: -13px;'
      }
    })
  },
  methods: {
    handleClose() {
      this.showTreeBox = false
    },
    handleShow() {
      this.showTreeBox = !this.disabled
    },
    handleNodeClick(data) {
      if (data[this.props.disabled]) return
      if (this.type === 'checkbox') {
        if (this.selectNodes.filter(item => item[this.nodeKey] === data[this.nodeKey]).length === 0) {
          this.selectNodes.push(this.treeMaps[data[this.nodeKey]])
        } else {
          this.selectNodes = this.selectNodes.filter(item => item[this.nodeKey] !== data[this.nodeKey])
        }
      } else {
        this.selectNodes = [this.treeMaps[data[this.nodeKey]]]
        this.showTreeBox = false
      }
    },
    handleClear() {
      if (this.showTreeBox) {
        this.selectNodes = []
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
  .SelectTree {
    .input-box {
      position: relative;
      overflow: hidden;

      ::v-deep input {
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .tags-box {
        position: absolute;
        width: 100%;
        height: 100%;
        padding-right: 30px;
        z-index: 1;
        top: 50%;
        transform: translateY(-50%);
        line-height: normal;
        white-space: normal;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding-left: 12px;

        .tags-show-box {
          width: 100%;
          padding-top: 3px;

          ::v-deep .el-tag {
            max-width: calc(100% - 50px);
            position: relative;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: break-word;
            word-break: break-all;

            &:first-child {
              padding-right: 24px;

              &.is-disabled {
                padding-right: 8px;
              }
            }

            .el-tag__close {
              position: absolute;
              right: 3px;
              top: 3px;
            }
          }
        }
      }
    }

    .treeBox {
      position: absolute;
      width: 100%;
      box-shadow: var(--box-shadow-base);
      margin-top: 6px;
      padding: 52px 10px 10px;
      border-radius: 4px;
      background-color: #FFFFFF;
      z-index: 11;

      .treeSearchBox {
        position: absolute;
        top: 10px;
        left: 0;
        z-index: 1;
        width: 100%;
        padding: 0 10px;
      }

      .treeShowBox {
        ::v-deep .el-tree {
          max-height: 215px;
          overflow: auto;

          .el-tree-node {
            color: var(--color-text-primary);
            font-size: var(--font-size-base);
            position: relative;
            padding-left: 12px;

            &__content {
              padding-left: 0 !important;
              height: 32px;
            }

            &__children {
              padding-left: 10px;
            }

            &__expand-icon {
              margin-left: -6px;
              font-size: 16px;
            }

            &__expand-icon.is-leaf {
              color: transparent;
              padding: 14px;

              &:before {
                content: "";
                height: 1px;
                width: 14px;
                position: absolute;
                border-top: 1px dashed var(--border-color-light);
                top: 14px;
                left: 7px;
              }
            }

            &:before {
              content: "";
              height: 100%;
              width: 1px;
              position: absolute;
              left: -3px;
              top: -2px;
              border-width: 1px;
              border-left: 1px dashed var(--border-color-light);
            }

            &:last-child:before {
              height: 19px;
            }

            &:after {
              content: "";
              width: 14px;
              height: 20px;
              position: absolute;
              left: -3px;
              top: 16px;
              border-width: 1px;
              border-top: 1px dashed var(--border-color-light);
            }
          }

          & > .el-tree-node {
            padding-left: 0;

            &:nth-last-child(2) {
              &:before {
                height: 19px;
              }
            }

            > .el-tree-node__content > .is-leaf {
              &:before {
                display: none;
              }
            }

            &:before {
              display: none;
            }

            &:after {
              display: none;
            }
          }
        }

        .el-col:nth-child(2) {
          border-left: 1px solid var(--border-color-base);
          max-height: 251px;
          overflow: auto;

          .el-tag {
            margin-bottom: 12px;
            display: table;
          }

          .el-tag:last-child {
            margin-bottom: 0;
          }
        }

        ::v-deep .custom-tree-node {
          width: 0;
          flex: 1;
          display: flex;
          align-items: center;
          font-size: var(--font-size-base);
          padding-right: 8px;

          label {
            flex: none;
          }

          .text {
            flex: 1;
            width: 0;
          }
        }

        ::v-deep .el-tree-node__content {
          height: 32px;
          line-height: 32px;
        }

        ::v-deep .el-radio, ::v-deep .el-checkbox {
          margin-right: 8px;
        }
      }
    }

    ::v-deep .el-tag {
      background: var(--background-color-base);
      color: var(--color-text-regular);
      border-radius: 4px;
      font-size: var(--font-size-base);

      .el-tag__close {
        background-color: var(--color-text-placeholder);
        color: #ffffff;
        top: -2px;
        flex-shrink: 0;
        padding-top: 1px;
      }
    }

    ::v-deep .linkred {
      color: var(--color-danger);
    }
  }
</style>
