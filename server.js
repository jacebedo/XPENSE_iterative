const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');
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
  // var walletCollection = data.getWalletCollection();
  var walletpath = path.join(__dirname,"data","wallets.json");
  res.sendFile(walletpath);
});


// TODO: Refactor and clean functions
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




scheduler.scheduleJob('0 0 0 * * * ',function() {
  updateWalletBalances();
});


app.listen(3000, () => {
  updateWalletBalances();
  console.log('Server has been initialized on port 3000!')
});


/* Wallet Update: Wallet amount = Wallet amount +  ((Current Date - Last Updated)*Increment / Period) */
