import { pgTable, serial, varchar, json, boolean, integer, text, index, uuid, timestamp, foreignKey, bigint, jsonb, unique, numeric } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const directusFields = pgTable("directus_fields", {
	id: serial().primaryKey().notNull(),
	collection: varchar({ length: 64 }).notNull(),
	field: varchar({ length: 64 }).notNull(),
	special: varchar({ length: 64 }),
	interface: varchar({ length: 64 }),
	options: json(),
	display: varchar({ length: 64 }),
	displayOptions: json("display_options"),
	readonly: boolean().default(false).notNull(),
	hidden: boolean().default(false).notNull(),
	sort: integer(),
	width: varchar({ length: 30 }).default('full'),
	translations: json(),
	note: text(),
	conditions: json(),
	required: boolean().default(false),
	group: varchar({ length: 64 }),
	validation: json(),
	validationMessage: text("validation_message"),
	searchable: boolean().default(true).notNull(),
});

export const directusActivity = pgTable("directus_activity", {
	id: serial().primaryKey().notNull(),
	action: varchar({ length: 45 }).notNull(),
	user: uuid(),
	timestamp: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	ip: varchar({ length: 50 }),
	userAgent: text("user_agent"),
	collection: varchar({ length: 64 }).notNull(),
	item: varchar({ length: 255 }).notNull(),
	origin: varchar({ length: 255 }),
}, (table) => [
	index().using("btree", table.timestamp.asc().nullsLast().op("timestamptz_ops")),
]);

export const directusRoles = pgTable("directus_roles", {
	id: uuid().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	icon: varchar({ length: 64 }).default('supervised_user_circle').notNull(),
	description: text(),
	parent: uuid(),
}, (table) => [
	foreignKey({
			columns: [table.parent],
			foreignColumns: [table.id],
			name: "directus_roles_parent_foreign"
		}),
]);

export const directusPermissions = pgTable("directus_permissions", {
	id: serial().primaryKey().notNull(),
	collection: varchar({ length: 64 }).notNull(),
	action: varchar({ length: 10 }).notNull(),
	permissions: json(),
	validation: json(),
	presets: json(),
	fields: text(),
	policy: uuid().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.policy],
			foreignColumns: [directusPolicies.id],
			name: "directus_permissions_policy_foreign"
		}).onDelete("cascade"),
]);

export const directusCollections = pgTable("directus_collections", {
	collection: varchar({ length: 64 }).primaryKey().notNull(),
	icon: varchar({ length: 64 }),
	note: text(),
	displayTemplate: varchar("display_template", { length: 255 }),
	hidden: boolean().default(false).notNull(),
	singleton: boolean().default(false).notNull(),
	translations: json(),
	archiveField: varchar("archive_field", { length: 64 }),
	archiveAppFilter: boolean("archive_app_filter").default(true).notNull(),
	archiveValue: varchar("archive_value", { length: 255 }),
	unarchiveValue: varchar("unarchive_value", { length: 255 }),
	sortField: varchar("sort_field", { length: 64 }),
	accountability: varchar({ length: 255 }).default('all'),
	color: varchar({ length: 255 }),
	itemDuplicationFields: json("item_duplication_fields"),
	sort: integer(),
	group: varchar({ length: 64 }),
	collapse: varchar({ length: 255 }).default('open').notNull(),
	previewUrl: varchar("preview_url", { length: 255 }),
	versioning: boolean().default(false).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.group],
			foreignColumns: [table.collection],
			name: "directus_collections_group_foreign"
		}),
]);

export const directusFolders = pgTable("directus_folders", {
	id: uuid().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	parent: uuid(),
}, (table) => [
	foreignKey({
			columns: [table.parent],
			foreignColumns: [table.id],
			name: "directus_folders_parent_foreign"
		}),
]);

