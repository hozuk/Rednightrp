'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { SERVER } from '@/lib/server-config'

export function CopyIp() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SERVER.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={handleCopy}
        className="group flex items-center justify-between gap-4 border border-primary/50 bg-card px-4 py-3 transition-colors hover:border-primary"
        aria-label={`Скопировать IP адрес ${SERVER.address}`}
      >
        <span className="font-mono text-sm text-primary sm:text-base">connect {SERVER.address}</span>
        {copied ? (
          <Check className="size-4 text-success" aria-hidden="true" />
        ) : (
          <Copy className="size-4 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
        )}
      </button>
      <a
        href={SERVER.connectUrl}
        className="flex items-center justify-center bg-primary px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
      >
        Подключиться
      </a>
    </div>
  )
}
