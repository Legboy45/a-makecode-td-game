@namespace
class SpriteKind:
    HUD = SpriteKind.create()
    Waypoint = SpriteKind.create()
    End = SpriteKind.create()
    Start = SpriteKind.create()
    Tower = SpriteKind.create()
"""

- velocity

x = left

y = up

+ velocity

x = right

y = down

"""
# To-Do:
# 
# -Wave building
# 
# - Upgrading Towers
# 
# - Loadout system
# 
# - Shop (Buying new towers)
# 
# - Main menu

def on_on_overlap(sprite, otherSprite):
    global EnemysInWave
    scene.camera_shake(2, 500)
    sprites.destroy(sprite)
    BaseHP.value += 0 - statusbars.get_status_bar_attached_to(StatusBarKind.enemy_health, sprite).value
    EnemysInWave += -1
sprites.on_overlap(SpriteKind.enemy, SpriteKind.End, on_on_overlap)

def playercreate():
    global PlayerSprite, EquippedTowers
    PlayerSprite = sprites.create(img("""
            . . . . . . . . . . . . . . . . 
                    . . . . . f f f f f f . . . . . 
                    . . . . f 1 1 1 1 1 1 f . . . . 
                    . . . f 1 1 1 1 1 1 1 1 f . . . 
                    . . . f 1 1 1 1 1 1 1 1 f . . . 
                    . . . f 1 1 1 1 1 1 1 1 f . . . 
                    . . . f 1 f 1 1 1 1 f 1 f . . . 
                    . . . f 1 1 1 1 1 1 1 1 f . . . 
                    . . . f 1 1 f f f f 1 1 f . . . 
                    . . . . f 1 1 1 1 1 1 f . . . . 
                    . . . . . f f f f f f . . . . . 
                    . . . . . f 1 1 1 1 f . . . . . 
                    . . . f f f 1 1 1 1 f f f . . . 
                    . . . f 1 f 1 1 1 1 f 1 f . . . 
                    . . . f f f 1 f f 1 f f f . . . 
                    . . . . . f f f f f f . . . . .
        """),
        SpriteKind.player)
    controller.move_sprite(PlayerSprite, 100, 100)
    scene.camera_follow_sprite(PlayerSprite)
    PlayerSprite.z = 6
    EquippedTowers = ["Scout", "Sniper", "Poison", "Gunner"]
    anim()
def createTower(Cost: number, Kind: str, Cooldown: number, Range: number, Damage: number, Icon: Image):
    global TowersPlaced, newTower, Money
    if Money >= Cost:
        if TowersPlaced < MaxTowersPlaced:
            TowersPlaced += 1
            newTower = sprites.create(Icon, SpriteKind.Tower)
            Money += 0 - Cost
            sprites.set_data_string(newTower, "Name", Kind)
            sprites.set_data_number(newTower, "Cooldown", Cooldown * 1000)
            sprites.set_data_number(newTower, "Cost", Cost)
            sprites.set_data_number(newTower, "Range", Range)
            sprites.set_data_number(newTower, "Damage", Damage)
            sprites.set_data_boolean(newTower, "canAttack", True)
            tiles.place_on_tile(newTower, PlayerSprite.tilemap_location())
            tiles.set_tile_at(newTower.tilemap_location(),
                assets.tile("""
                    myTile9
                """))
        else:
            pass
    else:
        pass
    return newTower

