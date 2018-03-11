$('#openExpenseModal').click(function(){
    $('#expenseWallet').empty();

    $.getJSON("/data/wallets.json", function(data){
        for (wallet of data) {
            $('#expenseWallet').append($('<option>').html(`${wallet.name}`));
        }
    });
});


$('#addExpense').click(function(){
    var expense = getExpense();
    var options = {
      url: "/add/expense/",
      method: "post",
      data: expense,
      success: function(){
          $('#expenseModal').modal("toggle");
          insertIntoExpenseTable(expense);
          updateWalletsTable();
      }
    }

    $.ajax(options);

});

function insertIntoExpenseTable(expense){
    body = "";
    body += `<tr class="wallet" id="${expense.name.replace(/\ /g,"_")}">`;
    body += `<td> ${expense.name} </td>`;
    body += `<td> ${expense.value} </td>`;
    body += `<td> ${expense.type} </td>`;
    body += `<td> ${expense.wallet} </td>`;
    body += `<td> ${extractDate(expense.lastUpdate)} </td>`;
    body += "</tr>";
    $("#expensesTable > tbody").append(body);
}

function extractDate(date){
    var ddmmyyyy = new Date(date);
    return (`${ddmmyyyy.getDate()} / ` + `${ddmmyyyy.getMonth() + 1 } / ` + `${ddmmyyyy.getFullYear()}`);
}

function getExpense() {
    var name = $('#expenseName').val();
    var value = parseFloat($('#expenseValue').val()).toFixed(2);
    var type = $('#expenseType').val();
    var wallet = $('#expenseWallet').val();
    var lastUpdate = new Date(); // Current Date
    return new Expense(name,value,type,wallet,lastUpdate);
}

function updateWalletsTable() {
    $('#walletTable > tbody').empty();
    $.getJSON("/data/wallets.json", function(data){
      for (i in data) {
        insertIntoWalletTable(data[i]);
      }
      setWalletListener();
    });
}
