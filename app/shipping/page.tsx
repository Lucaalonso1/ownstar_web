import { Header } from "@/components/Header";
import { getCollections } from "@/lib/shopify";

export default async function ShippingPage() {
  let collectionsData: any[] = [];

  if (
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN &&
    process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN
  ) {
    try {
      const fetchedCollections = await getCollections();
      if (fetchedCollections.length > 0) {
        collectionsData = fetchedCollections.map((c: any) => ({
          id: c.id,
          name: c.title,
          image: c.image?.src || "",
        }));
      }
    } catch (error) {
      console.error("Failed to fetch collections for Shipping page:", error);
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header collections={collectionsData} forceWhite={true} />
      <main className="pt-32 pb-20 px-4 md:px-8 max-w-[800px] mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-12 text-center">
          Envíos y Devoluciones
        </h1>
        
        <div className="space-y-12">
          <section className="space-y-4">
            <h2 className="text-xl font-bold uppercase border-b border-black pb-2">Envíos</h2>
            <div className="space-y-4 text-neutral-600 leading-relaxed">
              <p>
                Todos los pedidos se procesan en un plazo de 1 a 2 días laborables (excluyendo fines de semana y festivos) después de recibir el correo electrónico de confirmación del pedido. Recibirás otra notificación cuando tu pedido haya sido enviado.
              </p>
              <ul className="list-disc pl-5 space-y-2 marker:text-black">
                <li>
                  <strong className="text-black uppercase text-xs tracking-wide">España Peninsular:</strong> 24-48h (Gratis en pedidos superiores a 100€)
                </li>
                <li>
                  <strong className="text-black uppercase text-xs tracking-wide">Baleares, Canarias, Ceuta y Melilla:</strong> 3-5 días laborables.
                </li>
                <li>
                  <strong className="text-black uppercase text-xs tracking-wide">Europa:</strong> 3-7 días laborables.
                </li>
                <li>
                  <strong className="text-black uppercase text-xs tracking-wide">Internacional:</strong> 5-15 días laborables.
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold uppercase border-b border-black pb-2">Devoluciones</h2>
            <div className="space-y-4 text-neutral-600 leading-relaxed">
              <p>
                Aceptamos devoluciones hasta 14 días después de la entrega, si el artículo no ha sido usado y está en su estado original con todas las etiquetas adjuntas. Reembolsaremos el importe total del pedido menos los gastos de envío de la devolución.
              </p>
              <p>
                En el caso de que tu pedido llegue dañado de alguna manera, por favor envíanos un correo electrónico lo antes posible a help@ownstar.com con tu número de pedido y una foto del estado del artículo. Tratamos estos casos individualmente e intentaremos encontrar una solución satisfactoria.
              </p>
              <p className="text-xs uppercase tracking-wide text-neutral-400 pt-4">
                * No se admiten devoluciones en ropa interior o calcetines por motivos de higiene.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

