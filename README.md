## 1. Auth Resource

- ### Register

**Endpoint: `POST /v1/auth/register`**

**Description:** This endpoint allows new users to register by providing their name, email, password, and role.

#### Sample Input
```json
{
    "name": "create",
    "email": "create@gmail.com",
    "password": "password1",
    "role": "user"
}
```

#### Validation Schema
The registration input must conform to the following validation schema:

- **email** must be a valid email address
- **password** must be atleast 8 characters and atleast 1 letter and 1 number
- **name** is a required field
- **role** can be either `"user"` or `"admin"`, with `"user"` as the default value


#### Sample Output 
```json
{
  "data": {
    "userCreated": {
      "id": "....",
      "name": "create",
      "email": "create5@gmail.com",
      "password": "$2a$08$How5AE8dNVGVRwleWwlCsOWZPq.vxUjvTChkX5js7iNPspO9WpeGG",
      "role": "user",
      "createdAt": "...",
      "updatedAt": "...",
      "isEmailVerified": false
    },
    "tokens": {
      "access": {
        "token": "...",
        "expires": "..."
      },
      "refresh": {
        "token": "...",
        "expires": "..."
      }
    }
  }
}
```



- ### Login 

**Endpoint:** `POST /v1/auth/login`

**Description:** This endpoint allows users to log in by providing their email and password 

#### Sample Input
```json
{
    "email": "create@gmail.com",
    "password": "password1"
}
```
#### Validation Schema
- **email** is required field and must be a valid email address
- **passwoed** is a required field and must match the user's registered password

### Sample Output 
```json
{
  "data": {
    "user": {
      "id": "...",
      "name": "Data Utama",
      "email": "create@gmail.com",
      "password": "$2a$08$ExA83CE81zHCNPhEKrTr9ON6RlV5B38By3rovaEuqbLGCw4AbifzG",
      "role": "...",
      "createdAt": "...",
      "updatedAt": "...",
      "isEmailVerified": false
    },
    "tokens": {
      "access": {
        "token": "...",
        "expires": "..."
      },
      "refresh": {
        "token": "...",
        "expires": "..."
      }
    }
  }
}
```


## 2. User Resourse

- ### Get All Users
- **Endpoint:** `GET /v1/user`
   Input Bearer
   "Bearer" : "Input access token here"

   Output
   {
  "status": true,
  "statusCode": 200,
  "message": "Success get users",
  "data": {
    "users": [
      {
        "id": "1",
        "name": "...",
        "email": "...",
        "password": "...",
        "role": "...",
        "createdAt": "...",
        "updatedAt": "....",
        "isEmailVerified": false
      },

      /*...*/

      {
        "id": "50",
        "name": "...",
        "email": "...",
        "password": "...",
        "role": "....",
        "createdAt": "...",
        "updatedAt": "...",
        "isEmailVerified": false
      }
    ],
    "pagination": {
      "totalItems": ...,
      "totalPages": ...,
      "currentPage": ...
    }
  }
}

Get Users Limit & Page results
   GET /v1/user?page=1&limit=5
{
  "status": true,
  "statusCode": 200,
  "message": "Success get users",
  "data": {
    "users": [
      {
        "id": "1",
        "name": "...",
        "email": "...",
        "password": "...",
        "role": "...",
        "createdAt": "...",
        "updatedAt": "....",
        "isEmailVerified": false
      },
   
     /*...*/
     
     {
        "id": "5",
        "name": "...",
        "email": "...",
        "password": "...",
        "role": "....",
        "createdAt": "...",
        "updatedAt": "...",
        "isEmailVerified": false
      }
    ],
    "pagination": {
      "totalItems": ...,
      "totalPages": ...,
      "currentPage": 1
    }
  }
}

Get User By Id
   GET /v1/user/:id
   Output 
   {
  "status": true,
  "statusCode": 200,
  "message": "Success get user",
  "data": {
    "id": "5",
    "name": "...",
    "email": "...",
    "password": "...",
    "role": "....",
    "createdAt": "...",
    "updatedAt": "...",
    "isEmailVerified": false
  }
}

Add New User
   POST /v1/user
   Sample Input
   {
    "name": "create",
    "email": "create@gmail.com",
    "password": "password1",
    "role": "admin"
   }

   Output
{
  "status": true,
  "statusCode": 201,
  "message": "Success create user",
  "data": {
    "id": "1",
    "name": "...",
    "email": "...",
    "password": "...",
    "role": "....",
    "createdAt": "...",
    "updatedAt": "...",
    "isEmailVerified": false
  }
}

Update User
   PUT /v1/user/:id
   Sample Input
   {
    "name": "update",
    "email": "update@gmail.com",
    "password": "password1",
    "role": "admin"
   }

   Output
   {
  "status": true,
  "statusCode": 200,
  "message": "Success update user",
  "data": {
    "id": "1",
    "name": "...",
    "email": "...",
    "password": "...",
    "role": "....",
    "createdAt": "...",
    "updatedAt": "...",
    "isEmailVerified": false
  }
}

