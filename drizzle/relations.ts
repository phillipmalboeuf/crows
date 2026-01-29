import { relations } from "drizzle-orm/relations";
import { directusRoles, directusPolicies, directusPermissions, directusCollections, directusFolders, directusFiles, directusUsers, directusShares, directusSessions, directusActivity, directusRevisions, directusVersions, directusDashboards, directusPanels, directusNotifications, directusPresets, directusFlows, directusOperations, directusAccess, directusComments, directusSettings } from "./schema";

export const directusRolesRelations = relations(directusRoles, ({one, many}) => ({
	directusRole: one(directusRoles, {
		fields: [directusRoles.parent],
		references: [directusRoles.id],
		relationName: "directusRoles_parent_directusRoles_id"
	}),
	directusRoles: many(directusRoles, {
		relationName: "directusRoles_parent_directusRoles_id"
	}),
	directusShares: many(directusShares),
	directusPresets: many(directusPresets),
	directusUsers: many(directusUsers),
	directusAccesses: many(directusAccess),
	directusSettings: many(directusSettings),
}));

export const directusPermissionsRelations = relations(directusPermissions, ({one}) => ({
	directusPolicy: one(directusPolicies, {
		fields: [directusPermissions.policy],
		references: [directusPolicies.id]
	}),
}));

export const directusPoliciesRelations = relations(directusPolicies, ({many}) => ({
	directusPermissions: many(directusPermissions),
	directusAccesses: many(directusAccess),
}));

export const directusCollectionsRelations = relations(directusCollections, ({one, many}) => ({
	directusCollection: one(directusCollections, {
		fields: [directusCollections.group],
		references: [directusCollections.collection],
		relationName: "directusCollections_group_directusCollections_collection"
	}),
	directusCollections: many(directusCollections, {
		relationName: "directusCollections_group_directusCollections_collection"
	}),
	directusShares: many(directusShares),
	directusVersions: many(directusVersions),
}));

export const directusFoldersRelations = relations(directusFolders, ({one, many}) => ({
	directusFolder: one(directusFolders, {
		fields: [directusFolders.parent],
		references: [directusFolders.id],
		relationName: "directusFolders_parent_directusFolders_id"
	}),
	directusFolders: many(directusFolders, {
		relationName: "directusFolders_parent_directusFolders_id"
	}),
	directusFiles: many(directusFiles),
	directusSettings: many(directusSettings),
}));

export const directusFilesRelations = relations(directusFiles, ({one, many}) => ({
	directusFolder: one(directusFolders, {
		fields: [directusFiles.folder],
		references: [directusFolders.id]
	}),
	directusUser_modifiedBy: one(directusUsers, {
		fields: [directusFiles.modifiedBy],
		references: [directusUsers.id],
		relationName: "directusFiles_modifiedBy_directusUsers_id"
	}),
	directusUser_uploadedBy: one(directusUsers, {
		fields: [directusFiles.uploadedBy],
		references: [directusUsers.id],
		relationName: "directusFiles_uploadedBy_directusUsers_id"
	}),
	directusSettings_projectLogo: many(directusSettings, {
		relationName: "directusSettings_projectLogo_directusFiles_id"
	}),
	directusSettings_publicBackground: many(directusSettings, {
		relationName: "directusSettings_publicBackground_directusFiles_id"
	}),
	directusSettings_publicFavicon: many(directusSettings, {
		relationName: "directusSettings_publicFavicon_directusFiles_id"
	}),
	directusSettings_publicForeground: many(directusSettings, {
		relationName: "directusSettings_publicForeground_directusFiles_id"
	}),
}));

