/*
 * @Author: your name
 * @Date: 2022-01-24 17:46:21
 * @LastEditTime: 2022-01-24 17:47:55
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \education-vue-front\nuxt.config.js
 */
module.exports = {
    plugins: [
      { src: '~/plugins/nuxt-swiper-plugin.js', ssr: false },
      { src: '~/plugins/nuxt-element-ui', ssr: true }
    ],
    css: [
      'swiper/dist/css/swiper.css',
      'element-ui/lib/theme-chalk/index.css'
    ],
    /*
    ** Headers of the page
    */
    /*
    ** Customize the progress bar color
    */
    loading: { color: '#3B8070' },
    /*
    ** Build configuration
    */
    build: {
      /*
      ** Run ESLint on save
      */
      extend (config, { isDev, isClient }) {
        if (isDev && isClient) {
          config.module.rules.push({
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/
          })
        }
      },
    }
  }