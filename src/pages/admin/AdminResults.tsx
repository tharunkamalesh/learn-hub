import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { adminApi } from '@/services/api';
import { StudentResult } from '@/types';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const AdminResults: React.FC = () => {
  const [results, setResults] = useState<StudentResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      const data = await adminApi.getStudentResults();
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
          <h1 className="text-3xl font-display font-bold mb-2">Student Results</h1>
          <p className="text-muted-foreground">View all quiz attempts by students</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : (
          <div className="space-y-4">
            {results.map((result) => (
              <Card key={result.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${result.passed ? 'bg-success/10' : 'bg-destructive/10'}`}>
                        {result.passed ? <CheckCircle className="h-5 w-5 text-success" /> : <XCircle className="h-5 w-5 text-destructive" />}
                      </div>
                      <div>
                        <h3 className="font-semibold">{result.studentName}</h3>
                        <p className="text-sm text-muted-foreground">{result.studentEmail}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{result.quizTitle}</p>
                      <p className="text-xs text-muted-foreground">{result.courseTitle}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">{result.percentage}%</div>
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

export default AdminResults;
