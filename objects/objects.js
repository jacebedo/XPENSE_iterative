module.exports.Wallet = function(name,type,balance) {
  this.name = name;
  this.type = type;
  this.balance = balance;

  this.addBalance = function(amount){
    this.balance += amount;
  }
}
