<h1 align="center">Welcome to nodepop 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.0-blue.svg?cacheSeconds=2592000" />
</p>

## Install

```sh
npm install
```

## Enviroment variables config

Rename .env.example to .env and check the settings 

## Load initial data

For loading initial data you need a file called datos.json with this structure:

[
  {
    "name": "patinete",
    "onSale": true,
    "price": 250,
    "photo": "/images/patinete.jpg",
      "tags": [
        "lifestyle",
        "motor"
      ]
  }
]

Once you have it, you can load the databases with this initial data with:

```sh
npm run init-db
```

**Warning! this script delete database contents before the load.**

Use in production only in the first deployment.


## Usage

```sh
npm start
```

## Development start

```sh
npm run dev
```

## API Methods

### Advices list

GET /apiv1/anuncios

Available filters:

* http://localhost:3000/apiv1/anuncios?name=patin       --> name starting by **Also available on index website** 
* http://localhost:3000/apiv1/anuncios?sort=price       --> sort by **Also available on index website** 
* http://localhost:3000/apiv1/anuncios?tags=motor       --> tags
* http://localhost:3000/apiv1/anuncios?onSale=true      --> for sale / wanted
* http://localhost:3000/apiv1/anuncios?price=-620       --> price lower than
* http://localhost:3000/apiv1/anuncios?price=620-       --> price greater than
* http://localhost:3000/apiv1/anuncios?price=620-800    --> price range
* http://localhost:3000/apiv1/anuncios?limit=3          --> shows the first 3 items
* http://localhost:3000/apiv1/anuncios?limit=5&start=1  --> shows from de 2nd item to the 6th


### Get one advice

GET /apiv1/anuncios/_id

{
  "result": {

    "tags": [

      "work",
      "lifestyle"

    ],

    "_id": "5f5d298cf201c44ab4f41c70",

    "name": "pc",

    "onSale": false,

    "price": 620,

    "photo": "/images/portatil.jpg",
    
    "__v": 0

  }  
}

## Create an advice

POST apiv1/anuncios body: {name: 'cámara', onSale: true, price: 250, photo: 'imagen.jpg', tags: 'work, lifestyle'}

{
  "result": {

    "tags": [

      "work",
      "lifestyle"

    ],

    "_id": "5f5d298cf201c44ab4f41c71",

    "name": "cámara",

    "onSale": true,

    "price": 250,

    "photo": "/images/imagen.jpg",

    "__v": 0

  }
}

## Author

👤 **Andrea G. Aristegui**

* Github: [@andiarist](https://github.com/andiarist)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_