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


$("#confirmAmount").click(function(){
    var name = $("#walletToAddBalanceTo").val();
    var amount = $("#valueToAdd").val();
    var body = {
        name: `${name}`,
        amount: `${amount}`
    }
    var options =
    {
        url: "/add/walletBalance",
        method: "post",
        success: addBalanceCallback,
        data: body
    }
    $.ajax(options);
})

function addBalanceCallback() {
    $("#addBalanceModal").modal("toggle");

    $("table#walletTable > tbody").html("");
    $.getJSON("/data/wallets.json", function(data){
    for (i in data) {
        insertIntoWalletTable(data[i]);
     }
     setWalletListener();
    });

}
