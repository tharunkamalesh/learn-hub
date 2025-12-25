import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { courseApi } from '@/services/api';
import { Course } from '@/types';
import { BookOpen, Clock, Users, Star, ArrowRight, Loader2 } from 'lucide-react';

const Courses: React.FC = () => {
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

  const levelColors = {
    Beginner: 'bg-success/10 text-success',
    Intermediate: 'bg-warning/10 text-warning',
    Advanced: 'bg-destructive/10 text-destructive',
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">All Courses</h1>
          <p className="text-muted-foreground">Explore our comprehensive course catalog</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden card-hover border">
                <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={levelColors[course.level]}>{course.level}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground ml-auto">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      {course.rating}
                    </div>
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{course.duration}</span>
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" />{course.enrolledCount}</span>
                  </div>
                  <Link to={`/courses/${course.id}`}>
                    <Button className="w-full gap-2">View Course <ArrowRight className="h-4 w-4" /></Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Courses;
