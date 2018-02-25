console.log("Menu script executing!");

document.getElementById('addWallet').onclick = ()=>{
  document.getElementById('walletForm').submit();
};

document.getElementById('addExpense').onclick = ()=>{
  document.getElementById('expenseForm').submit();
};
