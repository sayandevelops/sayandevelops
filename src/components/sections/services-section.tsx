import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { servicesData, type Service } from "@/lib/data"
import { Zap, Palette, Code, Database } from "lucide-react" // Added Database for Firebase

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  "Web Development": Zap,
  "UI/UX Design": Palette,
  "API Integration": Code,
  "Firebase Solutions": Database
};


export function ServicesSection() {
  return (
    <section id="services" className="bg-muted/30 dark:bg-muted/10">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight">Services I Offer</h2>
          <p className="text-lg text-muted-foreground mt-2">
            Helping you build outstanding digital products.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {servicesData.map((service: Service, index: number) => {
            const IconComponent = iconMap[service.title] || Zap;
            return (
              <Card key={index} className="professional-card text-center md:text-left">
                <CardHeader className="items-center md:items-start">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg mb-4 inline-block">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  )
}
