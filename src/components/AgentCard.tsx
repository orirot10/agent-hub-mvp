
//import { Card, CardContent } from "@/components/ui/card";

import Link from "next/link";
import type { AgentType } from "@/types/agent";

type Props = {
  agent: AgentType;
  onEdit?: (agent: AgentType) => void;
  onDelete?: (id: string) => void;
};

export default function AgentCard({ agent, onEdit, onDelete }: Props) {
  return (
    <div className="p-2 rounded-lg shadow-sm border bg-white">
      <h2 className="text-sm font-semibold mb-1 text-gray-900 truncate">{agent.name}</h2>
      <p className="text-xs text-gray-500 mb-1 truncate">ID: {agent.id}</p>
      <p className="text-xs text-gray-700 mb-2 line-clamp-2">{agent.purpose}</p>
      <div className="flex flex-col gap-1">
        <Link
          href={`/agent/${agent.id}`}
          className="bg-blue-600 text-white px-2 py-1 rounded text-xs text-center"
        >
          Run
        </Link>
        <div className="flex gap-1">
          {onEdit && (
            <button
              className="bg-yellow-500 text-white px-2 py-1 rounded text-xs flex-1"
              onClick={() => onEdit(agent)}
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              className="bg-red-600 text-white px-2 py-1 rounded text-xs flex-1"
              onClick={() => onDelete(agent.id)}
            >
              Del
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
