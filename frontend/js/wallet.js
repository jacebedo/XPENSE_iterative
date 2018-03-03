
$('#addWallet').click( function(){

  var wallet = get_wallet();
  console.log(wallet);
  if (is_valid_wallet(wallet)){
    var wallet_post_options = get_wallet_post_options(wallet);
    $.ajax(wallet_post_options);
  }
  else {
    var err = generate_wallet_err_msg(wallet);
    alert(err);
  }

});



function get_wallet(){
  var name = $('#walletName').val();
  var type = $('#walletType').val();
  var balance = $('#walletBalance').val();
  var increment = balance;
  var lastUpdate = new Date(); // Current Date
  return new Wallet(name,type,balance,increment,lastUpdate);
}

function get_wallet_post_options(wallet) {
  var wallet_post_options = {
    url: "/add/wallet",
    method: "post",
    data: wallet,
    success: function(data,status){
      insertIntoWalletTable(wallet);
      success_callback(data,status);
    },
    error: error_callback
  }
  return wallet_post_options;
}

function success_callback(data,status) {
  alert("You have successfully added a wallet!");
  
}
function error_callback(data,status) {
  alert("Server Error 5XX");
}

function is_valid_wallet(wallet) {
  if (wallet.name === ""){
    return false;
  }
  if (wallet.type === "") {
    return false;
  }
  if (parseFloat(wallet.balance) >= 1000000 || parseFloat(wallet.balance) < 0) {
    return false;
  }
  return true;
}

function generate_wallet_err_msg(wallet) {
  var body = "The following inputs are invalid: \n"
  if (!wallet.name.match(/[A-Za-z ]{3,} /)){
    body += "- Wallet name (Must be a non-empty input). \n"
  }
  if (wallet.type === "") {
    body += "- Wallet type (must be one of the three options available). \n"
  }
  if (wallet.balance === "") {
    body += "- Wallet balance (must be a positive value, less than $1,000,000.00).\n"
  }
  if (parseFloat(wallet.balance) >= 1000000 || parseFloat(wallet.balance) < 0) {

    body += "- Wallet balance (must be a positive value, less than $1,000,000.00). \n"
  }
  return body;
}
