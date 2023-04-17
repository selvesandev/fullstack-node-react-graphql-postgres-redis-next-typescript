# List of all the queries

```graphql
mutation ($options: EmailPasswordInput!) {
  login(options: $options) {
    user {
      id
      email
    }
    error {
      field
      message
    }
  }
}

# {
#   "options": {
#     "email": "dev.selvesan@gmail.com",
#     "password": "**********"
#   },
# }
```
