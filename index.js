const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const request=require("request");
app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
});



app.post("/",function(req,res){
    var crypto=req.body.crypto;
    var fait=req.body.fait;
    var quantity=req.body.amount;
    //console.log(from+to);

    options={
        url:"https://apiv2.bitcoinaverage.com/convert/global",
        method:"GET",
        qs:{
            from:crypto,
            to:fait,
            amount:quantity
        }
    };

    request(options, function (error, response, body) {
       if (!error || response.statusCode == 200) {

            var data=JSON.parse(body);
            res.write("<h5>The current time is"+data.time+"</h5>");
            res.write("<h1>"+quantity+crypto+" is "+data.price+" "+fait+"</h1>");
            res.send();

          //console.log(body); // Show the HTML for the Google homepage. 
        }
        else{
            console.log(response.statusCode);
        }
      });
});
app.listen(3000,function(){
console.log("On port 3000");
});

