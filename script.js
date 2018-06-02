const info = document.querySelector('#info')
const input = document.querySelector('input[type="text"]')
const submit = document.querySelector('input[type="submit"]')
submit.addEventListener('click', (event)=>{
    event.preventDefault()
    getData(event)
    //fetchData().catch(e=>e.message)
})

let sort_state = 'rank'
const array = data
let searchData = []





const getData = () => {
    info.innerHTML = ""
    searchData = []
    
    const value = input.value.toLowerCase()
    for(let item of array){
        if(item.id.includes(value)){
            if(item.id.slice(0, value.length)===value){
                searchData.push(item)
            }
        }
    }
    display()
    // input.value = ""
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
    getData()
    
})




// const fetchData = async () => {
//     info.innerHTML = ""
//     const amount = document.getElementById('amount')
//     const input = document.querySelector('input[type="text"]')
//     const url = 'https://api.coinmarketcap.com/v1/ticker/?limit=2000'
    
//     const response = await fetch(url)
//     const data = await response.json()
//     let count = 0
//     for(let item of data){
//         let id = item.id
//         if (id.includes(input.value)){
//             count += 1
//             const newUrl = 'https://api.coinmarketcap.com/v1/ticker/'
//             const fetchCoin = async () => {
//                 const res = await fetch(newUrl+id+'/')
//                 const coinData = await res.json()
//                 let block = `
//                     <h2>I am ${item.name}<h2>
//                     <p>Rank ${item.rank}</p>
//                     <p>Price in USD : ${item.price_usd}</p>
//                     <p>Change in 1h: ${item.percent_change_1h}%</p>
//                 `
//                 amount.innerHTML = `Found ${count} results`
//                 info.innerHTML += block
//             }
//             fetchCoin().catch(e=>e.message)
            
//         }
        
//     }
   
//     input.value = ""
// }