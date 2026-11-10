# 11N Vaga General · Walkie-Talkie

Walkie-talkie y chat en el navegador. Sin cuenta, sin registro, sin servidor propio.

## ▶ Abrir la app: https://mr-d0nut.github.io/Walkie/

## Uso (3 pasos)

1. Abre el enlace, pon tu nombre y pulsa **Entrar en el canal** (usa la clave que te pasen, o genera una con ↻).
2. Pulsa **invitar** para compartir el enlace del canal: quien lo abra entra directo.
3. **Mantén el botón** (o la barra espaciadora) para hablar. Suelta para escuchar.

- **Chat**: escribe mensajes en el panel del canal.
- **Avisos con ubicación**: 👮 Policía (azul), ⚠️ Altercado (negro), 🆘 SOS (rojo). Se pulsan dos veces (confirmar) y todos reciben una ventana pequeña con mapa y enlace. No tapa el botón de hablar y se cierra sola.
- **Bloqueo**: convierte «mantener» en «tocar para hablar / tocar para soltar».
- En el móvil se puede «Añadir a pantalla de inicio» y se abre como una app.

## Cómo funciona

- Un solo `index.html` estático, sin dependencias ni build.
- La voz (16 kHz, ADPCM), los mensajes y los avisos se cifran con AES-GCM usando una clave derivada (PBKDF2) de la clave del canal.
- Viajan por brokers MQTT públicos (varios a la vez por redundancia). El broker solo ve datos cifrados.
- La ubicación solo se envía cuando pulsas un aviso, y solo al canal. Hace falta HTTPS y dar permiso al navegador.
- `?broker=wss://mi-broker/mqtt` permite usar un broker propio.
