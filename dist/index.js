"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const contracts_1 = require("./contracts");
const filesystem_1 = require("./filesystem");
(0, config_1.extendEnvironment)(hre => {
    const { config } = hre;
    const { abigen } = config;
    hre.config.abigen = {
        outDir: abigen?.outDir ?? "abi",
        inDir: abigen?.inDir ?? "contracts",
        includeContracts: abigen?.includeContracts ?? ["*"],
        excludeContracts: abigen?.excludeContracts ?? [],
        space: abigen?.space ?? 2,
        autoCompile: abigen?.autoCompile ?? true,
    };
});
(0, config_1.task)("abigen", async (args, hre) => {
    const { config, artifacts } = hre;
    const { abigen } = config;
    const { outDir, inDir, includeContracts, excludeContracts, space, autoCompile } = abigen;
    if (autoCompile) {
        await hre.run("compile");
    }
    const contractNames = (await (0, contracts_1.getContracts)(artifacts, inDir))
        .filter(contractName => includeContracts.includes("*") || includeContracts.includes(contractName))
        .filter(contractName => !excludeContracts.includes("*") && !excludeContracts.includes(contractName));
    await (0, filesystem_1.mkdir)(outDir);
    for await (const contractName of contractNames) {
        const { abi } = await artifacts.readArtifact(contractName);
        const data = JSON.stringify(abi, null, space);
        await (0, filesystem_1.write)(`${outDir}/${contractName}.json`, data);
    }
});
