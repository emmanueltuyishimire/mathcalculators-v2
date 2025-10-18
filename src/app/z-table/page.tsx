
import { PageHeader } from '@/components/page-header';
import { ZTable } from '@/components/z-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ZTablePage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Z-Table" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <section className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Z-Table (0 to Z)
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              This table shows the area under the standard normal curve from the mean (0) to a positive Z-score.
            </p>
          </section>
          <ZTable />
           <Card>
            <CardHeader>
              <CardTitle>How to Use the Z-Table</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground">1. Find Your Z-Score</h3>
                <p>Your Z-score should be in the format `X.Y` (e.g., 1.23). The row indicates the integer and first decimal place (e.g., `1.2`), and the column gives the second decimal place (e.g., `0.03`).</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">2. Locate the Value in the Table</h3>
                <p>Find the row for `1.2` and the column for `0.03`. The intersecting cell contains the area, which is `0.39065`.</p>
              </div>
               <div>
                <h3 className="font-semibold text-foreground">3. Interpret the Area</h3>
                <p>The value `0.39065` means there is a 39.07% probability of a random variable falling between the mean (0) and a Z-score of 1.23.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
