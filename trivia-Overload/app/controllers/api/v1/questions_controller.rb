class Api::V1::QuestionsController < ApplicationController

  def index
    @questions = Question.all
    render json: @questions
  end

  def create
    @question = Question.create(question_params)
    render json: @question, status: 201
  end

  def update
    @question = Question.find(params[:id])

    @question.update(question_params)
    if @question.save
      render json: @question
    else
      render json: {errors: @question.errors.full_messages}, status: 422
    end
  end

  def destroy
    @question = Question.find(params[:id])
    questionId = @question.id
    @question.destroy
    render json: {message:"Ka-Pow! Question deleted", questionId:questionId}
  end

  def show
    @question = Question.find(params[:id])
    render json: @question, status: 200
  end

  private
  def question_params
    params.permit(:question, :correct_answer, :incorrect_answers_1, :incorrect_answers_2, :incorrect_answers_3, :user_id, :correct)
  end

end
