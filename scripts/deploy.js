const { AptosClient, AptosAccount, FaucetClient } = require("aptos");
const fs = require("fs").promises;
const path = require("path");

// Aptos Testnet Fullnode and Faucet
const NODE_URL = "http://127.0.0.1:8080/";
const FAUCET_URL = "http://127.0.0.1:8081/";

async function deployContract() {
  const client = new AptosClient(NODE_URL);
  const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);
  const account = new AptosAccount();

  // Fund the account using the faucet (Devnet only)
  await faucetClient.fundAccount(account.address(), 50000);

  // Read and compile the Move module (contract)
  const bytecode = await fs.readFile(
    path.join(__dirname,
      "../contracts/build/AuthentiChain/bytecode_modules/AuthentiChain.mv"
    )
  );
  if (!bytecode || bytecode.length === 0) {
    throw new Error("Bytecode is empty or not read correctly.");
  }

  const payload = {
    type: "module_payload",
    modules: [bytecode.toString("hex")],
  };

  try {
    console.log("Payload Type:", payload.type);
    console.log("Modules:", payload.modules);
    console.log("Account Address:", account.address().toString());
    const txnRequest = await client.generateTransaction(
      account.address(),
      payload
    );
    const signedTxn = await client.signTransaction(account, txnRequest);
    const res = await client.submitTransaction(signedTxn);
    await client.waitForTransaction(res.hash);
    console.log("Contract deployed successfully:", res.hash);
  } catch (error) {
    console.error("Error deploying contract:", JSON.stringify(error, null, 2));
    console.error(error.stack); // Log the stack for more details
  }
}

deployContract().catch(console.error);
