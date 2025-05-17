import yfinance as yf
from datetime import datetime, timedelta

def get_stock_data(symbol):
    stock = yf.Ticker(symbol)
    info = stock.info
    
    return {
        'symbol': symbol,
        'name': info.get('longName', ''),
        'price': info.get('currentPrice', 0),
        'change': info.get('regularMarketChange', 0),
        'changePercent': info.get('regularMarketChangePercent', 0),
        'volume': info.get('volume', 0),
        'marketCap': format_market_cap(info.get('marketCap', 0)),
        'lastUpdated': 'Just now',
        'open': info.get('regularMarketOpen', 0),
        'previousClose': info.get('regularMarketPreviousClose', 0),
        'dayHigh': info.get('dayHigh', 0),
        'dayLow': info.get('dayLow', 0),
        'yearHigh': info.get('fiftyTwoWeekHigh', 0),
        'yearLow': info.get('fiftyTwoWeekLow', 0),
        'avgVolume': info.get('averageVolume', 0),
        'pe': info.get('trailingPE', 0),
        'dividend': {
            'yield': info.get('dividendYield', 0) * 100 if info.get('dividendYield') else 0,
            'amount': info.get('dividendRate', 0) if info.get('dividendRate') else 0
        },
        'eps': info.get('trailingEps', 0)
    }

def get_stock_news(symbol):
    stock = yf.Ticker(symbol)
    news = stock.news
    
    formatted_news = []
    for item in news[:10]:  # Limit to 10 news items
        formatted_news.append({
            'id': str(item.get('uuid', '')),
            'title': item.get('title', ''),
            'summary': item.get('summary', ''),
            'url': item.get('link', ''),
            'publishedDate': format_date(item.get('providerPublishTime', 0)),
            'source': item.get('publisher', ''),
            'imageUrl': item.get('thumbnail', {}).get('resolutions', [{}])[0].get('url', '')
        })
    
    return formatted_news

def search_stocks(query):
    # For simplicity, we'll search through a limited set of popular stocks
    popular_stocks = [
        {'symbol': 'AAPL', 'name': 'Apple Inc.'},
        {'symbol': 'MSFT', 'name': 'Microsoft Corporation'},
        {'symbol': 'GOOGL', 'name': 'Alphabet Inc.'},
        {'symbol': 'AMZN', 'name': 'Amazon.com Inc.'},
        {'symbol': 'META', 'name': 'Meta Platforms Inc.'},
        {'symbol': 'TSLA', 'name': 'Tesla Inc.'},
        {'symbol': 'NVDA', 'name': 'NVIDIA Corporation'},
        {'symbol': 'JPM', 'name': 'JPMorgan Chase & Co.'}
    ]
    
    query = query.lower()
    return [
        stock for stock in popular_stocks
        if query in stock['symbol'].lower() or query in stock['name'].lower()
    ]

def format_market_cap(market_cap):
    if market_cap >= 1e12:
        return f'${market_cap/1e12:.2f}T'
    elif market_cap >= 1e9:
        return f'${market_cap/1e9:.2f}B'
    elif market_cap >= 1e6:
        return f'${market_cap/1e6:.2f}M'
    else:
        return f'${market_cap:,.2f}'

def format_date(timestamp):
    if not timestamp:
        return ''
    
    date = datetime.fromtimestamp(timestamp)
    now = datetime.now()
    diff = now - date
    
    if diff < timedelta(hours=1):
        return f'{diff.seconds // 60} mins ago'
    elif diff < timedelta(days=1):
        return f'{diff.seconds // 3600} hours ago'
    elif diff < timedelta(days=7):
        return f'{diff.days} days ago'
    else:
        return date.strftime('%b %d, %Y')