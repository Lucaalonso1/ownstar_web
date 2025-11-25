"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { createCustomer, createCustomerAccessToken, getCustomer } from "@/lib/shopify";
import { useLanguage } from "@/context/LanguageContext";

export default function AccountClient() {
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [customer, setCustomer] = useState<any>(null);
  
  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const response = await createCustomerAccessToken(email, password);
        
        if (response?.customerUserErrors?.length > 0) {
          throw new Error(response.customerUserErrors[0].message);
        }

        if (response?.customerAccessToken?.accessToken) {
           const token = response.customerAccessToken.accessToken;
           localStorage.setItem("shopify_customer_token", token);
           // Fetch customer data
           const customerData = await getCustomer(token);
           setCustomer(customerData);
        }
      } else {
        const response = await createCustomer(email, password, firstName, lastName);
        
        if (response?.customerUserErrors?.length > 0) {
          throw new Error(response.customerUserErrors[0].message);
        }
        
        // After register, usually login automatically or ask to login
        setIsLogin(true);
        alert("Cuenta creada correctamente. Por favor inicia sesión.");
      }
    } catch (err: any) {
      setError(err.message || "Ha ocurrido un error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
      localStorage.removeItem("shopify_customer_token");
      setCustomer(null);
  };
  
  // Check for existing session on mount (simplified)
  // In a real app, use useEffect to check localStorage token and fetch customer
  
  if (customer) {
      return (
          <main className="pt-32 pb-20 px-4 md:px-8 max-w-[1200px] mx-auto min-h-[80vh]">
              <div className="flex justify-between items-center mb-12">
                  <h1 className="text-4xl font-bold uppercase tracking-tighter">Tu Cuenta</h1>
                  <button onClick={handleLogout} className="text-xs uppercase underline hover:text-neutral-500">Cerrar Sesión</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="space-y-4">
                      <h2 className="text-xl font-bold uppercase">Detalles</h2>
                      <p className="text-neutral-600">{customer.firstName} {customer.lastName}</p>
                      <p className="text-neutral-600">{customer.email}</p>
                  </div>
                  <div className="md:col-span-2 space-y-6">
                       <h2 className="text-xl font-bold uppercase">Historial de Pedidos</h2>
                       {customer.orders?.edges?.length > 0 ? (
                           <div className="space-y-4">
                               {customer.orders.edges.map(({ node }: any) => (
                                   <div key={node.id} className="border border-neutral-200 p-4 flex justify-between items-center">
                                       <div>
                                           <p className="font-bold">Pedido #{node.orderNumber}</p>
                                           <p className="text-xs text-neutral-500">{new Date(node.processedAt).toLocaleDateString()}</p>
                                       </div>
                                       <div className="text-right">
                                           <p className="font-medium">{node.totalPrice.amount} {node.totalPrice.currencyCode}</p>
                                           <span className="text-[10px] uppercase bg-neutral-100 px-2 py-1 rounded">{node.financialStatus}</span>
                                       </div>
                                   </div>
                               ))}
                           </div>
                       ) : (
                           <p className="text-neutral-400">No has realizado ningún pedido aún.</p>
                       )}
                  </div>
              </div>
          </main>
      )
  }

  return (
    <main className="pt-32 pb-20 px-4 md:px-8 max-w-md mx-auto min-h-[80vh] flex flex-col justify-center">
      <div className="space-y-8">
        {/* Toggle Header */}
        <div className="flex items-baseline gap-6 mb-12">
          <button
            onClick={() => setIsLogin(true)}
            className={`text-3xl md:text-4xl font-bold uppercase tracking-tighter transition-colors ${
              isLogin ? "text-black" : "text-neutral-300 hover:text-neutral-500"
            }`}
          >
            {t.auth.login}
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`text-3xl md:text-4xl font-bold uppercase tracking-tighter transition-colors ${
              !isLogin ? "text-black" : "text-neutral-300 hover:text-neutral-500"
            }`}
          >
            {t.auth.register}
          </button>
        </div>

        {/* Forms */}
        <div className="space-y-6">
          {error && <div className="bg-red-50 text-red-500 text-xs p-3 uppercase tracking-wide">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                    {t.auth.name}
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border-b border-neutral-300 py-2 text-sm focus:border-black focus:outline-none transition-colors bg-transparent placeholder:text-neutral-300"
                    placeholder={t.auth.name.toUpperCase()}
                    required={!isLogin}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                    {t.auth.surname}
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border-b border-neutral-300 py-2 text-sm focus:border-black focus:outline-none transition-colors bg-transparent placeholder:text-neutral-300"
                    placeholder={t.auth.surname.toUpperCase()}
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                {t.auth.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-neutral-300 py-2 text-sm focus:border-black focus:outline-none transition-colors bg-transparent placeholder:text-neutral-300"
                placeholder="TU@EMAIL.COM"
                required
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  {t.auth.password}
                </label>
                {isLogin && (
                  <button type="button" className="text-[10px] uppercase text-neutral-400 hover:text-black transition-colors">
                    {t.auth.forgot_password}
                  </button>
                )}
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-neutral-300 py-2 text-sm focus:border-black focus:outline-none transition-colors bg-transparent placeholder:text-neutral-300"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white mt-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Cargando..." : (isLogin ? t.auth.submit_login : t.auth.submit_register)}
              {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          {/* Helper Text */}
          <p className="text-[10px] text-neutral-400 text-center leading-relaxed uppercase tracking-wide">
            {isLogin
              ? t.auth.login_desc
              : t.auth.register_desc}
          </p>
        </div>
      </div>
    </main>
  );
}

