export const GetInterpolate = ( Input,Output)=>{
    const a = Input.interpolate({
        inputRange:[-1,0,1],
        outputRange:Output,
    })
    // console.log(a,"Input")
    return a;
    
}
interface Image {
    name: string;
    image: any;
  }
  export class BackgroundImage {
    private static images: Array<Image> = [
      {
        name: '3♣.png',
        image: require("../../assets/deckofcard/3♣.png"),
      },
     
    ];
    static GetImage = (name: string) => {
      const found = BackgroundImage.images.find(e => e.name === name);
      console.log(found,"asd")
      return found ? found.image : null;
    };
  }