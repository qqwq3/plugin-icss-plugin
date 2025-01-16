<template>
  <div class="tree">
    <div v-if="searchFlag" class="tree-search">
      <el-input
        v-model="filterText"
        :placeholder="placeholder"
        suffix-icon="el-icon-search"
        clearable
        size="small"
      />
    </div>
    <div class="tree-scroll" :style="{ height: !searchFlag ? '100%' : 'calc(100% - 48px)' }">
      <div class="tree-top el-tree-node is-expanded is-focusable" :class="{ 'is-current' : !selected }">
        <div class="el-tree-node__content" @click="handleRootNode">
          <span class="menu-tree-icon" />
          <span class="font14 text-ellipsis">{{ rootName }}</span>
        </div>
        <el-link v-if="addFn" type="primary" :underline="false" class="pl8" style="flex: none;" @click="addFn">添加
        </el-link>
      </div>
      <el-tree
        ref="tree"
        :data="data"
        :props="props"
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <template v-if="$scopedSlots.default" v-slot:default="{ node, data:slotData }">
          <slot :node="node" :data="slotData" :filterText="filterText" />
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuTree',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    searchFlag: {
      type: Boolean,
      default: true
    },
    addFn: Function,
    rootName: {
      type: String,
      default: '根节点'
    },
    selected: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    },
    props: {
      type: Object,
      default() {
        return {
          label: 'label',
          children: 'children',
          disabled: 'disabled',
          isLeaf: 'isLeaf'
        }
      }
    }
  },
  data() {
    return {
      filterText: ''
    }
  },
  watch: {
    filterText(val) {
      this.mapHighTree(this.data, val)
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    handleRootNode() {
      this.$emit('node-click', '')
    },
    filterNode(value, data) {
      if (!value) return true
      return (data[this.props.label] || '').toUpperCase().indexOf(value.toUpperCase()) !== -1
    },
    setCurrentKey(keys) {
      this.$refs.tree.setCurrentKey(keys)
    },
    mapHighTree(list, text) {
      if (!text.trim()) {
        return
      }
      const _this = this
      list.forEach(item => {
        item[_this.props.label + '_high'] = item[_this.props.label].replaceAll(text.trim(), '<b class="linkred">' + text.trim() + '</b>')
        _this.mapHighTree(item[_this.props.children] || [], text)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .tree {
    height: 100%;

    &-search {
      margin-bottom: 8px;
    }

    &-scroll {
      width: 100%;
      height: calc(100% - 40px);
      overflow-y: auto;
    }

    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .el-tree-node__content {
        padding-left: 0;
        height: 32px;
        flex: 1;
        width: 0;

        .menu-tree-icon {
          display: inline-block;
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAilBMVEUAAACez/CSzO0Eb66SzO2o4P8DcbCV1P+MyOtyuOCSzO6Sze+Qy+6Gw+iSzO6SzO4EcK8EcbCRy+6Sy+5wt9+SzO1pstxUotKRzO2RzO6RzO0OebWSzO4Eca5krttnsttisNmUze8Ec7EEcLKRy+0Db64Jc7H////z+f33+/3t9vy02/Kt2PF2ueFA+GYyAAAAJHRSTlMAEPR+5QiaDP3n4X78/LuUiTntzsrHtrCupZyNiIh4al5RRUK/KWVhAAAAuElEQVQ4y83Q2Q7CIBRFUbHWztY6z+PF1un/f8+bkxaNQHkznjeyV0Kg86slKWFpbgEjauabQVeBgE/FqR0Mpey3Ae4s7GArsb4NrJEhzOAilXABeXaBwgE8xxXoVoBuB+hCCN8C0DfES4wAPcchNgH0FWE9BcJP4PlL0sGjqu4A3BekgYxuZXklHvcB6SBqwNMLuOtg31wxF1PSAW9G2ESM69Y8U+0QZWG0O8Yq1h/1NfEevvpP9gIDWzu3Kt6PEAAAAABJRU5ErkJggg==");
          background-size: cover;
          background-repeat: no-repeat;
          margin: 6px;
          width: 18px;
          height: 16px;
          flex: none;
        }
      }
    }

    ::v-deep .el-tree {
      padding-left: 17px;

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

        &.is-current > .el-tree-node__content {
          color: var(--color-primary);
          font-weight: 700;
        }
      }

      & > .el-tree-node {
        &:nth-last-child(2) {
          &:before {
            height: 19px;
          }
        }
      }
    }

    .el-tree-node.is-current > .el-tree-node__content {
      color: var(--color-primary);
      font-weight: 700;
    }

    ::v-deep .linkred {
      color: var(--color-danger);
    }
  }
</style>
