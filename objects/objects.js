module.exports.Wallet = function(name,type,balance,increment,lastUpdate) {
  this.name = name;
  this.type = type;
  this.balance = balance;
  this.increment = increment;
  this.lastUpdate = lastUpdate;
  this.addBalance = function(amount){
    this.balance += amount;
  }
}
