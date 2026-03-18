import type { APIRoute } from 'astro';

export const prerender = false;

const PIXEL_ID = '1452124226351453';
const META_API_VERSION = 'v21.0';

export const POST: APIRoute = async ({ request }) => {
  const token = import.meta.env.META_CAPI_TOKEN;

  if (!token) {
    return new Response(JSON.stringify({ error: 'Missing CAPI token' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { event_name, event_id, event_source_url, user_data = {} } = body;

    if (!event_name || !event_id) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const eventData = {
      data: [
        {
          event_name,
          event_time: Math.floor(Date.now() / 1000),
          event_id,
          event_source_url,
          action_source: 'website',
          user_data: {
            client_ip_address:
              request.headers.get('x-forwarded-for') ||
              request.headers.get('x-real-ip') ||
              undefined,
            client_user_agent: request.headers.get('user-agent') || undefined,
            ...user_data,
          },
        },
      ],
    };

    const response = await fetch(
      `https://graph.facebook.com/${META_API_VERSION}/${PIXEL_ID}/events?access_token=${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      }
    );

    const result = await response.json();

    return new Response(JSON.stringify(result), {
      status: response.ok ? 200 : 502,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
