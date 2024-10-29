namespace SpriteKind {
    export const HUD = SpriteKind.create()
    export const Waypoint = SpriteKind.create()
    export const End = SpriteKind.create()
    export const Start = SpriteKind.create()
    export const Tower = SpriteKind.create()
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
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.End, function (sprite, otherSprite) {
    scene.cameraShake(2, 500)
    sprites.destroy(sprite)
    BaseHP.value += 0 - statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value
    EnemysInWave += -1
})
function playercreate () {
    mySprite = sprites.create(img`
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
    controller.moveSprite(mySprite, 100, 100)
    scene.cameraFollowSprite(mySprite)
    anim()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.tileKindAt(TileDirection.Center, sprites.castle.tileGrass1)) {
        createTower(550, "Tower", 1, 75, 2, img`
            . . . . . . . . . . . . . . . . 
            . . f f f . f f f f . f f f . . 
            . . f c c f f c c f f c c f . . 
            . . f c c c c c c c c c c f . . 
            . . . f c c c c c c c c f . . . 
            . . . f c c c c c c c c f . . . 
            . . . . f c c c c c c f . . . . 
            . . . . . f c c c c f . . . . . 
            . . . . . f c c c c f . . . . . 
            . . . . . f c c c c f . . . . . 
            . . . . . f c c c c f . . . . . 
            . . . . . f c c c c f . . . . . 
            . . . . . f c c c c f . . . . . 
            . . . . f c c c c c c f . . . . 
            . . . f c c c c c c c c f . . . 
            . . . f f f f f f f f f f . . . 
            `)
    }
})
function createTower (Cost: number, Name: string, Cooldown: number, Range: number, Damage: number, Icon: Image) {
    if (Money >= Cost) {
        TowersPlaced += 1
        newTower = sprites.create(Icon, SpriteKind.Tower)
        Money += 0 - Cost
        sprites.setDataString(newTower, "Name", Name)
        sprites.setDataNumber(newTower, "Cooldown", Cooldown * 1000)
        sprites.setDataNumber(newTower, "Range", Range)
        sprites.setDataNumber(newTower, "Damage", Damage)
        sprites.setDataBoolean(newTower, "canAttack", true)
        tiles.placeOnTile(newTower, mySprite.tilemapLocation())
        tiles.setTileAt(newTower.tilemapLocation(), assets.tile`myTile9`)
    }
    return newTower
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.tileKindAt(TileDirection.Center, sprites.castle.tileGrass1)) {
        createTower(200, "Cat", 0.5, 50, 1, img`
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
            `)
    }
})
function anim () {
    characterAnimations.loopFrames(
    mySprite,
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
    mySprite,
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
        . . . f f f f 1 1 f . . . . . . 
        . . . f 1 f f 1 1 f . . . . . . 
        . . . f f f f 1 1 f . . . . . . 
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
        . . . f f f f 1 1 f . . . . . . 
        . . . f 1 f f 1 1 f . . . . . . 
        . . . f f f f f f f . . . . . . 
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
        . . . f f f f 1 1 f . . . . . . 
        . . . f 1 f f 1 1 f . . . . . . 
        . . . f f f f 1 1 f . . . . . . 
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
        . . . f f f f 1 1 f . . . . . . 
        . . . f 1 f f 1 1 f . . . . . . 
        . . . f f f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    100,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    mySprite,
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
    mySprite,
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
        . . . . . . f 1 1 f f f f . . . 
        . . . . . . f 1 1 f f 1 f . . . 
        . . . . . . f 1 1 f f f f . . . 
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
        . . . . . . f 1 1 f f f f . . . 
        . . . . . . f 1 1 f f 1 f . . . 
        . . . . . . f f f f f f f . . . 
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
        . . . . . . f 1 1 f f f f . . . 
        . . . . . . f 1 1 f f 1 f . . . 
        . . . . . . f 1 1 f f f f . . . 
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
        . . . . . . f 1 1 f f f f . . . 
        . . . . . . f 1 1 f f 1 f . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . . . . . . . . . . . . 
        `],
    100,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    mySprite,
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
    mySprite,
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
    mySprite,
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
    mySprite,
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
statusbars.onZero(StatusBarKind.Health, function (status) {
    game.setGameOverMessage(false, "We took too much damage!")
    game.gameOver(false)
})
function createEnemy (HP: number, Speed: number, Name: string, Icon: Image, Defense: number, Boss: boolean) {
    NewEnemy = sprites.create(Icon, SpriteKind.Enemy)
    sprites.setDataString(NewEnemy, "Name", Name)
    sprites.setDataNumber(NewEnemy, "Defense", Defense)
    sprites.setDataNumber(NewEnemy, "Speed", Speed)
    EnemyHPBar = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    EnemyHPBar.max = HP
    EnemyHPBar.value = HP
    EnemyHPBar.attachToSprite(NewEnemy)
    EnemyHPBar.setBarBorder(1, 15)
    EnemyHPBar.z = 0
    tiles.placeOnTile(NewEnemy, StartSprite.tilemapLocation())
    scene.followPath(NewEnemy, item, sprites.readDataNumber(NewEnemy, "Speed"))
}
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    if (tiles.tileAtLocationEquals(location, assets.tile`myTile20`) || tiles.tileAtLocationEquals(location, assets.tile`myTile19`)) {
    	
    }
})
function hud () {
    BaseHP = statusbars.create(60, 10, StatusBarKind.Health)
    BaseHP.max = 200
    BaseHP.value = 200
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
    TowerPlacedHUD.setPosition(131, 113)
    TowerPlacedHUD.setOutline(1, 15)
    TowerPlacedHUD.z = 11
    WaveHUD = textsprite.create("", 0, 1)
    WaveHUD.setFlag(SpriteFlag.RelativeToCamera, true)
    WaveHUD.setPosition(3, 113)
    WaveHUD.setOutline(1, 15)
    WaveHUD.z = 11
}
function Waves () {
    Wave += 1
    if (Wave == 0) {
        Timer = 5
        EnemysInWave = 1
    } else if (Wave == 1) {
        Timer = 40
        EnemysInWave = 2
        createEnemy(5, 40, "Duck", img`
            . . . . . . . . . . b 5 b . . . 
            . . . . . . . . . b 5 b . . . . 
            . . . . . . . . . b c . . . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . b b 5 5 5 5 5 b . . . 
            . . . . b b 5 d 1 f 5 5 d f . . 
            . . . . b 5 5 1 f f 5 d 4 c . . 
            . . . . b 5 5 d f b d d 4 4 . . 
            b d d d b b d 5 5 5 4 4 4 4 4 b 
            b b d 5 5 5 b 5 5 4 4 4 4 4 b . 
            b d c 5 5 5 5 d 5 5 5 5 5 b . . 
            c d d c d 5 5 b 5 5 5 5 5 5 b . 
            c b d d c c b 5 5 5 5 5 5 5 b . 
            . c d d d d d d 5 5 5 5 5 d b . 
            . . c b d d d d d 5 5 5 b b . . 
            . . . c c c c c c c c b b . . . 
            `, 1, false)
        timer.after(500, function () {
            createEnemy(5, 40, "Duck", img`
                . . . . . . . . . . b 5 b . . . 
                . . . . . . . . . b 5 b . . . . 
                . . . . . . . . . b c . . . . . 
                . . . . . . b b b b b b . . . . 
                . . . . . b b 5 5 5 5 5 b . . . 
                . . . . b b 5 d 1 f 5 5 d f . . 
                . . . . b 5 5 1 f f 5 d 4 c . . 
                . . . . b 5 5 d f b d d 4 4 . . 
                b d d d b b d 5 5 5 4 4 4 4 4 b 
                b b d 5 5 5 b 5 5 4 4 4 4 4 b . 
                b d c 5 5 5 5 d 5 5 5 5 5 b . . 
                c d d c d 5 5 b 5 5 5 5 5 5 b . 
                c b d d c c b 5 5 5 5 5 5 5 b . 
                . c d d d d d d 5 5 5 5 5 d b . 
                . . c b d d d d d 5 5 5 b b . . 
                . . . c c c c c c c c b b . . . 
                `, 1, false)
        })
    } else if (Wave == 2) {
        Money += 200
        Timer = 55
        EnemysInWave = 6
        createEnemy(5, 40, "Duck", img`
            . . . . . . . . . . b 5 b . . . 
            . . . . . . . . . b 5 b . . . . 
            . . . . . . . . . b c . . . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . b b 5 5 5 5 5 b . . . 
            . . . . b b 5 d 1 f 5 5 d f . . 
            . . . . b 5 5 1 f f 5 d 4 c . . 
            . . . . b 5 5 d f b d d 4 4 . . 
            b d d d b b d 5 5 5 4 4 4 4 4 b 
            b b d 5 5 5 b 5 5 4 4 4 4 4 b . 
            b d c 5 5 5 5 d 5 5 5 5 5 b . . 
            c d d c d 5 5 b 5 5 5 5 5 5 b . 
            c b d d c c b 5 5 5 5 5 5 5 b . 
            . c d d d d d d 5 5 5 5 5 d b . 
            . . c b d d d d d 5 5 5 b b . . 
            . . . c c c c c c c c b b . . . 
            `, 1, false)
        timer.after(500, function () {
            createEnemy(5, 40, "Duck", img`
                . . . . . . . . . . b 5 b . . . 
                . . . . . . . . . b 5 b . . . . 
                . . . . . . . . . b c . . . . . 
                . . . . . . b b b b b b . . . . 
                . . . . . b b 5 5 5 5 5 b . . . 
                . . . . b b 5 d 1 f 5 5 d f . . 
                . . . . b 5 5 1 f f 5 d 4 c . . 
                . . . . b 5 5 d f b d d 4 4 . . 
                b d d d b b d 5 5 5 4 4 4 4 4 b 
                b b d 5 5 5 b 5 5 4 4 4 4 4 b . 
                b d c 5 5 5 5 d 5 5 5 5 5 b . . 
                c d d c d 5 5 b 5 5 5 5 5 5 b . 
                c b d d c c b 5 5 5 5 5 5 5 b . 
                . c d d d d d d 5 5 5 5 5 d b . 
                . . c b d d d d d 5 5 5 b b . . 
                . . . c c c c c c c c b b . . . 
                `, 1, false)
            timer.after(500, function () {
                createEnemy(5, 40, "Duck", img`
                    . . . . . . . . . . b 5 b . . . 
                    . . . . . . . . . b 5 b . . . . 
                    . . . . . . . . . b c . . . . . 
                    . . . . . . b b b b b b . . . . 
                    . . . . . b b 5 5 5 5 5 b . . . 
                    . . . . b b 5 d 1 f 5 5 d f . . 
                    . . . . b 5 5 1 f f 5 d 4 c . . 
                    . . . . b 5 5 d f b d d 4 4 . . 
                    b d d d b b d 5 5 5 4 4 4 4 4 b 
                    b b d 5 5 5 b 5 5 4 4 4 4 4 b . 
                    b d c 5 5 5 5 d 5 5 5 5 5 b . . 
                    c d d c d 5 5 b 5 5 5 5 5 5 b . 
                    c b d d c c b 5 5 5 5 5 5 5 b . 
                    . c d d d d d d 5 5 5 5 5 d b . 
                    . . c b d d d d d 5 5 5 b b . . 
                    . . . c c c c c c c c b b . . . 
                    `, 1, false)
                timer.after(500, function () {
                    createEnemy(5, 40, "Duck", img`
                        . . . . . . . . . . b 5 b . . . 
                        . . . . . . . . . b 5 b . . . . 
                        . . . . . . . . . b c . . . . . 
                        . . . . . . b b b b b b . . . . 
                        . . . . . b b 5 5 5 5 5 b . . . 
                        . . . . b b 5 d 1 f 5 5 d f . . 
                        . . . . b 5 5 1 f f 5 d 4 c . . 
                        . . . . b 5 5 d f b d d 4 4 . . 
                        b d d d b b d 5 5 5 4 4 4 4 4 b 
                        b b d 5 5 5 b 5 5 4 4 4 4 4 b . 
                        b d c 5 5 5 5 d 5 5 5 5 5 b . . 
                        c d d c d 5 5 b 5 5 5 5 5 5 b . 
                        c b d d c c b 5 5 5 5 5 5 5 b . 
                        . c d d d d d d 5 5 5 5 5 d b . 
                        . . c b d d d d d 5 5 5 b b . . 
                        . . . c c c c c c c c b b . . . 
                        `, 1, false)
                    timer.after(500, function () {
                        createEnemy(5, 40, "Duck", img`
                            . . . . . . . . . . b 5 b . . . 
                            . . . . . . . . . b 5 b . . . . 
                            . . . . . . . . . b c . . . . . 
                            . . . . . . b b b b b b . . . . 
                            . . . . . b b 5 5 5 5 5 b . . . 
                            . . . . b b 5 d 1 f 5 5 d f . . 
                            . . . . b 5 5 1 f f 5 d 4 c . . 
                            . . . . b 5 5 d f b d d 4 4 . . 
                            b d d d b b d 5 5 5 4 4 4 4 4 b 
                            b b d 5 5 5 b 5 5 4 4 4 4 4 b . 
                            b d c 5 5 5 5 d 5 5 5 5 5 b . . 
                            c d d c d 5 5 b 5 5 5 5 5 5 b . 
                            c b d d c c b 5 5 5 5 5 5 5 b . 
                            . c d d d d d d 5 5 5 5 5 d b . 
                            . . c b d d d d d 5 5 5 b b . . 
                            . . . c c c c c c c c b b . . . 
                            `, 1, false)
                        timer.after(500, function () {
                            createEnemy(5, 40, "Duck", img`
                                . . . . . . . . . . b 5 b . . . 
                                . . . . . . . . . b 5 b . . . . 
                                . . . . . . . . . b c . . . . . 
                                . . . . . . b b b b b b . . . . 
                                . . . . . b b 5 5 5 5 5 b . . . 
                                . . . . b b 5 d 1 f 5 5 d f . . 
                                . . . . b 5 5 1 f f 5 d 4 c . . 
                                . . . . b 5 5 d f b d d 4 4 . . 
                                b d d d b b d 5 5 5 4 4 4 4 4 b 
                                b b d 5 5 5 b 5 5 4 4 4 4 4 b . 
                                b d c 5 5 5 5 d 5 5 5 5 5 b . . 
                                c d d c d 5 5 b 5 5 5 5 5 5 b . 
                                c b d d c c b 5 5 5 5 5 5 5 b . 
                                . c d d d d d d 5 5 5 5 5 d b . 
                                . . c b d d d d d 5 5 5 b b . . 
                                . . . c c c c c c c c b b . . . 
                                `, 1, false)
                        })
                    })
                })
            })
        })
    } else if (Wave == 3) {
    	
    } else if (Wave == 4) {
    	
    } else if (Wave == 5) {
    	
    } else if (Wave == 6) {
    	
    } else if (Wave == 7) {
    	
    } else if (Wave == 8) {
    	
    } else if (Wave == 9) {
    	
    } else if (Wave == 10) {
    	
    } else if (Wave == 11) {
    	
    } else if (Wave == 12) {
    	
    } else if (Wave == 13) {
    	
    } else if (Wave == 14) {
    	
    } else if (Wave == 15) {
        Timer = 600
    } else if (Wave == 16) {
        game.setGameOverMessage(true, "We've survived the enemy rush!")
        game.gameOver(true)
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    if (statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value <= 0.5) {
        sprites.destroy(otherSprite)
        EnemysInWave += -1
    } else {
        statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += 0 - sprites.readDataNumber(sprite, "Damage")
        Money += sprites.readDataNumber(sprite, "Damage")
    }
})
function Variables () {
    Timer = 0
    Wave = -1
    Money = 500
    MaxTowersPlaced = 15
    TowersPlaced = 0
    Intermission = false
}
let projectile: Sprite = null
let Target: Sprite = null
let Intermission = false
let MaxTowersPlaced = 0
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
let newTower: Sprite = null
let TowersPlaced = 0
let Money = 0
let EnemysInWave = 0
let BaseHP: StatusBarSprite = null
let wall: Sprite = null
let mySprite: Sprite = null
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
    . . . . . . . c c . . . . . . . 
    . . . . . . . c c . . . . . . . 
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
    . . . . . . . c c . . . . . . . 
    . . . . . . . c c . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Start)
