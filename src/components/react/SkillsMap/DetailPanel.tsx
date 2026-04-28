import React from 'react';
import { skills, agents, connections, CATEGORY_COLORS, CATEGORY_LABELS, type Skill } from '../../../data/skills-map';

interface DetailPanelProps {
  skillId: string | null;
  onClose: () => void;
  onSelectSkill: (id: string) => void;
}

export function DetailPanel({ skillId, onClose, onSelectSkill }: DetailPanelProps) {
  if (!skillId) return null;

  const skill = skills.find(s => s.id === skillId);
  if (!skill) return null;

  const color = CATEGORY_COLORS[skill.category];
  const skillAgents = agents.filter(a => a.parentSkill === skill.id);
  const outgoing = connections.filter(c => c.source === skill.id);
  const incoming = connections.filter(c => c.target === skill.id);

  const connectedSkillIds = new Set([
    ...outgoing.map(c => c.target),
    ...incoming.map(c => c.source),
  ]);
  connectedSkillIds.delete(skill.id);

  const connectedSkills = skills.filter(s => connectedSkillIds.has(s.id));

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: 360,
      height: '100vh',
      background: '#ffffff',
      boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
      zIndex: 100,
      overflowY: 'auto',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      animation: 'slideIn 0.2s ease',
    }}>
      <style>{`
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>

      {/* Header */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#1a202c', marginBottom: 6 }}>{skill.name}</div>
            <span style={{
              fontSize: 10,
              fontWeight: 600,
              color: '#fff',
              background: color,
              padding: '3px 8px',
              borderRadius: 4,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              {CATEGORY_LABELS[skill.category]}
            </span>
            {skill.isOrchestrated && (
              <span style={{
                fontSize: 10,
                fontWeight: 600,
                color: color,
                background: `${color}15`,
                padding: '3px 8px',
                borderRadius: 4,
                marginLeft: 6,
              }}>
                {skill.agentCount} Agents
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 20,
              cursor: 'pointer',
              color: '#9ca3af',
              padding: '0 4px',
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        </div>
        <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5, marginTop: 10 }}>
          {skill.description}
        </p>
      </div>

      {/* Brand Memory */}
      {skill.brandMemory && (skill.brandMemory.writes?.length || skill.brandMemory.reads?.length) && (
        <Section title="Brand Memory">
          {skill.brandMemory.writes?.length ? (
            <div style={{ marginBottom: 8 }}>
              <Label>Writes</Label>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {skill.brandMemory.writes.map(f => <Tag key={f} color="#16a34a">{f}</Tag>)}
              </div>
            </div>
          ) : null}
          {skill.brandMemory.reads?.length ? (
            <div>
              <Label>Reads</Label>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {skill.brandMemory.reads.map(f => <Tag key={f} color="#3182ce">{f}</Tag>)}
              </div>
            </div>
          ) : null}
        </Section>
      )}

      {/* MCP Tools */}
      {skill.mcpTools?.length ? (
        <Section title="MCP Tools">
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {skill.mcpTools.map(t => <Tag key={t} color="#8b5cf6">{t}</Tag>)}
          </div>
        </Section>
      ) : null}

      {/* Schemas */}
      {skill.schemas?.length ? (
        <Section title="Data Schemas">
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {skill.schemas.map(s => <Tag key={s} color="#0891b2">{s}</Tag>)}
          </div>
        </Section>
      ) : null}

      {/* Agents */}
      {skillAgents.length > 0 && (
        <Section title={`Agent Pipeline (${skillAgents.length})`}>
          {Array.from(new Set(skillAgents.map(a => a.stage)))
            .sort()
            .map(stage => {
              const stageAgents = skillAgents.filter(a => a.stage === stage);
              return (
                <div key={stage} style={{ marginBottom: 8 }}>
                  <Label>Stage {stage}{stageAgents.length > 1 ? ' (parallel)' : ''}</Label>
                  {stageAgents.map(a => (
                    <div key={a.id} style={{
                      background: '#f9fafb',
                      borderRadius: 6,
                      padding: '6px 10px',
                      marginBottom: 4,
                      borderLeft: `3px solid ${color}`,
                    }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#1a202c' }}>{a.name}</div>
                      <div style={{ fontSize: 11, color: '#6b7280', lineHeight: 1.4 }}>{a.description}</div>
                    </div>
                  ))}
                </div>
              );
            })}
        </Section>
      )}

      {/* Connections */}
      {connectedSkills.length > 0 && (
        <Section title={`Connected Skills (${connectedSkills.length})`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {connectedSkills.map(cs => {
              const edge = outgoing.find(c => c.target === cs.id) || incoming.find(c => c.source === cs.id);
              return (
                <button
                  key={cs.id}
                  onClick={() => onSelectSkill(cs.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: 6,
                    padding: '6px 10px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    fontFamily: 'inherit',
                  }}
                >
                  <span style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: CATEGORY_COLORS[cs.category],
                    flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#1a202c' }}>{cs.name}</div>
                    {edge?.label && (
                      <div style={{ fontSize: 10, color: '#9ca3af' }}>
                        {outgoing.find(c => c.target === cs.id) ? 'sends' : 'receives'} {edge.label}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: '14px 20px', borderBottom: '1px solid #f3f4f6' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', marginBottom: 4, textTransform: 'uppercase' }}>{children}</div>;
}

function Tag({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span style={{
      fontSize: 10,
      fontWeight: 500,
      color,
      background: `${color}12`,
      padding: '2px 8px',
      borderRadius: 4,
      border: `1px solid ${color}30`,
    }}>
      {children}
    </span>
  );
}
