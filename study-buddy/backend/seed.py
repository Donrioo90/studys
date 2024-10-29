from app import app, db
from models import User, StudyGroup, GroupMembership
from utils.auth import hash_password

# Sample data for users
users_data = [
    {"username": "Hesbone", "email": "hesbonesossion@gmail.com", "password": "password123"},
    {"username": "Kiplimo", "email": "hesbonkiplimo@gmail.com", "password": "password123"},
    {"username": "Ron", "email": "ron@gmail.com", "password": "password123"},
    {"username": "Levy", "email": "levy@gmail.com", "password": "password123"},
    {"username": "Thazar", "email": "thazar@gmail.com", "password": "password123"},
]

# Sample data for study groups
study_groups_data = [
    {"name": "Calculus Study Group"},
    {"name": "Physics Study Group"},
    {"name": "Chemistry Study Group"},
    {"name": "History Study Group"},
    {"name": "Literature Study Group"},
]

# Sample data for group memberships
group_memberships_data = [
    {"user_id": 1, "group_id": 1},  # John Doe joins Calculus Study Group
    {"user_id": 1, "group_id": 2},  # John Doe joins Physics Study Group
    {"user_id": 2, "group_id": 1},  # Jane Smith joins Calculus Study Group
    {"user_id": 2, "group_id": 3},  # Jane Smith joins Chemistry Study Group
    {"user_id": 3, "group_id": 2},  # Alice Johnson joins Physics Study Group
    {"user_id": 3, "group_id": 4},  # Alice Johnson joins History Study Group
    {"user_id": 4, "group_id": 3},  # Bob Brown joins Chemistry Study Group
    {"user_id": 5, "group_id": 4},  # Charlie White joins History Study Group
    {"user_id": 5, "group_id": 5},  # Charlie White joins Literature Study Group
]

def seed_database():
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()
        
        # Seed users
        for user_data in users_data:
            user = User(
                username=user_data["username"],
                email=user_data["email"],
                password=hash_password(user_data["password"])
            )
            db.session.add(user)

        # Seed study groups
        for group_data in study_groups_data:
            group = StudyGroup(name=group_data["name"])
            db.session.add(group)

        # Seed group memberships
        for membership_data in group_memberships_data:
            membership = GroupMembership(
                user_id=membership_data["user_id"],
                group_id=membership_data["group_id"]
            )
            db.session.add(membership)

        # Commit the session to save data to the database
        db.session.commit()
        print("Database seeded successfully!")

if __name__ == "__main__":
    seed_database()
