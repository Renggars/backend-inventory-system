1. Auth Resource
Register
   POST /v1/auth/register
   Sample Input
{
    "name": "create",
    "email": "create@gmail.com",
    "password": "password1",
    "role": "user"
}

output 
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


Login 
POST /v1/auth/login
Sample Input
{
    "email": "create@gmail.com",
    "password": "password1"
}

Output 
{
  "data": {
    "user": {
      "id": "...",
      "name": "Data Utama",
      "email": "create@gmail.com",
      "password": "$2a$08$ExA83CE81zHCNPhEKrTr9ON6RlV5B38By3rovaEuqbLGCw4AbifzG",
      "role": "....,
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


2. User Resourse

Get Users
   GET USERS /v1/user
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
