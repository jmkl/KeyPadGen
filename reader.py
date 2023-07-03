import serial
import time
import adafruit_board_toolkit.circuitpython_serial

comports = adafruit_board_toolkit.circuitpython_serial.data_comports()
device_COM = "COM10"

if not comports:
    raise Exception("No sensor modules found")

try:
    device = serial.Serial(
        device_COM,
        baudrate=115200,
        bytesize=8,
        parity="N",
        stopbits=1,
        timeout=1,
        xonxoff=0,
        rtscts=0,
    )
    device.write(b"hi!")
    while True:
        response = str(device.readline(), "utf-8")
        print(response)

finally:
    device.close()
