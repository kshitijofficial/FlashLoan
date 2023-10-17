const { network, ethers } = require("hardhat");

const fundToken = async (contract, sender, recepient, amount,decimals) => {
  const FUND_AMOUNT = ethers.utils.parseUnits(amount, decimals);
  // fund erc20 token to the contract
  const whale = await ethers.getSigner(sender);

  const contractSigner = contract.connect(whale);
  await contractSigner.transfer(recepient, FUND_AMOUNT);
};

const fundContract = async (contract, sender, recepient, amount,decimals) => {
  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [sender],
  });

  // fund baseToken to the contract
  await fundToken(contract, sender, recepient, amount,decimals);
  await network.provider.request({
    method: "hardhat_stopImpersonatingAccount",
    params: [sender],
  });
};

module.exports = {
    fundContract: fundContract,
};
