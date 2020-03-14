const request=require("request")

forecast=(latitude,longitude,callback)=>{
    url="https://api.darksky.net/forecast/97f61624715f112b44a0649eed11e9a4/"+encodeURIComponent(latitude)+","+encodeURIComponent(longitude )
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("unable to connect to weather service",undefined)
        }
        else if(response.body.error){
            callback("Unable to find location",undefined)
        }
        else{
            callback(undefined,response.body.daily.data[0].summary+" It is currently "+response.body.currently.temperature+" degrees out."+"There is a "+response.body.currently.precipProbability+"% chance of rain.")
        }
    })
}
module.exports=forecast