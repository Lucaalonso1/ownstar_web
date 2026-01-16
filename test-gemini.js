// Script de prueba para verificar la API key de Google Gemini
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGeminiAPI() {
  try {
    // Intentar obtener la API key de diferentes fuentes
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY || 
                   process.env.GEMINI_API_KEY || 
                   process.env.GOOGLE_AI_API_KEY ||
                   process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('❌ No se encontró la API key de Gemini.');
      console.log('\n📝 Formas de configurar la API key:');
      console.log('1. Variable de entorno: GOOGLE_GEMINI_API_KEY');
      console.log('2. Variable de entorno: GEMINI_API_KEY');
      console.log('3. Variable de entorno: GOOGLE_AI_API_KEY');
      console.log('4. En Cursor: Settings > Features > AI Models > Google Gemini');
      console.log('\n💡 Si la configuraste en Cursor, puede que necesites reiniciar el editor.');
      return;
    }

    console.log('✅ API key encontrada');
    console.log(`🔑 Key (primeros 10 caracteres): ${apiKey.substring(0, 10)}...`);
    console.log('\n🧪 Probando conexión con Gemini 3 Pro...\n');

    // Inicializar el cliente de Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Intentar usar el modelo gemini-3.0-pro o gemini-pro
    let model;
    try {
      model = genAI.getGenerativeModel({ model: 'gemini-3.0-pro' });
      console.log('✅ Modelo gemini-3.0-pro encontrado');
    } catch (error) {
      try {
        model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        console.log('✅ Modelo gemini-pro encontrado (fallback)');
      } catch (error2) {
        throw new Error('No se pudo inicializar ningún modelo de Gemini');
      }
    }

    // Hacer una prueba simple
    const prompt = "Responde con solo 'Hola, funciono correctamente' en español.";
    
    console.log('📤 Enviando prompt de prueba...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('\n✅ ¡ÉXITO! La API key funciona correctamente.');
    console.log('\n📥 Respuesta del modelo:');
    console.log('─'.repeat(50));
    console.log(text);
    console.log('─'.repeat(50));
    
    // Información adicional
    console.log('\n📊 Información del modelo:');
    console.log(`   Modelo usado: ${model.modelName || 'gemini-3.0-pro'}`);
    console.log(`   Tokens usados: ${response.usageMetadata?.totalTokenCount || 'N/A'}`);

  } catch (error) {
    console.error('\n❌ Error al probar la API:');
    console.error('─'.repeat(50));
    
    if (error.message.includes('API_KEY_INVALID')) {
      console.error('🔴 La API key no es válida o ha expirado.');
      console.error('   Verifica que la key sea correcta en Google AI Studio.');
    } else if (error.message.includes('PERMISSION_DENIED')) {
      console.error('🔴 No tienes permisos para usar esta API key.');
      console.error('   Verifica los permisos en Google Cloud Console.');
    } else if (error.message.includes('QUOTA_EXCEEDED')) {
      console.error('🔴 Has excedido la cuota de la API.');
      console.error('   Verifica tu cuota en Google Cloud Console.');
    } else if (error.message.includes('MODEL_NOT_FOUND')) {
      console.error('🔴 El modelo gemini-3.0-pro no está disponible.');
      console.error('   Intenta con gemini-pro o verifica la disponibilidad del modelo.');
    } else {
      console.error(`🔴 ${error.message}`);
      console.error('\n📋 Detalles del error:');
      console.error(error);
    }
    
    console.error('─'.repeat(50));
  }
}

// Ejecutar la prueba
testGeminiAPI();

