import { pgTable, index, varchar, timestamp, jsonb, bigint, numeric, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const collections = pgTable("collections", {
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
	index("idx_cursor_collections").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_collections").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_collections").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const abandonedCheckouts = pgTable("abandoned_checkouts", {
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
	index("idx_cursor_abandoned_checkouts").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_abandoned_checkouts").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_abandoned_checkouts").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const collects = pgTable("collects", {
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
	index("idx_cursor_collects").using("btree", table.id.asc().nullsLast().op("int8_ops")),
	index("idx_extracted_at_collects").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_collects").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const customerJourneySummary = pgTable("customer_journey_summary", {
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
	index("idx_cursor_customer_journey_summary").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_customer_journey_summary").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_customer_journey_summary").using("btree", table.orderId.asc().nullsLast().op("int8_ops")),
]);

export const draftOrders = pgTable("draft_orders", {
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
	index("idx_cursor_draft_orders").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_draft_orders").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_draft_orders").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const fulfillments = pgTable("fulfillments", {
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
	index("idx_cursor_fulfillments").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_fulfillments").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_fulfillments").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const inventoryLevels = pgTable("inventory_levels", {
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
	index("idx_cursor_inventory_levels").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_inventory_levels").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_inventory_levels").using("btree", table.id.asc().nullsLast().op("text_ops")),
]);

export const metafieldCollections = pgTable("metafield_collections", {
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
	index("idx_cursor_metafield_collections").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_metafield_collections").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_metafield_collections").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const metafieldDraftOrders = pgTable("metafield_draft_orders", {
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
	index("idx_cursor_metafield_draft_orders").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_metafield_draft_orders").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_metafield_draft_orders").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const customCollections = pgTable("custom_collections", {
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
	index("idx_cursor_custom_collections").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_custom_collections").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_custom_collections").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const customers = pgTable("customers", {
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
	index("idx_cursor_customers").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_customers").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_customers").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const discountCodes = pgTable("discount_codes", {
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
	index("idx_cursor_discount_codes").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_discount_codes").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_discount_codes").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const fulfillmentOrders = pgTable("fulfillment_orders", {
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
	index("idx_cursor_fulfillment_orders").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_fulfillment_orders").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_fulfillment_orders").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const inventoryItems = pgTable("inventory_items", {
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
	index("idx_cursor_inventory_items").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_inventory_items").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_inventory_items").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const locations = pgTable("locations", {
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
	index("idx_extracted_at_locations").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_locations").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const metafieldCustomers = pgTable("metafield_customers", {
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
	index("idx_cursor_metafield_customers").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_metafield_customers").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_metafield_customers").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const metafieldLocations = pgTable("metafield_locations", {
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
	index("idx_cursor_metafield_locations").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_metafield_locations").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_metafield_locations").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const metafieldProductImages = pgTable("metafield_product_images", {
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
	index("idx_cursor_metafield_product_images").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_metafield_product_images").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_metafield_product_images").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const metafieldProductVariants = pgTable("metafield_product_variants", {
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
	index("idx_cursor_metafield_product_variants").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_metafield_product_variants").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_metafield_product_variants").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const metafieldSmartCollections = pgTable("metafield_smart_collections", {
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
	index("idx_cursor_metafield_smart_collections").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_metafield_smart_collections").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_metafield_smart_collections").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const orderRefunds = pgTable("order_refunds", {
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
	index("idx_cursor_order_refunds").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_order_refunds").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_order_refunds").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const orderRisks = pgTable("order_risks", {
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
	index("idx_cursor_order_risks").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_order_risks").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_order_risks").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const priceRules = pgTable("price_rules", {
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
	index("idx_cursor_price_rules").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_price_rules").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_price_rules").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const metafieldOrders = pgTable("metafield_orders", {
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
	index("idx_cursor_metafield_orders").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_metafield_orders").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_metafield_orders").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const metafieldProducts = pgTable("metafield_products", {
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
	index("idx_cursor_metafield_products").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_metafield_products").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_metafield_products").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const metafieldShops = pgTable("metafield_shops", {
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
	index("idx_cursor_metafield_shops").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_metafield_shops").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_metafield_shops").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const orderAgreements = pgTable("order_agreements", {
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
	index("idx_cursor_order_agreements").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_order_agreements").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_order_agreements").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const orders = pgTable("orders", {
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
	index("idx_cursor_orders").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_orders").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_orders").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const productVariants = pgTable("product_variants", {
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
	index("idx_cursor_product_variants").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_product_variants").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_product_variants").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const smartCollections = pgTable("smart_collections", {
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
	index("idx_cursor_smart_collections").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_smart_collections").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_smart_collections").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const productImages = pgTable("product_images", {
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
	index("idx_cursor_product_images").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_product_images").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_product_images").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const products = pgTable("products", {
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
	index("idx_cursor_products").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_products").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_products").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const deletedProducts = pgTable("deleted_products", {
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
	index("idx_cursor_deleted_products").using("btree", table.deletedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_extracted_at_deleted_products").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_deleted_products").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const shop = pgTable("shop", {
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
	index("idx_extracted_at_shop").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_shop").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const customerAddress = pgTable("customer_address", {
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
	index("idx_cursor_customer_address").using("btree", table.id.asc().nullsLast().op("int8_ops")),
	index("idx_extracted_at_customer_address").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_customer_address").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);

export const countries = pgTable("countries", {
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
	index("idx_extracted_at_countries").using("btree", table.airbyteExtractedAt.asc().nullsLast().op("timestamptz_ops")),
	index("idx_pk_countries").using("btree", table.id.asc().nullsLast().op("int8_ops")),
]);
