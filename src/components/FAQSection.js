import * as React from 'react';
import { FAQAccordion } from './FAQAccordion';
import { HeadSection } from './HeadSection';

export const FAQSection = (props) => {
  const { faqList = [], head = {} } = props;

  return (
    <>
      <HeadSection {...head} />
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-wrapper">
        {faqList.length &&
          faqList.map((props, idx) => <FAQAccordion key={idx} {...props} />)}
      </div>
    </>
  );
};
