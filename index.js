const express = require('express') 
const bodyparser = require('body-parser') 
const path = require('path') 
const app = express() 

var Publishable_Key = 'pk_test_51JOHLVSBcckzOmcMxCv6kdW1hldxoeS42Q1hUFse8GIpQeO2l3ILEU6549clR9a2acA654m2HgyjMRzzeUltAnBq00EzQyjSfw'
var Secret_Key = 'sk_test_51JOHLVSBcckzOmcMEBS3abtpNAzQq00FkZzee2eax4ZwXPR6a3qik8ZKSYhcXClTuIrugiwWA91EJ4Zq9C4PZSTE004djRHIhc'

const stripe = require('stripe')(Secret_Key) 

const port = process.env.PORT || 3000 

app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json()) 

// View Engine Setup 
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 

app.get('/', function(req, res){ 
    res.render('Home', { 
    key: Publishable_Key 
    }) 
}) 

app.post('/payment', function(req, res){ 

    // Moreover you can take more details from user 
    // like Address, Name, etc from form 
    stripe.customers.create({ 
        email: req.body.stripeEmail, 
        source: req.body.stripeToken, 
        name: 'Priti Gopale', 
        address: { 
            line1: 'Sai sahawas , Rnagar', 
            postal_code: '410505', 
            city: 'Pune', 
            state: 'Maharashtra', 
            country: 'India', 
        } 
    }) 
    .then((customer) => { 

        return stripe.charges.create({ 
            amount: 7000,    // Charing Rs 25 
            description: 'Web Development Product', 
            currency: 'INR', 
            customer: customer.id 
        }); 
    }) 
    .then((charge) => { 
        res.render("Success",{
            key:Publishable_Key
        }) // If no error occurs 
    }) 
    .catch((err) => { 
        res.send(err)    // If some error occurs 
    }); 
}) 

app.listen(port, function(error){ 
    if(error) throw error 
    console.log("Server created Successfully") 
})