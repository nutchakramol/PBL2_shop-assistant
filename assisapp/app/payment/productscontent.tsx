"use client";

import { useContext } from "react";
import { PullDataContext } from "@/contexts/productcontext";

export default function ProductsContent() {
  const context = useContext(PullDataContext);
  
  if (!context) return null;

  const { product } = context;
console.log("Product from context:", product);


  return (
    <div className="w-full space-y-2">
      {product.map((p, i) => (
        <p key={i}>
          - {p.name} x{p.qty} : ฿{p.price}
        </p>
      ))}
    </div>
  );
}
