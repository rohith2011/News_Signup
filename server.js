const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https= require("https");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public')); 

app.get("/",function(request,response){
    response.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    var hi=req.body.fname;
    var hi2=req.body.lname;
    var hi3=req.body.email;
    console.log(hi,hi2,hi3);

    var data={
        members:[
            {
                email_address:hi3,
                status:"subscribed",
                merge_fields:{
                    FNAME:hi,
                    LNAME:hi2
                },
                vip:true
            }
    ]
    };

    var JSONdata=JSON.stringify(data);

    const url="https://us18.api.mailchimp.com/3.0/lists/6db87562f7";
    const options={
        method:"POST",
        auth:"rahul:eacf5326517cc982fef4e6c108b94058-us18"
    };

    const request=https.request(url, options , function(response){

        if(response.statusCode === 200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
            
        })
    });

    request.write(JSONdata);
    request.end();
})

app.post("/failure",function(req,res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000,function(){
    console.log("server running on 3000!!!");
});

//end