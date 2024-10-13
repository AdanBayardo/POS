import { useState } from "react";

interface TicketItem {
  name: string;
  quantity: number;
  price: number;
}

interface TicketProps {
  items: TicketItem[];
}

export function Ticket({ items }: TicketProps) {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-4 border rounded fixed top-16 right-0 w-1/3 h-full overflow-y-auto bg-white shadow-lg">
      <h2 className="text-lg font-bold">Ticket</h2>
      <ul>
        {items.map((item) => (
          <li key={item.name}>
            {item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>
      <div>Tax: ${(total * 0.1).toFixed(2)}</div>
      <div>Total: ${(total * 1.1).toFixed(2)}</div>
    </div>
  );
}