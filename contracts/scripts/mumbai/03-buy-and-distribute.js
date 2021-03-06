const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const network = await hre.ethers.provider.getNetwork();
  console.log("executing in", network.name, network.chainId);

  const signer = await hre.ethers.provider.getSigner();
  console.log("executing with", await signer.getAddress());

  console.log("getting an instance of the contract");
  const dcaFactory = await hre.ethers.getContractFactory("DCAPool");
  const dcaContract = await dcaFactory.attach(
    "0x21Ef7C58AAEba58248DB4e420091B196FdC9e78F" // STABLEX/ENCX
  );

  // do something just to check that the contract is fetched
  console.log("just some call to check if we fetched the correct instance");
  let ret = await dcaContract._poolConfig();
  console.log("some return value", ret);

  ret = await dcaContract._uniswapPoolFee();
  console.log("some return value", ret);

  // call DCA's buyAndDistribute
  console.log("let's activate the swap and return the output to the investors");
  ret = await dcaContract.connect(signer).buyAndDistribute();
  console.log("return value", ret);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
