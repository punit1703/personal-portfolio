import random
import string

# characters to use in password
characters = string.ascii_letters + string.digits + string.punctuation

# generate random password of length 16
password = ''.join(random.choice(characters) for _ in range(16))

print("Generated Password:", password)
