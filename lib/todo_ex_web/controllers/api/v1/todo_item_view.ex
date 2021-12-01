defmodule TodoWeb.Api.V1.TodoItemView do
  use TodoWeb, :view

  def render("index.json", %{todo_items: todo_items}) do
    render_many(todo_items, TodoWeb.Api.V1.TodoItemView, "todo_item.json", %{})
  end

  def render("todo_item.json", %{todo_item: todo_item}) do
    %{id: todo_item.id,
      text: todo_item.content,
      completed: todo_item.done}
  end
end
