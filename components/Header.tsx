/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import headerStyle from './Header.module.css'
import { useCallback, useState } from 'react'
import { MenuOverlay } from './MenuOverlay'
import { Button } from './Button'

export interface LinkProps {
    id:number
    link:string
    label:string
    isExternal?:boolean
}

export default function Header(){
    const [overlay, setOverlay] = useState(false);
    const router = useRouter();

    const routes:LinkProps[] = [
        {
            id:1,
            link:"/",
            label:'Overview'
        },
        {
            id:2,
            link:"/",
            label:'Developers'
        },
        {
            id:3,
            link:"/",
            label:'Developers'
        },
    ]

    const overlayHandler = useCallback(() => {
        setOverlay(false);
    }, []);
    
    return (
        <>
            <header className={headerStyle.header}>
                <Link href={"/"}>
                    <img src={'/avail_logo.png'} alt='avail-logo' className={headerStyle.logo}/>
                </Link>
                <nav>
                {
                    routes.map(route => {
                        const isActiveRoute = router.pathname === route.link;
                        return <Link href={route.link} target={route.isExternal ? '_blank' : '_self'} key={route.id} className={isActiveRoute ? headerStyle.active : ''}>{route.label}</Link>
                    })
                }
                </nav>
                <Link href={"/docs"}>
                <Button text={'go/docs'} className={'background_button'}/>
                </Link>
                <img src={'/hamburger.png'} alt='hambarger nav' width="32px" height="28px" onClick={() => setOverlay(true)} className={headerStyle.nav_hamburger}/>
            </header>
            {overlay && <MenuOverlay routes={routes} overlayHandler={overlayHandler}/>}
        </>
    )
}