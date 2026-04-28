import React from 'react';
import { CATEGORY_COLORS, CATEGORY_LABELS, type SkillCategory, skills, orchestratedWorkflows } from '../../../data/skills-map';

interface FilterBarProps {
  activeCategories: Set<SkillCategory>;
  onToggleCategory: (cat: SkillCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  viewMode: 'network' | 'workflow';
  onViewModeChange: (mode: 'network' | 'workflow') => void;
  selectedWorkflow: string;
  onWorkflowChange: (id: string) => void;
  visibleCount: number;
}

const categories = Object.keys(CATEGORY_COLORS) as SkillCategory[];

export function FilterBar({
  activeCategories,
  onToggleCategory,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  selectedWorkflow,
  onWorkflowChange,
  visibleCount,
}: FilterBarProps) {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid #e5e7eb',
      padding: '12px 20px',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      {/* Top row: title, search, view toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#1a202c', whiteSpace: 'nowrap' }}>
          Skills & Agents Map
        </div>

        <input
          type="text"
          placeholder="Search skills..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          style={{
            flex: 1,
            minWidth: 180,
            maxWidth: 300,
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid #d1d5db',
            fontSize: 13,
            fontFamily: 'inherit',
            outline: 'none',
          }}
        />

        <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', border: '1px solid #d1d5db' }}>
          {(['network', 'workflow'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => onViewModeChange(mode)}
              style={{
                padding: '5px 14px',
                fontSize: 12,
                fontWeight: 600,
                fontFamily: 'inherit',
                border: 'none',
                cursor: 'pointer',
                background: viewMode === mode ? '#1a202c' : '#fff',
                color: viewMode === mode ? '#fff' : '#6b7280',
                textTransform: 'capitalize',
              }}
            >
              {mode}
            </button>
          ))}
        </div>

        {viewMode === 'workflow' && (
          <select
            value={selectedWorkflow}
            onChange={e => onWorkflowChange(e.target.value)}
            style={{
              padding: '5px 10px',
              borderRadius: 6,
              border: '1px solid #d1d5db',
              fontSize: 12,
              fontFamily: 'inherit',
              background: '#fff',
              cursor: 'pointer',
            }}
          >
            {orchestratedWorkflows.map(w => (
              <option key={w.skillId} value={w.skillId}>{w.name}</option>
            ))}
          </select>
        )}

        <span style={{ fontSize: 11, color: '#9ca3af', whiteSpace: 'nowrap' }}>
          {visibleCount} of {skills.length} skills
        </span>
      </div>

      {/* Category pills */}
      {viewMode === 'network' && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {categories.map(cat => {
            const active = activeCategories.has(cat);
            const color = CATEGORY_COLORS[cat];
            const count = skills.filter(s => s.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => onToggleCategory(cat)}
                style={{
                  padding: '3px 10px',
                  borderRadius: 20,
                  border: `1.5px solid ${active ? color : '#d1d5db'}`,
                  background: active ? `${color}15` : '#fff',
                  color: active ? color : '#9ca3af',
                  fontSize: 11,
                  fontWeight: 600,
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {CATEGORY_LABELS[cat]} ({count})
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
