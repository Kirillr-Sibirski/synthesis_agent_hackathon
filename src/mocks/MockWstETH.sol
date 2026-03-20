// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {IWstETH} from "src/interfaces/IWstETH.sol";

contract MockWstETH is IWstETH {
    string public name;
    string public symbol;
    uint8 public immutable decimals;

    uint256 public override totalSupply;
    uint256 public override stEthPerToken;
    mapping(address => uint256) public override balanceOf;
    mapping(address => mapping(address => uint256)) public override allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event StEthPerTokenUpdated(uint256 oldValue, uint256 newValue);

    constructor(string memory name_, string memory symbol_, uint8 decimals_, uint256 stEthPerToken_) {
        name = name_;
        symbol = symbol_;
        decimals = decimals_;
        stEthPerToken = stEthPerToken_;
    }

    function setStEthPerToken(uint256 newValue) external {
        uint256 oldValue = stEthPerToken;
        stEthPerToken = newValue;
        emit StEthPerTokenUpdated(oldValue, newValue);
    }

    function mint(address to, uint256 value) external {
        totalSupply += value;
        balanceOf[to] += value;
        emit Transfer(address(0), to, value);
    }

    function burn(address from, uint256 value) external {
        require(balanceOf[from] >= value, "INSUFFICIENT_BALANCE");
        balanceOf[from] -= value;
        totalSupply -= value;
        emit Transfer(from, address(0), value);
    }

    function transfer(address to, uint256 value) external override returns (bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) external override returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) external override returns (bool) {
        uint256 allowed = allowance[from][msg.sender];
        require(allowed >= value, "INSUFFICIENT_ALLOWANCE");
        if (allowed != type(uint256).max) {
            allowance[from][msg.sender] = allowed - value;
            emit Approval(from, msg.sender, allowance[from][msg.sender]);
        }
        _transfer(from, to, value);
        return true;
    }

    function getWstETHByStETH(uint256 stETHAmount) external view returns (uint256) {
        return stETHAmount * 1e18 / stEthPerToken;
    }

    function getStETHByWstETH(uint256 wstETHAmount) external view returns (uint256) {
        return wstETHAmount * stEthPerToken / 1e18;
    }

    function _transfer(address from, address to, uint256 value) internal {
        require(balanceOf[from] >= value, "INSUFFICIENT_BALANCE");
        balanceOf[from] -= value;
        balanceOf[to] += value;
        emit Transfer(from, to, value);
    }
}
