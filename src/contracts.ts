import { Artifacts } from "hardhat/types";

export async function getContracts(artifacts: Artifacts, basepath: string, extra: string[] = []): Promise<string[]> {
  return (await artifacts.getAllFullyQualifiedNames())
    .filter(name => name.startsWith(basepath))
    .map(name => name.split(":")[1])
    .filter((name, _, names) => names.indexOf(name.slice(1)) === -1)
    .filter(name => extra.indexOf(name) === -1);
}
