import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { skillsData, type Skill } from "@/lib/data"
import { CheckCircle2 } from "lucide-react"

export function SkillsSection() {
  return (
    <section id="skills" className="container">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight">My Skills</h2>
        <p className="text-lg text-muted-foreground mt-2">
          A showcase of my technical capabilities and expertise.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillsData.map((skill: Skill, index: number) => (
          <Card key={index} className="professional-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{skill.name}</span>
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={skill.level} aria-label={`${skill.name} proficiency ${skill.level}%`} className="h-3" />
              <p className="text-sm text-muted-foreground mt-2 text-right">{skill.level}%</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
