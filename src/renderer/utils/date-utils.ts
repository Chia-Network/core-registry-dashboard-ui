export const generateYearsRange = (numYears: number = 10): { label: string; value: string }[] => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: numYears }, (_, index) => {
    const year = currentYear - index;
    return { label: year.toString(), value: year.toString() };
  });
};
