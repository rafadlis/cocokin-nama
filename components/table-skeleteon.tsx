import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface TableBodySkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableBodySkeleton({
  rows = 5,
  columns = 3,
}: TableBodySkeletonProps) {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={`${rowIndex}-${colIndex}`}>
              <Skeleton className="h-4 w-[200px]" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
