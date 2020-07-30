# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


#BAD GUYS defence used as damage(power)
Character.create(name: "Goblin", rpgclass: "Goblin", health: 15, defence: 10, id: 1)
Character.create(name: "Beholder", rpgclass: "Beholder", health: 20, defence: 15, id: 2)
Character.create(name: "Mushroom", rpgclass: "Mushroom", health: 25, defence: 20, id: 3)
Character.create(name: "Skeleton", rpgclass: "Skeleton", health: 30, defence: 25, id: 4)
Character.create(name: "Demon", rpgclass: "Demon", health: 40, defence: 30, id: 5)

Weapon.create(name: "Short Sword", design: "Short Sword", power: "20", defence: "20", id: "1", character_id: "1")
Weapon.create(name: "Magic Eye", design: "Magic Eye", power: "30", defence: "30", id: "2", character_id: "2")
Weapon.create(name: "Deadly Spores", design: "Deadly Spores", power: "40", defence: "40", id: "3", character_id: "3")
Weapon.create(name: "Necromancers Blade", design: "Necromancers Blade", power: "50", defence: "50", id: "4", character_id: "4")
Weapon.create(name: "Placeholder", design: "Placeholder", power: "0", defence: "0", id: "5", character_id: "5")


