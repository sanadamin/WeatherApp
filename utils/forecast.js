const request = require('request')
const chalk = require('chalk')
const util = require('util')

const forecast = (latitude,longtiude,callback)=>{
    const url ='https://api.darksky.net/forecast/95224cf6edc860f2e7295befa64b4ca8/'+encodeURIComponent(longtiude)+','+encodeURIComponent(latitude)+'?units=si'

    request({url,json:true},(err,{body})=>{
        if(err){
            callback('Unable to connect to weather services',undefined)
        }else if(body.err){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined, util.format('Hello, It is currenlt %s degrees out. There is %s % chance of rain',chalk.green(body.currently.temperature),chalk.red(body.currently.precipProbability)) )
        }



    })
}

module.exports = forecast

