const fs = require('fs');
const path = require('path');

module.exports.insertWallet = function(wallet){
  var walletCollection = [];
  var filepath = path.join(__dirname,"../","data","wallets.json");

  if (!fs.existsSync(filepath)){
    walletCollection.push(wallet);

    fs.writeFile(filepath,JSON.stringify(walletCollection),(err)=>{
      if (err) {
        throw err;
      }
    });
  }
  else {
    fs.readFile(filepath,(err,data)=>{
      if (err)
        throw err;
      var walletCollection = JSON.parse(data.toString());
      walletCollection.push(wallet);
      fs.writeFile(filepath,JSON.stringify(walletCollection),(err)=>{
      });
    });
  }
  return;
}



// module.exports.getExpenses = function() {
//     var expensepath = path.join(__dirname,"../","data","expenses.json");
//     if (fs.existsSync(expensepath)){
//         var data = fs.readFileSync(expensepath);
//         return JSON.parse(data.toString());
//     }
// }


module.exports.insertExpense = function(expense) {
    var expenseCollection = [];
    var filepath = path.join(__dirname,"../","data","expenses.json");

    if (!fs.existsSync(filepath)){
        expenseCollection.push(expense);
        fs.writeFile(filepath,JSON.stringify(expenseCollection),(err)=>{
          if (err) {
            throw err;
          }
        });
    }

    else {
      fs.readFile(filepath,(err,data)=>{
        if (err)
          throw err;
        expenseCollection = JSON.parse(data.toString());
        expenseCollection.push(expense);
        fs.writeFile(filepath,JSON.stringify(expenseCollection),(err)=>{
        });
      });
    }
}


module.exports.depositExpense = function(amount,walletName){

    var walletpath = path.join(__dirname,"../","data","wallets.json");
    fs.readFile(walletpath, function(err,data){
        var walletCollection = JSON.parse(data.toString());
        var targetWallet = "";
        for (wallet of walletCollection){
            if (wallet.name == walletName) {
                targetWallet = wallet;
            }
        }

        targetWallet.balance -= parseFloat(amount);
        fs.writeFile(walletpath,JSON.stringify(walletCollection),function(err){
            if (err) { throw err; }
        });

    });
};
