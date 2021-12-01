defmodule Todo.TodoApp.TodoItem do
  use Ecto.Schema
  import Ecto.Changeset


  schema "todo_items" do
    field :content, :string
    field :done, :boolean, default: false

    timestamps()
  end

  @doc false
  def changeset(todo_item, attrs) do
    todo_item
    |> cast(attrs, [:content, :done])
    |> validate_required([:content, :done])
  end
end
