const  image=[{
    name: '2♣',
    image: require("../../../assets/deckofcard/2♣.png"),
  },{
    name: '3♣',
    image: require("../../../assets/deckofcard/3♣.png"),
  },{
    name: '4♣',
    image: require("../../../assets/deckofcard/4♣.png"),
  },{
    name: '5♣',
    image: require("../../../assets/deckofcard/5♣.png"),
  },{
    name: '6♣',
    image: require("../../../assets/deckofcard/6♣.png"),
  },{
    name: '7♣',
    image: require("../../../assets/deckofcard/7♣.png"),
  },{
    name: '8♣',
    image: require("../../../assets/deckofcard/8♣.png"),
  },{
    name: '9♣',
    image: require("../../../assets/deckofcard/9♣.png"),
  },{
    name: 'T♣',
    image: require("../../../assets/deckofcard/T♣.png"),
  },{
    name: 'A♣',
    image: require("../../../assets/deckofcard/A♣.png"),
  },{
    name: 'J♣',
    image: require("../../../assets/deckofcard/J♣.png"),
  },{
    name: 'Q♣',
    image: require("../../../assets/deckofcard/Q♣.png"),
  },{
    name: 'K♣',
    image: require("../../../assets/deckofcard/K♣.png"),
  },


  {
    name: '2♦',
    image: require("../../../assets/deckofcard/2♦.png"),
  },{
    name: '3♦',
    image: require("../../../assets/deckofcard/3♦.png"),
  },{
    name: '4♦',
    image: require("../../../assets/deckofcard/4♦.png"),
  },{
    name: '5♦',
    image: require("../../../assets/deckofcard/5♦.png"),
  },{
    name: '6♦',
    image: require("../../../assets/deckofcard/6♦.png"),
  },{
    name: '7♦',
    image: require("../../../assets/deckofcard/7♦.png"),
  },{
    name: '8♦',
    image: require("../../../assets/deckofcard/8♦.png"),
  },{
    name: '9♦',
    image: require("../../../assets/deckofcard/9♦.png"),
  },{
    name: 'T♦',
    image: require("../../../assets/deckofcard/T♦.png"),
  },{
    name: 'A♦',
    image: require("../../../assets/deckofcard/A♦.png"),
  },{
    name: 'J♦',
    image: require("../../../assets/deckofcard/J♦.png"),
  },{
    name: 'Q♦',
    image: require("../../../assets/deckofcard/Q♦.png"),
  },{
    name: 'K♦',
    image: require("../../../assets/deckofcard/K♦.png"),
  },


  {
    name: '2♥',
    image: require("../../../assets/deckofcard/2♥.png"),
  },{
    name: '3♥',
    image: require("../../../assets/deckofcard/3♥.png"),
  },{
    name: '4♥',
    image: require("../../../assets/deckofcard/4♥.png"),
  },{
    name: '5♥',
    image: require("../../../assets/deckofcard/5♥.png"),
  },{
    name: '6♥',
    image: require("../../../assets/deckofcard/6♥.png"),
  },{
    name: '7♥',
    image: require("../../../assets/deckofcard/7♥.png"),
  },{
    name: '8♥',
    image: require("../../../assets/deckofcard/8♥.png"),
  },{
    name: '9♥',
    image: require("../../../assets/deckofcard/9♥.png"),
  },{
    name: 'T♥',
    image: require("../../../assets/deckofcard/T♥.png"),
  },{
    name: 'A♥',
    image: require("../../../assets/deckofcard/A♥.png"),
  },{
    name: 'J♥',
    image: require("../../../assets/deckofcard/J♥.png"),
  },{
    name: 'Q♥',
    image: require("../../../assets/deckofcard/Q♥.png"),
  },{
    name: 'K♥',
    image: require("../../../assets/deckofcard/K♥.png"),
  },


  {
    name: '2♠',
    image: require("../../../assets/deckofcard/2♠.png"),
  },{
    name: '3♠',
    image: require("../../../assets/deckofcard/3♠.png"),
  },{
    name: '4♠',
    image: require("../../../assets/deckofcard/4♠.png"),
  },{
    name: '5♠',
    image: require("../../../assets/deckofcard/5♠.png"),
  },{
    name: '6♠',
    image: require("../../../assets/deckofcard/6♠.png"),
  },{
    name: '7♠',
    image: require("../../../assets/deckofcard/7♠.png"),
  },{
    name: '8♠',
    image: require("../../../assets/deckofcard/8♠.png"),
  },{
    name: '9♠',
    image: require("../../../assets/deckofcard/9♠.png"),
  },{
    name: 'T♠',
    image: require("../../../assets/deckofcard/T♠.png"),
  },{
    name: 'A♠',
    image: require("../../../assets/deckofcard/A♠.png"),
  },{
    name: 'J♠',
    image: require("../../../assets/deckofcard/J♠.png"),
  },{
    name: 'Q♠',
    image: require("../../../assets/deckofcard/Q♠.png"),
  },{
    name: 'K♠',
    image: require("../../../assets/deckofcard/K♠.png"),
  },




 ]
export const getImage= (name:any)=>{
    const b = image.filter((value) => name?.includes(value.name))
    return b ? b :null
}