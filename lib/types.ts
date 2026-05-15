export interface Chapter {
  id: number
  title: string
  titleEn: string
  description: string
  duration: string
  status: 'completed' | 'in-progress' | 'locked'
  progress: number
  objectives: string[]
  principles: string[]
  steps: Step[]
  commands: Command[]
  checkpoints: string[]
  errors: ErrorItem[]
}

export interface Step {
  title: string
  content: string
}

export interface Command {
  description: string
  code: string
}

export interface ErrorItem {
  error: string
  cause: string
  solution: string
  command?: string
}

export interface DiagnosticResult {
  error: string
  cause: string
  solution: string
  command?: string
  nextStep: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}
