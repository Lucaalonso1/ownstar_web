import { Header } from "@/components/Header";
import { getCollections } from "@/lib/shopify";

export default async function TermsPage() {
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
      console.error("Failed to fetch collections for Terms page:", error);
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header collections={collectionsData} forceWhite={true} />
      <main className="pt-32 pb-20 px-4 md:px-8 max-w-[800px] mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-16 text-center">
          Términos y Condiciones
        </h1>
        
        <div className="space-y-10 text-neutral-600 leading-relaxed text-sm md:text-base">
          <section>
            <h2 className="text-black text-lg font-bold uppercase mb-4">1. Introducción</h2>
            <p>
              Bienvenido a Ownstar. Al acceder a nuestro sitio web y utilizar nuestros servicios, aceptas cumplir con los siguientes términos y condiciones. Por favor, léelos detenidamente antes de realizar cualquier compra.
            </p>
          </section>

          <section>
            <h2 className="text-black text-lg font-bold uppercase mb-4">2. Uso del Sitio</h2>
            <p>
              Se te concede permiso para acceder y utilizar este sitio web y su contenido con el único propósito de preparar, evaluar y realizar pedidos de productos a través de Ownstar. Cualquier otro uso del sitio web o de su contenido, incluyendo, sin limitación, la modificación, reproducción, distribución, transmisión o exhibición, sin el permiso previo por escrito de Ownstar, está estrictamente prohibido.
            </p>
          </section>

          <section>
            <h2 className="text-black text-lg font-bold uppercase mb-4">3. Productos y Precios</h2>
            <p>
              Todos los precios mostrados en nuestro sitio web incluyen el IVA aplicable. Nos reservamos el derecho a modificar los precios en cualquier momento sin previo aviso. Sin embargo, una vez realizado el pedido, el precio cobrado será el que se mostraba en el momento de la compra.
            </p>
            <p className="mt-2">
              Hacemos todo lo posible para mostrar con la mayor precisión posible los colores e imágenes de nuestros productos. No podemos garantizar que la visualización de cualquier color en el monitor de tu ordenador sea precisa.
            </p>
          </section>

          <section>
            <h2 className="text-black text-lg font-bold uppercase mb-4">4. Pagos</h2>
            <p>
              Aceptamos pagos a través de tarjetas de crédito/débito (Visa, Mastercard, American Express) y otros métodos seguros procesados a través de la plataforma de Shopify Payments. Todas las transacciones son seguras y están encriptadas.
            </p>
          </section>

          <section>
            <h2 className="text-black text-lg font-bold uppercase mb-4">5. Propiedad Intelectual</h2>
            <p>
              Todo el contenido incluido en este sitio, como texto, gráficos, logotipos, iconos de botones, imágenes, clips de audio, descargas digitales, compilaciones de datos y software, es propiedad de Ownstar o de sus proveedores de contenido y está protegido por las leyes internacionales de derechos de autor.
            </p>
          </section>

          <section>
            <h2 className="text-black text-lg font-bold uppercase mb-4">6. Ley Aplicable</h2>
            <p>
              Estos Términos de Servicio y cualquier acuerdo separado por el cual te proporcionemos servicios se regirán e interpretarán de acuerdo con las leyes de España.
            </p>
          </section>

          <div className="pt-8 border-t border-neutral-100 mt-12">
            <p className="text-xs text-neutral-400 uppercase">
              Última actualización: Noviembre 2025
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

