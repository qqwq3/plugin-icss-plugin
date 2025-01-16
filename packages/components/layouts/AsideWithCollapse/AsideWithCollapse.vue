<template>
  <div class="AsideWithCollapse">
    <el-container class="icss-page-box height-all">
      <template v-if="$scopedSlots.header">
        <el-header height="41px">
          <slot name="header" />
        </el-header>
        <el-container class="height-all-hidden">
          <template v-if="$scopedSlots.aside">
            <el-aside>
              <slot name="aside" />
            </el-aside>
          </template>
          <el-main>
            <slot name="main" />
          </el-main>
        </el-container>
      </template>
      <template v-else>
        <template v-if="$scopedSlots.aside">
          <el-aside>
            <slot name="aside" />
          </el-aside>
        </template>
        <el-main>
          <slot name="main" />
        </el-main>
      </template>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'AsideWithCollapse'
}
</script>

<style lang="scss" scoped>
  .AsideWithCollapse {
    height: 100%;
    padding: 16px;

    .el-main {
      height: 100%;
      padding: 16px;
      overflow: auto;
      min-width: 0;
    }

    .el-aside {
      padding: 16px;
      overflow: auto;
      position: relative;
      border-right: 1px solid var(--border-color-lighter);
    }

    .height-all-hidden {
      height: 100%;
      overflow: hidden;
    }
  }
</style>
