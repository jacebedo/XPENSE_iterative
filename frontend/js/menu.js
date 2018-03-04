$(document).ready(function(){
    /* Load Tables */
    $.getJSON("/data/wallets.json", function(data){
      for (i in data) {
        insertIntoWalletTable(data[i]);
      }
      setWalletListener();
    });
    /* Load Expenses */

});
