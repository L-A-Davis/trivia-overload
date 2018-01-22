# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180122142151) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "title"
  end

  create_table "games", force: :cascade do |t|
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_games_on_user_id"
  end

  create_table "games_questions", id: false, force: :cascade do |t|
    t.bigint "game_id", null: false
    t.bigint "question_id", null: false
    t.boolean "correct"
    t.index ["game_id", "question_id"], name: "index_games_questions_on_game_id_and_question_id"
    t.index ["question_id", "game_id"], name: "index_games_questions_on_question_id_and_game_id"
  end

  create_table "questions", force: :cascade do |t|
    t.string "content"
    t.string "answer"
    t.integer "difficulty_level"
    t.bigint "category_id"
    t.index ["category_id"], name: "index_questions_on_category_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
