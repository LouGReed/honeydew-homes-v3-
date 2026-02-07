'use client';

import { useState } from 'react';
import { siteConfig } from '@/config/site';

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-list">
      {siteConfig.faqs.map((faq, index) => (
        <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
          <button className="faq-question" onClick={() => toggleFAQ(index)}>
            <span className="faq-question-text">{faq.question}</span>
            <span className="faq-icon">+</span>
          </button>
          <div className="faq-answer">
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
