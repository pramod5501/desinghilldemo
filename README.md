# desinghilldemo
CRUD Application API 
# Node JS API for Product Management

### Created By [Pramod Kumar ] 



## Feature list

 * Product Listing API URL 
 * http://localhost:3000/api/product/getall?page=1&limit=2
 * Product Import from product-06.json file http://localhost:3000/api/product/readdata 
 * file read from public/uploads/product-06.json
 * Add to Cart POST http://localhost:3000/api/product/addtocart
 * input data [user_id,product_id,quantity]
 * Get Cart items API http://localhost:3000/api/product/getcartitems
 * input data [userId]
 


##  features used

 * sequelize
 * DB Myql
 * Routes
 * Other depened modules
 
## Tables use
CREATE TABLE `product_data` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(250) NOT NULL,
  `sku_code` varchar(250) NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `user_carts` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for table `product_data`
--
ALTER TABLE `product_data`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `user_carts`
--
ALTER TABLE `user_carts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--


-- AUTO_INCREMENT for table `product_data`
--
ALTER TABLE `product_data`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



## Development server

Run `npm install` for installing dependencies.

Run `node app.js` for a dev server, You will be automatically navigated to `http://localhost:3000/`.



