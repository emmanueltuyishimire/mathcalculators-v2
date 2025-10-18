import { PageHeader } from '@/components/page-header';
import SequenceCalculators from '@/components/calculators/sequence-calculator';

export default function SequencesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Sequence Calculators" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-12">
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Number Sequence Calculators
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    In mathematics, a <b>sequence</b> is an ordered list of numbers that follow a particular pattern. The individual elements in a sequence are called <b>terms</b>, and the number of terms is called its <b>length</b>. Sequences can be finite or infinite and are essential in many areas of math such as algebra, calculus, and analysis.
                </p>
            </section>
            
            <SequenceCalculators />
        </div>
      </main>
    </div>
  );
}
