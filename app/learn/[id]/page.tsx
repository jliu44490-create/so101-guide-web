import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Lightbulb,
  ListChecks,
  Target,
  Terminal
} from 'lucide-react'
import { Header } from '@/components/header'
import { CodeBlock } from '@/components/code-block'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { chapters } from '@/lib/course-data'

interface ChapterPageProps {
  params: Promise<{ id: string }>
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { id } = await params
  const chapterId = parseInt(id)
  const chapter = chapters.find((c) => c.id === chapterId)

  if (!chapter) {
    notFound()
  }

  const prevChapter = chapters.find((c) => c.id === chapterId - 1)
  const nextChapter = chapters.find((c) => c.id === chapterId + 1)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/learn"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            返回学习路径
          </Link>
        </div>

        {/* Chapter Header */}
        <div className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Chapter {chapter.id}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {chapter.duration}
            </div>
          </div>
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">{chapter.title}</h1>
          <p className="text-lg text-muted-foreground">{chapter.description}</p>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">学习进度</span>
              <span className="font-medium">{chapter.progress}%</span>
            </div>
            <Progress value={chapter.progress} className="h-2" />
          </div>
        </div>

        <div className="space-y-8">
          {/* Learning Objectives */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-primary" />
                学习目标
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {chapter.objectives.map((obj, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    <span className="text-sm">{obj}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Principles */}
          {chapter.principles.length > 0 && (
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  原理解释
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {chapter.principles.map((principle, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">
                        {index + 1}
                      </span>
                      <span className="text-sm">{principle}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Steps */}
          {chapter.steps.length > 0 && (
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ListChecks className="h-5 w-5 text-primary" />
                  操作步骤
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {chapter.steps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
                          {index + 1}
                        </div>
                        {index < chapter.steps.length - 1 && (
                          <div className="mt-2 h-full w-px bg-border" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="font-semibold">{step.title}</h4>
                        <p className="mt-1 text-sm text-muted-foreground">{step.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Commands */}
          {chapter.commands.length > 0 && (
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Terminal className="h-5 w-5 text-green-500" />
                  命令代码
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {chapter.commands.map((cmd, index) => (
                  <CodeBlock
                    key={index}
                    code={cmd.code}
                    description={cmd.description}
                  />
                ))}
              </CardContent>
            </Card>
          )}

          {/* Checkpoints */}
          {chapter.checkpoints.length > 0 && (
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  检查点
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {chapter.checkpoints.map((checkpoint, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm">{checkpoint}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Common Errors */}
          {chapter.errors.length > 0 && (
            <Card className="border-destructive/30">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  常见错误
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {chapter.errors.map((error, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-destructive/20 bg-destructive/5 p-4"
                  >
                    <p className="font-mono text-sm font-medium text-destructive">
                      {error.error}
                    </p>
                    <Separator className="my-3 bg-destructive/20" />
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">原因：</span>
                        <span className="text-muted-foreground">{error.cause}</span>
                      </p>
                      <p>
                        <span className="font-medium">解决：</span>
                        <span className="text-muted-foreground">{error.solution}</span>
                      </p>
                      {error.command && (
                        <CodeBlock code={error.command} className="mt-3" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between gap-4">
          {prevChapter ? (
            <Button asChild variant="outline">
              <Link href={`/learn/${prevChapter.id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">上一章：{prevChapter.title}</span>
                <span className="sm:hidden">上一章</span>
              </Link>
            </Button>
          ) : (
            <div />
          )}
          {nextChapter ? (
            <Button asChild>
              <Link href={`/learn/${nextChapter.id}`}>
                <span className="hidden sm:inline">下一章：{nextChapter.title}</span>
                <span className="sm:hidden">下一章</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/learn">
                返回课程列表
              </Link>
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}

export function generateStaticParams() {
  return chapters.map((chapter) => ({
    id: chapter.id.toString()
  }))
}
