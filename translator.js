const https = require('https')
const options = {
    hostname: 'translate.google.com',
    port: 443,
    path: '/?sl=auto&tl=hi&text=the%20apple%20is%20good&op=translate',
    method: 'GET'
  }
  
  const req = https.request(options, res => {
    console.log(res.body)
  
    res.on('data', d => {
      process.stdout.write(d)
    })
  })
  
  req.on('error', error => {
    console.error(error)
  })
  
  req.end()