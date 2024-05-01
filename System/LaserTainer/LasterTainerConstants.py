from Base import BaseConstants

PIN_LASER = 19
PIN_SHOULDER = 4
PIN_ELBOW = 23

if not BaseConstants.IS_DEV:
    import board
    PIN_SHOULDER = board.D4
    PIN_ELBOW = board.D23

