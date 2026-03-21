// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {IERC20} from "src/interfaces/IERC20.sol";

interface IWstETH is IERC20 {
    function getWstETHByStETH(uint256 stETHAmount) external view returns (uint256);
    function getStETHByWstETH(uint256 wstETHAmount) external view returns (uint256);
    function stEthPerToken() external view returns (uint256);
}
