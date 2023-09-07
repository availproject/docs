import * as React from "react";
import {useState} from "react";
import Layout from "@theme/Layout";
import { contentData } from "../data/content-data";
import {ButtonLink, TutorialsCard, FAQSection, EcosystemSection} from "../components";

function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Layout>
      <div className="bootstrap-wrapper">
        <div className="section-divider"></div>
        <div className="container">
          <div className="row">
            <div className="index-page exclude">
              <section className="section container-fluid">
                <div className="row justify-content-between">
                <h1 className="landing-page-h1"><a href="https://www.availproject.org/">Avail</a> Developer Docs</h1>
                </div>
              </section>
            </div>
            <br/>
            <br/>
          </div>
          <div className="section-divider"></div>
          <div className="justify-content-center tutorial-cards">
            {
              contentData.linksCard.map((props, idx) => <TutorialsCard key={idx} {...props}/>)
            }
          </div>
        </div>
        <div className="section-divider"></div>
        <section className="section-ecosystem full-background">
          <div className="container">
            <EcosystemSection {...contentData.ecosystem}/>
          </div>
        </section>

        <div className="container">
          <div className="section-divider"></div>
          <section className="faq">
            <FAQSection {...contentData.faq}/>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
