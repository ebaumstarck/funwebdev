# encoding: utf-8
import cgi
import json
import os

from google.appengine.ext import ndb
from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext.webapp import template

import webapp2
import jinja2

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'])

decks = [{
  'name':'stack1',
  'cards': [
      { "english":"hello",
      "chinese":"你好",
      "pinyin":"ni3hao3"
      },
      { "english":"thanks",
      "chinese":"谢谢",
      "pinyin":"xie4xie4"
      },
      { "english":"welcome",
      "chinese":"欢迎",
      "pinyin":"huan1ying2"
      },
      { "english":"you are welcome",
      "chinese":"不用谢",
      "pinyin":"bu2yong4xie4"
      },
      { "english":"wait a moment",
      "chinese":"等一下",
      "pinyin":"deng3yi1xia4"
      },
      { "english":"drive a car",
      "chinese":"开车",
      "pinyin":"kai1che1"
      },
      { "english":"good",
      "chinese":"好",
      "pinyin":"hao3"
      },
       { "english":"bad",
      "chinese":"坏",
      "pinyin":"huai4"
      },
      { "english":"expensive",
      "chinese":"贵",
      "pinyin":"gui4"
      },
      { "english":"cheap",
      "chinese":"便宜",
      "pinyin":"pian2yi2"
      },
      { "english":"busy",
      "chinese":"忙",
      "pinyin":"mang2"
      },
      { "english":"difficult",
      "chinese":"难",
      "pinyin":"nan2"
      },
      { "english":"smart",
      "chinese":"聪明",
      "pinyin":"cong1ming2"
      },
      { "english":"pretty",
      "chinese":"漂亮",
      "pinyin":"piao4liang4"
      },
      { "english":"cute",
      "chinese":"可爱",
      "pinyin":"ke3ai4"
      }
  ]
}, {
  "name": "stack2",
  'cards': [
      { "english":"go",
      "chinese":"去",
      "pinyin":"qu4"
      },
      { "english":"cat",
      "chinese":"猫",
      "pinyin":"mao1"
      }
  ]
}]

class Card(ndb.Model):
  cardId = ndb.IntegerProperty(required=True)
  english = ndb.StringProperty(required=True)
  pinyin = ndb.StringProperty(required=True)
  chinese = ndb.StringProperty(required=True)

class MainPage(webapp2.RequestHandler):
  def get(self):
    deckName = self.request.get("deckName")

    user = users.get_current_user()
    login_url = None
    logout_url = None
    if user:
      logout_url = users.create_logout_url('/')
    else:
      login_url = users.create_login_url(self.request.uri)  # 'http://www.google.com'

    path = os.path.join(os.path.dirname(__file__), 'FlashCardChEng.html')

    # Find which deck they want.
    deck = None
    if deckName:
      validDecks = [d for d in decks if d["name"] == deckName]
      if validDecks:
        deck = validDecks[0]
    elif decks:
      deck = decks[0]

    deckNames = [t["name"] for t in decks]
    template_args = {
        #'content': cards,
        'content_json': json.dumps(deck["cards"]),
        # 'userGreeting':userGreeting,
        'user': user,
        'login_url': login_url,
        'logout_url': logout_url,
        'deckNames': deckNames,
        #'variable': 42,
    }
    self.response.out.write(template.render(path, template_args))

# ？class DeckHandler(webapp2.RequestHandler):
#   def get(self, deckName):
#     self.response.write("So you want deck '%s', eh?" % deckName)

application = webapp2.WSGIApplication([
    ('/', MainPage),
    # (r'/deck/(.*)', DeckHandler),
])