export const directusFiles = pgTable("directus_files", {
	id: uuid().primaryKey().notNull(),
	storage: varchar({ length: 255 }).notNull(),
	filenameDisk: varchar("filename_disk", { length: 255 }),
	filenameDownload: varchar("filename_download", { length: 255 }).notNull(),
	title: varchar({ length: 255 }),
	type: varchar({ length: 255 }),
	folder: uuid(),
	uploadedBy: uuid("uploaded_by"),
	createdOn: timestamp("created_on", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	modifiedBy: uuid("modified_by"),
	modifiedOn: timestamp("modified_on", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	charset: varchar({ length: 50 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	filesize: bigint({ mode: "number" }),
	width: integer(),
	height: integer(),
	duration: integer(),
	embed: varchar({ length: 200 }),
	description: text(),
	location: text(),
	tags: text(),
	metadata: json(),
	focalPointX: integer("focal_point_x"),
	focalPointY: integer("focal_point_y"),
	tusId: varchar("tus_id", { length: 64 }),
	tusData: json("tus_data"),
	uploadedOn: timestamp("uploaded_on", { withTimezone: true, mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.folder],
			foreignColumns: [directusFolders.id],
			name: "directus_files_folder_foreign"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.modifiedBy],
			foreignColumns: [directusUsers.id],
			name: "directus_files_modified_by_foreign"
		}),
	foreignKey({
			columns: [table.uploadedBy],
			foreignColumns: [directusUsers.id],
			name: "directus_files_uploaded_by_foreign"
		}),
]);

export const directusRelations = pgTable("directus_relations", {
	id: serial().primaryKey().notNull(),
	manyCollection: varchar("many_collection", { length: 64 }).notNull(),
	manyField: varchar("many_field", { length: 64 }).notNull(),
	oneCollection: varchar("one_collection", { length: 64 }),
	oneField: varchar("one_field", { length: 64 }),
	oneCollectionField: varchar("one_collection_field", { length: 64 }),
	oneAllowedCollections: text("one_allowed_collections"),
	junctionField: varchar("junction_field", { length: 64 }),
	sortField: varchar("sort_field", { length: 64 }),
	oneDeselectAction: varchar("one_deselect_action", { length: 255 }).default('nullify').notNull(),
});

export const directusSessions = pgTable("directus_sessions", {
	token: varchar({ length: 64 }).primaryKey().notNull(),
	user: uuid(),
	expires: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
	ip: varchar({ length: 255 }),
	userAgent: text("user_agent"),
	share: uuid(),
	origin: varchar({ length: 255 }),
	nextToken: varchar("next_token", { length: 64 }),
}, (table) => [
	foreignKey({
			columns: [table.share],
			foreignColumns: [directusShares.id],
			name: "directus_sessions_share_foreign"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.user],
			foreignColumns: [directusUsers.id],
			name: "directus_sessions_user_foreign"
		}).onDelete("cascade"),
]);

export const directusRevisions = pgTable("directus_revisions", {
	id: serial().primaryKey().notNull(),
	activity: integer().notNull(),
	collection: varchar({ length: 64 }).notNull(),
	item: varchar({ length: 255 }).notNull(),
	data: json(),
	delta: json(),
	parent: integer(),
	version: uuid(),
}, (table) => [
	index().using("btree", table.activity.asc().nullsLast().op("int4_ops")),
	index().using("btree", table.parent.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.activity],
			foreignColumns: [directusActivity.id],
			name: "directus_revisions_activity_foreign"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.parent],
			foreignColumns: [table.id],
			name: "directus_revisions_parent_foreign"
		}),
	foreignKey({
			columns: [table.version],
			foreignColumns: [directusVersions.id],
			name: "directus_revisions_version_foreign"
		}).onDelete("cascade"),
]);

export const directusMigrations = pgTable("directus_migrations", {
	version: varchar({ length: 255 }).primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	timestamp: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
});

export const directusPanels = pgTable("directus_panels", {
	id: uuid().primaryKey().notNull(),
	dashboard: uuid().notNull(),
	name: varchar({ length: 255 }),
	icon: varchar({ length: 64 }).default(sql`NULL`),
	color: varchar({ length: 10 }),
	showHeader: boolean("show_header").default(false).notNull(),
	note: text(),
	type: varchar({ length: 255 }).notNull(),
	positionX: integer("position_x").notNull(),
	positionY: integer("position_y").notNull(),
	width: integer().notNull(),
	height: integer().notNull(),
	options: json(),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	userCreated: uuid("user_created"),
}, (table) => [
	foreignKey({
			columns: [table.dashboard],
			foreignColumns: [directusDashboards.id],
			name: "directus_panels_dashboard_foreign"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: "directus_panels_user_created_foreign"
		}).onDelete("set null"),
]);

export const directusNotifications = pgTable("directus_notifications", {
	id: serial().primaryKey().notNull(),
	timestamp: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	status: varchar({ length: 255 }).default('inbox'),
	recipient: uuid().notNull(),
	sender: uuid(),
	subject: varchar({ length: 255 }).notNull(),
	message: text(),
	collection: varchar({ length: 64 }),
	item: varchar({ length: 255 }),
}, (table) => [
	foreignKey({
			columns: [table.recipient],
			foreignColumns: [directusUsers.id],
			name: "directus_notifications_recipient_foreign"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.sender],
			foreignColumns: [directusUsers.id],
			name: "directus_notifications_sender_foreign"
		}),
]);

