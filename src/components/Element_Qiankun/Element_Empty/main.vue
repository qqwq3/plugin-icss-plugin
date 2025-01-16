<template>
  <div class="el-empty">
    <div class="el-empty__image" :style="imageStyle">
      <img v-if="image" :src="image" ondragstart="return false">
      <slot v-else name="image">
        <img-empty />
      </slot>
    </div>
    <div class="el-empty__description">
      <slot v-if="$slots.description" name="description" />
      <p v-else>{{ emptyDescription }}</p>
    </div>
    <div v-if="$slots.default" class="el-empty__bottom">
      <slot />
    </div>
  </div>
</template>

<script>
import ImgEmpty from './img-empty.vue'
import { t } from 'element-ui/lib/locale'

export default {
  name: 'ElEmpty',
  components: {
    [ImgEmpty.name]: ImgEmpty
  },
  props: {
    image: {
      type: String,
      default: ''
    },
    // eslint-disable-next-line vue/require-default-prop
    imageSize: Number,
    description: {
      type: String,
      default: ''
    }
  },
  computed: {
    emptyDescription() {
      return this.description || t('el.empty.description')
    },
    imageStyle() {
      return {
        width: this.imageSize ? `${this.imageSize}px` : ''
      }
    }
  }
}
</script>
