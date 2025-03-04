import Link from "next/link";
import { Folder, File, MoreVertical } from "lucide-react";
import type { files_table, folders_table } from "~/server/db/schema";

function formatFileSize(size: number) {
  if (size < 1024) {
    return `${size} bytes`;
  }
  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}

export function FileRow(props: { file: typeof files_table.$inferSelect }) {
  return (
    <div
      key={props.file.id}
      className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-2 transition-colors hover:bg-secondary"
    >
      <div className="flex items-center gap-2">
      <a
          href={props.file.url}
          className="flex items-center gap-2 text-foreground hover:text-primary"
          target="_blank"
          rel="noopener noreferrer"
          download // Add download attribute
        >
          <File className="text-muted-foreground" />
          {props.file.name}
        </a>
        
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {formatFileSize(props.file.size)}
        <button>
          <MoreVertical className="text-foreground" />
        </button>
      </div>
    </div>
  );
}

export function FolderRow(props: {
  folder: typeof folders_table.$inferSelect;
}) {
  return (
    <Link
      href={`/f/${props.folder.id}`}
      className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-2 transition-colors hover:bg-secondary"
    >
      <div className="flex items-center gap-2">
        <Folder className="text-primary" />
        {props.folder.name}
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {/* props.folder.items + " items" */}
        <button>
          <MoreVertical className="text-foreground" />
        </button>
      </div>
    </Link>
  );
}
