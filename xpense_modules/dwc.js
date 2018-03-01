const fs = require('fs');

module.exports.createWalletChildren = function(walletpath) {
  var body = "";
  if (fs.existsSync(walletpath)) {
    var walletCollection = JSON.parse(fs.readFileSync(walletpath));

    for (i in walletCollection) {
      body += `<tr class="wallet" id="${i}">`;
      body += `<td> ${walletCollection[i].name} </td>`;
      body += `<td> ${walletCollection[i].balance} </td>`;
      body += `<td> ${walletCollection[i].type} </td>`;
      body += `</tr>`
    }
  }
  return body;
}
