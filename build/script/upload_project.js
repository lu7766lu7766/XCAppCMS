var path = require('path')
  , level = require('level')
  , s3sync = require('jac-s3-sync-aws')
  , readdirp = require('readdirp')
var myLib = require('./myLib')
var resolve = myLib.resolve

var conf = require(resolve('env.json'))
// To cache the S3 HEAD results and speed up the 
// upload process. Usage is optional. 
var db = level(resolve('dist/cache'))

var files = readdirp({
  root: resolve('dist'),
  directoryFilter: ['!.git', '!cache']
})

// Takes the same options arguments as `aws-sdk`, 
// plus some additional options listed above 

var isDev = process.argv.indexOf('-dev') > -1,
  bucket = 'xing-static-template' + (isDev ? '-test' : ''),
  index = 0

var uploader = s3sync(db, {
  key: conf.AWS_ACCESS_KEY,
  secret: conf.AWS_SECRET_KEY,
  bucket: bucket,
  concurrency: 100
  // , prefix: 'test' //optional prefix to files on S3 
}).on('data', function (file) {
  if (file.fresh) {
    console.log(`${file.fullPath}\n->${file.url}\nindex:${index++}\n`)
  }
})

files.pipe(uploader)