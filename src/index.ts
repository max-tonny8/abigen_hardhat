import { extendEnvironment, task } from "hardhat/config";
import { getContracts } from "./utils/contracts.util";
import { mkdir, write } from "./utils/filesystem.util";

interface ApigenConfig {
  outDir: string;
  inDir: string;
  contracts: string[];
  space?: number;
}

declare module "hardhat/types/config" {
  interface HardhatUserConfig {
    abigen?: Partial<ApigenConfig>;
  }

  interface HardhatConfig {
    abigen: ApigenConfig;
  }
}

extendEnvironment(hre => {
  const { config } = hre;
  const { abigen } = config;

  hre.config.abigen = {
    outDir: abigen.outDir || "abi",
    inDir: abigen.inDir || "contracts",
    contracts: abigen.contracts || ["*"],
    space: abigen.space || 2,
  };
});

task("abigen", async (args, hre) => {
  const { config, artifacts } = hre;
  const { abigen } = config;
  const { outDir, inDir, space } = abigen;

  await mkdir(outDir);
  const contractNames = await getContracts(artifacts, inDir);
  for await (const contractName of contractNames) {
    const artifact = await artifacts.readArtifact(contractName);
    const abi = JSON.stringify(artifact.abi, null, space);
    await write(`${outDir}/${contractName}.json`, abi);
  }
});
