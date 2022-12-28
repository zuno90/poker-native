export const GetInterpolate = (Input, Output) => {
  const a = Input.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: Output,
  });
  return a;
};
export const GetInterpolatePosition = (Input, Output = [0, 0, 0]) => {
  // console.log(Input, "input");
  const a = Input.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: Output,
  });
  // console.log(a, "check a");
  return a;
};

interface Image {
  name: string;
  image: any;
}
