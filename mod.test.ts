import {
	deepStrictEqual,
	throws
} from "node:assert";
import {
	Base16Decoder,
	Base16Encoder,
	Base16EncoderStream
} from "./mod.ts";
async function testerDirect(t: Deno.TestContext, decoded: string | Uint8Array, encoded: string): Promise<void> {
	await t.step(`Encode`, () => {
		deepStrictEqual(new Base16Encoder().encodeToText(decoded), encoded);
	});
	await t.step(`Decode`, () => {
		deepStrictEqual(new Base16Decoder().decodeToText(encoded), (typeof decoded === "string") ? decoded : new TextDecoder().decode(decoded));
	});
}
Deno.test("Direct 1", { permissions: "none" }, async (t) => {
	await testerDirect(t, Uint8Array.from([]), "");
});
Deno.test("Direct 2", { permissions: "none" }, async (t) => {
	await testerDirect(t, Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7]), "0001020304050607");
});
Deno.test("Direct 3", { permissions: "none" }, async (t) => {
	await testerDirect(t, Uint8Array.from([8, 9, 10, 11, 12, 13, 14, 15]), "08090A0B0C0D0E0F");
});
Deno.test("Direct 4", { permissions: "none" }, async (t) => {
	await testerDirect(t, Uint8Array.from([0xF0, 0xF1, 0xF2, 0xF3, 0xF4, 0xF5, 0xF6, 0xF7]), "F0F1F2F3F4F5F6F7");
});
Deno.test("Direct 5", { permissions: "none" }, async (t) => {
	await testerDirect(t, Uint8Array.from([0xF8, 0xF9, 0xFA, 0xFB, 0xFC, 0xFD, 0xFE, 0xFF]), "F8F9FAFBFCFDFEFF");
});
Deno.test("Direct 6", { permissions: "none" }, async (t) => {
	await testerDirect(t, "g", "67");
});
Deno.test("Direct 7", { permissions: "none" }, async (t) => {
	await testerDirect(t, Uint8Array.from([0xE3, 0xA1]), "E3A1");
});
Deno.test("Direct 8", { permissions: "none" }, async (t) => {
	await testerDirect(t, "Z", "5A");
});
Deno.test("Direct 9", { permissions: "none" }, async (t) => {
	await testerDirect(t, "ZZ", "5A5A");
});
Deno.test("Direct 10", { permissions: "none" }, async (t) => {
	await testerDirect(t, "Many hands make light work.", "4D616E792068616E6473206D616B65206C6967687420776F726B2E");
});
Deno.test("Direct 11", { permissions: "none" }, async (t) => {
	await testerDirect(t, "Hello world!", "48656C6C6F20776F726C6421");
});
Deno.test("Direct 12", { permissions: "none" }, async (t) => {
	await testerDirect(t, Uint8Array.from([0xDE, 0xAD, 0xBE, 0xEF]), "DEADBEEF");
});
Deno.test("Stream 1", {
	permissions: {
		read: true
	}
}, async () => {
	const sampleFilePath = "./README.md";
	const sampleText = await Deno.readTextFile(sampleFilePath);
	const encodedDirect = new Base16Encoder().encodeToText(sampleText);
	await using file = await Deno.open(sampleFilePath);
	const encodedStream = (await Array.fromAsync(file.readable.pipeThrough(new Base16EncoderStream()).pipeThrough(new TextDecoderStream()).values())).join("");
	deepStrictEqual(encodedDirect, encodedStream);
});
Deno.test("Throw 1", { permissions: "none" }, () => {
	throws(() => {
		new Base16Decoder().decodeToText("0");
	});
});
Deno.test("Throw 2", { permissions: "none" }, () => {
	throws(() => {
		new Base16Decoder().decodeToText("zd4aa");
	});
});
Deno.test("Throw 3", { permissions: "none" }, () => {
	throws(() => {
		new Base16Decoder().decodeToText("d4az");
	});
});
Deno.test("Throw 4", { permissions: "none" }, () => {
	throws(() => {
		new Base16Decoder().decodeToText("30313");
	});
});
Deno.test("Throw 5", { permissions: "none" }, () => {
	throws(() => {
		new Base16Decoder().decodeToText("0g");
	});
});
Deno.test("Throw 6", { permissions: "none" }, () => {
	throws(() => {
		new Base16Decoder().decodeToText("00gg");
	});
});
Deno.test("Throw 7", { permissions: "none" }, () => {
	throws(() => {
		new Base16Decoder().decodeToText("0\x01");
	});
});
Deno.test("Throw 8", { permissions: "none" }, () => {
	throws(() => {
		new Base16Decoder().decodeToText("ffeed");
	});
});
