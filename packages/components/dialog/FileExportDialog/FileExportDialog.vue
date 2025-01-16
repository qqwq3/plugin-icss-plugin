<template>
  <el-dialog
    width="440px"
    class="FileExportDialog pb2"
    :title="title ? title: '导出'"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :before-close="handleCancel"
  >
    <el-form ref="ruleForm" v-loading="loading" size="small" label-width="80px">
      <el-form-item label="导出行数">
        <el-input-number
          v-model="size"
          type="number"
          controls-position="right"
          autocomplete="off"
          style="width: 100%;"
          placeholder="请输入行数，默认则全部导出"
          maxlength="8"
          :max="99999999"
          :min="1"
        />
      </el-form-item>
      <el-form-item label="导出列字段" class="lh52">
        <div class="detail-content">
          <el-tag v-for="tag in fields" :key="tag.code" effect="plain" type="info" closable @close="handleClose(tag)">
            {{ tag.name }}
          </el-tag>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-button type="primary" size="small" @click="handleSubmit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'FileExportDialog',
  props: {
    // 标题
    title: {
      type: String,
      default() {
        return ''
      }
    },
    // 是否显示
    visible: {
      type: Boolean,
      default() {
        return false
      }
    },
    // 导出字段
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    // 导出
    // eslint-disable-next-line vue/require-default-prop
    onDownFile: Function
  },
  data() {
    return {
      // 页面状态
      loading: false,
      // 行数
      size: undefined,
      // 导出字段
      fields: []
    }
  },
  created() {
    this.fields = [...this.columns]
  },
  methods: {
    // 删除字段
    handleClose(item) {
      this.fields = this.fields.filter(v => v !== item)
    },
    // 提交
    handleSubmit() {
      const _this = this
      if (!_this.loading && _this.onDownFile) {
        _this.loading = true
        _this.onDownFile({
          size: _this.size,
          fields: _this.fields.length ? _this.fields : _this.columns
        }, (file, fileName) => {
          const blob = new Blob([file])
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = fileName
          link.click()
          URL.revokeObjectURL(link.href)
          _this.loading = false
          _this.handleCancel() // 关闭窗口
        })
      }
    },
    // 取消
    handleCancel() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
  .FileExportDialog {
    ::v-deep .lh52 .el-form-item__label {
      line-height: 52px !important;
    }

    .detail-content {
      width: 100%;
      min-height: 52px;
      padding: 0 10px 10px;
      background: var(--background-color-base);
      border-radius: 4px;

      ::v-deep .el-tag {
        margin-top: 10px;
        margin-right: 10px;
      }
    }
  }
</style>
