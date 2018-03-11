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

app.get("/data/expenses.json", function(req,res){
  var expensepath = path.join(__dirname,"data","expenses.json");
  if (fs.existsSync(expensepath)){
      res.sendFile(expensepath);
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
    var expense = req.body;
    data.insertExpense(expense);
    data.depositExpense(expense.value,expense.wallet);
    res.send("Success!");

});

app.post('/add/walletBalance',function(req,res){
    var walletpath = path.join(__dirname,"data","wallets.json");
    console.log("Update request recieved for item: ");
    console.log(req.body);
    if (fs.existsSync(walletpath)){
        fs.readFile(walletpath,function(err,contents){
            var wallets = JSON.parse(contents.toString());
            for (item of wallets) {
                if (item.name === req.body.name){
                    console.log("found!");
                    var balance = parseFloat(item.balance);
                    balance += parseFloat(req.body.amount);
                    item.balance = balance.toFixed(2);
                    item.lastUpdate = req.body.lastUpdate;
                }

            }
            fs.writeFile(walletpath,JSON.stringify(wallets),function(err){
                if (err){
                    console.log("err");
                    throw err;
                }

            });
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
