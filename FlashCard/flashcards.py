# encoding: utf-8
import cgi
import os

from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app

import webapp2

class MainPage(webapp2.RequestHandler):
  def get(self):
    path = os.path.join(os.path.dirname(__file__), 'FlashCardChEng.html')
    self.response.out.write(open(path, "r").read())

application = webapp2.WSGIApplication([('/', MainPage)])
