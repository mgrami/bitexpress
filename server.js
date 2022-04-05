import fetch from 'node-fetch'

let allcoins = []
let pages = 4

async function get_allcoins(){
  let allcoins_ = []
  for(let i=1; i<=pages; i++) {
    try {
      let res = await fetch('https://api.coingecko.com/api/v3/coins/markets?' + 
        new URLSearchParams({vs_currency: 'usd', per_page: 250, page: i})
      )   
      allcoins_ = [...allcoins_, ...await res.json()]
    }
    catch {}
  }
  allcoins = allcoins_
}

get_allcoins()
setInterval(() => {
	get_allcoins()
}
,120000)
///////////////////////////////
import express from 'express'

const app = express()

app.get('/', (req, res) => {
	res.json(allcoins)
})

app.listen(process.env.PORT || 3000, () => console.log("Server running..."))
