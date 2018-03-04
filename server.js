const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const scheduler = require('node-schedule');
const data = require("./xpense_modules/data.js")
const updateWalletBalances = require('./xpense_modules/updateWalletBalances.js');
const xpense_objects = require("./objects/objects.js");


app.use(express.static('./html'));
app.use(express.static('frontend'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/",express.static('./html', {index: "main.html"}));

app.get("/data/wallets.json", function(req,res){
  var walletpath = path.join(__dirname,"data","wallets.json");
  if (fs.existsSync(walletpath)){
      res.sendFile(walletpath);
  }
  else {
      res.send("");
  }
});


app.post('/add/wallet', function(req,res){
  var wallet = req.body;
  data.insertWallet(wallet);
  res.send("Success!");
});

app.post('/add/expense', function(req,res){
  var name = req.body.expenseName;
  var type = req.body.expenseType;
  var value = req.body.expenseValue;
  var wallet = req.body.expenseWallet;
  res.send(`Expense Name: ${name}, Expense Type: ${type},Expense Value: ${value}, Expense Wallet ${wallet}`);
});

app.post('/add/walletBalance',function(req,res){
    var walletpath = path.join(__dirname,"data","wallets.json");
    console.log("Update request recieved!");
    if (fs.existsSync(walletpath)){
        fs.readFile(walletpath,function(err,contents){
            var wallets = JSON.parse(contents.toString());
            for (item of wallets) {
                if (item.name === req.body.name){
                    var balance = parseFloat(item.balance);
                    balance += parseFloat(req.body.amount);
                    item.balance = (balance.toString());
                    item.lastUpdate = new Date();
                    
                }
            fs.writeFile(walletpath,JSON.stringify(wallets),function(err){
                if (err){
                    console.log("err");
                    throw err;
                }

            });
            }
            res.send("SUCCESS!");
        });
    }
});

scheduler.scheduleJob('0 0 0 * * * ',function() {
  updateWalletBalances();
});


app.listen(3000, () => {
  updateWalletBalances();
  console.log('Server has been initialized on port 3000!')
});


/* Wallet Update: Wallet amount = Wallet amount +  ((Current Date - Last Updated)*Increment / Period) */
