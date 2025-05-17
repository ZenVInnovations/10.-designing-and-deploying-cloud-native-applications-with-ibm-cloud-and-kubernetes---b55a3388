from flask import Blueprint, jsonify
from .stock_api import get_stock_data, get_stock_news, search_stocks

api = Blueprint('api', __name__)

@api.route('/stock/<symbol>')
def stock_data(symbol):
    try:
        data = get_stock_data(symbol)
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@api.route('/news/<symbol>')
def stock_news(symbol):
    try:
        news = get_stock_news(symbol)
        return jsonify(news)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@api.route('/search/<query>')
def search(query):
    try:
        results = search_stocks(query)
        return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)}), 400