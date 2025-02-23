"use client";

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useMobileView } from '../../hooks/useMobileView'
import { useMemo } from 'react'
import footerStyle from './Footer.module.css'
import { ROUTES } from '../../utils/constant'

interface SubLinkTypes {
    id:number
    label:string
    inActive?:boolean
    isInternal?:boolean
    link:string
}

interface FooterLinkTypes {
    id:number
    label:string
    inActive?:boolean
    subLinks:SubLinkTypes[]
}

export const Footer = () => {
    const isMobile = useMobileView();

    const footerLinks:FooterLinkTypes[] = [
        {
            id:1,
            label:'Platform',
            inActive:true,
            subLinks:[
                {
                    id:1,
                    label:'Overview',
                    link:ROUTES.HOMEPAGE
                },
                {
                    id:2,
                    label:'Sovereign Rollups',
                    link:ROUTES.HOMEPAGE
                },
                {
                    id:3,
                    label:'How It works',
                    link:ROUTES.HOMEPAGE
                }
            ]
        },
        {
            id:3,
            label:'Data Availability Resources',
            subLinks:[
                {
                    id:1,
                    label:'The Data Availability Problem',
                    link:'https://blog.availproject.org/the-data-availability-problem/'
                },
                {
                    id:2,
                    label:'What is Avail?',
                    link:'https://blog.availproject.org/introducing-avail-by-a-robust-general-purpose-scalable-data-availability-layer/'
                },
                {
                    id:3,
                    label:'Data Attestation Bridge',
                    link:'https://blog.availproject.org/data-attestation-bridge/'
                },
                {
                    id:4,
                    label:'Ability to Scale',
                    link:'https://blog.availproject.org/abilitytoscalepart3/'
                },
                {
                    id:5,
                    label:'Reference Document',
                    link:'https://github.com/availproject/data-availability/blob/93c547ce4efce3e992b573179a8d22b3657fdcee/reference%20document/Avail%20Reference%20Paper%20v2.1%206%20Nov%202024.pdf'
                },
            ]
        },
        {
            id:4,
            label:'Node Repositories',
            subLinks:[
                {
                    id:1,
                    label:'Light Client',
                    link:'https://github.com/availproject/avail-light'
                },
                {
                    id:2,
                    label:'Full Node',
                    link:'https://github.com/availproject/avail'
                },
            ]
        },
        {
            id:2,
            label:'Network Guides',
            subLinks:[
                {
                    id:1,
                    label:'Node Guide',
                    isInternal:true,
                    link:ROUTES.TYPES_OF_NODES
                },
                {
                    id:2,
                    label:'Validator Guide',
                    isInternal:true,
                    link:ROUTES.BECOME_VALIDATOR
                }
            ]
        },
        {
            id:5,
            label:'Company',
            subLinks:[
                {
                    id:2,
                    label:'Team',
                    inActive:true,
                    link:ROUTES.DEVELOPERS
                },
                {
                    id:3,
                    label:'Careers',
                    link:ROUTES.CAREERS
                },
                {
                    id:4,
                    label:'Partners',
                    inActive:true,
                    link:ROUTES.HOMEPAGE
                },
                {
                    id:5,
                    label:'Community',
                    link:ROUTES.COMMUNITY
                },
                {
                    id:6,
                    label:'Privacy Policy',
                    isInternal:true,
                    link:'https://avail-project.notion.site/Privacy-Policy-e5f47df2f3a64055a7966bbaabe9a2eb'
                },
                {
                    id:7,
                    label:'Terms',
                    isInternal:true,
                    link:"https://avail-project.notion.site/"
                },
                {
                    id:8,
                    label:'Forum',
                    isInternal:true,
                    link:"https://forum.availproject.org/"
                }
            ]
        },
    ]

    const footerMobile = useMemo(() => {
        if (isMobile){
            return {
                front:"/mobile/footer_front.png')",
                back:'/mobile/footer_back.png'
            }
        }
        return {
            front:'/desktop/footer_front.png',
            back:"/desktop/footer_back.png"
        }
    }, [isMobile]);

    return (
        <footer className={footerStyle.footer_container}>
            <img src={footerMobile.back} width={'100%'} alt={'Footer Back Design'}/>
            <div className={footerStyle.footer}>
                <div>
                    <img src={"/avail_logo.png"} width={'112px'} alt='avail logo'/>
                    <p>The essential base layer for modern blockchains.</p>
                    <div>
                        <Link href={ROUTES.DISCORD} target='_blank' aria-label='dicord'>
                            <img src={"/discord_icon.png"} width={'18px'} height={'14px'} alt='dicord' />
                        </Link>
                        <Link href={ROUTES.GITHUB} target='_blank' aria-label='github'>
                            <img src={"/github_icon.png"} width={'16px'} height={'18px'} alt='github' />
                        </Link>
                        <Link href={ROUTES.TWITTER} target='_blank' aria-label='twitter'>
                            <img src={"/twitter_icon.png"} width={'18px'} height={'15px'} alt='twitter' />
                        </Link>
                        <Link href={ROUTES.LINKEDIN} target='_blank' aria-label='linkedin'>
                            <img src={"/linkedin_icon.png"} width={'17px'} height={'16px'} alt='linkedin' />
                        </Link>
                    </div>
                </div>
                <div className={footerStyle.footer_links}>
                {
                    footerLinks.filter((ele:FooterLinkTypes) => !ele.inActive).map((data:FooterLinkTypes) => {
                        return (
                            <div key={data.id} className={footerStyle.footer_main}>
                                <div>{data.label}</div>
                                {
                                    data.subLinks.filter((ele:SubLinkTypes) => !ele.inActive).map((link:SubLinkTypes) => {
                                        return (
                                            <Link href={link.link} key={link.id} target={link.isInternal ? '_self' : '_blank'}>{link.label}</Link>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </footer>
    )
}