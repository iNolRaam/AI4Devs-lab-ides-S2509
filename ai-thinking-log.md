Tu enfoque de trabajo con IA
Explica brevemente cómo abordas un proyecto desde cero cuando cuentas con un asistente de código.

1. ¿Cómo decides qué tareas dejar a la IA y cuáles asumir tú directamente?
Resp: Generalmente dejo a la IA las tareas de apoyo o automatización, mientras que yo asumo directamente la definición de la lógica de negocio, las validaciones importantes y las funcionalidades clave. Primero documento todo en un PRD (Product Requirements Document), que sirve como contexto y guía para la IA. En ese documento también incluyo la historia de usuario y los criterios de aceptación para asegurar una comprensión completa del alcance.

2. ¿Cómo defines el nivel de detalle del prompt?
Resp: El nivel de detalle del prompt depende de si tengo o no otros medios para proporcionar contexto. Si no los tengo, el prompt debe ser muy detallado según la complejidad de la tarea. En mi caso, utilicé un prompt diseñado para que GitHub Copilot trabajara como Kiro (un IDE experimental impulsado por IA desarrollado por AWS). Para ello, trabajé mediante slash commands, por ejemplo:

- /start feature
	Inicializa la carpeta /memory-bank/<name>/ con:
	prd.md
	design.md
	tasks.md
	context.md
	→ Confirma la configuración y pausa para la carga del PRD

- /approve prd
- /implement <TASK_ID>
	Implementa una tarea mostrando:
	Plan de archivos
	Cambios en bloques diff
	Pruebas en bloques code
	Finaliza con /review complete

- /review complete
	Confirma la salida final y espera el siguiente comando

- /update memory bank
	Revisa y actualiza los archivos de memoria principales:
	activeContext.md
	progress.md
	copilot-rules.md

Además, complementé todo esto con un memory bank que incluía los siguientes archivos de contexto: (projectbrief.md, productContext.md, systemPatterns.md, techContext.md, activeContext.md, progress.md, copilot-rules.md)

Por todo esto mis prompt despues de decirle que actuara como KIRO mis prompts eran bastantes simples usando slash commands.

3. ¿Qué aprendiste sobre el equilibrio entre delegar y razonar?
Resp: Aprendí que mi papel principal consistió en desarrollar claramente la idea, definir los alcances y establecer las limitaciones. Una vez que tuve la visión bien estructurada y enfocada en resolver la necesidad, delegué la parte técnica al asistente, quien se encargó de la configuración, la programación, el diseño de la solución y la creación de las pruebas.
Mi tarea fue supervisar paso a paso que el asistente cumpliera con lo esperado, asegurando que cada entrega respondiera a la historia de usuario. Aunque no tenía experiencia previa con esa tecnología, mi enfoque se centró en validar desde la perspectiva del cliente que la solución realmente cubriera la necesidad planteada.


Aplicación práctica de lo aprendido en sesiones pasadas
Reflexiona sobre los conceptos vistos anteriormente (prompts efectivos, refinamiento, roles, iteraciones, testing, etc.)
¿Qué técnicas aplicaste?
Resp: Para generar la documentación, primero escribí las ideas principales y luego elaboré un prompt en el que definí el role, las instrucciones y el contexto, con el objetivo de que la IA me ayudara a crear el PRD desde la perspectiva de un arquitecto de software. Además, estructuré el proceso dividiéndolo en subtareas, lo que me permitió revisar y refinar cada paso dentro de mi flujo de trabajo: desde la definición de requerimientos hasta la implementación y las pruebas.



¿Qué cambió en tu forma de escribir prompts o estructurar el proyecto?
Resp: En este caso, mi forma de trabajar cambió por completo al incorporar el concepto de memory bank. Gracias a ello, el asistente contaba con un contexto más amplio sobre lo que buscaba desarrollar, sin necesidad de proporcionarle tanta información en cada nuevo prompt o sesión. Esto hizo el proceso más fluido y coherente entre iteraciones.


