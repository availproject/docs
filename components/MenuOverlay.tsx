/* eslint-disable @next/next/no-img-element */
import { FC, useEffect } from 'react'
import menuOverlayStyle from './MenuOverlay.module.css'
import Link from 'next/link'
import { LinkProps } from './Header'

interface MenuOverlayProps {
    routes:LinkProps[]
    overlayHandler:() => void
}

export const MenuOverlay:FC<MenuOverlayProps> = ({routes, overlayHandler}) => {

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    return (
        <div className={menuOverlayStyle.overlay}>
            <div className={menuOverlayStyle.close}>
                <img src={"/avail_logo_new.png"} alt="avail logo" />
                <img src={"/hamburger.png"} alt="close navbar" onClick={overlayHandler}/>
            </div>
            <ul>
                {
                    routes.map(route => (
                        <Link href={route.link} key={route.id} onClick={overlayHandler}><li>{route.label}</li></Link>
                    ))
                }
            </ul>
            <div className={menuOverlayStyle.external}>
                <Link href={'/'} target="_blank">
                    <button className="background_button"/>
                </Link>
                <Link href={'/'} target="_blank">
                    Try it out (Testnet)
                </Link>
            </div>
        </div>
    )
}