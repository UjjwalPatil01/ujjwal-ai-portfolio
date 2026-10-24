import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  ExternalLink,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  Server,
} from 'lucide-react';
import { profileIdentity } from '../../data/portfolioData';
import { checkBackendHealth, submitContactMessage } from '../../lib/api';
import {
  ContactFormValues,
  ContactValidationErrors,
  validateContactForm,
} from '../../lib/validation';
import { Reveal } from '../animations/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export const Contact: React.FC = () => {
  const isMountedRef = useRef(true);
  const [formValues, setFormValues] = useState<ContactFormValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  });
  const [errors, setErrors] = useState<ContactValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<{
    message: string;
    referenceId: number;
  } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  useEffect(() => {
    isMountedRef.current = true;
    checkBackendHealth().then((health) => {
      if (isMountedRef.current) {
        setApiOnline(Boolean(health && health.status === 'healthy'));
      }
    });
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileIdentity.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback if clipboard permission denied
      window.location.href = `mailto:${profileIdentity.email}`;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    const validationErrors = validateContactForm(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const response = await submitContactMessage(formValues);
      if (!isMountedRef.current) return;
      setSubmitSuccess({
        message: response.message,
        referenceId: response.reference_id,
      });
      setFormValues({
        name: '',
        email: '',
        subject: '',
        message: '',
        website: '',
      });
      setApiOnline(true);
    } catch (err) {
      if (!isMountedRef.current) return;
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to submit message right now. Please use the direct email option.';
      setSubmitError(message);
    } finally {
      if (isMountedRef.current) {
        setSubmitting(false);
      }
    }
  };

  const mailtoFallbackHref = `mailto:${profileIdentity.email}?subject=${encodeURIComponent(
    formValues.subject.trim() || 'Opportunity Inquiry via ujjwal.ai Portfolio'
  )}&body=${encodeURIComponent(
    `Hi Ujjwal,

${formValues.message.trim()}

Best regards,
${formValues.name.trim()}
${formValues.email.trim()}`
  )}`;

  return (
    <section
      id="contact"
      className="py-20 sm:py-24 border-t border-slate-800/80 bg-[#080d1a]/80"
      aria-label="Contact Ujjwal Pradip Patil"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Contact & Opportunities"
            title="Let's Discuss Entry-Level AI/ML & Python Backend Roles"
            description="Whether you are hiring for an entry-level AI/ML Engineer, Generative AI Engineer, or Python Backend Developer role, feel free to send a message via the FastAPI contact service or reach out directly by email."
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Channels */}
          <div className="lg:col-span-5 space-y-4">
            <Reveal>
              <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-slate-800/90 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Direct Contact Channels</h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Available for full-time entry-level roles, technical interviews, and engineering discussions.
                  </p>
                </div>

                {/* Email with Copy Action */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    Primary Email
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
                    <a
                      href={`mailto:${profileIdentity.email}`}
                      className="text-sm sm:text-base font-mono text-slate-100 hover:text-cyan-300 break-all"
                    >
                      {profileIdentity.email}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors"
                      aria-label="Copy email address to clipboard"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Phone & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                    <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mb-1">
                      <Phone className="w-3.5 h-3.5 text-cyan-400" />
                      Phone
                    </div>
                    <a
                      href={`tel:${profileIdentity.phone.replace(/\s+/g, '')}`}
                      className="text-sm font-mono text-slate-200 hover:text-cyan-300"
                    >
                      {profileIdentity.phone}
                    </a>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                    <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      Location
                    </div>
                    <div className="text-sm text-slate-200">{profileIdentity.location}</div>
                  </div>
                </div>

                {/* Professional Profiles */}
                <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Verified Profiles
                  </div>
                  <div className="flex flex-col gap-2">
                    <a
                      href={profileIdentity.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-sm text-slate-200 transition-colors"
                    >
                      <span>LinkedIn // in/ujjwalpatil-ai</span>
                      <ExternalLink className="w-4 h-4 text-cyan-400" />
                    </a>
                    <a
                      href={profileIdentity.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-sm text-slate-200 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-cyan-400" />
                        GitHub // github.com/UjjwalPatil01
                      </span>
                      <ExternalLink className="w-4 h-4 text-cyan-400" />
                    </a>
                  </div>
                </div>

                {/* Backend Status Indicator */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-cyan-400" />
                    FastAPI Contact Service
                  </span>
                  {apiOnline === null ? (
                    <span className="text-slate-400">Checking status...</span>
                  ) : apiOnline ? (
                    <span className="text-emerald-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Connected (SQLite Ready)
                    </span>
                  ) : (
                    <span className="text-amber-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      Offline (Direct Email Fallback Active)
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: FastAPI-Backed Contact Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl glass-panel p-6 sm:p-8 border border-slate-800/90 space-y-5"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Send a Direct Message</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Validated by Pydantic &amp; persisted via FastAPI (`POST /api/contact`).
                    </p>
                  </div>
                </div>

                {/* Honeypot anti-spam input (visually hidden from human users) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="contact-website">Website (Leave blank)</label>
                  <input
                    id="contact-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formValues.website}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
                    >
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      maxLength={100}
                      placeholder="e.g., Priya Sharma"
                      value={formValues.name}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/90 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                    {errors.name && (
                      <p id="contact-name-error" className="mt-1.5 text-xs text-rose-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
                    >
                      Your Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      maxLength={254}
                      placeholder="name@company.com"
                      value={formValues.email}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/90 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                    {errors.email && (
                      <p id="contact-email-error" className="mt-1.5 text-xs text-rose-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
                  >
                    Subject / Role Title
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    maxLength={150}
                    placeholder="e.g., Entry-Level AI/ML Engineer Opportunity"
                    value={formValues.subject}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.subject)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/90 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                  {errors.subject && (
                    <p className="mt-1.5 text-xs text-rose-400">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300"
                    >
                      Message <span className="text-cyan-400">*</span>
                    </label>
                    <span className="text-[11px] font-mono text-slate-400">
                      {formValues.message.length} / 2500
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    maxLength={2500}
                    placeholder="Share details about the role, team, or project you'd like to discuss..."
                    value={formValues.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/90 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none resize-y"
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="mt-1.5 text-xs text-rose-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Honest Success Banner */}
                {submitSuccess && (
                  <div
                    role="status"
                    className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-start gap-3 text-emerald-200"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm">
                      <p className="font-semibold text-emerald-100">{submitSuccess.message}</p>
                      <p className="font-mono text-xs text-emerald-300/90 mt-1">
                        Confirmation Reference ID: #{submitSuccess.referenceId}
                      </p>
                    </div>
                  </div>
                )}

                {/* Honest Error + Direct Email Fallback Banner */}
                {submitError && (
                  <div
                    role="alert"
                    className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-3 text-rose-200"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm">
                        <p className="font-semibold text-rose-100">Submission Notice</p>
                        <p className="mt-0.5">{submitError}</p>
                      </div>
                    </div>
                    <div className="pl-8">
                      <a
                        href={mailtoFallbackHref}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-rose-500/20 hover:bg-rose-500/30 text-rose-100 border border-rose-400/40 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        Send via Direct Email Fallback ({profileIdentity.email})
                      </a>
                    </div>
                  </div>
                )}

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-glow transition-all disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <a
                    href={mailtoFallbackHref}
                    className="text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    Prefer your email client? Open mailto link →
                  </a>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
