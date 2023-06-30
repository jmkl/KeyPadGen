import { DataGrid,  GridToolbarContainer,
    GridToolbarFilterButton, } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const kmkeys = [
    {
        "col1": "KC.NO",
        "col2": "",
        "col3": "Ignore this key (NOOP)",
        "id": 0
    },
    {
        "col1": "KC.TRANSPARENT",
        "col2": "KC.TRNS",
        "col3": "Use the next lowest non-transparent key",
        "id": 1
    },
    {
        "col1": "KC.A",
        "col2": "",
        "col3": "a and A",
        "id": 2
    },
    {
        "col1": "KC.B",
        "col2": "",
        "col3": "b and B",
        "id": 3
    },
    {
        "col1": "KC.C",
        "col2": "",
        "col3": "c and C",
        "id": 4
    },
    {
        "col1": "KC.D",
        "col2": "",
        "col3": "d and D",
        "id": 5
    },
    {
        "col1": "KC.E",
        "col2": "",
        "col3": "e and E",
        "id": 6
    },
    {
        "col1": "KC.F",
        "col2": "",
        "col3": "f and F",
        "id": 7
    },
    {
        "col1": "KC.G",
        "col2": "",
        "col3": "g and G",
        "id": 8
    },
    {
        "col1": "KC.H",
        "col2": "",
        "col3": "h and H",
        "id": 9
    },
    {
        "col1": "KC.I",
        "col2": "",
        "col3": "i and I",
        "id": 10
    },
    {
        "col1": "KC.J",
        "col2": "",
        "col3": "j and J",
        "id": 11
    },
    {
        "col1": "KC.K",
        "col2": "",
        "col3": "k and K",
        "id": 12
    },
    {
        "col1": "KC.L",
        "col2": "",
        "col3": "l and L",
        "id": 13
    },
    {
        "col1": "KC.M",
        "col2": "",
        "col3": "m and M",
        "id": 14
    },
    {
        "col1": "KC.N",
        "col2": "",
        "col3": "n and N",
        "id": 15
    },
    {
        "col1": "KC.O",
        "col2": "",
        "col3": "o and O",
        "id": 16
    },
    {
        "col1": "KC.P",
        "col2": "",
        "col3": "p and P",
        "id": 17
    },
    {
        "col1": "KC.Q",
        "col2": "",
        "col3": "q and Q",
        "id": 18
    },
    {
        "col1": "KC.R",
        "col2": "",
        "col3": "r and R",
        "id": 19
    },
    {
        "col1": "KC.S",
        "col2": "",
        "col3": "s and S",
        "id": 20
    },
    {
        "col1": "KC.T",
        "col2": "",
        "col3": "t and T",
        "id": 21
    },
    {
        "col1": "KC.U",
        "col2": "",
        "col3": "u and U",
        "id": 22
    },
    {
        "col1": "KC.V",
        "col2": "",
        "col3": "v and V",
        "id": 23
    },
    {
        "col1": "KC.W",
        "col2": "",
        "col3": "w and W",
        "id": 24
    },
    {
        "col1": "KC.X",
        "col2": "",
        "col3": "x and X",
        "id": 25
    },
    {
        "col1": "KC.Y",
        "col2": "",
        "col3": "y and Y",
        "id": 26
    },
    {
        "col1": "KC.Z",
        "col2": "",
        "col3": "z and Z",
        "id": 27
    },
    {
        "col1": "KC.N1",
        "col2": "",
        "col3": "1 and !",
        "id": 28
    },
    {
        "col1": "KC.N2",
        "col2": "",
        "col3": "2 and @",
        "id": 29
    },
    {
        "col1": "KC.N3",
        "col2": "",
        "col3": "3 and #",
        "id": 30
    },
    {
        "col1": "KC.N4",
        "col2": "",
        "col3": "4 and $",
        "id": 31
    },
    {
        "col1": "KC.N5",
        "col2": "",
        "col3": "5 and %",
        "id": 32
    },
    {
        "col1": "KC.N6",
        "col2": "",
        "col3": "6 and ^",
        "id": 33
    },
    {
        "col1": "KC.N7",
        "col2": "",
        "col3": "7 and &",
        "id": 34
    },
    {
        "col1": "KC.N8",
        "col2": "",
        "col3": "8 and *",
        "id": 35
    },
    {
        "col1": "KC.N9",
        "col2": "",
        "col3": "9 and (",
        "id": 36
    },
    {
        "col1": "KC.N0",
        "col2": "",
        "col3": "0 and )",
        "id": 37
    },
    {
        "col1": "KC.ENTER",
        "col2": "KC.ENT",
        "col3": "Return (Enter)",
        "id": 38
    },
    {
        "col1": "KC.ESCAPE",
        "col2": "KC.ESC",
        "col3": "Escape",
        "id": 39
    },
    {
        "col1": "KC.BSPACE",
        "col2": "KC.BSPC",
        "col3": "Delete (Backspace)",
        "id": 40
    },
    {
        "col1": "KC.TAB",
        "col2": "",
        "col3": "Tab",
        "id": 41
    },
    {
        "col1": "KC.SPACE",
        "col2": "KC.SPC",
        "col3": "Spacebar",
        "id": 42
    },
    {
        "col1": "KC.MINUS",
        "col2": "KC.MINS",
        "col3": "- and _",
        "id": 43
    },
    {
        "col1": "KC.EQUAL",
        "col2": "KC.EQL",
        "col3": "= and +",
        "id": 44
    },
    {
        "col1": "KC.LBRACKET",
        "col2": "KC.LBRC",
        "col3": "[ and {",
        "id": 45
    },
    {
        "col1": "KC.RBRACKET",
        "col2": "KC.RBRC",
        "col3": "] and }",
        "id": 46
    },
    {
        "col1": "KC.BSLASH",
        "col2": "KC.BSLS",
        "col3": "\\ and |",
        "id": 47
    },
    {
        "col1": "KC.SCOLON",
        "col2": "KC.SCLN",
        "col3": "; and :",
        "id": 48
    },
    {
        "col1": "KC.QUOTE",
        "col2": "KC.QUOT",
        "col3": " and \"",
        "id": 49
    },
    {
        "col1": "KC.GRAVE",
        "col2": "KC.GRV, KC.ZKHK",
        "col3": "` and ~, JIS Zenkaku/Hankaku",
        "id": 50
    },
    {
        "col1": "KC.COMMA",
        "col2": "KC.COMM",
        "col3": ", and <",
        "id": 51
    },
    {
        "col1": "KC.DOT",
        "col2": "",
        "col3": ". and >",
        "id": 52
    },
    {
        "col1": "KC.SLASH",
        "col2": "KC.SLSH",
        "col3": "/ and ?",
        "id": 53
    },
    {
        "col1": "KC.CAPSLOCK",
        "col2": "KC.CLCK, KC.CAPS",
        "col3": "Caps Lock",
        "id": 54
    },
    {
        "col1": "KC.F1",
        "col2": "",
        "col3": "F1",
        "id": 55
    },
    {
        "col1": "KC.F2",
        "col2": "",
        "col3": "F2",
        "id": 56
    },
    {
        "col1": "KC.F3",
        "col2": "",
        "col3": "F3",
        "id": 57
    },
    {
        "col1": "KC.F4",
        "col2": "",
        "col3": "F4",
        "id": 58
    },
    {
        "col1": "KC.F5",
        "col2": "",
        "col3": "F5",
        "id": 59
    },
    {
        "col1": "KC.F6",
        "col2": "",
        "col3": "F6",
        "id": 60
    },
    {
        "col1": "KC.F7",
        "col2": "",
        "col3": "F7",
        "id": 61
    },
    {
        "col1": "KC.F8",
        "col2": "",
        "col3": "F8",
        "id": 62
    },
    {
        "col1": "KC.F9",
        "col2": "",
        "col3": "F9",
        "id": 63
    },
    {
        "col1": "KC.F10",
        "col2": "",
        "col3": "F10",
        "id": 64
    },
    {
        "col1": "KC.F11",
        "col2": "",
        "col3": "F11",
        "id": 65
    },
    {
        "col1": "KC.F12",
        "col2": "",
        "col3": "F12",
        "id": 66
    },
    {
        "col1": "KC.F13",
        "col2": "",
        "col3": "F13",
        "id": 67
    },
    {
        "col1": "KC.F14",
        "col2": "",
        "col3": "F14",
        "id": 68
    },
    {
        "col1": "KC.F15",
        "col2": "",
        "col3": "F15",
        "id": 69
    },
    {
        "col1": "KC.F16",
        "col2": "",
        "col3": "F16",
        "id": 70
    },
    {
        "col1": "KC.F17",
        "col2": "",
        "col3": "F17",
        "id": 71
    },
    {
        "col1": "KC.F18",
        "col2": "",
        "col3": "F18",
        "id": 72
    },
    {
        "col1": "KC.F19",
        "col2": "",
        "col3": "F19",
        "id": 73
    },
    {
        "col1": "KC.F20",
        "col2": "",
        "col3": "F20",
        "id": 74
    },
    {
        "col1": "KC.F21",
        "col2": "",
        "col3": "F21",
        "id": 75
    },
    {
        "col1": "KC.F22",
        "col2": "",
        "col3": "F22",
        "id": 76
    },
    {
        "col1": "KC.F23",
        "col2": "",
        "col3": "F23",
        "id": 77
    },
    {
        "col1": "KC.F24",
        "col2": "",
        "col3": "F24",
        "id": 78
    },
    {
        "col1": "KC.PSCREEN",
        "col2": "KC.PSCR",
        "col3": "Print Screen",
        "id": 79
    },
    {
        "col1": "KC.SCROLLLOCK",
        "col2": "KC.SLCK",
        "col3": "Scroll Lock",
        "id": 80
    },
    {
        "col1": "KC.PAUSE",
        "col2": "KC.PAUS, KC.BRK",
        "col3": "Pause",
        "id": 81
    },
    {
        "col1": "KC.INSERT",
        "col2": "KC.INS",
        "col3": "Insert",
        "id": 82
    },
    {
        "col1": "KC.HOME",
        "col2": "",
        "col3": "Home",
        "id": 83
    },
    {
        "col1": "KC.PGUP",
        "col2": "",
        "col3": "Page Up",
        "id": 84
    },
    {
        "col1": "KC.DELETE",
        "col2": "KC.DEL",
        "col3": "Forward Delete",
        "id": 85
    },
    {
        "col1": "KC.END",
        "col2": "",
        "col3": "End",
        "id": 86
    },
    {
        "col1": "KC.PGDOWN",
        "col2": "KC.PGDN",
        "col3": "Page Down",
        "id": 87
    },
    {
        "col1": "KC.RIGHT",
        "col2": "KC.RGHT",
        "col3": "Right Arrow",
        "id": 88
    },
    {
        "col1": "KC.LEFT",
        "col2": "",
        "col3": "Left Arrow",
        "id": 89
    },
    {
        "col1": "KC.DOWN",
        "col2": "",
        "col3": "Down Arrow",
        "id": 90
    },
    {
        "col1": "KC.UP",
        "col2": "",
        "col3": "Up Arrow",
        "id": 91
    },
    {
        "col1": "KC.NUMLOCK",
        "col2": "KC.NLCK",
        "col3": "Keypad Num Lock and Clear",
        "id": 92
    },
    {
        "col1": "KC.KP_SLASH",
        "col2": "KC.PSLS",
        "col3": "Keypad /",
        "id": 93
    },
    {
        "col1": "KC.KP_ASTERISK",
        "col2": "KC.PAST",
        "col3": "Keypad *",
        "id": 94
    },
    {
        "col1": "KC.KP_MINUS",
        "col2": "KC.PMNS",
        "col3": "Keypad -",
        "id": 95
    },
    {
        "col1": "KC.KP_PLUS",
        "col2": "KC.PPLS",
        "col3": "Keypad +",
        "id": 96
    },
    {
        "col1": "KC.KP_ENTER",
        "col2": "KC.PENT",
        "col3": "Keypad Enter",
        "id": 97
    },
    {
        "col1": "KC.KP_1",
        "col2": "KC.P1",
        "col3": "Keypad 1 and End",
        "id": 98
    },
    {
        "col1": "KC.KP_2",
        "col2": "KC.P2",
        "col3": "Keypad 2 and Down Arrow",
        "id": 99
    },
    {
        "col1": "KC.KP_3",
        "col2": "KC.P3",
        "col3": "Keypad 3 and Page Down",
        "id": 100
    },
    {
        "col1": "KC.KP_4",
        "col2": "KC.P4",
        "col3": "Keypad 4 and Left Arrow",
        "id": 101
    },
    {
        "col1": "KC.KP_5",
        "col2": "KC.P5",
        "col3": "Keypad 5",
        "id": 102
    },
    {
        "col1": "KC.KP_6",
        "col2": "KC.P6",
        "col3": "Keypad 6 and Right Arrow",
        "id": 103
    },
    {
        "col1": "KC.KP_7",
        "col2": "KC.P7",
        "col3": "Keypad 7 and Home",
        "id": 104
    },
    {
        "col1": "KC.KP_8",
        "col2": "KC.P8",
        "col3": "Keypad 8 and Up Arrow",
        "id": 105
    },
    {
        "col1": "KC.KP_9",
        "col2": "KC.P9",
        "col3": "Keypad 9 and Page Up",
        "id": 106
    },
    {
        "col1": "KC.KP_0",
        "col2": "KC.P0",
        "col3": "Keypad 0 and Insert",
        "id": 107
    },
    {
        "col1": "KC.KP_DOT",
        "col2": "KC.PDOT",
        "col3": "Keypad . and Delete",
        "id": 108
    },
    {
        "col1": "KC.KP_EQUAL",
        "col2": "KC.PEQL",
        "col3": "Keypad =",
        "id": 109
    },
    {
        "col1": "KC.LOCKING_CAPS",
        "col2": "KC.LCAP",
        "col3": "Locking Caps Lock",
        "id": 110
    },
    {
        "col1": "KC.LOCKING_NUM",
        "col2": "KC.LNUM",
        "col3": "Locking Num Lock",
        "id": 111
    },
    {
        "col1": "KC.LOCKING_SCROLL",
        "col2": "KC.LSCR",
        "col3": "Locking Scroll Lock",
        "id": 112
    },
    {
        "col1": "KC.KP_COMMA",
        "col2": "KC.PCMM",
        "col3": "Keypad ,",
        "id": 113
    },
    {
        "col1": "KC.KP_EQUAL_AS400",
        "col2": "",
        "col3": "Keypad = on AS/400 keyboards",
        "id": 114
    },
    {
        "col1": "KC.LCTRL",
        "col2": "KC.LCTL",
        "col3": "Left Control",
        "id": 115
    },
    {
        "col1": "KC.LSHIFT",
        "col2": "KC.LSFT",
        "col3": "Left Shift",
        "id": 116
    },
    {
        "col1": "KC.LALT",
        "col2": "",
        "col3": "Left Alt",
        "id": 117
    },
    {
        "col1": "KC.LGUI",
        "col2": "KC.LCMD, KC.LWIN",
        "col3": "Left GUI (Windows/Command/Meta key)",
        "id": 118
    },
    {
        "col1": "KC.RCTRL",
        "col2": "KC.RCTL",
        "col3": "Right Control",
        "id": 119
    },
    {
        "col1": "KC.RSHIFT",
        "col2": "KC.RSFT",
        "col3": "Right Shift",
        "id": 120
    },
    {
        "col1": "KC.RALT",
        "col2": "",
        "col3": "Right Alt",
        "id": 121
    },
    {
        "col1": "KC.RGUI",
        "col2": "KC.RCMD, KC.RWIN",
        "col3": "Right GUI (Windows/Command/Meta key)",
        "id": 122
    },
    {
        "col1": "KC.LEFT_PAREN",
        "col2": "KC.LPRN",
        "col3": "(",
        "id": 123
    },
    {
        "col1": "KC.RIGHT_PAREN",
        "col2": "KC.RPRN",
        "col3": ")",
        "id": 124
    },
    {
        "col1": "KC.UNDERSCORE",
        "col2": "KC.UNDS",
        "col3": "_",
        "id": 125
    },
    {
        "col1": "KC.PLUS",
        "col2": "",
        "col3": "+",
        "id": 126
    },
    {
        "col1": "KC.LEFT_CURLY_BRACE",
        "col2": "KC.LCBR",
        "col3": "{",
        "id": 127
    },
    {
        "col1": "KC.RIGHT_CURLY_BRACE",
        "col2": "KC.RCBR",
        "col3": "}",
        "id": 128
    },
    {
        "col1": "KC.PIPE",
        "col2": "",
        "col3": "|",
        "id": 129
    },
    {
        "col1": "KC.COLON",
        "col2": "KC.COLN",
        "col3": ":",
        "id": 130
    },
    {
        "col1": "KC.DOUBLE_QUOTE",
        "col2": "KC.DQUO, KC.DQT",
        "col3": "\"",
        "id": 131
    },
    {
        "col1": "KC.LEFT_ANGLE_BRACKET",
        "col2": "KC.LABK",
        "col3": "<",
        "id": 132
    },
    {
        "col1": "KC.RIGHT_ANGLE_BRACKET",
        "col2": "KC.RABK",
        "col3": ">",
        "id": 133
    },
    {
        "col1": "KC.QUESTION",
        "col2": "KC.QUES",
        "col3": "?",
        "id": 134
    },
    {
        "col1": "KC.NONUS_HASH",
        "col2": "KC.NUHS",
        "col3": "ISO Left of Return",
        "id": 135
    },
    {
        "col1": "KC.NONUS_BSLASH",
        "col2": "KC.NUBS",
        "col3": "ISO Right of LSHIFT",
        "id": 136
    },
    {
        "col1": "KC.APPLICATION",
        "col2": "KC.APP,KC.SEL,KC.WINMENU",
        "col3": "Menu Key (Near RCTRL)",
        "id": 137
    },
    {
        "col1": "KC.INT1",
        "col2": "KC.RO",
        "col3": "",
        "id": 138
    },
    {
        "col1": "KC.INT2",
        "col2": "KC.KANA",
        "col3": "",
        "id": 139
    },
    {
        "col1": "KC.INT3",
        "col2": "KC.JYEN",
        "col3": "",
        "id": 140
    },
    {
        "col1": "KC.INT4",
        "col2": "KC.HENK",
        "col3": "",
        "id": 141
    },
    {
        "col1": "KC.INT5",
        "col2": "KC.MHEN",
        "col3": "",
        "id": 142
    },
    {
        "col1": "KC.INT6",
        "col2": "",
        "col3": "",
        "id": 143
    },
    {
        "col1": "KC.INT7",
        "col2": "",
        "col3": "",
        "id": 144
    },
    {
        "col1": "KC.INT8",
        "col2": "",
        "col3": "",
        "id": 145
    },
    {
        "col1": "KC.INT9",
        "col2": "",
        "col3": "",
        "id": 146
    },
    {
        "col1": "KC.LANG1",
        "col2": "HAEN",
        "col3": "",
        "id": 147
    },
    {
        "col1": "KC.LANG2",
        "col2": "HAEJ",
        "col3": "",
        "id": 148
    },
    {
        "col1": "KC.LANG3",
        "col2": "",
        "col3": "",
        "id": 149
    },
    {
        "col1": "KC.LANG4",
        "col2": "",
        "col3": "",
        "id": 150
    },
    {
        "col1": "KC.LANG5",
        "col2": "",
        "col3": "",
        "id": 151
    },
    {
        "col1": "KC.LANG6",
        "col2": "",
        "col3": "",
        "id": 152
    },
    {
        "col1": "KC.LANG7",
        "col2": "",
        "col3": "",
        "id": 153
    },
    {
        "col1": "KC.LANG8",
        "col2": "",
        "col3": "",
        "id": 154
    },
    {
        "col1": "KC.LANG9",
        "col2": "",
        "col3": "",
        "id": 155
    },
    {
        "col1": "KC.RESET",
        "col2": "",
        "col3": "Restarts the keyboard",
        "id": 156
    },
    {
        "col1": "KC.RELOAD, KC.RLD",
        "col2": "",
        "col3": "Reloads the keyboard software, preserving any serial connections",
        "id": 157
    },
    {
        "col1": "KC.DEBUG",
        "col2": "",
        "col3": "Toggle debug_enabled, which enables log spew to serial console",
        "id": 158
    },
    {
        "col1": "KC.ANY",
        "col2": "",
        "col3": "Any key between A and /`",
        "id": 159
    },
    {
        "col1": "KC.GESC",
        "col2": "",
        "col3": "Escape when tapped, ` when pressed with Shift or GUI",
        "id": 160
    },
    {
        "col1": "KC.BKDL",
        "col2": "",
        "col3": "Backspace when tapped, Delete when pressed with GUI",
        "id": 161
    },
    {
        "col1": "KC.UC_MODE_NOOP",
        "col2": "",
        "col3": "Sets UnicodeMode to NOOP",
        "id": 162
    },
    {
        "col1": "KC.UC_MODE_LINUX",
        "col2": "",
        "col3": "Sets UnicodeMode to Linux",
        "id": 163
    },
    {
        "col1": "KC.UC_MODE_MACOS",
        "col2": "",
        "col3": "Sets UnicodeMode to macOS",
        "id": 164
    },
    {
        "col1": "KC.UC_MODE_WINC",
        "col2": "",
        "col3": "Sets UnicodeMode to WinCompose",
        "id": 165
    },
    {
        "col1": "KC.MACRO_SLEEP_MS(ms)",
        "col2": "",
        "col3": "Sleeps in a macro. See SEQUENCES for more information.",
        "id": 166
    },
    {
        "col1": "KC.HYPR",
        "col2": "",
        "col3": "Hold Left Control, Shift, Alt and GUI",
        "id": 167
    },
    {
        "col1": "KC.MEH",
        "col2": "",
        "col3": "Hold Left Control, Shift and Alt",
        "id": 168
    },
    {
        "col1": "KC.LCTL(kc)",
        "col2": "",
        "col3": "Hold Left Control and press kc",
        "id": 169
    },
    {
        "col1": "KC.LSFT(kc)",
        "col2": "",
        "col3": "Hold Left Shift and press kc",
        "id": 170
    },
    {
        "col1": "KC.LALT(kc)",
        "col2": "",
        "col3": "Hold Left Alt and press kc",
        "id": 171
    },
    {
        "col1": "KC.LGUI(kc)",
        "col2": "",
        "col3": "Hold Left GUI and press kc",
        "id": 172
    },
    {
        "col1": "KC.RCTL(kc)",
        "col2": "",
        "col3": "Hold Right Control and press kc",
        "id": 173
    },
    {
        "col1": "KC.RSFT(kc)",
        "col2": "",
        "col3": "Hold Right Shift and press kc",
        "id": 174
    },
    {
        "col1": "KC.RALT(kc)",
        "col2": "",
        "col3": "Hold Right Alt and press kc",
        "id": 175
    },
    {
        "col1": "KC.RGUI(kc)",
        "col2": "",
        "col3": "Hold Right GUI and press kc",
        "id": 176
    },
    {
        "col1": "KC.BT_CLEAR_BONDS",
        "col2": "KC.BT_CLR",
        "col3": "Clears all stored bondings",
        "id": 177
    },
    {
        "col1": "KC.BT_NEXT_CONN",
        "col2": "KC.BT_NXT",
        "col3": "Selects the next BT connection",
        "id": 178
    },
    {
        "col1": "KC.BT_PREV_CONN",
        "col2": "KC.BT_PRV",
        "col3": "Selects the previous BT connection",
        "id": 179
    }
]
const columns = [
  { field: "col1", headerName: "Key", width: 200 },
  { field: "col2", headerName: "Alias", width: 200 },
  { field: "col3", headerName: "Desc", width: 600 },
];


export const Help = () => {
    function CustomToolbar() {
        return (
          <GridToolbarContainer>
            <GridToolbarFilterButton />
          </GridToolbarContainer>
        );
      }
  return (
    <div style={{ height: 350, width: '100%' }}>
       <DataGrid rows={kmkeys} columns={columns} 
       
       initialState={{
        pagination: {
          paginationModel: { pageSize: 200, page: 0 },
        },
      }}
       slots={{ toolbar: CustomToolbar }} />
       </div>
  );
};
