import React, { useState } from 'react';
import './App.css';
import { createProduct, verifyProduct, transferOwnership, getProductInfo } from './services/aptosService';

function App() {
    const [productId, setProductId] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [owner, setOwner] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateProduct = async () => {
        const response = await createProduct(productId, serialNumber);
        setMessage(response ? 'Product created!' : 'Error creating product.');
    };

    const handleVerifyProduct = async () => {
        const response = await verifyProduct(productId);
        setMessage(response ? 'Product verified!' : 'Error verifying product.');
    };

    const handleTransferOwnership = async () => {
        const response = await transferOwnership(productId, owner);
        setMessage(response ? 'Ownership transferred!' : 'Error transferring ownership.');
    };

    const handleGetProductInfo = async () => {
        const productInfo = await getProductInfo(productId);
        setMessage(productInfo ? `Product info: ${JSON.stringify(productInfo)}` : 'Error fetching product info.');
    };

    return (
        <div className="App">
            <h1>AuthentiChain</h1>
            <div>
                <input type="text" placeholder="Product ID" onChange={(e) => setProductId(e.target.value)} />
                <input type="text" placeholder="Serial Number" onChange={(e) => setSerialNumber(e.target.value)} />
                <button onClick={handleCreateProduct}>Create Product</button>
                <button onClick={handleVerifyProduct}>Verify Product</button>
                <input type="text" placeholder="New Owner Address" onChange={(e) => setOwner(e.target.value)} />
                <button onClick={handleTransferOwnership}>Transfer Ownership</button>
                <button onClick={handleGetProductInfo}>Get Product Info</button>
            </div>
            <p>{message}</p>
        </div>
    );
}

export default App;
