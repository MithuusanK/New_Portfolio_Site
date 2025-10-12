import React from 'react';

const Contact = () => (
  <section id="contact" className="section contact-section">
    <h2 className="contact-title">Get In Touch</h2>
    <p className="contact-info-desc" style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto 2.5rem auto' }}>
      Whether you have a project idea, need coding help, or just want to connect, I'm always open to new opportunities. Reach out anytime!
    </p>
    <div className="contact-bubble-row" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
      <div className="contact-bubble">
        <span className="contact-bubble-label">Email</span>
        <span className="contact-bubble-value">mithuusank@gmail.com</span>
      </div>
      <div className="contact-bubble">
        <span className="contact-bubble-label">Phone</span>
        <span className="contact-bubble-value">+1 (647) 568-7527</span>
      </div>
      <div className="contact-bubble">
        <span className="contact-bubble-label">Location</span>
        <span className="contact-bubble-value">Toronto, Ontario, Canada</span>
      </div>
    </div>
  </section>
);

export default Contact;