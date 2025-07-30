
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import type { ScoreType } from '@/types/agent'

export default function Scorecard({ scores }: { scores: ScoreType[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={scores}>
        <XAxis dataKey="category" />
        <YAxis domain={[0, 10]} />
        <Tooltip />
        <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
