// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IMarketRouter {
    function placeOrder(uint256 marketId, bool buyYes, uint256 minOutcomeAmount) external payable;
}

contract TradeRouter is Ownable, ReentrancyGuard {
    address public marketRouter;

    event TradeExecuted(address indexed user, uint256 marketId, bool buyYes, uint256 amount);

    constructor(address _marketRouter) {
        require(_marketRouter != address(0), "zero address");
        marketRouter = _marketRouter;
    }

    receive() external payable {}

    function executeTrade(uint256 marketId, bool buyYes, uint256 minOutcomeAmount) external payable nonReentrant {
        require(msg.value > 0, "no funds");
        address router = marketRouter;
        require(router != address(0), "router not set");

        (bool success,) = router.call{value: msg.value}(abi.encodeWithSignature("placeOrder(uint256,bool,uint256)", marketId, buyYes, minOutcomeAmount));
        require(success, "trade failed");

        emit TradeExecuted(msg.sender, marketId, buyYes, msg.value);
    }

    function updateMarketRouter(address _router) external onlyOwner {
        require(_router != address(0), "zero address");
        marketRouter = _router;
    }

    function withdraw(address payable to) external onlyOwner {
        require(to != address(0), "zero address");
        to.transfer(address(this).balance);
    }
}
