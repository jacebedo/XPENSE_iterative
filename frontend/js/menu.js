
document.getElementById('addWallet').onclick = ()=>{
    var wallet = getWalletInputs();

    if (isValidWallet(wallet)){
      document.getElementById('walletForm').submit();
    } else {
      var err = getWalletErrorMsg(wallet);
      alert(err);
    }
};

document.getElementById('addExpense').onclick = ()=>{
  document.getElementById('expenseForm').submit();
};

function getWalletInputs(){
  var name = document.getElementById('walletName').value;
  var type = document.getElementById('walletType').value;
  var balance = document.getElementById('walletBalance').value;
  return [name,type,balance];

}

function isValidWallet(wallet) {
  if (wallet[0] == ""){
    return false;
  }
  if (wallet[1] === "") {
    return false;
  }
  if (parseFloat(wallet[2]) >= 1000000 || parseFloat(wallet[2]) < 0) {
    return false;
  }
  return true;
}

function getWalletErrorMsg(wallet) {
  var body = "The following inputs are invalid: \n"
  if (!wallet[0].match(/[A-Za-z ]{3,} /)){
    body += "- Wallet name (Must be a non-empty input). \n"
  }
  if (wallet[1] === "") {
    body += "- Wallet type (must be one of the three options available). \n"
  }
  if (wallet[2] === "") {
    body += "- Wallet balance (must be a positive value, less than $1,000,000.00).\n"
  }
  if (parseFloat(wallet[2]) >= 1000000 || parseFloat(wallet[2]) < 0) {
    console.log(wallet[2]);

    body += "- Wallet balance (must be a positive value, less than $1,000,000.00). \n"
  }
  return body;
}
