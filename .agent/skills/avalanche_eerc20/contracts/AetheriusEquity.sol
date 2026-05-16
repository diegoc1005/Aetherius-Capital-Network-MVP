// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Interfaces for eERC20 Architecture Components based on Avalanche guidelines

/**
 * @title IRegistrar
 * @dev Registrar manages auditor keys and permissions for decryption (AML/KYC compliance).
 */
interface IRegistrar {
    /**
     * @notice Registers a new auditor public key.
     * @param auditor Address of the auditor.
     * @param publicKey The public key used to grant decryption permissions.
     */
    function registerAuditorKey(address auditor, bytes calldata publicKey) external;
}

/**
 * @title IEncryptedERC
 * @dev Encrypted balance storage and zero-knowledge transfer verification using Groth16 proofs.
 */
interface IEncryptedERC {
    // Defines core methods for encrypted balance tracking
    function encryptedTransfer(bytes calldata encryptedAmount, bytes calldata zkProof) external returns (bool);
    function getEncryptedBalance(address account) external view returns (bytes memory);
}

/**
 * @title AetheriusEquity
 * @dev Represents fractional shares of private equity of startups using eERC20.
 * Operates in "Standalone Mode" so all balances and transfers are encrypted end-to-end.
 * Uses Groth16 for proof generation and verification (gas-efficient on Avalanche L1s).
 */
contract AetheriusEquity {
    address public owner;
    IRegistrar public registrar;
    IEncryptedERC public encryptedStorage;

    string public name;
    string public symbol;

    // Emitted when an auditor's public key is registered/rotated
    event AuditorKeyRegistered(address indexed auditor, bytes publicKey);

    modifier onlyOwner() {
        require(msg.sender == owner, "AetheriusEquity: caller is not the owner");
        _;
    }

    /**
     * @param _name Name of the equity token
     * @param _symbol Symbol of the equity token
     * @param _registrar Address of the eERC20 Registrar contract
     * @param _encryptedStorage Address of the EncryptedERC storage contract
     */
    constructor(
        string memory _name,
        string memory _symbol,
        address _registrar,
        address _encryptedStorage
    ) {
        owner = msg.sender;
        name = _name;
        symbol = _symbol;
        registrar = IRegistrar(_registrar);
        encryptedStorage = IEncryptedERC(_encryptedStorage);
    }

    /**
     * @notice Registers the rotating public key of an Auditor on the Registrar contract.
     * @dev This is for future integration with Wavy Node. It grants decryption permissions to
     * external auditors (AuditorManager) for AML/KYC compliance scenarios.
     * @param auditor The address of the auditor.
     * @param publicKey The new rotating public key.
     */
    function registerAuditorPublicKey(address auditor, bytes calldata publicKey) external onlyOwner {
        registrar.registerAuditorKey(auditor, publicKey);
        emit AuditorKeyRegistered(auditor, publicKey);
    }

    /**
     * @notice Executes an encrypted transfer of fractional private equity shares.
     * @dev Leverages "Standalone Mode" to ensure the total supply and individual balances 
     * remain completely private. The ZK proof (Groth16) validates the state transition without 
     * revealing the transferred amount.
     * @param encryptedAmount The FHE-encrypted transfer amount.
     * @param zkProof The Groth16 zero-knowledge proof.
     */
    function transferEncrypted(bytes calldata encryptedAmount, bytes calldata zkProof) external returns (bool) {
        return encryptedStorage.encryptedTransfer(encryptedAmount, zkProof);
    }

    /**
     * @notice Retrieves the encrypted balance of an account.
     * @param account The address to query.
     * @return The encrypted balance bytes.
     */
    function balanceOfEncrypted(address account) external view returns (bytes memory) {
        return encryptedStorage.getEncryptedBalance(account);
    }
}
