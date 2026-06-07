# ProductApi

`ProductApi` is a beginner ASP.NET Core Web API project for practicing REST API CRUD operations without a database.

The project stores products in an in-memory `List<Product>`, so it is perfect for learning controllers, routes, HTTP methods, validation, and Swagger before moving to Entity Framework Core.

## Tech Stack

- C#
- ASP.NET Core Web API
- Swagger / OpenAPI
- In-memory list
- .NET 10

## Features

- Get all products
- Get product by ID
- Add product
- Update product
- Delete product
- Basic validation
- Swagger UI

## Folder Structure

```text
ProductApi/
|-- Controllers/
|   `-- ProductsController.cs
|-- Models/
|   `-- Product.cs
|-- Properties/
|   `-- launchSettings.json
|-- Program.cs
|-- ProductApi.csproj
|-- appsettings.json
`-- README.md
```

## Important Files

`Models/Product.cs`

Defines the product model:

```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
    public int Stock { get; set; }
}
```

`Controllers/ProductsController.cs`

Contains the product CRUD endpoints.

The current data is stored in a static list:

```csharp
private static List<Product> products = new List<Product>
{
    new Product { Id = 1, Name = "Laptop", Price = 50000, Stock = 5 },
    new Product { Id = 2, Name = "Mouse", Price = 500, Stock = 20 },
    new Product { Id = 3, Name = "Keyboard", Price = 1200, Stock = 10 }
};
```

`Program.cs`

Registers controllers, Swagger, HTTPS redirection, authorization middleware, and controller routes.

## How To Run

Open terminal inside this project:

```bash
cd CSharpPractice/ProductApi
```

Restore packages:

```bash
dotnet restore
```

Run project:

```bash
dotnet run
```

Open Swagger:

```text
http://localhost:5098/swagger
```

HTTPS profile:

```text
https://localhost:7082/swagger
```

## API Endpoints

Base URL:

```text
http://localhost:5098
```

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/products` | Get all products |
| GET | `/api/products/{id}` | Get product by ID |
| POST | `/api/products` | Create product |
| PUT | `/api/products/{id}` | Update product |
| DELETE | `/api/products/{id}` | Delete product |

## Sample POST Body

```json
{
  "name": "Monitor",
  "price": 12000,
  "stock": 7
}
```

## Sample PUT Body

```json
{
  "name": "Gaming Monitor",
  "price": 18000,
  "stock": 4
}
```

## Validation Rules

- Product name is required.
- Product price must be greater than `0`.
- Product ID is generated automatically during `POST`.

## Important Note

This project uses in-memory data.

That means:

- Data is available while the app is running.
- New products disappear when the app restarts.
- This is normal for a beginner API project.

To save data permanently, use Entity Framework Core with SQLite or SQL Server.

## What I Learned

- How controller routing works
- How REST API methods work
- How to return `Ok`, `CreatedAtAction`, `BadRequest`, `NotFound`, and `NoContent`
- How to test APIs with Swagger
- How to validate simple input
- How in-memory data works

## Future Improvements

- Add Entity Framework Core
- Add SQLite or SQL Server database
- Add DTOs
- Add service layer
- Add search products by name
- Add filter products by price
- Add authentication
- Add tests

