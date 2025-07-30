
import { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { callOpenAI } from "@/lib/openaiClient";

export default function AgentModal({ open, onClose, agent }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const runAgent = async () => {
    setLoading(true);
    const result = await callOpenAI(agent.prompt + '\n' + input);
    setOutput(result);
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-4 space-y-4">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter input..."
        />
        <button onClick={runAgent} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? 'Running...' : 'Run'}
        </button>
        {output && <div className="p-2 bg-gray-100 rounded text-sm whitespace-pre-wrap">{output}</div>}
      </DialogContent>
    </Dialog>
  );
}
