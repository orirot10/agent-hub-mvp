
export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold">Agent Hub</h1>
      <input type="text" placeholder="Search agents..." className="p-2 border rounded" />
    </div>
  );
}
