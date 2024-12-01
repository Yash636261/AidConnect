'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface ScrollLinkProps {
    href: string
    children: React.ReactNode
    className?: string
}

export default function ScrollLink({ href, children, className }: ScrollLinkProps) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        const targetId = href.replace('#', '')
        const elem = document.getElementById(targetId)
        elem?.scrollIntoView({
            behavior: 'smooth'
        })
        // Update URL without page reload
        window.history.pushState({}, '', href)
    }

    if (isClient) {
        return (
            <a href={href} onClick={handleClick} className={className}>
                {children}
            </a>
        )
    }

    return <Link href={href} className={className}>{children}</Link>
}