export const directusShares = pgTable("directus_shares", {
	id: uuid().primaryKey().notNull(),
	name: varchar({ length: 255 }),
	collection: varchar({ length: 64 }).notNull(),
	item: varchar({ length: 255 }).notNull(),
	role: uuid(),
	password: varchar({ length: 255 }),
	userCreated: uuid("user_created"),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	dateStart: timestamp("date_start", { withTimezone: true, mode: 'string' }),
	dateEnd: timestamp("date_end", { withTimezone: true, mode: 'string' }),
	timesUsed: integer("times_used").default(0),
	maxUses: integer("max_uses"),
}, (table) => [
	foreignKey({
			columns: [table.collection],
			foreignColumns: [directusCollections.collection],
			name: "directus_shares_collection_foreign"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.role],
			foreignColumns: [directusRoles.id],
			name: "directus_shares_role_foreign"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: "directus_shares_user_created_foreign"
		}).onDelete("set null"),
]);

export const directusPresets = pgTable("directus_presets", {
	id: serial().primaryKey().notNull(),
	bookmark: varchar({ length: 255 }),
	user: uuid(),
	role: uuid(),
	collection: varchar({ length: 64 }),
	search: varchar({ length: 100 }),
	layout: varchar({ length: 100 }).default('tabular'),
	layoutQuery: json("layout_query"),
	layoutOptions: json("layout_options"),
	refreshInterval: integer("refresh_interval"),
	filter: json(),
	icon: varchar({ length: 64 }).default('bookmark'),
	color: varchar({ length: 255 }),
}, (table) => [
	foreignKey({
			columns: [table.role],
			foreignColumns: [directusRoles.id],
			name: "directus_presets_role_foreign"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.user],
			foreignColumns: [directusUsers.id],
			name: "directus_presets_user_foreign"
		}).onDelete("cascade"),
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

export const directusFlows = pgTable("directus_flows", {
	id: uuid().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	icon: varchar({ length: 64 }),
	color: varchar({ length: 255 }),
	description: text(),
	status: varchar({ length: 255 }).default('active').notNull(),
	trigger: varchar({ length: 255 }),
	accountability: varchar({ length: 255 }).default('all'),
	options: json(),
	operation: uuid(),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	userCreated: uuid("user_created"),
}, (table) => [
	foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: "directus_flows_user_created_foreign"
		}).onDelete("set null"),
	unique("directus_flows_operation_unique").on(table.operation),
]);

export const directusExtensions = pgTable("directus_extensions", {
	enabled: boolean().default(true).notNull(),
	id: uuid().primaryKey().notNull(),
	folder: varchar({ length: 255 }).notNull(),
	source: varchar({ length: 255 }).notNull(),
	bundle: uuid(),
});

export const directusOperations = pgTable("directus_operations", {
	id: uuid().primaryKey().notNull(),
	name: varchar({ length: 255 }),
	key: varchar({ length: 255 }).notNull(),
	type: varchar({ length: 255 }).notNull(),
	positionX: integer("position_x").notNull(),
	positionY: integer("position_y").notNull(),
	options: json(),
	resolve: uuid(),
	reject: uuid(),
	flow: uuid().notNull(),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	userCreated: uuid("user_created"),
}, (table) => [
	foreignKey({
			columns: [table.flow],
			foreignColumns: [directusFlows.id],
			name: "directus_operations_flow_foreign"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.reject],
			foreignColumns: [table.id],
			name: "directus_operations_reject_foreign"
		}),
	foreignKey({
			columns: [table.resolve],
			foreignColumns: [table.id],
			name: "directus_operations_resolve_foreign"
		}),
	foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: "directus_operations_user_created_foreign"
		}).onDelete("set null"),
	unique("directus_operations_resolve_unique").on(table.resolve),
	unique("directus_operations_reject_unique").on(table.reject),
]);

export const directusDashboards = pgTable("directus_dashboards", {
	id: uuid().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	icon: varchar({ length: 64 }).default('dashboard').notNull(),
	note: text(),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	userCreated: uuid("user_created"),
	color: varchar({ length: 255 }),
}, (table) => [
	foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: "directus_dashboards_user_created_foreign"
		}).onDelete("set null"),
]);

