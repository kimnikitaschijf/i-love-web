// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({extended: true}))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express()); 

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')

// Om Views weer te geven, heb je Routes nodig
// Maak een GET route voor de index (meestal doe je dit in de root, als /)
// In je visitekaartje was dit waarschijnlijk index.html
app.get('/', async function (request, response) {
  // Render index.liquid uit de Views map en geef de opgehaalde data mee, in een variabele genaamd person
  response.render('index.liquid')
})

app.get('/projects', async function (request, response) {
  // Render index.liquid uit de Views map en geef de opgehaalde data mee, in een variabele genaamd person
  response.render('projects.liquid')
})

app.get('/profile', async function (request, response) {
  // Render index.liquid uit de Views map en geef de opgehaalde data mee, in een variabele genaamd person
  response.render('profile.liquid')
})

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000, als dit ergens gehost wordt, is het waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
    // Toon een bericht in de console en geef het poortnummer door
    console.log(`Application started on http://localhost:${app.get('port')}`)
  })
  