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
    images: string[];
  }

  interface ItemsListProps {
    items: Item[];
  }


  interface GalleryProps {
    items: Item | { id: number; images: string[]; }[];

    items: {
      id: number;
      images: string[];
    }[];
    
  }

  interface CustomSpinProps {
    loading: boolean;
    color?: string;

  }

