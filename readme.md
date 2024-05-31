# Rustic Pasta webbtjänst/backend

Denna repo är en webbtjänst byggd med node.js, express och sequelize. Webbtjänsten kommunicerar med en MariaDB-databas för att hantera kategorier, menyartiklar, kunder, beställningar, beställningsartiklar, öppettider, statusar, registrering och användarautentisering.

[Livedemo av webbplatsen](https://rusticpasta.bayville.se/)

[GitHub-repo för frontend](https://github.com/bayville/dt207g-projekt-frontend-rusticpasta)

## Installation
Innan du använder webbtjänsten, se till att fylla i .env inkulise JWT_SECRET, se .env.sample. Klona ner filerna och kör npm install. Det krävs att du har node.js installerat på din dator.

```bash
git clone https://github.com/bayville/dt207g-projekt-backend.git
npm install
```


## API-struktur

### Databasmodeller

- **Category**: Hanterar mat kategorier.
- **Customer**: Hanterar kundinformation.
- **MenuItem**: Hanterar individuella menyartiklar.
- **Order**: Hanterar kundbeställningar.
- **OrderItem**: Hanterar artiklar inom en beställning.
- **OpenHours**: Hanterar restaurangens öppettider.
- **Status**: Hanterar status för beställningar.
- **User**: Hanterar användarautentisering.

### Endpoints

#### Användare

| Request | Endpoint                  | Beskrivning                                    |
|---------|---------------------------|------------------------------------------------|
| POST    | /api/user/create          | Registrerar en ny användare                    |
| POST    | /api/user/login           | Loggar in användare och returnerar en JWT-Token|

#### Menyobjekt

| Request | Endpoint                             | Beskrivning                                    |
|---------|--------------------------------------|------------------------------------------------|
| GET     | /api/menuitem/getAllPublished       | Hämtar alla publicerade menyobjekt             |
| GET     | /api/menuitem/                       | Hämtar ett specifikt menyobjekt                |
| GET     | /api/menuitem/protected/getAll      | Hämtar alla menyobjekt (kräver autentisering)  |
| POST    | /api/menuitem/protected/            | Skapar ett menyobjekt (kräver autentisering)   |
| DELETE  | /api/menuitem/protected/            | Raderar ett specifikt menyobjekt (kräver autentisering) |
| PUT     | /api/menuitem/protected/            | Uppdaterar ett specifikt menyobjekt (kräver autentisering) |

#### Kategorier

| Request | Endpoint                             | Beskrivning                                    |
|---------|--------------------------------------|------------------------------------------------|
| GET     | /api/category/getAllPublished       | Hämtar alla publicerade kategorier             |
| GET     | /api/category/                       | Hämtar en specifik kategori                    |
| GET     | /api/category/protected/getAll      | Hämtar alla kategorier (kräver autentisering)  |
| POST    | /api/category/protected/            | Skapar en kategori (kräver autentisering)      |
| DELETE  | /api/category/protected/            | Raderar en specifik kategori (kräver autentisering) |
| PUT     | /api/category/protected/            | Uppdaterar en specifik kategori (kräver autentisering) |

#### Kunder

| Request | Endpoint                             | Beskrivning                                    |
|---------|--------------------------------------|------------------------------------------------|
| POST    | /api/customer/find                  | Hämtar en specifik kund baserat på sökkriterier|

#### Beställningar

| Request | Endpoint                             | Beskrivning                                    |
|---------|--------------------------------------|------------------------------------------------|
| GET     | /api/order/id=                      | Hämtar en specifik beställning                 |
| GET     | /api/order/statuses/                | Hämtar alla statusar för beställningar         |
| GET     | /api/order/getOrderStatus/          | Hämtar status för en specifik beställning      |
| GET     | /api/order/protected/getAll         | Hämtar alla beställningar (kräver autentisering) |
| POST    | /api/order/                         | Skapar en ny beställning                       |
| DELETE  | /api/order/protected/               | Raderar en specifik beställning (kräver autentisering) |
| PUT     | /api/order/protected/               | Uppdaterar en specifik beställning (kräver autentisering) |
| PUT     | /api/order/protected/status/        | Uppdaterar status för en specifik beställning (kräver autentisering) |

#### Öppettider

| Request | Endpoint                             | Beskrivning                                    |
|---------|--------------------------------------|------------------------------------------------|
| GET     | /api/openhours/getAll               | Hämtar alla öppettider                         |
| GET     | /api/openhours/                      | Hämtar specifik öppettid                      |
| POST    | /api/openhours/protected/           | Skapar en ny öppettid (kräver autentisering)  |
| PUT     | /api/openhours/protected/           | Uppdaterar en specifik öppettid (kräver autentisering) |
| DELETE  | /api/openhours/protected/           | Raderar en specifik öppettid (kräver autentisering) |

#### E-post

| Request | Endpoint                             | Beskrivning                                    |
|---------|--------------------------------------|------------------------------------------------|
| POST    | /api/mail/contactForm               | Skickar e-post via kontaktformulär            |


### Controllers

- Category Controller
- Customer Controller
- MenuItem Controller
- Order Controller
- OrderItem Controller
- OpenHours Controller
- Status Controller
- User Controller

### Exempel på API-anrop

#### Hämta en specifik menyartikel

**Exempel anrop och svar:**

```http
GET /api/menuItems/1
```
```json
{
    "id": 1,
    "name": "Nduja",
    "price": 209,
    "categoryId": 3,
    "description": "San marzanotomat...",
    "published": true,
    "category": {
        "name": "Pizza"
    }
}
```