def on_a_pressed():
    if PlayerSprite.tile_kind_at(TileDirection.CENTER, sprites.castle.tile_grass1):
        TowerIndex(EquippedTowers[0])
    elif PlayerSprite.tile_kind_at(TileDirection.CENTER, sprites.castle.tile_grass3):
        showTowerRange(Touchingtower)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def TowerIndex(Name: str):
    if Name == "Sniper":
        createTower(550,
            "Sniper",
            1.7,
            75,
            8,
            img("""
                . . . . . . . . . . . . . . . . 
                            . . . . . . . . c c c c c . . . 
                            . . . . . . c c 5 5 5 5 5 c . . 
                            . . . . . c 5 5 5 5 5 5 5 5 c . 
                            . . . . c b b b b b b 5 5 5 c . 
                            . . . . c 1 1 b b 1 b b c c . . 
                            . . . c 1 1 1 b b 1 1 1 c . . . 
                            . . . c 1 1 1 1 b 1 1 1 c . c c 
                            . . . c d 1 1 1 b 1 1 1 b b 5 c 
                            . . c c d 1 c 1 b 1 b 1 5 5 5 c 
                            . c c d d 1 1 1 1 1 b 1 b b 5 c 
                            f d d d 1 1 1 1 1 b b 1 f . c c 
                            f f f 1 1 1 1 1 1 b b b f . . . 
                            . . . f f 1 1 1 b b b 5 5 f . . 
                            . . . . . f f f 5 5 5 5 5 f . . 
                            . . . . . . . . f f f f f f . .
            """))
    elif Name == "Scout":
        createTower(250,
            "Scout",
            0.6,
            50,
            2,
            img("""
                e e e . . . . e e e . . . . 
                            c d d c . . c d d c . . . . 
                            c b d d f f d d b c . . . . 
                            c 3 b d d b d b 3 c . . . . 
                            f b 3 d d d d 3 b f . . . . 
                            e d d d d d d d d e . . . . 
                            e d f d d d d f d e . b f b 
                            f d d f d d f d d f . f d f 
                            f b d d b b d d 2 f . f d f 
                            . f 2 2 2 2 2 2 b b f f d f 
                            . f b d d d d d d b b d b f 
                            . f d d d d d b d d f f f . 
                            . f d f f f d f f d f . . . 
                            . f f . . f f . . f f . . .
            """))
    elif Name == "Poison":
        createTower(350,
            "Poison",
            0.6,
            40,
            3,
            img("""
                . . . . c c c c c c . . . . . . 
                            . . . c 6 7 7 7 7 6 c . . . . . 
                            . . c 7 7 7 7 7 7 7 7 c . . . . 
                            . c 6 7 7 7 7 7 7 7 7 6 c . . . 
                            . c 7 c 6 6 6 6 c 7 7 7 c . . . 
                            . f 7 6 f 6 6 f 6 7 7 7 f . . . 
                            . f 7 7 7 7 7 7 7 7 7 7 f . . . 
                            . . f 7 7 7 7 6 c 7 7 6 f c . . 
                            . . . f c c c c 7 7 6 f 7 7 c . 
                            . . c 7 2 7 7 7 6 c f 7 7 7 7 c 
                            . c 7 7 2 7 7 c f c 6 7 7 6 c c 
                            c 1 1 1 1 7 6 f c c 6 6 6 c . . 
                            f 1 1 1 1 1 6 6 c 6 6 6 6 f . . 
                            f 6 1 1 1 1 1 6 6 6 6 6 c f . . 
                            . f 6 1 1 1 1 1 1 6 6 6 f . . . 
                            . . c c c c c c c c c f . . . .
            """))
    elif Name == "Gunner":
        createTower(1250,
            "Gunner",
            0.18,
            75,
            2,
            img("""
                . . . . . . . . . . . . . . . . 
                            . . . . . . . . c c c c . . . . 
                            . . . . . . c c d d d d c . . . 
                            . . . . . c c c c c c d c . . . 
                            . . . . c c 4 4 4 4 d c c . . . 
                            . . . c 4 d 4 4 4 4 4 1 c . c c 
                            . . c 4 4 4 1 4 4 4 4 d 1 c 4 c 
                            . c 4 4 4 4 1 4 4 4 4 4 1 c 4 c 
                            f 4 4 4 4 4 1 4 4 4 4 4 1 4 4 f 
                            f 4 4 4 f 4 1 c c 4 4 4 1 f 4 f 
                            f 4 4 4 4 4 1 4 4 f 4 4 d f 4 f 
                            . f 4 4 4 4 1 c 4 f 4 d f f f f 
                            . . f f 4 d 4 4 f f 4 c f c . . 
                            . . . . f f 4 4 4 4 c d b c . . 
                            . . . . . . f f f f d d d c . . 
                            . . . . . . . . . . c c c . . .
            """))
    elif False:
        pass
