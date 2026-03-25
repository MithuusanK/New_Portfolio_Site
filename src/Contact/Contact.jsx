import React from 'react';

const contactItems = [
  { label: 'status', value: 'open_to_work' },
  { label: 'email', value: 'mithuusank@gmail.com' },
  { label: 'phone', value: '+1 (647) 568-7527' },
  { label: 'location', value: 'Toronto, Ontario, Canada' },
];

const Contact = () => (
  <section id="contact" className="section">
    <h2 className="section-title">$ ./contact.exe</h2>

    <div className="contact-layout">
      <article className="panel contact-terminal">
        <header>contact_info.json</header>
        <pre>
          <code>
{`{
  "status": "open_to_work",
  "email": "mithuusank@gmail.com",
  "phone": "+1 (647) 568-7527",
  "location": "Toronto, Ontario, Canada"
}`}
          </code>
        </pre>

        <ul>
          {contactItems.map((item) => (
            <li key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </li>
          ))}
        </ul>
      </article>

      <article className="panel contact-actions-card">
        <header>sendMessage.ts</header>
        <p>
          Interested in collaborating or discussing a role? Launch a message and I
          will get back to you quickly.
        </p>

        <div className="contact-actions-grid">
          <a href="mailto:mithuusank@gmail.com" className="btn btn-primary">
            Send Email
          </a>
          <a
            href="https://www.linkedin.com/in/mithuusan-kirupananthan-9b92261a5/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/MithuusanK"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            GitHub
          </a>
        </div>
      </article>
    </div>
  </section>
);

export default Contact;
