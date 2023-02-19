const hre = require("hardhat");
const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers } = require("hardhat");
require("dotenv").config();
const ReflowABI = require("../artifacts/contracts/Reflow.sol/Reflow.json").abi;

async function main() {
	const reflowAddress = "0xc895Fb58F8D19583fDD5Bbebe17925bd541f67aB";

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

	const aclApproval = daix.updateFlowOperatorPermissions({
		flowOperator: reflow.address,
		flowRateAllowance: "3858024691358024",
		permissions: 7,
	});

	await aclApproval.exec(signers[0]).then(function (tx) {
		console.log(`Reflow is now a flow operator. Tx Hash: ${tx.hash}`);
	});
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
