<template>
  <input type="file"
         class="form-control"
         :accept="accept"
         ref="fileUploader"
         @change="fileChange" />
</template>

<script>
  export default {
    props: {
      target: {
        type: String,
        required: true
      },
      accept: {
        type: String,
        default: 'image/jpeg,image/png,image/gif'
      },
      data: {
        type: String | Object,
        require: true
      }
    },
    methods: {
      async fileChange(e) {
        if (e.target.files.length)
        {
          // var base64 = await new Promise((resolve, reject) =>
          // {
          //   var reader = new FileReader()
          //   reader.readAsDataURL(e.target.files[0])
          //   reader.onload = function ()
          //   {
          //     console.log(reader.result)
          //     resolve(reader.result)
          //   }
          //   reader.onerror = function (error)
          //   {
          //     console.log(error)
          //     reject(error)
          //   }
          // })
          var res = await this.$uploadFiles('uploadNewsCategoryImage', {
            image: e.target.files[0]
          })
          console.log(res)
          // e.target.value = ''
        }
      }
    }
  }
</script>