import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createRoot } from 'react-dom/client';

interface FormData {
  businessName?: string;
  industry?: string;
  triggerEvent?: string;
  currentWorkflow?: string;
  painPoints?: string;
  toolsUsed?: string[];
  desiredOutcome?: string;
  humanCheckpoints?: string;
  successMetric?: string;
}

const COLORS = {
  green: '#10b981',
  blue: '#3182ce',
  orange: '#ed8936',
  navy: '#1a365d',
  gray: '#64748b',
  lightGreen: '#d1fae5',
  lightBlue: '#dbeafe',
  lightOrange: '#fed7aa',
  lightNavy: '#e2e8f0',
};

const NODE_WIDTH = 220;
const NODE_HEIGHT = 80;
const GAP_X = 120;
const START_X = 60;
const START_Y = 60;
const GAP_Y = 30;

function createId(): string {
  return Math.random().toString(36).substring(2, 15);
}

function createRect(x: number, y: number, text: string, stroke: string, bg: string): any[] {
  const rectId = createId();
  const textId = createId();
  const label = text.length > 40 ? text.substring(0, 37) + '...' : text;
  return [
    { id: rectId, type: 'rectangle', x, y, width: NODE_WIDTH, height: NODE_HEIGHT, strokeColor: stroke, backgroundColor: bg, fillStyle: 'solid', strokeWidth: 2, roughness: 1, opacity: 100, angle: 0, groupIds: [], boundElements: [{ type: 'text', id: textId }], roundness: { type: 3 }, isDeleted: false, locked: false },
    { id: textId, type: 'text', x: x + 10, y: y + NODE_HEIGHT / 2 - 10, width: NODE_WIDTH - 20, height: 20, text: label, fontSize: 14, fontFamily: 1, textAlign: 'center', verticalAlign: 'middle', strokeColor: '#1a1a1a', backgroundColor: 'transparent', fillStyle: 'solid', strokeWidth: 1, roughness: 0, opacity: 100, angle: 0, groupIds: [], containerId: rectId, isDeleted: false, locked: false },
  ];
}

function createDiamond(x: number, y: number, text: string): any[] {
  const id = createId();
  const tid = createId();
  const s = 100;
  const label = text.length > 20 ? text.substring(0, 17) + '...' : text;
  return [
    { id, type: 'diamond', x, y, width: s, height: s, strokeColor: COLORS.orange, backgroundColor: COLORS.lightOrange, fillStyle: 'solid', strokeWidth: 2, roughness: 1, opacity: 100, angle: 0, groupIds: [], boundElements: [{ type: 'text', id: tid }], roundness: null, isDeleted: false, locked: false },
    { id: tid, type: 'text', x: x + 10, y: y + s / 2 - 10, width: s - 20, height: 20, text: label, fontSize: 12, fontFamily: 1, textAlign: 'center', verticalAlign: 'middle', strokeColor: '#1a1a1a', backgroundColor: 'transparent', fillStyle: 'solid', strokeWidth: 1, roughness: 0, opacity: 100, angle: 0, groupIds: [], containerId: id, isDeleted: false, locked: false },
  ];
}

function createArrow(sx: number, sy: number, ex: number, ey: number): any {
  return { id: createId(), type: 'arrow', x: sx, y: sy, width: ex - sx, height: ey - sy, strokeColor: COLORS.gray, backgroundColor: 'transparent', fillStyle: 'solid', strokeWidth: 2, roughness: 1, opacity: 100, angle: 0, groupIds: [], boundElements: null, roundness: { type: 2 }, points: [[0, 0], [ex - sx, ey - sy]], startArrowhead: null, endArrowhead: 'arrow', isDeleted: false, locked: false };
}

function createLabel(x: number, y: number, text: string, color = COLORS.gray): any {
  return { id: createId(), type: 'text', x, y, width: 300, height: 20, text, fontSize: 11, fontFamily: 1, textAlign: 'left', verticalAlign: 'top', strokeColor: color, backgroundColor: 'transparent', fillStyle: 'solid', strokeWidth: 1, roughness: 0, opacity: 70, angle: 0, groupIds: [], isDeleted: false, locked: false };
}

