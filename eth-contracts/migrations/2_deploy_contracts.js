// migrating the appropriate contracts
var CustomVerifier = artifacts.require("./CustomVerifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function(deployer) {
  // need to enforce one deploy after the other
  deployer.deploy(CustomVerifier).then(() => {
    return deployer.deploy(SolnSquareVerifier, CustomVerifier.address);
  });
};