def anim():
    characterAnimations.loop_frames(PlayerSprite,
        [img("""
                . . . . . . . . . . . . . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . . f 1 1 1 1 f . . . . . 
                        . . . f f f 1 1 1 1 f f f . . . 
                        . . . f 1 f 1 1 1 1 f 1 f . . . 
                        . . . f f f 1 f f 1 f f f . . . 
                        . . . . . f f f f f f . . . . .
            """),
            img("""
                . . . . . f f f f f f . . . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . . f 1 1 1 1 f . . . . . 
                        . . . . . f 1 1 1 1 f . . . . . 
                        . . . f f f 1 1 1 1 f f f . . . 
                        . . . f 1 f 1 f f 1 f 1 f . . . 
                        . . . f f f f f f f f f f . . . 
                        . . . . . . . . . . . . . . . .
            """),
            img("""
                . . . . . . . . . . . . . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . . f 1 1 1 1 f . . . . . 
                        . . . f f f 1 1 1 1 f f f . . . 
                        . . . f 1 f 1 1 1 1 f 1 f . . . 
                        . . . f f f 1 f f 1 f f f . . . 
                        . . . . . f f f f f f . . . . .
            """),
            img("""
                . . . . . f f f f f f . . . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . . f 1 1 1 1 f . . . . . 
                        . . . . . f 1 1 1 1 f . . . . . 
                        . . . f f f 1 1 1 1 f f f . . . 
                        . . . f 1 f 1 f f 1 f 1 f . . . 
                        . . . f f f f f f f f f f . . . 
                        . . . . . . . . . . . . . . . .
            """)],
        100,
        characterAnimations.rule(Predicate.MOVING_UP))
    characterAnimations.loop_frames(PlayerSprite,
        [img("""
                . . . . . . . . . . . . . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 f 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 f f 1 f . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f f f f . . . . . .
            """),
            img("""
                . . . . . f f f f f f . . . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 f 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 f f 1 f . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f f f f . . . . . . 
                        . . . . . . . . . . . . . . . .
            """),
            img("""
                . . . . . . . . . . . . . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 f 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 f f 1 f . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f f f f . . . . . .
            """),
            img("""
                . . . . . f f f f f f . . . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 f 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 f f 1 f . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f f f f . . . . . . 
                        . . . . . . . . . . . . . . . .
            """)],
        100,
        characterAnimations.rule(Predicate.MOVING_RIGHT))
    characterAnimations.loop_frames(PlayerSprite,
        [img("""
                . . . . . . . . . . . . . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 f 1 1 1 1 f 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 f f f f 1 1 f . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . . f 1 1 1 1 f . . . . . 
                        . . . f f f 1 1 1 1 f f f . . . 
                        . . . f 1 f 1 1 1 1 f 1 f . . . 
                        . . . f f f 1 f f 1 f f f . . . 
                        . . . . . f f f f f f . . . . .
            """),
            img("""
                . . . . . f f f f f f . . . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 f 1 1 1 1 f 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 f f f f 1 1 f . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . . f 1 1 1 1 f . . . . . 
                        . . . . . f 1 1 1 1 f . . . . . 
                        . . . f f f 1 1 1 1 f f f . . . 
                        . . . f 1 f 1 f f 1 f 1 f . . . 
                        . . . f f f f f f f f f f . . . 
                        . . . . . . . . . . . . . . . .
            """),
            img("""
                . . . . . . . . . . . . . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 f 1 1 1 1 f 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 f f f f 1 1 f . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . . f 1 1 1 1 f . . . . . 
                        . . . f f f 1 1 1 1 f f f . . . 
                        . . . f 1 f 1 1 1 1 f 1 f . . . 
                        . . . f f f 1 f f 1 f f f . . . 
                        . . . . . f f f f f f . . . . .
            """),
            img("""
                . . . . . f f f f f f . . . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 f 1 1 1 1 f 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 f f f f 1 1 f . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . . f 1 1 1 1 f . . . . . 
                        . . . . . f 1 1 1 1 f . . . . . 
                        . . . f f f 1 1 1 1 f f f . . . 
                        . . . f 1 f 1 f f 1 f 1 f . . . 
                        . . . f f f f f f f f f f . . . 
                        . . . . . . . . . . . . . . . .
            """)],
        100,
        characterAnimations.rule(Predicate.MOVING_DOWN))
    characterAnimations.loop_frames(PlayerSprite,
        [img("""
                . . . . . . . . . . . . . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 f 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 f f 1 1 1 1 1 f . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f f f f . . . . . .
            """),
            img("""
                . . . . . f f f f f f . . . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 f 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 f f 1 1 1 1 1 f . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f f f f . . . . . . 
                        . . . . . . . . . . . . . . . .
            """),
            img("""
                . . . . . . . . . . . . . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 f 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 f f 1 1 1 1 1 f . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f f f f . . . . . .
            """),
            img("""
                . . . . . f f f f f f . . . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 f 1 1 1 1 1 1 f . . . 
                        . . . f 1 1 1 1 1 1 1 1 f . . . 
                        . . . f 1 f f 1 1 1 1 1 f . . . 
                        . . . . f 1 1 1 1 1 1 f . . . . 
                        . . . . . f f f f f f . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f 1 1 f . . . . . . 
                        . . . . . . f f f f . . . . . . 
                        . . . . . . . . . . . . . . . .
            """)],
        100,
        characterAnimations.rule(Predicate.MOVING_LEFT))
    characterAnimations.loop_frames(PlayerSprite,
        [img("""
            . . . . . . . . . . . . . . . . 
                    . . . . . f f f f f f . . . . . 
                    . . . . f 1 1 1 1 1 1 f . . . . 
                    . . . f 1 1 1 1 1 1 1 1 f . . . 
                    . . . f 1 1 1 1 1 1 1 1 f . . . 
                    . . . f 1 1 1 1 1 1 1 1 f . . . 
                    . . . f 1 1 1 1 1 1 1 1 f . . . 
                    . . . f 1 1 1 1 1 1 1 1 f . . . 
                    . . . f 1 1 1 1 1 1 1 1 f . . . 
                    . . . . f 1 1 1 1 1 1 f . . . . 
                    . . . . . f f f f f f . . . . . 
                    . . . . . f 1 1 1 1 f . . . . . 
                    . . . f f f 1 1 1 1 f f f . . . 
                    . . . f 1 f 1 1 1 1 f 1 f . . . 
                    . . . f f f 1 f f 1 f f f . . . 
                    . . . . . f f f f f f . . . . .
        """)],
        100,
        characterAnimations.rule(Predicate.NOT_MOVING, Predicate.FACING_UP))
    characterAnimations.loop_frames(PlayerSprite,
        [img("""
            . . . . . . . . . . . . . . . . 
                    . . . . . f f f f f f . . . . . 
                    . . . . f 1 1 1 1 1 1 f . . . . 
                    . . . f 1 1 1 1 1 1 1 1 f . . . 
                    . . . f 1 1 1 1 1 1 1 1 f . . . 
                    . . . f 1 1 1 1 1 1 1 1 f . . . 
                    . . . f 1 1 1 1 1 1 f 1 f . . . 
                    . . . f 1 1 1 1 1 1 1 1 f . . . 
                    . . . f 1 1 1 1 1 f f 1 f . . . 
                    . . . . f 1 1 1 1 1 1 f . . . . 
                    . . . . . f f f f f f . . . . . 
                    . . . . . . f 1 1 f . . . . . . 
                    . . . . . . f 1 1 f . . . . . . 
                    . . . . . . f 1 1 f . . . . . . 
                    . . . . . . f 1 1 f . . . . . . 
                    . . . . . . f f f f . . . . . .
        """)],
        100,
        characterAnimations.rule(Predicate.NOT_MOVING, Predicate.FACING_RIGHT))
    characterAnimations.loop_frames(PlayerSprite,
        [img("""
            . . . . . . . . . . . . . . . . 
                    . . . . . f f f f f f . . . . . 
                    . . . . f 1 1 1 1 1 1 f . . . . 
                    . . . f 1 1 1 1 1 1 1 1 f . . . 
                    . . . f 1 1 1 1 1 1 1 1 f . . . 
                    . . . f 1 1 1 1 1 1 1 1 f . . . 
                    . . . f 1 f 1 1 1 1 f 1 f . . . 
                    . . . f 1 1 1 1 1 1 1 1 f . . . 
                    . . . f 1 1 f f f f 1 1 f . . . 
                    . . . . f 1 1 1 1 1 1 f . . . . 
                    . . . . . f f f f f f . . . . . 
                    . . . . . f 1 1 1 1 f . . . . . 
                    . . . f f f 1 1 1 1 f f f . . . 
                    . . . f 1 f 1 1 1 1 f 1 f . . . 
                    . . . f f f 1 f f 1 f f f . . . 
                    . . . . . f f f f f f . . . . .
        """)],
        100,
        characterAnimations.rule(Predicate.NOT_MOVING, Predicate.FACING_DOWN))
    characterAnimations.loop_frames(PlayerSprite,
        [img("""
            . . . . . . . . . . . . . . . . 
                    . . . . . f f f f f f . . . . . 
                    . . . . f 1 1 1 1 1 1 f . . . . 
                    . . . f 1 1 1 1 1 1 1 1 f . . . 
                    . . . f 1 1 1 1 1 1 1 1 f . . . 
                    . . . f 1 1 1 1 1 1 1 1 f . . . 
                    . . . f 1 f 1 1 1 1 1 1 f . . . 
                    . . . f 1 1 1 1 1 1 1 1 f . . . 
                    . . . f 1 f f 1 1 1 1 1 f . . . 
                    . . . . f 1 1 1 1 1 1 f . . . . 
                    . . . . . f f f f f f . . . . . 
                    . . . . . . f 1 1 f . . . . . . 
                    . . . . . . f 1 1 f . . . . . . 
                    . . . . . . f 1 1 f . . . . . . 
                    . . . . . . f 1 1 f . . . . . . 
                    . . . . . . f f f f . . . . . .
        """)],
        100,
        characterAnimations.rule(Predicate.NOT_MOVING, Predicate.FACING_LEFT))
