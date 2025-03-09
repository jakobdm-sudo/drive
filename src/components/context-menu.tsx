"use client";

import { FolderPlus, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { handleCreateFolder } from "~/server/actions";
import { useUploadThing } from "~/utils/uploadthing";

interface Position {
  x: number;
  y: number;
}

export default function ContextMenu(props: {
  currentFolderId: number;
  isOpen: boolean;
  position: Position;
  onClose: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [folderName, setFolderName] = useState("New Folder");
  const { startUpload } = useUploadThing("driveUploader");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        props.onClose();
      }
    }

    if (props.isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      if (isCreatingFolder && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props.isOpen, isCreatingFolder, props]);

  const handleCreate = async () => {
    try {
      await handleCreateFolder(folderName, props.currentFolderId);
      props.onClose();
      router.refresh();
    } catch (error) {
      console.error("Failed to create folder:", error);
    }
  };

  const handleClose = () => {
    setIsCreatingFolder(false);
    props.onClose();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    try {
      await startUpload(Array.from(files), { folderId: props.currentFolderId });
      router.refresh();
      props.onClose();
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return props.isOpen ? (
    <div
      ref={menuRef}
      className="fixed z-50 min-w-[200px] rounded-md border bg-sidebar p-2 shadow-lg"
      style={{ top: props.position.y, left: props.position.x }}
    >
      {!isCreatingFolder ? (
        <div className="flex flex-col gap-1">
          <button
            className="flex w-full items-center gap-2 rounded-sm px-2 py-1 text-sm hover:bg-secondary"
            onClick={() => setIsCreatingFolder(true)}
          >
            <FolderPlus className="h-4 w-4" />
            New Folder
          </button>
          <button
            className="flex w-full items-center gap-2 rounded-sm px-2 py-1 text-sm hover:bg-secondary"
            onClick={handleUploadClick}
          >
            <Upload className="h-4 w-4" />
            Upload File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            multiple
          />
        </div>
      ) : (
        <div className="flex flex-col gap-2 p-1">
          <input
            ref={inputRef}
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="rounded-sm border bg-background px-2 py-1 text-sm"
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                await handleCreate();
              } else if (e.key === "Escape") {
                handleClose();
              }
            }}
          />
          <div className="flex justify-end gap-2">
            <button
              className="rounded-sm px-2 py-1 text-xs hover:bg-secondary"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
            <button
              className="rounded-sm bg-primary px-2 py-1 text-xs text-primary-foreground hover:bg-primary/90"
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  ) : null;
}
