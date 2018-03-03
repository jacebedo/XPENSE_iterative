$(document).ready(function(){
    /* Load Tables */
    $.getJSON("/data/wallets.json", function(data){
      for (i in data) {
        insertIntoWalletTable(data[i]);
      }

    });
    /* Load Expenses */

});


function insertIntoWalletTable(wallet){
  var body = "";
  body += `<tr class="wallet" id="wallet${i}">`;
  body += `<td> ${wallet.name} </td>`;
  body += `<td> ${parseFloat(wallet.balance).toFixed(2)} </td>`;
  body += `<td> ${wallet.type} </td>`;
  body += `</tr>`;
  $("table#walletTable > tbody").append(body);

}
