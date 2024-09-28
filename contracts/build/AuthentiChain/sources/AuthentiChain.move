module 0x8d8862e603400092902b037caec23790f8d3c0b33e37e30efb5025984826dfb1::AuthentiChain {
    use 0x1::signer;

    struct Product has key, copy, drop, store {
        id: u64,
        serial_number: vector<u8>,
        manufacturer: address,
        owner: address,
        verified: bool,
        manufactured_at: u64,
    }

    public fun create_product(
        account: &signer,
        id: u64,
        serial_number: vector<u8>,
        manufactured_at: u64
    ) {
        let product = Product {
            id,
            serial_number,
            manufacturer: signer::address_of(account),
            owner: signer::address_of(account),
            verified: false,
            manufactured_at,
        };
        move_to(account, product);
    }

    public fun transfer_ownership(
        account: &signer,
        _product_id: u64,
        new_owner: address
    ) acquires Product {
        let product = borrow_global_mut<Product>(signer::address_of(account));
        assert!(product.owner == signer::address_of(account), 1);  // Only owner can transfer
        product.owner = new_owner;
    }

    public fun verify_product(
        account: &signer,
        _product_id: u64
    ) acquires Product {
        let product = borrow_global_mut<Product>(signer::address_of(account));
        assert!(product.manufacturer == signer::address_of(account), 2);  // Only manufacturer can verify
        product.verified = true;
    }

    public fun get_product_info(
        owner_address: address, // Add the owner's address as a parameter
        product_id: u64
    ): Product acquires Product {
        let product_ref = borrow_global<Product>(owner_address); // Use the address of the owner
        assert!(product_ref.id == product_id, 3); // Ensure the product_id matches
        return Product {
            id: product_ref.id,
            serial_number: product_ref.serial_number,
            manufacturer: product_ref.manufacturer,
            owner: product_ref.owner,
            verified: product_ref.verified,
            manufactured_at: product_ref.manufactured_at,
        } // Correctly returning the Product instance
    }
}
