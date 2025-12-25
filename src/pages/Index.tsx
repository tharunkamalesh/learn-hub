import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, BookOpen, Trophy, Users, ArrowRight } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold">LearnHub</span>
          </div>
          <div className="flex gap-3">
            <Link to="/auth"><Button variant="ghost">Sign In</Button></Link>
            <Link to="/auth"><Button>Get Started</Button></Link>
          </div>
        </nav>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Master New Skills with <span className="text-primary">LearnHub</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Access world-class courses, interactive quizzes, and track your progress. Start your learning journey today.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="gap-2">
                  Start Learning <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline">Browse Courses</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: 'Quality Courses', desc: 'Expert-led courses across multiple disciplines' },
              { icon: Trophy, title: 'Interactive Quizzes', desc: 'Test your knowledge with MCQ assessments' },
              { icon: Users, title: 'Track Progress', desc: 'Monitor your learning journey and scores' },
            ].map((feature, i) => (
              <div key={i} className="bg-card p-6 rounded-xl border card-hover text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>Demo credentials: student@example.com or admin@example.com (any password)</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
