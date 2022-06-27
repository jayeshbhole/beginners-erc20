const HDWalletProvider = require("@truffle/hdwallet-provider");
const { POSClient, use } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-web3");
const secrets = require("./secrets.json");

use(Web3ClientPlugin);

const from = "0x0b90994F83D2Fde68f83C418141B42550dE2Cb4c";
const rootToken = "0xCF44F46451448057B8d902B9e956b887242d67d9";

const parentProvider = new HDWalletProvider(secrets.seed, "http://127.0.0.1:8545"); // Local Geth client address
const maticProvider = new HDWalletProvider(secrets.seed, secrets.mumbai); // DataHub Mumbai Testnet JSONRPC URL

// for mumbai testnet
const getPOSClient = async (network = "testnet", version = "mumbai") => {
  const posClient = new POSClient();

  await posClient.init({
    network: "testnet",
    version: "mumbai",
    parent: {
      provider: parentProvider,
      defaultConfig: {
        from: from,
      },
    },
    child: {
      provider: maticProvider,
      defaultConfig: {
        from: from,
      },
    },
  });
  return posClient;
};

(async () => {
  const client = await getPOSClient();
  const erc20RootToken = client.erc20(rootToken, true);
  // const parentERC20Token = maticPOSClient.erc20(rootToken, true);
  // const erc20Token = maticPOSClient.erc20(rootToken, true);

  try {
    const approveResult = await erc20RootToken.approve(1000);
    console.log("txHash", await approveResult.getTransactionHash());
    console.log("txReceipt", await approveResult.getReceipt());
    console.log(approveResult);

    // deposit 1000 to user address
    const depositResult = await erc20RootToken.deposit(100, from);
    console.log("txHash", await depositResult.getTransactionHash());
    console.log("txReceipt", await depositResult.getReceipt());
    console.log(depositResult);
  } catch (err) {
    console.log(err);
  }
})();
