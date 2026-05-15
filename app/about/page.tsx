import Link from 'next/link'
import {
  Bot,
  Brain,
  ChevronRight,
  Code,
  Cpu,
  ExternalLink,
  Github,
  Lightbulb,
  Rocket,
  Target,
  Users,
  Zap
} from 'lucide-react'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const features = [
  {
    icon: Target,
    title: '降低入门门槛',
    description: '将复杂的模仿学习流程拆解为清晰的学习路径，让初学者能够快速上手'
  },
  {
    icon: Code,
    title: '实战代码指南',
    description: '提供完整的命令示例和代码片段，可以直接复制使用'
  },
  {
    icon: Zap,
    title: '报错快速诊断',
    description: '收集常见错误及解决方案，帮助快速定位和解决问题'
  },
  {
    icon: Bot,
    title: 'AI 助手支持',
    description: '智能问答系统，随时解答学习过程中的疑问'
  }
]

const techStack = [
  { name: 'Next.js', description: 'React 框架' },
  { name: 'TypeScript', description: '类型安全' },
  { name: 'Tailwind CSS', description: '样式系统' },
  { name: 'shadcn/ui', description: 'UI 组件' },
  { name: 'LeRobot', description: '机器人学习框架' },
  { name: 'ACT', description: '模仿学习算法' }
]

const timeline = [
  { phase: '第一阶段', title: '基础知识', items: ['模仿学习概念', 'SO101 硬件认识', 'LeRobot 环境配置'] },
  { phase: '第二阶段', title: '实操训练', items: ['机械臂校准', '遥操作采集', '数据集管理'] },
  { phase: '第三阶段', title: '进阶部署', items: ['ACT 模型训练', '真实机械臂部署', '调试优化'] }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/40">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -right-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-accent/5 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="outline" className="mb-4 bg-primary/10 text-primary">
                关于项目
              </Badge>
              <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                <span className="gradient-text">SO101 模仿学习指南</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
                一个帮助初学者快速入门具身智能的学习平台，从零开始掌握 SO101 机械臂的模仿学习技术
              </p>
            </div>
          </div>
        </section>

        {/* Project Value */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">项目价值</h2>
            <p className="mt-3 text-muted-foreground">为什么选择这个学习平台</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <Card key={feature.title} className="border-border/50 bg-card/50">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Learning Timeline */}
        <section className="border-y border-border/40 bg-card/30">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">学习路线</h2>
              <p className="mt-3 text-muted-foreground">系统化的学习进阶路径</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {timeline.map((phase, index) => (
                <Card key={phase.phase} className="relative border-border/50 bg-card/50">
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-lg font-bold text-white">
                      {index + 1}
                    </div>
                    <CardTitle className="text-lg">{phase.phase}</CardTitle>
                    <CardDescription>{phase.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">技术栈</h2>
            <p className="mt-3 text-muted-foreground">构建这个平台所使用的技术</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <Card key={tech.name} className="border-border/50 bg-card/50">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="h-8 w-8 rounded-lg bg-secondary" />
                  <div>
                    <p className="font-medium">{tech.name}</p>
                    <p className="text-xs text-muted-foreground">{tech.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Target Audience */}
        <section className="border-y border-border/40 bg-card/30">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <Badge variant="outline" className="mb-4">
                  <Users className="mr-1 h-3 w-3" />
                  目标用户
                </Badge>
                <h2 className="text-2xl font-bold sm:text-3xl">适合谁学习？</h2>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Lightbulb className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">机器人爱好者</p>
                      <p className="text-sm text-muted-foreground">
                        对机械臂和机器人学习感兴趣，想要动手实践
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Brain className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">AI/ML 研究者</p>
                      <p className="text-sm text-muted-foreground">
                        希望在具身智能领域进行研究和实验
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Cpu className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">嵌入式开发者</p>
                      <p className="text-sm text-muted-foreground">
                        想要将 AI 技术应用到实际硬件项目中
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Rocket className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">学生和初学者</p>
                      <p className="text-sm text-muted-foreground">
                        正在学习机器学习，想要通过实际项目加深理解
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <Card className="overflow-hidden border-border/50">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-background">
                        <Github className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold">开源项目</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        基于 LeRobot 等开源框架构建
                      </p>
                      <Button asChild className="mt-6">
                        <a
                          href="https://github.com/huggingface/lerobot"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          查看 LeRobot
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-8 text-center sm:p-12">
              <h2 className="text-2xl font-bold sm:text-3xl">开始你的学习之旅</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                从第一章开始，跟随指南一步步完成 SO101 机械臂的模仿学习
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg">
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
            </CardContent>
          </Card>
        </section>
      </main>

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
