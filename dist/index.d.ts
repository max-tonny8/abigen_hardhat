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
export {};
