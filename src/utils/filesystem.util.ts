import fs from "fs/promises";

export async function mkdir(path: string): Promise<void> {
  const dirStats = await fs.stat(path);
  if (!dirStats.isDirectory()) {
    await fs.mkdir(path);
  }
}

export async function read(path: string): Promise<string> {
  return fs.readFile(path, "utf8");
}

export async function write(path: string, data: string): Promise<void> {
  fs.writeFile(path, data, { flag: "w" });
}
