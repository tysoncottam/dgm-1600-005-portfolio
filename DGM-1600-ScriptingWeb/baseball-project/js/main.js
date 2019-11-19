async function getAPIData(url)
{
    try
        {
            const response = await fetch(url)
            const data = await response.json()
            return data
        }
    catch (error)
        {
            console.error(error)
        }
}

/*getPokemonData('https://pokeapi.co/api/v2/pokemon/')*/

const theData = getAPIData('https://pokeapi.co/api/v2/pokemon/')
.then(data => 
{
    for (const pokemon of data.results)
        {
            getAPIData(pokemon.url)
            .then(pokedata =>
            {
                populateDOM(pokedata)    
            })
        }
})

let mainArea = document.querySelector('main')

function populateDOM(single_pokemon) 
{
    let pokeDiv = document.createElement('div')
    let name = document.createElement('h3')
    let height = document.createElement('p')
    let pic = document.createElement('img')

    pokeDiv.setAttribute('class', 'charDivs')
    pic.setAttribute('class', 'picDivs')

    let pokeNum = getPokeNumber(single_pokemon.id)

    name.textContent = single_pokemon.name
    height.textContent = single_pokemon.height

    pic.src = `../images/${pokeNum}.png`

    pokeDiv.appendChild(name)
    pokeDiv.appendChild(pic)
    pokeDiv.appendChild(height)

    mainArea.appendChild(pokeDiv)
}

function getPokeNumber(id)
{
    if(id < 10) return `00${id}`
    if(id > 9 && id < 100) 
    {
        return `0${id}`
    } else return id
    
    
    /*
    let end = charURL.lastIndexOf('/')
    let charID = charURL.substring(end -2, end)
    
    if(charID.indexOf('/') !== -1)
        {
            return `00${charID.slice(1,2)}`
        }
    else
        {
            return `0${charID}`
        }*/
}