
import { useRouter } from 'next/router';
import { agents } from "@/lib/agents";
import AgentModal from "@/components/AgentModal";

export default function AgentPage() {
  const router = useRouter();
  const { id } = router.query;
  const agent = agents.find(a => a.id === id);

  if (!agent) return <p className="p-4">Agent not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{agent.name}</h1>
      <p className="text-muted-foreground mb-6">{agent.purpose}</p>
      <AgentModal open={true} onClose={() => router.push('/')} agent={agent} />
    </div>
  );
}
