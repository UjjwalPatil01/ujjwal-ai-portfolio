import { ContactFormValues } from './validation';

export interface ContactApiResponse {
  status: string;
  message: string;
  reference_id: number;
  timestamp: string;
}

export interface HealthApiResponse {
  status: string;
  service: string;
  version: string;
  database: string;
  timestamp: string;
}

function getApiBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/+$/, '');
  }
  return '';
}

export async function checkBackendHealth(): Promise<HealthApiResponse | null> {
  const baseUrl = getApiBaseUrl();
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(`${baseUrl}/api/health`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    window.clearTimeout(timeoutId);
    if (!response.ok) {
      return null;
    }
    return (await response.json()) as HealthApiResponse;
  } catch {
    window.clearTimeout(timeoutId);
    return null;
  }
}

export async function submitContactMessage(
  payload: ContactFormValues
): Promise<ContactApiResponse> {
  const baseUrl = getApiBaseUrl();
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 10000);

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: payload.name.trim(),
        email: payload.email.trim(),
        subject: payload.subject.trim() || 'Portfolio Inquiry',
        message: payload.message.trim(),
        website: payload.website || '',
      }),
      signal: controller.signal,
    });
  } catch {
    window.clearTimeout(timeoutId);
    throw new Error(
      'Unable to reach the backend API right now. You can send your message directly via the email fallback button below.'
    );
  }

  window.clearTimeout(timeoutId);

  let data: Record<string, unknown> = {};
  try {
    data = (await response.json()) as Record<string, unknown>;
  } catch {
    // non-JSON response
  }

  if (!response.ok) {
    const detail =
      typeof data.detail === 'string'
        ? data.detail
        : response.status === 429
          ? 'Too many messages sent recently. Please wait a few minutes or email ujjwalpatil163@gmail.com directly.'
          : 'Could not process your request. Please check your inputs or use direct email.';
    throw new Error(detail);
  }

  return data as unknown as ContactApiResponse;
}
