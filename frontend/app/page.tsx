'use client';
import { useState } from "react";
import { ProductGrid } from "../components/ProductGrid";
import { Ticket } from "../components/Ticket";


interface TicketItem {
  name: string;
  quantity: number;
  price: number;
}

export default function Home() {
  const [ticketItems, setTicketItems] = useState<TicketItem[]>([]);

  const handleAddToTicket = (product: TicketItem) => {
    setTicketItems((prevItems) => {
      const existingItem = prevItems.find(item => item.name === product.name);
      if (existingItem) {
        return prevItems.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  return (
    <div>
     
      <div className="pt-16 flex"> {/* Add padding to top */}
        <div className="w-2/3">
          <ProductGrid onAddToTicket={handleAddToTicket} />
        </div>
        <div className="w-1/3">
          <Ticket items={ticketItems} />
        </div>
      </div>
    </div>
  );
}


