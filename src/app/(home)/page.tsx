import { db } from "~/server/db";
import {
  files_table as filesSchema,
  folders_table as foldersSchema,
} from "~/server/db/schema";
import DriveContents from "../f/[folderId]/drive-contents";
import { eq } from "drizzle-orm";

export default async function HomePage() {
  const files = await db.select().from(filesSchema);
  const folders = await db.select().from(foldersSchema);

  // For home page, we just need the root folder (id: 1) as parent
  const parents = await db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.id, 1));

  return <DriveContents files={files} folders={folders} parents={parents} />;
}
