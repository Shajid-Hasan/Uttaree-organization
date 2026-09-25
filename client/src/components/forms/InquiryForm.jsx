import { useState } from 'react';
import { sendInquiry } from '../../lib/page';

const fieldClass = 'mt-2 w-full border border-sand bg-[#f7f6f3] px-3 py-2.5 text-sm text-ink outline-none transition focus:border-ink';

export default function InquiryForm({ kind = 'contact', source = '', projectSlug = '', submitLabel = 'Send message' }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    company: '',
  });
  const [fields, setFields] = useState({});
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  function update(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setStatus('sending');
    setError('');
    setFields({});
    try {
      await sendInquiry({ ...form, kind, source, projectSlug });
      setStatus('sent');
      setForm({ name: '', phone: '', email: '', message: '', company: '' });
    } catch (err) {
      setStatus('idle');
      setError(err.message);
      setFields(err.fields || {});
    }
  }

  if (status === 'sent') {
    return (
      <div role="status">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">Message received.</h3>
        <span className="mt-4 block h-px w-8 bg-primary" />
        <p className="mt-4 text-sm leading-7 text-muted">The Uttaree office will reply using the number you gave.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative grid gap-5" noValidate>
      <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
        <label>
          Company
          <input name="company" value={form.company} onChange={update} tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <Field label="Name" name="name" value={form.name} onChange={update} error={fields.name} required />
      <Field label="Phone" name="phone" value={form.phone} onChange={update} error={fields.phone} required />
      <Field label="Email" name="email" type="email" value={form.email} onChange={update} error={fields.email} />
      <label className="block text-[0.68rem] font-medium uppercase tracking-[0.16em] text-muted">
        Message
        <textarea name="message" rows="5" value={form.message} onChange={update} className={fieldClass} required />
        {fields.message && <span className="mt-1 block text-sm font-normal text-red-700">{fields.message}</span>}
      </label>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-1 w-fit border border-ink bg-transparent px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:border-primary hover:bg-primary hover:text-white disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : submitLabel}
      </button>
    </form>
  );
}

function Field({ label, name, error, ...props }) {
  return (
    <label className="block text-[0.68rem] font-medium uppercase tracking-[0.16em] text-muted">
      {label}
      <input name={name} className={fieldClass} {...props} />
      {error && <span className="mt-1 block text-sm font-normal text-red-700">{error}</span>}
    </label>
  );
}
