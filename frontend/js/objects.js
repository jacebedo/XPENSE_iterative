var Wallet = function(name,type,balance,increment,lastUpdate) {
  this.name = name;
  this.type = type;
  this.balance = balance;
  this.increment = increment;
  this.lastUpdate = lastUpdate;

}

var Expense = function(name,value,type,wallet,lastUpdate) {
    this.name = name;
    this.value = value;
    this.type = type;
    this.wallet = wallet;
    this.lastUpdate = lastUpdate;
}
