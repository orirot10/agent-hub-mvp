
//import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/router"
import type { AgentType } from "@/types/agent"

export default function AgentCard({ agent }: { agent: AgentType }) {
  const router = useRouter();
  return (
    <div className="p-4 rounded-2xl shadow-md border bg-white">
      <h2 className="text-xl font-bold mb-2">{agent.name}</h2>
      <p className="text-sm text-gray-600">{agent.purpose}</p>
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => router.push(`/agent/${agent.id}`)}
      >
        Run Agent
      </button>
    </div>
  );
}
