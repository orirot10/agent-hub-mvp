
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AgentModal from "@/components/AgentModal";
import Layout from "@/components/Layout";
import type { AgentType } from "@/types/agent";

export default function AgentPage() {
  const router = useRouter();
  const { id } = router.query;
  const [agent, setAgent] = useState<AgentType | null>(null);

  useEffect(() => {
    if (typeof id === 'string') {
      fetch(`/api/agents/${id}`)
        .then(res => res.json())
        .then(setAgent)
        .catch(() => setAgent(null));
    }
  }, [id]);

  if (!agent) return <Layout>Agent not found.</Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{agent.name}</h1>
      <p className="text-muted-foreground mb-6">{agent.purpose}</p>
      <AgentModal open={true} onClose={() => router.push('/')} agent={agent} />
    </Layout>
  );
}
