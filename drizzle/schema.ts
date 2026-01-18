import { pgTable, index, varchar, timestamp, jsonb, bigint, boolean, numeric } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const publicdraftOrders79B101B4Ca87B10B58E3D5B0A862B13B = pgTable("publicdraft_orders79b101b4ca87b10b58e3d5b0a862b13b", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	name: varchar(),
	note: varchar(),
	tags: varchar(),
	email: varchar(),
	status: varchar(),
	currency: varchar(),
	customer: jsonb(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	orderId: bigint("order_id", { mode: "number" }),
	shopUrl: varchar("shop_url"),
	poNumber: varchar("po_number"),
	taxLines: jsonb("tax_lines"),
	totalTax: varchar("total_tax"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	lineItems: jsonb("line_items"),
	taxExempt: boolean("tax_exempt"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	invoiceUrl: varchar("invoice_url"),
	totalPrice: varchar("total_price"),
	completedAt: timestamp("completed_at", { withTimezone: true, mode: 'string' }),
	paymentTerms: varchar("payment_terms"),
	shippingLine: jsonb("shipping_line"),
	subtotalPrice: varchar("subtotal_price"),
	taxesIncluded: boolean("taxes_included"),
	billingAddress: jsonb("billing_address"),
	invoiceSentAt: timestamp("invoice_sent_at", { withTimezone: true, mode: 'string' }),
	noteAttributes: jsonb("note_attributes"),
	appliedDiscount: jsonb("applied_discount"),
	shippingAddress: jsonb("shipping_address"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
}, (table) => [
	index("idx_cursor_publicdraft_orders79b101b4ca87b10b58e3d5b0a862b13b").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicdraft_orders79b101b4ca87b10b58e3d5b0a862").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicdraft_orders79b101b4ca87b10b58e3d5b0a862b13b").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicfulfillments9Ef4952974E9189568C8D1Bff7774035 = pgTable("publicfulfillments9ef4952974e9189568c8d1bff7774035", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	name: varchar(),
	duties: jsonb(),
	status: varchar(),
	receipt: jsonb(),
	service: varchar(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	orderId: bigint("order_id", { mode: "number" }),
	shopUrl: varchar("shop_url"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	lineItems: jsonb("line_items"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	locationId: bigint("location_id", { mode: "number" }),
	trackingUrl: varchar("tracking_url"),
	trackingUrls: jsonb("tracking_urls"),
	originAddress: jsonb("origin_address"),
	notifyCustomer: boolean("notify_customer"),
	shipmentStatus: varchar("shipment_status"),
	trackingNumber: varchar("tracking_number"),
	trackingCompany: varchar("tracking_company"),
	trackingNumbers: jsonb("tracking_numbers"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
	variantInventoryManagement: varchar("variant_inventory_management"),
}, (table) => [
	index("idx_cursor_publicfulfillments9ef4952974e9189568c8d1bff7774035").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicfulfillments9ef4952974e9189568c8d1bff777").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicfulfillments9ef4952974e9189568c8d1bff7774035").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicinventoryLevelseaea063F3Dd4B6Fdbc6F7847545D6Ad6 = pgTable("publicinventory_levelseaea063f3dd4b6fdbc6f7847545d6ad6", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	id: varchar(),
	shopUrl: varchar("shop_url"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	available: bigint({ mode: "number" }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	quantities: jsonb(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	locationId: bigint("location_id", { mode: "number" }),
	canDeactivate: boolean("can_deactivate"),
	locationsCount: jsonb("locations_count"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	inventoryItemId: bigint("inventory_item_id", { mode: "number" }),
	deactivationAlert: varchar("deactivation_alert"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
	inventoryHistoryUrl: varchar("inventory_history_url"),
}, (table) => [
	index("idx_cursor_publicinventory_levelseaea063f3dd4b6fdbc6f7847545d6a").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicinventory_levelseaea063f3dd4b6fdbc6f7847").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicinventory_levelseaea063f3dd4b6fdbc6f7847545d6ad6").using("btree", table.id.asc().nullsLast().op("text_ops")),
]);

export const publicmetafielustomers4Ff8F0B973F7393D481891A1Ea9Bc7E7 = pgTable("publicmetafielustomers4ff8f0b973f7393d481891a1ea9bc7e7", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	key: varchar(),
	type: varchar(),
	value: varchar(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ownerId: bigint("owner_id", { mode: "number" }),
	shopUrl: varchar("shop_url"),
	namespace: varchar(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	valueType: varchar("value_type"),
	description: varchar(),
	ownerResource: varchar("owner_resource"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
}, (table) => [
	index("idx_cursor_publicmetafielustomers4ff8f0b973f7393d481891a1ea9bc7").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicmetafielustomers4ff8f0b973f7393d481891a1").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicmetafielustomers4ff8f0b973f7393d481891a1ea9bc7e7").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicmetafielocations9Df64230C69C37513F0C9F861774075D = pgTable("publicmetafielocations9df64230c69c37513f0c9f861774075d", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	key: varchar(),
	type: varchar(),
	value: varchar(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ownerId: bigint("owner_id", { mode: "number" }),
	shopUrl: varchar("shop_url"),
	namespace: varchar(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	valueType: varchar("value_type"),
	description: varchar(),
	ownerResource: varchar("owner_resource"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
}, (table) => [
	index("idx_cursor_publicmetafielocations9df64230c69c37513f0c9f86177407").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicmetafielocations9df64230c69c37513f0c9f86").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicmetafielocations9df64230c69c37513f0c9f861774075d").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicmetafieltImages38Af7522443Cf591885F430505Fcbfae = pgTable("publicmetafielt_images38af7522443cf591885f430505fcbfae", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	key: varchar(),
	type: varchar(),
	value: varchar(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ownerId: bigint("owner_id", { mode: "number" }),
	shopUrl: varchar("shop_url"),
	namespace: varchar(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	valueType: varchar("value_type"),
	description: varchar(),
	ownerResource: varchar("owner_resource"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
}, (table) => [
	index("idx_cursor_publicmetafielt_images38af7522443cf591885f430505fcbf").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicmetafielt_images38af7522443cf591885f4305").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicmetafielt_images38af7522443cf591885f430505fcbfae").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicmetafielvariants04A27F8C18F90Da86C18A43844Bd76F1 = pgTable("publicmetafielvariants04a27f8c18f90da86c18a43844bd76f1", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	key: varchar(),
	type: varchar(),
	value: varchar(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ownerId: bigint("owner_id", { mode: "number" }),
	shopUrl: varchar("shop_url"),
	namespace: varchar(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	valueType: varchar("value_type"),
	description: varchar(),
	ownerResource: varchar("owner_resource"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
}, (table) => [
	index("idx_cursor_publicmetafielvariants04a27f8c18f90da86c18a43844bd76").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicmetafielvariants04a27f8c18f90da86c18a438").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicmetafielvariants04a27f8c18f90da86c18a43844bd76f1").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicmetafieldShops446C956F6Cbfd06D2619F6E1A6712640 = pgTable("publicmetafield_shops446c956f6cbfd06d2619f6e1a6712640", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	key: varchar(),
	type: varchar(),
	value: varchar(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ownerId: bigint("owner_id", { mode: "number" }),
	shopUrl: varchar("shop_url"),
	namespace: varchar(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	valueType: varchar("value_type"),
	description: varchar(),
	ownerResource: varchar("owner_resource"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
}, (table) => [
	index("idx_cursor_publicmetafield_shops446c956f6cbfd06d2619f6e1a671264").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicmetafield_shops446c956f6cbfd06d2619f6e1a").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicmetafield_shops446c956f6cbfd06d2619f6e1a6712640").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicmetafielproducts206D401F7B8C7190692D8C2116626B45 = pgTable("publicmetafielproducts206d401f7b8c7190692d8c2116626b45", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	key: varchar(),
	type: varchar(),
	value: varchar(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ownerId: bigint("owner_id", { mode: "number" }),
	shopUrl: varchar("shop_url"),
	namespace: varchar(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	valueType: varchar("value_type"),
	description: varchar(),
	ownerResource: varchar("owner_resource"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
}, (table) => [
	index("idx_cursor_publicmetafielproducts206d401f7b8c7190692d8c2116626b").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicmetafielproducts206d401f7b8c7190692d8c21").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicmetafielproducts206d401f7b8c7190692d8c2116626b45").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicorderAgreements862Ca4835680Ffeac9F4Ac4Fe2Cf787D = pgTable("publicorder_agreements862ca4835680ffeac9f4ac4fe2cf787d", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	shopUrl: varchar("shop_url"),
	agreements: jsonb(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
}, (table) => [
	index("idx_cursor_publicorder_agreements862ca4835680ffeac9f4ac4fe2cf78").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicorder_agreements862ca4835680ffeac9f4ac4f").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicorder_agreements862ca4835680ffeac9f4ac4fe2cf787d").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicmetafiellectionsed3C16A36B007B3Df1Bddc5Cf8Eb518C = pgTable("publicmetafiellectionsed3c16a36b007b3df1bddc5cf8eb518c", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	key: varchar(),
	type: varchar(),
	value: varchar(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ownerId: bigint("owner_id", { mode: "number" }),
	shopUrl: varchar("shop_url"),
	namespace: varchar(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	valueType: varchar("value_type"),
	description: varchar(),
	ownerResource: varchar("owner_resource"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
}, (table) => [
	index("idx_cursor_publicmetafiellectionsed3c16a36b007b3df1bddc5cf8eb51").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicmetafiellectionsed3c16a36b007b3df1bddc5c").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicmetafiellectionsed3c16a36b007b3df1bddc5cf8eb518c").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publiccollectionsbc629A20F586907F9Ce6Ea6429A6E2F8 = pgTable("publiccollectionsbc629a20f586907f9ce6ea6429a6e2f8", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	title: varchar(),
	handle: varchar(),
	shopUrl: varchar("shop_url"),
	bodyHtml: varchar("body_html"),
	sortOrder: varchar("sort_order"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	publishedAt: timestamp("published_at", { withTimezone: true, mode: 'string' }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productsCount: bigint("products_count", { mode: "number" }),
	collectionType: varchar("collection_type"),
	publishedScope: varchar("published_scope"),
	templateSuffix: varchar("template_suffix"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
}, (table) => [
	index("idx_cursor_publiccollectionsbc629a20f586907f9ce6ea6429a6e2f8").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publiccollectionsbc629a20f586907f9ce6ea6429a6e").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publiccollectionsbc629a20f586907f9ce6ea6429a6e2f8").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicabandoneheckouts6Ea760B115825312576019E62Fe605B5 = pgTable("publicabandoneheckouts6ea760b115825312576019e62fe605b5", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	name: varchar(),
	note: varchar(),
	email: varchar(),
	phone: varchar(),
	token: varchar(),
	source: varchar(),
	gateway: varchar(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	userId: bigint("user_id", { mode: "number" }),
	currency: varchar(),
	customer: jsonb(),
	shopUrl: varchar("shop_url"),
	closedAt: timestamp("closed_at", { withTimezone: true, mode: 'string' }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	deviceId: bigint("device_id", { mode: "number" }),
	taxLines: jsonb("tax_lines"),
	totalTax: numeric("total_tax"),
	cartToken: varchar("cart_token"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	lineItems: jsonb("line_items"),
	sourceUrl: varchar("source_url"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	locationId: bigint("location_id", { mode: "number" }),
	sourceName: varchar("source_name"),
	totalPrice: numeric("total_price"),
	completedAt: timestamp("completed_at", { withTimezone: true, mode: 'string' }),
	landingSite: varchar("landing_site"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	totalWeight: bigint("total_weight", { mode: "number" }),
	discountCodes: jsonb("discount_codes"),
	referringSite: varchar("referring_site"),
	shippingLines: jsonb("shipping_lines"),
	subtotalPrice: numeric("subtotal_price"),
	taxesIncluded: boolean("taxes_included"),
	billingAddress: jsonb("billing_address"),
	customerLocale: varchar("customer_locale"),
	noteAttributes: jsonb("note_attributes"),
	totalDiscounts: numeric("total_discounts"),
	shippingAddress: jsonb("shipping_address"),
	sourceIdentifier: varchar("source_identifier"),
	presentmentCurrency: varchar("presentment_currency"),
	abandonedCheckoutUrl: varchar("abandoned_checkout_url"),
	totalLineItemsPrice: numeric("total_line_items_price"),
	buyerAcceptsMarketing: boolean("buyer_accepts_marketing"),
}, (table) => [
	index("idx_cursor_publicabandoneheckouts6ea760b115825312576019e62fe605").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicabandoneheckouts6ea760b115825312576019e6").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicabandoneheckouts6ea760b115825312576019e62fe605b5").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publiccollectsbb08F46B51982F1Fb77130C6Ef8D92Ee = pgTable("publiccollectsbb08f46b51982f1fb77130c6ef8d92ee", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	position: bigint({ mode: "number" }),
	shopUrl: varchar("shop_url"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productId: bigint("product_id", { mode: "number" }),
	sortValue: varchar("sort_value"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	collectionId: bigint("collection_id", { mode: "number" }),
}, (table) => [
	index("idx_cursor_publiccollectsbb08f46b51982f1fb77130c6ef8d92ee").using("btree", table.id.asc().nullsLast().op("int8_ops")),
	index("idx_extracted_at_publiccollectsbb08f46b51982f1fb77130c6ef8d92ee").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publiccollectsbb08f46b51982f1fb77130c6ef8d92ee").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publiccustomClections3228491375F12E53D8F674A1199E5E2C = pgTable("publiccustom_clections3228491375f12e53d8f674a1199e5e2c", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	image: jsonb(),
	title: varchar(),
	handle: varchar(),
	shopUrl: varchar("shop_url"),
	bodyHtml: varchar("body_html"),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
	sortOrder: varchar("sort_order"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	publishedAt: timestamp("published_at", { withTimezone: true, mode: 'string' }),
	deletedMessage: varchar("deleted_message"),
	publishedScope: varchar("published_scope"),
	templateSuffix: varchar("template_suffix"),
	deletedDescription: varchar("deleted_description"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
}, (table) => [
	index("idx_cursor_publiccustom_clections3228491375f12e53d8f674a1199e5e").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publiccustom_clections3228491375f12e53d8f674a1").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publiccustom_clections3228491375f12e53d8f674a1199e5e2c").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publiccustomerSummary83E70F07F5A3B06C51005A29988Aca51 = pgTable("publiccustomer_summary83e70f07f5a3b06c51005a29988aca51", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	orderId: bigint("order_id", { mode: "number" }),
	shopUrl: varchar("shop_url"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
	customerJourneySummary: jsonb("customer_journey_summary"),
}, (table) => [
	index("idx_cursor_publiccustomer_summary83e70f07f5a3b06c51005a29988aca").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publiccustomer_summary83e70f07f5a3b06c51005a29").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publiccustomer_summary83e70f07f5a3b06c51005a29988aca51").using("btree", table.orderId.asc().nullsLast().op("int8_ops")),
]);

export const publiccustomersfe732Ab41Ed3Bee12C8Bd482D67Fefd8 = pgTable("publiccustomersfe732ab41ed3bee12c8bd482d67fefd8", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	note: varchar(),
	tags: varchar(),
	email: varchar(),
	phone: varchar(),
	state: varchar(),
	currency: varchar(),
	shopUrl: varchar("shop_url"),
	addresses: jsonb(),
	lastName: varchar("last_name"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	firstName: varchar("first_name"),
	taxExempt: boolean("tax_exempt"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	totalSpent: numeric("total_spent"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ordersCount: bigint("orders_count", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	lastOrderId: bigint("last_order_id", { mode: "number" }),
	taxExemptions: varchar("tax_exemptions"),
	verifiedEmail: boolean("verified_email"),
	defaultAddress: jsonb("default_address"),
	lastOrderName: varchar("last_order_name"),
	acceptsMarketing: boolean("accepts_marketing"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
	multipassIdentifier: varchar("multipass_identifier"),
	smsMarketingConsent: jsonb("sms_marketing_consent"),
	marketingOptInLevel: varchar("marketing_opt_in_level"),
	emailMarketingConsent: jsonb("email_marketing_consent"),
	acceptsMarketingUpdatedAt: jsonb("accepts_marketing_updated_at"),
}, (table) => [
	index("idx_cursor_publiccustomersfe732ab41ed3bee12c8bd482d67fefd8").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publiccustomersfe732ab41ed3bee12c8bd482d67fefd").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publiccustomersfe732ab41ed3bee12c8bd482d67fefd8").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicdiscountCodes81E54B50A03C77Cd76Efb3D1C8Bf3A79 = pgTable("publicdiscount_codes81e54b50a03c77cd76efb3d1c8bf3a79", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	code: varchar(),
	title: varchar(),
	status: varchar(),
	endsAt: timestamp("ends_at", { withTimezone: true, mode: 'string' }),
	summary: varchar(),
	shopUrl: varchar("shop_url"),
	typename: varchar(),
	createdBy: jsonb(),
	startsAt: timestamp("starts_at", { withTimezone: true, mode: 'string' }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	codesCount: jsonb("codes_count"),
	totalSales: jsonb("total_sales"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	usageCount: bigint("usage_count", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	usageLimit: bigint("usage_limit", { mode: "number" }),
	discountType: varchar("discount_type"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	priceRuleId: bigint("price_rule_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	asyncUsageCount: bigint("async_usage_count", { mode: "number" }),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
	appliesOncePerCustomer: boolean("applies_once_per_customer"),
}, (table) => [
	index("idx_cursor_publicdiscount_codes81e54b50a03c77cd76efb3d1c8bf3a79").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicdiscount_codes81e54b50a03c77cd76efb3d1c8").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicdiscount_codes81e54b50a03c77cd76efb3d1c8bf3a79").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicfulfillmtOrders7A1Ed405627D57677Cd891318378D37F = pgTable("publicfulfillmt_orders7a1ed405627d57677cd891318378d37f", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	status: varchar(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	shopId: bigint("shop_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	orderId: bigint("order_id", { mode: "number" }),
	shopUrl: varchar("shop_url"),
	channelId: varchar("channel_id"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	fulfillAt: timestamp("fulfill_at", { withTimezone: true, mode: 'string' }),
	fulfillBy: varchar("fulfill_by"),
	lineItems: jsonb("line_items"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	destination: jsonb(),
	fulfilledAt: timestamp("fulfilled_at", { withTimezone: true, mode: 'string' }),
	requestStatus: varchar("request_status"),
	deliveryMethod: jsonb("delivery_method"),
	assignedLocation: jsonb("assigned_location"),
	fulfillmentHolds: jsonb("fulfillment_holds"),
	merchantRequests: jsonb("merchant_requests"),
	supportedActions: jsonb("supported_actions"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	assignedLocationId: bigint("assigned_location_id", { mode: "number" }),
	internationalDuties: varchar("international_duties"),
}, (table) => [
	index("idx_cursor_publicfulfillmt_orders7a1ed405627d57677cd891318378d3").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicfulfillmt_orders7a1ed405627d57677cd89131").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicfulfillmt_orders7a1ed405627d57677cd891318378d37f").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicinventoryItemse388Eecf9Cce8E96Ee4C6Ea53Cf05820 = pgTable("publicinventory_itemse388eecf9cce8e96ee4c6ea53cf05820", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	sku: varchar(),
	cost: numeric(),
	tracked: boolean(),
	shopUrl: varchar("shop_url"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	currencyCode: varchar("currency_code"),
	requiresShipping: boolean("requires_shipping"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	duplicateSkuCount: bigint("duplicate_sku_count", { mode: "number" }),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
	countryCodeOfOrigin: varchar("country_code_of_origin"),
	harmonizedSystemCode: varchar("harmonized_system_code"),
	provinceCodeOfOrigin: varchar("province_code_of_origin"),
	countryHarmonizedSystemCodes: jsonb("country_harmonized_system_codes"),
}, (table) => [
	index("idx_cursor_publicinventory_itemse388eecf9cce8e96ee4c6ea53cf0582").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicinventory_itemse388eecf9cce8e96ee4c6ea53").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicinventory_itemse388eecf9cce8e96ee4c6ea53cf05820").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publiclocationsaffaf6F2Dfe22E8Bde5Cf276F602A62F = pgTable("publiclocationsaffaf6f2dfe22e8bde5cf276f602a62f", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	zip: varchar(),
	city: varchar(),
	name: varchar(),
	phone: varchar(),
	active: boolean(),
	legacy: boolean(),
	country: varchar(),
	address1: varchar(),
	address2: varchar(),
	province: varchar(),
	shopUrl: varchar("shop_url"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	countryCode: varchar("country_code"),
	countryName: varchar("country_name"),
	provinceCode: varchar("province_code"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
	localizedCountryName: varchar("localized_country_name"),
	localizedProvinceName: varchar("localized_province_name"),
}, (table) => [
	index("idx_extracted_at_publiclocationsaffaf6f2dfe22e8bde5cf276f602a62").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publiclocationsaffaf6f2dfe22e8bde5cf276f602a62f").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicmetafiellections27Cd4237572F4435C93C15E3Dd1149B8 = pgTable("publicmetafiellections27cd4237572f4435c93c15e3dd1149b8", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	key: varchar(),
	type: varchar(),
	value: varchar(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ownerId: bigint("owner_id", { mode: "number" }),
	shopUrl: varchar("shop_url"),
	namespace: varchar(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	valueType: varchar("value_type"),
	description: varchar(),
	ownerResource: varchar("owner_resource"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
}, (table) => [
	index("idx_cursor_publicmetafiellections27cd4237572f4435c93c15e3dd1149").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicmetafiellections27cd4237572f4435c93c15e3").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicmetafiellections27cd4237572f4435c93c15e3dd1149b8").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicmetafieltOrders43Bdfc9F5Dfe5198923248B16885Aee9 = pgTable("publicmetafielt_orders43bdfc9f5dfe5198923248b16885aee9", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	key: varchar(),
	type: varchar(),
	value: varchar(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ownerId: bigint("owner_id", { mode: "number" }),
	shopUrl: varchar("shop_url"),
	namespace: varchar(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	valueType: varchar("value_type"),
	description: varchar(),
	ownerResource: varchar("owner_resource"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
}, (table) => [
	index("idx_cursor_publicmetafielt_orders43bdfc9f5dfe5198923248b16885ae").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicmetafielt_orders43bdfc9f5dfe5198923248b1").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicmetafielt_orders43bdfc9f5dfe5198923248b16885aee9").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicmetafieldOrders72534Dff8Bce30966E60A31D527Df0D8 = pgTable("publicmetafield_orders72534dff8bce30966e60a31d527df0d8", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	key: varchar(),
	type: varchar(),
	value: varchar(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ownerId: bigint("owner_id", { mode: "number" }),
	shopUrl: varchar("shop_url"),
	namespace: varchar(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	valueType: varchar("value_type"),
	description: varchar(),
	ownerResource: varchar("owner_resource"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
}, (table) => [
	index("idx_cursor_publicmetafield_orders72534dff8bce30966e60a31d527df0").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicmetafield_orders72534dff8bce30966e60a31d").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicmetafield_orders72534dff8bce30966e60a31d527df0d8").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicorderRefunds94De9681F36726A969D173C4D0837A90 = pgTable("publicorder_refunds94de9681f36726a969d173c4d0837a90", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	note: varchar(),
	duties: varchar(),
	return: jsonb(),
	restock: boolean(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	userId: bigint("user_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	orderId: bigint("order_id", { mode: "number" }),
	shopUrl: varchar("shop_url"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	processedAt: varchar("processed_at"),
	transactions: jsonb(),
	totalDutiesSet: jsonb("total_duties_set"),
	orderAdjustments: jsonb("order_adjustments"),
	refundLineItems: jsonb("refund_line_items"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
}, (table) => [
	index("idx_cursor_publicorder_refunds94de9681f36726a969d173c4d0837a90").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicorder_refunds94de9681f36726a969d173c4d08").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicorder_refunds94de9681f36726a969d173c4d0837a90").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicorders4D64F11Fd4Dbaa07D147F1318Ce8Af5A = pgTable("publicorders4d64f11fd4dbaa07d147f1318ce8af5a", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	name: varchar(),
	note: varchar(),
	tags: varchar(),
	test: boolean(),
	email: varchar(),
	phone: varchar(),
	token: varchar(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	appId: bigint("app_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	number: bigint({ mode: "number" }),
	company: varchar(),
	refunds: jsonb(),
	userId: numeric("user_id"),
	currency: varchar(),
	customer: jsonb(),
	shopUrl: varchar("shop_url"),
	closedAt: timestamp("closed_at", { withTimezone: true, mode: 'string' }),
	confirmed: boolean(),
	deviceId: varchar("device_id"),
	poNumber: varchar("po_number"),
	reference: varchar(),
	taxLines: jsonb("tax_lines"),
	totalTax: numeric("total_tax"),
	browserIp: varchar("browser_ip"),
	cartToken: varchar("cart_token"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
	lineItems: jsonb("line_items"),
	sourceUrl: varchar("source_url"),
	taxExempt: boolean("tax_exempt"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	checkoutId: bigint("checkout_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	locationId: bigint("location_id", { mode: "number" }),
	sourceName: varchar("source_name"),
	totalPrice: numeric("total_price"),
	cancelledAt: timestamp("cancelled_at", { withTimezone: true, mode: 'string' }),
	fulfillments: jsonb(),
	landingSite: varchar("landing_site"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	orderNumber: bigint("order_number", { mode: "number" }),
	processedAt: varchar("processed_at"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	totalWeight: bigint("total_weight", { mode: "number" }),
	cancelReason: varchar("cancel_reason"),
	contactEmail: varchar("contact_email"),
	paymentTerms: varchar("payment_terms"),
	totalTaxSet: jsonb("total_tax_set"),
	checkoutToken: varchar("checkout_token"),
	clientDetails: jsonb("client_details"),
	discountCodes: jsonb("discount_codes"),
	referringSite: varchar("referring_site"),
	shippingLines: jsonb("shipping_lines"),
	subtotalPrice: numeric("subtotal_price"),
	taxesIncluded: boolean("taxes_included"),
	billingAddress: jsonb("billing_address"),
	customerLocale: varchar("customer_locale"),
	deletedMessage: varchar("deleted_message"),
	dutiesIncluded: boolean("duties_included"),
	estimatedTaxes: boolean("estimated_taxes"),
	noteAttributes: jsonb("note_attributes"),
	totalDiscounts: numeric("total_discounts"),
	totalPriceSet: jsonb("total_price_set"),
	totalPriceUsd: numeric("total_price_usd"),
	financialStatus: varchar("financial_status"),
	landingSiteRef: varchar("landing_site_ref"),
	orderStatusUrl: varchar("order_status_url"),
	shippingAddress: jsonb("shipping_address"),
	currentTotalTax: numeric("current_total_tax"),
	sourceIdentifier: varchar("source_identifier"),
	totalOutstanding: numeric("total_outstanding"),
	fulfillmentStatus: varchar("fulfillment_status"),
	subtotalPriceSet: jsonb("subtotal_price_set"),
	totalTipReceived: numeric("total_tip_received"),
	confirmationNumber: varchar("confirmation_number"),
	currentTotalPrice: numeric("current_total_price"),
	deletedDescription: varchar("deleted_description"),
	totalDiscountsSet: jsonb("total_discounts_set"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
	discountAllocations: jsonb("discount_allocations"),
	presentmentCurrency: varchar("presentment_currency"),
	currentTotalTaxSet: jsonb("current_total_tax_set"),
	discountApplications: jsonb("discount_applications"),
	paymentGatewayNames: jsonb("payment_gateway_names"),
	currentSubtotalPrice: numeric("current_subtotal_price"),
	totalLineItemsPrice: numeric("total_line_items_price"),
	buyerAcceptsMarketing: boolean("buyer_accepts_marketing"),
	currentTotalDiscounts: numeric("current_total_discounts"),
	currentTotalPriceSet: jsonb("current_total_price_set"),
	currentTotalDutiesSet: varchar("current_total_duties_set"),
	totalShippingPriceSet: jsonb("total_shipping_price_set"),
	merchantOfRecordAppId: varchar("merchant_of_record_app_id"),
	originalTotalDutiesSet: varchar("original_total_duties_set"),
	currentSubtotalPriceSet: jsonb("current_subtotal_price_set"),
	totalLineItemsPriceSet: jsonb("total_line_items_price_set"),
	currentTotalDiscountsSet: jsonb("current_total_discounts_set"),
	merchantBusinessEntityId: varchar("merchant_business_entity_id"),
	currentTotalAdditionalFeesSet: jsonb("current_total_additional_fees_set"),
	originalTotalAdditionalFeesSet: jsonb("original_total_additional_fees_set"),
	totalCashRoundingPaymentAdjustmentSet: jsonb("total_cash_rounding_payment_adjustment_set"),
}, (table) => [
	index("idx_cursor_publicorders4d64f11fd4dbaa07d147f1318ce8af5a").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicorders4d64f11fd4dbaa07d147f1318ce8af5a").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicorders4d64f11fd4dbaa07d147f1318ce8af5a").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicproductImages18Ddb6A37Ffb0E556E8628A44610B703 = pgTable("publicproduct_images18ddb6a37ffb0e556e8628a44610b703", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	alt: varchar(),
	src: varchar(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	width: bigint({ mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	height: bigint({ mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	position: bigint({ mode: "number" }),
	shopUrl: varchar("shop_url"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productId: bigint("product_id", { mode: "number" }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	variantIds: jsonb("variant_ids"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
}, (table) => [
	index("idx_cursor_publicproduct_images18ddb6a37ffb0e556e8628a44610b703").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicproduct_images18ddb6a37ffb0e556e8628a446").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicproduct_images18ddb6a37ffb0e556e8628a44610b703").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicdeletedProducts3433Ee1C42935D80B3F086E78E7C6Be0 = pgTable("publicdeleted_products3433ee1c42935d80b3f086e78e7c6be0", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	shopUrl: varchar("shop_url"),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
	deletedMessage: varchar("deleted_message"),
	deletedDescription: varchar("deleted_description"),
}, (table) => [
	index("idx_cursor_publicdeleted_products3433ee1c42935d80b3f086e78e7c6b").using("btree", table.deletedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicdeleted_products3433ee1c42935d80b3f086e7").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicdeleted_products3433ee1c42935d80b3f086e78e7c6be0").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicshop85Cc404C69B63Caae31D3130Bd452224 = pgTable("publicshop85cc404c69b63caae31d3130bd452224", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	zip: varchar(),
	city: varchar(),
	name: varchar(),
	email: varchar(),
	phone: varchar(),
	domain: varchar(),
	source: varchar(),
	country: varchar(),
	address1: varchar(),
	address2: varchar(),
	currency: varchar(),
	finances: boolean(),
	latitude: numeric(),
	province: varchar(),
	shopUrl: varchar("shop_url"),
	timezone: varchar(),
	forceSsl: boolean("force_ssl"),
	longitude: numeric(),
	planName: varchar("plan_name"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	shopOwner: varchar("shop_owner"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	weightUnit: varchar("weight_unit"),
	countryCode: varchar("country_code"),
	countryName: varchar("country_name"),
	countyTaxes: boolean("county_taxes"),
	moneyFormat: varchar("money_format"),
	taxShipping: boolean("tax_shipping"),
	hasDiscounts: boolean("has_discounts"),
	ianaTimezone: varchar("iana_timezone"),
	provinceCode: varchar("province_code"),
	customerEmail: varchar("customer_email"),
	hasGiftCards: boolean("has_gift_cards"),
	hasStorefront: boolean("has_storefront"),
	primaryLocale: varchar("primary_locale"),
	setupRequired: boolean("setup_required"),
	taxesIncluded: boolean("taxes_included"),
	myshopifyDomain: varchar("myshopify_domain"),
	passwordEnabled: boolean("password_enabled"),
	planDisplayName: varchar("plan_display_name"),
	googleAppsDomain: varchar("google_apps_domain"),
	preLaunchEnabled: boolean("pre_launch_enabled"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	primaryLocationId: bigint("primary_location_id", { mode: "number" }),
	cookieConsentLevel: varchar("cookie_consent_level"),
	eligibleForPayments: boolean("eligible_for_payments"),
	checkoutApiSupported: boolean("checkout_api_supported"),
	moneyInEmailsFormat: varchar("money_in_emails_format"),
	multiLocationEnabled: boolean("multi_location_enabled"),
	googleAppsLoginEnabled: boolean("google_apps_login_enabled"),
	moneyWithCurrencyFormat: varchar("money_with_currency_format"),
	transactionalSmsDisabled: boolean("transactional_sms_disabled"),
	autoConfigureTaxInclusivity: varchar("auto_configure_tax_inclusivity"),
	enabledPresentmentCurrencies: jsonb("enabled_presentment_currencies"),
	eligibleForCardReaderGiveaway: boolean("eligible_for_card_reader_giveaway"),
	requiresExtraPaymentsAgreement: boolean("requires_extra_payments_agreement"),
	visitorTrackingConsentPreference: varchar("visitor_tracking_consent_preference"),
	moneyWithCurrencyInEmailsFormat: varchar("money_with_currency_in_emails_format"),
	marketingSmsConsentEnabledAtCheckout: boolean("marketing_sms_consent_enabled_at_checkout"),
}, (table) => [
	index("idx_extracted_at_publicshop85cc404c69b63caae31d3130bd452224").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicshop85cc404c69b63caae31d3130bd452224").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publiccustomerAddress4D3F2524D09D9Fd7D624228C37651C4D = pgTable("publiccustomer_address4d3f2524d09d9fd7d624228c37651c4d", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	zip: varchar(),
	city: varchar(),
	name: varchar(),
	phone: varchar(),
	company: varchar(),
	country: varchar(),
	default: boolean(),
	address1: varchar(),
	address2: varchar(),
	province: varchar(),
	shopUrl: varchar("shop_url"),
	lastName: varchar("last_name"),
	firstName: varchar("first_name"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	customerId: bigint("customer_id", { mode: "number" }),
	countryCode: varchar("country_code"),
	countryName: varchar("country_name"),
	provinceCode: varchar("province_code"),
}, (table) => [
	index("idx_cursor_publiccustomer_address4d3f2524d09d9fd7d624228c37651c").using("btree", table.id.asc().nullsLast().op("int8_ops")),
	index("idx_extracted_at_publiccustomer_address4d3f2524d09d9fd7d624228c").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publiccustomer_address4d3f2524d09d9fd7d624228c37651c4d").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicorderRisks4637Ecbce1950E3680D8Fba0B7A8B3C3 = pgTable("publicorder_risks4637ecbce1950e3680d8fba0b7a8b3c3", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	score: numeric(),
	source: varchar(),
	display: boolean(),
	message: varchar(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	orderId: bigint("order_id", { mode: "number" }),
	shopUrl: varchar("shop_url"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	assessments: jsonb(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	checkoutId: bigint("checkout_id", { mode: "number" }),
	causeCancel: boolean("cause_cancel"),
	recommendation: varchar(),
	merchantMessage: varchar("merchant_message"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
}, (table) => [
	index("idx_cursor_publicorder_risks4637ecbce1950e3680d8fba0b7a8b3c3").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicorder_risks4637ecbce1950e3680d8fba0b7a8b").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicorder_risks4637ecbce1950e3680d8fba0b7a8b3c3").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicpriceRulesd672Ce23Efa4Dc4Ef079Eafaa8645C9E = pgTable("publicprice_rulesd672ce23efa4dc4ef079eafaa8645c9e", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	title: varchar(),
	value: varchar(),
	endsAt: timestamp("ends_at", { withTimezone: true, mode: 'string' }),
	shopUrl: varchar("shop_url"),
	startsAt: timestamp("starts_at", { withTimezone: true, mode: 'string' }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	valueType: varchar("value_type"),
	targetType: varchar("target_type"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	usageLimit: bigint("usage_limit", { mode: "number" }),
	deletedMessage: varchar("deleted_message"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	allocationLimit: bigint("allocation_limit", { mode: "number" }),
	targetSelection: varchar("target_selection"),
	allocationMethod: varchar("allocation_method"),
	oncePerCustomer: boolean("once_per_customer"),
	customerSelection: varchar("customer_selection"),
	deletedDescription: varchar("deleted_description"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
	entitledCountryIds: jsonb("entitled_country_ids"),
	entitledProductIds: jsonb("entitled_product_ids"),
	entitledVariantIds: jsonb("entitled_variant_ids"),
	entitledCollectionIds: jsonb("entitled_collection_ids"),
	prerequisiteProductIds: jsonb("prerequisite_product_ids"),
	prerequisiteVariantIds: jsonb("prerequisite_variant_ids"),
	prerequisiteCustomerIds: jsonb("prerequisite_customer_ids"),
	prerequisiteCollectionIds: jsonb("prerequisite_collection_ids"),
	prerequisiteQuantityRange: jsonb("prerequisite_quantity_range"),
	prerequisiteSubtotalRange: jsonb("prerequisite_subtotal_range"),
	prerequisiteSavedSearchIds: jsonb("prerequisite_saved_search_ids"),
	customerSegmentPrerequisiteIds: jsonb("customer_segment_prerequisite_ids"),
	prerequisiteShippingPriceRange: jsonb("prerequisite_shipping_price_range"),
	prerequisiteToEntitlementPurchase: jsonb("prerequisite_to_entitlement_purchase"),
	prerequisiteToEntitlementQuantityRatio: jsonb("prerequisite_to_entitlement_quantity_ratio"),
}, (table) => [
	index("idx_cursor_publicprice_rulesd672ce23efa4dc4ef079eafaa8645c9e").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicprice_rulesd672ce23efa4dc4ef079eafaa8645").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicprice_rulesd672ce23efa4dc4ef079eafaa8645c9e").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicproductsb85Ff759A171A5B9C3B40176A0D0F716 = pgTable("publicproductsb85ff759a171a5b9c3b40176a0d0f716", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	seo: jsonb(),
	tags: varchar(),
	image: jsonb(),
	title: varchar(),
	handle: varchar(),
	images: jsonb(),
	status: varchar(),
	vendor: varchar(),
	options: jsonb(),
	feedback: jsonb(),
	shopUrl: varchar("shop_url"),
	variants: jsonb(),
	bodyHtml: varchar("body_html"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	description: varchar(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	mediaCount: bigint("media_count", { mode: "number" }),
	isGiftCard: boolean("is_gift_card"),
	productType: varchar("product_type"),
	publishedAt: timestamp("published_at", { withTimezone: true, mode: 'string' }),
	featuredImage: jsonb("featured_image"),
	featuredMedia: jsonb("featured_media"),
	priceRangeV2: jsonb("price_range_v2"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	totalVariants: bigint("total_variants", { mode: "number" }),
	deletedMessage: varchar("deleted_message"),
	publishedScope: varchar("published_scope"),
	templateSuffix: varchar("template_suffix"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	totalInventory: bigint("total_inventory", { mode: "number" }),
	descriptionHtml: varchar("description_html"),
	onlineStoreUrl: varchar("online_store_url"),
	tracksInventory: boolean("tracks_inventory"),
	legacyResourceId: varchar("legacy_resource_id"),
	deletedDescription: varchar("deleted_description"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
	requiresSellinPlan: boolean("requires_sellin_plan"),
	hasOnlyDefaultVariant: boolean("has_only_default_variant"),
	onlineStorePreviewUrl: varchar("online_store_preview_url"),
	hasOutOfStockVariants: boolean("has_out_of_stock_variants"),
}, (table) => [
	index("idx_cursor_publicproductsb85ff759a171a5b9c3b40176a0d0f716").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicproductsb85ff759a171a5b9c3b40176a0d0f716").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicproductsb85ff759a171a5b9c3b40176a0d0f716").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicproductVariantsd86E03Cceeba1D62897B2Ee3755040C5 = pgTable("publicproduct_variantsd86e03cceeba1d62897b2ee3755040c5", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	sku: varchar(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	grams: bigint({ mode: "number" }),
	price: numeric(),
	title: varchar(),
	weight: numeric(),
	barcode: varchar(),
	option1: varchar(),
	option2: varchar(),
	option3: varchar(),
	options: jsonb(),
	taxable: boolean(),
	tracked: boolean(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	imageId: bigint("image_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	position: bigint({ mode: "number" }),
	shopUrl: varchar("shop_url"),
	taxCode: varchar("tax_code"),
	imageSrc: varchar("image_src"),
	imageUrl: varchar("image_url"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	productId: bigint("product_id", { mode: "number" }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	weightUnit: varchar("weight_unit"),
	displayName: varchar("display_name"),
	compareAtPrice: varchar("compare_at_price"),
	inventoryPolicy: varchar("inventory_policy"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	inventoryItemId: bigint("inventory_item_id", { mode: "number" }),
	requiresShipping: boolean("requires_shipping"),
	availableForSale: boolean("available_for_sale"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	inventoryQuantity: bigint("inventory_quantity", { mode: "number" }),
	presentmentPrices: jsonb("presentment_prices"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	oldInventoryQuantity: bigint("old_inventory_quantity", { mode: "number" }),
}, (table) => [
	index("idx_cursor_publicproduct_variantsd86e03cceeba1d62897b2ee3755040").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicproduct_variantsd86e03cceeba1d62897b2ee3").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicproduct_variantsd86e03cceeba1d62897b2ee3755040c5").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publicsmartColections803E54750De9443D27942D70D0717D5D = pgTable("publicsmart_colections803e54750de9443d27942d70d0717d5d", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	rules: jsonb(),
	title: varchar(),
	handle: varchar(),
	shopUrl: varchar("shop_url"),
	bodyHtml: varchar("body_html"),
	sortOrder: varchar("sort_order"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	disjunctive: boolean(),
	publishedAt: timestamp("published_at", { withTimezone: true, mode: 'string' }),
	publishedScope: varchar("published_scope"),
	templateSuffix: varchar("template_suffix"),
	adminGraphqlApiId: varchar("admin_graphql_api_id"),
}, (table) => [
	index("idx_cursor_publicsmart_colections803e54750de9443d27942d70d0717d").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_publicsmart_colections803e54750de9443d27942d70").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publicsmart_colections803e54750de9443d27942d70d0717d5d").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const publiccountries64E94Aa50F6Fc04A564220Feff12B754 = pgTable("publiccountries64e94aa50f6fc04a564220feff12b754", {
	airbyteRawId: varchar("_airbyte_raw_id").notNull(),
	airbyteExtractedAt: timestamp("_airbyte_extracted_at", { withTimezone: true, mode: 'string' }).notNull(),
	airbyteMeta: jsonb("_airbyte_meta").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	airbyteGenerationId: bigint("_airbyte_generation_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }),
	code: varchar(),
	name: varchar(),
	shopUrl: varchar("shop_url"),
	provinces: jsonb(),
	restOfWorld: boolean("rest_of_world"),
	translatedName: varchar("translated_name"),
}, (table) => [
	index("idx_extracted_at_publiccountries64e94aa50f6fc04a564220feff12b75").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_publiccountries64e94aa50f6fc04a564220feff12b754").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);