def showTowerRange(tower: Sprite):
    global location2
    location2 = tower.tilemap_location()
    spriteutils.fill_circle(tower.image,
        location2.column,
        location2.row,
        sprites.read_data_number(tower, "Range"),
        1)

def on_on_overlap2(sprite2, otherSprite2):
    global Money
    if controller.B.is_pressed():
        tiles.set_tile_at(otherSprite2.tilemap_location(), sprites.castle.tile_grass1)
        sprites.destroy(otherSprite2)
        Money += sprites.read_data_number(otherSprite2, "Cost") * 0.75
sprites.on_overlap(SpriteKind.player, SpriteKind.Tower, on_on_overlap2)

def on_on_zero(status):
    game.set_game_over_message(False, "We took too much damage!")
    game.game_over(False)
statusbars.on_zero(StatusBarKind.health, on_on_zero)

def createEnemy(HP: number, Speed: number, Name2: str, Icon2: Image, Defense: number, Boss: bool):
    global NewEnemy, EnemyHPBar
    NewEnemy = sprites.create(Icon2, SpriteKind.enemy)
    sprites.set_data_string(NewEnemy, "Name", Name2)
    sprites.set_data_number(NewEnemy, "Defense", Defense)
    sprites.set_data_number(NewEnemy, "Speed", Speed)
    EnemyHPBar = statusbars.create(20, 4, StatusBarKind.enemy_health)
    EnemyHPBar.max = HP
    EnemyHPBar.value = HP
    EnemyHPBar.attach_to_sprite(NewEnemy)
    EnemyHPBar.set_bar_border(1, 15)
    EnemyHPBar.z = 0
    tiles.place_on_tile(NewEnemy, StartSprite.tilemap_location())
    scene.follow_path(NewEnemy, item, sprites.read_data_number(NewEnemy, "Speed"))
    return NewEnemy
