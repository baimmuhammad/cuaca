const express = require("express");
const https = require("https");
const bodyParser= require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req,res){

    res.sendFile(__dirname + "/index.html");
    

});

app.post("/", function(req,res){

   // console.log(req.body.cityName);
    //console.log("Post Request Received");
        // single atau const url tunggal
    //const url = "https://api.openweathermap.org/data/2.5/weather?q=depok&appid=3b899b63f95ac817e258f2481bc7495e&units=metric"
    
    // buat url dibagi beberapa const
    //const query ="London";
    const query=req.body.cityName;
    const apiKey="3b899b63f95ac817e258f2481bc7495e";
    const units="metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units+""

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
           // console.log(data);
           const weatherData= JSON.parse(data)
           //memparsing semua data dari app jason
           //console.log(weatherData);

           //memparsing data temp(temperatur) posisi nya dibawah main
           const temp = weatherData.main.temp
          // console.log(temp);
          const weatherDescription = weatherData.weather[0].description 
          //console.log(weatherDescription);
          const city = weatherData.name

          //menampilkan icon
          const icon = weatherData.weather[0].icon
          const imageURL ="http://openweathermap.org/img/wn/" + icon + "@2x.png"

          //menampilkan di browser dengan res.send
          //res.send("Suhu saat ini adalah" + temp + "derajat celcius")

          //bisa juga menampilkan dengan res.write bila kombinasi dengan html tag
          res.write("<h1> " + query + "");
          res.write("<h1> Suhu "+ query +" saat ini adalah " + temp + " derajat celcius");
          res.write("<h2> Description: " + weatherDescription);
          res.write("<img src=" + imageURL +" >");
          res.send()
        })
    })
   // hanya boleh satu res.send
    //res.send("Server is up and running")


})



app.listen(3000,function(){
    console.log("Server is running on port 3000");
})