export const directusTranslations = pgTable("directus_translations", {
	id: uuid().primaryKey().notNull(),
	language: varchar({ length: 255 }).notNull(),
	key: varchar({ length: 255 }).notNull(),
	value: text().notNull(),
});

export const directusUsers = pgTable("directus_users", {
	id: uuid().primaryKey().notNull(),
	firstName: varchar("first_name", { length: 50 }),
	lastName: varchar("last_name", { length: 50 }),
	email: varchar({ length: 128 }),
	password: varchar({ length: 255 }),
	location: varchar({ length: 255 }),
	title: varchar({ length: 50 }),
	description: text(),
	tags: json(),
	avatar: uuid(),
	language: varchar({ length: 255 }).default(sql`NULL`),
	tfaSecret: varchar("tfa_secret", { length: 255 }),
	status: varchar({ length: 16 }).default('active').notNull(),
	role: uuid(),
	token: varchar({ length: 255 }),
	lastAccess: timestamp("last_access", { withTimezone: true, mode: 'string' }),
	lastPage: varchar("last_page", { length: 255 }),
	provider: varchar({ length: 128 }).default('default').notNull(),
	externalIdentifier: varchar("external_identifier", { length: 255 }),
	authData: json("auth_data"),
	emailNotifications: boolean("email_notifications").default(true),
	appearance: varchar({ length: 255 }),
	themeDark: varchar("theme_dark", { length: 255 }),
	themeLight: varchar("theme_light", { length: 255 }),
	themeLightOverrides: json("theme_light_overrides"),
	themeDarkOverrides: json("theme_dark_overrides"),
	textDirection: varchar("text_direction", { length: 255 }).default('auto').notNull(),
}, (table) => [
	foreignKey({
			columns: [table.role],
			foreignColumns: [directusRoles.id],
			name: "directus_users_role_foreign"
		}).onDelete("set null"),
	unique("directus_users_external_identifier_unique").on(table.externalIdentifier),
	unique("directus_users_email_unique").on(table.email),
	unique("directus_users_token_unique").on(table.token),
]);

export const directusAccess = pgTable("directus_access", {
	id: uuid().primaryKey().notNull(),
	role: uuid(),
	user: uuid(),
	policy: uuid().notNull(),
	sort: integer(),
}, (table) => [
	foreignKey({
			columns: [table.policy],
			foreignColumns: [directusPolicies.id],
			name: "directus_access_policy_foreign"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.role],
			foreignColumns: [directusRoles.id],
			name: "directus_access_role_foreign"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.user],
			foreignColumns: [directusUsers.id],
			name: "directus_access_user_foreign"
		}).onDelete("cascade"),
]);

export const directusPolicies = pgTable("directus_policies", {
	id: uuid().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	icon: varchar({ length: 64 }).default('badge').notNull(),
	description: text(),
	ipAccess: text("ip_access"),
	enforceTfa: boolean("enforce_tfa").default(false).notNull(),
	adminAccess: boolean("admin_access").default(false).notNull(),
	appAccess: boolean("app_access").default(false).notNull(),
});

export const directusComments = pgTable("directus_comments", {
	id: uuid().primaryKey().notNull(),
	collection: varchar({ length: 64 }).notNull(),
	item: varchar({ length: 255 }).notNull(),
	comment: text().notNull(),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	dateUpdated: timestamp("date_updated", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	userCreated: uuid("user_created"),
	userUpdated: uuid("user_updated"),
}, (table) => [
	foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: "directus_comments_user_created_foreign"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.userUpdated],
			foreignColumns: [directusUsers.id],
			name: "directus_comments_user_updated_foreign"
		}),
]);

