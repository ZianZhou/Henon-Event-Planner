from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Event
from datetime import datetime


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///events.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    CORS(app)

    with app.app_context():
        db.create_all()

    @app.route('/events', methods=['GET'])
    def get_events():
        events = Event.query.order_by(Event.order).all()
        return jsonify([e.to_dict() for e in events])

    @app.route('/events', methods=['POST'])
    def create_event():
        data = request.get_json()
        title = data.get('title')
        type_ = data.get('type')
        try:
            start_date = datetime.fromisoformat(data.get('startDate')).date()
            end_date = datetime.fromisoformat(data.get('endDate')).date()
        except:
            return jsonify({"message": "Invalid date format"}), 400
        if not title:
            return jsonify({"message": "Title is required"}), 400
        max_order = db.session.query(db.func.max(Event.order)).scalar() or 0
        event = Event(title=title, type=type_, start_date=start_date, end_date=end_date, order=max_order+1)
        db.session.add(event)
        db.session.commit()
        return jsonify(event.to_dict()), 201

    @app.route('/events/<int:event_id>', methods=['PUT'])
    def update_event(event_id):
        event = Event.query.get_or_404(event_id)
        data = request.get_json()
        event.title = data.get('title', event.title)
        event.type = data.get('type', event.type)
        try:
            event.start_date = datetime.fromisoformat(data.get('startDate')).date()
            event.end_date = datetime.fromisoformat(data.get('endDate')).date()
        except:
            pass
        db.session.commit()
        return jsonify(event.to_dict())

    @app.route('/events/<int:event_id>', methods=['DELETE'])
    def delete_event(event_id):
        event = Event.query.get_or_404(event_id)
        db.session.delete(event)
        db.session.commit()
        return '', 204

    @app.route('/events/reorder', methods=['PUT'])
    def reorder_events():
        data = request.get_json()
        order = data.get('order', [])
        for idx, event_id in enumerate(order):
            event = Event.query.get(event_id)
            if event:
                event.order = idx
        db.session.commit()
        return jsonify({"message": "Order updated"})

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)