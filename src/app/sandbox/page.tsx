import { db } from "~/server/db";
import { mockFolders, mockFiles } from "~/lib/mock-data";
import { files, folders } from "~/server/db/schema";
import { sql } from "drizzle-orm";

// Convert MB string to bytes
function convertToBytes(sizeStr: string): number {
  if (sizeStr.endsWith("MB")) {
    return Math.round(parseFloat(sizeStr) * 1024 * 1024);
  }
  // Already in bytes
  return parseInt(sizeStr);
}

export default async function SandboxPage() {
  async function seedDatabase() {
    "use server";

    // Clear existing data
    await db.execute(sql`TRUNCATE TABLE ${folders}`);
    await db.execute(sql`TRUNCATE TABLE ${files}`);

    // Insert folders
    await db.insert(folders).values(
      mockFolders.map((folder) => ({
        id: parseInt(folder.id),
        name: folder.name,
        parent: folder.parent ? parseInt(folder.parent) : null,
      })),
    );

    // Insert files
    await db.insert(files).values(
      mockFiles.map((file) => ({
        id: parseInt(file.id),
        name: file.name,
        parent: parseInt(file.parent),
        size: convertToBytes(file.size),
        url: file.url,
      })),
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1>Sandbox</h1>
      <form action={seedDatabase}>
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Seed Database
        </button>
      </form>
    </div>
  );
}
