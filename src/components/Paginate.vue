<template>
  <div class="dataTables_paginate paging_simple_numbers" v-if="lastPage > 1">
    <ul class="pagination pagination-box m-b-0 m-t-10">

      <li class="paginate_item previous"
          :class="disabled = page === 1"
          @click="page === 1 ? '' : pageChange(page - 1)">
        <a href="#" aria-controls="data-table-default"><<</a>
      </li>

      <li class="paginate_item"
          v-for="p in _.range(startPage, endPage+1)"
          :key="p"
          :class="{active : p === page}"
          @click="p === page ? '' : pageChange(p)">
        <a href="#" aria-controls="data-table-default">{{ p }}</a>
      </li>

      <li class="paginate_item next"
          :class="disabled = page === lastPage"
          @click="page === lastPage ? '' : pageChange(page + 1)">
        <a href="#" aria-controls="data-table-default">>></a>
      </li>

    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      page: {
        type: Number,
        required: true
      },
      lastPage: {
        type: Number,
        required: true
      }
    },
    computed: {
      startPage() {
        const start = this.page - 3
        return start > 1
          ? start
          : 1
      },
      endPage() {
        const end = this.page + 3
        return end < this.lastPage
          ? end
          : this.lastPage
      }
    },
    methods: {
      pageChange(targetPage) {
        this.$emit('pageChange', targetPage)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .pagination
    &-box
      li
        a
          padding 6px 11px
          color: #6c757d
          border-color: #dee2e6
          width 32px
          height 32px

</style>
