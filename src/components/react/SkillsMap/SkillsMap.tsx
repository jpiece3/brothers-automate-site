import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useReactFlow,
  ReactFlowProvider,
  type Node,
  type Edge,
  type OnSelectionChangeParams,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { SkillNode, AgentNode } from './nodes';
import { FilterBar } from './FilterBar';
import { DetailPanel } from './DetailPanel';
import {
  skills,
  agents,
  connections,
  orchestratedWorkflows,
  CATEGORY_COLORS,
  type SkillCategory,
} from '../../../data/skills-map';

const nodeTypes = { skill: SkillNode, agent: AgentNode };

// ─── LAYOUT: Deterministic clustered positions ───────────────────────────────

const CLUSTER_POSITIONS: Record<SkillCategory, { cx: number; cy: number }> = {
  strategy:    { cx: 0,    cy: -500 },
  copy:        { cx: 500,  cy: -300 },
  leadgen:     { cx: 600,  cy: 200 },
  ads:         { cx: 300,  cy: 500 },
  visual:      { cx: -300, cy: 500 },
  research:    { cx: -600, cy: 200 },
  apify:       { cx: -550, cy: -250 },
  specialized: { cx: 0,    cy: 0 },
};

function computeNetworkNodes(
  activeCategories: Set<SkillCategory>,
  searchQuery: string,
  selectedId: string | null,
): Node[] {
  const lowerQuery = searchQuery.toLowerCase();

  // Group skills by category
  const groups: Record<string, typeof skills> = {};
  for (const s of skills) {
    if (!groups[s.category]) groups[s.category] = [];
    groups[s.category].push(s);
  }

  const nodes: Node[] = [];

  for (const [cat, catSkills] of Object.entries(groups)) {
    const { cx, cy } = CLUSTER_POSITIONS[cat as SkillCategory];
    const cols = catSkills.length <= 4 ? 2 : 3;
    const nodeW = 210;
    const nodeH = 70;
    const gapX = 20;
    const gapY = 16;

    catSkills.forEach((skill, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const totalCols = Math.min(catSkills.length, cols);
      const offsetX = cx - ((totalCols - 1) * (nodeW + gapX)) / 2 + col * (nodeW + gapX);
      const offsetY = cy + row * (nodeH + gapY);

      const isActive = activeCategories.has(skill.category as SkillCategory);
      const matchesSearch = !searchQuery || skill.name.toLowerCase().includes(lowerQuery) || skill.id.includes(lowerQuery);
      const dimmed = !isActive || (searchQuery !== '' && !matchesSearch);

      nodes.push({
        id: skill.id,
        type: 'skill',
        position: { x: offsetX, y: offsetY },
        data: {
          label: skill.name,
          category: skill.category,
          description: skill.description,
          isOrchestrated: skill.isOrchestrated,
          agentCount: skill.agentCount,
          dimmed,
          highlighted: searchQuery !== '' && matchesSearch,
        },
        selected: skill.id === selectedId,
      });
    });
  }

  return nodes;
}

function computeNetworkEdges(selectedId: string | null): Edge[] {
  return connections.map((conn, i) => {
    const isSelected = selectedId === conn.source || selectedId === conn.target;
    const base: Edge = {
      id: `e-${i}`,
      source: conn.source,
      target: conn.target,
      animated: conn.type === 'trigger',
      label: isSelected ? conn.label : undefined,
      style: {
        stroke: conn.type === 'data-flow' ? '#3182ce'
          : conn.type === 'trigger' ? '#ed8936'
          : conn.type === 'shared-schema' ? '#0891b2'
          : '#6366f1',
        strokeWidth: isSelected ? 2 : 1,
        opacity: selectedId ? (isSelected ? 1 : 0.08) : 0.25,
        strokeDasharray: conn.type === 'trigger' ? '6 3'
          : conn.type === 'shared-schema' ? '2 3'
          : undefined,
      },
      labelStyle: { fontSize: 10, fill: '#6b7280' },
      labelBgStyle: { fill: '#fff', fillOpacity: 0.9 },
      labelBgPadding: [4, 6] as [number, number],
      labelBgBorderRadius: 3,
    };
    return base;
  });
}

function computeWorkflowNodes(workflowId: string): Node[] {
  const workflow = orchestratedWorkflows.find(w => w.skillId === workflowId);
  if (!workflow) return [];

  const skill = skills.find(s => s.id === workflowId)!;
  const color = CATEGORY_COLORS[skill.category];
  const wAgents = workflow.agents;

  // Group by stage
  const stages = new Map<number, typeof wAgents>();
  for (const a of wAgents) {
    if (!stages.has(a.stage)) stages.set(a.stage, []);
    stages.get(a.stage)!.push(a);
  }

  const sortedStages = Array.from(stages.keys()).sort();
  const stageGap = 260;
  const nodeH = 80;
  const gapY = 20;

  const nodes: Node[] = [];

  sortedStages.forEach((stage, si) => {
    const stageAgents = stages.get(stage)!;
    const totalH = stageAgents.length * nodeH + (stageAgents.length - 1) * gapY;

    stageAgents.forEach((agent, ai) => {
      nodes.push({
        id: agent.id,
        type: 'agent',
        position: {
          x: si * stageGap,
          y: -totalH / 2 + ai * (nodeH + gapY),
        },
        data: {
          label: agent.name,
          stage: agent.stage,
          description: agent.description,
          isParallel: (agent.parallelWith?.length ?? 0) > 0,
          parentColor: color,
        },
      });
    });
  });

  return nodes;
}

