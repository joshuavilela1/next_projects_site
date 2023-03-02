//used to artifically create delay to show rendering

export const delay = (time: number) => {
  new Promise((resolve) => {
    setTimeout(() => resolve(1), time);
  });
};
