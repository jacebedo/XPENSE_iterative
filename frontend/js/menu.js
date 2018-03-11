$(document).ready(function(){
    $('#walletTable > tbody').empty();
    $('#expensesTable > tbody').empty();
    /* Load Tables */
    $.getJSON("/data/wallets.json", function(data){
      for (i in data) {
        insertIntoWalletTable(data[i]);
      }
      setWalletListener();
    });
    /* Load Expenses */
    $.getJSON("/data/expenses.json", function(data){
      for (i in data) {
        insertIntoExpenseTable(data[i]);
      }
    });

});


$("#confirmAmount").click(function(){
    var date = new Date();
    var name = $("#walletToAddBalanceTo").val();
    var amount = $("#valueToAdd").val();
    var body = {
        name: `${name}`,
        amount: `${parseFloat(amount).toFixed(2)}`,
        lastUpdate: `${date}`
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
