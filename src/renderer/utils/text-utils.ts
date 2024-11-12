export const capitalizeText = (text: string) => {
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const convertKeyToLabel = (key: string) => {
  return capitalizeText(key.replace(/([A-Z])/g, ' $1').trim());
};
