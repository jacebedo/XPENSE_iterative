module.exports.Wallet = function(name,type,balance,lastUpdate) {
  this.name = name;
  this.type = type;
  this.balance = balance;
  this.lastUpdate = lastUpdate
  this.addBalance = function(amount){
    this.balance += amount;
  }
}
