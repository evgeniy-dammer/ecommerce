// @generated by protobuf-ts 2.2.2 with parameter long_type_string
// @generated from protobuf file "service/products/v1/service.proto" (package "ecommerce.products.v1", syntax proto3)
// tslint:disable
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { IntFieldFilter } from "../../../common/filter/v1/filter";
import { StringFieldFilter } from "../../../common/filter/v1/filter";
import { Pagination } from "../../../common/filter/v1/filter";
import { Product } from "./product";
/**
 * @generated from protobuf message ecommerce.products.v1.CreateProductRequest
 */
export interface CreateProductRequest {
    /**
     * Name
     *
     * @generated from protobuf field: string name = 1;
     */
    name: string;
    /**
     * Description
     *
     * @generated from protobuf field: string description = 2;
     */
    description: string;
    /**
     * Image ID
     *
     * @generated from protobuf field: string image_id = 3;
     */
    imageId: string;
    /**
     * Price
     *
     * @generated from protobuf field: string price = 4;
     */
    price: string;
    /**
     * Prince Currency
     *
     * @generated from protobuf field: uint32 currency_id = 5;
     */
    currencyId: number;
    /**
     * Rating
     *
     * @generated from protobuf field: uint32 rating = 6;
     */
    rating: number;
    /**
     * Category ID
     *
     * @generated from protobuf field: string category_id = 7;
     */
    categoryId: string;
    /**
     * Specification
     *
     * @generated from protobuf field: string specification = 8;
     */
    specification: string;
}
/**
 * @generated from protobuf message ecommerce.products.v1.CreateProductResponse
 */
export interface CreateProductResponse {
    /**
     * @generated from protobuf field: ecommerce.products.v1.Product product = 1;
     */
    product?: Product;
}
/**
 * @generated from protobuf message ecommerce.products.v1.AllProductRequest
 */
export interface AllProductRequest {
    /**
     * @generated from protobuf field: common.filter.v1.Pagination pagination = 1;
     */
    pagination?: Pagination;
    /**
     * @generated from protobuf field: common.filter.v1.StringFieldFilter name = 2;
     */
    name?: StringFieldFilter;
    /**
     * @generated from protobuf field: common.filter.v1.StringFieldFilter description = 3;
     */
    description?: StringFieldFilter;
    /**
     * @generated from protobuf field: common.filter.v1.IntFieldFilter price = 4;
     */
    price?: IntFieldFilter;
    /**
     * @generated from protobuf field: common.filter.v1.IntFieldFilter rating = 5;
     */
    rating?: IntFieldFilter;
    /**
     * @generated from protobuf field: common.filter.v1.StringFieldFilter category_id = 6;
     */
    categoryId?: StringFieldFilter;
}
/**
 * @generated from protobuf message ecommerce.products.v1.AllProductResponse
 */
