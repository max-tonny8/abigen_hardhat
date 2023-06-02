"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const contracts_util_1 = require("./utils/contracts.util");
const filesystem_util_1 = require("./utils/filesystem.util");
(0, config_1.extendEnvironment)(hre => {
    const { config } = hre;
    const { abigen } = config;
    hre.config.abigen = {
        outDir: abigen?.outDir || "abi",
        inDir: abigen?.inDir || "contracts",
        contracts: abigen?.contracts || ["*"],
        space: abigen?.space || 2,
        autoCompile: abigen?.autoCompile || true
    };
});
(0, config_1.task)("abigen", async (args, hre) => {
    const { config, artifacts } = hre;
    const { abigen } = config;
    const { outDir, inDir, contracts, space, autoCompile } = abigen;
    if (autoCompile) {
        await hre.run("compile");
    }
    await (0, filesystem_util_1.mkdir)(outDir);
    const contractNames = await (0, contracts_util_1.getContracts)(artifacts, inDir);
    for await (const contractName of contractNames) {
        if (contracts.includes("*") || contracts.includes(contractName)) {
            const artifact = await artifacts.readArtifact(contractName);
            const abi = JSON.stringify(artifact.abi, null, space);
            await (0, filesystem_util_1.write)(`${outDir}/${contractName}.json`, abi);
        }
    }
});
