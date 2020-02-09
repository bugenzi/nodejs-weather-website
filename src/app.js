
//Modules that are installed ond used
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

console.log(path.join(__dirname, '../public'));

let phone = 38456123984;
const app = express();
const  port=process.env.PORT || 3000;

// defined paths for express config
const publicDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '/templates/views');
const partialsPath=path.join(__dirname,'templates/partials');

//Setup for handlebars engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

console.log(viewPath);
//Setup static dircetory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather page',
        name: "Created by Amar Bugarin"
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: "Abot me ",
        text: "I am a full-stack developer ",
        name: "Created by Amar Bugarin"
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.grad){
   return res.send({
        error:'You must provide a search term '
    })
    }
   
    console.log(req.query.grad);
    
    res.send({
        products:[ ]
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
       helpText:'this is some helpful text',
        title: "Help page is here",
        paragraph: `Call this phone number:+${phone}`,
        name: "Created by Amar Bugarin"
    })
})






app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide a search term '
        })
        
    }
    geocode(req.query.address, (error, {langditude,longditude,location}={}) => {
        // Ako nalazi na error return pomaze da prekine ostatka async funckije posto nebi imalo smisla 
        if (error) {
           return res.send({error})
    
        }
        console.log('Error', error);
        //console.log('Data', data);
    
        forecast(langditude,longditude, (error, forcastData) => {
            if (error) {
             return res.send({error})
    
            }
                res.send({
                    weather: forcastData,
                  location,
                    address:req.query.address
                })
            
         
           
    
        })
    
    })

   
})

app.get('/help/*',(req,res)=>{
res.render('error',{
    title:"Artcile not found",
    paragraph:"Go here for more information "
})

})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        paragraph:'Page not found',
        name:"Created by Amar Bugarin"
        
    })

})



app.listen(port, () => {
    console.log("Server is  on port:"+port  );

})