import cn from 'clsx'
import NextLink from 'next/link'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'

/* ============================================
   NEXUS DESIGN SYSTEM - CARD COMPONENT
   - No rounded corners (border-radius: 0)
   - Clean 1px borders
   - Proper font hierarchy
   ============================================ */

const classes = {
  cards: cn(
    'nextra-cards nx-mt-4 nx-gap-4 nx-grid',
    'nx-not-prose' // for nextra-theme-docs
  ),
  card: cn(
    'nextra-card nx-group nx-flex nx-flex-col nx-justify-start nx-overflow-hidden',
    'nx-border nx-border-[#e5e5e5] dark:nx-border-[#2e2e2e]',
    'nx-rounded-none', // No rounded corners - matches Figma
    'nx-text-current nx-no-underline',
    'nx-transition-all nx-duration-150',
    'hover:nx-border-[#d2daea] dark:hover:nx-border-[#454545]'
  ),
  title: cn(
    'nx-flex nx-font-medium nx-items-start nx-gap-3 nx-p-5',
    'nx-text-[#0a0a0a] dark:nx-text-[#ededed]',
    'hover:nx-text-[#0a0a0a] dark:hover:nx-text-[#ededed]'
  )
}

const arrowEl = (
  <span className="nx-transition-transform nx-duration-150 group-hover:nx-translate-x-[2px] nx-text-[#737373] dark:nx-text-[#8f8f8f]">
    →
  </span>
)

export function Card({
  children,
  title,
  icon,
  image,
  arrow,
  href,
  desc,
  ...props
}: {
  children: ReactNode
  title: string
  icon: ReactNode
  image?: boolean
  arrow?: boolean
  href: string
  desc?: string
}) {
  const animatedArrow = arrow ? arrowEl : null

  if (image) {
    return (
      <NextLink
        href={href}
        className={cn(
          classes.card,
          'nx-bg-[#fffffe] dark:nx-bg-[#191919]',
          'hover:nx-bg-[#f8f8f8] dark:hover:nx-bg-[#292929]'
        )}
        {...props}
      >
        {children}
        <span className={cn(classes.title)}>
          {icon}
          <span className="nx-flex nx-gap-2 nx-items-center">
            <span className="nx-font-medium nx-text-[16px]" style={{ fontFamily: 'Inter, Geist, sans-serif' }}>
              {title}
            </span>
            {animatedArrow}
          </span>
        </span>
      </NextLink>
    )
  }

  return (
    <NextLink
      href={href}
      className={cn(
        classes.card,
        'nx-bg-[#fffffe] dark:nx-bg-[#191919]',
        'hover:nx-bg-[#f8f8f8] dark:hover:nx-bg-[#292929]'
      )}
      {...props}
    >
      <span className={cn(classes.title, 'nx-flex nx-items-start')}>
        <span className="nx-shrink-0">{icon}</span>
        <div className="nx-flex nx-flex-col nx-gap-1 nx-flex-1">
          <span
            className="nx-font-medium nx-text-[16px] nx-text-[#0a0a0a] dark:nx-text-[#ededed]"
            style={{ fontFamily: 'Inter, Geist, sans-serif' }}
          >
            {title}
          </span>
          {desc && (
            <p
              className="nx-text-[14px] nx-font-normal nx-text-[#737373] dark:nx-text-[#a1a1a1] !nx-mt-0 nx-leading-[22px]"
              style={{ fontFamily: 'Inter, Geist, sans-serif' }}
            >
              {desc}
            </p>
          )}
        </div>
        {animatedArrow}
      </span>
    </NextLink>
  )
}

function _Cards({
  children,
  num = 3,
  className,
  style,
  ...props
}: { num?: number } & ComponentProps<'div'>) {
  return (
    <div
      className={cn(classes.cards, className)}
      {...props}
      style={
        {
          ...style,
          '--rows': num
        } as CSSProperties
      }
    >
      {children}
    </div>
  )
}

export const Cards = Object.assign(_Cards, { displayName: 'Cards', Card })