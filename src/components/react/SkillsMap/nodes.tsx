import React, { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { CATEGORY_COLORS, CATEGORY_LABELS, type SkillCategory } from '../../../data/skills-map';

interface SkillNodeData {
  label: string;
  category: SkillCategory;
  description: string;
  isOrchestrated?: boolean;
  agentCount?: number;
  dimmed?: boolean;
  highlighted?: boolean;
  [key: string]: unknown;
}

export const SkillNode = memo(({ data, selected }: NodeProps) => {
  const d = data as unknown as SkillNodeData;
  const color = CATEGORY_COLORS[d.category];
  const categoryLabel = CATEGORY_LABELS[d.category];

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: 10,
        padding: '10px 14px',
        borderLeft: `4px solid ${color}`,
        boxShadow: selected
          ? `0 0 0 2px ${color}, 0 4px 12px rgba(0,0,0,0.15)`
          : '0 1px 4px rgba(0,0,0,0.08)',
        opacity: d.dimmed ? 0.15 : 1,
        transition: 'all 0.2s ease',
        minWidth: 160,
        maxWidth: 200,
        cursor: 'pointer',
        position: 'relative',
        outline: d.highlighted ? `2px solid ${color}` : 'none',
        outlineOffset: 2,
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: color, width: 6, height: 6, border: 'none' }} />
      <Handle type="source" position={Position.Right} style={{ background: color, width: 6, height: 6, border: 'none' }} />

      <div style={{ fontSize: 13, fontWeight: 700, color: '#1a202c', lineHeight: 1.3, marginBottom: 4 }}>
        {d.label}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        <span style={{
          fontSize: 9,
          fontWeight: 600,
          color: '#fff',
          background: color,
          padding: '2px 6px',
          borderRadius: 4,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          whiteSpace: 'nowrap',
        }}>
          {categoryLabel}
        </span>
        {d.isOrchestrated && (
          <span style={{
            fontSize: 9,
            fontWeight: 600,
            color: '#6b7280',
            background: '#f3f4f6',
            padding: '2px 6px',
            borderRadius: 4,
          }}>
            {d.agentCount} agents
          </span>
        )}
      </div>
    </div>
  );
});
SkillNode.displayName = 'SkillNode';

interface AgentNodeData {
  label: string;
  stage: number;
  description: string;
  isParallel?: boolean;
  parentColor: string;
  [key: string]: unknown;
}

export const AgentNode = memo(({ data, selected }: NodeProps) => {
  const d = data as unknown as AgentNodeData;
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: 8,
        padding: '8px 12px',
        borderLeft: `3px solid ${d.parentColor}`,
        boxShadow: selected
          ? `0 0 0 2px ${d.parentColor}, 0 4px 12px rgba(0,0,0,0.15)`
          : '0 1px 3px rgba(0,0,0,0.06)',
        minWidth: 140,
        maxWidth: 180,
        cursor: 'pointer',
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: d.parentColor, width: 5, height: 5, border: 'none' }} />
      <Handle type="source" position={Position.Right} style={{ background: d.parentColor, width: 5, height: 5, border: 'none' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
        <span style={{
          fontSize: 9,
          fontWeight: 700,
          color: '#fff',
          background: d.parentColor,
          width: 18,
          height: 18,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {d.stage}
        </span>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#1a202c' }}>
          {d.label}
        </span>
      </div>

      {d.isParallel && (
        <span style={{ fontSize: 9, color: '#9ca3af', fontStyle: 'italic' }}>parallel</span>
      )}
    </div>
  );
});
AgentNode.displayName = 'AgentNode';
