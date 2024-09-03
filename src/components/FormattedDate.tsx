"use client";

import { isValidString } from '@/isValidVariable';
import React, { useEffect, useState } from 'react';

interface Props {
  date: string;
}

const DateTime: React.FC<Props> = ({ date }) => {
  const [dateObj, setDateObj] = useState<Date | null>(null);

  useEffect(() => {
    if (isValidString(date)) {
      setDateObj(new Date(date));
    }
  }, [date]);
  
  return (
    <time dateTime={dateObj?.toISOString()}>
      {dateObj?.toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })}
    </time>
  );
};

export default DateTime;
