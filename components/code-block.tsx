'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  language?: string
  description?: string
  className?: string
}

export function CodeBlock({ code, language = 'bash', description, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn('group relative', className)}>
      {description && (
        <p className="mb-2 text-sm text-muted-foreground">{description}</p>
      )}
      <div className="relative overflow-hidden rounded-lg border border-border bg-[oklch(0.12_0.01_270)]">
        <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-4 py-2">
          <span className="text-xs font-medium text-muted-foreground">{language}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={copyToClipboard}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>
        <pre className="overflow-x-auto p-4">
          <code className="font-mono text-sm text-foreground/90">{code}</code>
        </pre>
      </div>
    </div>
  )
}
