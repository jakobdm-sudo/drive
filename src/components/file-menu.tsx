"use client";

import { DownloadIcon, MoreVertical, StarIcon, Trash2Icon } from "lucide-react";
import { deleteFile } from "~/server/actions";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function FileMenu(props: {
  fileId: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        props.onOpenChange(false);
      }
    }

    if (props.isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props.isOpen, props.onOpenChange]);

  const handleDelete = async () => {
    props.onDelete();
    props.onOpenChange(false);

    await deleteFile(props.fileId);
    router.refresh();
  };

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => props.onOpenChange(!props.isOpen)}>
        <MoreVertical className="text-foreground" />
      </button>
      <div
        className={`absolute right-0 top-0 z-10 mr-12 flex w-32 flex-col gap-2 rounded-md border bg-sidebar p-2 shadow transition-all duration-200 ${
          props.isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <button
          className="group flex items-center justify-between gap-2 hover:text-destructive"
          onClick={handleDelete}
        >
          Delete <Trash2Icon className="h-4 w-4 group-hover:fill-destructive" />
        </button>

        <button className="group flex items-center justify-between gap-2 hover:text-primary">
          Download <DownloadIcon className="h-4 w-4 group-hover:fill-primary" />
        </button>
        <button className="group flex items-center justify-between gap-2 hover:text-yellow-500">
          Favorite <StarIcon className="h-4 w-4 group-hover:fill-yellow-500" />
        </button>
      </div>
    </div>
  );
}