def hud():
    global BaseHP, MoneyHUD, TimerHUD, BorderHUD, HPHUD, TowerPlacedHUD, WaveHUD
    BaseHP = statusbars.create(60, 10, StatusBarKind.health)
    BaseHP.max = 200
    BaseHP.value = 200
    BaseHP.set_bar_border(1, 15)
    BaseHP.set_color(7, 2, 6)
    BaseHP.set_status_bar_flag(StatusBarFlag.SMOOTH_TRANSITION, True)
    BaseHP.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    BaseHP.set_position(80, 7)
    BaseHP.z = 10
    MoneyHUD = textsprite.create("", 0, 5)
    MoneyHUD.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    MoneyHUD.set_position(7, 7)
    MoneyHUD.set_outline(1, 15)
    MoneyHUD.z = 10
    TimerHUD = textsprite.create("", 0, 1)
    TimerHUD.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    TimerHUD.set_position(123, 7)
    TimerHUD.set_outline(1, 15)
    TimerHUD.z = 10
    BorderHUD = sprites.create(img("""
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        """),
        SpriteKind.HUD)
    BorderHUD.set_position(80, 8)
    BorderHUD.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    BorderHUD.z = 5
    HPHUD = textsprite.create("", 0, 7)
    HPHUD.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    HPHUD.set_position(58, 9)
    HPHUD.set_outline(1, 15)
    HPHUD.z = 11
    TowerPlacedHUD = textsprite.create("", 0, 1)
    TowerPlacedHUD.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    TowerPlacedHUD.set_position(123, 113)
    TowerPlacedHUD.set_outline(1, 15)
    TowerPlacedHUD.z = 11
    WaveHUD = textsprite.create("", 0, 1)
    WaveHUD.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    WaveHUD.set_position(3, 113)
    WaveHUD.set_outline(1, 15)
    WaveHUD.z = 11

def on_on_overlap3(sprite3, otherSprite3):
    global TouchingTowerString, Touchingtower
    TouchingTowerString = sprites.read_data_string(otherSprite3, "Name")
    Touchingtower = otherSprite3
sprites.on_overlap(SpriteKind.player, SpriteKind.player, on_on_overlap3)

def on_overlap_tile(sprite4, location):
    global TouchingTowerString
    TouchingTowerString = ""
scene.on_overlap_tile(SpriteKind.player,
    sprites.castle.tile_grass1,
    on_overlap_tile)

def on_on_destroyed(sprite5):
    global Target
    for value in sprites.all_of_kind(SpriteKind.Tower):
        for value2 in sprites.all_of_kind(SpriteKind.projectile):
            Target = spriteutils.get_sprites_within(SpriteKind.enemy,
                sprites.read_data_number(value, "Range"),
                value)[0]
            value2.follow(Target, 350)
sprites.on_destroyed(SpriteKind.enemy, on_on_destroyed)

