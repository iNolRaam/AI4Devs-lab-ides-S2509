import React, { useState } from 'react';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  education: '',
  workExperience: '',
};

const CandidateForm: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [fields, setFields] = useState(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fields.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!fields.lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!fields.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(fields.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!fields.phone.trim()) {
      newErrors.phone = 'Phone is required.';
    } else if (!/^\+?[0-9\s\-]{7,}$/.test(fields.phone)) {
      newErrors.phone = 'Enter a valid phone number.';
    }
    if (!fields.address.trim()) newErrors.address = 'Address is required.';
    if (!fields.education.trim()) newErrors.education = 'Education is required.';
    if (!fields.workExperience.trim()) newErrors.workExperience = 'Work experience is required.';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const [globalError, setGlobalError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);
    setSuccess(false);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await fetch('http://localhost:3010/api/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      if (response.ok) {
        setSuccess(true);
        setFields(initialState);
        setErrors({});
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors || {});
        setGlobalError('Please correct the highlighted errors.');
      } else {
        setGlobalError('We couldn’t save the candidate. Please try again.');
      }
    } catch (err) {
      setGlobalError('Network error. Please try again.');
    }
  };

  return (
    <dialog open style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      border: 'none',
      padding: 0,
    }}>
      <div
        style={{
          background: '#fff',
          borderRadius: '8px',
          padding: '2rem',
          minWidth: '320px',
          maxWidth: '400px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        }}
      >
  <h2 id="candidate-form-title" tabIndex={-1}>Add Candidate</h2>
        {globalError && (
          <div role="alert" aria-live="assertive" style={{ color: 'red', marginBottom: '0.5em' }}>
            {globalError}
          </div>
        )}
        {success ? (
          <div role="status" aria-live="polite" style={{ color: 'green', marginBottom: '1em' }}>
            Candidate added successfully.<br />
            <button type="button" onClick={() => setSuccess(false)} style={{ marginTop: '0.5em', marginRight: '1em', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.5rem 1.5rem', cursor: 'pointer' }}>Add Another Candidate</button>
            <button type="button" onClick={onClose} style={{ marginTop: '0.5em', background: '#eee', border: 'none', borderRadius: '4px', padding: '0.5rem 1.5rem', cursor: 'pointer' }}>Close</button>
          </div>
        ) : (
        <form aria-labelledby="candidate-form-title" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSubmit} noValidate>
          <label htmlFor="firstName">
            First Name <span style={{ color: 'red' }}>*</span>
            <input id="firstName" name="firstName" type="text" placeholder="e.g. Jane" value={fields.firstName} onChange={handleChange} style={{ width: '100%' }} aria-required="true" aria-invalid={!!errors.firstName} aria-describedby={errors.firstName ? 'firstName-error' : undefined} />
            {errors.firstName && <span id="firstName-error" style={{ color: 'red', fontSize: '0.9em' }} role="alert" aria-live="assertive">{errors.firstName}</span>}
          </label>
          <label htmlFor="lastName">
            Last Name <span style={{ color: 'red' }}>*</span>
            <input id="lastName" name="lastName" type="text" placeholder="e.g. Doe" value={fields.lastName} onChange={handleChange} style={{ width: '100%' }} aria-required="true" aria-invalid={!!errors.lastName} aria-describedby={errors.lastName ? 'lastName-error' : undefined} />
            {errors.lastName && <span id="lastName-error" style={{ color: 'red', fontSize: '0.9em' }} role="alert" aria-live="assertive">{errors.lastName}</span>}
          </label>
          <label htmlFor="email">
            Email <span style={{ color: 'red' }}>*</span>
            <input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="e.g. jane.doe@email.com" 
              value={fields.email} 
              onChange={handleChange} 
              style={{ width: '100%' }} 
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error email-help' : 'email-help'}
            />
            <span id="email-help" style={{ fontSize: '0.85em', color: '#555', display: 'block', marginTop: '0.2em' }}>
              Example: jane.doe@email.com
            </span>
            {errors.email && <span id="email-error" style={{ color: 'red', fontSize: '0.9em' }} role="alert" aria-live="assertive">{errors.email}</span>}
          </label>
          <label htmlFor="phone">
            Phone <span style={{ color: 'red' }}>*</span>
            <input 
              id="phone" 
              name="phone" 
              type="tel" 
              placeholder="e.g. +1 555 123 4567" 
              value={fields.phone} 
              onChange={handleChange} 
              style={{ width: '100%' }} 
              aria-required="true"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error phone-help' : 'phone-help'}
            />
            <span id="phone-help" style={{ fontSize: '0.85em', color: '#555', display: 'block', marginTop: '0.2em' }}>
              Example: +1 555 123 4567
            </span>
            {errors.phone && <span id="phone-error" style={{ color: 'red', fontSize: '0.9em' }} role="alert" aria-live="assertive">{errors.phone}</span>}
          </label>
          <label htmlFor="address">
            Address <span style={{ color: 'red' }}>*</span>
            <input id="address" name="address" type="text" placeholder="e.g. 123 Main St, City" value={fields.address} onChange={handleChange} style={{ width: '100%' }} aria-required="true" aria-invalid={!!errors.address} aria-describedby={errors.address ? 'address-error' : undefined} />
            {errors.address && <span id="address-error" style={{ color: 'red', fontSize: '0.9em' }} role="alert" aria-live="assertive">{errors.address}</span>}
          </label>
          <label htmlFor="education">
            Education <span style={{ color: 'red' }}>*</span>
            <input id="education" name="education" type="text" placeholder="e.g. BSc Computer Science" value={fields.education} onChange={handleChange} style={{ width: '100%' }} aria-required="true" aria-invalid={!!errors.education} aria-describedby={errors.education ? 'education-error' : undefined} />
            {errors.education && <span id="education-error" style={{ color: 'red', fontSize: '0.9em' }} role="alert" aria-live="assertive">{errors.education}</span>}
          </label>
          <label htmlFor="workExperience">
            Work Experience <span style={{ color: 'red' }}>*</span>
            <input id="workExperience" name="workExperience" type="text" placeholder="e.g. 3 years at Acme Corp" value={fields.workExperience} onChange={handleChange} style={{ width: '100%' }} aria-required="true" aria-invalid={!!errors.workExperience} aria-describedby={errors.workExperience ? 'workExperience-error' : undefined} />
            {errors.workExperience && <span id="workExperience-error" style={{ color: 'red', fontSize: '0.9em' }} role="alert" aria-live="assertive">{errors.workExperience}</span>}
          </label>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="submit" style={{ background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.5rem 1.5rem', cursor: 'pointer' }}>
              Add Candidate
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: '#eee',
                border: 'none',
                borderRadius: '4px',
                padding: '0.5rem 1.5rem',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
  </form>
  )}
      </div>
    </dialog>
  );
};

export default CandidateForm;
