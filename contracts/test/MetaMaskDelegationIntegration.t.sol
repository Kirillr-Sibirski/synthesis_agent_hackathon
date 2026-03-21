// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Test} from "forge-std/Test.sol";
import {AllowedTargetsEnforcer} from "lib/delegation-framework/src/enforcers/AllowedTargetsEnforcer.sol";
import {ExactCalldataEnforcer} from "lib/delegation-framework/src/enforcers/ExactCalldataEnforcer.sol";
import {RedeemerEnforcer} from "lib/delegation-framework/src/enforcers/RedeemerEnforcer.sol";
import {LimitedCallsEnforcer} from "lib/delegation-framework/src/enforcers/LimitedCallsEnforcer.sol";

import {YieldTreasury} from "src/YieldTreasury.sol";
import {DelegationAuthorizer} from "src/DelegationAuthorizer.sol";
import {ReceiptRegistry} from "src/ReceiptRegistry.sol";
import {MockERC20} from "src/mocks/MockERC20.sol";

contract MetaMaskDelegationIntegrationTest is Test {
    function testMetaMaskHarnessCompilesAgainstTreasury() public {
        MockERC20 asset = new MockERC20("Wrapped stETH", "wstETH", 18);
        YieldTreasury treasury = new YieldTreasury(address(asset), address(this));
        DelegationAuthorizer authorizer = new DelegationAuthorizer(address(this));
        ReceiptRegistry receipts = new ReceiptRegistry(address(treasury));

        treasury.setAuthorizer(address(authorizer));
        treasury.setReceiptRegistry(address(receipts));

        AllowedTargetsEnforcer allowedTargetsEnforcer = new AllowedTargetsEnforcer();
        ExactCalldataEnforcer exactCalldataEnforcer = new ExactCalldataEnforcer();
        RedeemerEnforcer redeemerEnforcer = new RedeemerEnforcer();
        LimitedCallsEnforcer limitedCallsEnforcer = new LimitedCallsEnforcer();

        assertTrue(address(treasury) != address(0));
        assertTrue(address(allowedTargetsEnforcer) != address(0));
        assertTrue(address(exactCalldataEnforcer) != address(0));
        assertTrue(address(redeemerEnforcer) != address(0));
        assertTrue(address(limitedCallsEnforcer) != address(0));
    }
}
