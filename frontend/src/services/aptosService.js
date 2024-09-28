import { AptosClient, AptosAccount } from 'aptos';

const client = new AptosClient('https://fullnode.devnet.aptoslabs.com/v1');

// Initialize an Aptos account (use an actual wallet for production)
const account = new AptosAccount();

export async function createProduct(productId, serialNumber) {
    try {
        const payload = {
            type: 'entry_function_payload',
            function: 'AuthentiChain::ProductManager::create_product',
            arguments: [productId, serialNumber, Date.now().toString()],
            type_arguments: [],
        };
        const txnRequest = await client.generateTransaction(account.address(), payload);
        const signedTxn = await client.signTransaction(account, txnRequest);
        const res = await client.submitTransaction(signedTxn);
        await client.waitForTransaction(res.hash);
        return true;
    } catch (e) {
        console.error('Error creating product:', e);
        return false;
    }
}

export async function verifyProduct(productId) {
    try {
        const payload = {
            type: 'entry_function_payload',
            function: 'AuthentiChain::ProductManager::verify_product',
            arguments: [productId],
            type_arguments: [],
        };
        const txnRequest = await client.generateTransaction(account.address(), payload);
        const signedTxn = await client.signTransaction(account, txnRequest);
        const res = await client.submitTransaction(signedTxn);
        await client.waitForTransaction(res.hash);
        return true;
    } catch (e) {
        console.error('Error verifying product:', e);
        return false;
    }
}

export async function transferOwnership(productId, newOwnerAddress) {
    try {
        const payload = {
            type: 'entry_function_payload',
            function: 'AuthentiChain::ProductManager::transfer_ownership',
            arguments: [productId, newOwnerAddress],
            type_arguments: [],
        };
        const txnRequest = await client.generateTransaction(account.address(), payload);
        const signedTxn = await client.signTransaction(account, txnRequest);
        const res = await client.submitTransaction(signedTxn);
        await client.waitForTransaction(res.hash);
        return true;
    } catch (e) {
        console.error('Error transferring ownership:', e);
        return false;
    }
}

export async function getProductInfo(productId) {
    try {
        const payload = {
            type: 'entry_function_payload',
            function: 'AuthentiChain::ProductManager::get_product_info',
            arguments: [productId],
            type_arguments: [],
        };
        const txnRequest = await client.generateTransaction(account.address(), payload);
        const signedTxn = await client.signTransaction(account, txnRequest);
        const res = await client.submitTransaction(signedTxn);
        const productInfo = await client.waitForTransaction(res.hash);
        return productInfo;
    } catch (e) {
        console.error('Error fetching product info:', e);
        return null;
    }
}
