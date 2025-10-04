# Base16 (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/base16-es](https://img.shields.io/github/v/release/hugoalh/base16-es?label=hugoalh/base16-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/base16-es")](https://github.com/hugoalh/base16-es)
[![JSR: @hugoalh/base16](https://img.shields.io/jsr/v/@hugoalh/base16?label=@hugoalh/base16&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/base16")](https://jsr.io/@hugoalh/base16)
[![NPM: @hugoalh/base16](https://img.shields.io/npm/v/@hugoalh/base16?label=@hugoalh/base16&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/base16")](https://www.npmjs.com/package/@hugoalh/base16)

An ECMAScript module for Base16 encode and decode.

## 🌟 Features

- Support stream encode and decode.

## 🎯 Targets

| **Runtime \\ Source** | **GitHub Raw** | **JSR** | **NPM** |
|:--|:-:|:-:|:-:|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ✔️ | ✔️ |
| **[Deno](https://deno.land/)** >= v2.1.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v20.9.0 | ❌ | ✔️ | ✔️ |

## 🛡️ Runtime Permissions

This does not request any runtime permission.

## #️⃣ Sources

- GitHub Raw
  ```
  https://raw.githubusercontent.com/hugoalh/base16-es/{Tag}/mod.ts
  ```
- JSR
  ```
  jsr:@hugoalh/base16[@{Tag}]
  ```
- NPM
  ```
  npm:@hugoalh/base16[@{Tag}]
  ```

> [!NOTE]
> - It is recommended to include tag for immutability.
> - These are not part of the public APIs hence should not be used:
>   - Benchmark/Test file (e.g.: `example.bench.ts`, `example.test.ts`).
>   - Entrypoint name or path include any underscore prefix (e.g.: `_example.ts`, `foo/_example.ts`).
>   - Identifier/Namespace/Symbol include any underscore prefix (e.g.: `_example`, `Foo._example`).

## ⤵️ Entrypoints

| **Name** | **Path** | **Description** |
|:--|:--|:--|
| `.` | `./mod.ts` | Default. |

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
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/doc/)
>   - [JSR](https://jsr.io/@hugoalh/base16)

## ✍️ Examples

- ```ts
  new Base16Encoder().encodeToText("Many hands make light work.");
  //=> "4D616E792068616E6473206D616B65206C6967687420776F726B2E"
  ```