Delete User
   DELETE /v1/user/:id

   output
   {
  "status": true,
  "statusCode": 200,
  "message": "Success delete user",
  "data": {
   "id": "1",
    "name": "...",
    "email": "...",
    "password": "...",
    "role": "....",
    "createdAt": "...",
    "updatedAt": "...",
    "isEmailVerified": false
  }
}
   
3. Category Resource
   GET Categorys
      GET /v1/category

      output
      {
     "status": true,
     "statusCode": 200,
     "message": "Get Categorys Success",
     "data": {
       "categorys": [
         {
           "id": "1",
           "name": "...",
           "createdAt": "...",
           "updatedAt": "..."
         },
   
        /*...*/
         
         {
           "id": "50",
           "name": "...",
           "createdAt": "...",
           "updatedAt": "..."
         }
       ],
       "pagination": {
         "totalItems": ...,
         "totalPages": ...,
         "currentPage": 1
       }
     }
   }

   GET Category By Id
      GEt /v1/category/:id

      output
      {
        "status": true,
        "statusCode": 200,
        "message": "Get Category Success",
        "data": {
          "id": "...",
          "name": "...",
          "createdAt": "...",
          "updatedAt": "..."
        }
      }

   Add New category
      POST /v1/category

      input
      {
       "name": "create"
      }

      output
      {
        "status": true,
        "statusCode": 201,
        "message": "Create Category Success",
        "data": {
          "id": "...",
          "name": "...",
          "createdAt": "...",
          "updatedAt": "...."
        }
      }

   Update Category
      PUT /v1/category/:id
   
      Input
      {
          "name": "update"
      }

      Output
      {
        "status": true,
        "statusCode": 200,
        "message": "Update Category Success",
        "data": {
          "id": "...",
          "name": "...",
          "createdAt": "...",
          "updatedAt": "..."
        }
      }

   Delete Category
      DELETE /v1/category/:id
      Output
      {
        "status": true,
        "statusCode": 200,
        "message": "Delete Category Success",
        "data": null
      }

4. Product Resource
   
   Get All Product
      GET /v1/product
      Output
      {
        "status": true,
        "statusCode": 200,
        "message": "Get Product Success",
        "data": {
          "products": [
            {
               "id": "1",
              "name": "...",
              "description": "...",
              "price": ...,
              "quantityInStock": ...,
              "categoryId": "...",
              "userId": "...",
              "createdAt": "...",
              "updatedAt": "..."
            },

             /*...*/

            {
              "id": "50",
              "name": "...",
              "description": "...",
              "price": ...,
              "quantityInStock": ...,
              "categoryId": "...",
              "userId": "...",
              "createdAt": "...",
              "updatedAt": "..."
            }
          ],
          "pagination": {
            "totalItems": ...,
            "totalPages": ....,
            "currentPage": 1
          }
        }
      }

   Get Product By Id
      GET /v1/product/:id

      Output
      {
        "status": true,
        "statusCode": 200,
        "message": "Get Product Success",
        "data": {
            "id": "50",
            "name": "...",
            "description": "...",
            "price": ...,
            "quantityInStock": ...,
            "categoryId": "...",
            "userId": "...",
            "createdAt": "...",
            "updatedAt": "..."
        }
      }

   Add New Product
      POST /v1/product
      Input
      {
          "name": "product",
          "description": "Ini adalah create product",
          "price": 1000,
          "quantityInStock": 10,
          "categoryId": "59bebb8e-af68-4093-bcff-156ab1de82b3",
          "userId": "8641e64b-c7af-4ab7-b5ac-29762e9e1ca9"
      }

      Output
      {
        "status": true,
        "statusCode": 201,
        "message": "Create Product Success",
        "data": {
            "id": "1",
            "name": "...",
            "description": "...",
            "price": ...,
            "quantityInStock": ...,
            "categoryId": "...",
            "userId": "...",
            "createdAt": "...",
            "updatedAt": "..."
        }
      }

   Update Product
      PUT /v1/product/:id
      Input
      {
          "name": "product",
          "description": "Ini adalah create product",
          "price": 25000,
          "quantityInStock": 25,
          "categoryId": "c671ff4d-991e-48e4-9ce2-72e6fca77d0a",
          "userId": "df110501-5ed5-4530-87f7-6a9050413d98"
      }

      Output
      {
        "status": true,
        "statusCode": 200,
        "message": "Update Product Success",
        "data": {
            "id": "1",
            "name": "...",
            "description": "...",
            "price": ...,
            "quantityInStock": ...,
            "categoryId": "...",
            "userId": "...",
            "createdAt": "...",
            "updatedAt": "..."
        }
      }

   Delete Product
      DELETE /v1/product/:id
      Output
      {
        "status": true,
        "statusCode": 200,
        "message": "Delete Product Success",
        "data": null
      }

