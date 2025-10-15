import { Code2, Palette, Zap, Users } from 'lucide-react';

const skills = [
  {
    icon: Code2,
    title: "Advanced Modding",
    description: "Expert-level game modifications with custom scripts, assets, and mechanics"
  },
  {
    icon: Palette,
    title: "Creative Design",
    description: "Stunning visual designs that blend aesthetics with functionality"
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Lightning-fast implementations without compromising quality"
  },
  {
    icon: Users,
    title: "Community Focus",
    description: "Building tools and experiences that resonate with users"
  }
];

export const Skills = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20" id="skills">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Our Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Combining technical prowess with creative vision to deliver exceptional results
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={index}
                className="group p-6 bg-gradient-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow animate-fade-in text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {skill.title}
                </h3>
                <p className="text-muted-foreground">
                  {skill.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
