import React, { useState, useCallback } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

// ———————————————————————————————————————————————————————————————
// 1) Node metadata: title, explanation, tip
// ———————————————————————————————————————————————————————————————
const nodeData = {
  '1':  { title: 'Addictive Platform Design',  explanation: 'Features like infinite scrolling, autoplay, notifications, and gamification designed to maximize engagement.', tip: 'Use time-limiting apps and turn off autoplay features.' },
  '2':  { title: 'Algorithm Personalization',  explanation: 'AI algorithms that learn user preferences to deliver increasingly engaging content.', tip: 'Regularly clear watch history and use "do not recommend" features.' },
  '3':  { title: 'Reward Mechanisms',          explanation: 'Likes, comments, and virtual rewards that stimulate dopamine release.', tip: 'Set specific times to check notifications rather than responding immediately.' },
  '4':  { title: 'Accessibility of Technology', explanation: 'Affordable smartphones and widespread internet access.', tip: 'Create tech-free zones in your home.' },
  '5':  { title: 'Pandemic Impact',            explanation: 'COVID-19 lockdowns that normalized extended screen use.', tip: 'Consciously rebuild pre-pandemic offline routines.' },
  '6':  { title: 'Digital Learning Shift',     explanation: 'Educational systems moving to online platforms.', tip: 'Use paper notes for studying when possible.' },
  '7':  { title: 'Screen Time',                explanation: 'Hours spent on digital devices daily.', tip: 'Track your usage with screen time apps to build awareness.' },
  '8':  { title: 'Social Needs',               explanation: 'Desire for connection, validation, and belonging.', tip: 'Schedule regular in-person social activities.' },
  '9':  { title: 'Escapism',                   explanation: 'Using technology to avoid real-world stressors or emotions.', tip: 'Practice mindfulness to face difficult emotions directly.' },
  '10': { title: 'FOMO',                       explanation: 'Fear of missing out on social events, trends, or information.', tip: 'Practice digital detox weekends to reduce anxiety about being disconnected.' },
  '11': { title: 'Digital Identity',           explanation: 'Self-concept tied to online presence and persona.', tip: 'Develop offline hobbies that build identity outside the digital world.' },
  '12': { title: 'Mental Health Issues',       explanation: 'Depression, anxiety, ADHD symptoms related to screen use.', tip: 'Seek professional help if experiencing persistent negative emotions.' },
  '13': { title: 'Physical Health Issues',     explanation: 'Obesity, sleep disorders, eye strain, and posture problems.', tip: 'Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds.' },
  '14': { title: 'Academic Performance',       explanation: 'Impact on grades, concentration, and cognitive development.', tip: 'Use website blockers during study periods.' },
  '15': { title: 'Sleep Disruption',           explanation: 'Blue light exposure and stimulation affecting sleep quality.', tip: 'No screens at least one hour before bedtime.' },
  '16': { title: 'Peer Influence',             explanation: 'Social pressure to maintain online presence and participate in digital trends.', tip: 'Find friends who value offline activities.' },
  '17': { title: 'Family Dynamics',            explanation: 'Parental modeling of screen use and household technology rules.', tip: 'Establish family media agreements with input from all members.' },
  '18': { title: 'Cultural Acceptance',        explanation: 'Societal normalization of constant connectivity and digital presence.', tip: 'Question norms and set boundaries that work for you.' },
  '19': { title: 'Social Skills',              explanation: 'Development of in-person communication abilities.', tip: 'Practice face-to-face conversations daily.' },
  '20': { title: 'Education & Awareness',      explanation: 'Digital literacy and healthy tech use education.', tip: 'Learn about how apps are designed to be addictive.' },
  '21': { title: 'Parental Monitoring',        explanation: 'Screen time limits and oversight by parents.', tip: 'Use collaborative family media plans rather than strict controls.' },
  '22': { title: 'Alternative Activities',     explanation: 'Offline engagement in sports, arts, and social events.', tip: 'Schedule offline activities with the same priority as online ones.' },
  '23': { title: 'Mental Health Support',      explanation: 'Counseling and therapy addressing underlying issues.', tip: 'Consider both individual and family therapy options.' },
  '24': { title: 'Policy Interventions',       explanation: 'Regulations on addictive features and age restrictions.', tip: 'Support policies requiring platforms to disclose addictive design elements.' },
  '25': { title: 'Software-Mediated Controls', explanation: 'Apps and settings that monitor and limit screen use.', tip: 'Use built-in screen time monitors and app timers.' },
  '26': { title: 'Platform Revenue Incentives', explanation: 'Business models dependent on maximizing user engagement time.', tip: 'Support platforms with ethical business models.' },
  '27': { title: 'Dopamine Response',          explanation: 'Neurochemical reward system activated by digital engagement.', tip: 'Find healthy dopamine sources like exercise or creative activities.' },
  '28': { title: 'Digital Literacy',           explanation: 'Understanding of technology impacts and critical consumption skills.', tip: 'Learn to critically evaluate online content and its effects.' },
  '29': { title: 'Content Quality',            explanation: 'Nature of digital content consumed (educational vs. entertainment).', tip: 'Curate content feeds to prioritize meaningful information.' },
  '30': { title: 'Tech Industry Innovation',   explanation: 'Continuous development of more engaging digital experiences.', tip: 'Stay informed about new features designed to capture attention.' },
};

