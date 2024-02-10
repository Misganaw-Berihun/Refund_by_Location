// SPDX-License-Identifier: MIT
pragma solidity >=0.8.20 <0.9.0;
import "hardhat/console.sol";
import "./MyToken.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ComplianceContract {
    struct ContractInfo {
        int256 targetLongitude;
        int256 targetLatitude;
        uint256 radius;
        uint duration;
        uint startTime;
        bool compliant;
    }

    mapping(address => ContractInfo) public contractInfo;
    mapping(address => string) public driverName;

    MyToken public token;
    address public owner;

    event TokenReward(address indexed driver, uint amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor(address initialOwner) {
        owner = msg.sender;
        token = MyToken(initialOwner);
    }

    function sqrt(int256 x) public pure returns (int256 y) {
        int256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    function registerDriver(
        address driverAddress,
        string memory name,
        int targetLongitude,
        int targetLatitude,
        uint radius,
        uint duration
    ) external onlyOwner {
        contractInfo[driverAddress] = ContractInfo({
            targetLongitude: targetLongitude,
            targetLatitude: targetLatitude,
            radius: radius,
            duration: duration,
            startTime: block.timestamp,
            compliant: true
        });
        driverName[driverAddress] = name;
    }

    function sendCurrentLocation(
        int currentLongitude,
        int currentLatitude
    ) external {
        ContractInfo storage info = contractInfo[msg.sender];

        console.log("Current Time:", block.timestamp);
        console.log("Start Time:", info.startTime);
        console.log("Duration:", info.duration);
        require(
            block.timestamp < info.startTime + info.duration,
            "Time duration exceeded"
        );

        int256 distance = calculateDistance(
            currentLongitude,
            currentLatitude,
            info.targetLongitude,
            info.targetLatitude
        );

        if (distance > int(info.radius)) {
            info.compliant = false;
        }
        console.log(info.compliant);
    }

    function checkCompliance(address driverAddress) external onlyOwner {
        ContractInfo storage info = contractInfo[driverAddress];
        require(
            block.timestamp >= info.startTime + info.duration,
            "Duration not completed"
        );

        if (info.compliant) {
            uint rewardAmount = 5;
            token.transfer(driverAddress, rewardAmount);
            emit TokenReward(driverAddress, rewardAmount);
        }
        info.compliant = true;
    }

    function calculateDistance(
        int lon1,
        int lat1,
        int lon2,
        int lat2
    ) internal pure returns (int) {
        int256 dx = (lon1 - lon2);
        int256 dy = (lat1 - lat2);
        return sqrt(dx * dx + dy * dy);
    }
}
