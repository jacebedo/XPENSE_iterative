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

module.exports.getWalletCollection = function() {
  var filepath = path.join(__dirname,"../","data","wallets.json");
  if (fs.existsSync(filepath)){
    fs.readFile(filepath,(err,data)=>{
      if (err)
        throw err;
      var walletCollection = JSON.parse(data.toString());
      return walletCollection;
    });
  }


}
