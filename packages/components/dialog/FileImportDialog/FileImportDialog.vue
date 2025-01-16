<template>
  <el-dialog
    width="440px"
    class="FileImportDialog"
    :title="title ? title: '导入'"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :before-close="handleCancel"
  >
    <template v-if="$slots.warning">
      <el-alert type="warning" class="mb16">
        <slot name="warning" />
      </el-alert>
    </template>

    <el-form ref="ruleForm" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="文件上传" prop="file" style="margin-bottom: 0">
        <el-upload
          action=""
          :accept="accept"
          :http-request="(params)=>{ form.file = params.file }"
          :multiple="false"
          :show-file-list="false"
        >
          <el-button type="primary" plain>上传本地文件</el-button>
          <div v-if="onDownFile" slot="tip" class="el-upload__tip">
            <el-button
              v-prevent-duplicate-click
              type="text"
              @click="onDownFile((file, fileName)=>{ handleDownFile(file, fileName) })"
            >
              下载样例文件
            </el-button>
          </div>
        </el-upload>
        <p v-if="form.file">
          {{ form.file['name'] }}
          <i class="el-icon-circle-check" style="color: var(--color-success)" />
        </p>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-button
        type="primary"
        size="small"
        :loading="loading"
        :disabled="loading"
        @click="handleSubmit"
      >确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'FileImportDialog',
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
    // 文件类型
    accept: {
      type: String,
      default() {
        return ''
      }
    },
    // 下载样例
    // eslint-disable-next-line vue/require-default-prop
    onDownFile: Function,
    // 上传文件
    onUploadFile: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      // 页面状态
      loading: false,
      // 表单数据
      form: {
        // 文件
        file: ''
      },
      // 表单检验
      rules: {
        file: [
          { required: true, message: '请选择文件', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 提交
    handleSubmit() {
      const _this = this
      if (!_this.loading && _this.onUploadFile) {
        _this.loading = true
        _this.$refs.ruleForm.validate(valid => {
          if (valid) {
            // 上传文件
            _this.onUploadFile(_this.form['file'], (rst) => {
              _this.loading = false
              if (rst) {
                _this.$message.success('操作成功')
                _this.handleCancel() // 关闭窗口
              }
            })
          } else {
            _this.loading = false
          }
        })
      } else {
        return false
      }
    },
    // 取消
    handleCancel() {
      this.$emit('update:visible', false)
    },
    // 下载样例
    handleDownFile(file, fileName) {
      const blob = new Blob([file])
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = fileName
      link.click()
      URL.revokeObjectURL(link.href)
    }
  }
}
</script>

<style lang="scss" scoped>
  .FileImportDialog {
    .mb16 {
      margin-bottom: 16px;
    }

    ::v-deep .el-alert--warning.is-light {
      background: var(--background-color-base);

      .el-alert__description {
        color: var(--color-text-primary);
      }
    }

    ::v-deep .el-upload__tip {
      display: inline-block;
      margin-left: 16px;
      margin-top: 0;
    }
  }
</style>
