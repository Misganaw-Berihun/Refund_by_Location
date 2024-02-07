pragma solidity >=0.7.0 <0.9.0;

contract LocationBasedPayment {
    address payable public owner;
    mapping(address => Driver) public drivers;
    uint256 public rewardAmount;
    uint256 public durationRequirement;
    Location public location;

    event GPSDataSubmitted(
        address indexed driver,
        uint256 latitude,
        uint256 longitude
    );
    event ComplianceStatusUpdated(address indexed driver, bool compliant);
    event RewardPaid(address indexed driver, uint256 amount);

    struct Driver {
        uint256 lastUpdateTime;
        bool isCompliant;
    }

    struct Location {
        uint256 latitude;
        uint256 longitude;
        uint256 radius;
    }

    constructor(
        address payable _owner,
        uint256 _rewaredAmount,
        uint256 _durationRequirement,
        Location memory _location
    ) {
        owner = _owner;
        rewardAmount = _rewaredAmount;
        durationRequirement = _durationRequirement;
        location = _location;
    }

    function submitGPSData(uint256 latitude, uint256 longitude) public {
        require(msg.sender != owner, "Owner cannot submit data");

        Driver storage driver = drivers[msg.sender];
        driver.lastUpdateTime = block.timestamp;

        if (isWithinRange(latitude, longitude)) {
            updateComplianceStatus(payable(msg.sender), true);
        } else {
            updateComplianceStatus(payable(msg.sender), false);
        }
        emit GPSDataSubmitted(msg.sender, latitude, longitude);
    }

    function isWithinRange(
        uint256 latitude,
        uint256 longitude
    ) internal view returns (bool) {
        uint256 latSq = (location.latitude - latitude) ** 2;
        uint256 lonSq = (location.longitude - longitude) ** 2;
        uint256 radiusSq = location.radius ** 2;

        bool inbound = ((latSq + lonSq) <= radiusSq);
        return inbound;
    }

    function updateComplianceStatus(
        address payable driverAddress,
        bool compliant
    ) internal {
        Driver storage driver = drivers[driverAddress];
        driver.isCompliant = compliant;

        if (compliant && isDurationMet(driverAddress)) {
            payReward(driverAddress);
        }
        emit ComplianceStatusUpdated(driverAddress, compliant);
    }

    function isDurationMet(address driverAddress) internal view returns (bool) {
        Driver storage driver = drivers[driverAddress];
        uint256 elapsedTime = block.timestamp - driver.lastUpdateTime;
        return elapsedTime <= durationRequirement;
    }

    function payReward(address payable driverAddress) internal {
        driverAddress.transfer(rewardAmount);
        emit RewardPaid(driverAddress, rewardAmount);
    }
}
