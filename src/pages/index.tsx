
import DashboardHeader from "@/components/DashboardHeader";
import AgentCard from "@/components/AgentCard";
import { agents } from "@/lib/agents";

export default function HomePage() {
  return (
    <div className="p-6">
      <DashboardHeader />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map(agent => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
