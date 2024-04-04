//Spike One:

// import progressbar from 'progress'

// var bar = new progressbar('[:bar] :percent :etas', { total: 100 })

// var timer = setInterval(function() {
//   bar.tick()
//   if (bar.complete) {
//     clearInterval(timer)
//   }
// }, 100)

// ---------------------------------------------------

// Spike Two:
// const label = 'display update'
// console.time(label)
// for (let i = 0; i < 100_000; i++) {
//   if (i % 1000 === 0) console.timeLog(label, i)
// }
// console.timeEnd(label)

// ---------------------------------------------------

// Spike Three:

let file = 'mcupws.json'

const fs = require('fs')
const data = fs.readFileSync(file)
const pws = JSON.parse(data)

for 