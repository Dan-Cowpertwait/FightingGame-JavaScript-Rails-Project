# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_17_060250) do

  create_table "characters", force: :cascade do |t|
    t.string "name"
    t.string "rpgclass"
    t.integer "health"
    t.integer "defence"
  end

  create_table "weapons", force: :cascade do |t|
    t.string "name"
    t.string "type"
    t.integer "power"
    t.integer "defence"
    t.integer "character_id", null: false
    t.index ["character_id"], name: "index_weapons_on_character_id"
  end

  add_foreign_key "weapons", "characters"
end
