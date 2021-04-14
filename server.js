// Express server package
const express = require('express')
// SQL DB Connecter package
const mysql = require('mysql')
// Path package in node for file paths
const path = require('path')
// Encryption for user passwords
const bcrypt = require('bcrypt')
// Returns JSON for Frontend
const axios = require('axios');
// Parses json for post/put
const bodyParser = require('body-parser');


// Time it takes to encrypt
var salt = 10;


const app = express()

const PORT = process.env.PORT || 5000

const db = mysql.createConnection(process.env.JAWSDB_URL)
db.connect()

// Middleware
app.use(express.static('public')) // Loads files in public based on url
// e.g. https://www.travel-geeks.com/index would load index.html and its resources
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'))
})
app.get('/propertyCreation', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'propertyCreation.html'))
})
app.get('/userCreation', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'userCreation.html'))
})

// API Routes
app.get('/users', (req, res) => {
    const sql ='SELECT * FROM users'
    req.body;
    db.query (sql, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})


// Gets properties and sellers
app.get('/properties', (req, res) => {
    const sql = 'SELECT P.PropertyId, P.Price, P.StreetAddress, P.City, P.State, P.Zipcode, P.Title, P.Description, P.NumBeds, P.NumBaths FROM properties P, users U WHERE P.SellerId = U.UserId '
    req.body;
    db.query(sql, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

// Encrypts user password
async function encryptPassword(pw){
    pw = bcrypt.hash(pw, salt, function (err, hash) {
        
    })
   // console.log(pw);
    //return pw;
}

// Creates a user
app.post('/createUser', (req, res) => {
    var password = req.body.pword

    // encrypts password
    bcrypt.hash(password, salt, function (err, hash) {
        // User holds all values needed for creating user)
        const user = [req.body.fname, req.body.minit, req.body.lname, req.body.email, req.body.phone, req.body.uname, hash]
         
        // ? is replaced iteratively
        const sql =
            "INSERT INTO users SET FirstName=?, MiddleInit=?, LastName=?, Email=?, Phone=?, Username=?, Password=?"
        // Listing is provided for the ? wildcard
        db.query(sql, user, (err, result) => {
            if (err) throw err
            res.json(result);
        })
    })

})

// Creates a review for specific id
/*app.post('/createListing', (req, res) => {
    // Listing holds all values needed for the query
    const listing = [req.body.price, req.body.streetAddress, req.body.city, req.body.state, req.body.zipcode, req.body.title, req.body.description, req.body.numBeds, req.body.numBaths]
    // ? is replaced iterativley
    const sql =
        "INSERT INTO reviews SET SellerId=1, Price=?, StreetAddress=?, City=?, State=?, Zipcode=?, Title=?, Description=?, NumBeds=?, NumBaths=?"
    // Listing is provided for the ? wildcard
    db.query(sql, listing, (err, result) => {
        if (err) throw err
        res.json(result);
    })
})*/

// Gets reviews by property
app.get('/reviewsByProperty', (req, res) => {
    const sql = "SELECT * From reviews R, users U WHERE R.ReviewerId = U.UserId AND R.PropertyId = '" + req.body.propertyId + "'"
    db.query(sql, (err, result) => {
        if (err) throw err
        res.json(result);
    })
})

// Creates a listing
app.post('/createListing', (req, res) => {
    // Listing holds all values needed for the query
    const listing = [req.body.price, req.body.streetAddress, req.body.city, req.body.state, req.body.zipcode, req.body.title, req.body.description, req.body.numBeds, req.body.numBaths]
    console.log(req.body)
    //const listing = req.body
    // ? is replaced iterativley
    const sql = 
    "INSERT INTO properties SET SellerId=1, Price=?, StreetAddress=?, City=?, State=?, Zipcode=?, Title=?, Description=?, NumBeds=?, NumBaths=?"
    // Listing is provided for the ? wildcard
    db.query(sql, listing, (err, result) => {
        if (err) throw err
        res.json(result);
    })
})

// Start server
app.listen(PORT)