class Api::V1::SubmittedQuestionsController < ApplicationController

  def index
    @submitted_questions = SubmittedQuestion.all
    render json: @submitted_questions
  end

  def create
    @submitted_question = SubmittedQuestion.create(submitted_question_params)
    render json: @submitted_question, status: 201
  end

  def update
    @submitted_question = SubmittedQuestion.find(params[:id])

    @submitted_question.update(submitted_question_params)
    if @submitted_question.save
      render json: @submitted_question
    else
      render json: {errors: @submitted_question.errors.full_messages}, status: 422
    end
  end

  def destroy
    @submitted_question = SubmittedQuestion.find(params[:id])
    submitted_questionId = @submitted_question.id
    @submitted_question.destroy
    render json: {message:"Ka-Pow! SubmittedQuestion deleted", submitted_questionId:submitted_questionId}
  end

  def show
    @submitted_question = SubmittedQuestion.find(params[:id])
    render json: @submitted_question, status: 200
  end

  private
  def submitted_question_params
    params.permit(:question, :correct_answer, :incorrect_answers_1, :incorrect_answers_2, :incorrect_answers_3, :user_id)
  end

end