def Waves():
    global Wave, Timer, EnemysInWave, Money
    Wave += 1
    if Wave == 15:
        Timer = 600
    elif Wave >= 7:
        Timer = 80
    elif Wave < 7:
        Timer = 50
    if Wave == 0:
        EnemysInWave = 1
        Timer = 5
        Money = 500
    elif Wave == 1:
        EnemysInWave = 3
        
        def on_background():
            for index in range(3):
                createEnemy(6,
                    40,
                    "Basic",
                    img("""
                        . . . . . . . . . . . . . . . . 
                                            . . . f f f f f f f f f f . . . 
                                            . . f 7 7 7 7 7 7 7 7 7 7 f . . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . . f 8 8 8 8 8 8 8 8 8 8 f . . 
                                            . . . f f f f f f f f f f . . . 
                                            . . . . . . . . . . . . . . . .
                    """),
                    2,
                    False)
                pause(500)
        timer.background(on_background)
        
    elif Wave == 2:
        EnemysInWave = 6
        Money += 200
        
        def on_background2():
            for index2 in range(6):
                createEnemy(6,
                    40,
                    "Basic",
                    img("""
                        . . . . . . . . . . . . . . . . 
                                            . . . f f f f f f f f f f . . . 
                                            . . f 7 7 7 7 7 7 7 7 7 7 f . . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . . f 8 8 8 8 8 8 8 8 8 8 f . . 
                                            . . . f f f f f f f f f f . . . 
                                            . . . . . . . . . . . . . . . .
                    """),
                    1,
                    False)
                pause(500)
        timer.background(on_background2)
        
    elif Wave == 3:
        Money += 350
        EnemysInWave = 12
        
        def on_background3():
            for index3 in range(9):
                createEnemy(6,
                    40,
                    "Basic",
                    img("""
                        . . . . . . . . . . . . . . . . 
                                            . . . f f f f f f f f f f . . . 
                                            . . f 7 7 7 7 7 7 7 7 7 7 f . . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . f 8 6 6 6 6 6 6 6 6 6 6 7 f . 
                                            . . f 8 8 8 8 8 8 8 8 8 8 f . . 
                                            . . . f f f f f f f f f f . . . 
                                            . . . . . . . . . . . . . . . .
                    """),
                    1,
                    False)
                pause(500)
        timer.background(on_background3)
        
        
        def on_background4():
            for index4 in range(3):
                createEnemy(6,
                    75,
                    "Speedy",
                    img("""
                        . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . f f f f f f f f . . . . 
                                            . . . f 9 9 9 9 9 9 9 9 f . . . 
                                            . . . f c 8 8 8 8 8 8 9 f . . . 
                                            . . . f c 8 8 8 8 8 8 9 f . . . 
                                            . . . f c 8 8 8 8 8 8 9 f . . . 
                                            . . . f c 8 8 8 8 8 8 9 f . . . 
                                            . . . f c 8 8 8 8 8 8 9 f . . . 
                                            . . . f c 8 8 8 8 8 8 9 f . . . 
                                            . . . f c c c c c c c 9 f . . . 
                                            . . . . f f f f f f f f . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . .
                    """),
                    1,
                    False)
                pause(500)
        timer.background(on_background4)
        
    elif Wave == 4:
        Money += 550
        EnemysInWave = 9
        
        def on_background5():
            for index5 in range(9):
                createEnemy(6,
                    75,
                    "Speedy",
                    img("""
                        . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . f f f f f f f f . . . . 
                                            . . . f 9 9 9 9 9 9 9 9 f . . . 
                                            . . . f c 8 8 8 8 8 8 9 f . . . 
                                            . . . f c 8 8 8 8 8 8 9 f . . . 
                                            . . . f c 8 8 8 8 8 8 9 f . . . 
                                            . . . f c 8 8 8 8 8 8 9 f . . . 
                                            . . . f c 8 8 8 8 8 8 9 f . . . 
                                            . . . f c 8 8 8 8 8 8 9 f . . . 
                                            . . . f c c c c c c c 9 f . . . 
                                            . . . . f f f f f f f f . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . .
                    """),
                    1,
                    False)
                pause(500)
        timer.background(on_background5)
        
    elif Wave == 5:
        Money += 650
        EnemysInWave = 6
        
        def on_background6():
            for index6 in range(6):
                createEnemy(25,
                    25,
                    "Tank",
                    img("""
                        . . . . . . . . . . . . . . . . 
                                            . . f f f f f f f f f f f f . . 
                                            . f d d d d d d d d d d d d f . 
                                            . f c f b b b b b b b b f d f . 
                                            . f c b b b b b b b b b b d f . 
                                            . f c b b b b b b b b b b d f . 
                                            . f c b b b b b b b b b b d f . 
                                            . f c b b b b b b b b b b d f . 
                                            . f c b b b b b b b b b b d f . 
                                            . f c b b b b b b b b b b d f . 
                                            . f c b b b b b b b b b b d f . 
                                            . f c b b b b b b b b b b d f . 
                                            . f c f b b b b b b b b f d f . 
                                            . f c c c c c c c c c c c d f . 
                                            . . f f f f f f f f f f f f . . 
                                            . . . . . . . . . . . . . . . .
                    """),
                    1,
                    False)
                pause(500)
        timer.background(on_background6)
        
    elif Wave == 6:
        Money += 700
        EnemysInWave = 15
        
        def on_background7():
            for index7 in range(9):
                createEnemy(25,
                    25,
                    "Tank",
                    img("""
                        . . . . . . . . . . . . . . . . 
                                            . . f f f f f f f f f f f f . . 
                                            . f d d d d d d d d d d d d f . 
                                            . f c f b b b b b b b b f d f . 
                                            . f c b b b b b b b b b b d f . 
                                            . f c b b b b b b b b b b d f . 
                                            . f c b b b b b b b b b b d f . 
                                            . f c b b b b b b b b b b d f . 
                                            . f c b b b b b b b b b b d f . 
                                            . f c b b b b b b b b b b d f . 
                                            . f c b b b b b b b b b b d f . 
                                            . f c b b b b b b b b b b d f . 
                                            . f c f b b b b b b b b f d f . 
                                            . f c c c c c c c c c c c d f . 
                                            . . f f f f f f f f f f f f . . 
                                            . . . . . . . . . . . . . . . .
                    """),
                    1,
                    False)
                pause(750)
        timer.background(on_background7)
        
        
        def on_background8():
            for index8 in range(6):
                createEnemy(6,
                    75,
                    "Speedy",
                    img("""
                        . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . f f f f f f f f . . . . 
                                            . . . f 9 9 9 9 9 9 9 9 f . . . 
                                            . . . f c 8 8 8 8 8 8 9 f . . . 
                                            . . . f c 8 8 8 8 8 8 9 f . . . 
                                            . . . f c 8 8 8 8 8 8 9 f . . . 
                                            . . . f c 8 8 8 8 8 8 9 f . . . 
                                            . . . f c 8 8 8 8 8 8 9 f . . . 
                                            . . . f c 8 8 8 8 8 8 9 f . . . 
                                            . . . f c c c c c c c 9 f . . . 
                                            . . . . f f f f f f f f . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . .
                    """),
                    1,
                    False)
                pause(500)
        timer.background(on_background8)
        
    elif Wave == 7:
        Money += 960
        EnemysInWave = 1
        createEnemy(125,
            60,
            "Monke",
            img("""
                . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . f f f f f f f f . . . . 
                            . . . f 4 4 4 4 4 4 4 4 f . . . 
                            . . . f c e e e e e e 4 f . . . 
                            . . . f c e e e e e e 4 f . . . 
                            . . . f c e e e e e e 4 f . . . 
                            . . . f c e e e e e e 4 f . . . 
                            . . . f c e e e e e e 4 f . . . 
                            . . . f c e e e e e e 4 f . . . 
                            . . . f c c c c c c c 4 f . . . 
                            . . . . f f f f f f f f . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . .
            """),
            1,
            True)
    elif Wave == 8:
        Money += 1200
    elif Wave == 9:
        Money += 1400
    elif Wave == 10:
        Money += 1550
    elif Wave == 11:
        Money += 1700
    elif Wave == 12:
        Money += 1900
    elif Wave == 13:
        Money += 2000
    elif Wave == 14:
        Money += 2500
    elif Wave == 15:
        Money += 3000
        EnemysInWave = 1
        createEnemy(1500,
            30,
            "FinalBoss",
            img("""
                f f f f f f f f f f f f f f f f 
                            f 3 3 3 3 3 3 3 3 3 3 3 3 3 3 f 
                            f c 2 2 2 2 2 2 2 2 2 2 2 2 3 f 
                            f c 2 2 2 2 2 2 2 2 2 2 2 2 3 f 
                            f c 2 2 2 2 2 2 2 2 2 2 2 2 3 f 
                            f c 2 2 2 2 2 2 2 2 2 2 2 2 3 f 
                            f c 2 2 2 2 2 2 2 2 2 2 2 2 3 f 
                            f c 2 2 2 2 2 2 2 2 2 2 2 2 3 f 
                            f c 2 2 2 2 2 2 2 2 2 2 2 2 3 f 
                            f c 2 2 2 2 2 2 2 2 2 2 2 2 3 f 
                            f c 2 2 2 2 2 2 2 2 2 2 2 2 3 f 
                            f c 2 2 2 2 2 2 2 2 2 2 2 2 3 f 
                            f c 2 2 2 2 2 2 2 2 2 2 2 2 3 f 
                            f c 2 2 2 2 2 2 2 2 2 2 2 2 3 f 
                            f c c c c c c c c c c c c c 3 f 
                            f f f f f f f f f f f f f f f f
            """),
            1,
            True)
    elif Wave == 16:
        game.set_game_over_message(True, "We've survived the enemy rush!")
        game.game_over(True)

