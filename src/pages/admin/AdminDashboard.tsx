import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { adminApi, courseApi } from '@/services/api';
import { BookOpen, Users, Trophy, Loader2 } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({ courses: 0, students: 0, quizAttempts: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [courses, results] = await Promise.all([
        courseApi.getCourses(),
        adminApi.getStudentResults(),
      ]);
      setStats({
        courses: courses.length,
        students: new Set(results.map(r => r.studentId)).size,
        quizAttempts: results.length,
      });
      setIsLoading(false);
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Courses', value: stats.courses, icon: BookOpen, color: 'text-primary' },
    { title: 'Active Students', value: stats.students, icon: Users, color: 'text-accent' },
    { title: 'Quiz Attempts', value: stats.quizAttempts, icon: Trophy, color: 'text-warning' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your LMS platform</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {statCards.map((stat, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
