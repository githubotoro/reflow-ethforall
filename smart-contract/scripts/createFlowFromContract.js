const hre = require("hardhat");
const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers } = require("hardhat");
require("dotenv").config();
const ReflowABI = require("../artifacts/contracts/Reflow.sol/Reflow.json").abi;

async function main() {
	const reflowAddress = "0x85DA9B520f1C4C02c14C8Df7F4b9d9322708662B";
	const receiver = "0x17d6750A71F64DB7dd0C5A4C9321363cEB9Ea569";

	const provider = new hre.ethers.providers.JsonRpcProvider(
		process.env.ALCHEMY_POLYGON_MUMBAI_RPC_URL
	);

	const sf = await Framework.create({
		chainId: (await provider.getNetwork()).chainId,
		provider,
	});

	const signers = await hre.ethers.getSigners();

	const reflow = new ethers.Contract(reflowAddress, ReflowABI, provider);
	const daix = await sf.loadSuperToken(
		"0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f"
	);

	await reflow
		.connect(signers[0])
		.createFlowFromContract(
			daix.address,
			receiver,
			"385802469135",
			"385802469135"
		)
		.then(function (tx) {
			console.log(`Created flow from contract. Tx Hash: ${tx.hash}`);
		});
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
