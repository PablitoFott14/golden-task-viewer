import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Folder,
  FolderOpen,
  FileImage,
  FileText,
  FileCode,
  ChevronRight,
} from "lucide-react";
import type { FolderNode } from "../data/types";
import { cx, roleStyles } from "../lib/assets";

function Node({
  node,
  depth,
  showRoles,
}: {
  node: FolderNode;
  depth: number;
  showRoles: boolean;
}) {
  const [open, setOpen] = useState(depth < 2);
  const isFolder = node.type === "folder";
  const hasChildren = !!node.children?.length;
  const rs = showRoles && node.role ? roleStyles[node.role] : null;

  const icon = isFolder ? (
    open ? (
      <FolderOpen size={16} className="text-brand-500" />
    ) : (
      <Folder size={16} className="text-brand-500" />
    )
  ) : node.type === "image" ? (
    <FileImage size={15} className="text-emerald-500" />
  ) : node.type === "doc" ? (
    <FileCode size={15} className="text-amber-500" />
  ) : (
    <FileText size={15} className="text-violet-500" />
  );

  return (
    <div>
      <div
        className={cx(
          "group flex items-center gap-2 rounded-lg px-2 py-1.5 transition",
          isFolder && hasChildren ? "cursor-pointer hover:bg-ink-50" : ""
        )}
        style={{ paddingLeft: `${depth * 18 + 8}px` }}
        onClick={() => hasChildren && setOpen((o) => !o)}
      >
        {isFolder && hasChildren ? (
          <ChevronRight
            size={14}
            className={cx(
              "shrink-0 text-ink-400 transition-transform",
              open && "rotate-90"
            )}
          />
        ) : (
          <span className="w-3.5 shrink-0" />
        )}
        {icon}
        <span
          className={cx(
            "font-mono text-[13px]",
            isFolder ? "font-semibold text-ink-800" : "text-ink-600"
          )}
        >
          {node.name}
          {isFolder && hasChildren ? "/" : ""}
        </span>
        {node.note && (
          <span className="ml-1 truncate text-[11px] italic text-ink-400">
            — {node.note}
          </span>
        )}
        {rs && depth > 0 && (
          <span className={cx("ml-auto chip shrink-0", rs.chip)}>{rs.label}</span>
        )}
      </div>
      <AnimatePresence initial={false}>
        {open && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {node.children!.map((c, i) => (
              <Node key={c.name + i} node={c} depth={depth + 1} showRoles={showRoles} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FolderTree({
  root,
  showRoles = true,
}: {
  root: FolderNode;
  showRoles?: boolean;
}) {
  return (
    <div className="rounded-xl border border-ink-200/70 bg-surface p-3 shadow-soft">
      <Node node={root} depth={0} showRoles={showRoles} />
    </div>
  );
}
