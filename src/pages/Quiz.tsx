import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { courseApi, quizApi } from '@/services/api';
import { Quiz as QuizType, QuizResult } from '@/types';
import { Clock, AlertCircle, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const Quiz: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [quiz, setQuiz] = useState<QuizType | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!id) return;
      // Find quiz from all courses
      const courses = await courseApi.getCourses();
      for (const course of courses) {
        const q = await courseApi.getCourseQuiz(course.id);
        if (q?.id === id) { setQuiz(q); break; }
      }
      setIsLoading(false);
    };
    fetchQuiz();
  }, [id]);

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers({ ...answers, [questionId]: optionId });
  };

  const handleSubmit = async () => {
    if (!quiz) return;
    setIsSubmitting(true);
    
    const attempt = {
      quizId: quiz.id,
      answers: Object.entries(answers).map(([questionId, selectedOptionId]) => ({
        questionId,
        selectedOptionId,
      })),
    };
    
    const response = await quizApi.submitQuiz(quiz.id, attempt);
    if (response.success && response.data) {
      setResult(response.data);
      toast({
        title: response.data.passed ? 'Congratulations!' : 'Quiz Completed',
        description: response.message,
        variant: response.data.passed ? 'default' : 'destructive',
      });
    }
    setIsSubmitting(false);
  };

  if (isLoading) {
    return <div className="min-h-screen bg-background"><Navbar /><div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></div>;
  }

  if (!quiz) {
    return <div className="min-h-screen bg-background"><Navbar /><div className="container mx-auto px-4 py-20 text-center"><h1 className="text-2xl font-bold">Quiz not found</h1></div></div>;
  }

  if (result) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="text-center">
            <CardHeader>
              <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${result.passed ? 'bg-success/10' : 'bg-destructive/10'}`}>
                {result.passed ? <CheckCircle className="h-8 w-8 text-success" /> : <XCircle className="h-8 w-8 text-destructive" />}
              </div>
              <CardTitle className="text-2xl mt-4">{result.passed ? 'You Passed!' : 'Keep Practicing'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl font-bold text-primary">{result.percentage}%</div>
              <p className="text-muted-foreground">Score: {result.score}/{result.totalPoints} points</p>
              <Progress value={result.percentage} className="h-3" />
              <div className="flex gap-4 justify-center pt-4">
                <Button variant="outline" onClick={() => navigate('/results')}>View All Results</Button>
                <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="font-display font-bold">{quiz.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4" />{quiz.timeLimit} min</div>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">Question {currentQuestion + 1} of {quiz.questions.length}</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-6">{question.text}</h2>
            <RadioGroup value={answers[question.id] || ''} onValueChange={(value) => handleAnswer(question.id, value)} className="space-y-3">
              {question.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-secondary transition-colors cursor-pointer">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="cursor-pointer flex-1">{option.text}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))} disabled={currentQuestion === 0}>Previous</Button>
          {currentQuestion === quiz.questions.length - 1 ? (
            <Button onClick={handleSubmit} disabled={isSubmitting || Object.keys(answers).length !== quiz.questions.length}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}Submit Quiz
            </Button>
          ) : (
            <Button onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Quiz;
