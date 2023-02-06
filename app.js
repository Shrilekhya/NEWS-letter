const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get('/',function(reque,resp){
    resp.sendFile(__dirname + "/index.html");
})

app.post('/',function(reque,resp){

    const firstName = reque.body.fName;
    const lastName = reque.body.lName;
    const email = reque.body.email;

    console.log(firstName , lastName , email) ;

    const data ={
        members:[
            {
                email_address:email ,
                status : "subscribed" ,
                merge_fields :{
                    FNAME : firstName ,
                    LNAME : lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/f7dca033d4" ;

    const options ={
        method : "POST" ,
        auth : "sasi:d48fb6fcfb289a4e0136b1769f4b5e6d-us21"

    };
    const request=https.request(url,options,function(response){

        if(response.statusCode === 200){
            resp.sendFile(__dirname + "/success.html");
        }
        else{
            resp.sendFile(__dirname + "/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure",function(reque,response){
    response.redirect("/");
});

app.listen(3000,function(){
    console.log("Server initiated");
});

// d48fb6fcfb289a4e0136b1769f4b5e6d-us21  api
//  f7dca033d4  audience 