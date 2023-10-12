# Bego_Back_Tech_Interview

## Opiniones y FeedBack

Desde mi punto de vista aun quedan muchos aspectos a cubrir ,por ejemplo:

- Cuando se actualiza una orden ,de momento solo se limita a cuanto esta como "pending" (Me gustaria indagar mas y hacerla mas segura y limitada)
- Un documento para trabajar errors y asi tener mejores mensajes de respuesta
- Reducir codigo en el bloque routes pues se puede optimizar
- NO RECAER EN ANY (Puedo asegurar mas la entrada de valores)

**De igual forma gracias por leer esto,ten un buen dia**

Nota:los archivos Json resultantes de esta prueva estan en la carpeta jsons

## Aspectos para la prueba

### Usuarios

- SignUp
  > A teaves del endpoint en insomnia con el metodo **POST** http://localhost:{n}/users
  > Con un cuerpo como este:

```
{
 "email": "correo@ejemplo.com",
 "name":'usuario_tes',
 "password": "contraseña_secreta"
}
```

- LogIn
  > A teaves del endpoint en insomnia con el metodo **POST** http://localhost:{n}/users/logIn
  > Con un cuerpo como este:

```

 {
  "email": "correo@ejemplo.com",
  "password": "contraseña_secreta"
}

```

Este te proporcionara un jwt en la respuesta del cuerpo

`Para poder acceder a los EP de la siguiente seccion se requiere LogIn,el cual tiene un tiempo limite de 1h`

### Points

- Traer los Points
  > A teaves del endpoint en insomnia con el metodo **GET** http://localhost:{n}/points

### Orders

- CRUD Completo
  > Pra los modelos me tome algunas libertades el modelo es el siguiente

```
userId: { type: Schema.Types.ObjectId, ref: 'User' },
  kind: { type: String, enum: ['express', 'standard', 'international'] },
  description: String,
  weight: Number,
  route: {
    pickUp: { type: Schema.Types.ObjectId, ref: 'Point' },
    DropOff: { type: Schema.Types.ObjectId, ref: 'Point' },
  },
  status: {
    type: String,
    enum: ['pending', 'inProgress', 'complete', 'failed'],
  },
  truck: { type: Schema.Types.ObjectId, ref: 'Truck' },

```

- Create

  > Pra crear una Orden nueva se devera hacer con el metodo **POST** a la liga http://localhost:{n}/my_orders
  > Recuerdo que a travez del header se debera mandar una propiedad llamada **jwtoken** donde ira el token anteriormene conseguido

  ```
  {

  "kind": "express",
  "description": "Por favor ponerce en contacto conmigo",
  "weight": 5800,
  "route": "6526f22f7a83b36d1213963a",
  "status": "pending",
  "truck": "647e7fd008f76ab0e20a6c9c"
  }
  ```

- Read
  > Aqui hay 2 Read options ,
  - Traer todos las ordenes asociadas
    > Para este caso se requiere el metodo **GET** a la ruta http://localhost:{n}/my_orders
  - Traer una orden en especifico
    > Para este caso se requiere el metodo **GET** a la ruta http://localhost:{n}/my_orders/:id
    > El aspecto :id es el id de la orden
- Update

  > Para actualizar este campo es con el metodo **PUT** a la ruta http://localhost:{n}/my_orders/:id
  > Con un cuerpo como el siguiente

  ```
  {
    "order":{
      	"_id":"652743121ea03e26e733548d",
        "userId": "6525f9169825f28be42c2860",
        "kind": "express",
        "description": "Test no2",
        "weight": 2800,
        "route":
                {
                "pickUp": "6480d4a2665cefa2836dff01",
                "DropOff": "6480d4d0665cefa2836dff02"
                },
        "status": "pending"
      }
  }
  ```

- Delete
  > Para eliminar este campo es con el metodo **DELETE** a la ruta http://localhost:{n}/my_orders/:id

### Routes

- CRUD Completo
  > Pra los modelos me tome algunas libertades el modelo es el siguiente

```
  pointA: { type: Schema.Types.ObjectId, ref: 'Point' },
  pointB: { type: Schema.Types.ObjectId, ref: 'Point' },
  routeTo: String,
  kilometers: Number,

```

- Create

  > Pra crear una Orden nueva se devera hacer con el metodo **POST** a la liga http://localhost:{n}/my_routes
  > Recuerdo que a travez del header se debera mandar una propiedad llamada **jwtoken** donde ira el token anteriormene conseguido

  ```
  {
  "pointA":"6480d4f3665cefa2836dff03",
  "pointB":"6480d521665cefa2836dff04",
  }
  ```

- Read
  > Aqui hay 2 Read options ,
  - Traer todos las ordenes asociadas
    > Para este caso se requiere el metodo **GET** a la ruta http://localhost:{n}/my_routes
  - Traer una orden en especifico
    > Para este caso se requiere el metodo **GET** a la ruta http://localhost:{n}/my_routes/:id
    > El aspecto :id es el id de la orden
- Update

  > Para actualizar este campo es con el metodo **PUT** a la ruta http://localhost:{n}/my_routes/:id
  > Con un cuerpo como el siguiente

  ```
  {
  "route":{
  	"_id":"6526f22f7a83b36d1213963a",
  "pointA":"6480d4f3665cefa2836dff03",
  "pointB":"6480d521665cefa2836dff04",
  	"routeTo":"De Parador - Centro Recreativo Camioneros Río Negro a Puerto Madero, CABA",
  	"kilometers":1118
  }

  }
  ```

- Delete
  > Para eliminar este campo es con el metodo **DELETE** a la ruta http://localhost:{n}/my_routes/:id

### Trucks

- Traer los Points
  > A teaves del endpoint en insomnia con el metodo **GET** a http://localhost:{n}/trucks

```

```
