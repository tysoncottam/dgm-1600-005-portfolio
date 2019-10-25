import { people } from '/DGM-1600-ScriptingWeb/starwars-api/assets/people.js'

let mainArea = document.querySelector('main')

people.forEach((person) => {
    let personDiv = document.createElement('div')
    let name = document.createElement('h2')
    let eyeColor = document.createElement('p')
    let gender = document.createElement('p')
    let pic = document.createElement('img')
    
    let charNum = getCharNumber(person.url)
    
    name.textContent = person.name
    eyeColor.textContent = 'Eye Color: ' + person.eye_color.toUpperCase()
    gender.textContent = 'Gender: ' + person.gender.toUpperCase()
    pic.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`
    
    personDiv.appendChild(name)
    personDiv.appendChild(pic)
    personDiv.appendChild(eyeColor)
    personDiv.appendChild(gender)
    
    mainArea.appendChild(personDiv)
})

function getCharNumber(charURL)
{
    let end = charURL.lastIndexOf('/')
    let charID = charURL.substring(end -2, end)
    
    if(charID.indexOf('/') !== -1)
        {
            return charID.slice(1,2)
        }
    else
        {
            return charID
        }
}