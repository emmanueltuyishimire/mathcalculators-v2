'use client';
import { useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import SlopeCalculator from '@/components/calculators/slope-calculator';
import { SlopeHistory } from '@/components/calculators/slope-history';
import { HowToUseGuide, EducationalContent } from '@/components/slope-page-content';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth, useUser } from '@/firebase';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';

export default function SlopePage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [isUserLoading, user, auth]);

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Slope Calculator" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Dynamic Slope Calculator
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                By definition, the slope or gradient of a line describes its steepness, incline, or grade.
              </p>
            </section>
            <SlopeCalculator />
            <HowToUseGuide />
            <EducationalContent />
          </div>

          <div className="space-y-8">
            <Card>
              <CardContent className="pt-6">
                {!user && isUserLoading && <p>Loading history...</p>}
                {!user && !isUserLoading && (
                  <div className="text-center text-muted-foreground">
                    <p>Sign in to see your calculation history.</p>
                  </div>
                )}
                {user && <SlopeHistory />}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
