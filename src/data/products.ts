import ariaTrench from "@/assets/products/aria-trench.jpg";
import trenchDetail from "@/assets/products/trench-detail.jpg";
import slateCrewneck from "@/assets/products/slate-crewneck.jpg";
import halcyonTrouser from "@/assets/products/halcyon-trouser.jpg";
import juniperSlip from "@/assets/products/juniper-slip.jpg";
import cardinalShirt from "@/assets/products/cardinal-shirt.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  detailImage: string;
  sizes: string[];
  badge?: string;
};

export const products: Product[] = [
  {
    id: "aria-trench",
    name: "The Aria Trench",
    category: "Outerwear",
    price: 184,
    description:
      "A roomy, water-resistant coat in a brushed teal cotton-blend. Double-breasted, fully lined, made to layer over knits.",
    image: ariaTrench,
    detailImage: trenchDetail,
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "New drop",
  },
  {
    id: "slate-crewneck",
    name: "Slate Crewneck",
    category: "Knitwear",
    price: 92,
    description:
      "A soft wool-cashmere crewneck in a heathered slate blue. Relaxed through the body, ribbed at the cuff and hem.",
    image: slateCrewneck,
    detailImage: slateCrewneck,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "halcyon-trouser",
    name: "Halcyon Trouser",
    category: "Trousers",
    price: 128,
    description:
      "High-waist, wide-leg tailored trousers in charcoal wool. Double pleats, side pockets, a clean floor-skimming line.",
    image: halcyonTrouser,
    detailImage: halcyonTrouser,
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "juniper-slip",
    name: "Juniper Slip",
    category: "Dresses",
    price: 146,
    description:
      "A sage green midi slip dress with a soft cowl drape. Cut on the bias so it moves with you, day to night.",
    image: juniperSlip,
    detailImage: juniperSlip,
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "cardinal-shirt",
    name: "Cardinal Shirt",
    category: "Shirting",
    price: 74,
    description:
      "A crisp white cotton boxy shirt with a single patch pocket. Slightly cropped, easy to tuck or wear loose.",
    image: cardinalShirt,
    detailImage: cardinalShirt,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
];

export const currency = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
