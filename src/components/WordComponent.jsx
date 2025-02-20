import { forwardRef } from "react";

/* eslint-disable react/prop-types */
export const WordComponent = forwardRef(({ children, wordStatus }, ref) => {
  return (
    <div ref={ref} className={`word ${wordStatus || ""}`}>
      {children}
    </div>
  );
});

WordComponent.displayName = 'WordComponent';
 