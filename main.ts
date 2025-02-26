namespace SpriteKind {
    export const HUD = SpriteKind.create()
    export const Waypoint = SpriteKind.create()
    export const End = SpriteKind.create()
    export const Start = SpriteKind.create()
    export const Tower = SpriteKind.create()
    export const Support = SpriteKind.create()
}
/**
 * - velocity
 * 
 * x = left
 * 
 * y = up
 * 
 * + velocity
 * 
 * x = right
 * 
 * y = down
 */
function placementMenu () {
    UpgradeMenu = miniMenu.createMenu(
    miniMenu.createMenuItem(EquippedTowers[0]),
    miniMenu.createMenuItem(EquippedTowers[1]),
    miniMenu.createMenuItem(EquippedTowers[2]),
    miniMenu.createMenuItem(EquippedTowers[3]),
    miniMenu.createMenuItem(EquippedTowers[4])
    )
    UpgradeMenu.setFlag(SpriteFlag.RelativeToCamera, true)
    UpgradeMenu.z = 10
    UpgradeMenu.setPosition(30, 60)
    UpgradeMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        if (selectedIndex == 0) {
            TowerIndex(EquippedTowers[0])
        } else if (selectedIndex == 1) {
            TowerIndex(EquippedTowers[1])
        } else if (selectedIndex == 2) {
            TowerIndex(EquippedTowers[2])
        } else if (selectedIndex == 3) {
            TowerIndex(EquippedTowers[3])
        } else if (selectedIndex == 4) {
            TowerIndex(EquippedTowers[4])
        }
        sprites.destroy(UpgradeMenu)
        InUpgradeMenu = false
    })
    UpgradeMenu.onButtonPressed(controller.B, function (selection, selectedIndex) {
        sprites.destroy(UpgradeMenu)
        InUpgradeMenu = false
    })
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite6, otherSprite4) {
    sprites.destroy(sprite6)
})
// To-Do:
// 
// -Wave building
// 
// - Upgrading Towers
// 
// - Loadout system
// 
// - Shop (Buying new towers)
// 
// - Main menu
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.End, function (sprite, otherSprite) {
    scene.cameraShake(2, 500)
    sprites.destroy(sprite)
    BaseHP.value += 0 - statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value
    EnemysInWave += -1
})
function upgradeMenu (Tower: Sprite) {
    ShaderStacking = true
    showTowerRange(Touchingtower, "#ffffff")
    if (sprites.readDataNumber(Tower, "Level") != 5) {
        UpgradeCostHUD = "Up:" + sprites.readDataNumber(Tower, "UpgradeCost") + "$"
    } else {
        UpgradeCostHUD = "MAXED"
    }
    UpgradeMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("Lvl:" + sprites.readDataNumber(Tower, "Level"), sprites.readDataImage(Tower, "UpgradeIcon")),
    miniMenu.createMenuItem("Dmg:" + sprites.readDataNumber(Tower, "Damage")),
    miniMenu.createMenuItem("Cd:" + sprites.readDataNumber(Tower, "Cooldown") / 1000),
    miniMenu.createMenuItem("Range:" + sprites.readDataNumber(Tower, "Range")),
    miniMenu.createMenuItem(UpgradeCostHUD),
    miniMenu.createMenuItem("Sell " + sprites.readDataNumber(Touchingtower, "Sellcost") * 0.8 + "$")
    )
    UpgradeMenu.setFlag(SpriteFlag.RelativeToCamera, true)
    UpgradeMenu.z = 10
    UpgradeMenu.setPosition(30, 60)
    UpgradeMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        if (selectedIndex == 4) {
            TowerUpgradeIndex(sprites.readDataString(Touchingtower, "Name"), sprites.readDataNumber(Touchingtower, "Level") + 1)
        } else if (selectedIndex == 5) {
            tiles.setTileAt(Touchingtower.tilemapLocation(), sprites.castle.tileGrass1)
            sprites.destroy(Touchingtower)
            Money += sprites.readDataNumber(Touchingtower, "Sellcost") * 0.8
            TowersPlaced += -1
        }
        sprites.destroy(UpgradeMenu)
        InUpgradeMenu = false
        sprites.destroy(range_shader)
        ShaderStacking = false
    })
    UpgradeMenu.onButtonPressed(controller.B, function (selection, selectedIndex) {
        sprites.destroy(UpgradeMenu)
        InUpgradeMenu = false
        sprites.destroy(range_shader)
        ShaderStacking = false
    })
}
function playercreate () {
    PlayerSprite = sprites.create(img`
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
        `, SpriteKind.Player)
    controller.moveSprite(PlayerSprite, 100, 100)
    scene.cameraFollowSprite(PlayerSprite)
    PlayerSprite.z = 6
    EquippedTowers = [
    "Scout",
    "Sniper",
    "Poison",
    "Gunner",
    "Support"
    ]
    anim()
}
sprites.onDestroyed(SpriteKind.Enemy, function (sprite5) {
    for (let value of sprites.allOfKind(SpriteKind.Tower)) {
        for (let value2 of sprites.allOfKind(SpriteKind.Projectile)) {
            Target = spriteutils.getSpritesWithin(SpriteKind.Enemy, sprites.readDataNumber(value, "Range"), value)[0]
            value2.follow(Target, 350)
        }
    }
})
function createTower (cost: number, Name: string, Cooldown: number, Range: number, Damage: number, Icon: Image, Level: number, Upgrading: boolean, UpgradeCost: number, UpgradeIcon: Image, seeHidden: boolean, sellCost: number) {
    if (Money >= cost) {
        if (TowersPlaced < MaxTowersPlaced) {
            if (Upgrading) {
                sprites.destroy(Touchingtower)
            } else {
                TowersPlaced += 1
            }
            newTower = sprites.create(Icon, SpriteKind.Tower)
            sprites.setDataString(newTower, "Name", Name)
            if (sprites.readDataString(newTower, "Name") == "Support") {
                newTower.setKind(SpriteKind.Support)
            }
            Money += 0 - cost
            sprites.setDataImageValue(newTower, "UpgradeIcon", UpgradeIcon)
            sprites.setDataNumber(newTower, "Cooldown", Cooldown * 1000)
            sprites.setDataNumber(newTower, "Discount", 1)
            sprites.setDataNumber(newTower, "Cost", cost)
            sprites.setDataNumber(newTower, "UpgradeCost", UpgradeCost)
            sprites.setDataNumber(newTower, "Range", Range)
            sprites.setDataNumber(newTower, "Sellcost", sellCost)
            sprites.setDataNumber(newTower, "Level", Level)
            sprites.setDataNumber(newTower, "Damage", Damage)
            sprites.setDataBoolean(newTower, "AttackHidden", seeHidden)
            sprites.setDataBoolean(newTower, "canAttack", true)
            tiles.placeOnTile(newTower, PlayerSprite.tilemapLocation())
            tiles.setTileAt(newTower.tilemapLocation(), sprites.castle.tileGrass3)
        } else {
            InfoHUD.setText("Tower Limit!")
            InfoHUD.setFlag(SpriteFlag.Invisible, false)
            timer.after(750, function () {
                InfoHUD.setFlag(SpriteFlag.Invisible, true)
            })
        }
    } else {
        InfoHUD.setText("Need " + Math.round(Math.abs(cost - Money)) + "$")
        InfoHUD.setFlag(SpriteFlag.Invisible, false)
        timer.after(750, function () {
            InfoHUD.setFlag(SpriteFlag.Invisible, true)
        })
    }
    return newTower
}
function TowerUpgradeIndex (Name: string, Level: number) {
    if (Name == "Sniper") {
        if (Level == 2) {
            createTower(250, "Sniper", 1.5, 75, 8, img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . c c c c c . . . 
                . . . . . . c c 5 5 5 5 5 c . . 
                . . . . . c 5 5 5 5 5 5 5 5 c . 
                . . . . c b b b b b b 5 5 5 c . 
                . . . . c 1 1 b b 1 b b c c . . 
                . . . c 1 1 1 b b 1 1 1 c . . . 
                . . . c 1 1 1 1 b 1 1 1 c . c c 
                . . . c d 1 f 1 b 1 1 1 b b 5 c 
                . . c c d f f f b 1 b 1 5 5 5 c 
                . c c d d 1 f 1 1 1 b 1 b b 5 c 
                f d d d 1 1 1 1 1 b b 1 f . c c 
                f f f 1 1 1 1 1 1 b b b f . . . 
                . . . f f 1 1 1 b b b 5 5 f . . 
                . . . . . f f f 5 5 5 5 5 f . . 
                . . . . . . . . f f f f f f . . 
                `, 2, true, 500, img`
                . . . . . . . . . . . . . . . . 
                . f f f . . . . . . . . . . . . 
                f . . . f . . . . . . . . . . . 
                f . . . f . . . . . . . . . . . 
                f . . f f . . . . . . . . . . . 
                f . f b b f f . . . . . f f f . 
                f f b c c b b f f . . f . . . f 
                . f b c c c c b b f f f . . . f 
                . f b c c c c c c b b b f . . f 
                . f b c c c c c c c c c f . . f 
                . . f c c c c c c c c c f . . f 
                . . . f f c c c c c c c f f f . 
                . . . . . f f f c c c f . . . . 
                . . . . . . . . f f f . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, false, 800)
        } else if (Level == 3) {
            createTower(500, "Sniper", 1.5, 75, 18, img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . c c c c c . . . 
                . . . . . . c c 5 5 5 5 5 c . . 
                . . . . . c 5 5 5 5 5 5 5 5 c . 
                . . . . c b b b b b b 5 5 5 c . 
                . . . . c 1 1 b b 1 b b c c . . 
                . . . c 1 1 1 b b 1 1 1 c . . . 
                . . . c 1 1 1 1 b 1 1 1 c . c c 
                . . . c d 1 f 1 b 1 1 1 b b 5 c 
                . . f c d f f f b 1 b 1 5 5 5 c 
                . f f f d 1 f 1 1 1 b 1 b b 5 c 
                f f f f 1 1 1 1 1 b b 1 f . c c 
                f f f f f 1 1 1 1 b b b f . . . 
                . . . f f 1 1 1 b b b 5 5 f . . 
                . . . . . f f f 5 5 5 5 5 f . . 
                . . . . . . . . f f f f f f . . 
                `, 3, true, 1100, img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . f f f f f f f f f f f f . . 
                . f 9 9 9 9 9 9 9 9 9 9 9 9 f . 
                . f 9 7 7 7 7 7 7 7 7 7 7 6 f . 
                . f 9 7 7 7 7 7 7 7 7 7 7 6 f . 
                . f 9 7 7 7 7 7 7 7 7 7 7 6 f . 
                . . f 6 6 6 6 f f 6 6 6 6 f . . 
                . . . f f f f . . f f f f . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, false, 1300)
        } else if (Level == 4) {
            createTower(1100, "Sniper", 1.3, 90, 45, img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . c c c c c . . . 
                . . . . . . c c 5 5 5 5 5 c . . 
                . . . . . c 5 5 5 5 5 5 5 5 c . 
                . . . . c b b b b b b 5 5 5 c . 
                . . . . c 1 1 b b 1 b b c c . . 
                . . . f 1 1 1 b b 1 1 1 c . . . 
                . . . 6 f f f 1 b 1 1 1 c . c c 
                . . . 6 6 6 6 f b 1 1 1 b b 5 c 
                . . f f 6 6 6 f b 1 b 1 5 5 5 c 
                . f f d f f f 1 1 1 b 1 b b 5 c 
                f f f f 1 1 1 1 1 b b 1 f . c c 
                f f f f f 1 1 1 1 b b b f . . . 
                . . . f f 1 1 1 b b b 5 5 f . . 
                . . . . . f f f 5 5 5 5 5 f . . 
                . . . . . . . . f f f f f f . . 
                `, 4, true, 1950, img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . f f f f f f . . . . . 
                . . . f f b b b b b b f f . . . 
                . . f b b c c c c c c b b f . . 
                . f b c c c c c c c c c c c f . 
                . f b c c c c c c c c c c c f . 
                . f b c c c c c c c c c c c f . 
                f b c c c c c c c c c c c c c f 
                f b c c c c c c c c c c c c c f 
                f b c c c c c c c c c c c c c f 
                . f c c c c c c c c c c c c f . 
                . . f f f c c c c c c f f f . . 
                . . . . . f f f f f f . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, true, 2400)
        } else if (Level == 5) {
            createTower(1950, "Sniper", 0.9, 90, 90, img`
                . . . . . f f f f f f . . . . . 
                . . . . f c c c c c c f f . . . 
                . . . f c c c c c c c c c f . . 
                . . . f c f f f f f c c c f . . 
                . . . f f b b b b b f c c c f . 
                . . . . c 1 1 b b 1 b f c c f . 
                . . . f 1 1 1 b b 1 1 1 f f f . 
                . . . 6 f f f 1 b 1 1 1 c . c c 
                . . . 6 6 6 6 f b 1 1 1 b b 5 c 
                . . f f 6 6 6 f b 1 b 1 5 5 5 c 
                . f f d f f f 1 1 1 b 1 b b 5 c 
                f f f f 1 1 1 1 1 b b 1 f . c c 
                f f f f f 1 1 1 1 b b b f . . . 
                . . . f f 1 1 1 b b b 5 5 f . . 
                . . . . . f f f 5 5 5 5 5 f . . 
                . . . . . . . . f f f f f f . . 
                `, 5, true, 0, img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, true, 4350)
        }
    } else if (Name == "Scout") {
        if (Level == 2) {
            createTower(100, "Scout", 0.6, 50, 3, img`
                . . . . . . . . . . . . . . . . 
                . e e e . . . . e e e . . . . . 
                . c d d c . . c d d c . . . . . 
                . c b d d f f d d b c . . . . . 
                . c 3 b d d b d b 3 c . . . . . 
                . f b 3 d d d d 3 b f . . . . . 
                . e d d d d d d d d e b f b . . 
                . e d f d d d d f d e f d f . . 
                . f d f f d d f f d f f d f . . 
                . f b d d b b d d 2 f f d f . . 
                . . f 2 2 2 2 2 2 b b f d f . . 
                . . f b d d d d d d b d b f . . 
                . . f d d d d d b d d f f . . . 
                . . f d f f f d f f d f . . . . 
                . . f f . . f f . . f f . . . . 
                . . . . . . . . . . . . . . . . 
                `, 2, true, 250, img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . f f f . . . . . . . . . . . . 
                f c c c f f f f . . . . . . . . 
                f c c c c c c c f f f f . . . . 
                f c c c c c c c c c c 1 f f f . 
                f c c c c c c c c c 1 1 c c 1 f 
                f c c c c c c c c 1 1 c c 1 c f 
                . f c c c c c c 1 1 c c 1 c c f 
                . . f c c c c f 1 c c 1 c c f . 
                . . . f f f f . f c 1 c c f . . 
                . . . . . . . . . f f f f . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, false, 350)
        } else if (Level == 3) {
            createTower(250, "Scout", 0.5, 55, 4, img`
                . . . . . . . . . . . . . . . . 
                . e e e . . . . e e e . . . . . 
                . c d d c . . c d d c . . . . . 
                . c b d d f f d d b c . . . . . 
                . c 3 b d d b d b 3 c . . . . . 
                . f b 3 d d d d 3 b f . . . . . 
                . e d d d d d d d d e . . . . . 
                . e f f f f f f f f e . b f b . 
                . f d f f d d f f d f . f d f . 
                . f b d d b b d d 2 f . f d f . 
                . . f 2 2 2 2 2 2 b b f f d f . 
                . . f b d d d d d d b b d b f . 
                . . f d d d d d b d d f f f . . 
                . . f d f f f d f f d f . . . . 
                . . f f . . f f . . f f . . . . 
                . . . . . . . . . . . . . . . . 
                `, 3, true, 750, img`
                . . . . . . . . . . . . . . . . 
                . . f f f . f f f . f f . . . . 
                . f b b b f b b b f b b f . . . 
                . . f b c c f c c c f c b f . . 
                . . f b c c f c c c f c c f . . 
                . . f b c c f c c c f c c f . . 
                . . f b c c c c c c c c c f . . 
                . . . f c c c c c c c c f . . . 
                . . . f c c c c c c c c f . . . 
                . . . f c c c c c c c c f . . . 
                . . . . f c c c c c c f . . . . 
                . . . . f c c c c c c f . . . . 
                . . . . f f f f f f f f . . . . 
                . . . . 2 2 2 2 2 2 2 2 2 . . . 
                . . . . f f f f f f f f . . . . 
                . . . . . . . . . . . . . . . . 
                `, true, 600)
        } else if (Level == 4) {
            createTower(750, "Scout", 0.5, 65, 10, img`
                . . . . . . . . . . . . . . . . 
                . e e e . . . . e e e . . . . . 
                . c d d c . . c d d c . . . . . 
                . c b d d f f d d b c . . . . . 
                . c 3 b d d b d b 3 c . . . . . 
                . f b 3 d d d d 3 b f . . . . . 
                . e d d d d d d d d e . . . . . 
                . e f f f f f f f f e . b f b . 
                . f d f f d d f f d f . f d f . 
                . f b d d b b d d 2 f . f d f . 
                . . f 2 2 2 2 2 2 b b f f d f . 
                . . f b d d d d d d b b d b f . 
                . . f f d d d f b d f f f f . . 
                . . f c f f f c f f c f . . . . 
                . . f f . . f f . . f f . . . . 
                . . . . . . . . . . . . . . . . 
                `, 4, true, 1100, img`
                . . . . . . . . . . . . . . . . 
                . f f f . . . . f f f . . . . . 
                . f b b f . . f b b f . . . . . 
                . f b c c f f c c c f . . . . . 
                . f b c c c c c c c f . . . . . 
                . f b c c c c c c c f . . . . . 
                . f b c c c c c c c f . . . . . 
                . f b f c c c c f c f . f f f . 
                . f b c f c c f c c f . f c f . 
                . f b c c c c c c c f . f c f . 
                . . f f f f f f f f c f f c f . 
                . . f c c c c c c c c c c c f . 
                . . f c c c c c c c c f f f . . 
                . . f c f f f c f f c f . . . . 
                . . f f . . f f . . f f . . . . 
                . . . . . . . . . . . . . . . . 
                `, true, 1350)
        } else if (Level == 5) {
            createTower(1100, "Scout", 0.33, 70, 12, img`
                . . . . . . . . . . . . . . . . 
                . e e e . . . . e e e . . . . . 
                . c d d c . . c d d c . . . . . 
                . c b d d f f d d b c . . . . . 
                . c 3 b d d b d b 3 c . . . . . 
                . f b 3 d d d d 3 b f . . . . . 
                . e d d d d d d d d e . . . . . 
                . e f f f f f f f f e . b f b . 
                . f f f f f f f f f f . f c f . 
                . f b d d b b d d 2 f . f c f . 
                . . f 2 2 2 2 2 2 b b f f c f . 
                . . f b d d d d d d b c c c f . 
                . . f f d d d f b d f f f f . . 
                . . f f f f f f f f f f . . . . 
                . f f f . f f f . . f f f . . . 
                . f f f . f f f . . f f f . . . 
                `, 5, true, 0, img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, true, 2450)
        }
    } else if (Name == "Poison") {
        if (Level == 2) {
            createTower(100, "Poison", 0.6, 50, 4, img`
                . . . . c c c c c c . . . . . . 
                . . . c 6 7 7 7 7 6 c . . . . . 
                . . c 7 7 7 7 7 7 7 7 c . . . . 
                . c 6 7 7 7 7 7 7 7 7 6 c . . . 
                . c 7 c 6 6 6 6 c 7 7 7 c . . . 
                . f 7 6 f 6 6 f 6 7 7 7 f . . . 
                . f 7 7 7 7 7 7 7 7 7 7 f . . . 
                . . f 7 7 7 7 6 c 7 7 6 f c . . 
                . . . f c c c c 7 7 6 f 7 7 c . 
                . . c 7 1 7 1 7 6 c f 7 7 7 7 c 
                . c 7 7 7 7 7 c f c 6 7 7 6 c c 
                c 1 1 1 1 7 6 f c c 6 6 6 c . . 
                f 1 1 1 1 1 6 6 c 6 6 6 6 f . . 
                f 6 1 1 1 1 1 6 6 6 6 6 c f . . 
                . f 6 1 1 1 1 1 1 6 6 6 f . . . 
                . . c c c c c c c c c f . . . . 
                `, 2, true, 450, img`
                . . . . . f 1 1 1 1 f . . . . . 
                . . . . f 1 1 1 1 f . . . . . . 
                . . . . f 1 1 1 f . . . . . . . 
                . . . f 1 1 1 1 1 f f f f . . . 
                . . . f 1 1 1 1 1 1 1 1 1 f . . 
                . . . f f 1 1 1 1 1 1 1 1 f . . 
                . . . . . f f f f f f 1 1 f . . 
                . . . . . 6 7 7 7 7 7 f f f . . 
                . . . . . . 6 7 7 7 7 6 . . . . 
                . . . . . . 6 7 7 7 6 . . . . . 
                . . . . . . . 6 7 6 . . . . . . 
                . . . . . . . 6 7 6 . . . . . . 
                . . . . . . . 6 7 6 . . . . . . 
                . . . . . . 6 7 7 6 . . . . . . 
                . . . . . 6 7 7 7 7 6 . . . . . 
                f f f f f f f f f f f f f f f f 
                `, false, 1)
        } else if (Level == 3) {
            createTower(450, "Poison", 1.5, 75, 10, img`
                . . . . c c c c c c . . . . . . 
                . . . c 6 7 7 7 7 6 c . . . . . 
                . . c 7 7 7 7 7 7 7 7 c . . . . 
                . c 6 7 7 7 7 7 7 7 7 6 c . . . 
                . c 7 c 6 6 6 6 c 7 7 7 c . . . 
                . f 7 6 f 6 6 f 6 7 7 7 f . . . 
                . f 7 7 7 7 7 7 7 7 7 f f f . . 
                . . f 7 7 7 7 6 c f f c c c f f 
                . . . f c c c c 7 f c c c c c f 
                . . c 7 1 7 1 7 6 f f c c c f f 
                . c 7 7 7 7 7 c f f 6 f f f 6 f 
                c 1 1 1 1 7 6 f c f 6 6 6 6 6 f 
                f 1 1 1 1 1 6 6 c f 6 6 6 6 6 f 
                f 6 1 1 1 1 1 6 6 f 6 6 6 6 6 f 
                . f 6 1 1 1 1 1 1 f 6 6 6 6 6 f 
                . . c c c c c c c f f f f f f f 
                `, 3, true, 800, img`
                . . . . . . . . . . . . . . . . 
                . . . . . f f f f f f . . . . . 
                . . . f f 6 6 6 6 6 6 f f . . . 
                . . f 6 6 6 6 6 6 6 6 6 6 f . . 
                . f 6 6 f f 6 6 6 6 f f 6 8 f . 
                . f 6 f f f f 6 6 f f f f 8 f . 
                . f 6 f f f f 6 6 f f f f 8 f . 
                . f 6 6 f f 6 6 6 6 f f 6 8 f . 
                . f 6 6 6 6 6 6 6 6 6 6 6 8 f . 
                . f 6 6 6 6 f f f f 6 6 6 8 f . 
                . . f 6 6 f f b f c f 6 8 f . . 
                . . f 6 6 f b f b f f 6 8 f . . 
                . . f 6 6 f f c f c f 6 8 f . . 
                . . . f 6 6 f f f f 6 6 f . . . 
                . . . f 6 6 6 6 6 6 6 8 f . . . 
                . . . . f 8 8 8 8 8 8 f . . . . 
                `, false, 1)
        } else if (Level == 4) {
            createTower(800, "Poison", 1.7, 90, 17, img`
                . . . . f f f f f f . . . . . . 
                . . . f 6 6 6 6 6 6 f . . . . . 
                . . f 6 6 6 6 6 6 6 6 f . . . . 
                . f 6 6 6 6 6 6 6 6 6 6 f . . . 
                . f 6 f f 6 6 f f 6 6 6 f . . . 
                . f 6 f f 6 6 f f 6 6 6 f . . . 
                . f 6 6 6 f f 6 6 6 6 f f f . . 
                . . f 6 f c c f f f f c c c f f 
                . . . f f f f f 7 f c c c c c f 
                . . c 7 7 7 7 7 6 f f c c c f f 
                . c 7 7 7 7 7 c f f 6 f f f 6 f 
                c 1 1 1 1 7 6 f c f 6 6 6 6 6 f 
                f 1 1 1 1 1 6 6 c f 6 6 6 6 6 f 
                f 6 1 1 1 1 1 6 6 f 6 6 6 6 6 f 
                . f 6 1 1 1 1 1 1 f 6 6 6 6 6 f 
                . . c c c c c c c f f f f f f f 
                `, 4, true, 1650, img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . f f f f f f f f f f . . 
                . . . f c c c c c c c c c f . . 
                . . . f c c c c c c c c c f . . 
                . . f f f f f f f f f f f f . . 
                . . f f f . . f f . . . . . . . 
                . f f f . . f . . f . . . . . . 
                . f f f . . f 6 6 f . . . . . . 
                . . . . . . f f f f . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, false, 1)
        } else if (Level == 5) {
            createTower(1650, "Poison", 0.6, 65, 45, img`
                . . . . f f f f f f . . . . . . 
                . . . f 6 6 6 6 6 6 f . . . . . 
                . . f 6 6 6 6 6 6 6 6 f . . . . 
                . f 6 6 6 6 6 6 6 6 6 6 f . . . 
                . f 6 f f 6 6 f f 6 6 6 f . . . 
                . f 6 f f 6 6 f f 6 6 6 f . . . 
                . f 6 6 6 f f 6 6 6 f f f f . . 
                . . f 6 f c c f f f 2 2 f c f f 
                . . . f f f f f f 2 f f 2 f c f 
                . . c 7 7 7 7 f 2 f f c f c f f 
                . c 7 7 f f f 2 f f 6 f f f 6 f 
                c 1 1 f c c c f c f 6 6 6 6 6 f 
                f 1 1 1 f f c f c f 6 6 6 6 6 f 
                f 6 1 1 1 1 f 6 6 f 6 6 6 6 6 f 
                . f 6 1 1 1 1 1 1 f 6 6 6 6 6 f 
                . . c c c c c c c f f f f f f f 
                `, 5, true, 0, img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, false, 1)
        }
    } else if (Name == "Gunner") {
        if (Level == 2) {
            createTower(500, "Gunner", 0.6, 55, 6, img`
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
                . . f f f f f f f f f f f c . . 
                . f f a a a a a a a a a a f . . 
                . f f a a a a a a a a a a f . . 
                . . f f f f f f f f f f f . . . 
                `, 2, true, 1500, img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . f f f f f f f f f f f f f f . 
                . f 6 6 6 6 6 f c c c c c c f . 
                . f f f f f f f c c c c c c f . 
                . . . . . . . f f f f f f c f . 
                . . . . . . . . . . f . f c f . 
                . . . . . . . . . . f f f c f . 
                . . . . . . . . . . . . f f f . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, false, 1)
        } else if (Level == 3) {
            createTower(1500, "Gunner", 0.4, 60, 4, img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . c c c c . . . . 
                . . . . . . c c d d d d c . . . 
                . . . . . c c c c c c d c . . . 
                . . . . c c 4 4 4 4 d c c . . . 
                . . . c 4 d 4 4 4 4 4 1 c . c c 
                . . c 4 4 4 1 4 4 4 4 d 1 c 4 c 
                . c 4 4 4 4 1 4 4 4 4 4 1 c 4 c 
                f 4 4 4 f f 1 4 4 4 4 4 1 4 4 f 
                f 4 4 4 f f 1 c c 4 4 4 1 f 4 f 
                f 4 4 4 4 4 1 4 4 f 4 4 d f 4 f 
                . f 4 4 4 4 1 c 4 f 4 d f f f f 
                . . f f f f f f f f f f f c . . 
                f f f a a a a a a a a a a f . . 
                f f f a a a a a a a a a a f . . 
                . . f f f f f f f f f f f . . . 
                `, 3, true, 3000, img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . f f f f f f f f f f . . . 
                . . f 9 9 1 9 9 9 9 9 9 9 f . . 
                . . f 9 1 9 9 9 9 9 9 9 9 f . . 
                . . f 1 9 9 9 9 9 9 9 9 9 f . . 
                . . f 9 9 1 9 9 9 9 9 9 9 f . . 
                . . f 9 1 9 9 9 9 9 9 9 9 f . . 
                . f 9 1 9 9 9 9 9 9 9 9 9 1 f . 
                . f 9 9 9 9 9 9 9 9 9 9 1 9 f . 
                . f 9 9 9 9 9 9 9 9 9 1 9 9 f . 
                . f 9 9 9 9 9 9 9 9 1 9 9 9 f . 
                . f f f f 9 9 9 9 9 9 f f f f . 
                . . . . . f f f f f f . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, false, 1)
        } else if (Level == 4) {
            createTower(3000, "Gunner", 0.2, 70, 11, img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . c c c c . . . . 
                . . . . . . c c d d d d c . . . 
                . . . . . c c c c c c d c . . . 
                . . . f f f f f f 4 d c c . . . 
                . . f 9 1 9 9 9 9 f 4 1 c . c c 
                . . f 1 9 9 9 9 9 f 4 d 1 c 4 c 
                . . f 9 9 9 9 9 9 f 4 4 1 c 4 c 
                . f 9 9 9 9 9 9 1 f 4 4 1 4 4 f 
                . f 9 9 9 9 9 1 9 f 4 4 1 f 4 f 
                . f 9 9 9 9 1 9 9 f 4 4 d f 4 f 
                . f f f f f f f f f 4 d f f f f 
                . . . f f f f f f f f f f c . . 
                f f f a a a a a a a a a a f . . 
                f f f a a a a a a a a a a f . . 
                . . f f f f f f f f f f f . . . 
                `, 4, true, 7500, img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . f f f f f f f f . . . . 
                f f f f 9 9 9 9 9 9 9 9 f . . . 
                f 9 9 9 6 6 6 6 6 6 6 8 f . . . 
                f f f f 8 8 8 8 8 8 8 8 f . . . 
                . . . f f f f f f f f f f . . . 
                . . f c f f c f f c f f c f . . 
                . . f c f f c f f c f f c f . . 
                . . . f f f f f f f f f f . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, true, 1)
        } else if (Level == 5) {
            createTower(7500, "Gunner", 0.1, 85, 18, img`
                . . . . . . f f f f f . . . . . 
                . . . . f f f a a a a f . . . . 
                . . . . f f f a a a a f . . . . 
                . . . . . . f a a a a f . . . . 
                . . . f f f f f f a a f . . . . 
                . . f 9 1 9 9 9 9 f f f . . . . 
                . . f 1 9 9 9 9 9 f c c f f . . 
                . . f 9 9 9 9 9 9 f c c c c f . 
                . f 9 9 9 9 9 9 1 f c c c c f . 
                . f 9 9 9 9 9 1 9 f c c c c f . 
                . f 9 9 9 9 1 9 9 f c c c c f . 
                . f f f f f f f f f c c c c f . 
                . . f f f f f f f f f f f f . . 
                f f f a a a a a a a a a a f . . 
                f f f a a a a a a a a a a f . . 
                . . f f f f f f f f f f f . . . 
                `, 5, true, 1, img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, true, 1)
        }
    } else if (Name == "Support") {
        if (Level == 2) {
            createTower(500, "Support", 0, 55, 0, img`
                . . . . . . . . . . . . . . . . 
                . . . . f f f f f f . . . . . . 
                . . f f 7 7 7 7 7 7 f f . . . . 
                . f 7 7 6 6 6 6 6 6 7 7 f . . . 
                . f 7 6 6 6 6 6 6 6 6 8 f . . . 
                f 7 6 6 6 6 6 6 6 6 6 6 8 f . . 
                f 7 6 f f f f f f f f 8 8 f . . 
                f 7 f 5 f 5 5 5 5 f 5 f 8 f . . 
                . f f 5 5 5 4 4 5 5 5 f f . f f 
                . . f 4 5 5 f f 5 5 6 f . f 5 f 
                . . . f 6 6 6 6 6 6 4 4 f 5 5 f 
                . . . f 4 5 5 5 5 5 5 4 4 5 f . 
                . . . f 5 5 5 5 5 4 5 5 f f . . 
                . . . f 5 f f f 5 f f 5 f . . . 
                . . . f f . . f f . . f f . . . 
                . . . . . . . . . . . . . . . . 
                `, 2, true, 1150, img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . f . . . . 
                . . . f . . . . . . f 4 f . . . 
                . . f 4 f . . . . . f 4 f . . . 
                . . f 4 f . . . . . f 4 f . . . 
                . . f 4 f . . f . . f 4 f . . . 
                . . f 4 f . f 4 f . f 4 f . . . 
                . . f 4 f . f 4 f . f 4 f . . . 
                . . f 4 f . f 4 f . f 4 f . . . 
                . . f 4 f . f 4 f . f 4 f . . . 
                . . f 4 f . f 4 f . f 4 f . . . 
                . . f 4 f . f 4 f . f f f . . . 
                . . f f f f f f f f f f . . . . 
                . . . f 4 4 4 4 4 4 4 4 f . . . 
                . . . f f f f f f f f f . . . . 
                . . . . . . . . . . . . . . . . 
                `, false, 1100)
        } else if (Level == 3) {
            createTower(1150, "Support", 0, 60, 0, img`
                . . . . . . . . . . . . . . . . 
                . . . . f f f f f f . . . . . . 
                . . f f 7 7 7 7 7 7 f f . . . . 
                . f 7 7 6 6 6 6 6 6 7 7 f . . . 
                . f 7 6 6 6 6 6 6 6 6 8 f . . . 
                f 7 6 6 6 6 6 6 6 6 6 6 8 f . . 
                f 7 6 f f f f f f f f 8 8 f . . 
                f 7 f 5 f 5 5 5 5 f 5 f 8 f . . 
                . f f 5 5 5 4 4 5 5 5 f f . f f 
                . . f 4 5 5 f f 5 5 f f . f 5 f 
                . . . f f e f e f e 4 4 f 5 5 f 
                . . . f 4 e 5 e 5 5 e 4 4 5 f . 
                . . . f 5 5 5 5 5 4 5 5 f f . . 
                . . . f 5 f f f 5 f f 5 f . . . 
                . . . f f . . f f . . f f . . . 
                . . . . . . . . . . . . . . . . 
                `, 3, true, 3000, img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . f f f f f f f f f . . . 
                . . . f 4 4 4 4 4 4 4 4 f f . . 
                . . f f f f f f f f f f e f . . 
                . . f 4 4 4 4 4 4 4 e f e f . . 
                . . f 4 4 4 4 4 4 4 e f e f . . 
                . . f 4 f 4 f f 4 f e f e f . . 
                . . f 4 f 4 f f 4 f e f e f . . 
                . . f 4 f 4 f f 4 f e f e f . . 
                . . f 4 f 4 f f 4 f e f e f . . 
                . . f 4 4 4 4 4 4 4 e f e f . . 
                . . f e e e e e e e e f f . . . 
                . . f f f f f f f f f f . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, false, 2250)
        } else if (Level == 4) {
            createTower(3000, "Support", 0, 65, 0, img`
                . . . . . . . . . . . . . . . . 
                . . . . f f f f f f . . . . . . 
                . . f f 7 7 7 7 7 7 f f . . . . 
                . f 7 7 6 6 6 6 6 6 7 7 f . . . 
                . f 7 6 6 6 6 6 6 6 6 8 f . . . 
                f 7 6 6 6 6 6 6 6 6 6 6 8 f . . 
                f 7 6 f f f f f f f f 8 8 f . . 
                f 7 f 5 f 5 5 5 5 f 5 f 8 f . . 
                . f f 5 5 5 4 4 5 5 5 f f . f f 
                . . f 4 5 5 f f 5 5 f f . f 5 f 
                f f f f f f f e f e 4 4 f 5 5 f 
                f 4 4 4 e f 5 e 5 5 e 4 4 5 f . 
                f 4 4 4 e f 5 5 5 4 5 5 f f . . 
                f 4 4 4 e f f f 5 f f 5 f . . . 
                f e e e e f . f f . . f f . . . 
                f f f f f f . . . . . . . . . . 
                `, 4, true, 6000, img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . f f . . 
                . . . . . . . . . f f f e f . . 
                . . . . . f f f f 4 4 e f . . . 
                . . . f f f f 4 4 4 e f . . . . 
                . . f 9 1 9 9 f 4 e f . . . . . 
                . . f 1 9 9 9 f e f . . . . . . 
                . . f 9 9 9 1 f f . . . . . . . 
                . . f 9 9 1 9 f . . . . . . . . 
                . . . f f f f . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, false, 5250)
        } else if (Level == 5) {
            createTower(6000, "Support", 0, 65, 0, img`
                . . . . . . . . . . . . . . . . 
                . . . . f f f f f f . . . . . . 
                . . f f 7 7 7 7 7 7 f f . . . . 
                . f 7 7 6 6 6 6 6 6 7 7 f . . . 
                . f 7 6 6 6 6 6 6 6 6 8 f . . . 
                f 7 6 6 6 6 6 6 6 6 6 6 8 f . . 
                f 7 6 f f f f f f f f 8 8 f . . 
                f 7 f 5 f 5 5 5 5 f 5 f 8 f . . 
                . f f 5 5 5 4 4 5 5 5 f f . f f 
                . . f 4 5 5 f f 5 5 f f . f 5 f 
                f f f f f f f e f e 4 4 f 5 5 f 
                f 4 4 4 e f 5 e 5 5 e 4 4 5 f . 
                f 4 4 4 e f 5 5 5 4 5 5 f f . . 
                f 4 4 4 e f f f 5 f f 5 f . . . 
                f e e e e f . f f . . f f . . . 
                f f f f f f . . . . . . . . . . 
                `, 5, true, 0, img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, false, 11250)
        }
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (PlayerSprite.tileKindAt(TileDirection.Center, sprites.castle.tileGrass1)) {
        if (!(InUpgradeMenu)) {
            placementMenu()
            InUpgradeMenu = true
        }
    } else if (PlayerSprite.tileKindAt(TileDirection.Center, sprites.castle.tileGrass3)) {
        if (!(ShaderStacking)) {
            upgradeMenu(Touchingtower)
            InUpgradeMenu = true
        }
    }
})
function TowerIndex (Name: string) {
    if (Name == "Sniper") {
        createTower(550, "Sniper", 1.7, 75, 8, img`
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
            `, 1, false, 250, img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f f f . . . . 
            . . f f 1 1 1 1 1 1 1 1 f f . . 
            . . f 1 1 1 1 1 1 1 1 1 1 f . . 
            . f 1 1 1 1 1 1 1 1 f 1 1 1 f . 
            . f 1 1 1 1 1 1 1 1 f 1 1 1 f . 
            . f 1 1 1 1 1 1 1 f f f 1 1 f . 
            . f 1 1 f 1 1 f f f 2 f f f f . 
            . f 1 1 1 1 1 1 1 f f f 1 1 f . 
            . f 1 1 1 1 1 1 1 1 f 1 1 1 f . 
            . f 1 1 1 1 1 1 1 1 f 1 1 1 f . 
            . . f 1 1 1 1 1 1 1 1 1 1 f . . 
            . . f f 1 1 1 1 1 1 1 1 f f . . 
            . . . . f f f f f f f f . . . . 
            . . . . . . . . . . . . . . . . 
            `, false, 550)
    } else if (Name == "Scout") {
        createTower(250, "Scout", 0.6, 50, 2, img`
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
            `, 1, false, 100, img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . f f d d f f . . . . . 
            . . . . f d d b b d d f . . . . 
            . . . . f d b b b b b f . . . . 
            . . . f d b b b b b b c f . . . 
            . . . f d b b b b b b c f . . . 
            . . . . f b b b b b c f . . . . 
            . . . . f c c b b c c f . . . . 
            . . . . . f f c c f f . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, false, 250)
    } else if (Name == "Poison") {
        createTower(350, "Poison", 0.6, 40, 3, img`
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
            `, 1, false, 100, img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . f f f . . . . . 
            . . . . . . . f 9 f . . . . . . 
            . . . . . . f 9 f . . . . . . . 
            . . . . . . f 9 7 f . . . . . . 
            . . . . . f 9 7 7 6 f . . . . . 
            . . . . . f 9 7 7 6 f . . . . . 
            . . . . . f 9 7 7 6 f . . . . . 
            . . . . . . f 6 6 6 f . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, false, 350)
    } else if (Name == "Gunner") {
        createTower(1250, "Gunner", 0.33, 55, 2, img`
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
            `, 1, false, 500, img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . f f f . . . . . . . . . . . 
            . f c c c f f f f f f . . . . . 
            . f c f c c c c c c c f f f . . 
            . f c c c c f c c f c c c c f . 
            . . f f f c c c c c c c f c f . 
            . . . . . f f f f f f c c c f . 
            . . . . . . . . . . . f f f . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, false, 1250)
    } else if (Name == "Support") {
        createTower(600, "Support", 99, 55, 2, img`
            . . . . . . . . . . . . . . . . 
            . . 4 4 4 . . . . 4 4 4 . . . . 
            . 4 5 5 5 e . . e 5 5 5 4 . . . 
            4 5 5 5 5 5 e e 5 5 5 5 5 4 . . 
            4 5 5 4 4 5 5 5 5 4 4 5 5 4 . . 
            e 5 4 4 5 5 5 5 5 5 4 4 5 e . . 
            . e e 5 5 5 5 5 5 5 5 e e . . . 
            . . e 5 f 5 5 5 5 f 5 e . . . . 
            . . f 5 5 5 4 4 5 5 5 f . . f f 
            . . f 4 5 5 f f 5 5 6 f . f 5 f 
            . . . f 6 6 6 6 6 6 4 4 f 5 5 f 
            . . . f 4 5 5 5 5 5 5 4 4 5 f . 
            . . . f 5 5 5 5 5 4 5 5 f f . . 
            . . . f 5 f f f 5 f f 5 f . . . 
            . . . f f . . f f . . f f . . . 
            . . . . . . . . . . . . . . . . 
            `, 1, false, 500, img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f f f . . . . 
            . . f f 7 7 7 7 7 7 7 7 f f . . 
            . . f 6 6 6 6 6 6 6 6 6 6 f . . 
            . f 7 6 6 6 6 6 6 6 6 6 6 8 f . 
            . f 7 6 6 6 6 6 6 6 6 6 6 8 f . 
            . f 7 6 6 6 6 6 6 6 6 6 6 8 f . 
            . f 7 6 6 f f f f f f 6 6 8 f . 
            . f 7 6 f . . . . . . f 6 8 f . 
            . f 8 8 f . . . . . . f 8 8 f . 
            . f f f . . . . . . . . f f . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, false, 600)
    } else if (false) {
    	
    } else {
    	
    }
}
function anim () {
    characterAnimations.loopFrames(
    PlayerSprite,
    [img`
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
        `,img`
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
        `,img`
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
        `,img`
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
        `],
    100,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    PlayerSprite,
    [img`
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
        `,img`
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
        `,img`
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
        `,img`
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
        `],
    100,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    PlayerSprite,
    [img`
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
        `,img`
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
        `,img`
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
        `,img`
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
        `],
    100,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    PlayerSprite,
    [img`
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
        `,img`
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
        `,img`
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
        `,img`
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
        `],
    100,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    PlayerSprite,
    [img`
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
        `],
    100,
    characterAnimations.rule(Predicate.NotMoving, Predicate.FacingUp)
    )
    characterAnimations.loopFrames(
    PlayerSprite,
    [img`
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
        `],
    100,
    characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    PlayerSprite,
    [img`
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
        `],
    100,
    characterAnimations.rule(Predicate.NotMoving, Predicate.FacingDown)
    )
    characterAnimations.loopFrames(
    PlayerSprite,
    [img`
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
        `],
    100,
    characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft)
    )
}
function showTowerRange (tower: Sprite, color: string) {
    range_shader = shader.createImageShaderSprite(image.create(sprites.readDataNumber(tower, "Range") * 2, sprites.readDataNumber(tower, "Range") * 2), shader.ShadeLevel.One)
    range_shader.setPosition(tower.x, tower.y)
    spriteutils.fillCircle(
    range_shader.image,
    sprites.readDataNumber(tower, "Range") * 1,
    sprites.readDataNumber(tower, "Range") * 1,
    sprites.readDataNumber(tower, "Range") * 1,
    1
    )
}
statusbars.onZero(StatusBarKind.Health, function (status) {
    game.setGameOverMessage(false, "We took too much damage!")
    game.gameOver(false)
})
function createEnemy (HP: number, Speed: number, Name: string, Icon: Image, Defense: number, Boss: boolean, Hidden: boolean) {
    NewEnemy = sprites.create(Icon, SpriteKind.Enemy)
    sprites.setDataString(NewEnemy, "Name", Name)
    sprites.setDataNumber(NewEnemy, "Defense", Defense)
    sprites.setDataBoolean(NewEnemy, "isBoss", Boss)
    sprites.setDataBoolean(NewEnemy, "isHidden", Hidden)
    sprites.setDataNumber(NewEnemy, "Speed", Speed)
    EnemyHPBar = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    EnemyHPBar.max = HP
    EnemyHPBar.value = HP
    EnemyHPBar.attachToSprite(NewEnemy)
    EnemyHPBar.setBarBorder(1, 15)
    EnemyHPBar.z = 0
    tiles.placeOnTile(NewEnemy, StartSprite.tilemapLocation())
    scene.followPath(NewEnemy, item, sprites.readDataNumber(NewEnemy, "Speed"))
    return NewEnemy
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Support, function (sprite2, otherSprite2) {
    Touchingtower = otherSprite2
})
function hud () {
    BaseHP = statusbars.create(60, 10, StatusBarKind.Health)
    BaseHP.max = 100
    BaseHP.value = 100
    BaseHP.setBarBorder(1, 15)
    BaseHP.setColor(7, 2, 6)
    BaseHP.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    BaseHP.setFlag(SpriteFlag.RelativeToCamera, true)
    BaseHP.setPosition(80, 7)
    BaseHP.z = 10
    MoneyHUD = textsprite.create("", 0, 5)
    MoneyHUD.setFlag(SpriteFlag.RelativeToCamera, true)
    MoneyHUD.setPosition(7, 7)
    MoneyHUD.setOutline(1, 15)
    MoneyHUD.z = 10
    TimerHUD = textsprite.create("", 0, 1)
    TimerHUD.setFlag(SpriteFlag.RelativeToCamera, true)
    TimerHUD.setPosition(123, 7)
    TimerHUD.setOutline(1, 15)
    TimerHUD.z = 10
    BorderHUD = sprites.create(img`
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
        `, SpriteKind.HUD)
    BorderHUD.setPosition(80, 8)
    BorderHUD.setFlag(SpriteFlag.RelativeToCamera, true)
    BorderHUD.z = 5
    HPHUD = textsprite.create("", 0, 7)
    HPHUD.setFlag(SpriteFlag.RelativeToCamera, true)
    HPHUD.setPosition(58, 9)
    HPHUD.setOutline(1, 15)
    HPHUD.z = 11
    TowerPlacedHUD = textsprite.create("", 0, 1)
    TowerPlacedHUD.setFlag(SpriteFlag.RelativeToCamera, true)
    TowerPlacedHUD.setPosition(128, 113)
    TowerPlacedHUD.setOutline(1, 15)
    TowerPlacedHUD.z = 11
    WaveHUD = textsprite.create("", 0, 1)
    WaveHUD.setFlag(SpriteFlag.RelativeToCamera, true)
    WaveHUD.setPosition(3, 113)
    WaveHUD.setOutline(1, 15)
    WaveHUD.z = 11
    InfoHUD = textsprite.create("", 0, 2)
    InfoHUD.setFlag(SpriteFlag.Invisible, true)
    InfoHUD.setFlag(SpriteFlag.RelativeToCamera, true)
    InfoHUD.setPosition(3, 104)
    InfoHUD.setOutline(1, 15)
    InfoHUD.z = 10
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Tower, function (sprite2, otherSprite2) {
    Touchingtower = otherSprite2
})
function Waves () {
    Wave += 1
    if (Wave == 15) {
        Timer = 600
    } else if (Wave >= 7) {
        Timer = 80
    } else if (Wave < 7) {
        Timer = 50
    }
    if (Wave == 0) {
        EnemysInWave = 1
        Timer = 5
        Money = 10000
    } else if (Wave == 1) {
        EnemysInWave = 3
        timer.background(function () {
            for (let index = 0; index < 3; index++) {
                createEnemy(6, 40, "Basic", img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . f f f f . . . . . . 
                    . . . . . f 7 7 7 7 f . . . . . 
                    . . . . f 8 6 6 6 6 7 f . . . . 
                    . . . . f 8 6 6 6 6 7 f . . . . 
                    . . . . f 8 6 6 6 6 7 f . . . . 
                    . . . . f 8 6 6 6 6 7 f . . . . 
                    . . . . . f 8 8 8 8 f . . . . . 
                    . . . . . . f f f f . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, 2, false, false)
                pause(500)
            }
        })
    } else if (Wave == 2) {
        EnemysInWave = 6
        Money += 200
        timer.background(function () {
            for (let index = 0; index < 6; index++) {
                createEnemy(6, 40, "Basic", img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . f f f f . . . . . . 
                    . . . . . f 7 7 7 7 f . . . . . 
                    . . . . f 8 6 6 6 6 7 f . . . . 
                    . . . . f 8 6 6 6 6 7 f . . . . 
                    . . . . f 8 6 6 6 6 7 f . . . . 
                    . . . . f 8 6 6 6 6 7 f . . . . 
                    . . . . . f 8 8 8 8 f . . . . . 
                    . . . . . . f f f f . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, 1, false, false)
                pause(500)
            }
        })
    } else if (Wave == 3) {
        Money += 350
        EnemysInWave = 12
        timer.background(function () {
            for (let index = 0; index < 9; index++) {
                createEnemy(6, 40, "Basic", img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . f f f f . . . . . . 
                    . . . . . f 7 7 7 7 f . . . . . 
                    . . . . f 8 6 6 6 6 7 f . . . . 
                    . . . . f 8 6 6 6 6 7 f . . . . 
                    . . . . f 8 6 6 6 6 7 f . . . . 
                    . . . . f 8 6 6 6 6 7 f . . . . 
                    . . . . . f 8 8 8 8 f . . . . . 
                    . . . . . . f f f f . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, 1, false, false)
                pause(500)
            }
        })
        timer.background(function () {
            for (let index = 0; index < 3; index++) {
                createEnemy(6, 75, "Speedy", img`
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
                    `, 1, false, false)
                pause(500)
            }
        })
    } else if (Wave == 4) {
        Money += 550
        EnemysInWave = 9
        timer.background(function () {
            for (let index = 0; index < 9; index++) {
                createEnemy(6, 75, "Speedy", img`
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
                    `, 1, false, false)
                pause(500)
            }
        })
    } else if (Wave == 5) {
        Money += 650
        EnemysInWave = 6
        timer.background(function () {
            for (let index = 0; index < 6; index++) {
                createEnemy(25, 25, "Tank", img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . f f f f f f f f f f . . . 
                    . . f d d d d d d d d d d f . . 
                    . . f c f b b b b b b f d f . . 
                    . . f c b b b b b b b b d f . . 
                    . . f c b b b b b b b b d f . . 
                    . . f c b b b b b b b b d f . . 
                    . . f c b b b b b b b b d f . . 
                    . . f c b b b b b b b b d f . . 
                    . . f c b b b b b b b b d f . . 
                    . . f c f b b b b b b f d f . . 
                    . . f c c c c c c c c c d f . . 
                    . . . f f f f f f f f f f . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, 1, false, false)
                pause(500)
            }
        })
    } else if (Wave == 6) {
        Money += 700
        EnemysInWave = 15
        timer.background(function () {
            for (let index = 0; index < 9; index++) {
                createEnemy(25, 25, "Tank", img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . f f f f f f f f f f . . . 
                    . . f d d d d d d d d d d f . . 
                    . . f c f b b b b b b f d f . . 
                    . . f c b b b b b b b b d f . . 
                    . . f c b b b b b b b b d f . . 
                    . . f c b b b b b b b b d f . . 
                    . . f c b b b b b b b b d f . . 
                    . . f c b b b b b b b b d f . . 
                    . . f c b b b b b b b b d f . . 
                    . . f c f b b b b b b f d f . . 
                    . . f c c c c c c c c c d f . . 
                    . . . f f f f f f f f f f . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, 1, false, false)
                pause(750)
            }
        })
        timer.background(function () {
            for (let index = 0; index < 6; index++) {
                createEnemy(6, 75, "Speedy", img`
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
                    `, 1, false, false)
                pause(500)
            }
        })
    } else if (Wave == 7) {
        Money += 960
        EnemysInWave = 1
        timer.background(function () {
            createEnemy(125, 60, "Monke", img`
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
                `, 1, true, false)
        })
    } else if (Wave == 8) {
        Money += 1200
        timer.background(function () {
            for (let index = 0; index < 9; index++) {
                createEnemy(25, 25, "Tank", img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . f f f f f f f f f f . . . 
                    . . f d d d d d d d d d d f . . 
                    . . f c f b b b b b b f d f . . 
                    . . f c b b b b b b b b d f . . 
                    . . f c b b b b b b b b d f . . 
                    . . f c b b b b b b b b d f . . 
                    . . f c b b b b b b b b d f . . 
                    . . f c b b b b b b b b d f . . 
                    . . f c b b b b b b b b d f . . 
                    . . f c f b b b b b b f d f . . 
                    . . f c c c c c c c c c d f . . 
                    . . . f f f f f f f f f f . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, 1, false, false)
                pause(750)
            }
        })
        timer.background(function () {
            for (let index = 0; index < 6; index++) {
                createEnemy(25, 25, "Cloaked", img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . f f . f f . f f . . . . 
                    . . . f . . . . . . . . f . . . 
                    . . . f . . . . . . . . f . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . f . . . . . . . . f . . . 
                    . . . f . . . . . . . . f . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . f . . . . . . . . f . . . 
                    . . . f . . . . . . . . f . . . 
                    . . . . f f . f f . f f . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, 1, false, true)
                pause(750)
            }
        })
    } else if (Wave == 9) {
        Money += 1400
    } else if (Wave == 10) {
        Money += 1550
    } else if (Wave == 11) {
        Money += 1700
    } else if (Wave == 12) {
        Money += 1900
    } else if (Wave == 13) {
        Money += 2000
    } else if (Wave == 14) {
        Money += 2500
    } else if (Wave == 15) {
        Money += 3000
        EnemysInWave = 1
        createEnemy(750, 30, "FinalBoss", img`
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
            `, 1, true, true)
    } else if (Wave == 16) {
        game.setGameOverMessage(true, "We've survived the enemy rush!")
        game.gameOver(true)
    }
}
scene.onOverlapTile(SpriteKind.Player, sprites.castle.tileGrass1, function (sprite4, location) {
    TouchingTowerString = ""
})
function Variables () {
    Timer = 0
    Wave = -1
    MaxTowersPlaced = 15
    TowersPlaced = 0
    Intermission = false
    CanMove = true
    CanOpenMenu = true
    InUpgradeMenu = false
}
let NewDiscount = 0
let projectile: Sprite = null
let CanOpenMenu = false
let CanMove = false
let Intermission = false
let TouchingTowerString = ""
let Timer = 0
let Wave = 0
let WaveHUD: TextSprite = null
let TowerPlacedHUD: TextSprite = null
let HPHUD: TextSprite = null
let BorderHUD: Sprite = null
let TimerHUD: TextSprite = null
let MoneyHUD: TextSprite = null
let EnemyHPBar: StatusBarSprite = null
let NewEnemy: Sprite = null
let InfoHUD: TextSprite = null
let newTower: Sprite = null
let MaxTowersPlaced = 0
let Target: Sprite = null
let range_shader: Sprite = null
let TowersPlaced = 0
let Money = 0
let UpgradeCostHUD = ""
let Touchingtower: Sprite = null
let ShaderStacking = false
let EnemysInWave = 0
let BaseHP: StatusBarSprite = null
let InUpgradeMenu = false
let EquippedTowers: string[] = []
let UpgradeMenu: miniMenu.MenuSprite = null
let wall: Sprite = null
let PlayerSprite: Sprite = null
let item: tiles.Location[] = []
let StartSprite: Sprite = null
playercreate()
hud()
Variables()
Waves()
scene.setBackgroundColor(7)
tiles.setCurrentTilemap(tilemap`level2`)
let EndSprite = sprites.create(img`
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
    `, SpriteKind.End)
