# 11N Vaga General · Walkie-Talkie

Walkie-talkie y chat en el navegador para piquetes y movilizaciones. Sin cuenta, sin registro, sin servidor propio. En castellano y catalán.

## ▶ Abrir la app: https://mr-d0nut.github.io/Walkie/

## Uso (3 pasos)

1. Abre el enlace (o escanea el QR de quien ya está dentro) y pulsa **Entrar en el canal**. El nombre es opcional.
2. **Invitar** muestra un QR y un enlace: quien lo escanee entra directo en tu canal, sin escribir claves.
3. **Mantén el botón** para hablar y suelta para escuchar. Si no puedes mantenerlo (guantes, pancarta en la otra mano), activa «tocar en vez de mantener».

## Pensado para la calle

- **Avisos con ubicación**: 👮 Policía (azul), ⚠️ Altercado (negro), 🆘 SOS (rojo) y 📍 Estoy aquí (verde). Un toque inicia una cuenta atrás de 3 s (2 s en SOS) que se cancela con otro toque, para evitar avisos sin querer. Los demás ven una ventana pequeña con mapa, distancia y dirección hacia ti. No tapa el botón de hablar. Quien lo envía puede **anular** el aviso.
- **Sin cobertura**: los mensajes y avisos se guardan y salen solos al volver la conexión (hasta 3 min). La app se abre aunque no haya datos tras la primera visita.
- **Mensajes rápidos** de un toque («Todo bien», «Voy para allá», «Necesito relevo»…) y chat normal. Avisos de no leídos en la pestaña.
- **Modo oscuro** para la noche y **modo claro** para el sol; botones grandes y una sola mano.
- **⟲ repetir último** audio si no lo oíste con el ruido.
- El micrófono solo se activa mientras hablas. La pantalla se mantiene encendida mientras estás en el canal.
- **Salir y borrar mis datos** elimina del móvil la clave del canal y el nombre.
- Se puede «Añadir a pantalla de inicio» y se abre como una app.

## Cómo funciona

- Un solo `index.html` estático (más `qr.js`, `sw.js` y los iconos). Sin build.
- Voz (16 kHz, ADPCM), mensajes y avisos se cifran con AES-GCM con una clave derivada (PBKDF2) de la clave del canal.
- Viajan por brokers MQTT públicos (tres a la vez por redundancia). El broker solo ve datos cifrados. No se guarda historial.
- La ubicación solo se envía cuando pulsas un aviso, y solo al canal. Hace falta HTTPS y dar permiso al navegador.
- `?broker=wss://mi-broker/mqtt` permite usar un broker propio (recomendado para canales grandes).

## Límites conocidos

- Los brokers públicos son gratuitos y sin garantías: para convocatorias grandes conviene un broker propio y canales de pocas decenas de personas.
- Con el móvil bloqueado o la app en segundo plano el navegador corta el audio: hay que tener la app abierta.
- Móviles muy juntos pueden hacer eco entre sí: mejor con auriculares.
- Quien tenga la clave del canal ve los avisos y las ubicaciones: compártela solo con gente de confianza.
