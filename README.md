# Instalación y ejecución
Para ejecutar la página web es necesario instalar:
- [Node](https://nodejs.org/en/download/source-code)

Con Node instalado tan solo queda clonar el repositorio y ejecutar los siguientes comandos:
- Clonar el repositorio desde GitHub
```bash
git clone https://github.com/NicolasLeribleUMA/hackerweekers.git
```
- Acceder a la carpeta /web dentro del directorio del proyecto:
```bash
cd hackerweekers\web
```
- Instalar las dependencias de package.json y package-lock.json:
```bash
npm install
```
- Con las dependencias ya instaladas, ejecutar la aplicación web:
```bash
npm run dev
```

Tras ejecutar el comando debe aparecer "Starting..." seguido de un "Ready in X.Xs". Una vez aparezca el mensaje "Ready in X.Xs" se podrá acceder a la aplicación web mediante la dirección local, en nuestro caso http://localhost:3000

# Memoria
## Gestión del equipo

Nuestro equipo está compuesto por cinco mienbros, cuatro estudiantes del Grado en Ingeniería del Software y una estudiante del Doble Grado en Ing. Informática + Matemáticas. Tras analizar el problema que debíamos resolver, decidimos subdividirnos en dos grupos; un par de nosotros se han dedicado a desarrollar el servidor web, mientras que el resto de miembros han configurado y desarrollado la base de datos y la REST API desde la plataforma Oracle Cloud.

Dado el poco tiempo del que disponíamos para resolver el reto, seguimos una dinámica de desarrollo concurrente en la que el equipo del frontend y el backend hemos trabajo de forma independiente, reuniéndonos en aquellos momentos en los que hubiese que tomar una decisión sobre la arquitectura de la base de datos o el diseño de una funcionalidad del servidor web.

Esta metodología de trabajo nos ha permitido avanzar bastante en el diseño de la interfaz, aunque nos ha traído algunos problemas en el momento de conectar el servidor web con la API de la base de datos al no haberlo hecho al principio de la configuración del servidor web. A pesar de estas dificultades, eventualmente conseguimos conectar ambos servicios y mostrarlos correctamente en nuestra aplicación.

## Fase 1:

El primer paso que seguimos para resolver la primera fase fue analizar los datos que se nos habían entregado. Hicimos una lectura extensiva de las fuentes de datos, sus atributos y las similitudes que existían entre ellos. Desconocíamos el formato .tsv, y fue curioso descubrir que se comportaba igual que un .csv pero con un delimitador diferente. A continuación cargamos los datos en tres tablas diferentes en la infraestructura OCI de Oracle sin muchas dificultades.

Una vez cargados, decidimos unir las tablas de "AGUA" y "EMBALSES" con "LISTADO_EMBALSES" creando una columna nueva en esta última tabla, llamada "ID_EMBALSE". En esta ID guardamos el valor de ID de la tabla Embalses (valor con el que se relacionan las dos tablas anteriores) utilizando como referencia la columna "NOMBRE", comparando la columna "NOMBRE" con "EMBALSE_NOMBRE" y asignando el valor de "ID_EMBALSE" en el caso de que tuviesen el mismo nombre. Esto nos resolvió una parte del problema, pero nos descubrió que casi la mitad de los datos no tenían el mismo formato en una tabla y otra. Indagando más en este problema, descubrimos que habían tres posibles casos:

- El nombre del embalse contenía tíldes en una de las tablas, pero en la otra no.
- El nombre del embalse tenía un formato diferente en las dos tablas (por ejemplo, "LAGO NEGRO" vs "NEGRO (LAGO)").
- El embalse existía en la tabla "LISTADO_EMBALSES", pero no en la tabla "EMBALSES".

Para solucionar el problema, primero ejecutamos una sentencia SQL que traduce todas las tildes por las vocales correspondientes. Tras volver a ejecutar el script de comparación de los nombres entre las tablas y conseguimos modificar muchas entradas, pero permanecían todavía varias sin reconocer. En el caso de los embalses que no existen en la otra tabla, su ID se ha dejado como nula. En el caso de aquellas cuyo formato era diferente, decidimos asignar las IDs a mano en aquellos embalses que estuviesen dentro de Andalucía; dado que era muy complicado aplicar una expresión regular que comprobase si eran similares dada la heterogeneidad en los formatos. De esta forma conseguimos asignar la relación (si la había) entre las tres tablas de la base de datos.   

## Fase 2:
### Realización de la aplicación web
Para el desarrollo del front-end de nuestra aplicación web, hemos utilizado el framework [Next.js](https://github.com/vercel/next.js/), poniendo especial atención en la accesibilidad, la usabilidad y el diseño responsive.

Desde los primeros bocetos, decidimos centrar el diseño de la aplicación en que el usuario navegue dentro de una única página o vista, evitando posibles desorientaciones al moverse por diferentes secciones de la web. Este enfoque permite ofrecer una experiencia de usuario prácticamente idéntica tanto en plataformas de escritorio como en dispositivos móviles.

En cuanto a la accesibilidad, la aplicación incluye varios temas que mejoran la experiencia del usuario. Estos temas son: modo claro, modo oscuro y modo daltónico. Los modos claro y oscuro siguen el estilo común ya existente en muchas páginas web, mientras que el modo daltónico ofrece una paleta de colores basada en el amarillo y el morado. Esta combinación permite a las personas con cualquier tipo de daltonismo distinguir los colores con facilidad. Esto se debe a la diferencia marcada en tono y saturación entre el amarillo y el morado, lo que facilita su distinción en cualquier tipo de daltonismo.

<img src="https://github.com/user-attachments/assets/85d737e6-957a-4ea2-9ac4-8a0d8e9bd20e" style="width: 200px">


Además de la adaptación cromática, se ha implementado la opción de cambiar la fuente a una diseñada para facilitar, en principio, la lectura a personas con dislexia, permitiendo que cada usuario seleccione la fuente con la que se sienta más cómodo.

Por último, como se ha mencionado anteriormente, la intención de limitar la navegación a una sola vista se apoya en la práctica [Breadcrumb](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/examples/breadcrumb/), además de proporcionar un botón "Volver" para aquellos usuarios que no estén familiarizados con este concepto.

La página se adapta adecuadamente tanto en dispositivos móviles como en escritorio. Además, los elementos que lo requieren disponen de textos alternativos para ser compatibles con lectores de pantalla, ofreciendo así una alternativa accesible para usuarios con visión reducida.
