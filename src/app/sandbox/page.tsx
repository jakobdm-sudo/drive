import { db } from "~/server/db";
import { mockFolders, mockFiles } from "~/lib/mock-data";
import { files, folders } from "~/server/db/schema";

export default function SandboxPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1>Sandbox</h1>
      <form
        action={async () => {
          "use server";
          // First clear existing data
          await db.delete(folders);
          await db.delete(files);

          // Insert folders with correct parent relationships
          const folderInsert = await db.insert(folders).values(
            mockFolders.map((folder) => ({
              id: folder.id, // Use the exact IDs from mock data
              name: folder.name,
              parent: folder.parent === "root" ? null : parseInt(folder.parent), // Convert string parent to number
            })),
          );

          // Insert files with correct parent relationships
          const fileInsert = await db.insert(files).values(
            mockFiles.map((file) => ({
              id: file.id,
              name: file.name,
              parent: parseInt(file.parent), // Convert string parent to number
              size: parseInt(file.size) || 1024, // Convert "1.2MB" to number or use default
              url: file.url,
            })),
          );

          console.log(folderInsert, fileInsert);
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
