import { Header } from "@/components/Header";
import { getCollections } from "@/lib/shopify";

export default async function FaqPage() {
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
      console.error("Failed to fetch collections for FAQ page:", error);
    }
  }

  const faqs = [
    {
      question: "¿CUÁLES SON LOS PLAZOS DE ENTREGA?",
      answer: "Los pedidos nacionales suelen entregarse en 24-48 horas laborables. Para pedidos internacionales, el plazo es de 3-7 días laborables dependiendo del destino.",
    },
    {
      question: "¿CÓMO PUEDO REALIZAR UNA DEVOLUCIÓN?",
      answer: "Dispones de 14 días naturales desde la recepción de tu pedido para solicitar una devolución. Accede a nuestro portal de devoluciones o contacta con atención al cliente.",
    },
    {
      question: "¿HACÉIS ENVÍOS A CANARIAS?",
      answer: "Sí, realizamos envíos a Islas Canarias, Ceuta y Melilla. Ten en cuenta que pueden aplicarse gastos de aduana adicionales ajenos a Ownstar.",
    },
    {
      question: "¿CÓMO PUEDO SABER MI TALLA?",
      answer: "En cada página de producto encontrarás una guía de tallas detallada. Si tienes dudas entre dos tallas, recomendamos elegir la superior para un ajuste oversized característico de nuestra marca.",
    },
    {
      question: "¿LOS PRODUCTOS SON UNISEX?",
      answer: "Sí, la mayoría de nuestras prendas están diseñadas con patrones unisex y cortes relajados para adaptarse a todos los estilos.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <Header collections={collectionsData} forceWhite={true} />
      <main className="pt-32 pb-20 px-4 md:px-8 max-w-[800px] mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-16 text-center">
          Preguntas Frecuentes
        </h1>
        
        <div className="space-y-12">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-neutral-100 pb-8">
              <h2 className="text-lg font-bold uppercase tracking-wide mb-3">
                {faq.question}
              </h2>
              <p className="text-neutral-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

