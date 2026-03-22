// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {DelegationAuthorizer} from "src/DelegationAuthorizer.sol";
import {ReceiptRegistry} from "src/ReceiptRegistry.sol";
import {WstETHYieldTreasury} from "src/WstETHYieldTreasury.sol";
import {IERC20} from "src/interfaces/IERC20.sol";

contract TreasuryOperatorFactory {
    struct InitialAllowance {
        string label;
        address agent;
        uint128 amountWstETH;
        bool enabled;
    }

    mapping(address treasury => address operator) public treasuryOperator;

    event TreasuryBootstrapped(
        address indexed operator,
        address indexed treasury,
        address indexed authorizer,
        address receiptRegistry,
        uint256 principalAmountWstETH,
        string label
    );

    event AllowanceAssigned(
        address indexed treasury,
        address indexed operator,
        address indexed agent,
        bytes32 budgetId,
        bytes32 ruleId,
        uint128 amountWstETH,
        string label
    );

    error UnauthorizedOperator();
    error InvalidAgent();
    error InvalidAmount();
    error TransferFailed();
    error ApproveFailed();

    function bootstrapTreasury(
        address asset,
        uint256 principalAmountWstETH,
        string calldata label,
        InitialAllowance calldata initialAllowance
    ) external returns (address treasuryAddress, address authorizerAddress, address receiptRegistryAddress) {
        if (principalAmountWstETH == 0) revert InvalidAmount();

        DelegationAuthorizer authorizer = new DelegationAuthorizer(address(this));
        WstETHYieldTreasury treasury = new WstETHYieldTreasury(asset, address(this));
        ReceiptRegistry receiptRegistry = new ReceiptRegistry(address(treasury));

        authorizerAddress = address(authorizer);
        treasuryAddress = address(treasury);
        receiptRegistryAddress = address(receiptRegistry);

        treasury.setAuthorizer(authorizerAddress);
        treasury.setReceiptRegistry(receiptRegistryAddress);
        treasuryOperator[treasuryAddress] = msg.sender;

        bool pulled = IERC20(asset).transferFrom(msg.sender, address(this), principalAmountWstETH);
        if (!pulled) revert TransferFailed();
        bool approved = IERC20(asset).approve(treasuryAddress, principalAmountWstETH);
        if (!approved) revert ApproveFailed();
        treasury.deposit(principalAmountWstETH);

        emit TreasuryBootstrapped(
            msg.sender,
            treasuryAddress,
            authorizerAddress,
            receiptRegistryAddress,
            principalAmountWstETH,
            label
        );

        if (initialAllowance.enabled) {
            _assignAllowance(treasury, authorizer, msg.sender, initialAllowance.label, initialAllowance.agent, initialAllowance.amountWstETH);
        }
    }

    function assignAllowance(
        address treasuryAddress,
        string calldata label,
        address agent,
        uint128 amountWstETH
    ) external returns (bytes32 budgetId, bytes32 ruleId) {
        if (treasuryOperator[treasuryAddress] != msg.sender) revert UnauthorizedOperator();
        WstETHYieldTreasury treasury = WstETHYieldTreasury(treasuryAddress);
        DelegationAuthorizer authorizer = DelegationAuthorizer(address(treasury.authorizer()));
        return _assignAllowance(treasury, authorizer, msg.sender, label, agent, amountWstETH);
    }

    function _assignAllowance(
        WstETHYieldTreasury treasury,
        DelegationAuthorizer authorizer,
        address operator,
        string calldata label,
        address agent,
        uint128 amountWstETH
    ) internal returns (bytes32 budgetId, bytes32 ruleId) {
        if (agent == address(0)) revert InvalidAgent();
        if (amountWstETH == 0) revert InvalidAmount();

        budgetId = keccak256(abi.encode(label, block.timestamp, operator, agent, address(treasury)));
        treasury.configureBudget(budgetId, bytes32(0), operator, amountWstETH, true, label);

        ruleId = keccak256(abi.encode(agent, budgetId, agent, treasury.spendFromBudget.selector));
        authorizer.setRule(
            ruleId,
            DelegationAuthorizer.Rule({
                active: true,
                executor: agent,
                budgetId: budgetId,
                recipient: agent,
                selector: treasury.spendFromBudget.selector,
                maxAmount: amountWstETH,
                validAfter: uint64(block.timestamp),
                validUntil: 0
            })
        );

        emit AllowanceAssigned(address(treasury), operator, agent, budgetId, ruleId, amountWstETH, label);
    }
}