export const directusUsersRelations = relations(directusUsers, ({one, many}) => ({
	directusFiles_modifiedBy: many(directusFiles, {
		relationName: "directusFiles_modifiedBy_directusUsers_id"
	}),
	directusFiles_uploadedBy: many(directusFiles, {
		relationName: "directusFiles_uploadedBy_directusUsers_id"
	}),
	directusSessions: many(directusSessions),
	directusPanels: many(directusPanels),
	directusNotifications_recipient: many(directusNotifications, {
		relationName: "directusNotifications_recipient_directusUsers_id"
	}),
	directusNotifications_sender: many(directusNotifications, {
		relationName: "directusNotifications_sender_directusUsers_id"
	}),
	directusShares: many(directusShares),
	directusPresets: many(directusPresets),
	directusFlows: many(directusFlows),
	directusOperations: many(directusOperations),
	directusDashboards: many(directusDashboards),
	directusRole: one(directusRoles, {
		fields: [directusUsers.role],
		references: [directusRoles.id]
	}),
	directusAccesses: many(directusAccess),
	directusComments_userCreated: many(directusComments, {
		relationName: "directusComments_userCreated_directusUsers_id"
	}),
	directusComments_userUpdated: many(directusComments, {
		relationName: "directusComments_userUpdated_directusUsers_id"
	}),
	directusVersions_userCreated: many(directusVersions, {
		relationName: "directusVersions_userCreated_directusUsers_id"
	}),
	directusVersions_userUpdated: many(directusVersions, {
		relationName: "directusVersions_userUpdated_directusUsers_id"
	}),
}));

export const directusSessionsRelations = relations(directusSessions, ({one}) => ({
	directusShare: one(directusShares, {
		fields: [directusSessions.share],
		references: [directusShares.id]
	}),
	directusUser: one(directusUsers, {
		fields: [directusSessions.user],
		references: [directusUsers.id]
	}),
}));

export const directusSharesRelations = relations(directusShares, ({one, many}) => ({
	directusSessions: many(directusSessions),
	directusCollection: one(directusCollections, {
		fields: [directusShares.collection],
		references: [directusCollections.collection]
	}),
	directusRole: one(directusRoles, {
		fields: [directusShares.role],
		references: [directusRoles.id]
	}),
	directusUser: one(directusUsers, {
		fields: [directusShares.userCreated],
		references: [directusUsers.id]
	}),
}));

export const directusRevisionsRelations = relations(directusRevisions, ({one, many}) => ({
	directusActivity: one(directusActivity, {
		fields: [directusRevisions.activity],
		references: [directusActivity.id]
	}),
	directusRevision: one(directusRevisions, {
		fields: [directusRevisions.parent],
		references: [directusRevisions.id],
		relationName: "directusRevisions_parent_directusRevisions_id"
	}),
	directusRevisions: many(directusRevisions, {
		relationName: "directusRevisions_parent_directusRevisions_id"
	}),
	directusVersion: one(directusVersions, {
		fields: [directusRevisions.version],
		references: [directusVersions.id]
	}),
}));

export const directusActivityRelations = relations(directusActivity, ({many}) => ({
	directusRevisions: many(directusRevisions),
}));

export const directusVersionsRelations = relations(directusVersions, ({one, many}) => ({
	directusRevisions: many(directusRevisions),
	directusCollection: one(directusCollections, {
		fields: [directusVersions.collection],
		references: [directusCollections.collection]
	}),
	directusUser_userCreated: one(directusUsers, {
		fields: [directusVersions.userCreated],
		references: [directusUsers.id],
		relationName: "directusVersions_userCreated_directusUsers_id"
	}),
	directusUser_userUpdated: one(directusUsers, {
		fields: [directusVersions.userUpdated],
		references: [directusUsers.id],
		relationName: "directusVersions_userUpdated_directusUsers_id"
	}),
}));

export const directusPanelsRelations = relations(directusPanels, ({one}) => ({
	directusDashboard: one(directusDashboards, {
		fields: [directusPanels.dashboard],
		references: [directusDashboards.id]
	}),
	directusUser: one(directusUsers, {
		fields: [directusPanels.userCreated],
		references: [directusUsers.id]
	}),
}));

export const directusDashboardsRelations = relations(directusDashboards, ({one, many}) => ({
	directusPanels: many(directusPanels),
	directusUser: one(directusUsers, {
		fields: [directusDashboards.userCreated],
		references: [directusUsers.id]
	}),
}));

