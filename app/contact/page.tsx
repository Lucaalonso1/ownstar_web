import { Header } from "@/components/Header";
import { getCollections } from "@/lib/shopify";

export default async function ContactPage() {
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
      console.error("Failed to fetch collections for Contact page:", error);
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header collections={collectionsData} forceWhite={true} />
      <main className="pt-32 pb-20 px-4 md:px-8 max-w-[800px] mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-8 text-center">
          Contacto
        </h1>
        <p className="text-center text-neutral-500 mb-16 max-w-md mx-auto">
          ¿Tienes alguna pregunta o propuesta? Estamos aquí para ayudarte. Completa el formulario a continuación y te responderemos lo antes posible.
        </p>
        
        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Nombre
              </label>
              <input
                type="text"
                className="w-full border-b border-neutral-200 py-3 text-sm focus:border-black focus:outline-none transition-colors placeholder:text-neutral-300 bg-transparent"
                placeholder="TU NOMBRE"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Email
              </label>
              <input
                type="email"
                className="w-full border-b border-neutral-200 py-3 text-sm focus:border-black focus:outline-none transition-colors placeholder:text-neutral-300 bg-transparent"
                placeholder="TU@EMAIL.COM"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Asunto
            </label>
            <select className="w-full border-b border-neutral-200 py-3 text-sm focus:border-black focus:outline-none transition-colors bg-transparent uppercase text-neutral-600">
              <option>Pedido</option>
              <option>Devolución</option>
              <option>Colaboración</option>
              <option>Otro</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Mensaje
            </label>
            <textarea
              rows={6}
              className="w-full border border-neutral-200 p-4 text-sm focus:border-black focus:outline-none transition-colors placeholder:text-neutral-300 bg-transparent resize-none"
              placeholder="ESCRIBE TU MENSAJE AQUÍ..."
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full md:w-auto bg-black text-white px-12 py-4 text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              Enviar Mensaje
            </button>
          </div>
        </form>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 text-center border-t border-neutral-100 pt-12">
          <div>
            <h3 className="font-bold uppercase mb-2">Email</h3>
            <p className="text-neutral-600 text-sm">ownstarco@gmail.com</p>
          </div>
          <div>
            <h3 className="font-bold uppercase mb-2">Horario</h3>
            <p className="text-neutral-600 text-sm">Lunes - Viernes: 9:00 - 18:00</p>
          </div>
        </div>
      </main>
    </div>
  );
}

