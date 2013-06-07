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

class Card(ndb.Model):
  cardId = ndb.IntegerProperty(required=True)
  english = ndb.StringProperty(required=True)
  pinyin = ndb.StringProperty(required=True)
  chinese = ndb.StringProperty(required=True)

class MainPage(webapp2.RequestHandler):
    def get(self):
        path = os.path.join(os.path.dirname(__file__), 'FlashCardChEng.html')
        cards = [
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

        template_args = {
            #'content': cards,
            'content_json': json.dumps(cards),
            #'variable': 42,
        }
        self.response.out.write(template.render(path, template_args))

application = webapp2.WSGIApplication([
	('/', MainPage),
])
