interface Item {
    id: number;
    name: string;
    price: number;
    seller: {
      id: number;
      name: string;
      lastName: string;
    };
    bids: {
      id: number;
      bidAmount: number;
    }[];
  }

  interface ItemsListProps {
    items: Item[];
  }