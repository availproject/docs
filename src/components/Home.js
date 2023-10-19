import React, { useState } from 'react';
import { contentData } from '../data/content-data';
import Layout from '@theme/Layout';
import { ButtonLink, TutorialsCard, FAQSection, EcosystemSection } from '.';

function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bootstrap-wrapper">
      <div className="section-divider"></div>
      <div className="container">
        <div className="row">
          <div className="index-page exclude">
            <section className="section container-fluid">
              <div className="row justify-content-between">
                <h1 className="landing-page-h1">
                  <a href="https://www.availproject.org/">Avail</a> Developer
                  Docs
                </h1>
              </div>
            </section>
          </div>
          <br />
          <br />
        </div>
        <div className="section-divider"></div>
        <div className="justify-content-center tutorial-cards">
          {contentData.linksCard.map((props, idx) => (
            <TutorialsCard key={idx} {...props} />
          ))}
        </div>
      </div>
      <div className="section-divider"></div>
      <section className="section-ecosystem full-background">
        <div className="container">
          <EcosystemSection {...contentData.ecosystem} />
        </div>
      </section>
    </div>
  );
}

export default Home;
