defmodule Todo.TodoAppTest do
  use Todo.DataCase

  alias Todo.TodoApp

  describe "todo_items" do
    alias Todo.TodoApp.TodoItem

    @valid_attrs %{content: "some content", done: true}
    @update_attrs %{content: "some updated content", done: false}
    @invalid_attrs %{content: nil, done: nil}

    def todo_item_fixture(attrs \\ %{}) do
      {:ok, todo_item} =
        attrs
        |> Enum.into(@valid_attrs)
        |> TodoApp.create_todo_item()

      todo_item
    end

    test "list_todo_items/0 returns all todo_items" do
      todo_item = todo_item_fixture()
      assert TodoApp.list_todo_items() == [todo_item]
    end

    test "get_todo_item!/1 returns the todo_item with given id" do
      todo_item = todo_item_fixture()
      assert TodoApp.get_todo_item!(todo_item.id) == todo_item
    end

    test "create_todo_item/1 with valid data creates a todo_item" do
      assert {:ok, %TodoItem{} = todo_item} = TodoApp.create_todo_item(@valid_attrs)
      assert todo_item.content == "some content"
      assert todo_item.done == true
    end

    test "create_todo_item/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = TodoApp.create_todo_item(@invalid_attrs)
    end

    test "update_todo_item/2 with valid data updates the todo_item" do
      todo_item = todo_item_fixture()
      assert {:ok, todo_item} = TodoApp.update_todo_item(todo_item, @update_attrs)
      assert %TodoItem{} = todo_item
      assert todo_item.content == "some updated content"
      assert todo_item.done == false
    end

    test "update_todo_item/2 with invalid data returns error changeset" do
      todo_item = todo_item_fixture()
      assert {:error, %Ecto.Changeset{}} = TodoApp.update_todo_item(todo_item, @invalid_attrs)
      assert todo_item == TodoApp.get_todo_item!(todo_item.id)
    end

    test "delete_todo_item/1 deletes the todo_item" do
      todo_item = todo_item_fixture()
      assert {:ok, %TodoItem{}} = TodoApp.delete_todo_item(todo_item)
      assert_raise Ecto.NoResultsError, fn -> TodoApp.get_todo_item!(todo_item.id) end
    end

    test "change_todo_item/1 returns a todo_item changeset" do
      todo_item = todo_item_fixture()
      assert %Ecto.Changeset{} = TodoApp.change_todo_item(todo_item)
    end
  end
end
