#!/usr/bin/python
import spidev
import os
import time
import RPi.GPIO as GPIO
import requests
import argparse

delay = 0.2

GPIO.setmode(GPIO.BCM)
GPIO.setup(16,GPIO.OUT)
GPIO.output(16,0)

spi = spidev.SpiDev()
spi.open(0,0)
spi.max_speed_hz=1000000

# raw values are between 475 and 950. Shift these so 0 is max
shift_value = 475
# these were the min/max readings I could get
min_moisture = 0
max_moisture = 475
readings = 100

def readChannel(channel):
  val = spi.xfer2([1,(8+channel)<<4,0])
  data = ((val[1]&3) << 8) + val[2]
  return data

if __name__ == "__main__":
  try:
    parser = argparse.ArgumentParser()
    parser.add_argument("--api-host")
    args = parser.parse_args()
    api = args.api-host or "http://localhost:8080"
    total = 0
    for i in range(readings):
      val = readChannel(0)
      if (val != 0):
        total += val
      time.sleep(delay)
    average = (total / readings)
    fixed_min_max = (average * -1) + (2 * shift_value)
    percent = round((fixed_min_max / max_moisture) * 100, 1)
    payload = {'name': 'pi 1', 'moisture': int(percent), 'temperature': '4'}
    r = requestes.put("{0}{1}".format(api, "/measurement"), json=payload)

  except KeyboardInterrupt:
    print("Cancel.")
