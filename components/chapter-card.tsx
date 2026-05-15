import Link from 'next/link'
import { CheckCircle, Clock, Lock, Play } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Chapter } from '@/lib/types'

interface ChapterCardProps {
  chapter: Chapter
}

export function ChapterCard({ chapter }: ChapterCardProps) {
  const statusConfig = {
    completed: {
      icon: CheckCircle,
      label: '已完成',
      className: 'bg-green-500/10 text-green-500 border-green-500/20'
    },
    'in-progress': {
      icon: Play,
      label: '进行中',
      className: 'bg-primary/10 text-primary border-primary/20'
    },
    locked: {
      icon: Lock,
      label: '未解锁',
      className: 'bg-muted text-muted-foreground border-border'
    }
  }

  const status = statusConfig[chapter.status]
  const StatusIcon = status.icon
  const isLocked = chapter.status === 'locked'

  return (
    <Link
      href={isLocked ? '#' : `/learn/${chapter.id}`}
      className={cn('block transition-transform hover:scale-[1.02]', isLocked && 'cursor-not-allowed')}
    >
      <Card
        className={cn(
          'h-full transition-all duration-200',
          isLocked ? 'opacity-60' : 'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5'
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <Badge variant="outline" className={cn('text-xs', status.className)}>
              <StatusIcon className="mr-1 h-3 w-3" />
              {status.label}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {chapter.duration}
            </div>
          </div>
          <CardTitle className="mt-2 text-lg leading-tight">
            <span className="gradient-text">Chapter {chapter.id}:</span>{' '}
            {chapter.title}
          </CardTitle>
          <CardDescription className="text-sm">{chapter.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>学习进度</span>
              <span>{chapter.progress}%</span>
            </div>
            <Progress value={chapter.progress} className="h-1.5" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
