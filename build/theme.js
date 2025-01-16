var fs = require('fs')
var path = require('path')

const filePath = path.join(__dirname, '../src/comStyles/theme/config/')
const fileArr = fs.readdirSync(filePath)

fileArr.forEach(v => {
  const fileName = v.replace('.scss', '')
  // 生成 css 全局变量
  fs.writeFileSync(
    path.join(__dirname, '../src/comStyles/theme/') + fileName + '.lazy.scss',
    `@import "./config/${v}";
@import "./element-variables.scss";

:root {
  --color-primary: #{$--color-primary};
  --color-success: #{$--color-success};
  --color-warning: #{$--color-warning};
  --color-danger: #{$--color-danger};
  --color-info: #{$--color-info};

  --color-success-light: #{$--color-success-light};
  --color-warning-light: #{$--color-warning-light};
  --color-danger-light: #{$--color-danger-light};
  --color-info-light: #{$--color-info-light};

  --color-success-lighter: #{$--color-success-lighter};
  --color-warning-lighter: #{$--color-warning-lighter};
  --color-danger-lighter: #{$--color-danger-lighter};
  --color-info-lighter: #{$--color-info-lighter};

  --color-primary-light-1: #{$--color-primary-light-1};
  --color-primary-light-2: #{$--color-primary-light-2};
  --color-primary-light-3: #{$--color-primary-light-3};
  --color-primary-light-4: #{$--color-primary-light-4};
  --color-primary-light-5: #{$--color-primary-light-5};
  --color-primary-light-6: #{$--color-primary-light-6};
  --color-primary-light-7: #{$--color-primary-light-7};
  --color-primary-light-8: #{$--color-primary-light-8};
  --color-primary-light-9: #{$--color-primary-light-9};

  --color-text-primary: #{$--color-text-primary};
  --color-text-regular: #{$--color-text-regular};
  --color-text-secondary: #{$--color-text-secondary};
  --color-text-placeholder: #{$--color-text-placeholder};

  --border-color-base: #{$--border-color-base};
  --border-color-light: #{$--border-color-light};
  --border-color-lighter: #{$--border-color-lighter};
  --border-color-extra-light: #{$--border-color-extra-light};

  --background-color-base: #{$--background-color-base};
  --background-color-light: #{$--background-color-light};
  --background-color-lighter: #{$--background-color-lighter};

  --font-size-base: #{$--font-size-base};
  --box-shadow-base: #{$--box-shadow-base};
  --slider-button-hover-color: #{$--slider-button-hover-color};

  //自定义变量
  --color-primary-hover: #{$--color-primary-hover};
  --color-success-hover: #{$--color-success-hover};
  --color-warning-hover: #{$--color-warning-hover};
  --color-danger-hover: #{$--color-danger-hover};

  --color-primary-active: #{$--color-primary-active};
  --color-success-active: #{$--color-success-active};
  --color-warning-active: #{$--color-warning-active};
  --color-danger-active: #{$--color-danger-active};

  --color-success-special: #{$--color-success-special};
  --color-warning-special: #{$--color-warning-special};
  --color-danger-special: #{$--color-danger-special};

  --color-primary-rgb: #{$--color-primary-rgb};
}
    `
  )

  // 生成 element 皮肤样式
  fs.writeFileSync(
    path.join(__dirname, '../src/comStyles/theme/element-') + fileName + '.lazy.scss',
    `@import "./config/${v}";

$--font-path: '~element-ui/lib/theme-chalk/fonts';

@import "~element-ui/packages/theme-chalk/src/index";

    `
  )
})

