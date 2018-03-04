
$('#addWallet').click( function(){

  var wallet = get_wallet();
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
      setWalletListener(wallet);
      success_callback(data,status);
    },
    error: error_callback
  }
  return wallet_post_options;
}

function success_callback(data,status) {
    $("#walletModal").modal('hide');
  alert("You have successfully added a wallet!");
}

function error_callback(data,status) {
    $("#walletModal").modal('hide');

    alert("Server Error 5XX");
}

function insertIntoWalletTable(wallet){
  var body = "";
  body += `<tr class="wallet" id="${wallet.name.replace(/\ /g,"_")}">`;
  body += `<td> ${wallet.name} </td>`;
  body += `<td> ${parseFloat(wallet.balance).toFixed(2)} </td>`;
  body += `<td> ${wallet.type} </td>`;
  body += `</tr>`;
  $("table#walletTable > tbody").append(body);

}

function setWalletListener(wallet) {

    var wallets = [];
    $.getJSON("/data/wallets.json", function(data){
        for (item of data) {
            wallets.push(item);
        }
    });

    if (wallet == undefined) {
        $('tr.wallet').each(function() {

            $(this).click(function(){
                setWalletOverviewModal($(this).attr('id').replace(/_/g," "),wallets);
                $("#walletOverviewModal").modal();
            });
        });

    }
    else {
        $(`tr#${wallet.name.replace(/\ /g,"_")}`).click(function(){
            $('#walletOverviewModal').modal();
        });
    }



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

function setWalletOverviewModal(walletname,wallets) {
    var wallet = {};
    for (item of wallets) {
        if (item.name === walletname){
            wallet = item;
        }
    }
    $("#walletOverviewName").html(`<h1> Name: ${wallet.name} </h1>`);
    $("#walletOverviewType").html(`<h5> Type: ${wallet.type} </h5>`);
    $("#walletOverviewBalance").html(`<h5> Balance: ${parseFloat(wallet.balance).toFixed(2)} </h5>`);
    $("#walletOverviewIncrement").html(`<h5> Periodic Increment: ${parseFloat(wallet.increment).toFixed(2)} </h5>`);
    $("#walletOverviewLastUpdate").html(`<h5> Last Updated On: ${wallet.lastUpdate} </h5>`);

}
