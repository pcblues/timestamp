// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()
const moment = require('moment')

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  var str=request.query
  var dateStr=Object.keys(str)[0]
  var newIntDate = new Date(parseInt(dateStr))
  var newStrDate = Date.parse(dateStr)
  var unixTime = null
  var naturalTime = null
  if (isNaN(newIntDate)==false) {
    unixTime = newIntDate.getTime()
    naturalTime = moment(new Date(newIntDate)).format('MMMM Do YYYY')
  } else if(isNaN(newStrDate)==false) {
    unixTime = new Date(newStrDate).getTime()
    naturalTime = moment(new Date(newStrDate)).format('MMMM Do YYYY') 
  }
    
  var resp={}
  resp.unix=unixTime
  resp.natural=naturalTime
  var jresp = JSON.stringify(resp)
  response.send(jresp)
  //response.send(newDate)
})

// Simple in-memory store
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
]

app.get("/dreams", (request, response) => {
  response.send(dreams)
})

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", (request, response) => {
  dreams.push(request.query.dream)
  response.sendStatus(200)
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
