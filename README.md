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
      "name": "ASUS VivoBook 15 (2020), 39.6 cm HD, Dual Core Intel Celeron N4020, Thin and Light Laptop (4GB RAM/256GB SSD/Integrated Graphics/Windows 10 Home/Transparent Silver/1.8 Kg), X515MA-BR002T",
      "image": "https://m.media-amazon.com/images/I/71S8U9VzLTL._SL1000_.jpg",
      "price": 24990,
      "original_price": 30990,
      "product_link": "https://www.amazon.in/ASUS-VivoBook-Integrated-Transparent-X515MA-BR002T/dp/B08CKY5XX3/ref=sr_1_3",
      "query_url": "https://amazon-scraper.dvishal485.workers.dev/product/ASUS-VivoBook-Integrated-Transparent-X515MA-BR002T/dp/B08CKY5XX3/ref=sr_1_3"
    },
    ... more ...
  ]
}
```

*Note : All currencies are in INR (₹)*

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
  "query": "ASUS-VivoBook-Integrated-Transparent-X515MA-BR002T/dp/B08CKY5XX3/ref=sr_1_3",
  "fetch_from": "https://www.amazon.in/ASUS-VivoBook-Integrated-Transparent-X515MA-BR002T/dp/B08CKY5XX3/ref=sr_1_3",
  "product_detail": {
    "name": "ASUS VivoBook 15 (2020), 39.6 cm HD, Dual Core Intel Celeron N4020, Thin and Light Laptop (4GB RAM/256GB SSD/Integrated Graphics/Windows 10 Home/Transparent Silver/1.8 Kg), X515MA-BR002T",
    "image": "https://m.media-amazon.com/images/I/71S8U9VzLTL._SL1500_.jpg",
    "price": 24990,
    "original_price": 30990,
    "in_stock": false,
    "rating_details": {
      "ratings_count": 648,
      "rating": 4.1
    },
    "features": [
      "Free upgrade to Windows 11 when available. Disclaimer-Upgrade rollout plan is being finalized and is scheduled to begin late in 2021 and continue into 2022. Specific timing will vary by device",
      "Processor: Intel Celeron N4020 Processor, 1.1 GHz Base Speed, Up to 2.8 GHz Max Boost Turbo Speed , 2 cores, 2 Threads, 4MB Cache",
      "Memory & Storage: 4GB SO-DIMM DDR4 2400MHz RAM, Upgradeable up to 8GB using 1x SO-DIMM Slot with | Storage: 256GB M.2 NVMe PCIe SSD",
      "Graphics: Integrated Intel HD Graphics",
      "Display: 15.6-inch (39.62 cms), LED-Backlit LCD, FHD (1920 x 1080) 16:9, 220nits, NanoEdge bezel, Anti-Glare Plane with 45% NTSC, 82% Screen-To-Body Ratio",
      "Operating System: Pre-loaded Windows 10 Home with lifetime validity",
      "Design & battery: Up to 19.9mm Thin | NanoEdge Bezels | Thin and Light Laptop | Laptop weight: 1.8 kg | 37WHrs, 2-cell Li-ion battery | Up to 6 hours battery life ;Note: Battery life depends on conditions of usage"
    ],
    "product_link": "https://www.amazon.in/ASUS-VivoBook-Integrated-Transparent-X515MA-BR002T/dp/B08CKY5XX3/ref=sr_1_3"
  }
}
```

*Note : All currencies are in INR (₹)*

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
