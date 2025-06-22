<div align="center">
  <img src="https://avatars.githubusercontent.com/u/212287984?s=200&v=4" alt="Basement Logo" width="120" height="120">
</div>

# 🧱 Basement Core

> **A browser-layer social protocol that turns every webpage into a multiplayer experience**

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Anchor](https://img.shields.io/badge/Anchor-0.31.0-blue.svg)](https://www.anchor-lang.com/)
[![Solana](https://img.shields.io/badge/Solana-1.78.4-purple.svg)](https://solana.com/)

## 🌍 What is Basement?

Basement is a revolutionary social protocol that transforms every webpage into a living, breathing community space. Instead of sharing links and jumping to Discord or X to discuss, Basement brings the conversation directly to the content you care about.

### Core Features

- **🧵 Threaded Social Layer**: Every webpage has its own Basement — a space where users can start threads, react, and discuss in-context
- **🤖 AI Gremlins**: Context-aware agents that summarize pages, surface key threads, and ask smart follow-ups
- **💰 Reward Pools**: Threads can carry reward pools in $BASEMENT tokens for top contributors
- **🏆 Basement Score**: A persistent identity and reputation system tied to your contributions across the web
- **🏢 Brand Ownership**: Pages can be claimed by brands to moderate discussions and deploy branded AI Gremlins
- **🚪 Basement Portal**: Central hub for purchasing $BASEMENT, viewing scores, and exploring trending spaces

## 🏗️ Architecture

Basement Core consists of a Solana program built with Anchor that provides the foundational smart contract infrastructure for the Basement protocol.

### Program Structure

```
basement-core/
├── src/
│   ├── lib.rs              # Main program entry point
│   ├── state.rs            # Program state definitions
│   └── instructions/       # Program instructions
│       ├── initialize_basement_v0.rs
│       ├── use_tokens_for_action_v0.rs
│       ├── mint_tokens_v0.rs
│       └── update_basement_config_v0.rs
```

### Core Instructions

- **`initialize_basement`**: Sets up the initial Basement state with token mint and authorities
- **`use_tokens_for_action`**: Allows users to spend $BASEMENT tokens for social actions (comment, thread, boost, graffiti)
- **`mint_tokens`**: Mints new $BASEMENT tokens to specified recipients
- **`update_basement_config`**: Updates program authorities and configuration

### State Management

The program maintains a `BasementStateV0` account that stores:

- **Token Mint**: The $BASEMENT token mint address
- **Mint Authority**: Authority to mint new tokens
- **Action Authority**: Authority to approve token spending actions
- **Update Authority**: Authority to update program configuration

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Yarn](https://yarnpkg.com/) package manager
- [Anchor CLI](https://www.anchor-lang.com/docs/installation)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/basement-/basement-program-library.git
   cd basement-program-library
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Build Anchor dependencies**
   ```bash
   anchor run build-deps
   ```

### Development

1. **Start local development network**

   ```bash
   anchor test --provider.cluster localnet --skip-deploy --skip-local-validator --skip-build
   ```

2. **Bootstrap the program**
   ```bash
   anchor run bootstrap --provider.cluster localnet
   ```

### Testing

Run the test suite:

```bash
anchor test
```

## 📦 SDK Usage

The Basement SDK provides TypeScript/JavaScript bindings for interacting with the Basement Core program.

### Installation

```bash
npm install @basement/basement-sdk
```

### Basic Usage

```typescript
import { init } from "@basement/basement-sdk";

// Initialize connection to Basement Core
const basement = await init({
  connection: connection,
  wallet: wallet,
});

// Use tokens for social actions
await basement.useTokensForAction({
  actionType: "comment",
  amount: 1000000, // 1 $BASEMENT token (6 decimals)
});
```

## 🔧 Development

### Building

```bash
# Build all packages
yarn build

# Build in watch mode
yarn watch

# Clean build artifacts
yarn clean
```

### Code Quality

```bash
# Format code
yarn lint:fix

# Check formatting
yarn lint

# Rust formatting
cargo fmt

# Rust linting
cargo clippy --all-targets -- -D warnings
```

### Release Management

```bash
# Version bump (patch/minor/major)
yarn versionup:patch
yarn versionup:minor
yarn versionup:major

# Publish packages
yarn release

# Publish canary release
yarn release:canary
```

## 🏛️ Governance

Basement Core is designed with a multi-authority governance system:

- **Mint Authority**: Controls token supply and distribution
- **Action Authority**: Approves token spending for social actions
- **Update Authority**: Manages program configuration updates

This structure allows for flexible governance while maintaining security and decentralization.

## 🤝 Contributing

We welcome contributions from the community! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass (`anchor test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website**: [basement.so](https://basement.so)
- **Documentation**: [docs.basement.so](https://docs.basement.so)
- **Discord**: [discord.gg/basement](https://discord.gg/basement)
- **Twitter**: [@basement_so](https://twitter.com/basement_so)

## 🙏 Acknowledgments

- Built with [Anchor](https://www.anchor-lang.com/) framework
- Powered by [Solana](https://solana.com/) blockchain
- Inspired by the vision of a more connected web

---

**Made with ❤️ by the Basement team**
