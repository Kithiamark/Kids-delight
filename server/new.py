# app.py - Main Flask application
from flask import Flask, request, jsonify
from flask_cors import CORS
from firebase_admin import credentials, firestore, auth, initialize_app
import os
from datetime import datetime
import json

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Initialize Firebase Admin SDK
cred = credentials.Certificate('path/to/serviceAccountKey.json')  # Update this path
initialize_app(cred)
db = firestore.client()

# Content structure for different age groups
CONTENT_STRUCTURE = {
    "noah_ark": {
        "title": "Noah's Ark",
        "toddlers": {
            "description": "Noah built a big boat for all the animals!",
            "content": "God asked Noah to build a very big boat called an ark. Noah put two of every animal on the boat - elephants, lions, birds, and many more! Then it rained for many days, but Noah and all the animals were safe in the ark.",
            "quiz_questions": [
                {
                    "question": "What did Noah build?",
                    "options": ["A house", "A boat", "A car"],
                    "correct": 1,
                    "type": "multiple_choice"
                },
                {
                    "question": "Who went on the ark?",
                    "options": ["Animals", "Cars", "Toys"],
                    "correct": 0,
                    "type": "multiple_choice"
                }
            ]
        },
        "kids": {
            "description": "Learn about Noah's obedience and God's protection during the great flood",
            "content": "God saw that people were not being kind to each other, and He was sad. But Noah was a good man who loved God. God told Noah to build an ark because He was going to send a great flood. Noah obeyed God and built the ark exactly as God instructed. He gathered two of every kind of animal, and his family went into the ark. It rained for 40 days and 40 nights! When the flood was over, God put a beautiful rainbow in the sky as a promise to never flood the whole earth again.",
            "quiz_questions": [
                {
                    "question": "Why did God ask Noah to build an ark?",
                    "options": ["For fun", "Because of a flood", "To go fishing"],
                    "correct": 1,
                    "type": "multiple_choice"
                },
                {
                    "question": "How long did it rain?",
                    "options": ["7 days", "40 days and nights", "1 year"],
                    "correct": 1,
                    "type": "multiple_choice"
                },
                {
                    "question": "What did God put in the sky as a promise?",
                    "options": ["Stars", "Clouds", "A rainbow"],
                    "correct": 2,
                    "type": "multiple_choice"
                }
            ]
        },
        "tweens": {
            "description": "Explore themes of obedience, faith, and God's covenant through Noah's story",
            "content": "The story of Noah demonstrates the importance of obedience to God even when His instructions seem unusual. Noah lived in a time when wickedness had spread throughout the earth, yet he 'found grace in the eyes of the Lord' (Genesis 6:8). God's instruction to build an ark was both a test of faith and a means of salvation. Noah's obedience saved not only his family but also preserved all animal life on earth. The rainbow covenant God made with Noah represents His mercy and faithfulness to His promises. This story teaches us about the consequences of sin, the importance of righteousness, and God's plan for redemption.",
            "quiz_questions": [
                {
                    "question": "What does it mean that Noah 'found grace in the eyes of the Lord'?",
                    "options": ["Noah was perfect", "God showed Noah undeserved favor", "Noah was the strongest man"],
                    "correct": 1,
                    "type": "multiple_choice"
                },
                {
                    "question": "What does the rainbow represent in this story?",
                    "options": ["God's promise never to flood the earth again", "A natural weather phenomenon", "Noah's reward"],
                    "correct": 0,
                    "type": "multiple_choice"
                },
                {
                    "question": "How long was Noah on the ark in total?",
                    "options": ["40 days", "150 days", "Over a year"],
                    "correct": 2,
                    "type": "multiple_choice"
                }
            ]
        },
        "teens": {
            "description": "Deep dive into Noah's righteousness, divine judgment, and covenant theology",
            "content": "The narrative of Noah presents profound theological themes relevant to understanding God's character and His relationship with humanity. Noah is described as 'a righteous man, blameless in his generation' who 'walked with God' (Genesis 6:9). This phrase indicates not just moral uprightness but an intimate relationship with the divine. The flood represents divine judgment on sin while simultaneously demonstrating God's mercy through the preservation of Noah's family. The dimensions and construction of the ark reveal God's detailed care for preservation. The covenant established through the rainbow sign introduces the concept of unconditional divine promises that would later culminate in God's covenant with Abraham and ultimately the new covenant through Christ. This story challenges us to consider our own relationship with God and our response to His call for righteousness in our generation.",
            "quiz_questions": [
                {
                    "question": "What does it mean that Noah 'walked with God'?",
                    "options": ["Noah exercised regularly", "Noah had an intimate relationship with God", "Noah was a priest"],
                    "correct": 1,
                    "type": "multiple_choice"
                },
                {
                    "question": "How does the Noahic covenant relate to later biblical covenants?",
                    "options": ["It doesn't connect", "It establishes the pattern of God's unconditional promises", "It replaces all other covenants"],
                    "correct": 1,
                    "type": "multiple_choice"
                },
                {
                    "question": "What theological principle does the flood narrative demonstrate?",
                    "options": ["God's wrath without mercy", "The balance of divine justice and mercy", "Human ability to save themselves"],
                    "correct": 1,
                    "type": "multiple_choice"
                }
            ]
        }
    },
    "david_goliath": {
        "title": "David and Goliath",
        "toddlers": {
            "description": "Little David was brave and trusted God!",
            "content": "David was a young boy who took care of sheep. A very big, mean man named Goliath was scaring all the people. But David wasn't scared because he knew God was with him. David used his slingshot and a small stone to stop the big man. God helped David be brave!",
            "quiz_questions": [
                {
                    "question": "What was David's job?",
                    "options": ["Taking care of sheep", "Cooking food", "Building houses"],
                    "correct": 0,
                    "type": "multiple_choice"
                }
            ]
        },
        "kids": {
            "description": "Discover how young David's faith in God helped him defeat the giant Goliath",
            "content": "David was the youngest of eight brothers and worked as a shepherd. When the Philistine giant Goliath challenged Israel's army, all the soldiers were afraid - even King Saul! But David remembered how God had helped him protect his sheep from lions and bears. David knew that God would help him fight Goliath too. With just a sling and five smooth stones, David defeated the giant because he trusted in God's power, not his own strength.",
            "quiz_questions": [
                {
                    "question": "How many stones did David take?",
                    "options": ["3", "5", "10"],
                    "correct": 1,
                    "type": "multiple_choice"
                }
            ]
        },
        "tweens": {
            "description": "Learn about courage, faith, and standing up for what's right",
            "content": "The story of David and Goliath shows us that God can use anyone - even someone young - to accomplish great things. David's confidence didn't come from his own abilities but from his relationship with God and his past experiences of God's faithfulness. While others saw an impossible situation, David saw an opportunity for God to show His power. This story teaches us about the importance of faith over fear, and how God often chooses the unlikely to accomplish His purposes.",
            "quiz_questions": [
                {
                    "question": "What gave David confidence to fight Goliath?",
                    "options": ["His size and strength", "His past experiences with God's faithfulness", "His brothers' encouragement"],
                    "correct": 1,
                    "type": "multiple_choice"
                }
            ]
        },
        "teens": {
            "description": "Examine themes of faith, calling, and God's sovereignty in human affairs",
            "content": "The David and Goliath narrative illustrates several crucial theological and practical principles. David's victory represents the triumph of faith over fear, divine power over human strength, and spiritual conviction over physical intimidation. David's response to Goliath's taunts reveals his understanding of God's honor and covenant relationship with Israel. His declaration that 'the battle is the Lord's' demonstrates mature theological understanding that God fights for His people. This story also foreshadows David's future role as king and points to the greater David - Jesus Christ - who would ultimately defeat humanity's greatest enemies: sin and death.",
            "quiz_questions": [
                {
                    "question": "How does David's victory foreshadow Christ's victory?",
                    "options": ["Both used weapons", "Both defeated enemies that seemed impossible to overcome", "Both were kings"],
                    "correct": 1,
                    "type": "multiple_choice"
                }
            ]
        }
    }
}

