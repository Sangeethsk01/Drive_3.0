const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Upload", (m) => {
    // Deploy the Upload contract without any constructor parameters
    const upload = m.contract("Upload");

    // Return the deployed contract instance for further use if needed
    return { upload };
});