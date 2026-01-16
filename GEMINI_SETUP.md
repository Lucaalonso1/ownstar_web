# Configuración de Google Gemini API

## Cómo verificar que tu API key funciona

### Opción 1: Usar la página de prueba (Recomendado)

1. **Configura la API key en un archivo `.env.local`** en la raíz del proyecto:
   ```env
   GOOGLE_GEMINI_API_KEY=tu_api_key_aqui
   ```

2. **Inicia el servidor de desarrollo** (si no está corriendo):
   ```bash
   npm run dev
   ```

3. **Abre en tu navegador**:
   ```
   http://localhost:3000/test-gemini
   ```

4. La página te mostrará si la API key funciona correctamente o si hay algún error.

### Opción 2: Usar el script de prueba

1. **Configura la API key como variable de entorno**:
   ```bash
   export GOOGLE_GEMINI_API_KEY=tu_api_key_aqui
   ```

2. **Ejecuta el script de prueba**:
   ```bash
   node test-gemini.js
   ```

## Variables de entorno soportadas

El proyecto busca la API key en estas variables (en orden de prioridad):
- `GOOGLE_GEMINI_API_KEY` (recomendado)
- `GEMINI_API_KEY`
- `GOOGLE_AI_API_KEY`
- `NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY`

## Nota importante

Si configuraste la API key en **Cursor** (Settings > Features > AI Models > Google Gemini), esa configuración es solo para el uso interno de Cursor con sus funciones de IA. 

Para usar Gemini en tu aplicación Next.js, **debes configurarla como variable de entorno** en el archivo `.env.local`.

## Obtener tu API key

1. Ve a [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Crea una nueva API key
4. Copia la key y añádela a tu archivo `.env.local`

## Modelos disponibles

- `gemini-3.0-pro` (si está disponible)
- `gemini-pro` (fallback)

