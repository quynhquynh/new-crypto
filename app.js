const info = document.querySelector('#info')
const input = document.querySelector('input[type="text"]')
const submit = document.querySelector('input[type="submit"]')
submit.addEventListener('click', (event)=>{
    event.preventDefault()
    fetchData().catch(e=>e.message)
})

let searchData = []
let sort_state = 'rank'


const fetchData = async () => {
    info.innerHTML = ""
    const amount = document.getElementById('amount')
    
    const url = 'https://api.coinmarketcap.com/v1/ticker/?limit=2000'
    const lowerCase = input.value.toLowerCase()

    const response = await fetch(url)
    const data = await response.json()
    for(let item of data){
        let name = item.id
        if (name.includes(lowerCase)){
            if(name.slice(0, lowerCase.length)===lowerCase){
                searchData.push(item)
                const newUrl = 'https://api.coinmarketcap.com/v1/ticker/'
                const fetchCoin = async () => {
                    const result = await fetch(newUrl+name+'/')
                    const coinData = await result.json()
                }
                fetchCoin().catch(e=>e.message)
            }
        }
    }
    console.log(searchData)
    display()
    input.value = ""
}

const display = () => {
    info.innerHTML = ""
    amount.innerHTML = `Found ${searchData.length} results`
    for(let item of searchData){
        let list = `
            <tr>    
                <td>${item.name}</td>
                <td style="text-align: right">${item.rank}</td>
                <td style="text-align: right">${item.price_usd}</td>
                <td style="text-align: right">${item.percent_change_1h}%</td>
            </tr>
        `
        info.innerHTML += list
    }
}

const sortName = (e) => {
    searchData.sort((a, b)=>{
        if(a.id < b.id){ return -1 }
        if(a.id > b.id){ return 1 }
        return 0
    })
    display()
}


const sortNumber = (type) => {
    if(sort_state !== type){
        searchData.sort((a, b)=>{
            return a[type] - b[type]
        })
    }else{
        searchData.reverse()
    }
    sort_state = type
    display()
}

input.addEventListener('keyup', (event)=>{
    console.log(event.target.value)
    getData(event)
    
})



// const sortRank = (e) => {
//     searchData.sort((a, b)=>{
//         return a.rank-b.rank
//     })
//     display()
// }

// const sortPrice = (e) => {
//     searchData.sort((a, b)=>{
//         return a.price_usd-b.price_usd
//     })
//     display()
        
// }

// const sortChange = (e) => {
//     searchData.sort((a, b)=>{
//         return a.percent_change_1h - b.percent_change_1h
//     })
//     display()
// }
