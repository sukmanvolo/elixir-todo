defmodule TodoWeb.Api.V1.TodoItemController do
  use TodoWeb, :controller
  alias Todo.TodoApp

  def index(conn, _params) do
    render conn, "index.json", %{:todo_items => TodoApp.list_todo_items()}
  end

  def update(conn, %{"id" => id, "todo_item" => todo_item_params}) do
    todo_item = TodoApp.get_todo_item!(id)
    case TodoApp.update_todo_item(todo_item, todo_item_params) do
      {:ok, todo_item} ->
        conn
        |> render("todo_item.json", todo_item: todo_item)

      {:error, _} ->
        conn
        |> put_status(422)
        |> json(%{error: "invalid resource"})
    end
  end

  def delete(conn, %{"id" => id}) do
    todo_item = TodoApp.get_todo_item!(id)
    {:ok, _todo_item} = TodoApp.delete_todo_item(todo_item)

    conn
    |> send_resp(200, "")
  end

  def create(conn, %{"todo_item" => todo_item_params}) do
    case TodoApp.create_todo_item(todo_item_params) do
      {:ok, todo_item} ->
        conn
        |> put_status(201)
        |> render("todo_item.json", todo_item: todo_item)

      {:error, _} ->
          conn
          |> put_status(422)
          |> json(%{error: "invalid resource"})
    end
  end
end
