module.exports.User = (name,value,type,wallet,date) => {
  this.name = name;
  this.value = value;
  this.type = type;
  this.wallet = wallet;
  this.date = date;
}


module.exports.addExpense = (expenseCollection,expense) => {
  expenseCollection.push(expense);
}
