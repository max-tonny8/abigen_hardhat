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
export {};
