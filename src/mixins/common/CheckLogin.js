import { mapGetters } from 'vuex'
import { LoginType } from 'module/login'

export default {
  computed: {
    ...mapGetters({
      isLogin: LoginType.isLogin
    })
  },
  created() {
    if (!this.isLogin) {
      this.$router.replace('login')
    }
  }
}