"use client";
import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole, ChannelType } from "@prisma/client";
import React from "react";
import ActionTooltip from "../action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

type ServerSectionProps = {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
};
export default function ServerSection({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) {
  const { onOpen } = useModal();
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400 p-0.5">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create Channel" side="top">
          <button
            onClick={() => onOpen("createChannel", {channelType})}
            className="text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition rounded-sm hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 p-0.5"
          >
            <Plus className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip label="Manage Members" side="top">
          <button
            onClick={() => onOpen("members", {server})}
            className="text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition rounded-sm hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 p-0.5"
          >
            <Settings className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
}
