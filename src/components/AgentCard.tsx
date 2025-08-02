
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
    <div className="p-4 rounded-2xl shadow-md border bg-white">
      <h2 className="text-xl font-bold mb-1 text-gray-900">{agent.name}</h2>
      <p className="text-xs text-gray-500 mb-2">ID: {agent.id}</p>
      <p className="text-sm text-gray-700">{agent.purpose}</p>
      <div className="mt-4 flex gap-2">
        <Link
          href={`/agent/${agent.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded text-center"
        >
          Run Agent
        </Link>
        {onEdit && (
          <button
            className="bg-yellow-500 text-white px-3 py-2 rounded"
            onClick={() => onEdit(agent)}
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            className="bg-red-600 text-white px-3 py-2 rounded"
            onClick={() => onDelete(agent.id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
