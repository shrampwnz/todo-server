export const mapToItem = (data: any) => {
  return Object.keys(data).reduce((acc, key) => {
    const { name, isComplete } = data[key];

    return [
      ...acc,
      {
        id: key,
        name,
        isComplete
      }
    ];
  }, []);
};
