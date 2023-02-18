// import
// main function
// calling function

const { network } = require("hardhat");
const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  let ethUsdPriceFeedAddress;
  if (developmentChains.includes(network.name)) {
    const ehtUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ehtUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }

  // what happerns when we want to change chains?
  // when going for localhost or hardhat network we use a mock.

  const args = [ethUsdPriceFeedAddress];
  const fundMe = await deploy("FundMe", {
    contract: "FundMe",
    from: deployer,
    log: true,
    args: args, // put price feed address
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.EHERSCAN_API_KEY
  ) {
    await verify(fundMe.address, args);
    // verify
  }

  log("----------------------------------------");
};

module.exports.tags = ["all", "fundme"];
