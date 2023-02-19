# Reflow -- Create automated reward flows in real-time which stream + update themselves.

![](https://www.loom.com/share/f77aa1a3625440e4ae49b22a21b5f571)

## The problem Reflow solves

Money streaming in it's current phase is working on the logic of constant flow agreements. While these agreements in themselves are quite beneficiary, they could be improved upon further by adding updates + automating them.

The 2 major problems which Reflow solves are

Lack of loyalty based streaming.
Non-availability of real-time updates.

## Challenges I ran into

The main issue was finding a way about how to link Chainlink's smart contract to Reflow's contract such that transactions happen only when there needs to be an update. This needed to be ensured because if transactions keep on running, they would eventually lead to gas loss.

Thus, the solution I found was to embed that specific condition in the contract itself as even if Chainlink tries to make an update, the transaction would be automatically reverted without making a state change.

Moreover, in order to confirm that it worked, I also added push notifications which could send an update if streaming hadn't stopped + the same could be verified via Superfluid console too.
