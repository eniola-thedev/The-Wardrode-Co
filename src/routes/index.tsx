import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { currency, products, type Product } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "THE WARDROBE CO. — Considered staples, bold statements",
      },
      {
        name: "description",
        content:
          "A considered edit of elevated staples and bold statements — outerwear, knitwear, trousers and dresses cut for movement. Free shipping over $120.",
      },
      { property: "og:title", content: "THE WARDROBE CO." },
      {
        property: "og:description",
        content:
          "A considered edit of elevated staples and bold statements — cut for movement, made to be worn hard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Storefront,
});

type CartLine = { productId: string; size: string; qty: number };

const FREE_SHIPPING_THRESHOLD = 120;
const SHIPPING_FLAT = 8;

function Storefront() {
  const hero = products[0]!;
  const [quickViewId, setQuickViewId] = useState(hero.id);
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState<CartLine[]>([
    { productId: "aria-trench", size: "L", qty: 1 },
    { productId: "slate-crewneck", size: "M", qty: 2 },
  ]);
  const [bagPulse, setBagPulse] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);

  const quickView = products.find((p) => p.id === quickViewId) ?? hero;

  const cartDetailed = useMemo(
    () =>
      cart.map((line) => ({
        ...line,
        product: products.find((p) => p.id === line.productId)!,
      })),
    [cart],
  );
  const itemCount = cart.reduce((sum, l) => sum + l.qty, 0);
  const subtotal = cartDetailed.reduce(
    (sum, l) => sum + l.product.price * l.qty,
    0,
  );
  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;

  const addToCart = (product: Product, lineSize: string, lineQty = 1) => {
    setCart((prev) => {
      const existing = prev.find(
        (l) => l.productId === product.id && l.size === lineSize,
      );
      if (existing) {
        return prev.map((l) =>
          l === existing ? { ...l, qty: l.qty + lineQty } : l,
        );
      }
      return [...prev, { productId: product.id, size: lineSize, qty: lineQty }];
    });
    setCheckedOut(false);
    setBagPulse(true);
    window.setTimeout(() => setBagPulse(false), 600);
  };

  const changeQty = (line: CartLine, delta: number) => {
    setCart((prev) =>
      prev
        .map((l) =>
          l.productId === line.productId && l.size === line.size
            ? { ...l, qty: l.qty + delta }
            : l,
        )
        .filter((l) => l.qty > 0),
    );
  };

  const selectQuickView = (product: Product) => {
    setQuickViewId(product.id);
    setSize(product.sizes.includes("M") ? "M" : product.sizes[0]!);
    setQty(1);
  };

  return (
    <div className="min-h-screen bg-paper font-sans text-ink selection:bg-brand/30">
      <div className="relative isolate overflow-hidden">
        {/* Ambient frosted gradient field */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-br from-brand/15 via-paper to-mist"
        />
        <div
          aria-hidden="true"
          className="floaty absolute -top-24 -left-24 -z-10 size-[520px] rounded-full bg-brand/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="floaty-slow absolute top-40 right-0 -z-10 size-[420px] rounded-full bg-sky-300/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="floaty absolute bottom-0 left-1/3 -z-10 size-[360px] rounded-full bg-cyan-200/40 blur-3xl"
        />

        {/* Header */}
        <header className="sticky top-0 z-30 mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
          <nav className="flex items-center justify-between gap-4 rounded-2xl bg-white/55 p-3 ring-1 ring-white/60 backdrop-blur-md">
            <a href="#" className="font-display text-lg font-bold tracking-tight">
              THE WARDROBE CO.
            </a>
            <div className="hidden items-center gap-6 text-sm font-medium text-ink/70 sm:flex">
              <a href="#collection" className="transition-colors hover:text-ink">
                Shop
              </a>
              <a href="#collection" className="transition-colors hover:text-ink">
                New in
              </a>
              <a href="#quick-view" className="transition-colors hover:text-ink">
                Lookbook
              </a>
            </div>
            <a
              href="#your-bag"
              className={`flex items-center gap-2 rounded-xl bg-ink px-4 py-2 text-sm font-medium text-white transition-transform active:scale-95 ${
                bagPulse ? "scale-105" : ""
              }`}
            >
              <span>Bag</span>
              <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-ink">
                {itemCount}
              </span>
            </a>
          </nav>
        </header>

        {/* Hero */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid items-center gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-brand ring-1 ring-white/70 backdrop-blur-md">
                New drop — Spring 26
              </span>
              <h1 className="mt-5 font-display text-5xl font-extrabold leading-none tracking-tight text-balance sm:text-6xl lg:text-7xl">
                Wear the <span className="text-brand">contrast</span>.
              </h1>
              <p className="mt-5 max-w-[48ch] text-base text-ink/70 text-pretty">
                A considered edit of elevated staples and bold statements — cut
                for movement, made to be worn hard.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#collection"
                  className="rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-ink transition-transform active:scale-95"
                >
                  Shop the collection
                </a>
                <a
                  href="#quick-view"
                  className="rounded-xl bg-white/60 px-6 py-3 text-sm font-medium text-ink ring-1 ring-white/70 backdrop-blur-md transition-transform active:scale-95"
                >
                  View lookbook
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-2 text-xs font-medium">
                {["Outerwear", "Knitwear", "Trousers", "Dresses"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/50 px-3 py-1.5 ring-1 ring-white/60 backdrop-blur-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-xl bg-white/55 p-3 ring-1 ring-white/60 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => selectQuickView(hero)}
                  className="block w-full overflow-hidden rounded-xl bg-mist outline-1 -outline-offset-1 outline-black/5"
                  aria-label={`Quick view ${hero.name}`}
                >
                  <img
                    src={hero.image}
                    alt={hero.name}
                    width={1024}
                    height={1280}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                </button>
                <div className="mt-3 flex items-center justify-between px-1">
                  <div>
                    <p className="font-display text-sm font-semibold">
                      {hero.name}
                    </p>
                    <p className="text-xs text-ink/60">{hero.category}</p>
                  </div>
                  <p className="font-display text-lg font-bold">
                    {currency(hero.price)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog */}
        <section
          id="collection"
          className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-12 sm:px-6 lg:px-8"
        >
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-balance">
              The collection
            </h2>
            <span className="text-sm font-medium text-ink/60">5 pieces</span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(1).map((product) => (
              <article
                key={product.id}
                className="group rounded-2xl bg-white/55 p-3 ring-1 ring-white/60 backdrop-blur-md"
              >
                <button
                  type="button"
                  onClick={() => selectQuickView(product)}
                  className="block w-full overflow-hidden rounded-lg bg-mist outline-1 -outline-offset-1 outline-black/5"
                  aria-label={`Quick view ${product.name}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </button>
                <div className="mt-3 px-1 pb-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-sm font-semibold">
                        {product.name}
                      </h3>
                      <p className="text-xs text-ink/60">{product.category}</p>
                    </div>
                    <p className="font-display text-base font-bold">
                      {currency(product.price)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addToCart(product, "M")}
                    className="mt-3 w-full rounded-xl bg-ink/5 py-2 text-xs font-medium text-ink/70 transition-colors hover:bg-brand/20 hover:text-ink active:scale-95"
                  >
                    Add to bag · M
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Quick view + cart */}
        <section
          id="quick-view"
          className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-16 sm:px-6 lg:px-8"
        >
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Quick view */}
            <div className="scroll-mt-24 rounded-2xl bg-white/55 p-4 ring-1 ring-white/60 backdrop-blur-md lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-lg bg-mist outline-1 -outline-offset-1 outline-black/5">
                  <img
                    src={quickView.detailImage}
                    alt={`${quickView.name} detail`}
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">
                    {quickView.category}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold leading-tight tracking-tight">
                    {quickView.name}
                  </h3>
                  <p className="mt-2 text-pretty text-sm text-ink/70">
                    {quickView.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {quickView.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSize(s)}
                        className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                          size === s
                            ? "bg-brand font-semibold text-ink"
                            : "bg-ink/5 text-ink/70 hover:bg-ink/10"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <div className="mt-auto pt-4">
                    <div className="flex items-center justify-between">
                      <p className="font-display text-3xl font-bold leading-none">
                        {currency(quickView.price)}
                      </p>
                      <div className="flex items-center gap-1 rounded-xl bg-ink/5 p-1">
                        <button
                          type="button"
                          onClick={() => setQty((q) => Math.max(1, q - 1))}
                          className="grid size-8 place-items-center rounded-lg text-lg font-medium transition-colors hover:bg-ink/10"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty((q) => Math.min(9, q + 1))}
                          className="grid size-8 place-items-center rounded-lg text-lg font-medium transition-colors hover:bg-ink/10"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => addToCart(quickView, size, qty)}
                      className="mt-4 w-full rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-ink transition-transform active:scale-95"
                    >
                      Add to bag
                    </button>
                    <p className="mt-2 text-center text-xs text-ink/50">
                      Free shipping over ${FREE_SHIPPING_THRESHOLD} · 30-day
                      returns
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cart */}
            <div
              id="your-bag"
              className="scroll-mt-24 rounded-2xl bg-white/55 p-4 ring-1 ring-white/60 backdrop-blur-md lg:col-span-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold">Your bag</h3>
                <span className="text-xs font-medium text-ink/60">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
              </div>

              {cartDetailed.length === 0 ? (
                <p className="mt-6 rounded-xl bg-ink/5 px-4 py-6 text-center text-sm text-ink/60">
                  Your bag is empty — pick a piece from the collection.
                </p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {cartDetailed.map((line) => (
                    <li key={`${line.productId}-${line.size}`} className="flex items-center gap-3">
                      <div className="size-14 shrink-0 overflow-hidden rounded-lg bg-mist outline-1 -outline-offset-1 outline-black/5">
                        <img
                          src={line.product.image}
                          alt={line.product.name}
                          width={512}
                          height={512}
                          loading="lazy"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-sm font-semibold">
                          {line.product.name}
                        </p>
                        <p className="text-xs text-ink/60">
                          {line.size} · {currency(line.product.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 rounded-lg bg-ink/5 p-0.5">
                        <button
                          type="button"
                          onClick={() => changeQty(line, -1)}
                          className="grid size-6 place-items-center rounded-md text-sm transition-colors hover:bg-ink/10"
                          aria-label={`Remove one ${line.product.name}`}
                        >
                          −
                        </button>
                        <span className="w-4 text-center text-xs font-semibold">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => changeQty(line, 1)}
                          className="grid size-6 place-items-center rounded-md text-sm transition-colors hover:bg-ink/10"
                          aria-label={`Add one ${line.product.name}`}
                        >
                          +
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-4 space-y-1.5 border-t border-ink/10 pt-4 text-sm">
                <div className="flex justify-between text-ink/70">
                  <span>Subtotal</span>
                  <span className="font-medium">{currency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-ink/70">
                  <span>Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : currency(shipping)}
                  </span>
                </div>
                <div className="flex justify-between pt-1 font-display text-base font-semibold">
                  <span>Total</span>
                  <span>{currency(total)}</span>
                </div>
              </div>
              <button
                type="button"
                disabled={cartDetailed.length === 0}
                onClick={() => setCheckedOut(true)}
                className="mt-4 w-full rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-ink transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Checkout
              </button>
              {checkedOut && (
                <p className="mt-2 rounded-xl bg-brand/15 px-3 py-2 text-center text-xs font-medium text-ink/70">
                  Demo checkout — no payment was taken. Your bag is intact.
                </p>
              )}
              <p className="mt-2 text-center text-xs text-ink/50">
                Free returns · 30 days
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white/40 px-6 py-5 ring-1 ring-white/60 backdrop-blur-md">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="font-display text-base font-bold tracking-tight">
                  THE WARDROBE CO.
                </p>
                <p className="mt-1 text-sm text-ink/60">
                  Considered staples, bold statements. © 2026 — a side project.
                </p>
              </div>
              <div className="flex items-center gap-5 text-sm font-medium text-ink/70">
                <a href="#collection" className="transition-colors hover:text-ink">
                  Shop
                </a>
                <a href="#quick-view" className="transition-colors hover:text-ink">
                  Lookbook
                </a>
                <a href="#collection" className="transition-colors hover:text-ink">
                  About
                </a>
                <a href="#quick-view" className="transition-colors hover:text-ink">
                  Care
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
