// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Script, console2} from "forge-std/Script.sol";
import {YieldTreasury} from "src/YieldTreasury.sol";

contract ReadDemoStateScript is Script {
    function run() external view {
        address treasuryAddr = vm.envAddress("TREASURY_ADDRESS");
        bytes32 opsBudget = keccak256("OPS_BUDGET");

        YieldTreasury treasury = YieldTreasury(treasuryAddr);
        (
            uint128 allocated,
            uint128 spent,
            bool active,
            bytes32 parentBudgetId,
            address manager,
            string memory label
        ) = treasury.budgets(opsBudget);

        console2.log("principalBaseline", treasury.principalBaseline());
        console2.log("availableYield", treasury.availableYield());
        console2.log("rootAllocated", treasury.totalBudgetAllocated());
        console2.log("allocated", uint256(allocated));
        console2.log("spent", uint256(spent));
        console2.log("active", active);
        console2.log("parentBudgetId");
        console2.logBytes32(parentBudgetId);
        console2.log("manager", manager);
        console2.log("childReserved", treasury.childBudgetReserved(opsBudget));
        console2.log("directSpendableRemaining", treasury.directSpendableRemaining(opsBudget));
        console2.log("label", label);
    }
}
