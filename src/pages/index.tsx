
import Layout from "@/components/Layout";
import AgentCard from "@/components/AgentCard";
import { agents } from "@/lib/agents";

export default function HomePage() {
  return (
    <Layout>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map(agent => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </Layout>
  );
}
