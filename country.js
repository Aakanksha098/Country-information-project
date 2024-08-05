const countryName = new URLSearchParams(window.location.search).get('name');
const flagImg = document.querySelector('.country-details img')
const NameH1 =document.querySelector('.country-name')
const nativeName = document.querySelector('.native')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.subRegion')
const capital = document.querySelector('.capital')
const topLevel = document.querySelector('.toplevel')
const currencies = document.querySelector('.Currencies')
const language = document.querySelector('.lang')
const borderCountry = document.querySelector('.border-countries')
const borderCountryCard = document.querySelector('.border-countries')
const backBtn = document.querySelector('.back-arrow')
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then((res)=>{
    return res.json()
}).then(([country])=>{console.log(country)
flagImg.src= country.flags.svg
NameH1.innerText = country.name.common

if(country.name.nativeName){

    nativeName.innerText=(Object.values(country.name.nativeName)[0].common);
}
else{
    nativeName.innerText=country.name.common
}
population.innerText=country.population
if(country.region){
region.innerText = country.region
}
if( country.subregion){
subRegion.innerText = country.subregion
}
else{
    subRegion.innerText=country.region
}
if(country.capital){
capital.innerText = country.capital?.[0]
}
topLevel.innerText = country.tld.join(' , ')
if(country.currencies){
currencies.innerText =  Object.values(country.currencies).map((currency) => currency.name).join(', ')
}
if(country.languages){
language.innerText = Object.values(country.languages).join(', ')
}
if(country.borders){
    country.borders.forEach((border)=>{
        fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res)=>res.json())
        .then(([borderCountry])=>{
            console.log(borderCountry)
        const borderCard = document.createElement('a')
    borderCard.innerText =borderCountry.name.common 
    borderCard.href = `/country.html?name=${borderCountry.name.common}`
    borderCountryCard.append(borderCard)
})
})
}
})
