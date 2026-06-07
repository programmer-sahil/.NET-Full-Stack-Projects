using Microsoft.AspNetCore.Mvc;
using ProductApi.Models;

namespace ProductApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private static List<Product> products = new List<Product>
    {
        new Product { Id = 1, Name = "Laptop", Price = 50000, Stock = 5 },
        new Product { Id = 2, Name = "Mouse", Price = 500, Stock = 20 },
        new Product { Id = 3, Name = "Keyboard", Price = 1200, Stock = 10 }
    };

    [HttpGet]
    public ActionResult<List<Product>> GetAllProducts()
    {
        return Ok(products);
    }

    [HttpGet("{id}")]
    public ActionResult<Product> GetProductById(int id)
    {
        Product? product = products.FirstOrDefault(p => p.Id == id);

        if (product == null)
        {
            return NotFound(new { message = "Product not found" });
        }

        return Ok(product);
    }

    [HttpPost]
    public ActionResult<Product> AddProduct(Product product)
    {
        if (string.IsNullOrWhiteSpace(product.Name))
        {
            return BadRequest(new { message = "Product name is required" });
        }

        if (product.Price <= 0)
        {
            return BadRequest(new { message = "Product price must be greater than 0" });
        }

        int newId = products.Max(p => p.Id) + 1;

        product.Id = newId;

        products.Add(product);

        return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateProduct(int id, Product updatedProduct)
    {
        Product? existingProduct = products.FirstOrDefault(p => p.Id == id);

        if (existingProduct == null)
        {
            return NotFound(new { message = "Product not found" });
        }

        if (string.IsNullOrWhiteSpace(updatedProduct.Name))
        {
            return BadRequest(new { message = "Product name is required" });
        }

        if (updatedProduct.Price <= 0)
        {
            return BadRequest(new { message = "Product price must be greater than 0" });
        }

        existingProduct.Name = updatedProduct.Name;
        existingProduct.Price = updatedProduct.Price;
        existingProduct.Stock = updatedProduct.Stock;

        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteProduct(int id)
    {
        Product? product = products.FirstOrDefault(p => p.Id == id);

        if (product == null)
        {
            return NotFound(new { message = "Product not found" });
        }

        products.Remove(product);

        return NoContent();
    }
}