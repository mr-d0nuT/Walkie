# mr_dOnuT WALKIE-TALKIE

Walkie-talkie y chat en el navegador para grupos: excursiones, eventos, equipos, familia o amigos. Sin cuenta, sin registro, sin servidor propio y sin límite de usuarios en la app. En castellano y catalán.

## Publicar

Son archivos estáticos: sirve cualquier hosting (Cloudflare Pages, Netlify…). Sube el contenido de esta carpeta tal cual, sin comando de compilación y con el directorio de salida en la raíz. Los enlaces de invitación y los QR usan automáticamente la dirección donde esté publicada.

## Uso (3 pasos)

1. Abre el enlace (o escanea el QR de quien ya está dentro) y escribe tu nombre (obligatorio) y pulsa **Entrar en el canal**.
2. **Invitar** muestra un QR y un enlace: quien lo escanee entra directo en tu canal, sin escribir claves.
3. **Mantén el botón** para hablar y suelta para escuchar. Si no puedes mantenerlo (guantes, manos ocupadas), activa «tocar en vez de mantener».

## Pensado para la calle

- **Avisos con ubicación**: 🚑 Médico (azul), ⚠️ Incidencia (negro), 🆘 SOS (rojo) y 📍 Estoy aquí (verde). Un toque inicia una cuenta atrás de 3 s (2 s en SOS) que se cancela con otro toque, para evitar avisos sin querer. Los demás ven una ventana pequeña con mapa, distancia y dirección hacia ti, y un botón grande para abrir el mapa. No tapa el botón de hablar. Quien lo envía puede **anular** el aviso.
- **Pantalla apagada (Android)**: mientras estás en el canal la app reproduce en bucle un audio inaudible, como hace una radio online, para que el sistema no la duerma con la pantalla apagada. Aparece una ficha «Walkie-Talkie» en la pantalla de bloqueo. Para hablar hay que encender la pantalla. Al volver a encenderla, el chat dice cuánto estuvo apagada, si la app siguió escuchando y cuántas transmisiones recibió.
- **Botón grande «Abrir mapa»** en cada aviso con ubicación: abre la app de mapas del móvil con un pin en el punto.
- **Vuelve a entrar sola**: si el navegador recarga la página (pasa mucho en el móvil), la app entra otra vez en el canal en el que estabas, salvo que hubieras salido con la papelera.
- **Último aviso a la vista**: en la pantalla de radio queda una franja con el último aviso recibido (quién, hace cuánto, a qué distancia) durante 15 minutos.
- **Sin cobertura**: los mensajes y avisos se guardan y salen solos al volver la conexión (hasta 3 min). La app se abre aunque no haya datos tras la primera visita.
- **Mensajes rápidos** de un toque («Todo bien», «Voy para allá», «¿Dónde estáis?»…) y chat normal. Avisos de no leídos en la pestaña.
- **Modo oscuro** para la noche y **modo claro** para el sol; botones grandes y una sola mano.
- **Salida de audio**: botón 🔊 Altavoz / 📞 Auricular junto al estado. Altavoz = manos libres con volumen reforzado; el micrófono solo se abre mientras hablas, así Android no pone el audio en «modo llamada» (que suena flojo). Auricular = modo llamada, privado, para pegar el móvil a la oreja.
- **Por defecto el audio no se graba**: suena y desaparece. Cada persona puede activar **REC** en su móvil (botón redondo junto a «Altavoz»): entonces los mensajes de voz que envíe y reciba quedan en su pestaña de chat con ▶ para volver a oírlos. Las grabaciones están solo en la memoria de ese móvil (máximo 40) y se pierden al recargar o al salir. Quien no lo activa no guarda nada.
- El audio se reactiva solo con cualquier toque en la pantalla; si el navegador lo duerme y hace falta, sale un aviso naranja arriba del todo.
- El micrófono solo se activa mientras hablas. La pantalla se mantiene encendida mientras estás en el canal.
- **Papelera 🗑️** (arriba, junto a «invitar»): es la forma de salir del canal. Pide confirmación y borra del móvil la clave del canal y el nombre.
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

- La app no limita el número de personas, pero los brokers públicos son gratuitos y sin garantías: para grupos muy grandes conviene un broker propio con `?broker=`.
- Escuchar con la pantalla apagada depende del navegador y del sistema, no está garantizado: en Android suele funcionar si el ahorro de batería no restringe el navegador (Ajustes → Aplicaciones → Chrome → Batería → Sin restricciones). En iPhone, Safari suele detener las webs al bloquear: allí conviene dejar la pantalla encendida.
- La elección auricular/altavoz depende del navegador: hay selección real de salida donde el navegador la ofrece (Chrome/Edge y Safari en iPhone reciente) y, si no, solo se ajusta el volumen. La app avisa de cuál ha podido aplicar.
- **iPhone**: hace falta iOS 16.4 o superior para elegir altavoz/auricular y para que suene con el interruptor de silencio puesto. En iPhone el micrófono queda abierto pero mudo mientras estás en el canal (así Safari no pregunta el permiso en cada pulsación), y al hablar hay un instante de espera hasta el pitido. Para tener la app a pantalla completa: Compartir → Añadir a pantalla de inicio.
- Móviles muy juntos pueden hacer eco entre sí: mejor con auriculares.
- Quien tenga la clave del canal ve los avisos y las ubicaciones: compártela solo con gente de confianza.

## Autoría

Obra original de mr-d0nuT. Todos los derechos reservados; no se concede licencia de uso ni de copia. Detalles y pruebas en [AUTORIA.md](AUTORIA.md).
