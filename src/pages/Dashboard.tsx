import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Trophy, ArrowRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">Continue your learning journey</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="card-hover">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Browse Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Explore our catalog of courses and start learning something new today.</p>
              <Link to="/courses"><Button className="gap-2">View Courses <ArrowRight className="h-4 w-4" /></Button></Link>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-2">
                <Trophy className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>My Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">View your quiz scores and track your progress across all courses.</p>
              <Link to="/results"><Button variant="outline" className="gap-2">View Results <ArrowRight className="h-4 w-4" /></Button></Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
