import sys

# Python 2 version, uses unichr() function instead
# of Python 3's chr()

s = ' '.join(sys.argv[1:])
s = s.replace(u',', unichr(8218))
s = s.replace(u'-', unichr(8209))
print(s)
