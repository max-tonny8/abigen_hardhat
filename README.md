# Hardhat Abigen Plugin

This repository contains a plugin for Hardhat, a popular Ethereum development environment. The Hardhat Abigen Plugin generates ABI (Application Binary Interface) files from smart contracts, making it easier to interact with contracts on the Ethereum blockchain.

## Installation

To use this plugin, follow these steps:

1. Ensure you have [Node.js](https://nodejs.org) installed on your machine.
2. Install Hardhat by running `npm install --save-dev hardhat`.
3. Install the Hardhat-Abigen plugin by running `npm install --save-dev hardhat-abigen`.

## Usage

After installing the plugin, you can import it in your TypeScript or JavaScript files by adding the following line:

```typescript
import "hardhat-abigen";
```

or

```javascript
require("hardhat-abigen");
```

This will enable the necessary functionality provided by the plugin.

## Configuration

The Hardhat-Abigen plugin supports a configuration file that allows you to customize its behavior. Create a file named `hardhat.config.js` or `hardhat.config.ts` in the root directory of your project and add the following configuration options:

### JavaScript

```javascript
module.exports = {
  // ...other configuration options...

  abigen: {
    outDir: "abi",       // The output directory for generated ABI files (default: "abi")
    inDir: "contracts",  // The input directory containing your contract files (default: "contracts")
    contracts: ["*"],    // An array of contract filenames or patterns to generate ABIs for (default: ["*"])
    space: 2,            // The number of spaces to use for indentation in the generated ABIs (default: 2)
    autoCompile: true    // Whether to automatically compile contracts before generating ABIs (default: true)
  },
};
```

### TypeScript

```typescript
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  // ...other configuration options...

  abigen: {
    outDir: "abi",       // The output directory for generated ABI files (default: "abi")
    inDir: "contracts",  // The input directory containing your contract files (default: "contracts")
    contracts: ["*"],    // An array of contract filenames or patterns to generate ABIs for (default: ["*"])
    space: 2,            // The number of spaces to use for indentation in the generated ABIs (default: 2)
    autoCompile: true    // Whether to automatically compile contracts before generating ABIs (default: true)
  },
};

export default config;
```

Make sure to replace the values with your desired configuration options.

## Generating ABIs

To generate ABIs for your contracts, run the following command:

```
npx hardhat abigen
```

This will compile your contracts (if `autoCompile` is set to `true`) and generate the corresponding ABI files in the specified `outDir` directory.

## License

This plugin is open-source and available under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as per the terms of the license.

---

I hope this plugin simplifies your development workflow by automatically generating ABIs from your contracts. If you encounter any issues or have suggestions for improvements, please [open an issue](https://github.com/nazarkhatsko/hardhat-abigen/issues). Contributions are also welcome!
