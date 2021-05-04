const express = require('express')
const flatten = require('flat').flatten;

const app = express()
const port = 5000

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

const fs = require('fs');
const path = require('path');


let rawdata = fs.readFileSync(path.resolve(__dirname, './data.json'));
let data = JSON.parse(rawdata);

let flattened = (flatten(data,{delimiter: " "}));

app.get('/', (req, res) => {
    
  res.send('Hello World!')
})

app.get('/directories', (req, res) => {
    
    let result = [];
    for (var key of Object.keys(flattened)) {
        if(key==='type'){
            result.push("root");
        }
        else{
            if(flattened[key]==='&#34;dir&#34;'){
                let test_1 = key.split(" ");
                let name_dir = test_1[test_1.length - 2];
                result.push(name_dir+ " ");
            } 
        }
    };
    res.setHeader('Content-Type', 'application/json');
    res.send({'data':result})
  })

app.get('/path/:mypath', (req, res) => {
    let result_path = [];
    let mypath = req.params.mypath;
    console.log(mypath);
    var keys = Object.keys(flattened);
    if(mypath==='root'){
        var index = keys.indexOf('type');
        var j = keys[index+1];
        let i = 1;
        console.log(j);
        while(j.split(" ").length===3){
            if(flattened[j]==='&#34;dir&#34;'){
                let test_1 = j.split(" ");
                let name_dir = test_1[test_1.length - 2];
                result_path.push(name_dir+ " ");
            }else{
                let test_1 = j.split(" ");
                let name_file = test_1[test_1.length - 2];
                result.push("This is file: "+name_file+ " ");
            }
            j = keys[index+1+i];
            i++;
        }    
    }else{
        var index1 = keys.indexOf('type');
        var key = keys[index1+1];
        for (key of keys) {
            let test_name = key.split(" ");
            let testname_dir = test_name[test_name.length - 2];
                if(testname_dir===mypath){
                    var index2 = keys.indexOf(key);
                    console.log(index2);
                    var j1 = keys[index2+1];
                    let i1 = 1;
                    let len = j1.split(" ").length
                    while(index2+i1<keys.length&&j1.split(" ").length===len){
                        console.log(j1);
                        if(flattened[j1]==='&#34;dir&#34;'){
                            let test_2 = j1.split(" ");
                            let name_dir2 = test_2[test_2.length - 2];
                            result_path.push(name_dir2 + " ");
                        }else{
                            let test_2 = j1.split(" ");
                            let name_file2 = test_2[test_2.length - 2];
                            result_path.push("This is file: " +name_file2+" ");
                        }
                        j1 = keys[index2+i1+1];
                        i1++;
                    }
                    // else{
                    // }
                } 
            }
    }
    res.setHeader('Content-Type', 'application/json');
    res.send({'data':result_path})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})