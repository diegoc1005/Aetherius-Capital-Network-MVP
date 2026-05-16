name: Avalanche eERC20 Implementation
description: Standard guidelines for building privacy-preserving tokens on Avalanche using eERC20.
Avalanche eERC20 Skill
When asked to build or configure tokens for Avalanche, strictly follow these eERC20 standard guidelines:

Operation Mode: Use "Standalone Mode" for creating entirely new private ERC-20 tokens where the total supply is kept private. Do not use Converter Mode.  

Core Components: The architecture must integrate EncryptedERC.sol for encrypted balance storage, and Registrar.sol for managing auditor keys and permissions.  

Cryptography: Use Groth16 for proof generation and verification, as it is the default and most gas-efficient for Avalanche L1s.  

Compliance: Always configure the Registrar contract to grant decryption permissions to external auditors (AuditorManager) for AML/KYC compliance scenarios.