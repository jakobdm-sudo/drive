import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "~/components/button-landing";
import { MUTATIONS, QUERIES } from "~/server/db/queries";
import CreateDrivePage from "~/components/create-drive";

export default async function DrivePage() {
  const session = await auth();

  if (!session?.userId) {
    return redirect("/sign-in");
  }

  const rootFolder = await QUERIES.getRootFolderForUser(session.userId);

  if (!rootFolder) {
    return (
      <CreateDrivePage />
    );
  }

  return redirect(`/f/${rootFolder.id}`);
}
