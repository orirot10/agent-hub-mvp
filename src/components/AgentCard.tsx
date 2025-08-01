
//import { Card, CardContent } from "@/components/ui/card";

import Link from "next/link";
import type { AgentType } from "@/types/agent";


export default function AgentCard({ agent }: { agent: AgentType }) {
  return (
    <div className="p-4 rounded-2xl shadow-md border bg-white">
      <h2 className="text-xl font-bold mb-1 text-gray-900">{agent.name}</h2>
      <p className="text-xs text-gray-500 mb-2">ID: {agent.id}</p>
      <p className="text-sm text-gray-700">{agent.purpose}</p>
      <Link
        href={`/agent/${agent.id}`}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded inline-block text-center"
      >
        Run Agent
      </Link>
    </div>
  );
}
