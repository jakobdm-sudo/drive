import { db } from "~/server/db";
import {
  files_table as filesSchema,
  folders_table as foldersSchema,
  type DB_FileType,
  type DB_FolderType,
} from "~/server/db/schema";
import { and, asc, eq, isNull } from "drizzle-orm";
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
      .where(and(eq(foldersSchema.ownerId, userId), isNull(foldersSchema.parent)));
    return folder[0];
  },
};

export const MUTATIONS = {
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
};
