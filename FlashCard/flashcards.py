# encoding: utf-8
import cgi
import json
import logging
import os

from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext.webapp import template

import webapp2
import jinja2

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'])


def ReadDecks():
  decks = []
  json_dir = os.path.join(os.path.dirname(__file__), "json")
  for dirname, dirnames, filenames in os.walk(json_dir):
    for filename in filenames:
      try:
        decks.append(json.loads(open(
            os.path.join(dirname, filename), "r").read()))
      except Exception:
        print "Fail loading flashcard deck %s" % filename
  return decks


class MainPage(webapp2.RequestHandler):
  def get(self, *args):
    decks = ReadDecks()
    deck_name = None
    if args:
      deck_name = args[0]

    # user = users.get_current_user()
    # login_url = None
    # logout_url = None
    # if user:
    #   logout_url = users.create_logout_url('/')
    # else:
    #   login_url = users.create_login_url(self.request.uri)  # 'http://www.google.com'

    path = os.path.join(os.path.dirname(__file__), 'FlashCardChEng.html')

    # Find which deck they want.
    deck = None
    if deck_name:
      valid_decks = [d for d in decks if d["name"] == deck_name]
      if valid_decks:
        deck = valid_decks[0]
    if not deck:
      deck = decks[0]

    template_args = {
        "deck_found": bool(deck),
        "content_json": json.dumps(deck["cards"]) if deck else "",
        # 'user': user,
        # 'login_url': login_url,
        # 'logout_url': logout_url,
        "deck_names": [d["name"] for d in decks],
    }
    self.response.out.write(template.render(path, template_args))

application = webapp2.WSGIApplication([
    ("/", MainPage),
    ("/(.*)", MainPage),
])
