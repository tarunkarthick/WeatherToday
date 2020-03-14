const path=require("path")
const express=require("express")
const hbs=require("hbs")
const geocode=require("./utils/geocode.js")
const forecast=require("./utils/forecast.js")
const port=process.env.PORT||3000

const app=express()


//define paths for express config
const pathdirectory=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')


//set up handlebar engine and view locations
app.set("view engine","hbs")
app.set("views",viewspath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(pathdirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:"Tarun Karthick"
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:"Tarun Karthick"
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:"This is some useful text.",
        title:"Help",
        name:"Tarun karthick"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide a Address"
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({error})
        }
        forecast(data.latitude,data.longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastdata,
                location:data.location,
                address:req.query.address
            })
        })

    })
})


app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term."
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
}
)

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:"Tarun karthick",
        errormessage:"Help article not found."
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:"Tarun karthick",
        errormessage:"Page not found."
    })
})

app.listen(port,()=>{
    console.log("server listening at port "+port)
})