import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { quizApi } from '@/services/api';
import { QuizResult } from '@/types';
import { Trophy, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const Results: React.FC = () => {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      const data = await quizApi.getResults();
      setResults(data);
      setIsLoading(false);
    };
    fetchResults();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">My Results</h1>
          <p className="text-muted-foreground">Track your quiz performance</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : results.length === 0 ? (
          <Card className="text-center py-12">
            <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No quiz attempts yet. Start learning!</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {results.map((result) => (
              <Card key={result.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${result.passed ? 'bg-success/10' : 'bg-destructive/10'}`}>
                        {result.passed ? <CheckCircle className="h-6 w-6 text-success" /> : <XCircle className="h-6 w-6 text-destructive" />}
                      </div>
                      <div>
                        <h3 className="font-semibold">{result.quizTitle}</h3>
                        <p className="text-sm text-muted-foreground">{result.courseTitle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{result.percentage}%</div>
                      <Badge variant={result.passed ? 'default' : 'destructive'}>{result.passed ? 'Passed' : 'Failed'}</Badge>
                    </div>
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

export default Results;
