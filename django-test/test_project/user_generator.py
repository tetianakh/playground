from faker import Faker
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'test_project.settings')

import django
django.setup()

from users.models import User

fake = Faker()


def generate_users(N=10):
    for _ in range(N):
        
        user = User(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.email()
        )
        user.save()


if __name__ == '__main__':
    print("Generating some fake users...")
    generate_users(20)
    print("Done!")