tiles.placeOnTile(EndSprite, tiles.getTileLocation(6, 11))
StartSprite = sprites.create(img`
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
    `, SpriteKind.Start)
tiles.placeOnTile(StartSprite, tiles.getTileLocation(23, 4))
item = scene.aStar(StartSprite.tilemapLocation(), EndSprite.tilemapLocation(), sprites.castle.tileDarkGrass3)
tiles.placeOnRandomTile(PlayerSprite, assets.tile`myTile9`)
for (let value3 of tiles.getTilesByType(assets.tile`myTile11`)) {
    wall = sprites.create(img`
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
        `, SpriteKind.HUD)
    wall.z = 7
    tiles.placeOnTile(wall, value3)
}
for (let value3 of tiles.getTilesByType(assets.tile`myTile9`)) {
    tiles.setTileAt(value3, sprites.castle.tileGrass1)
}
game.onUpdate(function () {
    for (let value5 of sprites.allOfKind(SpriteKind.Tower)) {
        if (sprites.readDataString(value5, "Name") != "Support") {
            Target = spriteutils.getSpritesWithin(SpriteKind.Enemy, sprites.readDataNumber(value5, "Range"), value5)[0]
            if (Target && sprites.readDataBoolean(value5, "canAttack")) {
                projectile = sprites.createProjectileFromSprite(img`
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
                    `, value5, 0, 0)
                projectile.follow(Target, 650)
                projectile.lifespan = 1500
                projectile.setFlag(SpriteFlag.GhostThroughWalls, true)
                sprites.setDataBoolean(value5, "canAttack", false)
                statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, Target).value += 0 - sprites.readDataNumber(value5, "Damage")
                if (statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, Target).value <= 0) {
                    Money += statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, Target).max * 0.45
                    sprites.destroy(Target)
                    EnemysInWave += -1
                }
                timer.after(sprites.readDataNumber(value5, "Cooldown"), function () {
                    sprites.setDataBoolean(value5, "canAttack", true)
                })
            }
        }
    }
})
game.onUpdate(function () {
    for (let value5 of sprites.allOfKind(SpriteKind.Support)) {
        if (sprites.readDataString(value5, "Name") == "Support") {
            if (sprites.readDataNumber(value5, "Level") == 1) {
                NewDiscount = 0.95
            } else if (sprites.readDataNumber(value5, "Level") == 2) {
                NewDiscount = 0.925
            } else if (sprites.readDataNumber(value5, "Level") == 3) {
                NewDiscount = 0.9
            } else if (sprites.readDataNumber(value5, "Level") == 4) {
                NewDiscount = 0.85
            } else if (sprites.readDataNumber(value5, "Level") == 5) {
                NewDiscount = 0.8
            } else {
                NewDiscount = 1
            }
            for (let value of spriteutils.getSpritesWithin(SpriteKind.Tower, sprites.readDataNumber(value5, "Range"), value5)) {
                if (sprites.readDataNumber(value, "Discount") > NewDiscount) {
                    sprites.setDataNumber(value, "Discount", NewDiscount)
                    sprites.setDataNumber(value, "UpgradeCost", Math.round(sprites.readDataNumber(value, "UpgradeCost") * sprites.readDataNumber(value, "Discount")))
                }
            }
        }
    }
})
game.onUpdate(function () {
    if ((EnemysInWave == 0 || Timer == 0) && !(Intermission)) {
        Timer = 5
        Intermission = true
    } else if (Timer == 0 && Intermission) {
        Intermission = false
        EnemysInWave = 0
        Waves()
    } else {
        timer.throttle("action", 1000, function () {
            Timer += -1
        })
    }
    HPHUD.setText("" + BaseHP.value + "/" + BaseHP.max)
    TimerHUD.setText("" + Math.floor(Timer / 60) + ":" + Timer % 60)
    TowerPlacedHUD.setText("" + TowersPlaced + "/" + MaxTowersPlaced)
    WaveHUD.setText("Wave " + Wave)
    if (Money >= 1000) {
        MoneyHUD.setText("" + Math.ceil(Money / 100) / 10 + "k" + "$")
    } else {
        MoneyHUD.setText("" + Math.round(Money) + "$")
    }
})
game.onUpdate(function () {
    if (InUpgradeMenu) {
        controller.moveSprite(PlayerSprite, 0, 0)
    } else {
        controller.moveSprite(PlayerSprite, 100, 100)
    }
})
