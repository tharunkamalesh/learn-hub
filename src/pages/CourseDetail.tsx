import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { courseApi } from '@/services/api';
import { Course, Quiz } from '@/types';
import { Clock, Users, Star, Download, FileText, Play, BookOpen, Loader2 } from 'lucide-react';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const [courseData, quizData] = await Promise.all([
        courseApi.getCourseById(id),
        courseApi.getCourseQuiz(id),
      ]);
      setCourse(courseData);
      setQuiz(quizData);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Link to="/courses"><Button>Back to Courses</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <img src={course.thumbnail} alt={course.title} className="w-full h-64 object-cover rounded-xl" />
            <div>
              <Badge className="mb-3">{course.level}</Badge>
              <h1 className="text-3xl font-display font-bold mb-4">{course.title}</h1>
              <p className="text-muted-foreground mb-4">{course.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{course.duration}</span>
                <span className="flex items-center gap-1"><Users className="h-4 w-4" />{course.enrolledCount} enrolled</span>
                <span className="flex items-center gap-1"><Star className="h-4 w-4 text-warning" />{course.rating}</span>
              </div>
            </div>

            {course.modules.length > 0 && (
              <Card>
                <CardHeader><CardTitle>Course Content</CardTitle></CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {course.modules.map((module) => (
                      <AccordionItem key={module.id} value={module.id}>
                        <AccordionTrigger>{module.title}</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {module.lessons.map((lesson) => (
                              <div key={lesson.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary">
                                <div className="flex items-center gap-3">
                                  {lesson.type === 'video' ? <Play className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                                  <span className="text-sm">{lesson.title}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            {quiz && (
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" />Take Quiz</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{quiz.title} • {quiz.questions.length} questions • {quiz.timeLimit} min</p>
                  <Link to={`/quiz/${quiz.id}`}><Button className="w-full">Start Quiz</Button></Link>
                </CardContent>
              </Card>
            )}

            {course.materials.length > 0 && (
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Download className="h-5 w-5" />Materials</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {course.materials.map((mat) => (
                    <a key={mat.id} href={mat.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{mat.title}</span>
                      </div>
                      {mat.size && <span className="text-xs text-muted-foreground">{mat.size}</span>}
                    </a>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;
