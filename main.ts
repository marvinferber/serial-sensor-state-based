function light_s () {
    state = "light_s"
    speed = 2000
    last = control.millis()
}
function temp () {
    state = "temp"
    speed = 2000
    last = control.millis()
}
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    recv_string = serial.readLine()
    if ("off" == state) {
        if ("0815" == recv_string) {
            temp()
        }
    }
    if ("temp" == state) {
        if ("0815" == recv_string) {
            temp()
        }
        if ("light" == recv_string) {
            light_s()
        }
    }
    if ("light_s" == state) {
        if ("0815" == recv_string) {
            light_s()
        }
        if ("temp" == recv_string) {
            temp()
        }
        if ("fast" == recv_string) {
            light_f()
        }
    }
    if ("light_f" == state) {
        if ("0815" == recv_string) {
            light_f()
        }
        if ("temp" == recv_string) {
            temp()
        }
        if ("slow" == recv_string) {
            light_s()
        }
    }
    basic.showString(recv_string.substr(0, 1))
    basic.showString("")
})
function light_f () {
    state = "light_f"
    speed = 1000
    last = control.millis()
}
function reset () {
    state = "off"
    speed = 2000
    last = control.millis()
}
let recv_string = ""
let last = 0
let speed = 0
let state = ""
reset()
basic.forever(function () {
    if (state == "off") {
        serial.writeLine("off")
    }
    if (state == "temp") {
        serial.writeValue("temp", input.temperature())
    }
    if (state == "light_s") {
        serial.writeValue("light", input.lightLevel())
    }
    if (state == "light_f") {
        serial.writeValue("light", input.lightLevel())
    }
    basic.pause(speed)
})
basic.forever(function () {
    basic.pause(200)
    if (control.millis() > last + 10000) {
        reset()
    }
})
