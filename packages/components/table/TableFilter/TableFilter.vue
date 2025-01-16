<template>
  <div class="icss-table">
    <el-table ref="table" :data="noPagination?data:data.list" v-bind="tableAttrs" v-on="$listeners">
      <template v-if="$slots.default">
        <slot />
      </template>
      <template v-else>
        <el-table-column
          v-for="columnData in (ctrFilter ? tableColumnFilter : column)"
          :key="columnData.prop"
          :show-overflow-tooltip="false"
          v-bind="columnData"
        >
          <template v-if="columnData.columnHeaderSlot" v-slot:header="{ column:col, $index }">
            {{ columnData.columnHeaderSlot({col, $index}) }}
          </template>
          <template v-else-if="columnData.headerSlotName" v-slot:header="{ column:col, $index }">
            <slot :name="columnData.headerSlotName" :column="col" :$index="$index" />
          </template>
          <template v-if="columnData.columnSlot" v-slot:default="{ row, column:col, $index }">
            {{ columnData.columnSlot({row, col, $index}) | emptyColFilter(emptyCol) }}
          </template>
          <template v-else-if="columnData.slotName" v-slot:default="{ row, column:col, $index }">
            <slot :name="columnData.slotName" :row="row" :column="col" :$index="$index" />
          </template>
          <template v-else-if="columnData.showOverflowTooltip" v-slot:default="{ row }">
            <ToolTipWithEllipsis
              :content="row[columnData.prop]"
              v-bind="{ width: '600px', placement: 'top', ...columnData['toolTipCfg'] }"
            >
              <p class="text-ellipsis">{{ row[columnData.prop] | emptyColFilter(emptyCol) }}</p>
            </ToolTipWithEllipsis>
          </template>
          <template v-else-if="!['selection', 'index', 'expand'].includes(columnData.type)" v-slot:default="{ row }">
            {{ row[columnData.prop] | emptyColFilter(emptyCol) }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="ctrFilter && ctrColumn"
          v-bind="ctrColumn"
        >
          <template v-slot:header>
            {{ ctrColumn.label }}
            <el-popover
              width="200"
              trigger="click"
            >
              <div class="ctr-header">
                <el-input
                  v-model="ctrHeaderFilter"
                  style="margin-bottom: 10px;"
                  size="mini"
                  placeholder="输入关键词检索"
                />
                <el-checkbox-group
                  v-model="tableColumnSelect"
                  style="max-height: 300px;margin: 0 -12px;overflow-y: auto;overflow-x: hidden;"
                >
                  <el-checkbox
                    v-for="v in ctrHeaderList"
                    :key="v.prop"
                    :disabled="tableColumnFilter.length === 1 && tableColumnSelect.includes(v.prop)"
                    :label="v.prop"
                    style="display: block;line-height: 30px;margin-right: 0;padding: 0 12px;"
                  >{{ v.label }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
              <el-link slot="reference" :underline="false" style="line-height: 1"><i class="el-icon-setting" />
              </el-link>
            </el-popover>
          </template>
          <template v-if="ctrColumn.columnSlot" v-slot:default="{ row, column:col, $index }">
            {{ ctrColumn.columnSlot({row, col, $index}) }}
          </template>
          <template v-else-if="ctrColumn.slotName" v-slot:default="{ row, column:col, $index }">
            <slot :name="ctrColumn.slotName" :row="row" :column="col" :$index="$index" />
          </template>
        </el-table-column>
      </template>
      <template v-slot:append>
        <slot name="tableSlot" />
      </template>
    </el-table>
    <div class="el-table-foot">
      <div class="el-table-foot-slot">
        <el-checkbox
          v-if="selectionComponent"
          class="el-table-foot-check"
          :value="selectionComponent.value"
          :indeterminate="selectionComponent.indeterminate"
          v-bind="selectionComponent.$attrs"
          v-on="selectionComponent.$listeners"
        >全选
        </el-checkbox>
        <slot name="footBtn" />
      </div>
      <template v-if="$slots.pagination">
        <slot name="pagination" />
      </template>
      <el-pagination
        v-else-if="!noPagination"
        :current-page="pagination.current"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        v-bind="{...{
          pageSizes: [10, 20, 50, 100],
          layout: 'total, sizes, prev, pager, next, jumper'
        }, ...paginationConfig}"
        @size-change="(pageSize) => paginationChange({pageSize})"
        @current-change="(current) => paginationChange({current})"
        @prev-click="(current) => paginationChange({current})"
        @next-click="(current) => paginationChange({current})"
      />
    </div>
  </div>
