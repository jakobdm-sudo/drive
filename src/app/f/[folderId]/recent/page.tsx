import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import DriveContents from "../drive-contents";
import { QUERIES } from "~/server/db/queries";

export default async function RecentFiles(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;
  const session = await auth();

  if (!session?.userId) {
    return redirect("/sign-in");
  }

  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const [files, parents, recentFiles] = await Promise.all([
    QUERIES.getFiles(parsedFolderId),
    QUERIES.getAllParents(parsedFolderId),
    QUERIES.getRecentFiles(session.userId),
  ]);

  return (
    <DriveContents
      files={files}
      folders={[]}
      parents={parents}
      currentFolderId={parsedFolderId}
      starredFiles={[]}
      recentFiles={recentFiles}
      view="recent"
    />
  );
}