function computeWorkflowEdges(workflowId: string): Edge[] {
  const workflow = orchestratedWorkflows.find(w => w.skillId === workflowId);
  if (!workflow) return [];

  const skill = skills.find(s => s.id === workflowId)!;
  const color = CATEGORY_COLORS[skill.category];
  const wAgents = workflow.agents;

  const stages = new Map<number, typeof wAgents>();
  for (const a of wAgents) {
    if (!stages.has(a.stage)) stages.set(a.stage, []);
    stages.get(a.stage)!.push(a);
  }

  const sortedStages = Array.from(stages.keys()).sort();
  const edges: Edge[] = [];
  let edgeIdx = 0;

  for (let i = 0; i < sortedStages.length - 1; i++) {
    const fromAgents = stages.get(sortedStages[i])!;
    const toAgents = stages.get(sortedStages[i + 1])!;

    for (const from of fromAgents) {
      for (const to of toAgents) {
        edges.push({
          id: `we-${edgeIdx++}`,
          source: from.id,
          target: to.id,
          animated: true,
          style: { stroke: color, strokeWidth: 2, opacity: 0.6 },
          type: 'smoothstep',
        });
      }
    }
  }

  return edges;
}

// ─── INNER COMPONENT (needs ReactFlowProvider above) ─────────────────────────

function SkillsMapInner() {
  const allCategories = useMemo(() => new Set(Object.keys(CATEGORY_COLORS) as SkillCategory[]), []);
  const [activeCategories, setActiveCategories] = useState<Set<SkillCategory>>(allCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'network' | 'workflow'>('network');
  const [selectedWorkflow, setSelectedWorkflow] = useState(orchestratedWorkflows[0]?.skillId ?? '');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const { fitView, setCenter } = useReactFlow();

  const toggleCategory = useCallback((cat: SkillCategory) => {
    setActiveCategories(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }, []);

  const nodes = useMemo(() => {
    if (viewMode === 'network') {
      return computeNetworkNodes(activeCategories, searchQuery, selectedNode);
    }
    return computeWorkflowNodes(selectedWorkflow);
  }, [viewMode, activeCategories, searchQuery, selectedNode, selectedWorkflow]);

  const edges = useMemo(() => {
    if (viewMode === 'network') {
      return computeNetworkEdges(selectedNode);
    }
    return computeWorkflowEdges(selectedWorkflow);
  }, [viewMode, selectedNode, selectedWorkflow]);

  const visibleCount = useMemo(() => {
    if (viewMode !== 'network') return skills.length;
    return nodes.filter(n => !(n.data as any).dimmed).length;
  }, [viewMode, nodes]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    if (viewMode === 'network') {
      setSelectedNode(node.id);
    }
  }, [viewMode]);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleSelectSkillFromPanel = useCallback((id: string) => {
    setSelectedNode(id);
    const node = nodes.find(n => n.id === id);
    if (node) {
      setCenter(node.position.x + 100, node.position.y + 35, { zoom: 1.2, duration: 400 });
    }
  }, [nodes, setCenter]);

  // Fit view on mode change
  useEffect(() => {
    const timeout = setTimeout(() => fitView({ padding: 0.15, duration: 400 }), 50);
    return () => clearTimeout(timeout);
  }, [viewMode, selectedWorkflow, fitView]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <FilterBar
        activeCategories={activeCategories}
        onToggleCategory={toggleCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        selectedWorkflow={selectedWorkflow}
        onWorkflowChange={setSelectedWorkflow}
        visibleCount={visibleCount}
      />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.2}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        style={{ background: '#f8f9fb' }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#e5e7eb" />
        <Controls
          showInteractive={false}
          style={{ bottom: 20, left: 20 }}
        />
        <MiniMap
          nodeColor={(node) => {
            const cat = (node.data as any)?.category;
            return cat ? CATEGORY_COLORS[cat as SkillCategory] ?? '#64748b' : (node.data as any)?.parentColor ?? '#64748b';
          }}
          style={{ bottom: 20, right: 20, borderRadius: 8, border: '1px solid #e5e7eb' }}
          maskColor="rgba(248,249,251,0.7)"
        />
      </ReactFlow>

      {/* Legend */}
      {viewMode === 'network' && (
        <div style={{
          position: 'absolute',
          bottom: 20,
          left: 80,
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(4px)',
          borderRadius: 8,
          padding: '8px 14px',
          border: '1px solid #e5e7eb',
          display: 'flex',
          gap: 16,
          fontSize: 10,
          color: '#6b7280',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 20, height: 2, background: '#3182ce', display: 'inline-block' }} />
            Data Flow
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 20, height: 0, borderTop: '2px dashed #ed8936', display: 'inline-block' }} />
            Trigger
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 20, height: 0, borderTop: '2px dotted #0891b2', display: 'inline-block' }} />
            Shared Schema
          </span>
        </div>
      )}

      <DetailPanel
        skillId={selectedNode}
        onClose={() => setSelectedNode(null)}
        onSelectSkill={handleSelectSkillFromPanel}
      />
    </div>
  );
}

// ─── EXPORTED WRAPPER (provides ReactFlowProvider) ───────────────────────────

export default function SkillsMap() {
  return (
    <ReactFlowProvider>
      <SkillsMapInner />
    </ReactFlowProvider>
  );
}
