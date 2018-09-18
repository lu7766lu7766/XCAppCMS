import Vue from 'vue'
import VueI18n from 'vue-i18n'
import twLang from './tw'
// import cnLang from './cn'
// import enLang from './en'

Vue.use(VueI18n)

const locale = 'tw'

const messages = {
  tw: twLang,
  // cn: cnLang,
  // en: enLang
}

const i18n = new VueI18n({
  /** 默认值 */
  locale,
  messages
})

export default i18n