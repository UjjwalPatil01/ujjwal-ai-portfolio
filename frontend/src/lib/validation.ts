export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
}

export interface ContactValidationErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_PATTERN =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

export function validateContactForm(values: ContactFormValues): ContactValidationErrors {
  const errors: ContactValidationErrors = {};

  const trimmedName = values.name.trim();
  if (!trimmedName) {
    errors.name = 'Please enter your name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (trimmedName.length > 100) {
    errors.name = 'Name must be 100 characters or fewer.';
  }

  const trimmedEmail = values.email.trim();
  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address (e.g., name@company.com).';
  }

  const trimmedSubject = values.subject.trim();
  if (trimmedSubject.length > 150) {
    errors.subject = 'Subject must be 150 characters or fewer.';
  }

  const trimmedMessage = values.message.trim();
  if (!trimmedMessage) {
    errors.message = 'Please enter a message.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters long.';
  } else if (trimmedMessage.length > 2500) {
    errors.message = 'Message must be 2,500 characters or fewer.';
  }

  return errors;
}
