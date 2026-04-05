import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ScanRow {
  id: string;
  scanned_at: string;
  domain_rank: number | null;
  total_keywords: number | null;
  etv: number | null;
  lighthouse_desktop: number | null;
  lighthouse_mobile: number | null;
  total_pages: number | null;
  google_rating: number | null;
  google_review_count: number | null;
  instagram_followers: number | null;
  facebook_followers: number | null;
  social_presence_score: number | null;
  review_presence_score: number | null;
  api_cost: number | null;
  seo_data: any;
  company_data: any;
  local_data: any;
  social_data: any;
}

interface ClientRow {
  id: string;
  domain: string;
  business_name: string | null;
  location: string | null;
  angle: string | null;
  status: string;
  notes: string | null;
  meeting_date: string | null;
}

interface KeywordRow {
  keyword: string;
  position: number | null;
  search_volume: number | null;
  keyword_difficulty: number | null;
  url: string | null;
}

type Tab = 'overview' | 'seo' | 'local' | 'social' | 'company' | 'history';

// ─── Helpers ───

function fmt(n: number | null | undefined): string {
  if (n === null || n === undefined) return '--';
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toLocaleString();
}

function fmtDate(d: string | null): string {
  if (!d) return '--';
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ─── Shared UI ───

const card: React.CSSProperties = {
  backgroundColor: '#0f1b2e',
  borderRadius: '12px',
  padding: '20px',
  border: '1px solid #1a365d40',
};

function Metric({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div style={card}>
      <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>{label}</div>
      <div style={{ fontSize: '26px', fontWeight: 700, color: color || '#fff' }}>{value}</div>
      {sub && <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{sub}</div>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '14px' }}>{title}</h3>
      {children}
    </div>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: (string | number | null)[][] }) {
  return (
    <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1a365d60' }}>
              {headers.map((h, i) => (
                <th key={i} style={{ padding: '12px 14px', textAlign: i === 0 ? 'left' : 'right', color: '#64748b', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} style={{ borderBottom: '1px solid #1a365d20' }}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: '10px 14px', textAlign: ci === 0 ? 'left' : 'right', color: '#e2e8f0', whiteSpace: ci === 0 ? 'normal' : 'nowrap' }}>{cell ?? '--'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ScoreDot({ value, max = 100 }: { value: number | null; max?: number }) {
  if (value === null) return <span style={{ color: '#64748b' }}>--</span>;
  const color = value >= 80 ? '#16a34a' : value >= 50 ? '#ed8936' : '#dc2626';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color, display: 'inline-block' }} />
      <span style={{ fontWeight: 600 }}>{value}/{max}</span>
    </span>
  );
}

// ─── Tab Content ───

function OverviewTab({ scan }: { scan: ScanRow }) {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        <Metric label="Domain Rank" value={fmt(scan.domain_rank)} />
        <Metric label="Keywords" value={fmt(scan.total_keywords)} />
        <Metric label="Est. Traffic" value={fmt(scan.etv ? Math.round(scan.etv) : null)} sub="monthly visits" />
        <Metric label="Desktop Perf" value={scan.lighthouse_desktop !== null ? `${scan.lighthouse_desktop}/100` : '--'} color={scan.lighthouse_desktop && scan.lighthouse_desktop >= 90 ? '#16a34a' : '#ed8936'} />
        <Metric label="Mobile Perf" value={scan.lighthouse_mobile !== null ? `${scan.lighthouse_mobile}/100` : '--'} color={scan.lighthouse_mobile && scan.lighthouse_mobile >= 90 ? '#16a34a' : '#ed8936'} />
        <Metric label="Google Rating" value={scan.google_rating !== null ? `${scan.google_rating}/5` : 'No GBP'} sub={scan.google_review_count !== null ? `${scan.google_review_count} reviews` : undefined} />
        <Metric label="Social Score" value={`${scan.social_presence_score ?? 0}/100`} color={scan.social_presence_score && scan.social_presence_score >= 50 ? '#16a34a' : '#dc2626'} />
        <Metric label="Scan Cost" value={scan.api_cost !== null ? `$${Number(scan.api_cost).toFixed(2)}` : '--'} />
      </div>

      {/* Lighthouse breakdown */}
      {scan.seo_data?.lighthouse && (
        <Section title="Lighthouse Scores">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            {['desktop', 'mobile'].map(device => {
              const lh = scan.seo_data.lighthouse[device];
              if (!lh) return null;
              return (
                <div key={device} style={card}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '12px', textTransform: 'capitalize' }}>{device}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94a3b8', fontSize: '13px' }}>Performance</span>
                      <ScoreDot value={lh.performance} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94a3b8', fontSize: '13px' }}>Accessibility</span>
                      <ScoreDot value={lh.accessibility} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94a3b8', fontSize: '13px' }}>SEO</span>
                      <ScoreDot value={lh.seo} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {/* Tech Stack */}
      {scan.seo_data?.tech_stack && (
        <Section title="Tech Stack">
          <div style={{ ...card, display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {Object.entries(scan.seo_data.tech_stack)
              .filter(([k]) => !['domain_rank', 'phone', 'last_tech_crawl'].includes(k))
              .map(([key, val]) => {
                const display = Array.isArray(val) ? val.join(', ') : String(val);
                return (
                  <span key={key} style={{ padding: '4px 12px', borderRadius: '6px', backgroundColor: '#1a365d', fontSize: '12px', color: '#94a3b8' }}>
                    <span style={{ color: '#ed8936', fontWeight: 600 }}>{key.replace(/_/g, ' ')}: </span>{display}
                  </span>
                );
              })}
          </div>
        </Section>
      )}
    </>
  );
}

function SEOTab({ scan, keywords }: { scan: ScanRow; keywords: KeywordRow[] }) {
  const seo = scan.seo_data;
  if (!seo) return <div style={{ color: '#64748b', padding: '40px', textAlign: 'center' }}>No SEO data available</div>;

  return (
    <>
      {/* Position Distribution */}
      {seo.domain_overview?.position_distribution && (
        <Section title="Position Distribution">
          <div style={{ ...card, display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {Object.entries(seo.domain_overview.position_distribution).map(([range, count]) => (
              <div key={range} style={{ textAlign: 'center', minWidth: '70px' }}>
                <div style={{ fontSize: '20px', fontWeight: 700, color: (count as number) > 0 ? '#fff' : '#1a365d80' }}>{count as number}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>{range.replace('pos_', '').replace('_', '-')}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Ranked Keywords */}
      <Section title={`Ranked Keywords (${keywords.length})`}>
        <DataTable
          headers={['Keyword', 'Position', 'Volume', 'KD', 'URL']}
          rows={keywords
            .sort((a, b) => (a.position || 999) - (b.position || 999))
            .map(k => [
              k.keyword,
              k.position,
              fmt(k.search_volume),
              k.keyword_difficulty,
              k.url ? new URL(k.url).pathname : '--',
            ])}
        />
      </Section>

      {/* Competitors */}
      {seo.competitors?.discovered && (
        <Section title="Competitors">
          <DataTable
            headers={['Domain', 'Intersections', 'Keywords', 'Traffic (ETV)']}
            rows={seo.competitors.discovered.slice(0, 6).map((c: any) => [
              c.domain,
              c.intersections,
              fmt(c.total_keywords),
              fmt(c.etv ? Math.round(c.etv) : null),
            ])}
          />
        </Section>
      )}

      {/* Keyword Gaps */}
      {seo.keyword_gap && (
        <Section title="Keyword Gaps">
          {Object.entries(seo.keyword_gap).map(([competitor, data]: [string, any]) => (
            <div key={competitor} style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '8px', fontWeight: 600 }}>
                vs {competitor.replace('vs_', '')} ({data.total_gap_keywords} gaps)
              </div>
              <DataTable
                headers={['Keyword', 'Volume', 'CPC']}
                rows={(data.top_gaps || []).slice(0, 8).map((g: any) => [
                  g.keyword,
                  fmt(g.search_volume),
                  g.cpc ? `$${g.cpc}` : '--',
                ])}
              />
            </div>
          ))}
        </Section>
      )}

      {/* Site Crawl Issues */}
      {seo.site_crawl?.issues && (
        <Section title="Site Crawl">
          <div style={{ ...card, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase' }}>Live Pages</div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#fff' }}>{seo.site_crawl.issues.total_live_pages ?? seo.site_crawl.total_pages_crawled}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase' }}>404 Errors</div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: seo.site_crawl.issues.pages_with_404 > 0 ? '#dc2626' : '#16a34a' }}>{seo.site_crawl.issues.pages_with_404}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase' }}>Missing Meta Desc</div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: seo.site_crawl.issues.pages_missing_meta_description > 0 ? '#ed8936' : '#16a34a' }}>{seo.site_crawl.issues.pages_missing_meta_description}</div>
            </div>
          </div>
        </Section>
      )}
    </>
  );
}

function LocalTab({ scan }: { scan: ScanRow }) {
  const local = scan.local_data;
  if (!local) return <div style={{ color: '#64748b', padding: '40px', textAlign: 'center' }}>No local data available</div>;

  return (
    <>
      {/* GBP Status */}
      <Section title="Google Business Profile">
        <div style={card}>
          {local.google_business_profile?.status === 'NOT_FOUND' ? (
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#dc2626', marginBottom: '8px' }}>Not Found</div>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>{local.google_business_profile.note}</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '14px' }}>
              <div><div style={{ fontSize: '11px', color: '#64748b' }}>Name</div><div style={{ fontWeight: 600 }}>{local.google_business_profile?.name || '--'}</div></div>
              <div><div style={{ fontSize: '11px', color: '#64748b' }}>Rating</div><div style={{ fontWeight: 600 }}>{local.google_business_profile?.rating || '--'}/5</div></div>
              <div><div style={{ fontSize: '11px', color: '#64748b' }}>Reviews</div><div style={{ fontWeight: 600 }}>{local.google_business_profile?.review_count || '--'}</div></div>
              <div><div style={{ fontSize: '11px', color: '#64748b' }}>Category</div><div style={{ fontWeight: 600 }}>{local.google_business_profile?.category || '--'}</div></div>
            </div>
          )}
        </div>
      </Section>

      {/* Maps Rankings */}
      {local.maps_rankings && local.maps_rankings.length > 0 && (
        <Section title="Maps Rankings">
          {local.maps_rankings.map((mr: any, i: number) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>"{mr.query}"</span>
                {mr.target_found ? (
                  <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 600, backgroundColor: '#16a34a20', color: '#16a34a' }}>
                    Position {mr.target_position}
                  </span>
                ) : (
                  <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 600, backgroundColor: '#dc262620', color: '#dc2626' }}>
                    Not Found
                  </span>
                )}
              </div>
              {mr.top_10 && (
                <DataTable
                  headers={['Rank', 'Business', 'Rating', 'Reviews']}
                  rows={mr.top_10.slice(0, 5).map((r: any) => [
                    `#${r.rank}`,
                    r.name,
                    r.rating ? `${r.rating}/5` : '--',
                    r.review_count ?? '--',
                  ])}
                />
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Organic SERP */}
      {local.organic_serp && local.organic_serp.length > 0 && (
        <Section title="Organic SERP Rankings">
          <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {local.organic_serp.map((os: any, i: number) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < local.organic_serp.length - 1 ? '1px solid #1a365d30' : 'none' }}>
                <span style={{ fontSize: '13px', color: '#e2e8f0' }}>"{os.query}"</span>
                {os.target_found ? (
                  <span style={{ fontWeight: 700, color: os.target_position <= 10 ? '#16a34a' : '#ed8936' }}>#{os.target_position}</span>
                ) : (
                  <span style={{ color: '#dc2626', fontSize: '12px' }}>Not ranking</span>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Key Competitors */}
      {local.key_competitors && (
        <Section title="Local Competitors">
          <DataTable
            headers={['Business', 'Domain', 'Rating', 'Reviews', 'Maps Rank']}
            rows={local.key_competitors.map((c: any) => [
              c.name,
              c.domain || '--',
              c.rating ? `${c.rating}/5` : '--',
              c.reviews ?? '--',
              c.maps_rank_primary ? `#${c.maps_rank_primary}` : '--',
            ])}
          />
        </Section>
      )}
    </>
  );
}

function SocialTab({ scan }: { scan: ScanRow }) {
  const social = scan.social_data;
  if (!social) return <div style={{ color: '#64748b', padding: '40px', textAlign: 'center' }}>No social data available</div>;

  const platforms = [
    { name: 'Instagram', data: social.instagram, metrics: social.instagram ? [
      { label: 'Followers', value: fmt(social.instagram.followers) },
      { label: 'Posts', value: fmt(social.instagram.posts_count) },
      { label: 'Engagement', value: social.instagram.avg_engagement_rate ? `${social.instagram.avg_engagement_rate}%` : '--' },
    ] : null },
    { name: 'Facebook', data: social.facebook, metrics: social.facebook ? [
      { label: 'Followers', value: fmt(social.facebook.followers) },
      { label: 'Likes', value: fmt(social.facebook.likes) },
      { label: 'Rating', value: social.facebook.rating || '--' },
    ] : null },
  ];

  return (
    <>
      {/* Scores */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        <Metric
          label="Social Presence"
          value={`${social.summary?.social_presence_score ?? 0}/100`}
          color={social.summary?.social_presence_score >= 50 ? '#16a34a' : '#dc2626'}
        />
        <Metric
          label="Review Presence"
          value={`${social.summary?.review_presence_score ?? 0}/100`}
          color={social.summary?.review_presence_score >= 50 ? '#16a34a' : '#dc2626'}
        />
      </div>

      {/* Platforms */}
      <Section title="Social Platforms">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          {platforms.map(p => (
            <div key={p.name} style={card}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>{p.name}</div>
              {p.data === null ? (
                <div style={{ color: '#dc2626', fontSize: '13px' }}>No {p.name} presence found</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {p.metrics!.map(m => (
                    <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b', fontSize: '13px' }}>{m.label}</span>
                      <span style={{ fontWeight: 600, fontSize: '13px' }}>{m.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Ads */}
      {social.facebook_ads && (
        <Section title="Facebook Ads">
          <div style={card}>
            <div style={{ fontSize: '13px', color: social.facebook_ads.running_ads ? '#16a34a' : '#94a3b8' }}>
              {social.facebook_ads.running_ads ? `${social.facebook_ads.active_ads} active ads running` : 'No active ads'}
            </div>
            {social.facebook_ads.notes && <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>{social.facebook_ads.notes}</div>}
          </div>
        </Section>
      )}

      {/* Key Findings */}
      {social.summary?.key_findings && (
        <Section title="Key Findings">
          <div style={card}>
            <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {social.summary.key_findings.map((f: string, i: number) => (
                <li key={i} style={{ fontSize: '13px', color: '#94a3b8' }}>{f}</li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* Opportunities */}
      {social.summary?.opportunities && (
        <Section title="Opportunities">
          <div style={card}>
            <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {social.summary.opportunities.map((o: string, i: number) => (
                <li key={i} style={{ fontSize: '13px', color: '#ed8936' }}>{o}</li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* Contact Info */}
      {social.contact_info && (
        <Section title="Contact Info">
          <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {social.contact_info.phones?.length > 0 && (
              <div style={{ fontSize: '13px' }}><span style={{ color: '#64748b' }}>Phone: </span>{social.contact_info.phones.join(', ')}</div>
            )}
            {social.contact_info.emails?.length > 0 && (
              <div style={{ fontSize: '13px' }}><span style={{ color: '#64748b' }}>Email: </span>{social.contact_info.emails.join(', ')}</div>
            )}
            {social.contact_info.address && (
              <div style={{ fontSize: '13px' }}><span style={{ color: '#64748b' }}>Address: </span>{social.contact_info.address}</div>
            )}
          </div>
        </Section>
      )}
    </>
  );
}

function CompanyTab({ scan }: { scan: ScanRow }) {
  const co = scan.company_data;
  if (!co) return <div style={{ color: '#64748b', padding: '40px', textAlign: 'center' }}>No company data available</div>;

  return (
    <>
      {/* Company Overview */}
      {co.company && (
        <Section title="Company Overview">
          <div style={{ ...card, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            <div><div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase' }}>Name</div><div style={{ fontWeight: 600 }}>{co.company.name}</div></div>
            {co.company.tagline && <div><div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase' }}>Tagline</div><div style={{ fontWeight: 600 }}>{co.company.tagline}</div></div>}
            <div><div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase' }}>Founded</div><div style={{ fontWeight: 600 }}>{co.company.founded || '--'}</div></div>
            <div><div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase' }}>Employees</div><div style={{ fontWeight: 600 }}>{co.company.estimated_employees || '--'}</div></div>
            <div><div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase' }}>Phone</div><div style={{ fontWeight: 600 }}>{co.company.phone || '--'}</div></div>
            <div><div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase' }}>Email</div><div style={{ fontWeight: 600 }}>{co.company.email || '--'}</div></div>
          </div>
        </Section>
      )}

      {/* Revenue */}
      {co.company?.estimated_revenue && (
        <Section title="Revenue Estimate">
          <div style={card}>
            <div style={{ fontSize: '13px', color: '#94a3b8' }}>{co.company.estimated_revenue}</div>
          </div>
        </Section>
      )}

      {/* Leadership */}
      {co.leadership && co.leadership.length > 0 && (
        <Section title="Leadership">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {co.leadership.map((l: any, i: number) => (
              <div key={i} style={card}>
                <div style={{ fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{l.name || 'Unknown'}</div>
                <div style={{ fontSize: '13px', color: '#ed8936', marginBottom: '6px' }}>{l.title}</div>
                {l.background && <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.5 }}>{l.background}</div>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Services */}
      {co.services && (
        <Section title="Services Offered">
          <div style={card}>
            {co.services.primary && (
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', color: '#ed8936', fontWeight: 600, marginBottom: '6px' }}>Primary</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {co.services.primary.map((s: string, i: number) => (
                    <span key={i} style={{ padding: '3px 10px', borderRadius: '6px', backgroundColor: '#1a365d', fontSize: '12px', color: '#e2e8f0' }}>{s}</span>
                  ))}
                </div>
              </div>
            )}
            {co.services.secondary && (
              <div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginBottom: '6px' }}>Secondary</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {co.services.secondary.slice(0, 10).map((s: string, i: number) => (
                    <span key={i} style={{ padding: '3px 10px', borderRadius: '6px', backgroundColor: '#1a365d60', fontSize: '12px', color: '#94a3b8' }}>{s}</span>
                  ))}
                  {co.services.secondary.length > 10 && (
                    <span style={{ padding: '3px 10px', fontSize: '12px', color: '#64748b' }}>+{co.services.secondary.length - 10} more</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Hiring Signals */}
      {co.hiring && (
        <Section title="Hiring Signals">
          <div style={card}>
            <div style={{ fontSize: '13px', color: co.hiring.open_positions > 0 ? '#16a34a' : '#94a3b8', marginBottom: '6px', fontWeight: 600 }}>
              {co.hiring.open_positions > 0 ? `${co.hiring.open_positions} open positions` : 'No open positions'}
            </div>
            {co.hiring.growth_signal && <div style={{ fontSize: '12px', color: '#64748b' }}>{co.hiring.growth_signal}</div>}
          </div>
        </Section>
      )}

      {/* Marketing Capability */}
      {co.marketing_capability && (
        <Section title="Marketing Capability">
          <div style={card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>Level:</span>
              <span style={{ padding: '3px 12px', borderRadius: '6px', backgroundColor: '#dc262620', color: '#dc2626', fontSize: '13px', fontWeight: 600 }}>
                {co.marketing_capability.current_level}
              </span>
            </div>
            {co.marketing_capability.gap_assessment && (
              <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '12px' }}>{co.marketing_capability.gap_assessment}</div>
            )}
            {co.marketing_capability.recommended_services && (
              <div>
                <div style={{ fontSize: '12px', color: '#ed8936', fontWeight: 600, marginBottom: '6px' }}>Recommended Services</div>
                <ul style={{ paddingLeft: '18px' }}>
                  {co.marketing_capability.recommended_services.map((s: string, i: number) => (
                    <li key={i} style={{ fontSize: '13px', color: '#e2e8f0', marginBottom: '4px' }}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Competitive Landscape */}
      {co.competitive_landscape?.key_competitors && (
        <Section title="Competitive Landscape">
          <DataTable
            headers={['Competitor', 'Domain', 'Strength']}
            rows={co.competitive_landscape.key_competitors.map((c: any) => [
              c.name,
              c.domain || '--',
              c.strength || '--',
            ])}
          />
        </Section>
      )}
    </>
  );
}

// ─── History Tab ───

interface ScanHistoryRow {
  scanned_at: string;
  domain_rank: number | null;
  total_keywords: number | null;
  etv: number | null;
  lighthouse_desktop: number | null;
  lighthouse_mobile: number | null;
  google_review_count: number | null;
  api_cost: number | null;
  trigger: string;
}

function HistoryTab({ clientId }: { clientId: string }) {
  const [scans, setScans] = useState<ScanHistoryRow[]>([]);
  const [kwHistory, setKwHistory] = useState<{ keyword: string; data: { date: string; position: number }[] }[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      // Fetch all scans
      const { data: scanData } = await supabase
        .from('cs_scans')
        .select('scanned_at, domain_rank, total_keywords, etv, lighthouse_desktop, lighthouse_mobile, google_review_count, api_cost, trigger, id')
        .eq('client_id', clientId)
        .order('scanned_at', { ascending: true });

      if (scanData) {
        setScans(scanData);

        // Fetch keyword positions across all scans for top keywords
        const scanIds = scanData.map((s: any) => s.id);
        const { data: kwData } = await supabase
          .from('cs_scan_keywords')
          .select('scan_id, keyword, position, search_volume')
          .in('scan_id', scanIds)
          .order('search_volume', { ascending: false });

        if (kwData) {
          // Group by keyword, only take top 8 by volume
          const kwMap = new Map<string, { volume: number; entries: { scanId: string; position: number }[] }>();
          for (const kw of kwData) {
            if (!kwMap.has(kw.keyword)) {
              kwMap.set(kw.keyword, { volume: kw.search_volume || 0, entries: [] });
            }
            kwMap.get(kw.keyword)!.entries.push({ scanId: kw.scan_id, position: kw.position });
          }

          // Sort by volume, take top 8
          const topKws = [...kwMap.entries()]
            .sort((a, b) => b[1].volume - a[1].volume)
            .slice(0, 8);

          // Build chart data: for each keyword, map scanId → date + position
          const scanDateMap = new Map(scanData.map((s: any) => [s.id, s.scanned_at]));
          const kwChartData = topKws.map(([keyword, { entries }]) => ({
            keyword,
            data: entries
              .map(e => ({
                date: new Date(scanDateMap.get(e.scanId)!).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                position: e.position,
              }))
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
          }));

          setKwHistory(kwChartData);
        }
      }
      setLoadingHistory(false);
    }
    loadHistory();
  }, [clientId]);

  if (loadingHistory) return <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Loading history...</div>;
  if (scans.length < 2) return <div style={{ ...card, padding: '40px', textAlign: 'center', color: '#64748b' }}>Need at least 2 scans to show trends. Click "Refresh Metrics" to add another data point.</div>;

  // Build chart data from scans
  const chartData = scans.map(s => ({
    date: new Date(s.scanned_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    keywords: s.total_keywords,
    traffic: s.etv ? Math.round(Number(s.etv)) : null,
    desktopPerf: s.lighthouse_desktop,
    mobilePerf: s.lighthouse_mobile,
    reviews: s.google_review_count,
  }));

  const COLORS = ['#ed8936', '#3182ce', '#16a34a', '#dc2626', '#a855f7', '#ec4899', '#14b8a6', '#f59e0b'];

  return (
    <>
      {/* Metric Trends */}
      <Section title="Performance Over Time">
        <div style={{ ...card, padding: '20px' }}>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a365d40" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f1b2e', border: '1px solid #1a365d60', borderRadius: '8px', fontSize: '13px' }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="desktopPerf" name="Desktop" stroke="#3182ce" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="mobilePerf" name="Mobile" stroke="#ed8936" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Section>

      {/* Traffic & Keywords */}
      <Section title="Traffic & Keywords">
        <div style={{ ...card, padding: '20px' }}>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a365d40" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f1b2e', border: '1px solid #1a365d60', borderRadius: '8px', fontSize: '13px' }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="keywords" name="Keywords" stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="traffic" name="Traffic (ETV)" stroke="#a855f7" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Section>

      {/* Keyword Position Tracking */}
      {kwHistory.length > 0 && (
        <Section title="Keyword Position Tracking">
          <div style={{ ...card, padding: '20px' }}>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>Lower position = better ranking. Tracking top {kwHistory.length} keywords by search volume.</div>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a365d40" />
                <XAxis
                  dataKey="date"
                  type="category"
                  allowDuplicatedCategory={false}
                  stroke="#64748b"
                  fontSize={12}
                />
                <YAxis reversed domain={[0, 'auto']} stroke="#64748b" fontSize={12} label={{ value: 'Position', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f1b2e', border: '1px solid #1a365d60', borderRadius: '8px', fontSize: '13px' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                {kwHistory.map((kw, i) => (
                  <Line
                    key={kw.keyword}
                    data={kw.data}
                    type="monotone"
                    dataKey="position"
                    name={kw.keyword}
                    stroke={COLORS[i % COLORS.length]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    connectNulls
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Section>
      )}

      {/* Scan History Table */}
      <Section title="Scan History">
        <DataTable
          headers={['Date', 'Keywords', 'Traffic', 'Desktop', 'Mobile', 'Reviews', 'Cost', 'Source']}
          rows={[...scans].reverse().map(s => [
            new Date(s.scanned_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            s.total_keywords ?? '--',
            s.etv ? Math.round(Number(s.etv)) : '--',
            s.lighthouse_desktop ?? '--',
            s.lighthouse_mobile ?? '--',
            s.google_review_count ?? '--',
            s.api_cost ? `$${Number(s.api_cost).toFixed(2)}` : '--',
            s.trigger,
          ])}
        />
      </Section>
    </>
  );
}

// ─── Main Component ───

const REFRESH_URL = 'https://nnxbgderdyjanzwgabxl.supabase.co/functions/v1/client-refresh';
const REFRESH_KEY = 'brothers-refresh-2026';

export default function ClientDetail({ domain }: { domain: string }) {
  const [client, setClient] = useState<ClientRow | null>(null);
  const [scan, setScan] = useState<ScanRow | null>(null);
  const [keywords, setKeywords] = useState<KeywordRow[]>([]);
  const [tab, setTab] = useState<Tab>('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [logs, setLogs] = useState<{ time: string; msg: string; type: 'info' | 'success' | 'error' }[]>([]);
  const [showLogs, setShowLogs] = useState(false);

  function addLog(msg: string, type: 'info' | 'success' | 'error' = 'info') {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [...prev, { time, msg, type }]);
  }

  async function loadData() {
    const { data: clientData, error: clientErr } = await supabase
      .from('cs_clients')
      .select('*')
      .eq('domain', domain)
      .single();

    if (clientErr || !clientData) {
      setError(`Client not found: ${domain}`);
      return;
    }
    setClient(clientData);

    // Latest scan for metrics
    const { data: scanData } = await supabase
      .from('cs_scans')
      .select('*')
      .eq('client_id', clientData.id)
      .order('scanned_at', { ascending: false })
      .limit(1)
      .single();

    if (scanData) {
      // If latest scan is missing JSONB data (lightweight refresh),
      // merge in JSONB from the most recent full scan
      if (!scanData.seo_data && !scanData.company_data && !scanData.local_data && !scanData.social_data) {
        const { data: fullScan } = await supabase
          .from('cs_scans')
          .select('seo_data, company_data, local_data, social_data')
          .eq('client_id', clientData.id)
          .not('seo_data', 'is', null)
          .order('scanned_at', { ascending: false })
          .limit(1)
          .single();

        if (fullScan) {
          scanData.seo_data = fullScan.seo_data;
          scanData.company_data = fullScan.company_data;
          scanData.local_data = fullScan.local_data;
          scanData.social_data = fullScan.social_data;
        }
      }

      setScan(scanData);

      const { data: kwData } = await supabase
        .from('cs_scan_keywords')
        .select('*')
        .eq('scan_id', scanData.id)
        .order('search_volume', { ascending: false });

      setKeywords(kwData || []);
    }
  }

  useEffect(() => {
    loadData().then(() => setLoading(false));
  }, [domain]);

  async function handleRefresh() {
    setRefreshing(true);
    setShowLogs(true);
    setLogs([]);
    addLog(`Starting refresh for ${domain}...`);
    addLog('Calling edge function: client-refresh');
    addLog('Endpoints: domain_rank_overview, domain_technologies, ranked_keywords, lighthouse (x2), GBP');

    const startTime = Date.now();

    try {
      const res = await fetch(REFRESH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': REFRESH_KEY },
        body: JSON.stringify({ domain }),
      });
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const data = await res.json();

      if (!res.ok) {
        addLog(`Failed (${elapsed}s): ${data.error || 'Unknown error'}`, 'error');
      } else {
        addLog(`DataForSEO calls complete (${elapsed}s)`, 'success');
        const m = data.metrics;
        if (m.domainRank !== null) addLog(`Domain rank: ${m.domainRank}`);
        addLog(`Keywords tracked: ${data.keywords_tracked}`);
        if (m.etv !== null) addLog(`Traffic (ETV): ${m.etv}`);
        addLog(`Lighthouse desktop: ${m.lighthouseDesktop ?? 'n/a'}`);
        addLog(`Lighthouse mobile: ${m.lighthouseMobile ?? 'n/a'}`);
        if (m.googleRating !== null) addLog(`Google rating: ${m.googleRating} (${m.googleReviewCount} reviews)`);
        else addLog('Google Business Profile: not found');
        addLog(`API cost: $${data.api_cost}`);
        if (data.errors) {
          for (const e of data.errors) addLog(`Warning: ${e}`, 'error');
        }
        addLog(`Scan saved: ${data.scan_id}`, 'success');
        addLog('Reloading dashboard data...');
        await loadData();
        addLog('Dashboard updated', 'success');
      }
    } catch (e) {
      addLog(`Network error: ${e}`, 'error');
    }
    setRefreshing(false);
  }

  if (loading) return <div style={{ padding: '80px 0', textAlign: 'center', color: '#94a3b8' }}>Loading {domain}...</div>;
  if (error) return <div style={{ padding: '40px', color: '#dc2626', backgroundColor: '#dc262610', borderRadius: '12px', textAlign: 'center' }}>{error}</div>;
  if (!client) return null;

  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'seo', label: 'SEO' },
    { key: 'local', label: 'Local' },
    { key: 'social', label: 'Social' },
    { key: 'company', label: 'Company' },
    { key: 'history', label: 'History' },
  ];

  return (
    <div>
      {/* Client Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
              {client.business_name || client.domain}
            </h1>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '14px', color: '#64748b' }}>
              <span>{client.domain}</span>
              {client.location && <span>{client.location}</span>}
              {client.angle && <span style={{ color: '#ed8936' }}>{client.angle}</span>}
              {scan && <span>Last scan: {fmtDate(scan.scanned_at)}</span>}
            </div>
            {client.notes && <div style={{ marginTop: '8px', fontSize: '13px', color: '#94a3b8' }}>{client.notes}</div>}
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px solid #3182ce40',
              backgroundColor: refreshing ? '#1a365d' : 'transparent',
              color: '#3182ce',
              fontSize: '13px',
              fontWeight: 600,
              cursor: refreshing ? 'wait' : 'pointer',
              opacity: refreshing ? 0.6 : 1,
              whiteSpace: 'nowrap',
              transition: 'all 150ms ease',
            }}
          >
            {refreshing ? 'Refreshing...' : '\u21BB Refresh Metrics'}
          </button>
        </div>
      </div>

      {/* Logs Panel */}
      {showLogs && logs.length > 0 && (
        <div style={{
          backgroundColor: '#0a0e1a',
          border: '1px solid #1a365d40',
          borderRadius: '8px',
          marginBottom: '20px',
          overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 14px',
            borderBottom: '1px solid #1a365d30',
            backgroundColor: '#0f1520',
          }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Refresh Log {refreshing && <span style={{ color: '#ed8936' }}>(running...)</span>}
            </span>
            <button
              onClick={() => { setShowLogs(false); setLogs([]); }}
              style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '14px', padding: '0 4px' }}
            >
              {'\u2715'}
            </button>
          </div>
          <div style={{
            padding: '10px 14px',
            maxHeight: '200px',
            overflowY: 'auto',
            fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', monospace",
            fontSize: '12px',
            lineHeight: 1.7,
          }}>
            {logs.map((log, i) => (
              <div key={i} style={{
                color: log.type === 'success' ? '#16a34a' : log.type === 'error' ? '#dc2626' : '#94a3b8',
              }}>
                <span style={{ color: '#1a365d80', marginRight: '8px' }}>{log.time}</span>
                {log.msg}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', borderBottom: '1px solid #1a365d40', paddingBottom: '0' }}>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: '10px 20px',
              border: 'none',
              backgroundColor: 'transparent',
              color: tab === t.key ? '#ed8936' : '#64748b',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              borderBottom: tab === t.key ? '2px solid #ed8936' : '2px solid transparent',
              transition: 'all 150ms ease',
              marginBottom: '-1px',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {!scan ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No scan data yet. Run /client-scan to generate data.</div>
      ) : (
        <>
          {tab === 'overview' && <OverviewTab scan={scan} />}
          {tab === 'seo' && <SEOTab scan={scan} keywords={keywords} />}
          {tab === 'local' && <LocalTab scan={scan} />}
          {tab === 'social' && <SocialTab scan={scan} />}
          {tab === 'company' && <CompanyTab scan={scan} />}
          {tab === 'history' && <HistoryTab clientId={client.id} />}
        </>
      )}
    </div>
  );
}
