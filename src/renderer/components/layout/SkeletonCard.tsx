import React, { useMemo } from 'react';
import { Card, SkeletonBar } from '@/components';

const renderSkeletonBars = (count: number) => {
  return Array.from({ length: count }, (_, index) => <SkeletonBar key={index} />);
};

const SkeletonCard: React.FC = () => {
  const data = useMemo(() => Array.from({ length: 3 }, (_, index) => index + 1), []);

  return (
    <div className="relative grid grid-cols-1 gap-4 m-4 md:grid-cols-3" style={{ height: 200 }}>
      {data.map((item) => (
        <Card key={item}>{renderSkeletonBars(3)}</Card>
      ))}
    </div>
  );
};

export { SkeletonCard };
