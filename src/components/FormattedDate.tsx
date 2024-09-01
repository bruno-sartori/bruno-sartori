import React from 'react';

interface Props {
  date: Date;
}

const DateTime: React.FC<Props> = ({ date }) => {
  return (
    <time dateTime={date.toISOString()}>
      {date.toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })}
    </time>
  );
};

export default DateTime;