def on_on_overlap4(sprite6, otherSprite4):
    sprites.destroy(sprite6)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap4)

def Variables():
    global Timer, Wave, MaxTowersPlaced, TowersPlaced, Intermission, CanMove, CanOpenMenu
    Timer = 0
    Wave = -1
    MaxTowersPlaced = 15
    TowersPlaced = 0
    Intermission = False
    CanMove = True
    CanOpenMenu = True
projectile: Sprite = None
CanOpenMenu = False
CanMove = False
Intermission = False
Timer = 0
Wave = 0
Target: Sprite = None
TouchingTowerString = ""
WaveHUD: TextSprite = None
TowerPlacedHUD: TextSprite = None
HPHUD: TextSprite = None
BorderHUD: Sprite = None
TimerHUD: TextSprite = None
MoneyHUD: TextSprite = None
EnemyHPBar: StatusBarSprite = None
NewEnemy: Sprite = None
location2: tiles.Location = None
Touchingtower: Sprite = None
newTower: Sprite = None
MaxTowersPlaced = 0
TowersPlaced = 0
Money = 0
EquippedTowers: List[str] = []
EnemysInWave = 0
BaseHP: StatusBarSprite = None
wall: Sprite = None
PlayerSprite: Sprite = None
item: List[tiles.Location] = []
StartSprite: Sprite = None
playercreate()
hud()
Variables()
Waves()
scene.set_background_color(7)
tiles.set_current_tilemap(tilemap("""
    level2
"""))
EndSprite = sprites.create(img("""
        . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 6 6 . . . . . . . 
            . . . . . . . 6 6 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . .
    """),
    SpriteKind.End)
