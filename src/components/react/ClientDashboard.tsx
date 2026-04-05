import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface ClientOverview {
  id: string;
  domain: string;
  business_name: string | null;
  location: string | null;
  angle: string | null;
  status: string;
  scan_frequency: string;
  last_scanned_at: string | null;
  next_scan_due: string | null;
  meeting_date: string | null;
  domain_rank: number | null;
  total_keywords: number | null;
  etv: number | null;
  lighthouse_desktop: number | null;
  lighthouse_mobile: number | null;
  google_rating: number | null;
  google_review_count: number | null;
  instagram_followers: number | null;
  facebook_followers: number | null;
  social_presence_score: number | null;
  review_presence_score: number | null;
  last_scan_cost: number | null;
  last_scan_date: string | null;
}

type SortField = 'business_name' | 'domain_rank' | 'total_keywords' | 'etv' | 'lighthouse_desktop' | 'google_review_count' | 'last_scanned_at';

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '--';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatNumber(n: number | null): string {
  if (n === null || n === undefined) return '--';
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toLocaleString();
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    active: { bg: '#16a34a20', text: '#16a34a' },
    prospect: { bg: '#3182ce20', text: '#3182ce' },
    archived: { bg: '#64748b20', text: '#64748b' },
  };
  const c = colors[status] || colors.prospect;
  return (
    <span style={{
      padding: '2px 10px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 600,
      backgroundColor: c.bg,
      color: c.text,
      textTransform: 'capitalize',
    }}>
      {status}
    </span>
  );
}

// Compute an overall visibility health grade from actual presence signals
function computeHealthGrade(client: ClientOverview): { grade: string; color: string; score: number } {
  let score = 0;
  let maxScore = 0;

  // Google reviews (0-30 pts) — most important for local businesses
  maxScore += 30;
  if (client.google_review_count !== null && client.google_review_count > 0) {
    score += Math.min(client.google_review_count / 50 * 30, 30);
  }

  // Keywords ranking in top 20 matters more than total count
  // Domain rank is inversely useful (higher = worse), but having any rank > 0 means some presence
  maxScore += 20;
  if (client.total_keywords && client.total_keywords > 0) {
    score += Math.min(client.total_keywords / 100 * 20, 20);
  }

  // Traffic (ETV) — actual estimated visitors
  maxScore += 20;
  if (client.etv && client.etv > 0) {
    score += Math.min(client.etv / 500 * 20, 20);
  }

  // Social presence (0-15 pts)
  maxScore += 15;
  score += (client.social_presence_score || 0) / 100 * 15;

  // Review presence (0-15 pts)
  maxScore += 15;
  score += (client.review_presence_score || 0) / 100 * 15;

  const pct = Math.round((score / maxScore) * 100);

  if (pct >= 70) return { grade: 'A', color: '#16a34a', score: pct };
  if (pct >= 50) return { grade: 'B', color: '#3182ce', score: pct };
  if (pct >= 30) return { grade: 'C', color: '#ed8936', score: pct };
  if (pct >= 15) return { grade: 'D', color: '#dc2626', score: pct };
  return { grade: 'F', color: '#dc2626', score: pct };
}

function HealthGradeBadge({ client }: { client: ClientOverview }) {
  const { grade, color, score } = computeHealthGrade(client);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '28px',
        height: '28px',
        borderRadius: '6px',
        backgroundColor: `${color}20`,
        color: color,
        fontSize: '14px',
        fontWeight: 800,
      }}>
        {grade}
      </span>
      <span style={{ fontSize: '12px', color: '#64748b' }}>{score}%</span>
    </div>
  );
}

function MetricCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{
      backgroundColor: '#1a365d',
      borderRadius: '12px',
      padding: '20px',
      minWidth: '140px',
    }}>
      <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
      <div style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff' }}>{value}</div>
      {sub && <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{sub}</div>}
    </div>
  );
}

const REFRESH_URL = 'https://nnxbgderdyjanzwgabxl.supabase.co/functions/v1/client-refresh';
const REFRESH_KEY = 'brothers-refresh-2026';

