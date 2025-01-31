'use client'

import { useEffect, useState } from "react"

export const useMobileView = () => {
    const [mobile, setMobile] = useState<boolean>(false);

    useEffect(() => {
        if (screen.availWidth <= 768) {
            setMobile(true);
        }
    }, [])

    return mobile;
}