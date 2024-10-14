export interface TicketItem {
    name: string;
    quantity: number;
    price: number;
  }
export interface TicketProps {
    items: TicketItem[];
  }