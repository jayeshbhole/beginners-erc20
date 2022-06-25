const hre = require("hardhat");

try {
  hre
    .run("verify:verify", {
      address: "0xCF44F46451448057B8d902B9e956b887242d67d9",
      contract: "contracts/YayToken.sol:YayToken",
      constructorArguments: [
        hre.ethers.BigNumber.from(10)
          .pow(9 + 18)
          .toString(),
      ],
    })
    .then(() => {
      console.log("Contract verified successfully");
    });
} catch (error) {
  if (error.name !== "NomicLabsHardhatPluginError") {
    console.error(`Error verifying: ${error.name}`);
    console.error(error);
  } else {
    throw error;
  }
}
