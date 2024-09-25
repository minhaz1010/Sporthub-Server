# Single Page Product Creation Backend

This project is a backend service for a single-page product creation about sport related application. It provides a robust API for managing products, including creation, retrieval, updating, and deletion operations. The backend also features a custom query builder for flexible data retrieval.

## Features

- **Create Product**: Add new products to the database with details such as name, price, description, etc.
- **Get Product**: Retrieve product information, including support for fetching single products or lists of products.
- **Update Product**: Modify existing product details.
- **Delete Product**: Remove products from the database.
- **Custom Query Builder**: Flexible querying system for advanced product searches and filtering.

## Technology Stack

- Node.js
- Express.js
- MongoDB 
- TypeScript


## Installation

1. Clone the repository:
   ```
   git clone https://github.com/minhaz1010/Sporthub-Server.git
   ```

2. Install dependencies:
   ```
   npm install
   ```
   

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   MONGODB_URI=Your_Database_URL
   ```

4. Start the server:
   ```
   npm run start
    
   ```
   or for development:
   ```
   npm run dev

   ```

## API Endpoints

- `POST /api/products`: Create a new product
- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a single product by ID
- `PATCH /api/products/:id`: Update a product
- `DELETE /api/products/:id`: Delete a product

##Query Builder

The custom query builder allows for flexible searching and filtering of products. You can use it by sending GET requests to `/api/products` with query parameters.

Example:
```
GET /api/v1/products?searchTerm=badminton&sort=-stock&limit=5&fields=name,brand,stock&page=2
```
Retrieves badminton-related products, sorted by stock (descending), limited to 5 results per page, showing only name, brand, and stock fields, and returns the second page of results.
