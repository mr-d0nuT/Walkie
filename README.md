# Walkie (ONDA)

Walkie-talkie pulsar-para-hablar en el navegador. Sin cuenta, sin registro, sin servidor propio.

**Probar:** https://mr-d0nut.github.io/Walkie/

- Elige una clave de canal (o genera una), pon un indicativo y entra. Comparte el enlace con «invitar».
- Mantén el botón (o la barra espaciadora) para hablar. «Bloqueo» lo convierte en tocar para hablar/soltar.
- El registro guarda las últimas transmisiones para volver a escucharlas (▶).

## Cómo funciona

- Un solo archivo estático (`index.html`), sin dependencias.
- La voz se captura a 16 kHz, se comprime con ADPCM y se cifra con AES-GCM usando una clave derivada (PBKDF2) de la clave del canal.
- Los paquetes viajan por brokers MQTT públicos (se usan varios a la vez por redundancia). El broker solo ve datos cifrados y un identificador de canal derivado, nunca la clave.
- `?broker=wss://mi-broker/mqtt` permite usar un broker propio.
