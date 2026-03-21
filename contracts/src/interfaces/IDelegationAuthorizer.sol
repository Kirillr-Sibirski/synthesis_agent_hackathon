// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

interface IDelegationAuthorizer {
    function isAuthorized(
        address executor,
        bytes32 budgetId,
        address recipient,
        uint256 amount,
        bytes4 selector,
        uint64 currentTime
    ) external view returns (bool);

    function findMatchingRuleId(
        address executor,
        bytes32 budgetId,
        address recipient,
        uint256 amount,
        bytes4 selector,
        uint64 currentTime
    ) external view returns (bytes32);
}