tiles.place_on_tile(EndSprite, tiles.get_tile_location(6, 11))
StartSprite = sprites.create(img("""
        . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 6 6 . . . . . . . 
            . . . . . . . 6 6 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . .
    """),
    SpriteKind.Start)
tiles.place_on_tile(StartSprite, tiles.get_tile_location(23, 4))
item = scene.a_star(StartSprite.tilemap_location(),
    EndSprite.tilemap_location(),
    sprites.castle.tile_dark_grass3)
tiles.place_on_random_tile(PlayerSprite, assets.tile("""
    myTile9
"""))
for value3 in tiles.get_tiles_by_type(assets.tile("""
    myTile11
""")):
    wall = sprites.create(img("""
            a 3 3 a c a a c a a c c c a c c 
                    a 3 3 a c 3 a c a a c a c a c c 
                    a 3 3 c c 3 a c a a c a c a c c 
                    c c c c c 3 a c c c c a c a c c 
                    c 3 3 a c 3 a c a a c a c c c c 
                    a 3 3 a c 3 a c a a c a c c c c 
                    a 3 3 a c a c c a a c a c a c c 
                    a 3 3 a c c c c a a c c c a c c 
                    a 3 3 a c a a c a a c c c a c c 
                    a 3 3 a c 3 a c a a c a c a c c 
                    a 3 3 a c 3 a c a a c a c a c c 
                    c c c c c 3 a c a c c a c a c c 
                    c 3 a a c 3 a c c c c a c c c c 
                    a 3 3 a c 3 a c a a c a c c c c 
                    a 3 3 a c a c c a a c a c a c c 
                    a 3 3 a c c c c a a c c c a c c
        """),
        SpriteKind.HUD)
    wall.z = 7
    tiles.place_on_tile(wall, value3)

def on_on_update():
    global Timer, Intermission, EnemysInWave
    if (EnemysInWave == 0 or Timer == 0) and not (Intermission):
        Timer = 5
        Intermission = True
    elif Timer == 0 and Intermission:
        Intermission = False
        EnemysInWave = 0
        Waves()
    else:
        
        def on_throttle():
            global Timer
            Timer += -1
        timer.throttle("action", 1000, on_throttle)
        
    HPHUD.set_text("" + str(BaseHP.value) + "/" + str(BaseHP.max))
    MoneyHUD.set_text("" + str(Math.round(Money)) + "$")
    TimerHUD.set_text("" + str(Math.floor(Timer / 60)) + ":" + str(Timer % 60))
    TowerPlacedHUD.set_text("" + str(TowersPlaced) + "/" + str(MaxTowersPlaced))
    WaveHUD.set_text("Wave " + str(Wave))
game.on_update(on_on_update)

def on_on_update2():
    global Target, projectile, Money, EnemysInWave
    for value5 in sprites.all_of_kind(SpriteKind.Tower):
        Target = spriteutils.get_sprites_within(SpriteKind.enemy,
            sprites.read_data_number(value5, "Range"),
            value5)[0]
        if Target and sprites.read_data_boolean(value5, "canAttack"):
            sprites.set_data_boolean(value5, "canAttack", False)
            projectile = sprites.create_projectile_from_sprite(img("""
                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . f f . . . . . . . 
                                    . . . . . . f c c f . . . . . . 
                                    . . . . . . f c c f . . . . . . 
                                    . . . . . . . f f . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . .
                """),
                value5,
                0,
                0)
            projectile.follow(Target, 350)
            projectile.lifespan = 1500
            projectile.set_flag(SpriteFlag.GHOST_THROUGH_WALLS, True)
            statusbars.get_status_bar_attached_to(StatusBarKind.enemy_health, Target).value += 0 - sprites.read_data_number(value5, "Damage")
            if statusbars.get_status_bar_attached_to(StatusBarKind.enemy_health, Target).value <= 0:
                Money += statusbars.get_status_bar_attached_to(StatusBarKind.enemy_health, Target).max * 0.45
                sprites.destroy(Target)
                EnemysInWave += -1
            
            def on_after():
                sprites.set_data_boolean(value5, "canAttack", True)
            timer.after(sprites.read_data_number(value5, "Cooldown"), on_after)
            
game.on_update(on_on_update2)