// ———————————————————————————————————————————————————————————————
// 2) Node positions & styling
// ———————————————————————————————————————————————————————————————
// Define node categories
const platformNodes = ['1', '2', '3', '26', '29', '30'];
const environmentalNodes = ['4', '5', '6', '18'];
const personalNodes = ['8', '9', '10', '11', '27'];
const healthNodes = ['12', '13', '14', '15'];
const socialNodes = ['16', '17', '19'];
const interventionNodes = ['20', '21', '22', '23', '24', '25', '28'];
const centralNode = ['7'];

// Custom positions for better visualization of loops
const nodePositions = {
  // Central node
  '7': { x: 800, y: 400 },
  
  // Platform nodes - top left quadrant
  '1': { x: 450, y: 150 },
  '2': { x: 300, y: 50 },
  '3': { x: 600, y: 100 },
  '26': { x: 150, y: 200 },
  '29': { x: 200, y: 300 },
  '30': { x: 350, y: 250 },
  
  // Environmental nodes - top right quadrant
  '4': { x: 1100, y: 150 },
  '5': { x: 1200, y: 250 },
  '6': { x: 1050, y: 300 },
  '18': { x: 1000, y: 550 },
  
  // Personal nodes - left side
  '8': { x: 400, y: 350 },
  '9': { x: 250, y: 400 },
  '10': { x: 150, y: 500 },
  '11': { x: 300, y: 550 },
  '27': { x: 550, y: 250 },
  
  // Health nodes - bottom
  '12': { x: 650, y: 800 },
  '13': { x: 800, y: 700 },
  '14': { x: 1000, y: 650 },
  '15': { x: 750, y: 600 },
  
  // Social nodes - bottom left
  '16': { x: 350, y: 650 },
  '17': { x: 200, y: 700 },
  '19': { x: 450, y: 750 },
  
  // Intervention nodes - right side
  '20': { x: 1150, y: 400 },
  '21': { x: 1200, y: 500 },
  '22': { x: 1150, y: 600 },
  '23': { x: 1050, y: 800 },
  '24': { x: 1250, y: 350 },
  '25': { x: 1400, y: 450 },
  '28': { x: 1000, y: 450 }
};

const nodes = Object.entries(nodeData).map(([id]) => {
  // Determine color based on category
  let nodeClass = 'interactive-node';
  if (platformNodes.includes(id)) nodeClass += ' purple-node';
  else if (environmentalNodes.includes(id)) nodeClass += ' green-node';
  else if (personalNodes.includes(id)) nodeClass += ' yellow-node';
  else if (healthNodes.includes(id)) nodeClass += ' red-node';
  else if (socialNodes.includes(id)) nodeClass += ' blue-node';
  else if (interventionNodes.includes(id)) nodeClass += ' teal-node';
  else if (centralNode.includes(id)) nodeClass += ' orange-node';

  return {
    id,
    position: nodePositions[id] || { x: 0, y: 0 },
    data: { label: nodeData[id].title },
    draggable: true,
    className: nodeClass
  };
});