def verify_firebase_token(token):
    """Verify Firebase ID token and return user info"""
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        print(f"Token verification failed: {e}")
        return None

@app.route('/api/users/profile', methods=['POST'])
def create_user_profile():
    """Create or update user profile"""
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    user_data = verify_firebase_token(token)
    
    if not user_data:
        return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.json
    profile_data = {
        'uid': data['uid'],
        'childName': data['childName'],
        'ageGroup': data['ageGroup'],
        'parentEmail': data.get('parentEmail', ''),
        'email': data['email'],
        'createdAt': datetime.utcnow(),
        'lastActive': datetime.utcnow()
    }
    
    try:
        # Store profile in Firestore
        db.collection('users').document(data['uid']).set(profile_data)
        return jsonify({'success': True, 'profile': profile_data})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/users/<uid>', methods=['GET'])
def get_user_profile(uid):
    """Get user profile"""
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    user_data = verify_firebase_token(token)
    
    if not user_data or user_data['uid'] != uid:
        return jsonify({'error': 'Unauthorized'}), 401
    
    try:
        doc = db.collection('users').document(uid).get()
        if doc.exists:
            profile = doc.to_dict()
            # Convert timestamp to string for JSON serialization
            if 'createdAt' in profile:
                profile['createdAt'] = profile['createdAt'].isoformat()
            if 'lastActive' in profile:
                profile['lastActive'] = profile['lastActive'].isoformat()
            return jsonify(profile)
        else:
            return jsonify({'error': 'Profile not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/lessons/<age_group>', methods=['GET'])
def get_lessons(age_group):
    """Get lessons for specific age group"""
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    user_data = verify_firebase_token(token)
    
    if not user_data:
        return jsonify({'error': 'Unauthorized'}), 401
    
    if age_group not in ['toddlers', 'kids', 'tweens', 'teens']:
        return jsonify({'error': 'Invalid age group'}), 400
    
    lessons = []
    for lesson_id, lesson_data in CONTENT_STRUCTURE.items():
        age_content = lesson_data[age_group]
        lessons.append({
            'id': lesson_id,
            'title': lesson_data['title'],
            'description': age_content['description'],
            'estimatedTime': get_estimated_time(age_group),
            'hasQuiz': len(age_content['quiz_questions']) > 0,
            'imageUrl': f'/images/{lesson_id}.jpg'  # You'll need to add images
        })
    
    return jsonify({'lessons': lessons})

@app.route('/api/lesson/<lesson_id>/<age_group>', methods=['GET'])
def get_lesson_content(lesson_id, age_group):
    """Get specific lesson content"""
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    user_data = verify_firebase_token(token)
    
    if not user_data:
        return jsonify({'error': 'Unauthorized'}), 401
    
    if lesson_id not in CONTENT_STRUCTURE or age_group not in ['toddlers', 'kids', 'tweens', 'teens']:
        return jsonify({'error': 'Lesson not found'}), 404
    
    lesson_data = CONTENT_STRUCTURE[lesson_id]
    age_content = lesson_data[age_group]
    
    return jsonify({
        'id': lesson_id,
        'title': lesson_data['title'],
        'description': age_content['description'],
        'content': age_content['content'],
        'ageGroup': age_group
    })

@app.route('/api/quiz/<lesson_id>/<age_group>', methods=['GET'])
def get_quiz(lesson_id, age_group):
    """Get quiz for specific lesson and age group"""
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    user_data = verify_firebase_token(token)
    
    if not user_data:
        return jsonify({'error': 'Unauthorized'}), 401
    
    if lesson_id not in CONTENT_STRUCTURE or age_group not in ['toddlers', 'kids', 'tweens', 'teens']:
        return jsonify({'error': 'Quiz not found'}), 404
    
    lesson_data = CONTENT_STRUCTURE[lesson_id]
    age_content = lesson_data[age_group]
    
    return jsonify({
        'lessonId': lesson_id,
        'title': f"{lesson_data['title']} Quiz",
        'questions': age_content['quiz_questions'],
        'ageGroup': age_group
    })

@app.route('/api/progress/<uid>', methods=['GET'])
def get_user_progress(uid):
    """Get user's learning progress"""
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    user_data = verify_firebase_token(token)
    
    if not user_data or user_data['uid'] != uid:
        return jsonify({'error': 'Unauthorized'}), 401
    
    try:
        doc = db.collection('progress').document(uid).get()
        if doc.exists:
            return jsonify({'progress': doc.to_dict()})
        else:
            return jsonify({'progress': {}})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/progress', methods=['POST'])
def update_progress():
    """Update user's learning progress"""
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    user_data = verify_firebase_token(token)
    
    if not user_data:
        return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.json
    uid = user_data['uid']
    lesson_id = data['lessonId']
    
    progress_data = {
        f'{lesson_id}.completed': data.get('completed', False),
        f'{lesson_id}.completionPercentage': data.get('completionPercentage', 0),
        f'{lesson_id}.quizScore': data.get('quizScore', 0),
        f'{lesson_id}.lastAccessed': datetime.utcnow(),
        f'{lesson_id}.timeSpent': data.get('timeSpent', 0)
    }
    
    try:
        db.collection('progress').document(uid).set(progress_data, merge=True)
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_estimated_time(age_group):
    """Get estimated time based on age group"""
    time_mapping = {
        'toddlers': 5,   # 5 minutes
        'kids': 10,      # 10 minutes  
        'tweens': 15,    # 15 minutes
        'teens': 20      # 20 minutes
    }
    return time_mapping.get(age_group, 10)

@app.route('/api/submit-quiz', methods=['POST'])
def submit_quiz():
    """Submit quiz answers and calculate score"""
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    user_data = verify_firebase_token(token)
    
    if not user_data:
        return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.json
    lesson_id = data['lessonId']
    age_group = data['ageGroup']
    answers = data['answers']
    
    if lesson_id not in CONTENT_STRUCTURE:
        return jsonify({'error': 'Invalid lesson'}), 400
    
    # Get correct answers
    quiz_questions = CONTENT_STRUCTURE[lesson_id][age_group]['quiz_questions']
    correct_answers = 0
    total_questions = len(quiz_questions)
    
    for i, question in enumerate(quiz_questions):
        if i < len(answers) and answers[i] == question['correct']:
            correct_answers += 1
    
    score = int((correct_answers / total_questions) * 100) if total_questions > 0 else 0
    
    # Update progress
    uid = user_data['uid']
    progress_data = {
        f'{lesson_id}.quizScore': score,
        f'{lesson_id}.quizCompleted': True,
        f'{lesson_id}.lastQuizDate': datetime.utcnow()
    }
    
    try:
        db.collection('progress').document(uid).set(progress_data, merge=True)
        return jsonify({
            'score': score,
            'correctAnswers': correct_answers,
            'totalQuestions': total_questions,
            'passed': score >= 70  # 70% passing grade
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/leaderboard/<age_group>', methods=['GET'])
def get_leaderboard(age_group):
    """Get leaderboard for age group (optional feature)"""
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    user_data = verify_firebase_token(token)
    
    if not user_data:
        return jsonify({'error': 'Unauthorized'}), 401
    
    try:
        # Get all users in the age group
        users_ref = db.collection('users').where('ageGroup', '==', age_group)
        users = users_ref.stream()
        
        leaderboard = []
        for user in users:
            user_data = user.to_dict()
            progress_doc = db.collection('progress').document(user.id).get()
            
            if progress_doc.exists:
                progress = progress_doc.to_dict()
                total_score = sum([lesson.get('quizScore', 0) for lesson in progress.values() if isinstance(lesson, dict)])
                completed_lessons = sum([1 for lesson in progress.values() if isinstance(lesson, dict) and lesson.get('completed', False)])
                
                leaderboard.append({
                    'childName': user_data.get('childName', 'Anonymous'),
                    'totalScore': total_score,
                    'completedLessons': completed_lessons,
                    'uid': user.id  # For privacy, you might want to use a different identifier
                })
        
        # Sort by total score and completed lessons
        leaderboard.sort(key=lambda x: (x['completedLessons'], x['totalScore']), reverse=True)
        
        return jsonify({'leaderboard': leaderboard[:10]})  # Top 10
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)