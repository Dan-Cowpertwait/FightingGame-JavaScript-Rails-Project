# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


#BAD GUYS defence used as damage(power)
Character.create(name: "Mr Bones", rpgclass: "Skeleton", health: 15, defence: 10, id: 1)
Character.create(name: "Void", rpgclass: "Rogue", health: 20, defence: 15, id: 2)
Character.create(name: "Grognak", rpgclass: "Barbarian", health: 25, defence: 20, id: 3)
Character.create(name: "Necrodancer", rpgclass: "Groove Mage", health: 30, defence: 25, id: 4)
Character.create(name: "Boss Hog", rpgclass: "Henchpig", health: 40, defence: 30, id: 5)

