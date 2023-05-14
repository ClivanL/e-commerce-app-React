export interface Item {
    id: number;
    itemName: String;
    price: number;
    description: String;
    imageUrl: string;
    category: String;
    ownerId: number;
    quantity: number;
    likes:number;
    rating:number;
    reviews:Review[];
  }
  
export interface Favourite{
    id:number;
    userId:number;
    itemId:number;
    item:Item;
  }
  
export interface Cart {
    id:number;
    userId:number;
    itemId:number;
    quantity:number;
    item:Item;
    sufficient:Boolean;
  }
  
export interface UserDetails {
    userId: number,
    email: String;
    carts: Cart[];
    name: String;
    username: String;
    listedItems:Item[];
    fulfillableCart:Boolean;
    favourites:Favourite[];
  }

export interface PurchaseLog {
    id:number;
    userId:number;
    itemId:number;
    quantity:number;
    item:Item;
    createdAt:Date;
    ownerUsername:String;
    sent:Boolean;
    received:Boolean;
    reviewedAt:Date;
    rating:number;
    comments:String;
  }
export interface SaleLog {
    id:number;
    userId:number;
    itemId:number;
    quantity:number;
    item:Item;
    createdAt:Date;
    userUsername:String;
    sent:Boolean;
    reviewedAt:Date;
    rating:number;
    comments:String;
  }



export interface Review {
    id: number;
    reviewedAt: Date;
    rating: number;
    comments: String;
    quantity: number;
  }