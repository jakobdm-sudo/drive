import { db } from "~/server/db";
import {
  files_table as filesSchema,
  folders_table as foldersSchema,
  type DB_FileType,
  type DB_FolderType,
} from "~/server/db/schema";
import { and, asc, desc, eq, isNull } from "drizzle-orm";
import { get } from "http";

export const QUERIES = {
  getAllParents: async function getAllParents(folderId: number) {
    const parents = [];
    let currentId: number | null = folderId;
    while (currentId !== null) {
      const folder = await db
        .selectDistinct()
        .from(foldersSchema)
        .where(eq(foldersSchema.id, currentId));

      if (!folder[0]) {
        throw new Error("Parent folder not found");
      }
      parents.unshift(folder[0]);
      currentId = folder[0].parent;
    }
    return parents;
  },

  getFolders: function (folderId: number) {
    return db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.parent, folderId))
      .orderBy(asc(foldersSchema.id));
  },

  getFiles: function (filesId: number) {
    return db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.parent, filesId))
      .orderBy(asc(filesSchema.id));
  },

  getFolderById: async function getFolderById(folderId: number) {
    const folder = await db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.id, folderId));
    return folder[0];
  },

  getRootFolderForUser: async function getRootFolderForUser(userId: string) {
    const folder = await db
      .select()
      .from(foldersSchema)
      .where(
        and(eq(foldersSchema.ownerId, userId), isNull(foldersSchema.parent)),
      );
    return folder[0];
  },
  getStarredFiles: async function getStarredFiles(userId: string) {
    const files = await db
      .select()
      .from(filesSchema)
      .where(and(eq(filesSchema.ownerId, userId), eq(filesSchema.isStarred, true)));
    return files;
  },
  getRecentFiles: async function getRecentFiles(userId: string) {
    const files = await db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.ownerId, userId))
      .orderBy(desc(filesSchema.createdAt))
      .limit(10);
    return files;
  },
};

export const MUTATIONS = {
  createRootFolderForUser: async function createRootFolderForUser(
    userId: string,
    driveName: string,
  ) {
    const rootFolder = await db
      .insert(foldersSchema)
      .values({
        name: driveName,
        ownerId: userId,
        parent: null,
      })
      .$returningId();

    const rootFolderId = rootFolder[0]!.id;

    await db.insert(foldersSchema).values([
      {
        name: "Documents",
        ownerId: userId,
        parent: rootFolderId,
      },
      {
        name: "Trash",
        ownerId: userId,
        parent: rootFolderId,
      },
      {
        name: "Favorites",
        ownerId: userId,
        parent: rootFolderId,
      },
      
    ]);

    return rootFolderId;
  },
  createFile: async function createFile(input: {
    file: {
      name: string;
      size: number;
      url: string;
      parent: number;
    };
    userId: string;
  }) {
    return await db.insert(filesSchema).values({
      ...input.file,
      ownerId: input.userId,
    });
  },
  createFolder: async function createFolder(input: {
    folder: {
      name: string;
      parent: number;
    };
    userId: string;
  }) {
    return await db.insert(foldersSchema).values({
      ...input.folder,
      ownerId: input.userId,
    });
  },
};
