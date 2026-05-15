import Link from 'next/link'
import {
  Bot,
  Brain,
  ChevronRight,
  Cpu,
  Database,
  HelpCircle,
  Rocket,
  Settings,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/header'

const learningPath = [
  { icon: Settings, title: '环境配置', description: 'Python 环境与 LeRobot 安装' },
  { icon: Cpu, title: '机械臂校准', description: '硬件连接与零点校准' },
  { icon: Database, title: '数据采集', description: '遥操作与数据录制' },
  { icon: Brain, title: 'ACT 训练', description: '模仿学习模型训练' },
  { icon: Rocket, title: '模型部署', description: '真实机械臂推理' },
  { icon: HelpCircle, title: '常见问题', description: '报错诊断与解决' }
]

const features = [
  {
    icon: Bot,
    title: 'SO101 机械臂',
    description: '开源低成本机械臂，适合学习和研究'
  },
  {
    icon: Brain,
    title: 'ACT 模仿学习',
    description: 'Action Chunking Transformer 算法'
  },
  {
    icon: Sparkles,
    title: 'LeRobot 框架',
    description: 'Hugging Face 开源机器人学习框架'
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -right-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">具身智能实战学习平台</span>
            </div>

            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="gradient-text">SO101</span> Imitation Learning
              <br />
              <span className="text-foreground">Guide</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
              从环境配置到 ACT 模型部署的完整学习路线，帮助你快速掌握机械臂模仿学习的核心技能
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="glow-primary">
                <Link href="/learn">
                  开始学习
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/assistant">
                  <Bot className="mr-2 h-4 w-4" />
                  询问 AI 助手
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border/40 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">学习路线</h2>
          <p className="mt-3 text-muted-foreground">循序渐进的学习路径，从零开始掌握模仿学习</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {learningPath.map((item, index) => (
            <Card
              key={item.title}
              className="group relative overflow-hidden border-border/50 bg-card/50 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-lg font-bold text-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <item.icon className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </CardContent>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/learn">
              查看完整课程
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-8 text-center sm:p-12">
              <h2 className="text-2xl font-bold sm:text-3xl">准备好开始了吗？</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                从第一章开始，跟随我们的指南一步步完成 SO101 机械臂的模仿学习之旅
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/learn">立即开始</Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href="/diagnose">遇到问题？</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <span className="font-semibold">SO101 Imitation Learning Guide</span>
            </div>
            <p className="text-sm text-muted-foreground">
              具身智能学习平台 · 2024
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
