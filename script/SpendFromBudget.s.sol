// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Script} from "forge-std/Script.sol";
import {YieldTreasury} from "src/YieldTreasury.sol";

contract SpendFromBudgetScript is Script {
    function run() external {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        address treasuryAddr = vm.envAddress("TREASURY_ADDRESS");
        address recipient = vm.envAddress("DEMO_RECIPIENT");

        YieldTreasury treasury = YieldTreasury(treasuryAddr);
        bytes32 opsBudget = keccak256("OPS_BUDGET");

        bytes32 taskId = keccak256("base-sepolia-demo-task-1");
        bytes32 receiptHash = keccak256("base-sepolia-demo-receipt-1");
        bytes32 evidenceHash = keccak256("base-sepolia-demo-evidence-1");
        bytes32 resultHash = keccak256("base-sepolia-demo-result-1");

        vm.startBroadcast(deployerKey);
        treasury.spendFromBudget(
            opsBudget,
            recipient,
            1 ether,
            taskId,
            receiptHash,
            evidenceHash,
            resultHash,
            "ipfs://base-sepolia-demo-spend-1"
        );
        vm.stopBroadcast();
    }
}
