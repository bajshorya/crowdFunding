// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract MockV3Aggregator is AggregatorV3Interface {
    uint256 public constant version = 0;
    uint8 public immutable decimals;
    int256 public immutable answer;
    uint256 public immutable startedAt;
    uint256 public immutable updatedAt;
    uint80 public immutable roundId;

    constructor(uint8 _decimals, int256 _answer) {
        decimals = _decimals;
        answer = _answer;
        startedAt = block.timestamp;
        updatedAt = block.timestamp;
        roundId = 1;
    }

    function latestRoundData()
        external
        view
        override
        returns (
            uint80,
            int256,
            uint256,
            uint256,
            uint80
        )
    {
        return (roundId, answer, startedAt, updatedAt, roundId);
    }

    function getRoundData(uint80 _roundId)
        external
        view
        override
        returns (
            uint80,
            int256,
            uint256,
            uint256,
            uint80
        )
    {
        return (_roundId, answer, startedAt, updatedAt, _roundId);
    }

    function description() external pure override returns (string memory) {
        return "Mock Price Feed";
    }
}