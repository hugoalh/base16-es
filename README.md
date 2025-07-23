# Base16 (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/base16-es](https://img.shields.io/github/v/release/hugoalh/base16-es?label=hugoalh/base16-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/base16-es")](https://github.com/hugoalh/base16-es)
[![JSR: @hugoalh/base16](https://img.shields.io/jsr/v/@hugoalh/base16?label=@hugoalh/base16&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/base16")](https://jsr.io/@hugoalh/base16)
[![NPM: @hugoalh/base16](https://img.shields.io/npm/v/@hugoalh/base16?label=@hugoalh/base16&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/base16")](https://www.npmjs.com/package/@hugoalh/base16)

An ECMAScript (JavaScript & TypeScript) module for Base16 encode and decode.

## 🌟 Features

- Support encode and decode in stream.

## 🔰 Begin

### 🎯 Targets

| **Targets** | **Remote** | **JSR** | **NPM** |
|:--|:-:|:-:|:-:|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ✔️ | ✔️ |
| **[Deno](https://deno.land/)** >= v2.1.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v20.9.0 | ❌ | ✔️ | ✔️ |

> [!NOTE]
> - It is possible to use this module in other methods/ways which not listed in here, however those methods/ways are not officially supported, and should beware maybe cause security issues.

### #️⃣ Resources Identifier

- **Remote - GitHub Raw:**
  ```
  https://raw.githubusercontent.com/hugoalh/base16-es/{Tag}/mod.ts
  ```
- **JSR:**
  ```
  [jsr:]@hugoalh/base16[@{Tag}]
  ```
- **NPM:**
  ```
  [npm:]@hugoalh/base16[@{Tag}]
  ```

> [!NOTE]
> - For usage of remote resources, it is recommended to import the entire module with the main path `mod.ts`, however it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `_bar`, `_foo`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - For usage of JSR or NPM resources, it is recommended to import the entire module with the main entrypoint, however it is also able to import part of the module with sub entrypoint if available, please visit the [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub entrypoints.
> - It is recommended to use this module with tag for immutability.

### 🛡️ Runtime Permissions

*This module does not request any runtime permission.*

## 🧩 APIs

- ```ts
   class Base16Decoder {
    decodeToBytes(item: string | Uint8Array): Uint8Array;
    decodeToText(item: string | Uint8Array): string;
  }
  ```
- ```ts
   class Base16Encoder {
    encodeToBytes(item: string | Uint8Array): Uint8Array;
    encodeToText(item: string | Uint8Array): string;
  }
  ```
- ```ts
   class Base16DecoderStream extends TransformStream<Uint8Array, Uint8Array> {
  }
  ```
- ```ts
   class Base16EncoderStream extends TransformStream<Uint8Array, Uint8Array> {
  }
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/documentation_generator/)
>   - [JSR](https://jsr.io/@hugoalh/base16)

## ✍️ Examples

- ```ts
  new Base16Encoder().encodeToText("Many hands make light work.");
  //=> "4D616E792068616E6473206D616B65206C6967687420776F726B2E"
  ```
