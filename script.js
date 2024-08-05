const container = document.querySelector('.countries-container')
const filterRegion = document.querySelector('.filter')
let allCountriesData
const searchInput = document.querySelector('.search input')
const theme = document.querySelector('.themeChanger')

fetch('https://restcountries.com/v3.1/all').then((res)=>{
    return res.json()}).then((data)=>{
        renderCountries(data)
        allCountriesData = (data)

    })
    

filterRegion.addEventListener('change' , (e)=>{
    fetch(`https://restcountries.com/v3.1/region/${filterRegion.value}`).then((res)=>{
        return res.json()}).then(renderCountries)
            
        
})
function renderCountries(data){
    container.innerHTML=''
    data.forEach((country)=>{
        // console.log(country);
const countryCard = document.createElement('a')
countryCard.classList.add('country-card')
countryCard.href = `/country.html?name=${country.name.common}`

const cardHTML = `
    <img src="${country.flags.svg}" alt="${country.name.common}">
        <div class="card-text">
            <h3 class="country-name">${country.name.common}</h3>
            <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
            <p><b>Region: </b>${country.region}</p>
            <p><b>Capital: </b>${country.capital?.[0]}</p>
        </div>`
        countryCard.innerHTML = cardHTML
       
        container.append(countryCard)   
    })
   
}
searchInput.addEventListener('input',(e)=>{
    const filteredCountries = allCountriesData.filter((country)=>country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(filteredCountries)
})
theme.addEventListener('click',()=>{
    document.body.classList.toggle('dark')  
})