export const directusNotificationsRelations = relations(directusNotifications, ({one}) => ({
	directusUser_recipient: one(directusUsers, {
		fields: [directusNotifications.recipient],
		references: [directusUsers.id],
		relationName: "directusNotifications_recipient_directusUsers_id"
	}),
	directusUser_sender: one(directusUsers, {
		fields: [directusNotifications.sender],
		references: [directusUsers.id],
		relationName: "directusNotifications_sender_directusUsers_id"
	}),
}));

export const directusPresetsRelations = relations(directusPresets, ({one}) => ({
	directusRole: one(directusRoles, {
		fields: [directusPresets.role],
		references: [directusRoles.id]
	}),
	directusUser: one(directusUsers, {
		fields: [directusPresets.user],
		references: [directusUsers.id]
	}),
}));

export const directusFlowsRelations = relations(directusFlows, ({one, many}) => ({
	directusUser: one(directusUsers, {
		fields: [directusFlows.userCreated],
		references: [directusUsers.id]
	}),
	directusOperations: many(directusOperations),
}));

export const directusOperationsRelations = relations(directusOperations, ({one, many}) => ({
	directusFlow: one(directusFlows, {
		fields: [directusOperations.flow],
		references: [directusFlows.id]
	}),
	directusOperation_reject: one(directusOperations, {
		fields: [directusOperations.reject],
		references: [directusOperations.id],
		relationName: "directusOperations_reject_directusOperations_id"
	}),
	directusOperations_reject: many(directusOperations, {
		relationName: "directusOperations_reject_directusOperations_id"
	}),
	directusOperation_resolve: one(directusOperations, {
		fields: [directusOperations.resolve],
		references: [directusOperations.id],
		relationName: "directusOperations_resolve_directusOperations_id"
	}),
	directusOperations_resolve: many(directusOperations, {
		relationName: "directusOperations_resolve_directusOperations_id"
	}),
	directusUser: one(directusUsers, {
		fields: [directusOperations.userCreated],
		references: [directusUsers.id]
	}),
}));

export const directusAccessRelations = relations(directusAccess, ({one}) => ({
	directusPolicy: one(directusPolicies, {
		fields: [directusAccess.policy],
		references: [directusPolicies.id]
	}),
	directusRole: one(directusRoles, {
		fields: [directusAccess.role],
		references: [directusRoles.id]
	}),
	directusUser: one(directusUsers, {
		fields: [directusAccess.user],
		references: [directusUsers.id]
	}),
}));

export const directusCommentsRelations = relations(directusComments, ({one}) => ({
	directusUser_userCreated: one(directusUsers, {
		fields: [directusComments.userCreated],
		references: [directusUsers.id],
		relationName: "directusComments_userCreated_directusUsers_id"
	}),
	directusUser_userUpdated: one(directusUsers, {
		fields: [directusComments.userUpdated],
		references: [directusUsers.id],
		relationName: "directusComments_userUpdated_directusUsers_id"
	}),
}));

export const directusSettingsRelations = relations(directusSettings, ({one}) => ({
	directusFile_projectLogo: one(directusFiles, {
		fields: [directusSettings.projectLogo],
		references: [directusFiles.id],
		relationName: "directusSettings_projectLogo_directusFiles_id"
	}),
	directusFile_publicBackground: one(directusFiles, {
		fields: [directusSettings.publicBackground],
		references: [directusFiles.id],
		relationName: "directusSettings_publicBackground_directusFiles_id"
	}),
	directusFile_publicFavicon: one(directusFiles, {
		fields: [directusSettings.publicFavicon],
		references: [directusFiles.id],
		relationName: "directusSettings_publicFavicon_directusFiles_id"
	}),
	directusFile_publicForeground: one(directusFiles, {
		fields: [directusSettings.publicForeground],
		references: [directusFiles.id],
		relationName: "directusSettings_publicForeground_directusFiles_id"
	}),
	directusRole: one(directusRoles, {
		fields: [directusSettings.publicRegistrationRole],
		references: [directusRoles.id]
	}),
	directusFolder: one(directusFolders, {
		fields: [directusSettings.storageDefaultFolder],
		references: [directusFolders.id]
	}),
}));