'use client'

import { useState } from 'react'
import { AlertTriangle, ArrowRight, CheckCircle, Search, Terminal, Zap } from 'lucide-react'
import { Header } from '@/components/header'
import { CodeBlock } from '@/components/code-block'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { errorDatabase } from '@/lib/course-data'
import type { DiagnosticResult } from '@/lib/types'

const commonErrors = [
  'Missing required field(s) port',
  'FileNotFoundError meta/info.json',
  'CUDA out of memory',
  'Permission denied',
  'ModuleNotFoundError',
  '机械臂抖动'
]

export default function DiagnosePage() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<DiagnosticResult | null>(null)
  const [searched, setSearched] = useState(false)

  const handleSearch = (searchQuery: string) => {
    setSearched(true)
    const normalizedQuery = searchQuery.toLowerCase().trim()

    // Search in error database
    for (const [key, value] of Object.entries(errorDatabase)) {
      if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
        setResult(value)
        return
      }
    }

    // No match found
    setResult(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      handleSearch(query)
    }
  }

  const handleQuickSearch = (error: string) => {
    setQuery(error)
    handleSearch(error)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
            <Zap className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">
            <span className="gradient-text">报错诊断</span>
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            输入错误信息，快速获取解决方案
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8 border-border/50">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="输入错误信息，例如：CUDA out of memory"
                  className="pl-10"
                />
              </div>
              <Button type="submit">
                诊断
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Search Tags */}
        <div className="mb-8">
          <p className="mb-3 text-sm text-muted-foreground">常见错误快速诊断：</p>
          <div className="flex flex-wrap gap-2">
            {commonErrors.map((error) => (
              <Badge
                key={error}
                variant="outline"
                className="cursor-pointer transition-colors hover:bg-secondary"
                onClick={() => handleQuickSearch(error)}
              >
                {error}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results */}
        {searched && (
          <div className="space-y-6">
            {result ? (
              <>
                {/* Error Found */}
                <Card className="border-destructive/30">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">错误识别</CardTitle>
                        <CardDescription className="mt-1 font-mono text-destructive">
                          {result.error}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Search className="h-5 w-5 text-primary" />
                      错误原因
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{result.cause}</p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      解决方法
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="whitespace-pre-wrap text-muted-foreground">{result.solution}</p>
                    {result.command && (
                      <CodeBlock code={result.command} description="推荐命令" />
                    )}
                  </CardContent>
                </Card>

                <Card className="border-primary/30 bg-primary/5">
                  <CardContent className="flex items-start gap-3 p-6">
                    <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium">下一步检查</p>
                      <p className="mt-1 text-sm text-muted-foreground">{result.nextStep}</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              /* No Match Found */
              <Card className="border-border/50">
                <CardContent className="py-12 text-center">
                  <Terminal className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 font-semibold">未找到匹配的错误</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    请尝试使用不同的关键词，或者
                    <a href="/assistant" className="ml-1 text-primary hover:underline">
                      询问 AI 助手
                    </a>
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Tips Section */}
        {!searched && (
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">诊断技巧</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>复制完整的错误信息可以提高诊断准确率</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>关键错误类型包括：环境配置、端口识别、数据格式、显存溢出</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>如果找不到匹配结果，可以尝试提取错误信息中的关键词</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>遇到复杂问题可以询问 AI 助手获取个性化帮助</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
