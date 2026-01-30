'use client'

import { useEffect, useRef } from 'react'
import { useAccount, useChainId } from 'wagmi'
import { usePathname } from 'next/navigation'
import {
  identifyUser,
  resetUser,
  setSuperProperties,
  unsetSuperProperties,
  track,
  POSTHOG_KEY,
} from '@/lib/analytics/posthog'
import { getItem } from '@/lib/local-storage'
import { NETWORK_KEY } from '@/providers/Web3Provider'

/**
 * Hash a wallet address using SHA-256 for privacy-preserving identification
 * This allows tracking unique users without storing actual wallet addresses
 */
async function hashWalletAddress(address: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(address.toLowerCase())
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return `wallet_${hashHex.slice(0, 16)}` // Use first 16 chars for shorter ID
}

/**
 * Hook for identifying users in PostHog based on wallet connection
 * - Identifies user with hashed wallet address (privacy-preserving)
 * - Resets identity when wallet is disconnected
 * - Tracks connection/disconnection events
 */
export function usePostHogIdentify() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const pathname = usePathname()
  const wasConnected = useRef(false)
  const previousAddress = useRef<string | null>(null)

  useEffect(() => {
    if (!POSTHOG_KEY) return

    // Get the Nexus network from localStorage
    const nexusNetwork = getItem(NETWORK_KEY) as string | null

    if (isConnected && address) {
      // User connected or address changed
      if (!wasConnected.current || previousAddress.current !== address) {
        // Hash the wallet address for privacy-preserving identification
        hashWalletAddress(address).then((hashedId) => {
          // Identify user with hashed ID (no raw wallet address stored)
          identifyUser(hashedId, {
            chain_id: chainId,
            nexus_network: nexusNetwork,
          })

          // Set super properties for all future events
          setSuperProperties({
            wallet_connected: true,
            connected_chain_id: chainId,
            nexus_network: nexusNetwork,
          })

          // Track connection event (no wallet address)
          track('wallet_connected', {
            chain_id: chainId,
            network_name: getChainName(chainId),
            page_path: pathname,
          })
        })

        wasConnected.current = true
        previousAddress.current = address
      }
    } else if (wasConnected.current) {
      // User disconnected
      track('wallet_disconnected', {
        page_path: pathname,
      })

      // Unset super properties
      unsetSuperProperties([
        'wallet_connected',
        'connected_chain_id',
        'nexus_network',
      ])

      // Reset PostHog identity
      resetUser()

      wasConnected.current = false
      previousAddress.current = null
    }
  }, [isConnected, address, chainId, pathname])

  // Update chain ID super property when it changes
  useEffect(() => {
    if (!POSTHOG_KEY) return

    if (isConnected && chainId) {
      setSuperProperties({
        connected_chain_id: chainId,
      })
    }
  }, [chainId, isConnected])
}

/**
 * Helper to get chain name from chain ID
 */
function getChainName(chainId: number): string {
  const chainNames: Record<number, string> = {
    1: 'Ethereum Mainnet',
    10: 'Optimism',
    56: 'BNB Smart Chain',
    137: 'Polygon',
    8217: 'Kaia',
    42161: 'Arbitrum One',
    43114: 'Avalanche C-Chain',
    8453: 'Base',
    534352: 'Scroll',
    999: 'HyperEVM',
    50104: 'Sophon',
    143: 'Monad',
    11155111: 'Sepolia',
    84532: 'Base Sepolia',
    421614: 'Arbitrum Sepolia',
    11155420: 'Optimism Sepolia',
    80002: 'Polygon Amoy',
    10143: 'Monad Testnet',
  }

  return chainNames[chainId] || `Chain ${chainId}`
}
