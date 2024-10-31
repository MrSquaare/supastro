export const getRandomNumber = (
  min: number,
  max: number,
  exclude?: number,
): number => {
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

  if (randomNum === exclude) {
    return getRandomNumber(min, max, exclude);
  }

  return randomNum;
};
