
import { useRouter } from 'next/router';
import { agents } from "@/lib/agents";
import AgentModal from "@/components/AgentModal";
import Layout from "@/components/Layout";

export default function AgentPage() {
  const router = useRouter();
  const { id } = router.query;
  const agent = agents.find(a => a.id === id);

  if (!agent) return <Layout>Agent not found.</Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{agent.name}</h1>
      <p className="text-muted-foreground mb-6">{agent.purpose}</p>
      <AgentModal open={true} onClose={() => router.push('/')} agent={agent} />
    </Layout>
  );
}
