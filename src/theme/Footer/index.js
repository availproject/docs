import React from 'react';
import classnames from 'classnames';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

function FooterLink({ to, href, label, ...props }) {
  const toUrl = useBaseUrl(to);
  return (
    <Link
      className="footer__link-item"
      {...(href
        ? {
            target: '_blank',
            rel: 'noopener noreferrer',
            href,
          }
        : {
            to: toUrl,
          })}
      {...props}
    >
      {label}
    </Link>
  );
}

function Footer() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const { themeConfig = {} } = siteConfig;
  const { footer } = themeConfig;

  const { copyright, links = [] } = footer || {};

  if (!footer) {
    return null;
  }

  return (
    <footer
      className={classnames('footer', {
        'footer--dark': footer.style === 'dark',
      })}
    >
      <div className="container">
        <div className="padding-bottom-huge"></div>
        <div className="row">
          {links.map((linkItem, i) => (
            <div key={i} className="col footer__col">
              {linkItem.title != null ? (
                <h4 className="footer__title">{linkItem.title}</h4>
              ) : null}
              {linkItem.items != null &&
              Array.isArray(linkItem.items) &&
              linkItem.items.length > 0 ? (
                <div className="footer__items">
                  {linkItem.items.map((item, key) =>
                    item.html ? (
                      <div
                        key={key}
                        className="footer__item"
                        dangerouslySetInnerHTML={{
                          __html: item.html,
                        }}
                      />
                    ) : (
                      <div key={item.href || item.to} className="footer__item">
                        <FooterLink {...item} />
                      </div>
                    ),
                  )}
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <div className="text--center" style={{ color: '#67666e' }}>
          Copyright © {new Date().getFullYear()} | Avail Project
        </div>
      </div>
    </footer>
  );
}

export default Footer;
