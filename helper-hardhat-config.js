const networkConfig = {
  5: {
    name: "goerli",
    ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
  },
  137: {
    name: "polygon",
    ethUsdPriceFeed: "0x5d37E4b374E6907de8Fc7fb33EE3b0af403C7403",
  },
};

const developmentChains = ["hardhat", "localhost"];
const DECIMALS = 8;
const INTIAL_ANSWER = 200000000000;

module.exports = { networkConfig, developmentChains, DECIMALS, INTIAL_ANSWER };
