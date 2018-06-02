//sometimes fetch data slow to trigger other fns
//sortName not done yet

const info = document.querySelector('#info')
const input = document.querySelector('input[type="text"]')
const submit = document.querySelector('input[type="submit"]')
let amount = document.getElementById('amount')

let searchData = []
let sort_state = 'rank'
let  start = 0
let data1 = []


const load = document.querySelector('#load')
load.addEventListener('click', ()=>{
    fetchData()
})

const fetchData = async () => {
    const url = 'https://api.coinmarketcap.com/v1/ticker/?limit=100&start='
    const response = await fetch(url+start)
    data1 = await response.json()
    display(data1)
    start += 100
}
fetchData().catch(e=>e.message)

const display = (arr) => {
    let list = ''
    info.innerHTML = ""
    amount.innerHTML = `Found ${arr.length} results`
    for(let item of arr){
        list += `
            <tr>    
                <td>${item.name}</td>
                <td style="text-align: right">${item.rank}</td>
                <td style="text-align: right">${item.price_usd}</td>
                <td style="text-align: right">${item.percent_change_1h}%</td>
            </tr>
        `
    }
    info.innerHTML = list
}






submit.addEventListener('click', (event)=>{
    event.preventDefault()
    info.innerHTML = ""
    console.log('submit')
    filter().catch(e=>e.message)
    console.log('filtering')
})

const sortName = (type) => {
    if(searchData.length>0){
        if(sort_state !== type){
            searchData.sort((a, b)=>{
                if(a.id < b.id){ return -1 }
                if(a.id > b.id){ return 1 }
                return 0
            })
            display(searchData)
            sort_state = type
        }else{
            searchData.reverse()
            display(searchData)
        }
    }else{
        setTimeout(()=>{
            if(sort_state !== type){
                data1.sort((a, b)=>{
                    if(a.id < b.id){ return -1 }
                    if(a.id > b.id){ return 1 }
                    return 0
                })
                display(data1)
                sort_state = type
            }else{
                data1.reverse()
                display(data1)
            }          
        }, 100)
    }
}

let data = []
const sortNumber = (type) => {
    if(searchData.length>0){
        if(sort_state !== type){
            searchData.sort((a, b)=>{
                return a[type] - b[type]
            })
        }else{
            searchData.reverse()
        }
        sort_state = type
        display(searchData)
    }else{
        const sortData = async () => {
            const url = 'https://api.coinmarketcap.com/v1/ticker/?limit=2000'
            const response = await fetch(url)
            data = await response.json()
        }
        sortData().catch(e=>e.message)
        setTimeout(()=>{
            console.log(sort_state, type)
            if(sort_state !== type){
                data1.sort((a, b)=>{
                    return a[type] - b[type]
                })
                data.sort((a, b)=>{
                    return a[type] - b[type]
                })
                console.log('sort data', data)
            }else{
                data1.reverse()
                data.reverse()
                console.log('reverse', data)
            }
            sort_state = type
            display(data1)           
        }, 300)
    }
}



const filter = async () => {
    console.log(data.length===0)
    const lowerCase = input.value.toLowerCase()
    if(data.length===0){
        console.log('data is 0')
        const url = 'https://api.coinmarketcap.com/v1/ticker/?limit=2000'
        
        const response = await fetch(url)
        data = await response.json()
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
        display(searchData)
        input.value = ""
    }else{
        console.log('data 1600')
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
        display(searchData)
        input.value = ""        
    }
    
}