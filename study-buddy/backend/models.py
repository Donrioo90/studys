

from extensions import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)

    # Relationship to StudyGroup through GroupMembership
    groups = db.relationship('GroupMembership', back_populates='user')


class StudyGroup(db.Model):
    __tablename__ = 'study_groups'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    # Relationship to User through GroupMembership
    members = db.relationship('GroupMembership', back_populates='group')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            
        }


class GroupMembership(db.Model):
    __tablename__ = 'group_membership'
    
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey('study_groups.id'), primary_key=True)

    # Relationships to User and StudyGroup
    user = db.relationship('User', back_populates='groups')
    group = db.relationship('StudyGroup', back_populates='members')
