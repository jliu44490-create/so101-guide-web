'use client'

import { useState, useRef, useEffect } from 'react'
import { Bot, Send, Sparkles, User } from 'lucide-react'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { aiResponses } from '@/lib/course-data'
import type { ChatMessage } from '@/lib/types'

const suggestedQuestions = [
  'SO101 如何校准？',
  'ACT 和 BC 有什么区别？',
  '数据采集命令怎么写？',
  '为什么训练找不到 meta/info.json？',
  '机械臂推理时抖动怎么办？'
]

function formatMessage(content: string) {
  // Simple markdown-like formatting
  return content
    .split('\n')
    .map((line, i) => {
      // Code blocks
      if (line.startsWith('```')) {
        return null
      }

      // Headers
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <h4 key={i} className="mb-2 mt-4 font-semibold first:mt-0">
            {line.replace(/\*\*/g, '')}
          </h4>
        )
      }

      // List items
      if (line.startsWith('- ') || line.startsWith('• ')) {
        return (
          <li key={i} className="ml-4 text-sm">
            {line.substring(2)}
          </li>
        )
      }

      // Numbered list
      if (/^\d+\.\s/.test(line)) {
        return (
          <li key={i} className="ml-4 text-sm">
            {line}
          </li>
        )
      }

      // Regular text
      if (line.trim()) {
        return (
          <p key={i} className="text-sm">
            {line}
          </p>
        )
      }

      return <br key={i} />
    })
    .filter(Boolean)
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是 SO101 模仿学习导师 🤖\n\n我可以帮助你解答关于 SO101 机械臂、LeRobot 框架和 ACT 模仿学习的问题。\n\n你可以问我：\n- 如何配置环境和安装依赖\n- 机械臂校准的步骤\n- 数据采集和训练的命令\n- 常见错误的解决方法\n\n请随时提问！',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const findResponse = (query: string): string => {
    const normalizedQuery = query.toLowerCase()

    for (const [key, response] of Object.entries(aiResponses)) {
      if (normalizedQuery.includes(key)) {
        return response
      }
    }

    // Generic responses
    if (normalizedQuery.includes('你好') || normalizedQuery.includes('hi') || normalizedQuery.includes('hello')) {
      return '你好！有什么关于 SO101 模仿学习的问题我可以帮助你的吗？'
    }

    if (normalizedQuery.includes('谢谢') || normalizedQuery.includes('感谢')) {
      return '不客气！如果还有其他问题，随时可以问我。祝你学习顺利！🎉'
    }

    return `感谢你的提问！关于"${query}"这个问题，我建议你：

1. 查看相关章节的详细教程
2. 使用报错诊断功能检查具体错误
3. 确保已经完成前置步骤

如果你能提供更多上下文或具体的错误信息，我可以给出更准确的建议。

你也可以尝试以下问题：
- SO101 如何校准？
- ACT 和 BC 有什么区别？
- 数据采集命令怎么写？`
  }

  const handleSend = async (messageText?: string) => {
    const text = messageText || input
    if (!text.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const response = findResponse(text)
    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsTyping(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend()
  }

  const handleSuggestionClick = (question: string) => {
    handleSend(question)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
              <Bot className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">
              <span className="gradient-text">AI 助手</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              SO101 模仿学习导师，随时为你解答问题
            </p>
          </div>

          {/* Chat Area */}
          <Card className="flex flex-1 flex-col overflow-hidden border-border/50">
            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex gap-3',
                      message.role === 'user' && 'flex-row-reverse'
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                        message.role === 'assistant'
                          ? 'bg-primary/10'
                          : 'bg-secondary'
                      )}
                    >
                      {message.role === 'assistant' ? (
                        <Bot className="h-4 w-4 text-primary" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </div>
                    <div
                      className={cn(
                        'max-w-[80%] rounded-lg px-4 py-3',
                        message.role === 'assistant'
                          ? 'bg-secondary/50'
                          : 'bg-primary text-primary-foreground'
                      )}
                    >
                      {message.role === 'assistant' ? (
                        <div className="space-y-1">{formatMessage(message.content)}</div>
                      ) : (
                        <p className="text-sm">{message.content}</p>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="rounded-lg bg-secondary/50 px-4 py-3">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="border-t border-border/50 p-4">
                <p className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Sparkles className="h-3 w-3" />
                  建议问题
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question) => (
                    <Button
                      key={question}
                      variant="outline"
                      size="sm"
                      className="h-auto whitespace-normal py-1.5 text-left text-xs"
                      onClick={() => handleSuggestionClick(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <CardContent className="border-t border-border/50 p-4">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="输入你的问题..."
                  disabled={isTyping}
                  className="flex-1"
                />
                <Button type="submit" disabled={!input.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
