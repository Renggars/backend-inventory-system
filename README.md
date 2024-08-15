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
      "createdAt": "....",
      "updatedAt": "....",
      "isEmailVerified": false
    },
    "tokens": {
      "access": {
        "token": ".....",
        "expires": "...."
      },
      "refresh": {
        "token": "....",
        "expires": "...."
      }
    }
  }
}


Login 
POST
