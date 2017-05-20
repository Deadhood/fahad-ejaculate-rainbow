const path = require('path')
const Express = require('express')

const baby = require('babyparse')
const download = require('download')
const { parseFragment } = require('parse5')

const minn = require('lodash.min')
const find = require('lodash.find')
const ssize = require('lodash.samplesize')

const app = new Express()
let rawData
let opDone = false

app.get('/', function (req, res) {
  res.redirect('json')
})

app.get('/json', function (req, res) {
  if (opDone) {
    const num = minn([(req.query.num || 6), rawData.length + 1])
    const links = ssize(rawData, num).map(
      el => find(parseFragment(el).childNodes[0].attrs, ['name', 'src']).value
    )
    res.send(
      JSON.stringify({
        code: 200,
        message: 'Successful',
        data: links
      })
    )
  } else {
    res.status(404).send(JSON.stringify({
      code: 404,
      message: 'No JSON data available right now. Reload in a minute or two.'
    }))
  }
})

app.listen(3030, function () {
  console.log('Express is listening on port 3030')
  download(
    'https://spankbang.com/static_desktop/CSV/spankbang.24hr.zip',
    path.resolve(__dirname),
    { extract: true }
  ).then(() => {
    rawData = baby.parseFiles('spankbang.24hr.csv').data.map(r => r[0])
    opDone = true
  })
})
