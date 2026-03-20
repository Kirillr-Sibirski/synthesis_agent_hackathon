// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Script} from "forge-std/Script.sol";
import {WstETHYieldTreasury} from "src/WstETHYieldTreasury.sol";

contract SpendFromWstETHBudgetScript is Script {
    function run() external {
        uint256 executorKey = vm.envUint("EXECUTOR_PRIVATE_KEY");
        address treasuryAddr = vm.envAddress("TREASURY_ADDRESS");
        address recipient = vm.envAddress("RECIPIENT_ADDRESS");

        WstETHYieldTreasury treasury = WstETHYieldTreasury(treasuryAddr);
        bytes32 opsBudget = keccak256("OPS_BUDGET");

        bytes32 taskId = keccak256("wsteth-role-separated-task-1");
        bytes32 receiptHash = keccak256("wsteth-role-separated-receipt-1");
        bytes32 evidenceHash = keccak256("wsteth-role-separated-evidence-1");
        bytes32 resultHash = keccak256("wsteth-role-separated-result-1");

        vm.startBroadcast(executorKey);
        treasury.spendFromBudget(
            opsBudget,
            recipient,
            1 ether,
            taskId,
            receiptHash,
            evidenceHash,
            resultHash,
            "ipfs://wsteth-role-separated-spend-1"
        );
        vm.stopBroadcast();
    }
}