// ———————————————————————————————————————————————————————————————
// 3) Edges: reinforce ("+", red) or balance ("−", blue)
// ———————————————————————————————————————————————————————————————
const edges = [
  // Platform design impacts
  { id: 'e1-7',  source: '1', target: '7', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e2-7',  source: '2', target: '7', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e3-7',  source: '3', target: '7', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e3-27', source: '3', target: '27', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e26-1', source: '26', target: '1', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e30-1', source: '30', target: '1', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e29-7', source: '29', target: '7', label: '±', animated: true, style:{stroke:'#9333ea'}, labelStyle:{fill:'#9333ea'} },
  
  // Environmental factors
  { id: 'e4-7',  source: '4', target: '7', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e5-7',  source: '5', target: '7', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e6-7',  source: '6', target: '7', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e18-7', source: '18', target: '7', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  
  // Personal factors
  { id: 'e8-7',  source: '8', target: '7', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e9-7',  source: '9', target: '7', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e10-7', source: '10', target: '7', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e11-7', source: '11', target: '7', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e27-7', source: '27', target: '7', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  
  // Social factors
  { id: 'e16-7', source: '16', target: '7', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e17-7', source: '17', target: '7', label: '±', animated: true, style:{stroke:'#9333ea'}, labelStyle:{fill:'#9333ea'} },
  { id: 'e7-19', source: '7', target: '19', label: '-', animated: true, style:{stroke:'#3b82f6'}, labelStyle:{fill:'#3b82f6'} },
  
  // Health impacts
  { id: 'e7-12', source: '7', target: '12', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e7-13', source: '7', target: '13', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e7-14', source: '7', target: '14', label: '-', animated: true, style:{stroke:'#3b82f6'}, labelStyle:{fill:'#3b82f6'} },
  { id: 'e7-15', source: '7', target: '15', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  
  // Reinforcing loops
  { id: 'e12-9', source: '12', target: '9', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e15-13', source: '15', target: '13', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e19-8', source: '19', target: '8', label: '-', animated: true, style:{stroke:'#3b82f6'}, labelStyle:{fill:'#3b82f6'} },
  
  // Intervention impacts
  { id: 'e20-28', source: '20', target: '28', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e21-7', source: '21', target: '7', label: '-', animated: true, style:{stroke:'#3b82f6'}, labelStyle:{fill:'#3b82f6'} },
  { id: 'e22-7', source: '22', target: '7', label: '-', animated: true, style:{stroke:'#3b82f6'}, labelStyle:{fill:'#3b82f6'} },
  { id: 'e23-12', source: '23', target: '12', label: '-', animated: true, style:{stroke:'#3b82f6'}, labelStyle:{fill:'#3b82f6'} },
  { id: 'e24-1', source: '24', target: '1', label: '-', animated: true, style:{stroke:'#3b82f6'}, labelStyle:{fill:'#3b82f6'} },
  { id: 'e25-7', source: '25', target: '7', label: '-', animated: true, style:{stroke:'#3b82f6'}, labelStyle:{fill:'#3b82f6'} },
  { id: 'e28-7', source: '28', target: '7', label: '-', animated: true, style:{stroke:'#3b82f6'}, labelStyle:{fill:'#3b82f6'} },
  
  // Additional important connections
  { id: 'e14-12', source: '14', target: '12', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
  { id: 'e13-22', source: '13', target: '22', label: '-', animated: true, style:{stroke:'#3b82f6'}, labelStyle:{fill:'#3b82f6'} },
  { id: 'e22-19', source: '22', target: '19', label: '+', animated: true, style:{stroke:'#ef4444'}, labelStyle:{fill:'#ef4444'} },
];

// ———————————————————————————————————————————————————————————————
// 4) CSS for node styling
// ———————————————————————————————————————————————————————————————
const styles = `
  .interactive-node {
    padding: 10px;
    border-radius: 5px;
    font-size: 12px;
    width: 180px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.3);
  }
  .purple-node {
    background-color: #9333ea;
    color: white;
  }
  .green-node {
    background-color: #16a34a;
    color: white;
  }
  .yellow-node {
    background-color: #eab308;
    color: black;
  }
  .red-node {
    background-color: #ef4444;
    color: white;
  }
  .blue-node {
    background-color: #3b82f6;
    color: white;
  }
  .teal-node {
    background-color: #14b8a6;
    color: white;
  }
  .orange-node {
    background-color: #f97316;
    color: white;
    font-weight: bold;
    border: 3px solid white;
    width: 200px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    z-index: 10;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  }
`;

export default function CLD() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const onNodeClick = useCallback((_, node) => setSelectedNode(nodeData[node.id]), []);

  
  return (
    <div className="relative h-screen w-full">
      <style>{styles}</style>

      <div className="absolute right-4 top-4 z-10 bg-[#121212] p-4 rounded-lg shadow-lg text-sm">
        <div className="font-bold text-xl mb-3 text-white">Teen Screen Time: Causal Loop Diagram</div>
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-purple-600 mr-3 rounded"></span> 
            <span className="text-purple-800 font-medium">Platform Factors</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-green-600 mr-3 rounded"></span> 
            <span className="text-green-800 font-medium">Environmental Factors</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-yellow-500 mr-3 rounded"></span> 
            <span className="text-yellow-800 font-medium">Personal Factors</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-red-500 mr-3 rounded"></span> 
            <span className="text-red-800 font-medium">Health Impact</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-blue-500 mr-3 rounded"></span> 
            <span className="text-blue-800 font-medium">Social Factors</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-teal-500 mr-3 rounded"></span> 
            <span className="text-teal-800 font-medium">Interventions</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-orange-500 mr-3 rounded"></span> 
            <span className="text-orange-800 font-medium">Screen Time (Central Factor)</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center mb-2">
            <div className="flex items-center mr-4">
              <div className="w-5 h-0 bg-red-500 border-b-2 border-red-500 mr-1"></div>
              <span className="text-red-500 font-medium">+</span>
            </div>
            <span className="text-white">Reinforcing</span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <div className="w-5 h-0 bg-blue-500 border-b-2 border-blue-500 mr-1"></div>
              <span className="text-blue-500 font-medium">−</span>
            </div>
            <span className="text-white">Balancing</span>
          </div>
        </div>
      </div>
      
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        onNodeClick={onNodeClick} 
        fitView 
        minZoom={0.5}
        maxZoom={1.5}
        defaultZoom={0.8}
        className="bg-slate-900"
      >
        <Background color="#cccccc" gap={16} variant="dots" />
        <Controls />
      </ReactFlow>

      {selectedNode && (
        <div className="absolute top-5 left-5 max-w-sm bg-white border border-gray-300 rounded-xl shadow-xl p-4 z-50">
          <h3 className="text-blue-700 font-semibold mb-1">{selectedNode.title}</h3>
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