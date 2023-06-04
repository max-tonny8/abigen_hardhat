import { extendEnvironment, task } from "hardhat/config";
import { getContracts } from "./contracts";
import { mkdir, write } from "./filesystem";

interface ApigenConfig {
  outDir: string;
  inDir: string;
  includeContracts: string[];
  excludeContracts: string[];
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
    outDir: abigen?.outDir ?? "abi",
    inDir: abigen?.inDir ?? "contracts",
    includeContracts: abigen?.includeContracts ?? ["*"],
    excludeContracts: abigen?.excludeContracts ?? [],
    space: abigen?.space ?? 2,
    autoCompile: abigen?.autoCompile ?? true,
  };
});

task("abigen", async (args, hre) => {
  const { config, artifacts } = hre;
  const { abigen } = config;
  const { outDir, inDir, includeContracts, excludeContracts, space, autoCompile } = abigen;

  if (autoCompile) {
    await hre.run("compile");
  }

  const contractNames = (await getContracts(artifacts, inDir))
    .filter(contractName => includeContracts.includes("*") || includeContracts.includes(contractName))
    .filter(contractName => !excludeContracts.includes("*") && !excludeContracts.includes(contractName));

  await mkdir(outDir);
  for await (const contractName of contractNames) {
    const { abi } = await artifacts.readArtifact(contractName);
    const data = JSON.stringify(abi, null, space);
    await write(`${outDir}/${contractName}.json`, data);
  }
});
