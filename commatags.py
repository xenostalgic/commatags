import sys

s = ' '.join(sys.argv[1:])
s = s.replace(u',', chr(8218))
s = s.replace(u'-', chr(8209))
print(s)
