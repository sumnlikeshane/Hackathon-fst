import React, { useState, useCallback } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

// ———————————————————————————————————————————————————————————————
// 1) Node metadata: title, explanation, tip
// ———————————————————————————————————————————————————————————————
const nodeData = {
  '1':  { title: 'Escapism',                 explanation: 'Teens use screens to avoid stress or negative emotions, reinforcing usage patterns.', tip: 'Practice journaling or mindfulness to face stress directly.' },
  '2':  { title: 'Addictive Design',          explanation: 'Infinite scroll, rewards, and notifications trigger dopamine and extend usage.', tip: 'Enable app timers and grayscale mode to reduce appeal.' },
  '3':  { title: 'Mood',                      explanation: 'Low mood drives more screen time, which in turn worsens mood.', tip: 'Balance with exercise or creative hobbies that boost mood.' },
  '4':  { title: 'Screen Time',               explanation: 'Total hours spent on devices, central to all loops.', tip: 'Set clear screen‑free periods each day.' },
  '5':  { title: 'Alternative Activities',    explanation: 'Offline hobbies (sports, arts) compete with screen time.', tip: 'Schedule them as you would classes or meetings.' },
  '6':  { title: 'Sleep Quality',             explanation: 'Nighttime screen use disrupts sleep, leading to fatigue.', tip: 'Stop screens 1 hr before bed; read or meditate instead.' },
  '7':  { title: 'Physical Health',           explanation: 'Sedentary screen use leads to obesity, posture issues.', tip: 'Take movement breaks every 30 min.' },
  '8':  { title: 'Academic Performance',       explanation: 'High screen use distracts from study, lowering grades.', tip: 'Use website blockers during homework time.' },
  '9':  { title: 'Procrastination',            explanation: 'Screens offer easy distraction when tasks feel difficult.', tip: 'Break tasks into 10‑minute sprints with rewards.' },
  '10': { title: 'Peer Pressure',              explanation: 'Seeing friends online encourages more social media use.', tip: 'Set group “offline hours” with friends.' },
  '11': { title: 'Parental Monitoring',        explanation: 'Rules and limits from parents can reduce screen time.', tip: 'Use collaborative contracts, not punitive controls.' },
  '12': { title: 'Digital Literacy',           explanation: 'Knowledge of addictive features helps teens self‑regulate.', tip: 'Include digital‑wellbeing lessons in school.' },
  '13': { title: 'Notifications',              explanation: 'Frequent pings pull teens back into apps repeatedly.', tip: 'Turn off non‑essential notifications.' },
  '14': { title: 'Self‑Efficacy',              explanation: 'Belief in ability to control usage supports reduction.', tip: 'Track small wins and celebrate screen‑free hours.' },
  '15': { title: 'Social Skills',              explanation: 'Excessive online time erodes face‑to‑face communication.', tip: 'Practice in‑person conversations daily.' },
  '16': { title: 'Peer Support',               explanation: 'Friends encouraging offline activities can reduce use.', tip: 'Join group sports or clubs.' },
  '17': { title: 'Stress Levels',              explanation: 'High stress drives escapist screen use.', tip: 'Learn stress‑management: breathing, yoga.' },
  '18': { title: 'App Timers',                 explanation: 'Built‑in limits can cap usage automatically.', tip: 'Set daily caps on social and gaming apps.' },
  '19': { title: 'Counseling Access',          explanation: 'Professional help reduces underlying issues driving addiction.', tip: 'Offer school‑based mental‑health services.' },
  '20': { title: 'Healthy Habits',             explanation: 'Routines (sleep, exercise) buffer against over‑use.', tip: 'Build morning/evening routines without screens.' },
};

// ———————————————————————————————————————————————————————————————
// 2) Node positions & styling
// ———————————————————————————————————————————————————————————————
const nodes = Object.entries(nodeData).map(([id], i) => ({
  id,
  position: { x: (i % 5) * 250, y: Math.floor(i / 5) * 200 },
  data: { label: nodeData[id].title },
  draggable: true,
  className: id <= 5 ? 'interactive-node red-node' : 'interactive-node blue-node'
}));

// ———————————————————————————————————————————————————————————————
// 3) Edges: reinforce (“+”, red) or balance (“−”, blue)
// ———————————————————————————————————————————————————————————————
const edges = [
  // Reinforcing loops
  { id: 'e1-4', source: '1', target: '4', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e4-3', source: '4', target: '3', label: '-', animated: true, style:{stroke:'#3b82f6'}, labelStyle:{fill:'#3b82f6'} },
  { id: 'e3-1', source: '3', target: '1', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  // Additional reinforcing
  { id: 'e4-6', source: '4', target: '6', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e6-7', source: '6', target: '7', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e7-17',source:'7', target:'17', label:'+', animated:true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e17-1',source:'17',target:'1', label:'+', animated:true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },

  // Balancing loops
  { id: 'e5-4', source:'5', target:'4', label:'−', animated:true, style:{stroke:'#3b82f6'}, labelStyle:{fill:'#3b82f6'} },
  { id: 'e11-4',source:'11',target:'4', label:'−', animated:true, style:{stroke:'#3b82f6'}, labelStyle:{fill:'#3b82f6'} },
  { id: 'e12-14',source:'12',target:'14', label:'+', animated:true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e14-4', source:'14',target:'4', label:'−', animated:true, style:{stroke:'#3b82f6'}, labelStyle:{fill:'#3b82f6'} },
  { id: 'e18-4', source:'18',target:'4', label:'−', animated:true, style:{stroke:'#3b82f6'}, labelStyle:{fill:'#3b82f6'} },
  { id: 'e19-17',source:'19',target:'17', label:'−', animated:true, style:{stroke:'#3b82f6'}, labelStyle:{fill:'#3b82f6'} },
  { id: 'e20-15',source:'20',target:'15', label:'+', animated:true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e15-1', source:'15',target:'1', label:'−', animated:true, style:{stroke:'#3b82f6'}, labelStyle:{fill:'#3b82f6'} },

  // Cross links for depth
  { id: 'e10-9', source:'10',target:'9', label:'+', animated:true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e9-8',  source:'9', target:'8', label:'+', animated:true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e8-3',  source:'8', target:'3', label:'+', animated:true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e2-13', source:'2', target:'13',label:'+', animated:true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e13-4', source:'13',target:'4', label:'+', animated:true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
];

export default function CLD() {
  const [selectedNode, setSelectedNode] = useState(null);
  const onNodeClick = useCallback((_, node) => setSelectedNode(nodeData[node.id]), []);

  return (
    <div className="relative h-[700px] w-full">
      <ReactFlow nodes={nodes} edges={edges} onNodeClick={onNodeClick} fitView className="bg-[#121212]">
        <Background color="#949393FF" gap={16} variant="dots" />
        <Controls />
      </ReactFlow>

      {selectedNode && (
        <div className="absolute top-5 right-5 max-w-sm bg-white border border-gray-300 rounded-xl shadow-xl p-4 z-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{selectedNode.title}</h3>
          <p className="text-sm text-gray-700 mb-2">{selectedNode.explanation}</p>
          <div className="bg-blue-50 text-blue-800 text-sm border-l-4 border-blue-400 px-3 py-2 rounded">
            <strong>Tip:</strong> {selectedNode.tip}
          </div>
          <button onClick={() => setSelectedNode(null)} className="text-sm text-blue-600 hover:underline mt-3 block">
            Close
          </button>
        </div>
      )}
    </div>
  );
}
