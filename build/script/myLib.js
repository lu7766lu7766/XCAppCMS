var path = require('path')
  , level = require('level')
  , s3sync = require('jac-s3-sync-aws')
  , readdirp = require('readdirp')
  , moment = require('moment')
  , es = require('event-stream')

var resolve = (dir) =>
{
  return path.join(__dirname, '../..', dir)
}
var conf = require(resolve('env.json'))

module.exports = {
  // 根目錄
  resolve,
  uploadFolder(dir, rootDir) {
    var db = level(resolve(dir + '/cache'))

    var files = readdirp({
      root: resolve(dir),
      directoryFilter: ['!.git', '!cache']
    })

    // Takes the same options arguments as `aws-sdk`,
    // plus some additional options listed above

    var bucketKey = process.argv.indexOf('-rc') > -1
      ? 'rc'
      : process.argv.indexOf('-stable') > -1
        ? 'stable'
        : 'test',
      bucket = conf.bucket[bucketKey],
      index = 0
    var uploadConf = {
      key: conf.AWS_ACCESS_KEY,
      secret: conf.AWS_SECRET_KEY,
      bucket: bucket,
      concurrency: 100
      // , prefix: 'test' //optional prefix to files on S3
    }
    rootDir && (uploadConf.dest = rootDir)
    var uploader = s3sync(db, uploadConf).on('data', function (file)
    {
      if (file.fresh)
      {
        console.log(`${file.fullPath}\n->${file.url}\nindex:${index++}\n`)
      }
    })

    files.pipe(uploader).pipe(es.wait(function (err, body)
    {
      console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
    }))
  }
}