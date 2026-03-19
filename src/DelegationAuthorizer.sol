// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract DelegationAuthorizer {
    address public constant ANY_RECIPIENT = address(0);
    bytes4 public constant ANY_SELECTOR = bytes4(0);

    struct Rule {
        bool active;
        address executor;
        bytes32 budgetId;
        address recipient;
        bytes4 selector;
        uint128 maxAmount;
        uint64 validAfter;
        uint64 validUntil;
    }

    address public immutable owner;
    mapping(bytes32 => Rule) public rules;

    event RuleSet(
        bytes32 indexed ruleId,
        address indexed executor,
        bytes32 indexed budgetId,
        address recipient,
        bytes4 selector,
        uint128 maxAmount,
        uint64 validAfter,
        uint64 validUntil,
        bool active
    );
    event RuleRevoked(bytes32 indexed ruleId);

    error OnlyOwner();
    error InvalidWindow();

    constructor(address owner_) {
        owner = owner_;
    }

    function setRule(bytes32 ruleId, Rule calldata rule) external {
        if (msg.sender != owner) revert OnlyOwner();
        if (rule.validUntil != 0 && rule.validUntil < rule.validAfter) revert InvalidWindow();
        rules[ruleId] = rule;

        emit RuleSet(
            ruleId,
            rule.executor,
            rule.budgetId,
            rule.recipient,
            rule.selector,
            rule.maxAmount,
            rule.validAfter,
            rule.validUntil,
            rule.active
        );
    }

    function revokeRule(bytes32 ruleId) external {
        if (msg.sender != owner) revert OnlyOwner();
        delete rules[ruleId];
        emit RuleRevoked(ruleId);
    }

    function isAuthorized(
        address executor,
        bytes32 budgetId,
        address recipient,
        uint256 amount,
        bytes4 selector,
        uint64 currentTime
    ) external view returns (bool) {
        return findMatchingRuleId(executor, budgetId, recipient, amount, selector, currentTime)
            != bytes32(0);
    }

    function findMatchingRuleId(
        address executor,
        bytes32 budgetId,
        address recipient,
        uint256 amount,
        bytes4 selector,
        uint64 currentTime
    ) public view returns (bytes32) {
        bytes32[4] memory candidateRuleIds = [
            keccak256(abi.encode(executor, budgetId, recipient, selector)),
            keccak256(abi.encode(executor, budgetId, recipient, ANY_SELECTOR)),
            keccak256(abi.encode(executor, budgetId, ANY_RECIPIENT, selector)),
            keccak256(abi.encode(executor, budgetId, ANY_RECIPIENT, ANY_SELECTOR))
        ];

        for (uint256 i = 0; i < candidateRuleIds.length; i++) {
            Rule memory rule = rules[candidateRuleIds[i]];
            if (_matches(rule, executor, budgetId, recipient, amount, selector, currentTime)) {
                return candidateRuleIds[i];
            }
        }

        return bytes32(0);
    }

    function computeRuleId(address executor, bytes32 budgetId, address recipient, bytes4 selector)
        external
        pure
        returns (bytes32)
    {
        return keccak256(abi.encode(executor, budgetId, recipient, selector));
    }

    function _matches(
        Rule memory rule,
        address executor,
        bytes32 budgetId,
        address recipient,
        uint256 amount,
        bytes4 selector,
        uint64 currentTime
    ) internal pure returns (bool) {
        if (!rule.active) return false;
        if (rule.executor != executor) return false;
        if (rule.budgetId != budgetId) return false;
        if (rule.recipient != ANY_RECIPIENT && rule.recipient != recipient) return false;
        if (rule.selector != ANY_SELECTOR && rule.selector != selector) return false;
        if (amount > rule.maxAmount) return false;
        if (currentTime < rule.validAfter) return false;
        if (rule.validUntil != 0 && currentTime > rule.validUntil) return false;
        return true;
    }
}
