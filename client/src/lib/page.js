import { useEffect } from 'react';

export function usePageMeta({ title, description, robots }) {
  useEffect(() => {
    document.title = title ? `${title} · Uttaree` : 'Uttaree';

    const descriptionTag = ensureMeta('description');
    if (description) descriptionTag.setAttribute('content', description);

    const robotsTag = ensureMeta('robots');
    robotsTag.setAttribute('content', robots || 'index,follow');
  }, [title, description, robots]);
}

function ensureMeta(name) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  return tag;
}

export async function sendInquiry(payload) {
  const response = await fetch('/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || 'Could not send the message.');
    error.fields = data.fields || {};
    throw error;
  }
  return data;
}
