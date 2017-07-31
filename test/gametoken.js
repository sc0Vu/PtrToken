var GameToken = artifacts.require("./GameToken.sol");

contract('GameToken', function(accounts) {
  var firstAccount = accounts[0];
  var secondAccount = accounts[1];
  var thirdAccount = accounts[2];

  it("should put 10000 GameToken in the first account", function() {
    var token;

    return GameToken.new(10000, 'Game Token', 1, 'GT', {from: firstAccount}).then(function(instance) {
      token = instance;

      return token.balanceOf.call(firstAccount);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "10000 Game Token wasn't in the first account");
    });
  });

  it("should transfer 100 GameToken to the second account using transfer", function() {
    var token;

    return GameToken.new(10000, 'Game Token', 1, 'GT', {from: firstAccount}).then(function(instance) {
      token = instance;

      return token.transfer(secondAccount, 100, {from: firstAccount});
    }).then(function() {
      return token.balanceOf.call(secondAccount);
    }).then(function (balance) {
      assert.equal(balance.valueOf(), 100, "100 Game Token wasn't in the second account");
    });
  });

  it("should approve third account to spend 100 GameToken from first account", function() {
    var token;

    return GameToken.new(10000, 'Game Token', 1, 'GT', {from: firstAccount}).then(function(instance) {
      token = instance;

      return token.approve(thirdAccount, 100, {from: firstAccount});
    }).then(function() {
      return token.allowance.call(firstAccount, thirdAccount);
    }).then(function (balance) {
      assert.equal(balance.valueOf(), 100, "100 Game Token wasn't approved to the third account");
    });
  });

  it("should transfer 100 GameToken to the second account using transferFrom", function() {
    var token;

    return GameToken.new(10000, 'Game Token', 1, 'GT', {from: firstAccount}).then(function(instance) {
      token = instance;

      return token.approve(thirdAccount, 100, {from: firstAccount});
    }).then(function () {
      return token.transferFrom(firstAccount, secondAccount, 100, {from: thirdAccount});
    }).then(function() {
      return token.balanceOf.call(secondAccount);
    }).then(function (balance) {
      assert.equal(balance.valueOf(), 100, "100 Game Token wasn't in the second account");
    });
  });
});
