# Todo APP

Expose a simple REST API built on Phoenix, so clients can create and manage tasks.

## Live Demo

https://todo-ex.herokuapp.com

Phoenix also offers a way to build assets and serve them. The Live demo is a SPA written in JS + React + Redux.

_PS: The client is far from being ready for production, the idea is just to show how the framework servers static assets and holds the REST API._

## API

The endpoints are scoped under the `/api/v1` namespace.

```bash
$ mix phx.router

api_v1_todo_item_path  GET     /api/v1/todo_items           TodoWeb.Api.V1.TodoItemController :index
api_v1_todo_item_path  GET     /api/v1/todo_items/:id/edit  TodoWeb.Api.V1.TodoItemController :edit
api_v1_todo_item_path  GET     /api/v1/todo_items/new       TodoWeb.Api.V1.TodoItemController :new
api_v1_todo_item_path  GET     /api/v1/todo_items/:id       TodoWeb.Api.V1.TodoItemController :show
api_v1_todo_item_path  POST    /api/v1/todo_items           TodoWeb.Api.V1.TodoItemController :create
api_v1_todo_item_path  PATCH   /api/v1/todo_items/:id       TodoWeb.Api.V1.TodoItemController :update
                       PUT     /api/v1/todo_items/:id       TodoWeb.Api.V1.TodoItemController :update
api_v1_todo_item_path  DELETE  /api/v1/todo_items/:id       TodoWeb.Api.V1.TodoItemController :delete
```

### Create a todo-item

```bash
$ curl "https://todo-ex.herokuapp.com/api/v1/todo_items" -H "content-type: application/json" -XPOST -d'{"todo_item": {"content": "call John", "done":false}}' -i
```

#### Response

```json
[
  {
    "text": "call John",
    "id": 3,
    "completed": false
  }
]
```

### List all todo-items

```bash
$ curl "https://todo-ex.herokuapp.com/api/v1/todo_items" -H "content-type: application/json"
```

#### Response

```json
[
  {
    "text": "pay bills",
    "id": 2,
    "completed": true
  },
  {
    "text": "buy milk",
    "id": 1,
    "completed": false
  },
  {
    "text": "call John",
    "id": 3,
    "completed": false
  }
]
```

### Update a todo-item

```bash
$ curl "https://todo-ex.herokuapp.com/api/v1/todo_items/3" -H "content-type: application/json" -XPUT -d'{"todo_item": {"done":true}}' -i
```

#### Response

```json
{
  "text": "call John",
  "id": 3,
  "completed": false
}
```

### Delete a todo-item

```bash
$ curl "https://todo-ex.herokuapp.com/api/v1/todo_items/6" -H "content-type: application/json" -XDELETE -i
```

#### Response

```json
Status: 200
```

## Run locally

* Install dependencies with `mix deps.get`

* Create and migrate your database with `mix ecto.create && mix ecto.migrate`

* Install Node.js dependencies with `cd assets && yarn install`

* Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix

## Nice to have

* A better SPA
* Tests
* I18n
* User Authentication

## Inspirations

* http://todomvc.com/examples/react/#/