import { Mail, Github, Twitter, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:contact@mrsmilemodders.com" }
];

export const Contact = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-t from-background to-muted/20" id="contact">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-8 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Let's Create Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? We're always excited to work on innovative ideas.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-8">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  className="group hover:border-primary hover:text-primary transition-all animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  asChild
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <Icon className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    {link.label}
                  </a>
                </Button>
              );
            })}
          </div>

          <div className="pt-12 border-t border-border mt-12">
            <p className="text-muted-foreground">
              © 2024 Mr Smile Modders ™. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
