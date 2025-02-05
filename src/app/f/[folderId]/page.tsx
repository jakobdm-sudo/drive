import { db } from "~/server/db";
import {
  files as filesSchema,
  folders as foldersSchema,
} from "~/server/db/schema";
import DriveContents from "../../drive-contents";
import { eq } from "drizzle-orm";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  const parseFolderId = parseInt(params.folderId);

  if (isNaN(parseFolderId)) {
    return (
      <div className="bg-background text-foreground">
        <div className="flex h-screen flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-red-500">Invalid folder ID</h1>
          <p className="text-sm text-muted-foreground">
            Please enter a valid folder ID
          </p>
        </div>
      </div>
    );
  }

  const files = await db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parent, parseFolderId));
  const folders = await db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parent, parseFolderId));
    
  return <DriveContents files={files} folders={folders} />;
}
