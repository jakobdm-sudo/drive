import { db } from "~/server/db";
import {
  files_table as filesSchema,
  folders_table as foldersSchema,
} from "~/server/db/schema";
import { eq } from "drizzle-orm";

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
    currentId = folder[0]?.parent;
  }
  return parents;
},

getFolders: async function (folderId: number) {
  return db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parent, parsedFolderId));
},

getFiles: async function (filesId: number) {
  return db.select().from(filesSchema).where(eq(filesSchema.parent, filesId));
},


}
