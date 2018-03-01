const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');
const scheduler = require('node-schedule');
const dwc = require("./xpense_modules/dwc.js");
const xpense_objects = require("./objects/objects.js");


app.use(express.static('frontend'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"/html","main.html"));
});

app.get(/.+\.html$/, (req, res) =>{
  var filepath = path.join(__dirname,"html",req.url);
  var walletpath = path.join(__dirname,"data","wallets.json");
  fs.readFile(filepath,(err,data)=>{
    const $ = cheerio.load(data.toString());
    var body = dwc.createWalletChildren(walletpath);
    $('table#walletTable > tbody').append(body);
    res.send($.html());
  });
})

// TODO: Refactor and clean functions
app.post('/add/wallet', function(req,res){
  var name = req.body.walletName;
  var type = req.body.walletType;
  var balance = req.body.walletBalance;
  var lastUpdate = new Date();
  var wallet = new xpense_objects.Wallet(name,type,balance,lastUpdate);
  var walletCollection = [];
  var filepath = path.join(__dirname,"data","wallets.json");
  if (!fs.existsSync(filepath)){
    walletCollection.push(wallet);
    fs.writeFile(filepath,JSON.stringify(walletCollection),()=>{
        res.send(`successfully written ${wallet.type} into wallets!`);
    });
  }
  else {
    fs.readFile(filepath,(err,data)=>{
      if (err)
        throw err;
      var walletCollection = JSON.parse(data.toString());
      walletCollection.push(wallet);
      fs.writeFile(filepath,JSON.stringify(walletCollection),()=>{
          res.send(`successfully written ${wallet} into wallets!`);
      });
    });
  }
});

app.post('/add/expense', function(req,res){
  var name = req.body.expenseName;
  var type = req.body.expenseType;
  var value = req.body.expenseValue;
  var wallet = req.body.expenseWallet;
  res.send(`Expense Name: ${name}, Expense Type: ${type},Expense Value: ${value}, Expense Wallet ${wallet}`);
});


app.listen(3000, () => console.log('Server has been initialized on port 3000!'));


/* Wallet Update: Wallet amount = Wallet amount +  ((Current Date - Last Updated)*Increment / Period) */
