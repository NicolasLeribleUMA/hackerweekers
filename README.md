# Instalación

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
Prueba


























