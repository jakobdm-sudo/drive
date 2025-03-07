"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { files_table } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MUTATIONS } from "./db/queries";

const utApi = new UTApi();

export async function deleteFile(fileId: number) {
  const session = await auth();
  if (!session?.userId) {
    return { error: "Unauthorized" };
  }

  const [file] = await db
    .select()
    .from(files_table)
    .where(
      and(eq(files_table.id, fileId), eq(files_table.ownerId, session.userId)),
    );

  if (!file) {
    return { error: "File not found" };
  }

  // Run both operations in parallel
  await Promise.all([
    utApi.deleteFiles([file.url.replace("https://utfs.io/f/", "")]),
    db
      .delete(files_table)
      .where(
        and(
          eq(files_table.id, fileId),
          eq(files_table.ownerId, session.userId),
        ),
      ),
  ]);

  // Force a refresh of the page
  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));

  return { success: true };
}

export async function handleLogin() {
  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }

  return redirect("/drive");
}

export async function handleCreateDriveAction() {

    const session = await auth();

    if (!session.userId) {
      return redirect("/sign-in");
    }

    const rootFolderId = await MUTATIONS.createRootFolderForUser(session.userId);

    

    redirect(`/f/${rootFolderId}`);
}
