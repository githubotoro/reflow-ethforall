const hre = require("hardhat");
const { Framework } = require("@superfluid-finance/sdk-core");
require("dotenv").config();

async function main() {
	const provider = new hre.ethers.providers.JsonRpcProvider(
		process.env.ALCHEMY_POLYGON_MUMBAI_RPC_URL
	);

	const sf = await Framework.create({
		chainId: (await provider.getNetwork()).chainId,
		provider,
	});

	const signers = await hre.ethers.getSigners();
	const Reflow = await hre.ethers.getContractFactory("Reflow");

	const reflow = await Reflow.deploy();

	await reflow.deployed();

	console.log("Reflow Contract has been deployed to: ", reflow.address);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
