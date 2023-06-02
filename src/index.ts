import { extendEnvironment, task } from "hardhat/config";
import { getContracts } from "./utils/contracts.util";
import { mkdir, write } from "./utils/filesystem.util";

interface ApigenConfig {
  outDir: string;
  inDir: string;
  contracts: string[];
  space: number;
  autoCompile: boolean;
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
    outDir: abigen?.outDir || "abi",
    inDir: abigen?.inDir || "contracts",
    contracts: abigen?.contracts || ["*"],
    space: abigen?.space || 2,
    autoCompile: abigen?.autoCompile || true
  };
});

task("abigen", async (args, hre) => {
  const { config, artifacts } = hre;
  const { abigen } = config;
  const { outDir, inDir, contracts, space, autoCompile } = abigen;

  if (autoCompile) {
    await hre.run("compile");
  }

  await mkdir(outDir);
  const contractNames = await getContracts(artifacts, inDir);
  for await (const contractName of contractNames) {
    if (contracts.includes("*") || contracts.includes(contractName)) {
      const artifact = await artifacts.readArtifact(contractName);
      const abi = JSON.stringify(artifact.abi, null, space);
      await write(`${outDir}/${contractName}.json`, abi);
    }
  }
});
