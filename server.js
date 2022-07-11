const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connect = require('./config/dbConnection')
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const credentials = require('./middleware/credentials')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const { PORT } = require('./config')

// Routes (route handlers)
const mainRoutes = require('./routes/main')
const usersRoutes = require('./routes/users')
const postsRoutes = require('./routes/posts')
// const categoriesRoutes = require('./routes/categories')

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials)

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json())

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')))

//setting up view engine to show the server status at index page
app.set('view engine', 'pug')
// this allows you to render .html files as templates in addition to .ejs
app.engine('pug', require('pug').renderFile)

// routes
app.get('^/$|/index(.pug)?', (req, res) => {
  res.render('index.pug', { PORT })
})

//Swagger API Doc
const file = './api.yaml'
const swaggerJSDoc = YAML.load(file)
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc))

/*
 * REST API Routes
 */

app.use('/api', mainRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/posts', postsRoutes)
// app.use('/categories', categoriesRoutes)

/**
 * Start Express server.
 */
const server = async () => {
  const isConnected = await connect()
  if (isConnected) {
    app.listen(PORT, () => {
      console.log(`🚀 App is running at http://localhost:${PORT}`)
      console.log('Press CTRL-C to stop\n')
    })
  }
}

server()
