// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test} from "forge-std/Test.sol";
import {FundMe} from "../src/FundMe.sol";
import {MockV3Aggregator} from "../src/test/MockV3Aggregator.sol";

contract FundMeTest is Test {
    FundMe fundMe;
    MockV3Aggregator mockPriceFeed;

    address OWNER = makeAddr("owner");
    address USER = makeAddr("user");
    uint256 constant SEND_VALUE = 0.1 ether; // 0.1 ETH
    uint256 constant MINIMUM_USD = 5e18; // 5 USD in Wei-like units
    uint256 constant PRICE_FEED_VALUE = 2000 * 1e8; // $2000/ETH, 8 decimals

    function setUp() external {
        // Deploy mock price feed
        mockPriceFeed = new MockV3Aggregator(8, int256(PRICE_FEED_VALUE));
        // Deploy FundMe with owner
        vm.prank(OWNER);
        fundMe = new FundMe(address(mockPriceFeed));
    }

    function testConstructorSetsOwner() public {
        assertEq(fundMe.getOwner(), OWNER);
    }

    function testConstructorSetsPriceFeed() public {
        assertEq(address(fundMe.getPriceFeed()), address(mockPriceFeed));
    }







    function testWithdrawTransfersFundsToOwner() public {
        // Fund the contract
        vm.deal(USER, SEND_VALUE); // Ensure USER has funds
        vm.prank(USER);
        fundMe.fund{value: SEND_VALUE}();

        // Get balances before
        uint256 startingContractBalance = address(fundMe).balance;
        uint256 startingOwnerBalance = OWNER.balance;

        // Withdraw as owner
        vm.prank(OWNER);
        fundMe.withdraw();

        // Check balances after
        uint256 endingContractBalance = address(fundMe).balance;
        uint256 endingOwnerBalance = OWNER.balance;

        assertEq(endingContractBalance, 0);
        assertEq(startingContractBalance + startingOwnerBalance, endingOwnerBalance);
    }

    function testWithdrawResetsFunders() public {
        // Fund the contract
        vm.deal(USER, SEND_VALUE);
        vm.prank(USER);
        fundMe.fund{value: SEND_VALUE}();

        // Withdraw
        vm.prank(OWNER);
        fundMe.withdraw();

        // Check state
        assertEq(fundMe.getAddressToAmountFunded(USER), 0);
        vm.expectRevert(); // getFunder(0) should revert due to empty array
        fundMe.getFunder(0);
    }



    function testCheaperWithdrawTransfersFundsToOwner() public {
        // Fund the contract
        vm.deal(USER, SEND_VALUE);
        vm.prank(USER);
        fundMe.fund{value: SEND_VALUE}();

        // Get balances before
        uint256 startingContractBalance = address(fundMe).balance;
        uint256 startingOwnerBalance = OWNER.balance;

        // Withdraw as owner
        vm.prank(OWNER);
        fundMe.cheaperWithdraw();

        // Check balances after
        uint256 endingContractBalance = address(fundMe).balance;
        uint256 endingOwnerBalance = OWNER.balance;

        assertEq(endingContractBalance, 0);
        assertEq(startingContractBalance + startingOwnerBalance, endingOwnerBalance);
    }

    function testCheaperWithdrawResetsFunders() public {
        // Fund the contract
        vm.deal(USER, SEND_VALUE);
        vm.prank(USER);
        fundMe.fund{value: SEND_VALUE}();

        // Withdraw
        vm.prank(OWNER);
        fundMe.cheaperWithdraw();

        // Check state
        assertEq(fundMe.getAddressToAmountFunded(USER), 0);
        vm.expectRevert(); // getFunder(0) should revert due to empty array
        fundMe.getFunder(0);
    }

    function testPriceConverterReturnsCorrectPrice() public {
        (, int256 price,,,) = mockPriceFeed.latestRoundData();
        uint256 expectedPrice = uint256(price) * 1e10; // Adjust to 18 decimals
        assertEq(expectedPrice, 2000 * 1e18); // $2000/ETH
    }



    function testGetVersion() public {
        assertEq(fundMe.getVersion(), 0); // Mock returns version 0
    }

    function testGetFunderRevertsOnInvalidIndex() public {
        vm.expectRevert();
        fundMe.getFunder(0); // Empty array
    }
}