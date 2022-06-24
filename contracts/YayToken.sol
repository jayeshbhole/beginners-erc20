// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract YayToken is ERC20 {
    constructor(uint initialSupply) ERC20("Yay Token", "YAY") {
        _mint(msg.sender, initialSupply);
    }
}
