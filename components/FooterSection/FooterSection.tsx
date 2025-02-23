/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import FooterIcon from '../../assets/images/desktop/grow.png';

import footersection from './FooterSection.module.css'
import { FC } from 'react';
import { Button } from '../Button';

interface FooterSectionProps {
    title:string
    description:string
}

export const FooterSection:FC<FooterSectionProps> = ({ title, description }) => {
    return (
        <div className={footersection.footer_section}>
            <img src={FooterIcon.src} alt='avail logo'/>
            <div>{title}</div>
            <div className={footersection.desc}>{description}</div>
           
                <div className={footersection.footer_section_button}>
                    <Link href={'/'} target='_blank'>
                        <Button text={'See documentation'} className="background_button"/>
                    </Link>
                    <Link href={"/"} target='_blank'>
                        <Button text={'Try it now'} className={'white_background_button'}/>
                    </Link>
                </div>
           
        </div>
    )
}