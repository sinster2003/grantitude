import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BountyModule = buildModule("BountyModule", (m) => {
  const bounty = m.contract("Bounty");
  return {bounty};
});

export default BountyModule;