tiles.placeOnTile(StartSprite, tiles.getTileLocation(23, 4))
item = scene.aStar(StartSprite.tilemapLocation(), EndSprite.tilemapLocation(), sprites.dungeon.darkGroundCenter)
tiles.placeOnRandomTile(mySprite, assets.tile`myTile9`)
for (let value of tiles.getTilesByType(assets.tile`myTile11`)) {
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
    tiles.placeOnTile(wall, value)
}
game.onUpdate(function () {
    let list: number[] = []
    for (let value of list) {
    	
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
    MoneyHUD.setText("" + Money + "$")
    TimerHUD.setText("" + Math.floor(Timer / 60) + ":" + Timer % 60)
    TowerPlacedHUD.setText("" + TowersPlaced + "/" + MaxTowersPlaced)
    WaveHUD.setText("Wave " + Wave)
})
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Tower)) {
        Target = spriteutils.getSpritesWithin(SpriteKind.Enemy, sprites.readDataNumber(value, "Range"), value)[0]
        if (Target && sprites.readDataBoolean(value, "canAttack")) {
            sprites.setDataBoolean(value, "canAttack", false)
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
                `, value, 0, 0)
            sprites.setDataNumber(projectile, "Damage", sprites.readDataNumber(value, "Damage"))
            spriteutils.setVelocityAtAngle(projectile, spriteutils.angleFrom(value, Target), 250)
            projectile.setFlag(SpriteFlag.GhostThroughWalls, true)
            timer.after(sprites.readDataNumber(value, "Cooldown"), function () {
                sprites.setDataBoolean(value, "canAttack", true)
            })
        }
    }
})
