import { db } from "~/server/db";
import { mockFolders, mockFiles } from "~/lib/mock-data";
import { files, folders } from "~/server/db/schema";

export default function SandboxPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1>Sandbox</h1>
      Seed Function{" "}
      <form
        action={async () => {
          //"we need the client to be able to call this function"
          //here: whatever is onsubmit will be called on server
          "use server";
          const folderInsert = await db.insert(folders).values(
            mockFolders.map((folder, index) => ({
              id: index + 1,
              name: folder.name,
              parent: index !== 0 ? 2 : 1,
              items: folder.items,

            })),
          );

          //insert files
          const fileInsert = await db.insert(files).values(
            mockFiles.map((file, index) => ({
              id: index + 1,
              name: file.name,
              parent: (index % 3) + 1,
              size: 600,

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
