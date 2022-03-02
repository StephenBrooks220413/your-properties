const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const ejs = require('ejs')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const flash = require('connect-flash')

require('dotenv').config()

// Setting App
const app = new express()
app.use(express.static('public'))
app.set('view engine', 'ejs')

// Middlewares
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(morgan())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({exntended:true}))
app.use(fileUpload())
app.use(flash())
app.use(expressSession({
    secret: 'o587fm6o5ym6nmyf6rh6fy56mfyhr6hlr68'
}))
globalloggedIn = null;
app.use("*", (req, res, next)=>{
    loggedIn = req.session.userId;
    next()
});

// DB Connection
mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology:true
})
if(!mongoose){
    console.log('No DB connection')
} else {
    console.log('DB connection')
}

/////////////////////////////////////////////////////////////
// Middlewares
const validateMiddleware = require('./middleware/validateMiddleware')
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')


const homeController = require('./controllers/home')
const aboutController = require('./controllers/about')
const profilesController = require('./controllers/profiles')
const profileController = require('./controllers/profile')

//////////////////////////////////////////////////////////
// Accounts Controller
const loginController = require('./controllers/login')
const registerController = require('./controllers/register')
const storeUserController = require('./controllers/storeUser')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

//////////////////////////////////////////////////////////
// Users Controller
const newListingController = require('./controllers/newListing')
const singleListingController = require('./controllers/singleListing')
const ListingsController = require('./controllers/Listings')
const storeListingController = require('./controllers/storeListing')

// Listening Port
app.listen(process.env.PORT, () => {
    console.log('App listening')
})

/////////////////////////////////////////////////////////////
// App Routes
app.get('/', homeController)
app.get('/about', aboutController)
app.get('/profiles', profilesController)
app.get('/profile/:id', profileController)
/////////////////////////////////////////////////////////////
// Listings
app.get('/listings', ListingsController)
app.get('/listing/:id', singleListingController)
app.get('/auth/newListing', authMiddleware, newListingController)
app.post('/listings/store', authMiddleware, validateMiddleware, storeListingController)
/////////////////////////////////////////////////////////////
// Account
app.get('/auth/register', redirectIfAuthenticated, registerController)
app.post('/users/register', redirectIfAuthenticated, storeUserController)
app.get('/auth/login', redirectIfAuthenticated, loginController)
app.post('/users/login', redirectIfAuthenticated, loginUserController)
app.get('/auth/logout', logoutController)

app.use((req, res) => res.render('notfound'))