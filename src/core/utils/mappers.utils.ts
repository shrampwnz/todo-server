export const mapToItem = (data: any) => {
  return Object.keys(data).reduce((acc, key) => {
    const { name, isComplete, description } = data[key];

    return [
      ...acc,
      {
        id: key,
        name,
        isComplete,
        description
      }
    ];
  }, []);
};
