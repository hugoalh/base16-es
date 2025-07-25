/**
 * Base16 decoder.
 */
export class Base16Decoder {
	get [Symbol.toStringTag](): string {
		return "Base16Decoder";
	}
	/**
	 * Decode from Base16 to bytes.
	 * @param {string | Uint8Array} item Item that need to decode.
	 * @returns {Uint8Array} A decoded bytes.
	 */
	decodeToBytes(item: string | Uint8Array): Uint8Array {
		const itemFmt: string = (typeof item === "string") ? item : new TextDecoder().decode(item);
		if (
			itemFmt.length % 2 !== 0 ||
			!itemFmt.toUpperCase().split("").every((character: string): boolean => {
				return "0123456789ABCDEF".includes(character);
			})
		) {
			throw new Error(`Encoded data does not exclusively consist of an even number of hexadecimal characters!`);
		}
		const bin: string[] = [];
		for (let index: number = 0; index < itemFmt.length; index += 2) {
			bin.push(itemFmt.slice(index, index + 2));
		}
		return Uint8Array.from(bin.map((value: string): number => {
			return Number.parseInt(value, 16);
		}));
	}
	/**
	 * Decode from Base16 to text.
	 * @param {string | Uint8Array} item Item that need to decode.
	 * @returns {string} A decoded text.
	 */
	decodeToText(item: string | Uint8Array): string {
		return new TextDecoder().decode(this.decodeToBytes(item));
	}
}
/**
 * Base16 encoder.
 */
export class Base16Encoder {
	get [Symbol.toStringTag](): string {
		return "Base16Encoder";
	}
	/**
	 * Encode to Base16 bytes.
	 * @param {string | Uint8Array} item Item that need to encode.
	 * @returns {Uint8Array} A Base16 encoded bytes.
	 */
	encodeToBytes(item: string | Uint8Array): Uint8Array {
		return new TextEncoder().encode(this.encodeToText(item));
	}
	/**
	 * Encode to Base16 text.
	 * @param {string | Uint8Array} item Item that need to encode.
	 * @returns {string} A Base16 encoded text.
	 */
	encodeToText(item: string | Uint8Array): string {
		const itemFmt: Uint8Array = (typeof item === "string") ? new TextEncoder().encode(item) : item;
		return Array.from(itemFmt, (byte: number): string => {
			return byte.toString(16).toUpperCase().padStart(2, "0");
		}).join("");
	}
}
/**
 * Transform from Base16 encoded bytes stream to bytes stream.
 */
export class Base16DecoderStream extends TransformStream<Uint8Array, Uint8Array> {
	get [Symbol.toStringTag](): string {
		return "Base16DecoderStream";
	}
	#base16Decoder: Base16Decoder;
	#bin: number[] = [];
	/**
	 * Initialize.
	 */
	constructor() {
		super({
			transform: (chunkStream: Uint8Array, controller: TransformStreamDefaultController<Uint8Array>): void => {
				this.#bin.push(...Array.from(chunkStream));
				if (this.#bin.length >= 2) {
					try {
						controller.enqueue(this.#base16Decoder.decodeToBytes(Uint8Array.from(this.#bin.splice(0, Math.floor(this.#bin.length / 2) * 2))));
					} catch (error) {
						controller.error(error);
					}
				}
			},
			flush: (controller: TransformStreamDefaultController<Uint8Array>): void => {
				try {
					controller.enqueue(this.#base16Decoder.decodeToBytes(Uint8Array.from(this.#bin.splice(0, this.#bin.length))));
				} catch (error) {
					controller.error(error);
				}
			}
		});
		this.#base16Decoder = new Base16Decoder();
	}
}
/**
 * Transform from bytes stream to Base16 encoded bytes stream.
 */
export class Base16EncoderStream extends TransformStream<Uint8Array, Uint8Array> {
	get [Symbol.toStringTag](): string {
		return "Base16EncoderStream";
	}
	#base16Encoder: Base16Encoder;
	/**
	 * Initialize.
	 */
	constructor() {
		super({
			transform: (chunkStream: Uint8Array, controller: TransformStreamDefaultController<Uint8Array>): void => {
				try {
					controller.enqueue(this.#base16Encoder.encodeToBytes(chunkStream));
				} catch (error) {
					controller.error(error);
				}
			}
		});
		this.#base16Encoder = new Base16Encoder();
	}
}
