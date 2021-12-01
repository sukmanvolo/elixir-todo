defmodule Todo.Repo.Migrations.CreateTodoItems do
  use Ecto.Migration

  def change do
    create table(:todo_items) do
      add :content, :text
      add :done, :boolean, default: false, null: false

      timestamps()
    end

  end
end
