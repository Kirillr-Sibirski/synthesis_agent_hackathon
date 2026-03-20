// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

interface IWstETHYieldTreasury {
    function setAuthorizer(address authorizer_) external;
    function setReceiptRegistry(address receiptRegistry_) external;
    function deposit(uint256 amountWstETH) external;
    function configureBudget(
        bytes32 budgetId,
        bytes32 parentBudgetId,
        address manager,
        uint128 allocated,
        bool active,
        string calldata label
    ) external;
}
