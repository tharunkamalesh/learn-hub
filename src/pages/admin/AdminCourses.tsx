import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { courseApi } from '@/services/api';
import { Course } from '@/types';
import { Clock, Users, Loader2 } from 'lucide-react';

const AdminCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await courseApi.getCourses();
      setCourses(data);
      setIsLoading(false);
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold mb-2">Manage Courses</h1>
            <p className="text-muted-foreground">Create and manage course content</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : (
          <div className="space-y-4">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <img src={course.thumbnail} alt={course.title} className="w-24 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{course.title}</h3>
                        <Badge variant="outline">{course.level}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">{course.description}</p>
                      <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration}</span>
                        <span className="flex items-center gap-1"><Users className="h-3 w-3" />{course.enrolledCount}</span>
                      </div>
                    </div>
                    <Link to={`/courses/${course.id}`}><Button variant="outline" size="sm">View</Button></Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminCourses;
