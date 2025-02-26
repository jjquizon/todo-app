class Api::V1::TodosController < ApplicationController
  before_action :set_csrf_token
  before_action :check_headers

  def index
    todos = Todo.all
    render json: todos
  end

  def create
    todo = Todo.new(todo_params)
    if todo.save
      render json: todo, status: :created
    else
      render json: todo.errors, status: :unprocessable_entity
    end
  end

  def update
    todo = Todo.find(params[:id])
    if todo.update(todo_params)
      render json: todo, status: :ok
    else
      render json: todo.errors, status: :unprocessable_entity
    end
  end

  def destroy
    todo = Todo.find(params[:id])
    todo.destroy
    render json: [ status: :no_content ]
  end

  private

  def todo_params
    params.require(:todo).permit(:description, :completed)
  end

  def set_csrf_token
    response.set_header("X-CSRF-Token", form_authenticity_token)
  end

  def check_headers
    p response.headers
  end
end
