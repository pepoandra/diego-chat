# Server

> fua el diego

---

Este es un pequeño servidor Node usando Express que tiene solamente un endpoint.

El endpoint toma un mensaje como parametro & devuelve las sabias palabras del Diego.

### Que es todo esto?

Basicamente, esto es un chatbot que se entrena leyendo textos `.txt` que esten en la carpeta `textos`. 

### Como correr

Todo lo que hay que hacer para arrancar el servidor es 
> npm run start

### Como entrenar al Diego
Para entrenar al Diego a hablar, hay que poner archivos `.txt` en la carpeta `textos` & correr

> npm run build

### Que son estos archivos?

|   Archivo | Funcion           |   
|----------|:-------------:
| build_dictionary.py |  Python script original para construir result.json 
| buildDictionary.js |   Node script para construit result.json, pa q todo sea node   
| index.js | Servidor con la definicion del endpoint y la funcion que genera el mensaje
| package.json | Archivo de NPM que organiza las dependencias y las acciones
| package-lock.json | Archivo de NPM que lista las dependencias instaladas
| README.md | Este archivo
|result.json | Diccionario de palabras que El Diego conoce
