const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static('frontend'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"/html","main.html"));
});

app.get(/.+\.html$/, (req, res) =>{
  var filepath = path.join(__dirname,"html",req.url).replace("?","");
  res.sendFile(filepath);
})

app.post('/add/wallet', function(req,res){
  var name = req.body.walletName;
  var type = req.body.walletType;
  var value = req.body.walletValue;
  res.send(`Wallet Name: ${name}, Wallet Type: ${type},Wallet Value: ${value}`);
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
