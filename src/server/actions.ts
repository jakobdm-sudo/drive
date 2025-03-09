"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import {
  DB_FileType,
  DB_FolderType,
  files_table,
  folders_table,
} from "./db/schema";
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

export async function deleteFolder(
  folderId: number,
  session: { userId: string },
) {
  session = session ?? (await auth());
  if (!session?.userId) {
    return { error: "Unauthorized" };
  }

  //delete files in folder
  const files = await db
    .select()
    .from(files_table)
    .where(
      and(
        eq(files_table.parent, folderId),
        eq(files_table.ownerId, session.userId),
      ),
    );

  await Promise.all(files.map((file) => deleteFile(file.id)));

  //get all descendants folders
  const allDescendants = await getAllFolderDescendants(folderId, session);

  //delete files in descendants folders
  await Promise.all(
    allDescendants.map(async (folder) => {
      const filesInSubfolder = await db
        .select()
        .from(files_table)
        .where(
          and(
            eq(files_table.parent, folder.id),
            eq(files_table.ownerId, session.userId),
          ),
        );
      await Promise.all(filesInSubfolder.map((file) => deleteFile(file.id)));
    }),
  );

  //delete descendants folders
  await Promise.all(
    allDescendants.map((folder) => deleteFolder(folder.id, session)),
  );

  //delete target folder
  await db
    .delete(folders_table)
    .where(
      and(
        eq(folders_table.id, folderId),
        eq(folders_table.ownerId, session.userId),
      ),
    );

  // Force a refresh of the page
  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));

  return { success: true };
}

export async function getAllFolderDescendants(
  folderId: number,
  session: { userId: string },
) {
  session = session ?? (await auth());
  if (!session?.userId) {
    return { error: "Unauthorized" };
  }

  const folder = await db
    .select()
    .from(folders_table)
    .where(
      and(
        eq(folders_table.id, folderId),
        eq(folders_table.ownerId, session.userId),
      ),
    );

  if (folder.length === 0) {
    return [];
  }

  const directDescendants = await db
    .select()
    .from(folders_table)
    .where(
      and(
        eq(folders_table.parent, folderId),
        eq(folders_table.ownerId, session.userId),
      ),
    );

  const subFolderDescendants = (
    await Promise.all(
      directDescendants.map(async (descendant) =>
        getAllFolderDescendants(descendant.id, session),
      ),
    )
  ).flat();

  return [...directDescendants, ...subFolderDescendants];
}

export async function handleLogin() {
  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }

  return redirect("/drive");
}

export async function handleFolderDelete(folderId: number) {
  const session = await auth();
  if (!session?.userId) {
    return;
  }
  await deleteFolder(folderId, { userId: session.userId });
}

export async function handleCreateDriveAction(driveName: string) {
  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }

  const rootFolderId = await MUTATIONS.createRootFolderForUser(
    session.userId,
    driveName,
  );

  redirect(`/f/${rootFolderId}`);
}
