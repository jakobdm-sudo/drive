import { db } from "~/server/db";
import { mockFolders, mockFiles } from "~/lib/mock-data";
import { files_table, folders_table } from "~/server/db/schema";
import { eq, sql } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

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
    await db.execute(sql`TRUNCATE TABLE ${folders_table}`);
    await db.execute(sql`TRUNCATE TABLE ${files_table}`);

    const user = await auth();

    if (!user.userId) {
      throw new Error("User not found");
    }

    const rootFolder = await db.insert(folders_table).values({
      name: "Root",
      parent: null,
      ownerId: user.userId,
    }).$returningId();

    // Insert folders
    await db.insert(folders_table).values(
      mockFolders.map((folder) => ({
        name: folder.name,
        parent: rootFolder[0]!.id,
        ownerId: user.userId,
      })),
    );

    
    console.log("rootFolder", rootFolder);
    console.log("Database seeded successfully");
  }

  const user = await auth();

  if (!user.userId) {
    throw new Error("User not found");
  }

  const folders = await db.select().from(folders_table).where(eq(folders_table.ownerId, user.userId));

  console.log("folders", folders);

  return (
    <div className="flex flex-col gap-4">
      <h1>Sandbox</h1>
      <form action={seedDatabase}>
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Seed Database (Root Folder)
        </button>
      </form>
    </div>
  );
}
