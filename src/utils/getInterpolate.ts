export const GetInterpolate = (Input, Output) => {
  const a = Input.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: Output,
  });
  return a;
};
export const GetInterpolate6Element = (Input, Output) => {
  const a = Input.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: Output,
  });
  return a;
};

interface Image {
  name: string;
  image: any;
}