export default function ClientDashboard() {
  const [clients, setClients] = useState<ClientOverview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('business_name');
  const [sortAsc, setSortAsc] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [refreshing, setRefreshing] = useState<string | null>(null); // domain being refreshed, or 'all'

  async function fetchClients() {
    const { data, error: fetchErr } = await supabase
      .from('cs_client_overview')
      .select('*');

    if (fetchErr) {
      setError(fetchErr.message);
      return;
    }
    setClients(data || []);
  }

  useEffect(() => {
    fetchClients().then(() => setLoading(false));
  }, []);

  async function handleRefresh(domain?: string) {
    const target = domain || 'all';
    setRefreshing(target);
    try {
      const body = domain ? { domain } : {};
      const res = await fetch(REFRESH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': REFRESH_KEY },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(`Refresh failed: ${data.error || 'Unknown error'}`);
      } else {
        // Reload data from Supabase
        await fetchClients();
      }
    } catch (e) {
      alert(`Refresh failed: ${e}`);
    }
    setRefreshing(null);
  }

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  }

  const filtered = filterStatus === 'all'
    ? clients
    : clients.filter(c => c.status === filterStatus);

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (aVal === null) return 1;
    if (bVal === null) return -1;
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortAsc ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
  });

  // Summary stats
  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === 'active').length;
  const avgRank = clients.filter(c => c.domain_rank).length > 0
    ? Math.round(clients.reduce((sum, c) => sum + (c.domain_rank || 0), 0) / clients.filter(c => c.domain_rank).length)
    : 0;
  const totalKeywords = clients.reduce((sum, c) => sum + (c.total_keywords || 0), 0);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0', color: '#94a3b8' }}>
        Loading client data...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', color: '#dc2626', backgroundColor: '#dc262610', borderRadius: '12px', textAlign: 'center' }}>
        Error loading clients: {error}
      </div>
    );
  }

  return (
    <div>
      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
      }}>
        <MetricCard label="Total Clients" value={String(totalClients)} />
        <MetricCard label="Active" value={String(activeClients)} />
        <MetricCard label="Avg Domain Rank" value={String(avgRank)} />
        <MetricCard label="Total Keywords" value={formatNumber(totalKeywords)} />
      </div>

      {/* Filters + Refresh All */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '20px',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['all', 'active', 'prospect', 'archived'].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              style={{
                padding: '6px 16px',
                borderRadius: '20px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                backgroundColor: filterStatus === s ? '#ed8936' : '#1a365d',
                color: '#ffffff',
                transition: 'background-color 150ms ease',
              }}
            >
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={() => handleRefresh()}
          disabled={refreshing !== null}
          style={{
            padding: '8px 18px',
            borderRadius: '8px',
            border: '1px solid #3182ce40',
            backgroundColor: refreshing === 'all' ? '#1a365d' : 'transparent',
            color: '#3182ce',
            fontSize: '13px',
            fontWeight: 600,
            cursor: refreshing !== null ? 'wait' : 'pointer',
            transition: 'all 150ms ease',
            opacity: refreshing !== null ? 0.6 : 1,
          }}
        >
          {refreshing === 'all' ? 'Refreshing...' : 'Refresh All'}
        </button>
      </div>

      {/* Client Table */}
      <div style={{
        backgroundColor: '#0f1b2e',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #1a365d40',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px',
          }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1a365d60' }}>
                {[
                  { key: 'business_name', label: 'Client' },
                  { key: 'domain_rank', label: 'Visibility', sortable: false },
                  { key: 'total_keywords', label: 'Keywords' },
                  { key: 'etv', label: 'Traffic' },
                  { key: 'google_review_count' as SortField, label: 'Reviews' },
                  { key: 'last_scanned_at', label: 'Last Scan' },
                ].map(col => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key as SortField)}
                    style={{
                      padding: '14px 16px',
                      textAlign: 'left',
                      color: '#94a3b8',
                      fontWeight: 600,
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      cursor: 'pointer',
                      userSelect: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {col.label}
                    {sortField === col.key && (
                      <span style={{ marginLeft: '4px' }}>{sortAsc ? '\u2191' : '\u2193'}</span>
                    )}
                  </th>
                ))}
                <th style={{ padding: '14px 16px', textAlign: 'left', color: '#94a3b8', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '14px 16px', width: '50px' }}></th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                    No clients found. Run /client-scan to add your first client.
                  </td>
                </tr>
              ) : (
                sorted.map(client => (
                  <tr
                    key={client.id}
                    onClick={() => window.location.href = `/clientintel/${client.domain}`}
                    style={{
                      borderBottom: '1px solid #1a365d30',
                      cursor: 'pointer',
                      transition: 'background-color 150ms ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1a365d30')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 600, color: '#ffffff' }}>
                        {client.business_name || client.domain}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                        {client.domain} {client.location ? `\u00B7 ${client.location}` : ''}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <HealthGradeBadge client={client} />
                    </td>
                    <td style={{ padding: '14px 16px', color: '#ffffff' }}>
                      {formatNumber(client.total_keywords)}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#ffffff' }}>
                      {client.etv !== null ? formatNumber(Math.round(client.etv)) : '--'}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      {client.google_review_count !== null && client.google_review_count > 0 ? (
                        <span style={{ color: '#ffffff' }}>
                          {client.google_rating !== null ? `${client.google_rating}\u2605 ` : ''}{client.google_review_count}
                        </span>
                      ) : (
                        <span style={{ color: '#dc2626', fontSize: '12px', fontWeight: 600 }}>No GBP</span>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#94a3b8', fontSize: '13px' }}>
                      {formatDate(client.last_scanned_at)}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <StatusBadge status={client.status} />
                    </td>
                    <td style={{ padding: '14px 8px' }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRefresh(client.domain); }}
                        disabled={refreshing !== null}
                        title="Refresh metrics"
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '6px',
                          border: '1px solid #1a365d60',
                          backgroundColor: refreshing === client.domain ? '#1a365d' : 'transparent',
                          color: '#64748b',
                          cursor: refreshing !== null ? 'wait' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          transition: 'all 150ms ease',
                          animation: refreshing === client.domain ? 'spin 1s linear infinite' : 'none',
                        }}
                      >
                        {'\u21BB'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