function generateDiagram(fd: FormData): any[] {
  const els: any[] = [];
  let cx = START_X;
  const cy = START_Y;
  const positions: { x: number; y: number; w: number; h: number }[] = [];

  if (fd.businessName) els.push(createLabel(START_X, START_Y - 40, `Workflow: ${fd.businessName}`, COLORS.navy));

  if (fd.triggerEvent) {
    els.push(...createRect(cx, cy, `Trigger: ${fd.triggerEvent}`, COLORS.green, COLORS.lightGreen));
    positions.push({ x: cx, y: cy, w: NODE_WIDTH, h: NODE_HEIGHT });
    cx += NODE_WIDTH + GAP_X;
  }

  if (fd.currentWorkflow) {
    const steps = fd.currentWorkflow.split(/\n|(?:\d+\.\s)/).map(s => s.trim()).filter(s => s.length > 0);
    for (const step of steps) {
      els.push(...createRect(cx, cy, step, COLORS.blue, COLORS.lightBlue));
      positions.push({ x: cx, y: cy, w: NODE_WIDTH, h: NODE_HEIGHT });
      cx += NODE_WIDTH + GAP_X;
    }
  }

  if (fd.humanCheckpoints) {
    const cps = fd.humanCheckpoints.split(/\n|(?:\d+\.\s)/).map(s => s.trim()).filter(s => s.length > 0);
    for (const cp of cps) {
      const ds = 100;
      els.push(...createDiamond(cx + (NODE_WIDTH - ds) / 2, cy - 10, cp));
      positions.push({ x: cx + (NODE_WIDTH - ds) / 2, y: cy - 10, w: ds, h: ds });
      cx += NODE_WIDTH + GAP_X;
    }
  }

  if (fd.desiredOutcome) {
    els.push(...createRect(cx, cy, `Result: ${fd.desiredOutcome}`, COLORS.navy, COLORS.lightNavy));
    positions.push({ x: cx, y: cy, w: NODE_WIDTH, h: NODE_HEIGHT });
  }

  for (let i = 0; i < positions.length - 1; i++) {
    const f = positions[i], t = positions[i + 1];
    els.push(createArrow(f.x + f.w, f.y + f.h / 2, t.x, t.y + t.h / 2));
  }

  if (fd.toolsUsed && fd.toolsUsed.length > 0) {
    els.push(createLabel(START_X, cy + NODE_HEIGHT + GAP_Y + 20, `Tools: ${fd.toolsUsed.join(', ')}`, COLORS.blue));
  }
  if (fd.successMetric) {
    els.push(createLabel(START_X, cy + NODE_HEIGHT + GAP_Y + 45, `Success: ${fd.successMetric}`, COLORS.green));
  }

  return els;
}

function WorkflowCanvas() {
  const [ExcalidrawComp, setExcalidrawComp] = useState<any>(null);
  const [api, setApi] = useState<any>(null);
  const formRef = useRef<FormData>({});

  // Lazy load Excalidraw
  useEffect(() => {
    import('@excalidraw/excalidraw').then(mod => {
      setExcalidrawComp(() => mod.Excalidraw);
    });
  }, []);

  const updateCanvas = useCallback((data: FormData) => {
    if (!api) return;
    formRef.current = data;
    const elements = generateDiagram(data);
    if (elements.length === 0) return;
    api.updateScene({ elements });
    setTimeout(() => { try { api.scrollToContent(); } catch(e) {} }, 100);
  }, [api]);

  useEffect(() => {
    const handler = (e: any) => updateCanvas(e.detail);
    window.addEventListener('agent-spec-update', handler);
    return () => window.removeEventListener('agent-spec-update', handler);
  }, [updateCanvas]);

  useEffect(() => {
    if (api && Object.keys(formRef.current).length > 0) updateCanvas(formRef.current);
  }, [api, updateCanvas]);

  if (!ExcalidrawComp) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8', fontSize: '0.9rem' }}>Loading canvas...</div>;
  }

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '500px' }}>
      <ExcalidrawComp
        ref={(ref: any) => { if (ref) setApi(ref); }}
        initialData={{ appState: { viewBackgroundColor: '#fdfcfa', theme: 'light' } }}
        UIOptions={{ canvasActions: { loadScene: false, saveToActiveFile: false } }}
      />
    </div>
  );
}

// Mount the React component into the DOM
export function mount(containerId: string) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const root = createRoot(container);
  root.render(<WorkflowCanvas />);
}
