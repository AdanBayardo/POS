'use client';
import { useState } from "react";
import { ProductGrid } from "../components/products/ProductList";
import { Ticket } from "../components/tickets/Ticket";
import { TicketItem } from "../types/Ticket";

export default function Home() {
  const [ticketItems, setTicketItems] = useState<TicketItem[]>([]);

  return (
    <div>
      <div className="pt-16 flex">
        <div className="w-2/3">
          <ProductGrid onAddToTicket={(product) => Ticket.addToTicket(product, setTicketItems)} />
        </div>
        <div className="w-1/3">
          <Ticket items={ticketItems} />
        </div>
      </div>
    </div>
  );
}
