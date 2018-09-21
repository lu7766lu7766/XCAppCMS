<template>
  <transition name="fade">
    <div v-if="show">
      <div class="alert fade show" :class="{ ['alert-' + styleType]: true }">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
	props: {
		styleType: String,
		show: {
			default: false
		}
	},
	watch: {
		show(newValue) {
			if (newValue) {
				setTimeout(() => {
					this.$emit('update:show', false)
				}, 3000)
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
.fade-enter-active
  transition all 0.5s ease

.fade-leave-active
  transition all 0.5s cubic-bezier(1, 0.5, 0.8, 1)

.fade-enter, .fade-leave-to
  opacity 0
</style>
