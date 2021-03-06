import fetch from 'node-fetch'

let allcoins = []
let pages = 50

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
,1000*60*5)
///////////////////////////////
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.status(200)
	res.json(allcoins)
})

app.listen(process.env.PORT || 3000, () => console.log("Server running..."))
