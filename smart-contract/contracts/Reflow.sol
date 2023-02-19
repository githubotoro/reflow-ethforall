//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import {ISuperfluid, ISuperToken, ISuperApp} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";
import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";

error Unauthorized();

// PUSH Comm Contract Interface
interface IPUSHCommInterface {
    function sendNotification(
        address _channel,
        address _recipient,
        bytes calldata _identity
    ) external;
}

contract Reflow is AutomationCompatibleInterface {
    // ---------------------------------------------------------------------------------------------
    // STATE VARIABLES

    /// @notice Push Protocol contract address.
    address public EPNS_COMM_ADDRESS =
        0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa;

    /// @notice Owner.
    address public owner;

    /// @notice CFA Library.
    using SuperTokenV1Library for ISuperToken;

    /// @notice Allow list.
    mapping(address => bool) public accountList;

    /// @notice Current flow rate.
    int96 public currFlowRate;

    constructor() {
        owner = msg.sender;
        currFlowRate = 0;
    }

    /// @notice Add account to allow list.
    /// @param _account Account to allow.
    function allowAccount(address _account) external {
        if (msg.sender != owner) revert Unauthorized();

        accountList[_account] = true;
    }

    /// @notice Removes account from allow list.
    /// @param _account Account to disallow.
    function removeAccount(address _account) external {
        if (msg.sender != owner) revert Unauthorized();

        accountList[_account] = false;
    }

    /// @notice Transfer ownership.
    /// @param _newOwner New owner account.
    function changeOwner(address _newOwner) external {
        if (msg.sender != owner) revert Unauthorized();

        owner = _newOwner;
    }

    /// @notice Send a lump sum of super tokens into the contract.
    /// @dev This requires a super token ERC20 approval.
    /// @param token Super Token to transfer.
    /// @param amount Amount to transfer.
    function sendLumpSumToContract(ISuperToken token, uint256 amount) external {
        if (!accountList[msg.sender] && msg.sender != owner)
            revert Unauthorized();

        token.transferFrom(msg.sender, address(this), amount);
    }

    /// @notice Create a stream into the contract.
    /// @dev This requires the contract to be a flowOperator for the msg sender.
    /// @param token Token to stream.
    /// @param flowRate Flow rate per second to stream.
    function createFlowIntoContract(ISuperToken token, int96 flowRate)
        external
    {
        if (!accountList[msg.sender] && msg.sender != owner)
            revert Unauthorized();

        token.createFlowFrom(msg.sender, address(this), flowRate);
    }

    /// @notice Update an existing stream being sent into the contract by msg sender.
    /// @dev This requires the contract to be a flowOperator for the msg sender.
    /// @param token Token to stream.
    /// @param flowRate Flow rate per second to stream.
    function updateFlowIntoContract(ISuperToken token, int96 flowRate)
        external
    {
        if (!accountList[msg.sender] && msg.sender != owner)
            revert Unauthorized();

        token.updateFlowFrom(msg.sender, address(this), flowRate);
    }

    /// @notice Delete a stream that the msg.sender has open into the contract.
    /// @param token Token to quit streaming.
    function deleteFlowIntoContract(ISuperToken token) external {
        if (!accountList[msg.sender] && msg.sender != owner)
            revert Unauthorized();

        token.deleteFlow(msg.sender, address(this));
    }

    /// @notice Withdraw funds from the contract.
    /// @param token Token to withdraw.
    /// @param amount Amount to withdraw.
    function withdrawFunds(ISuperToken token, uint256 amount) external {
        if (!accountList[msg.sender] && msg.sender != owner)
            revert Unauthorized();

        token.transfer(msg.sender, amount);
    }

    /// @notice Create flow from contract to specified address.
    /// @param token Token to stream.
    /// @param receiver Receiver of stream.
    /// @param flowRate Flow rate per second to stream.
    function createFlowFromContract(
        ISuperToken token,
        address receiver,
        int96 flowRate
    ) external {
        if (!accountList[msg.sender] && msg.sender != owner)
            revert Unauthorized();

        token.createFlow(receiver, flowRate);

        currFlowRate = flowRate;

        IPUSHCommInterface(EPNS_COMM_ADDRESS).sendNotification(
            0x20136F73c536Db9D061b078146D7694cd4Bd0aEA, // from channel
            address(this), // to recipient
            bytes(
                string(
                    abi.encodePacked(
                        "0",
                        "+",
                        "1",
                        "+",
                        "Reward Stream Created",
                        "+",
                        "Reward stream has been created."
                    )
                )
            )
        );
    }

    /// @notice Update flow from contract to specified address.
    /// @param token Token to stream.
    /// @param receiver Receiver of stream.
    /// @param flowRate Flow rate per second to stream.

    function updateFlowFromContract(
        ISuperToken token,
        address receiver,
        int96 flowRate
    ) external {
        if (!accountList[msg.sender] && msg.sender != owner)
            revert Unauthorized();

        token.updateFlow(receiver, flowRate);

        currFlowRate = flowRate;

        IPUSHCommInterface(EPNS_COMM_ADDRESS).sendNotification(
            0x20136F73c536Db9D061b078146D7694cd4Bd0aEA, // from channel
            address(this), // to recipient
            bytes(
                string(
                    abi.encodePacked(
                        "0",
                        "+",
                        "1",
                        "+",
                        "Reward Stream Updated",
                        "+",
                        "Reward stream has been updated."
                    )
                )
            )
        );
    }

    /// @notice Delete flow from contract to specified address.
    /// @param token Token to stop streaming.
    /// @param receiver Receiver of stream.
    function deleteFlowFromContract(ISuperToken token, address receiver)
        external
    {
        if (!accountList[msg.sender] && msg.sender != owner)
            revert Unauthorized();

        token.deleteFlow(address(this), receiver);

        currFlowRate = 0;

        IPUSHCommInterface(EPNS_COMM_ADDRESS).sendNotification(
            0x20136F73c536Db9D061b078146D7694cd4Bd0aEA, // from channel
            address(this), // to recipient
            bytes(
                string(
                    abi.encodePacked(
                        "0",
                        "+",
                        "1",
                        "+",
                        "Reward Stream Deleted",
                        "+",
                        "Reward stream has been deleted."
                    )
                )
            )
        );
    }

    /// @notice Chainlink automation essential function.
    /// @param unused Functional requirement
    function checkUpkeep(bytes calldata unused)
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory)
    {}

    /// @notice Chainlink automation essential function.
    /// @param unused Functional requirement
    function performUpkeep(bytes calldata unused) external override {}

    /// @notice Update flow according to time.
    /// @param token Token to stream.
    /// @param receiver Receiver of stream.
    function updateTimebased(ISuperToken token, address receiver) external {
        require(currFlowRate != 0, "Flow rate can't be updated.");

        if (!accountList[msg.sender] && msg.sender != owner)
            revert Unauthorized();

        token.updateFlow(receiver, currFlowRate * 2);

        currFlowRate = currFlowRate * 2;

        IPUSHCommInterface(EPNS_COMM_ADDRESS).sendNotification(
            0x20136F73c536Db9D061b078146D7694cd4Bd0aEA, // from channel
            address(this), // to recipient
            bytes(
                string(
                    abi.encodePacked(
                        "0",
                        "+",
                        "1",
                        "+",
                        "Reward Stream Updated",
                        "+",
                        "Reward stream has been updated."
                    )
                )
            )
        );
    }
}
