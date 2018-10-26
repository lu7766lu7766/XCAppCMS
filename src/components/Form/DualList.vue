<template>
  <div class="push-app-box">
    <div class="bootstrap-duallistbox-container row">
      <div class="box1 col-md-5">
        <input class="filter form-control ue-form" type="text" placeholder="输入内容可筛选" v-model="filterOption">
        <select multiple="multiple"
                class="form-control"
                name="doublebox_helper1"
                style="height: 102px;">
          <option v-for="(val, index) in filterUnselectedOptions" :key="index" :value="val" @click="add(index)">
            {{ val[textAttr] }}
          </option>
        </select></div>
      <div class="btn-box col-md-1">
        <!--<button type="button" class="btn db-btn move btn-default" title="Move selected">-->
        <!--<i class="glyphicon glyphicon-arrow-right"></i>-->
        <!--</button>-->
        <button type="button" class="btn db-btn moveall btn-default" title="Move all" @click="addAll()">
          <i class="glyphicon glyphicon-arrow-right"></i>
          <i class="glyphicon glyphicon-arrow-right"></i>
        </button>
        <p class="clearfix" style="margin-bottom:20px"></p>
        <!--<button type="button" class="btn db-btn remove btn-default" title="Remove selected">-->
        <!--<i class="glyphicon glyphicon-arrow-left"></i>-->
        <!--</button>-->
        <button type="button" class="btn db-btn removeall btn-default" title="Remove all" @click="delAll()">
          <i class="glyphicon glyphicon-arrow-left"></i>
          <i class="glyphicon glyphicon-arrow-left"></i>
        </button>
      </div>
      <div class="box2 col-md-5">
        <input class="filter form-control ue-form" type="text" placeholder="输入内容可筛选" v-model="filterValue">
        <select multiple="multiple"
                class="form-control"
                name="doublebox_helper2"
                style="height: 102px;">
          <option v-for="(val, index) in filterSelectedOptions" :key="index" :value="val" @click="del(index)">
            {{ val[textAttr] }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
  import 'resource/plugins/doublebox/doublebox-bootstrap.css'

  export default {
    props: {
      options: {
        type: Array,
        required: true
      },
      textAttr: {
        type: String,
        default: 'name'
      },
      /**
       * 已選取項目
       */
      value: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        filterOption: '',
        filterValue: ''
      }
    },
    watch: {
      value(newValue) {
        this.$emit('input', newValue)
      }
    },
    methods: {
      add(index) {
        this.value.push(this.filterUnselectedOptions.slice(index, index + 1)[0])
      },
      del(index) {
        this.value.splice(_.findIndex(this.value, {name: this.filterSelectedOptions[index].name}), 1)
      },
      addAll() {
        while (this.filterUnselectedOptions.length)
        {
          this.add(0)
        }
      },
      delAll() {
        while (this.filterSelectedOptions.length)
        {
          this.del(0)
        }
      }
    },
    computed: {
      /**
       * 未選取項目
       */
      unselectedOptions() {
        return _.reduce(this.options, (result, option) =>
        {
          // 不存在於現有屬性中，才加入未選取項目
          if (!_.some(this.value, x => x.name == option.name))
          {
            result.push(option)
          }
          return result
        }, [])
      },
      /**
       * 過濾完的未選取項目
       * @returns {Array}
       */
      filterUnselectedOptions() {
        return _.filter(this.unselectedOptions, x =>
        {
          return this.filterOption == '' ||
            ((x[this.textAttr] + '').indexOf(this.filterOption) > -1)
        })
      },
      /**
       * 過濾完的已選取項目
       * @returns {Array}
       */
      filterSelectedOptions() {
        return _.filter(this.value, x =>
        {
          return this.filterValue == '' ||
            ((x[this.textAttr] + '').indexOf(this.filterValue) > -1)
        })
      }
    }
  }
</script>

<style scoped lang="stylus">

  /* 發佈APP */
  .push-app-box .info-container > span {
    display: none;
  }

  .push-app-box .bootstrap-duallistbox-container .btn-box {
    margin-top: 0;
    padding-left: 9px;
    padding-right: 10px;
    flex: 0 0 65px;
    max-width: 65px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .push-app-box .btn-box .btn.moveall {
    order: 1;
  }

  .push-app-box .btn-box .btn.move {
    order: 2;
  }

  .push-app-box .clearfix {
    order: 3;
  }

  .push-app-box .btn-box .btn.remove {
    order: 4;
  }

  .push-app-box .btn-box .btn.removeall {
    order: 5;
  }

  .push-app-box .bootstrap-duallistbox-container select {
    height: 250px !important;
  }

  .push-app-box .bootstrap-duallistbox-container .settingUp-btns {
    visibility: hidden;
  }

  .push-app-box .btn i {
    display inline-block;
    vertical-align middle;
    margin: 0 1px
  }

  .push-app-box .glyphicon-arrow-right:before {
    content: "";
    width: 11px;
    height: 13px;
    background: url(/resource/img/right-arrow.png) no-repeat right center / cover;
    display: block;
  }

  .push-app-box .glyphicon-arrow-left:before {
    content: "";
    width: 11px;
    height: 13px;
    background: url(/resource/img/left-arrow.png) no-repeat left center / cover;
    display: block;
  }

  /* 彈跳推播確認 */
  .checkpush-cover {
    background: rgba(0, 0, 0, .5);
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1051;
    display: none;
  }

  .checkpush-dialog {
    z-index: 1052;
  }

  @media all and (min-width: 992px) {
    /* 發佈APP */
    .push-app-box .box1, .push-app-box .box2 {
      flex: 0 0 45%;
      max-width: 45%;
    }
  }

  @media all and (max-width: 992px) {
    /* 發佈APP */
    .push-app-box .bootstrap-duallistbox-container .btn-box, .push-app-box .box1, .push-app-box .box2 {
      flex: 0 0 100%;
      max-width: 100%;
    }
  }

</style>