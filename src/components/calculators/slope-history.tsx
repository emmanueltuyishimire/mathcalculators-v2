'use client';

import { useMemo } from 'react';
import { collection, query, where, orderBy, limit } from 'firebase/firestore';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

export function SlopeHistory() {
  const firestore = useFirestore();
  const { user } = useUser();

  const calculationsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    
    return query(
        collection(firestore, 'slope_calculations'),
        where('userId', '==', user.uid),
        orderBy('timestamp', 'desc'),
        limit(20)
    );
  }, [firestore, user]);

  const { data: calculations, isLoading } = useCollection(calculationsQuery);

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp?.toDate) {
      return '...';
    }
    return timestamp.toDate().toLocaleString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculation History</CardTitle>
        <CardDescription>Your 20 most recent slope calculations.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Points</TableHead>
                <TableHead>Slope</TableHead>
                <TableHead>Angle</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  </TableRow>
                ))
              )}
              {!isLoading && calculations?.map((calc) => (
                <TableRow key={calc.id}>
                  <TableCell className="text-xs font-mono">({calc.x1}, {calc.y1}) to ({calc.x2}, {calc.y2})</TableCell>
                  <TableCell className="text-xs font-mono">{typeof calc.slope === 'number' ? calc.slope.toFixed(2) : 'undef'}</TableCell>
                  <TableCell className="text-xs font-mono">{typeof calc.angle === 'number' ? `${calc.angle.toFixed(2)}°` : 'N/A'}</TableCell>
                  <TableCell className="text-xs">{formatTimestamp(calc.timestamp)}</TableCell>
                </TableRow>
              ))}
               {!isLoading && calculations?.length === 0 && (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                        No calculations found.
                    </TableCell>
                </TableRow>
               )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
