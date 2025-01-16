import Vue from 'vue'
import { Container, Header, Aside, Main } from 'element-ui'

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)

import AsideWithCollapse from './AsideWithCollapse.vue'
// global css
import '@/comStyles/global.scss'

export default {
  title: 'Components/layouts/AsideWithCollapse',
  component: AsideWithCollapse,
  argTypes: {
    header: {
      name: 'header',
      description: '头部面板',
      control: '-',
      table: {
        type: { summary: ['html'] }
      }
    },
    aside: {
      name: 'aside',
      description: '左侧面板',
      control: '-',
      table: {
        type: { summary: ['html'] }
      }
    },
    main: {
      name: 'main',
      description: '主面板',
      control: '-',
      table: {
        type: { summary: ['html'] }
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { AsideWithCollapse },
  props: Object.keys(argTypes),
  template: `
    <aside-with-collapse style="height: 300px;">
      <template v-slot:main>
      </template>
    </aside-with-collapse>
  `
})

export const Default = Template.bind({})
Default.args = {}

const AsideTemplate = (args, { argTypes }) => ({
  components: { AsideWithCollapse },
  props: Object.keys(argTypes),
  template: `
    <aside-with-collapse style="height: 300px;">
      <template v-slot:aside>
      </template>
      <template v-slot:main>
      </template>
    </aside-with-collapse>
  `
})

export const AsideLayout = AsideTemplate.bind({})
AsideLayout.args = {}
