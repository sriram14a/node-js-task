import express from "express"
import fs from "fs"

const API = express();
const PORT = 7000;

const datetime = function (){
    const dt = new Date();

    const date = ("0"+ dt.getDate()).slice(-2);

    const month = ("0"+ (dt.getMonth()+1)).slice(-2);

    const year = dt.getFullYear();

    const hours = dt.getHours();

    const minutes = dt.getMinutes();

    const seconds = dt.getSeconds();

    var output = date+"-"+month+"-"+year+"-"+hours+"-"+minutes+"-"+seconds;

    return output;
}


fs.writeFile(`./backup/currentDateTime.txt`,datetime(),()=>{
    console.log("txt file created in backup folder")
})




API.get('/time', function (req, res) {
    fs.readFile('./backup/currentDateTime.txt',(err, data)=> {
        if(err) throw err;
        var array = data.toString().split(" ");
        for(let i in array) {
            res.send(array[i]);
        }
     });
  })
  
  API.listen(PORT,()=> console.log(`server created on PORT ${PORT}`))