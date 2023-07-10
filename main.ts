let dist = 0
music.setVolume(255)
music.setTempo(500)
const C_Major_Frequencies = [
    36.71, 41.20, 43.65, 49.00, 55.00, 61.74, 65.41, 73.42,
    82.41, 87.31, 98.00, 110.00, 123.47, 130.81, 146.83, 164.81,
    174.61, 196.00, 220.00, 246.94, 261.63, 293.66, 329.63, 349.23,
    392.00, 440.00, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99,
    880.00, 987.77, 1046.50, 1174.66, 1318.51, 1396.91, 1567.98, 1760.00,
];
const pattern=[0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0]
/// 16.35, 18.35, 20.60, 21.83, 24.50, 27.50, 30.87, 32.70,
let playing = false;
let note = 0;
const debug = false
input.onButtonPressed(Button.A, function () {
    playing = !playing
    basic.showIcon(playing ? IconNames.Yes : IconNames.No)
})
let strip = neopixel.create(DigitalPin.P8, 12, NeoPixelMode.RGB)

basic.forever(function on_forever() {
    dist = sonar.ping(DigitalPin.P15, DigitalPin.P14, PingUnit.Centimeters)
    dist = Math.min(130, dist)
    strip.showBarGraph(dist, 130)
    dist = dist / 130.0
    if (debug) {
        serial.writeLine("")
        serial.writeNumber(dist)
        serial.writeString(" CM")
    }
})

basic.forever(function makenoise() {
    let index = C_Major_Frequencies.length * dist
    if (playing) {
        music.play(music.tonePlayable(C_Major_Frequencies[index], 100), music.PlaybackMode.UntilDone)
    }
    else {
        basic.pause(100)
    }
    note++
    if (note> pattern.length) {
        note = 0;
    }
})
