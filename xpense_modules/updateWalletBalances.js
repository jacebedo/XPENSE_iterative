const fs =  require('fs');
const path = require('path');

module.exports = function() {
  var walletpath = path.join(__dirname,"data","wallets.json");
  if (fs.existsSync(walletpath)) {
    fs.readFile(walletpath,function(err,data){
      if (err) {
        throw err;
      }
      var wallets = JSON.parse(data.toString());
      for (wallet of wallets) {
          updateWallet(wallet);
        }

    });
  }
}

function updateWallet(wallet){
  var currentDate = new Date();
  var last_update_in_days = Math.round((currentDate - wallet.lastUpdate) * 86,400,000);

  if (wallet.type === "weekly" && (last_update_in_days / 7) >= 1) {
    var weeks_elapsed_since_update = Math.floor(last_update_in_days);
    wallet.balance += (weeks_elapsed_since_update + wallet.increment);
    wallet.lastUpdate = currentDate;
  }

  if (wallet.type === "monthly" && (last_update_in_days / 30) >= 1) {
    var months_elapsed_since_update = Math.floor(last_update_in_days);
    wallet.balance += (months_elapsed_since_update + wallet.increment);
    wallet.lastUpdate = currentDate;
  }
}
