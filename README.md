# 11N Vaga General · Walkie-Talkie

Walkie-talkie y chat en el navegador para piquetes y movilizaciones. Sin cuenta, sin registro, sin servidor propio y sin límite de usuarios en la app. En castellano y catalán.

## Publicar

Son archivos estáticos: sirve cualquier hosting (Cloudflare Pages, Netlify…). Sube el contenido de esta carpeta tal cual, sin comando de compilación y con el directorio de salida en la raíz. Los enlaces de invitación y los QR usan automáticamente la dirección donde esté publicada.

## Uso (3 pasos)

1. Abre el enlace (o escanea el QR de quien ya está dentro) y pulsa **Entrar en el canal**. El nombre es opcional.
2. **Invitar** muestra un QR y un enlace: quien lo escanee entra directo en tu canal, sin escribir claves.
3. **Mantén el botón** para hablar y suelta para escuchar. Si no puedes mantenerlo (guantes, pancarta en la otra mano), activa «tocar en vez de mantener».

## Pensado para la calle

- **Avisos con ubicación**: 👮 Policía (azul), ⚠️ Altercado (negro), 🆘 SOS (rojo) y 📍 Estoy aquí (verde). Un toque inicia una cuenta atrás de 3 s (2 s en SOS) que se cancela con otro toque, para evitar avisos sin querer. Los demás ven una ventana pequeña con mapa, distancia y dirección hacia ti. No tapa el botón de hablar. Quien lo envía puede **anular** el aviso.
- **Vuelve a entrar sola**: si el navegador recarga la página (pasa mucho en el móvil), la app entra otra vez en el canal en el que estabas, salvo que hubieras pulsado «salir».
- **Último aviso a la vista**: en la pantalla de radio queda una franja con el último aviso recibido (quién, hace cuánto, a qué distancia) durante 15 minutos.
- **Sin cobertura**: los mensajes y avisos se guardan y salen solos al volver la conexión (hasta 3 min). La app se abre aunque no haya datos tras la primera visita.
- **Mensajes rápidos** de un toque («Todo bien», «Voy para allá», «Necesito relevo»…) y chat normal. Avisos de no leídos en la pestaña.
- **Modo oscuro** para la noche y **modo claro** para el sol; botones grandes y una sola mano.
- **Salida de audio**: botón 🔊 Altavoz / 📞 Auricular junto al estado. Altavoz = manos libres con volumen reforzado; el micrófono solo se abre mientras hablas, así Android no pone el audio en «modo llamada» (que suena flojo). Auricular = modo llamada, privado, para pegar el móvil a la oreja.
- **El audio no se graba ni se guarda**: suena y desaparece. No hay historial de voz.
- El audio se reactiva solo con cualquier toque en la pantalla; si el navegador lo duerme y hace falta, sale un aviso naranja arriba del todo.
- El micrófono solo se activa mientras hablas. La pantalla se mantiene encendida mientras estás en el canal.
- **Salir y borrar mis datos** elimina del móvil la clave del canal y el nombre.
- Se puede «Añadir a pantalla de inicio» y se abre como una app.

## Cómo funciona

- Un solo `index.html` estático (más `qr.js`, `sw.js` y los iconos). Sin build.
- Voz (16 kHz, ADPCM), mensajes y avisos se cifran con AES-GCM con una clave derivada (PBKDF2) de la clave del canal.
- Viajan por brokers MQTT públicos (tres a la vez por redundancia). El broker solo ve datos cifrados. No se guarda historial.
- Cada paquete lleva la hora (sincronizada con el servidor, por si el reloj del móvil está mal). El audio con más de 60 s y los mensajes o avisos con más de 15 min se descartan: así un tercero que capture paquetes cifrados no puede volver a emitirlos más tarde.
- La captura de voz filtra los graves (viento, golpes en el micrófono).
- La ubicación solo se envía cuando pulsas un aviso, y solo al canal. Hace falta HTTPS y dar permiso al navegador.
- `?broker=wss://mi-broker/mqtt` permite usar un broker propio (recomendado para canales grandes).

## Límites conocidos

- La app no limita el número de personas, pero los brokers públicos son gratuitos y sin garantías: para convocatorias grandes conviene un broker propio con `?broker=`.
- Con el móvil bloqueado o la app en segundo plano el navegador corta el audio: hay que tener la app abierta.
- La elección auricular/altavoz depende del navegador: hay selección real de salida donde el navegador la ofrece (Chrome/Edge y Safari en iPhone reciente) y, si no, solo se ajusta el volumen. La app avisa de cuál ha podido aplicar.
- **iPhone**: hace falta iOS 16.4 o superior para elegir altavoz/auricular y para que suene con el interruptor de silencio puesto. En iPhone el micrófono queda abierto pero mudo mientras estás en el canal (así Safari no pregunta el permiso en cada pulsación), y al hablar hay un instante de espera hasta el pitido. Para tener la app a pantalla completa: Compartir → Añadir a pantalla de inicio.
- Móviles muy juntos pueden hacer eco entre sí: mejor con auriculares.
- Quien tenga la clave del canal ve los avisos y las ubicaciones: compártela solo con gente de confianza.
