<template>
  <span class="right-content">
    <div class="form-check form-check-inline">
      <label class="form-check-label">
        查<input class="form-check-input" type="checkbox" checked>
      </label>
    </div>
    <div class="form-check form-check-inline">
      <label class="form-check-label">
        增<input class="form-check-input" type="checkbox" @click="test">
      </label>
    </div>
    <div class="form-check form-check-inline">
      <label class="form-check-label">
        改<input class="form-check-input" type="checkbox">
      </label>
    </div>
    <div class="form-check form-check-inline">
      <label class="form-check-label">
        删<input class="form-check-input" type="checkbox">
      </label>
    </div>
  </span>
</template>

<script>
export default {
	methods: {
		test(e) {
			console.log(e)
		}
	}
}
</script>