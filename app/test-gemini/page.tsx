import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function TestGeminiPage() {
  // Intentar obtener la API key de diferentes fuentes
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY || 
                 process.env.GEMINI_API_KEY || 
                 process.env.GOOGLE_AI_API_KEY ||
                 process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY;

  let result: {
    success: boolean;
    message: string;
    details?: any;
    error?: string;
  };

  if (!apiKey) {
    result = {
      success: false,
      message: 'No se encontró la API key de Gemini',
      details: {
        variablesBuscadas: [
          'GOOGLE_GEMINI_API_KEY',
          'GEMINI_API_KEY',
          'GOOGLE_AI_API_KEY',
          'NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY'
        ]
      }
    };
  } else {
    try {
      console.log('🔑 API key encontrada, probando conexión...');
      
      const genAI = new GoogleGenerativeAI(apiKey);
      
      // Intentar usar gemini-3.0-pro primero, luego gemini-pro como fallback
      let model;
      let modelName = '';
      
      try {
        model = genAI.getGenerativeModel({ model: 'gemini-3.0-pro' });
        modelName = 'gemini-3.0-pro';
      } catch (error) {
        model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        modelName = 'gemini-pro';
      }

      const prompt = "Responde con solo 'Hola, funciono correctamente' en español.";
      const geminiResult = await model.generateContent(prompt);
      const response = await geminiResult.response;
      const text = response.text();

      result = {
        success: true,
        message: '¡La API key funciona correctamente!',
        details: {
          modeloUsado: modelName,
          respuesta: text,
          tokensUsados: response.usageMetadata?.totalTokenCount || 'N/A',
          apiKeyPreview: `${apiKey.substring(0, 10)}...`
        }
      };
    } catch (error: any) {
      let errorMessage = error.message || 'Error desconocido';
      
      if (errorMessage.includes('API_KEY_INVALID')) {
        errorMessage = 'La API key no es válida o ha expirado';
      } else if (errorMessage.includes('PERMISSION_DENIED')) {
        errorMessage = 'No tienes permisos para usar esta API key';
      } else if (errorMessage.includes('QUOTA_EXCEEDED')) {
        errorMessage = 'Has excedido la cuota de la API';
      } else if (errorMessage.includes('MODEL_NOT_FOUND')) {
        errorMessage = 'El modelo solicitado no está disponible';
      }

      result = {
        success: false,
        message: 'Error al conectar con Gemini',
        error: errorMessage,
        details: {
          errorCompleto: error.toString()
        }
      };
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Prueba de API Key - Google Gemini</h1>
        
        <div className={`p-6 rounded-lg border-2 ${
          result.success 
            ? 'bg-green-900/20 border-green-500' 
            : 'bg-red-900/20 border-red-500'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            {result.success ? (
              <span className="text-3xl">✅</span>
            ) : (
              <span className="text-3xl">❌</span>
            )}
            <h2 className="text-2xl font-semibold">{result.message}</h2>
          </div>

          {result.success && result.details && (
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Detalles:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Modelo usado:</strong> {result.details.modeloUsado}</li>
                  <li><strong>API Key (preview):</strong> {result.details.apiKeyPreview}</li>
                  <li><strong>Tokens usados:</strong> {result.details.tokensUsados}</li>
                </ul>
              </div>
              <div className="mt-4 p-4 bg-black/50 rounded">
                <h3 className="text-lg font-semibold mb-2">Respuesta del modelo:</h3>
                <p className="text-green-400">{result.details.respuesta}</p>
              </div>
            </div>
          )}

          {!result.success && (
            <div className="mt-6 space-y-4">
              {result.error && (
                <div className="p-4 bg-red-900/30 rounded">
                  <h3 className="text-lg font-semibold mb-2">Error:</h3>
                  <p className="text-red-300">{result.error}</p>
                </div>
              )}
              
              {result.details?.variablesBuscadas && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Variables de entorno buscadas:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    {result.details.variablesBuscadas.map((varName: string) => (
                      <li key={varName} className="font-mono text-sm">{varName}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-600 rounded">
                <h3 className="text-lg font-semibold mb-2">📝 Cómo configurar la API key:</h3>
                <ol className="list-decimal list-inside space-y-2 ml-2">
                  <li>Crea un archivo <code className="bg-black/50 px-2 py-1 rounded">.env.local</code> en la raíz del proyecto</li>
                  <li>Añade una de estas líneas:
                    <pre className="mt-2 p-3 bg-black/50 rounded text-sm overflow-x-auto">
{`GOOGLE_GEMINI_API_KEY=tu_api_key_aqui
# O alternativamente:
GEMINI_API_KEY=tu_api_key_aqui`}
                    </pre>
                  </li>
                  <li>Reinicia el servidor de desarrollo (<code className="bg-black/50 px-2 py-1 rounded">npm run dev</code>)</li>
                  <li>Recarga esta página</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500 rounded">
          <h3 className="text-lg font-semibold mb-2">💡 Nota sobre Cursor:</h3>
          <p className="text-sm">
            Si configuraste la API key en Cursor (Settings &gt; Features &gt; AI Models), 
            esa configuración es solo para el uso interno de Cursor. Para usar Gemini en tu aplicación Next.js, 
            necesitas configurarla como variable de entorno en el archivo <code className="bg-black/50 px-2 py-1 rounded">.env.local</code>.
          </p>
        </div>
      </div>
    </div>
  );
}