export const directusVersions = pgTable("directus_versions", {
	id: uuid().primaryKey().notNull(),
	key: varchar({ length: 64 }).notNull(),
	name: varchar({ length: 255 }),
	collection: varchar({ length: 64 }).notNull(),
	item: varchar({ length: 255 }).notNull(),
	hash: varchar({ length: 255 }),
	dateCreated: timestamp("date_created", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	dateUpdated: timestamp("date_updated", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	userCreated: uuid("user_created"),
	userUpdated: uuid("user_updated"),
	delta: json(),
}, (table) => [
	foreignKey({
			columns: [table.collection],
			foreignColumns: [directusCollections.collection],
			name: "directus_versions_collection_foreign"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: "directus_versions_user_created_foreign"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.userUpdated],
			foreignColumns: [directusUsers.id],
			name: "directus_versions_user_updated_foreign"
		}),
]);

export const directusSettings = pgTable("directus_settings", {
	id: serial().primaryKey().notNull(),
	projectName: varchar("project_name", { length: 100 }).default('Directus').notNull(),
	projectUrl: varchar("project_url", { length: 255 }),
	projectColor: varchar("project_color", { length: 255 }).default('#6644FF').notNull(),
	projectLogo: uuid("project_logo"),
	publicForeground: uuid("public_foreground"),
	publicBackground: uuid("public_background"),
	publicNote: text("public_note"),
	authLoginAttempts: integer("auth_login_attempts").default(25),
	authPasswordPolicy: varchar("auth_password_policy", { length: 100 }),
	storageAssetTransform: varchar("storage_asset_transform", { length: 7 }).default('all'),
	storageAssetPresets: json("storage_asset_presets"),
	customCss: text("custom_css"),
	storageDefaultFolder: uuid("storage_default_folder"),
	basemaps: json(),
	mapboxKey: varchar("mapbox_key", { length: 255 }),
	moduleBar: json("module_bar"),
	projectDescriptor: varchar("project_descriptor", { length: 100 }),
	defaultLanguage: varchar("default_language", { length: 255 }).default('en-US').notNull(),
	customAspectRatios: json("custom_aspect_ratios"),
	publicFavicon: uuid("public_favicon"),
	defaultAppearance: varchar("default_appearance", { length: 255 }).default('auto').notNull(),
	defaultThemeLight: varchar("default_theme_light", { length: 255 }),
	themeLightOverrides: json("theme_light_overrides"),
	defaultThemeDark: varchar("default_theme_dark", { length: 255 }),
	themeDarkOverrides: json("theme_dark_overrides"),
	reportErrorUrl: varchar("report_error_url", { length: 255 }),
	reportBugUrl: varchar("report_bug_url", { length: 255 }),
	reportFeatureUrl: varchar("report_feature_url", { length: 255 }),
	publicRegistration: boolean("public_registration").default(false).notNull(),
	publicRegistrationVerifyEmail: boolean("public_registration_verify_email").default(true).notNull(),
	publicRegistrationRole: uuid("public_registration_role"),
	publicRegistrationEmailFilter: json("public_registration_email_filter"),
	visualEditorUrls: json("visual_editor_urls"),
	projectId: uuid("project_id"),
	mcpEnabled: boolean("mcp_enabled").default(false).notNull(),
	mcpAllowDeletes: boolean("mcp_allow_deletes").default(false).notNull(),
	mcpPromptsCollection: varchar("mcp_prompts_collection", { length: 255 }).default(sql`NULL`),
	mcpSystemPromptEnabled: boolean("mcp_system_prompt_enabled").default(true).notNull(),
	mcpSystemPrompt: text("mcp_system_prompt"),
	projectOwner: varchar("project_owner", { length: 255 }),
	projectUsage: varchar("project_usage", { length: 255 }),
	orgName: varchar("org_name", { length: 255 }),
	productUpdates: boolean("product_updates"),
	projectStatus: varchar("project_status", { length: 255 }),
	aiOpenaiApiKey: text("ai_openai_api_key"),
	aiAnthropicApiKey: text("ai_anthropic_api_key"),
	aiSystemPrompt: text("ai_system_prompt"),
}, (table) => [
	foreignKey({
			columns: [table.projectLogo],
			foreignColumns: [directusFiles.id],
			name: "directus_settings_project_logo_foreign"
		}),
	foreignKey({
			columns: [table.publicBackground],
			foreignColumns: [directusFiles.id],
			name: "directus_settings_public_background_foreign"
		}),
	foreignKey({
			columns: [table.publicFavicon],
			foreignColumns: [directusFiles.id],
			name: "directus_settings_public_favicon_foreign"
		}),
	foreignKey({
			columns: [table.publicForeground],
			foreignColumns: [directusFiles.id],
			name: "directus_settings_public_foreground_foreign"
		}),
	foreignKey({
			columns: [table.publicRegistrationRole],
			foreignColumns: [directusRoles.id],
			name: "directus_settings_public_registration_role_foreign"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.storageDefaultFolder],
			foreignColumns: [directusFolders.id],
			name: "directus_settings_storage_default_folder_foreign"
		}).onDelete("set null"),
]);

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
	id: bigint({ mode: "number" }).notNull().primaryKey(),
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
	id: bigint({ mode: "number" }).notNull().primaryKey(),
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
});

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
});

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
});
