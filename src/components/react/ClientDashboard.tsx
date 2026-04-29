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

interface ClientInsights {
  topCompetitor: string | null;
  competitorKeywords: number | null;
  competitorEtv: number | null;
  competitorReviews: number | null;
  trafficValueGap: number | null; // dollar value of missing traffic
  mapsStatus: 'found' | 'not_found' | 'unknown';
  mapsPosition: number | null;
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

  // Google reviews (0-30 pts), most important for local businesses
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

  // Traffic (ETV), actual estimated visitors
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
  if (pct >= 30) return { grade: 'C', color: '#678B05', score: pct };
  if (pct >= 15) return { grade: 'D', color: '#dc2626', score: pct };
  return { grade: 'F', color: '#dc2626', score: pct };
}

function HealthGradeBadge({ client }: { client: ClientOverview }) {
  const { grade, color, score } = computeHealthGrade(client);
  const [showTip, setShowTip] = useState(false);

  // Build breakdown for tooltip
  const reviewPts = client.google_review_count && client.google_review_count > 0
    ? Math.min(Math.round(client.google_review_count / 50 * 30), 30) : 0;
  const kwPts = client.total_keywords && client.total_keywords > 0
    ? Math.min(Math.round(client.total_keywords / 100 * 20), 20) : 0;
  const trafficPts = client.etv && client.etv > 0
    ? Math.min(Math.round(client.etv / 500 * 20), 20) : 0;
  const socialPts = Math.round((client.social_presence_score || 0) / 100 * 15);
  const reviewPresPts = Math.round((client.review_presence_score || 0) / 100 * 15);

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
    >
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
        cursor: 'help',
      }}>
        {grade}
      </span>
      <span style={{ fontSize: '12px', color: '#a0aec0' }}>{score}%</span>

      {showTip && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          marginTop: '8px',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          padding: '14px 16px',
          width: '240px',
          zIndex: 100,
          boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
        }}
        onClick={e => e.stopPropagation()}
        >
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#1a202c', marginBottom: '10px' }}>Visibility Score Breakdown</div>
          {[
            { label: 'Google Reviews', pts: reviewPts, max: 30, detail: client.google_review_count ? `${client.google_review_count} reviews` : 'No GBP' },
            { label: 'Keywords', pts: kwPts, max: 20, detail: `${client.total_keywords || 0} ranking` },
            { label: 'Traffic', pts: trafficPts, max: 20, detail: client.etv ? `${formatNumber(Math.round(client.etv))} ETV` : 'No traffic' },
            { label: 'Social Presence', pts: socialPts, max: 15, detail: `${client.social_presence_score || 0}/100` },
            { label: 'Review Platforms', pts: reviewPresPts, max: 15, detail: `${client.review_presence_score || 0}/100` },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#718096' }}>{row.label}</div>
                <div style={{ fontSize: '10px', color: '#a0aec0' }}>{row.detail}</div>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: row.pts > 0 ? '#16a34a' : '#dc2626' }}>
                {row.pts}/{row.max}
              </span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #edf2f7', paddingTop: '8px', marginTop: '4px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#718096' }}>Total</span>
            <span style={{ fontSize: '13px', fontWeight: 800, color }}>
              {reviewPts + kwPts + trafficPts + socialPts + reviewPresPts}/100
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '14px',
      padding: '22px 24px',
      minWidth: '140px',
    }}>
      <div style={{ fontSize: '11px', color: '#718096', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: '30px', fontWeight: 800, color: '#1a202c', letterSpacing: '-0.5px' }}>{value}</div>
      {sub && <div style={{ fontSize: '11px', color: '#a0aec0', marginTop: '6px' }}>{sub}</div>}
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
  const [refreshing, setRefreshing] = useState<string | null>(null);
  const [insights, setInsights] = useState<Map<string, ClientInsights>>(new Map());
  const [posDist, setPosDist] = useState<{ label: string; count: number }[]>([]);

  function extractInsights(clientId: string, seoData: any, localData: any): ClientInsights {
    const result: ClientInsights = {
      topCompetitor: null, competitorKeywords: null, competitorEtv: null,
      competitorReviews: null, trafficValueGap: null,
      mapsStatus: 'unknown', mapsPosition: null,
    };

    if (seoData) {
      // Competitor, check traffic_comparison first (structured), then discovered array
      const tc = seoData.competitors?.traffic_comparison;
      const disc = seoData.competitors?.discovered;
      if (tc && Array.isArray(tc) && tc.length >= 2) {
        const comp = tc[1]; // [0] is the client itself
        result.topCompetitor = comp.domain;
        result.competitorKeywords = comp.keywords;
        result.competitorEtv = comp.etv ? Math.round(comp.etv) : null;
      } else if (disc && Array.isArray(disc) && disc.length > 0) {
        const comp = typeof disc[0] === 'string' ? { domain: disc[0] } : disc[0];
        result.topCompetitor = comp.domain;
        result.competitorKeywords = comp.total_keywords || null;
        result.competitorEtv = comp.etv ? Math.round(comp.etv) : null;
      }

      // Traffic value gap
      const clientTv = seoData.domain_overview?.traffic_value_usd;
      if (result.competitorEtv && clientTv) {
        result.trafficValueGap = Math.round(result.competitorEtv - clientTv);
      }
    }

    if (localData) {
      // Maps status
      const mr = localData.maps_rankings;
      if (mr && Array.isArray(mr) && mr.length > 0) {
        const primary = mr[0];
        if (primary.target_found === true) {
          result.mapsStatus = 'found';
          result.mapsPosition = primary.target_position;
        } else {
          result.mapsStatus = 'not_found';
        }

        // Competitor reviews from maps
        const topComp = primary?.top_10?.[0];
        if (topComp?.review_count) {
          result.competitorReviews = topComp.review_count;
        }
      }

      // If no maps_rankings but GBP exists, infer maps presence
      if (result.mapsStatus === 'unknown' && localData.google_business_profile) {
        const gbp = localData.google_business_profile;
        if (gbp.name && gbp.rating) {
          result.mapsStatus = 'found'; // has GBP = likely in maps
        }
      }
    }

    return result;
  }

  async function fetchClients() {
    const { data, error: fetchErr } = await supabase
      .from('cs_client_overview')
      .select('*');

    if (fetchErr) {
      setError(fetchErr.message);
      return;
    }
    setClients(data || []);

    // Fetch JSONB insights from full scans
    if (data && data.length > 0) {
      const clientIds = data.map((c: ClientOverview) => c.id);
      const { data: scanData } = await supabase
        .from('cs_scans')
        .select('client_id, seo_data, local_data')
        .in('client_id', clientIds)
        .not('seo_data', 'is', null)
        .order('scanned_at', { ascending: false });

      if (scanData) {
        const newInsights = new Map<string, ClientInsights>();
        const seen = new Set<string>();
        for (const scan of scanData) {
          if (seen.has(scan.client_id)) continue;
          seen.add(scan.client_id);
          newInsights.set(scan.client_id, extractInsights(scan.client_id, scan.seo_data, scan.local_data));
        }
        setInsights(newInsights);
      }

      // Fetch latest keyword positions for aggregate distribution
      // Get the latest scan per client, then fetch keywords for those scans
      const { data: latestScans } = await supabase
        .from('cs_scans')
        .select('id, client_id')
        .in('client_id', clientIds)
        .order('scanned_at', { ascending: false });

      if (latestScans) {
        // Deduplicate to latest per client
        const latestScanIds: string[] = [];
        const seenClients = new Set<string>();
        for (const s of latestScans) {
          if (seenClients.has(s.client_id)) continue;
          seenClients.add(s.client_id);
          latestScanIds.push(s.id);
        }

        const { data: kwData } = await supabase
          .from('cs_scan_keywords')
          .select('position')
          .in('scan_id', latestScanIds);

        if (kwData) {
          const buckets = [
            { label: '1', min: 1, max: 1 },
            { label: '2-3', min: 2, max: 3 },
            { label: '4-10', min: 4, max: 10 },
            { label: '11-20', min: 11, max: 20 },
            { label: '21-30', min: 21, max: 30 },
            { label: '31-40', min: 31, max: 40 },
            { label: '41-50', min: 41, max: 50 },
            { label: '51-60', min: 51, max: 60 },
            { label: '61-70', min: 61, max: 70 },
            { label: '71-80', min: 71, max: 80 },
            { label: '81-90', min: 81, max: 90 },
            { label: '91-100', min: 91, max: 100 },
          ].map(b => ({
            label: b.label,
            count: kwData.filter(k => k.position !== null && k.position >= b.min && k.position <= b.max).length,
          }));
          setPosDist(buckets);
        }
      }
    }
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
  const totalKeywords = clients.reduce((sum, c) => sum + (c.total_keywords || 0), 0);
  const totalTraffic = clients.reduce((sum, c) => sum + (c.etv ? Math.round(Number(c.etv)) : 0), 0);
  const totalReviews = clients.reduce((sum, c) => sum + (c.google_review_count || 0), 0);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0', color: '#718096' }}>
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
        <MetricCard label="Total Keywords" value={formatNumber(totalKeywords)} sub="tracked across all clients" />
        <MetricCard label="Monthly Traffic" value={formatNumber(totalTraffic)} sub="estimated visits (ETV)" />
        <MetricCard label="Google Reviews" value={formatNumber(totalReviews)} sub="across all clients" />
      </div>

      {/* Aggregate Position Distribution */}
      {posDist.length > 0 && posDist.some(b => b.count > 0) && (() => {
        const maxCount = Math.max(...posDist.map(b => b.count));
        const totalKw = posDist.reduce((s, b) => s + b.count, 0);
        return (
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            padding: '24px',
            marginBottom: '24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a202c' }}>Keyword Position Distribution</div>
                <div style={{ fontSize: '12px', color: '#a0aec0', marginTop: '2px' }}>{totalKw} keywords tracked across all clients</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '100px' }}>
              {posDist.map((bucket, i) => {
                const height = maxCount > 0 ? Math.max((bucket.count / maxCount) * 100, bucket.count > 0 ? 8 : 2) : 2;
                const isGood = i <= 2; // positions 1-10
                const isMid = i >= 3 && i <= 5; // positions 11-40
                const barColor = bucket.count === 0 ? '#edf2f7'
                  : isGood ? '#678B05'
                  : isMid ? '#3182ce'
                  : '#a0aec0';
                return (
                  <div key={bucket.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: bucket.count > 0 ? '#1a202c' : '#e2e8f0' }}>
                      {bucket.count}
                    </div>
                    <div style={{
                      width: '100%',
                      height: `${height}%`,
                      backgroundColor: barColor,
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 300ms ease',
                      minHeight: '2px',
                    }} />
                    <div style={{ fontSize: '9px', color: '#a0aec0', whiteSpace: 'nowrap' }}>{bucket.label}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '12px', justifyContent: 'center' }}>
              {[
                { color: '#678B05', label: 'Top 10' },
                { color: '#3182ce', label: 'Page 2-4' },
                { color: '#a0aec0', label: 'Page 5+' },
              ].map(leg => (
                <div key={leg.label} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '2px', backgroundColor: leg.color }} />
                  <span style={{ fontSize: '10px', color: '#718096' }}>{leg.label}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

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
                border: filterStatus === s ? '1px solid transparent' : '1px solid #e2e8f0',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 600,
                backgroundColor: filterStatus === s ? '#678B05' : '#ffffff',
                color: filterStatus === s ? '#ffffff' : '#718096',
                transition: 'all 150ms ease',
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
            border: '1px solid #e2e8f0',
            backgroundColor: refreshing === 'all' ? '#f7fafc' : '#ffffff',
            color: '#4a5568',
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
        backgroundColor: '#ffffff',
        borderRadius: '14px',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px',
          }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #edf2f7' }}>
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
                      color: '#718096',
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
                <th style={{ padding: '14px 16px', textAlign: 'left', color: '#718096', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '14px 16px', width: '50px' }}></th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: '#a0aec0' }}>
                    No clients found. Run /client-scan to add your first client.
                  </td>
                </tr>
              ) : (
                sorted.map(client => (
                  <tr
                    key={client.id}
                    onClick={() => window.location.href = `/clientintel/${client.domain}`}
                    style={{
                      borderBottom: '1px solid #edf2f7',
                      cursor: 'pointer',
                      transition: 'background-color 150ms ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f7fafc')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 600, color: '#1a202c' }}>
                        {client.business_name || client.domain}
                      </div>
                      <div style={{ fontSize: '12px', color: '#a0aec0', marginTop: '2px' }}>
                        {client.domain} {client.location ? `\u00B7 ${client.location}` : ''}
                      </div>
                      {(() => {
                        const ins = insights.get(client.id);
                        if (!ins) return null;
                        const tags: { text: string; color: string; bg: string }[] = [];

                        // Maps status
                        if (ins.mapsStatus === 'not_found') {
                          tags.push({ text: 'Not in Maps', color: '#dc2626', bg: '#dc262615' });
                        } else if (ins.mapsStatus === 'found' && ins.mapsPosition) {
                          tags.push({ text: `Maps #${ins.mapsPosition}`, color: '#16a34a', bg: '#16a34a15' });
                        }

                        // Traffic value gap
                        if (ins.trafficValueGap && ins.trafficValueGap > 100) {
                          tags.push({ text: `$${formatNumber(ins.trafficValueGap)} traffic gap`, color: '#678B05', bg: '#678B0515' });
                        }

                        // Top competitor
                        if (ins.topCompetitor) {
                          const compInfo = ins.competitorKeywords
                            ? `vs ${ins.topCompetitor}: ${formatNumber(ins.competitorKeywords)} kw`
                            : `vs ${ins.topCompetitor}`;
                          tags.push({ text: compInfo, color: '#718096', bg: '#94a3b810' });
                        }

                        // Competitor reviews gap
                        if (ins.competitorReviews && (!client.google_review_count || client.google_review_count === 0)) {
                          tags.push({ text: `Competitor has ${ins.competitorReviews} reviews`, color: '#dc2626', bg: '#dc262610' });
                        }

                        // GBP present (positive signal)
                        if (client.google_review_count && client.google_review_count > 50) {
                          tags.push({ text: `${client.google_review_count} Google reviews`, color: '#16a34a', bg: '#16a34a15' });
                        }

                        if (tags.length === 0) return null;
                        return (
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                            {tags.map((tag, i) => (
                              <span key={i} style={{
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontSize: '10px',
                                fontWeight: 600,
                                color: tag.color,
                                backgroundColor: tag.bg,
                                whiteSpace: 'nowrap',
                              }}>
                                {tag.text}
                              </span>
                            ))}
                          </div>
                        );
                      })()}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <HealthGradeBadge client={client} />
                    </td>
                    <td style={{ padding: '14px 16px', color: '#1a202c' }}>
                      {formatNumber(client.total_keywords)}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#1a202c' }}>
                      {client.etv !== null ? formatNumber(Math.round(client.etv)) : '--'}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      {client.google_review_count !== null && client.google_review_count > 0 ? (
                        <span style={{ color: '#1a202c' }}>
                          {client.google_rating !== null ? `${client.google_rating}\u2605 ` : ''}{client.google_review_count}
                        </span>
                      ) : (
                        <span style={{ color: '#dc2626', fontSize: '12px', fontWeight: 600 }}>No GBP</span>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#718096', fontSize: '13px' }}>
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
                          border: '1px solid #e2e8f0',
                          backgroundColor: refreshing === client.domain ? '#f7fafc' : 'transparent',
                          color: '#a0aec0',
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
