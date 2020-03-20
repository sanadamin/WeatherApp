//core node libraries
const path = require('path')

//npm libraries
const express = require('express')
const hbs = require('hbs')


//local 
const geocode = require('../utils/geocode.js')
const forecast = require('../utils/forecast.js')
const app = express()

const port = process.env.PORT || 3000

console.log(__dirname)
console.log(path.join(__dirname,'../public/'))


//Define paths for Express Config
const publiDirectoryPath = path.join(__dirname,'../public/')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')
//Setup handlebars engine and views locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)
var name = 'Sanad Amin'
//Setup static directory location
app.use(express.static(publiDirectoryPath))



app.get('',(req,res)=>{

    geocode('Amman',(error,geores)=>{
        if(error){
            return console.log(error)
        }
       
            res.render('index',{
                title: 'Weather App',
                name
            })
      
        
    })
    
})


app.get('/products',(req,res)=>{
if(!req.query.search){
   return res.send({
        error:'Must provide a search term'
    })
}   

 res.send({
        products: []
    })
})

app.get('/dash',(req,res)=>{
    res.render('dashboard',{
        name: 'new Dashboard'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Page',
        name: 'Sanad'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Read Below: ',
        message: "askjdjans;dljkansf;lkjnsa"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please specify address parameter'
        })
    }
    geocode(req.query.address,(err,{latitude,longitude,location} = {})=>{
        if(err){
            res.send({
                error: err
            })
        }
       forecast(latitude,longitude,(err,forecastData)=>{
            if(err){
                return res.send({
                    error: err
                })
            }

            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })

       })
    })
    
})

app.get('/help/*',(req,res)=>{
    res.send('Help Article not found')
})

app.get('/*',(req,res)=>{
    res.render('404',{
        name:'Sanad Amin',
        title: '404 Error'
    })

})


app.listen(port,()=>{
    console.log('Server is listenning in port: ', port)
})
