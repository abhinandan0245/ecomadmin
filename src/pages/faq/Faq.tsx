import React from 'react';
import { useGetFaqsQuery } from '../../../features/faq/faqApi';

const Faq = () => {
  const { data: faqs = [], isLoading } = useGetFaqsQuery();

  if (isLoading) {
    return <p>Loading FAQs...</p>;
  }

  return (
    <div className="faq-container">
      <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
      {faqs.map((faq) => (
        <div key={faq.id} className="faq-item mb-4">
          <h2 className="text-xl font-semibold">{faq.question}</h2>
          <p className="text-gray-700">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default Faq;