¿Qué hábitos mantuviste o mejoraste?
Resp: Mantuve la misma forma de generar los prompts y la división en subtareas para conservar el control sobre lo que el asistente de IA modificaba. Sin embargo, mejoré la manera de establecer y refinar el memory bank, organizando mejor la información clave y el contexto que el asistente necesitaba para trabajar con mayor precisión y coherencia en todo el proyecto.


Tu colaboración con la IA durante este ejercicio
Describe cómo fue la interacción: 
Resp: Una vez que proporcioné todo el contexto sobre lo que esperaba crear, el proceso fue bastante rápido, ya que el propio asistente se encargó de actualizar el memory bank de forma automática conforme avanzábamos en las tareas. La interacción fue fluida y eficiente, permitiéndome concentrarme más en la validación de resultados que en los detalles operativos.

¿Qué funcionó bien o te sorprendió?
Resp: Me sorprendió la autonomía que alcanzó el asistente al contar con un memory bank bien definido. Con el contexto suficiente, pudo trabajar de manera más independiente y coherente, reduciendo la necesidad de repetir instrucciones o aclaraciones en cada iteración.

¿En qué momento la IA no entendió el contexto?
Resp: Hubo un momento en que el asistente dejó de comportarse como un agente activo y comenzó a dar sugerencias en el chat en lugar de aplicar directamente las modificaciones al código. Lo resolví iniciando una nueva sesión y agregando el #codebase al inicio para restablecer el contexto y retomar el flujo de trabajo correcto.

¿Qué ajustes hiciste para lograr mejores resultados?
Resp: Reorganicé toda la estructura del memory bank y generé documentación complementaria para que el asistente contara con un contexto más completo y consistente. Esto mejoró notablemente la precisión de sus respuestas y la coherencia entre sesiones.


Decisiones técnicas y de diseño
Explica brevemente las principales decisiones que tomaste en backend, frontend y base de datos.
Indica qué herramientas o frameworks seleccionaste y por qué.
Resp:
- Tecnologías utilizadas:
	Frontend: React (Create React App), TypeScript, React Testing Library, Jest.
	Backend: Node.js, Express, TypeScript, Jest, Supertest.
	ORM: Prisma 5 (cliente type-safe con manejo de migraciones).
	Base de datos: PostgreSQL (contenedorizada con Docker para desarrollo local).
	Tooling: ESLint, Prettier, dotenv, ts-node-dev.

- ¿Por qué?
	Estas herramientas fueron las definidas en el branch del proyecto y ofrecen un entorno moderno, escalable y compatible con las buenas prácticas de desarrollo en TypeScript.


Menciona cualquier decisión arquitectónica relevante (estructuras, dependencias, convenciones, etc.).
Resp: En mis copilot rules definí que el asistente debía seguir principios de Clean Architecture y DDD, junto con las siguientes buenas prácticas:
- Aplicar TDD en el desarrollo.
- Usar buenas prácticas de TypeScript, React, Node y Express.
- Mantener el diseño de base de datos siguiendo las mejores prácticas de PostgreSQL.
- Cumplir con los principios SOLID, KISS y YAGNI.

Aprendizajes y próximos pasos
Cierra con una reflexión personal:
¿Qué descubriste sobre ti y tu forma de trabajar con IA?
Resp: Descubrí que el uso del memory bank mejora significativamente la comprensión del asistente sobre mis requerimientos, reduciendo las alucinaciones y aumentando la precisión de sus respuestas. Además, al dividir el trabajo en subtareas, puedo revisar cada paso de manera más detallada y menos agotadora, lo que mejora la calidad del resultado final.

¿Qué te gustaría mejorar para el siguiente ejercicio o proyecto?
Resp: Me gustaría mejorar mi forma de trabajo aplicando todo lo aprendido, especialmente en la forma de estructurar mis prompts y en el nivel de detalle de mi memory bank. Quiero optimizar cómo organizo y construyo los documentos que lo conforman, para que el asistente tenga un contexto más claro y completo desde el inicio. Además, planeo trabajar con requerimientos más complejos y reglas más estrictas, lo que me permitirá poner a prueba la solidez de mi flujo de trabajo y la capacidad de adaptación de la IA.