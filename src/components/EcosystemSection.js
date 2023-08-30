import * as React from "react";
import {HeadSection} from "./HeadSection";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export const EcosystemSection = (props) => {
  const {
    tabs = [],
    head = {}
  } = props;

  return (
    <>
      <HeadSection {...head}/>
      <div className="tabs-container col">
        <Tabs>
          {
            tabs.map(({name, contentText, contentList, contentListTitle, link, details}, idx) => {
              return (
                <TabItem key={idx} value={idx} label={name}>
                  <div className="tab-content">
                    <div className="col-md-6 text">
                      <p className="lead grey-text">{contentText}</p>
                      {
                        contentListTitle &&
                        <div className="grey-text">Products used:</div>
                      }
                      {
                        contentList && contentList.length &&
                        <ul className="dot-list grey-text">
                          {
                            contentList.map((item, idx) => (<li key={idx}>{item}</li>))
                          }
                        </ul>
                      }
                      {
                        details && details.length &&
                        <div className="network-details">
                          {
                            details.map((detail, detailIdx) => (
                              <div key={detailIdx} className="network-detail-item">
                                <h4 className="network-title">{detail.networkName}</h4>
                                <ul className="network-info-list">
                                  <li>Explorer: <a href={detail.explorer} className="network-link">{detail.explorer}</a></li>
                                  <li>RPC Endpoint: <a href={detail.rpcEndpoint} className="network-link">{detail.rpcEndpoint}</a></li>
                                  <li>WS Endpoint: <a href={detail.wsEndpoint} className="network-link">{detail.wsEndpoint}</a></li>
                                  <li>Chain Spec: {detail.chainSpec ? <a href={detail.chainSpec.link} className="network-link">{detail.chainSpec.text}</a> : 'N/A'}</li>
                                  <li>Chain Info: {detail.chainInfo ? <a href={detail.chainInfo.link} className="network-link">{detail.chainInfo.text}</a> : 'N/A'}</li>
                                  <li>Node Version: {detail.nodeVersion ? <a href={detail.nodeVersion.link} className="network-link">{detail.nodeVersion.text}</a> : 'N/A'}</li>
                                  <li>Light Client Version: {detail.lightClientVersion ? <a href={detail.lightClientVersion.link} className="network-link">{detail.lightClientVersion.text}</a> : 'N/A'}</li>
                                </ul>
                              </div>
                            ))
                          }
                        </div>
                      }
                    </div>
                    <div className="col-md-6 youtube-wrapper">
                      {
                        link && <iframe
                          src={link}
                          title="YouTube video player" frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen></iframe>
                      }
                    </div>
                  </div>
                </TabItem>
              );
            })
          }
        </Tabs>
      </div>
    </>
  );
}
