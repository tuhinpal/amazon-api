# amazon-scraper
## Serverless Amazon India Scraper made with Cloudflare worker

### Features

- Product Page
- Search Page
- No Limitation
- Unlimited Requests

### Api Endpoint

#### 🗺 **Search (GET)**

*$ Request*

```
https://{yourapp}.workers.dev/search/{query}

## Ex.
https://amazon-scraper.tprojects.workers.dev/search/laptop
```
*$ Response*

```
{
  "status": true,
  "total_result": 16,
  "query": "laptop",
  "fetch_from": "https://www.amazon.in/s?k=laptop",
  "result": [
    {
      "name": "Lenovo IdeaPad Slim 3 Intel Celeron N4020 15.6-inch HD Thin and Light Laptop (4GB/256GB SSD/Windows 10/Platinum Grey/1.7Kg), 81WQ003LIN",
      "image": "https://m.media-amazon.com/images/I/61Dw5Z8LzJL._AC_UY218_.jpg",
      "price": "₹23,990",
      "original_price": "₹30,690",
      "product_link": "https://www.amazon.in/Lenovo-IdeaPad-15-6-inch-Platinum-81WQ003LIN/dp/B08TQQ4ZHM/ref=sr_1_3",
      "query_url": "https://amazon-scraper.tprojects.workers.dev/product/Lenovo-IdeaPad-15-6-inch-Platinum-81WQ003LIN/dp/B08TQQ4ZHM/ref=sr_1_3"
    },
    ... more ...
  ]
}
```

#### 🗺 **Product (GET)**

*$ Request*

```
https://{yourapp}.workers.dev/product/{slug}

## Ex.
https://amazon-scraper.tprojects.workers.dev/product/Lenovo-IdeaPad-15-6-inch-Platinum-81WQ003LIN/dp/B08TQQ4ZHM
```

*$ Response*

```
{
  "status": true,
  "query": "Lenovo-IdeaPad-15-6-inch-Platinum-81WQ003LIN/dp/B08TQQ4ZHM/ref=sr_1_3",
  "fetch_from": "https://www.amazon.in/Lenovo-IdeaPad-15-6-inch-Platinum-81WQ003LIN/dp/B08TQQ4ZHM/ref=sr_1_3",
  "product_detail": {
    "name": "Lenovo IdeaPad Slim 3 Intel Celeron N4020 15.6-inch HD Thin and Light Laptop (4GB/256GB SSD/Windows 10/Platinum Grey/1.7Kg), 81WQ003LIN",
    "image": "https://images-na.ssl-images-amazon.com/images/I/61Dw5Z8LzJL._SL1000_.jpg",
    "price": "₹ 23,990.00",
    "original_price": " ₹ 30,690.00",
    "features": [
      "Processor: Intel Celeron N4020 | Speed: 1.1 GHz (Base) - 2.8 GHz (Max) | 2 Cores | 4MB Cache",
      "OS: Pre-Loaded Windows 10 Home with Lifetime Validity",
      "Memory and Storage: 4GB RAM DDR4 | 256 GB SSD",
      "Display: 15.6\" HD (1366x768) | Brightness: 220 nits | Anti-Glare",
      "Design: 1.99 cm Thin and 1.7 kg Light | 2-Sided Narrow Bezel",
      "Battery Life: 5 Hours | 35Wh Battery",
      "Camera (Built in): HD 720p Camera with Privacy Shutter | Integrated Dual Array Microphone"
    ],
    "product_link": "https://www.amazon.in/Lenovo-IdeaPad-15-6-inch-Platinum-81WQ003LIN/dp/B08TQQ4ZHM/ref=sr_1_3"
  }
}
```

### Deploy

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cachecleanerjeet/amazon-scraper)

### Development

- Install [Wrangler](https://developers.cloudflare.com/workers/cli-wrangler/install-update)
- [Login](https://developers.cloudflare.com/workers/cli-wrangler/authentication) with your cloudflare account
- Clone this [repository](https://github.com/cachecleanerjeet/amazon-scraper)
- Open `wrangler.toml` and put your `account_id`
- Run This command 

    ```
    wrangler dev
    ```

### License & Copyright :
- This Project is [Apache-2.0](https://github.com/cachecleanerjeet/amazon-scraper/blob/main/LICENSE) Licensed
- Copyright 2021 by [Tuhin Kanti Pal](https://github.com/cachecleanerjeet)

### Connect :
- [Channel](https://telegram.dog/tprojects)
- [Support Group](https://telegram.dog/t_projects)
