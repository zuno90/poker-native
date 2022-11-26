export const GetInterpolate = ( Input,Output)=>{
    const a = Input.interpolate({
        inputRange:[-1,0,1],
        outputRange:Output,
    })
    return a;
    
}

interface Image {
    name: string;
    image: any;
  }