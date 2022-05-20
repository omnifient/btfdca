const hre = require("hardhat");

const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers, web3 } = require("hardhat");
const daiABI = require("../abis/fDAIABI");

const deployFramework = require("@superfluid-finance/ethereum-contracts/scripts/deploy-framework");
const deployTestToken = require("@superfluid-finance/ethereum-contracts/scripts/deploy-test-token");
const deploySuperToken = require("@superfluid-finance/ethereum-contracts/scripts/deploy-super-token");

const errorHandler = (err) => {
  if (err) throw err;
};

async function mintDaixTo(dai, daix, signer, account) {
  console.log("minting dai/x to", account.address);

  // mint dai to account
  await dai
    .connect(signer)
    .mint(account.address, ethers.utils.parseEther("10000"));
  console.log("dai minted");

  await dai
    .connect(account)
    .approve(daix.address, ethers.utils.parseEther("10000"));
  console.log("approving dai usage");

  const daixUpgradeOperation = daix.upgrade({
    amount: ethers.utils.parseEther("10000"),
  });
  await daixUpgradeOperation.exec(account);
  console.log("dai upgraded to daix");

  const daiBal = await daix.balanceOf({
    account: account.address,
    providerOrSigner: signer,
  });
  console.log("daix bal for acct: ", daiBal);
}

async function main() {
  const provider = web3;
  const accounts = await ethers.getSigners();

  // --------------------------------------------------------------------------
  // DEPLOY THE FRAMEWORK
  // --------------------------------------------------------------------------
  await deployFramework(errorHandler, {
    web3,
    from: accounts[0].address,
  });

  // --------------------------------------------------------------------------
  // DEPLOY THE TOKENS
  // --------------------------------------------------------------------------
  // deploy a fake erc20 token
  await deployTestToken(errorHandler, [":", "fDAI"], {
    web3,
    from: accounts[0].address,
  });
  // deploy a fake erc20 wrapper super token around the fDAI token
  await deploySuperToken(errorHandler, [":", "fDAI"], {
    web3,
    from: accounts[0].address,
  });

  // TODO: deploy another fake erc20 token and a wrapper

  // --------------------------------------------------------------------------
  // initialize the superfluid framework...put custom and web3 only bc we are using hardhat locally
  // --------------------------------------------------------------------------
  const sf = await Framework.create({
    networkName: "custom",
    provider,
    dataMode: "WEB3_ONLY",
    resolverAddress: process.env.RESOLVER_ADDRESS, // this is how you get the resolver address
    protocolReleaseVersion: "test",
  });

  // --------------------------------------------------------------------------
  // MINT TOKENS TO ACCOUNTS
  // --------------------------------------------------------------------------
  // use the framework to get the super toen
  const daix = await sf.loadSuperToken("fDAIx");
  // get the contract object for the erc20 token
  const daiAddress = daix.underlyingToken.address;
  const dai = new ethers.Contract(daiAddress, daiABI, accounts[0]);
  // mint daix tokens to accounts
  await mintDaixTo(dai, daix, accounts[0], accounts[0]);
  await mintDaixTo(dai, daix, accounts[0], accounts[1]);
  await mintDaixTo(dai, daix, accounts[0], accounts[2]);

  // --------------------------------------------------------------------------
  // DEPLOY THE DCA CONTRACT
  // --------------------------------------------------------------------------
  console.log("deploying DCA");
  const DCA = await hre.ethers.getContractFactory("DCA");
  const dca = await DCA.deploy(
    sf.settings.config.hostAddress,
    sf.settings.config.cfaV1Address,
    sf.settings.config.idaV1Address,
    daix.address, // process.env.MUMBAI_MATICX, // source token
    daix.address, // process.env.MUMBAI_WETHX, // target token
    "",
    process.env.MUMBAI_UNISWAP_ROUTER, // uniswap router
    process.env.MUMBAI_UNISWAP_MATICWETH_POOL_FEE // uniswap pool fee
  );
  await dca.deployed();
  console.log("DCA deployed to:", dca.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});