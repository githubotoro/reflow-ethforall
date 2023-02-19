require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

module.exports = {
	solidity: "0.8.14",
	settings: {
		optimizer: {
			enabled: true,
		},
	},
	networks: {
		mumbai: {
			url: `${process.env.ALCHEMY_POLYGON_MUMBAI_RPC_URL}`,
			accounts: [`0x${process.env.DEPLOYER_PRIVATE_KEY}`],
		},
	},
	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY,
	},
};