export interface AllProductResponse {
    /**
     * @generated from protobuf field: repeated ecommerce.products.v1.Product products = 1;
     */
    products: Product[];
}
// @generated message type with reflection information, may provide speed optimized methods
class CreateProductRequest$Type extends MessageType<CreateProductRequest> {
    constructor() {
        super("ecommerce.products.v1.CreateProductRequest", [
            { no: 1, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "description", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "image_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "price", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "currency_id", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 6, name: "rating", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 7, name: "category_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 8, name: "specification", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<CreateProductRequest>): CreateProductRequest {
        const message = { name: "", description: "", imageId: "", price: "", currencyId: 0, rating: 0, categoryId: "", specification: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<CreateProductRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreateProductRequest): CreateProductRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string name */ 1:
                    message.name = reader.string();
                    break;
                case /* string description */ 2:
                    message.description = reader.string();
                    break;
                case /* string image_id */ 3:
                    message.imageId = reader.string();
                    break;
                case /* string price */ 4:
                    message.price = reader.string();
                    break;
                case /* uint32 currency_id */ 5:
                    message.currencyId = reader.uint32();
                    break;
                case /* uint32 rating */ 6:
                    message.rating = reader.uint32();
                    break;
                case /* string category_id */ 7:
                    message.categoryId = reader.string();
                    break;
                case /* string specification */ 8:
                    message.specification = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: CreateProductRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string name = 1; */
        if (message.name !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.name);
        /* string description = 2; */
        if (message.description !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.description);
        /* string image_id = 3; */
        if (message.imageId !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.imageId);
        /* string price = 4; */
        if (message.price !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.price);
        /* uint32 currency_id = 5; */
        if (message.currencyId !== 0)
            writer.tag(5, WireType.Varint).uint32(message.currencyId);
        /* uint32 rating = 6; */
        if (message.rating !== 0)
            writer.tag(6, WireType.Varint).uint32(message.rating);
        /* string category_id = 7; */
        if (message.categoryId !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.categoryId);
        /* string specification = 8; */
        if (message.specification !== "")
            writer.tag(8, WireType.LengthDelimited).string(message.specification);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ecommerce.products.v1.CreateProductRequest
 */
export const CreateProductRequest = new CreateProductRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class CreateProductResponse$Type extends MessageType<CreateProductResponse> {
    constructor() {
        super("ecommerce.products.v1.CreateProductResponse", [
            { no: 1, name: "product", kind: "message", T: () => Product }
        ]);
    }
    create(value?: PartialMessage<CreateProductResponse>): CreateProductResponse {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<CreateProductResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreateProductResponse): CreateProductResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* ecommerce.products.v1.Product product */ 1:
                    message.product = Product.internalBinaryRead(reader, reader.uint32(), options, message.product);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: CreateProductResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* ecommerce.products.v1.Product product = 1; */
        if (message.product)
            Product.internalBinaryWrite(message.product, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ecommerce.products.v1.CreateProductResponse
 */
export const CreateProductResponse = new CreateProductResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AllProductRequest$Type extends MessageType<AllProductRequest> {
    constructor() {
        super("ecommerce.products.v1.AllProductRequest", [
            { no: 1, name: "pagination", kind: "message", T: () => Pagination },
            { no: 2, name: "name", kind: "message", T: () => StringFieldFilter },
            { no: 3, name: "description", kind: "message", T: () => StringFieldFilter },
            { no: 4, name: "price", kind: "message", T: () => IntFieldFilter },
            { no: 5, name: "rating", kind: "message", T: () => IntFieldFilter },
            { no: 6, name: "category_id", kind: "message", T: () => StringFieldFilter }
        ]);
    }
    create(value?: PartialMessage<AllProductRequest>): AllProductRequest {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<AllProductRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: AllProductRequest): AllProductRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* common.filter.v1.Pagination pagination */ 1:
                    message.pagination = Pagination.internalBinaryRead(reader, reader.uint32(), options, message.pagination);
                    break;
                case /* common.filter.v1.StringFieldFilter name */ 2:
                    message.name = StringFieldFilter.internalBinaryRead(reader, reader.uint32(), options, message.name);
                    break;
                case /* common.filter.v1.StringFieldFilter description */ 3:
                    message.description = StringFieldFilter.internalBinaryRead(reader, reader.uint32(), options, message.description);
                    break;
                case /* common.filter.v1.IntFieldFilter price */ 4:
                    message.price = IntFieldFilter.internalBinaryRead(reader, reader.uint32(), options, message.price);
                    break;
                case /* common.filter.v1.IntFieldFilter rating */ 5:
                    message.rating = IntFieldFilter.internalBinaryRead(reader, reader.uint32(), options, message.rating);
                    break;
                case /* common.filter.v1.StringFieldFilter category_id */ 6:
                    message.categoryId = StringFieldFilter.internalBinaryRead(reader, reader.uint32(), options, message.categoryId);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: AllProductRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* common.filter.v1.Pagination pagination = 1; */
        if (message.pagination)
            Pagination.internalBinaryWrite(message.pagination, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* common.filter.v1.StringFieldFilter name = 2; */
        if (message.name)
            StringFieldFilter.internalBinaryWrite(message.name, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* common.filter.v1.StringFieldFilter description = 3; */
        if (message.description)
            StringFieldFilter.internalBinaryWrite(message.description, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        /* common.filter.v1.IntFieldFilter price = 4; */
        if (message.price)
            IntFieldFilter.internalBinaryWrite(message.price, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        /* common.filter.v1.IntFieldFilter rating = 5; */
        if (message.rating)
            IntFieldFilter.internalBinaryWrite(message.rating, writer.tag(5, WireType.LengthDelimited).fork(), options).join();
        /* common.filter.v1.StringFieldFilter category_id = 6; */
        if (message.categoryId)
            StringFieldFilter.internalBinaryWrite(message.categoryId, writer.tag(6, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ecommerce.products.v1.AllProductRequest
 */
export const AllProductRequest = new AllProductRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AllProductResponse$Type extends MessageType<AllProductResponse> {
    constructor() {
        super("ecommerce.products.v1.AllProductResponse", [
            { no: 1, name: "products", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Product }
        ]);
    }
    create(value?: PartialMessage<AllProductResponse>): AllProductResponse {
        const message = { products: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<AllProductResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: AllProductResponse): AllProductResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated ecommerce.products.v1.Product products */ 1:
                    message.products.push(Product.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: AllProductResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated ecommerce.products.v1.Product products = 1; */
        for (let i = 0; i < message.products.length; i++)
            Product.internalBinaryWrite(message.products[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ecommerce.products.v1.AllProductResponse
 */
export const AllProductResponse = new AllProductResponse$Type();
/**
 * @generated ServiceType for protobuf service ecommerce.products.v1.ProductService
 */
export const ProductService = new ServiceType("ecommerce.products.v1.ProductService", [
    { name: "CreateProduct", options: {}, I: CreateProductRequest, O: CreateProductResponse },
    { name: "AllProducts", options: {}, I: AllProductRequest, O: AllProductResponse }
]);
