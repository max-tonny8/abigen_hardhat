import { Artifacts } from "hardhat/types";

export async function getContracts(artifacts: Artifacts, basepath: string, extra: string[] = []): Promise<string[]> {
  return (await artifacts.getAllFullyQualifiedNames())
    .filter(name => name.startsWith(basepath)) // Only files in basepath directory
    .map(name => name.split(":")[1]) // Get contract name
    .filter((name, _, names) => names.indexOf(name.slice(1)) === -1) // Only contracts
    .filter(name => extra.indexOf(name) === -1); // Remove extra contracts
}