5. Order Resource
     Get All Order
      GET /v1/order
      Ouput
      {
      "status": true,
      "statusCode": 200,
      "message": "Get CustomerOrders Success",
      "data": {
       "orders": [
         {
           "id": "1",
           "totalPrice": ...,
           "customerName": "...",
           "customerEmail": "",
           "userId": "...",
           "createdAt": "...",
           "updatedAt": "..."
         },
      
          /*...*/
      
         {
           "id": "50",
           "totalPrice": ...,
           "customerName": "...",
           "customerEmail": "",
           "userId": "...",
           "createdAt": "...",
           "updatedAt": "..."
         }
       ],
        "pagination": {
          "totalItems": ...,
          "totalPages": ....,
          "currentPage": 1
       }
      }
     }

   Get Single Product
      GET /v1/order/:id

      Output
      {
        "status": true,
        "statusCode": 200,
        "message": "Get Order Success",
        "data": {
           "id": "1",
           "totalPrice": ...,
           "customerName": "...",
           "customerEmail": "",
           "userId": "...",
           "createdAt": "...",
           "updatedAt": "..."
      }

   Add New Order
      POST /v1/order
      Input
      {
          "totalPrice": 0,
          "customerName": "create",
          "customerEmail": "create@gmail.com",
          "userId": "cc672e85-d6a0-415c-932c-6c39118fe221"
      }

      Ouput
      {
        "status": true,
        "statusCode": 200,
        "message": "Get Order Success",
        "data": {
           "id": "1",
           "totalPrice": ...,
           "customerName": "...",
           "customerEmail": "",
           "userId": "...",
           "createdAt": "...",
           "updatedAt": "..."
        }
      }

   Edit Order
      PUT /v1/order/:id
      Input
      {
          "totalPrice": 0,
          "customerName": "update",
          "customerEmail": "update@gmail.com"
      }

      Output
      {
        "status": true,
        "statusCode": 200,
        "message": "Get Order Success",
        "data": {
           "id": "1",
           "totalPrice": ...,
           "customerName": "...",
           "customerEmail": "",
           "userId": "...",
           "createdAt": "...",
           "updatedAt": "..."
        }
      }

   Delete Product
      DELETE /v1/order/:id

      Output
      {
        "status": true,
        "statusCode": 200,
        "message": "Delete Order Success",
        "data": null
      }

   6. Order Item
      Get All Order Item
      GET /v1/orderItem
      Output
      {
        "status": true,
        "statusCode": 200,
        "message": "Get Order Items Success",
        "data": {
          "orderItems": [
            {
              "id": "1",
              "orderId": "...",
              "productId": "...",
              "quantity": ...,
              "unitPrice": ...,
              "createdAt": "...",
              "updatedAt": "..."
            },
      
             /*...*/
         
            {
              "id": "50",
              "orderId": "...",
              "productId": "...",
              "quantity": ...,
              "unitPrice": ...,
              "createdAt": "...",
              "updatedAt": "..."
            },
          ],
          "pagination": {
            "totalItems": ...,
            "totalPages": ...,
            "currentPage": 1
          }
        }
      }

   Get Single Order Item
      GET /v1/orderItem/:id
      Output
      {
        "status": true,
        "statusCode": 200,
        "message": "Get Order Item Success",
        "data": {
           "id": "1",
           "orderId": "...",
           "productId": "...",
           "quantity": ...,
           "unitPrice": ...,
           "createdAt": "...",
           "updatedAt": "..."
        }
      }

   Add New Order Item
      POST /v1/orderItem
      Input
      {
          "orderId" : "2b4f3207-a389-4920-b87b-3eeac6de4f01",
          "productId" : "4f30396f-a94c-414b-b4d4-bbe6ba1fb34b",
          "quantity" : 1
      }

      Ouput
      {
        "status": true,
        "statusCode": 201,
        "message": "Create Order Item Success",
        "data": {
           "id": "...",
           "orderId": "...",
           "productId": "...",
           "quantity": ...,
           "unitPrice": ...,
           "createdAt": "...",
           "updatedAt": "..."
        }
      }

   Update Order Item
      PUT /v1/orderItem/:id
      Input
      {
          "orderId" : "update",
          "productId" : "update",
          "quantity" : 1,
      }

      output
      {
        "status": true,
        "statusCode": 200,
        "message": "Update Order Item Success",
        "data": {
           "id": "...",
           "orderId": "...",
           "productId": "...",
           "quantity": ...,
           "unitPrice": ...,
           "createdAt": "...",
           "updatedAt": "..."   
        }
      }

   Delete Order Item
      DELETE /v1/orderItem/:id
      Output
      {
        "status": true,
        "statusCode": 200,
        "message": "Delete Order Item Success",
        "data": null
      }
