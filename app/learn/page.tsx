import { Header } from '@/components/header'
import { ChapterCard } from '@/components/chapter-card'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Clock, Trophy } from 'lucide-react'
import { chapters } from '@/lib/course-data'

export default function LearnPage() {
  const completedCount = chapters.filter((c) => c.status === 'completed').length
  const inProgressCount = chapters.filter((c) => c.status === 'in-progress').length
  const totalProgress = Math.round(
    chapters.reduce((acc, c) => acc + c.progress, 0) / chapters.length
  )
  const totalDuration = chapters.reduce((acc, c) => {
    const mins = parseInt(c.duration)
    return acc + (isNaN(mins) ? 0 : mins)
  }, 0)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold sm:text-4xl">
            <span className="gradient-text">学习路径</span>
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            从基础概念到实战部署，系统学习 SO101 模仿学习
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border/50 bg-card/50">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">总课程数</p>
                <p className="text-2xl font-bold">{chapters.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <Trophy className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">已完成</p>
                <p className="text-2xl font-bold">{completedCount}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">预计时长</p>
                <p className="text-2xl font-bold">{totalDuration} 分钟</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">总体进度</p>
                <p className="text-sm font-medium">{totalProgress}%</p>
              </div>
              <Progress value={totalProgress} className="h-2" />
              <p className="mt-2 text-xs text-muted-foreground">
                {inProgressCount} 个课程进行中
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Chapters Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((chapter) => (
            <ChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>
      </main>
    </div>
  )
}