</template>

<script>
// ---关于插槽
// default会默认作为el-table-column插入，不写则以 column 为准进行循环
// 如果使用 column 进行渲染，Table-column Scoped Slot将由columnSlot、columnHeaderSlot方法代替
// 或者传递 slotName，然后在table中用 v-slot:[slotName]="{row,column,$index}" 来代替内容
// 其他插槽：tableSlot 对应 el-table 的 append 插槽，pagination 插槽将直接替换分页组件
// 不需要分页时传递参数 :noPagination="true"，注意是布尔值需要用冒号

import _ from 'lodash'
import ToolTipWithEllipsis from '../../toolTip/ToolTipWithEllipsis'

export default {
  name: 'TableFilter',
  components: { ToolTipWithEllipsis },
  filters: {
    emptyColFilter: function(value, emptyCol) {
      return _.toString(value) || emptyCol
    }
  },
  props: {
    noPagination: Boolean,
    paginationConfig: {
      type: Object,
      default: () => ({})
    },
    data: {
      default: () => {
      },
      validator: (value) => value instanceof Object
    },
    column: {
      type: Array,
      default: () => []
    },
    emptyCol: {
      type: String,
      default: '--'
    },
    ctrFilter: Boolean
  },
  data() {
    return {
      tableAttrs: {},
      columnCopy: [],
      tableColumnSelect: [],
      ctrHeaderFilter: '',
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      selectionComponent: null
    }
  },
  computed: {
    ctrColumn() {
      return this.columnCopy.filter(v => v.slotName === 'ctrSlot')[0]
    },
    // 筛选过后的表头 加上 不参数筛选的表头（除去控制栏） 加上 特殊栏，组成最终显示的 column
    tableColumnFilter() {
      return this.columnCopy.filter(v => this.tableColumnSelect.includes(v.prop) || (v.noFilter && v.slotName !== 'ctrSlot') || ['selection', 'index', 'expand'].includes(v.type))
    },
    // 参与筛选的表头列表
    ctrHeaderList() {
      return this.columnCopy.filter(v => {
        return !v.noFilter &&
          !['selection', 'index', 'expand'].includes(v.type) &&
          (this.ctrHeaderFilter ? v.label.toLowerCase().indexOf(this.ctrHeaderFilter.toLowerCase()) > -1 : true)
      })
    }
  },
  watch: {
    data: {
      handler: function(data) {
        if (this.noPagination) return
        const { currentPage: current, pageSize, total } = data
        Object.assign(this.pagination, { current, pageSize, total })
      },
      immediate: true,
      deep: true
    },
    column: {
      handler: function(data) {
        this.columnCopy = data
        this.tableColumnSelect = data.filter(v => !v.noFilter && !v.hidden && !['selection', 'index', 'expand'].includes(v.type)).map(v => v.prop)
        this.ctrFilterFn()
        this.selectionFilterFn()
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      _.merge(this.tableAttrs, this.$attrs)
      if (this.noPagination) return
      const { currentPage: current, pageSize, total } = this.data
      Object.assign(this.pagination, { current, pageSize, total })
    },
    paginationChange({ current, pageSize, total }) {
      _.merge(this.pagination, { current, pageSize, total })
      this.debounce()
    },
    debounce: _.debounce(function() {
      this.$emit('paginationChange', this.pagination)
    }, 200),
    selectionFilterFn() {
      this.columnCopy.filter(v => v.type === 'selection')[0] && this.$nextTick(() => {
        this.selectionComponent = this.$refs['table'].$refs['tableHeader'].$children.filter(v => v.$options && v.$options['_componentTag'] === 'el-checkbox')[0]
      })
    },
    ctrFilterFn() {
      if (!this.ctrFilter) return
      if (!this.column.map(v => v.slotName).includes('ctrSlot')) {
        this.columnCopy = [...this.column, {
          label: '操作',
          width: 100,
          noFilter: true,
          slotName: 'ctrSlot'
        }]
      }
    }
  }
}
</script>
