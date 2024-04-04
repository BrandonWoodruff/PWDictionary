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

import fs from 'fs'
const data = fs.readFileSync(file)
const pws = JSON.parse(data)

if (pws.filter(pw => /^[a-zA-Z0-9]+$/.test(pw))) {
  console.log('All passwords are alphanumeric')
}
else {
  console.log('Not all passwords are alphanumeric')
}