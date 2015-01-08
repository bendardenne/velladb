# VellaDB API

## Implemented routes

### GET /{sid}

Get quote with sid *sid*.

### GET /latest

Get the latest quotes (in an array).

Parameters :

+ *limit*: Number of quotes to return (default: 5)

### GET /random

Get a random quote.

### GET /next/{sid}

Get the posts following quote *sid* (in an array).

Parameters:

+ *limit*: Number of quotes to return (default: 1)

### GET /prev/{sid}

Get the posts following quote *sid* (in an array).

Parameters:

+ *limit*: Number of quotes to return (default: 1)

### GET /stats

Get some stats about the DB (in an array).

### POST /post

Post a new quote. 

Required fields:

+ url: a valid facebook URL
+ text: a non-empty array of 'vellisms', with the main one first.
