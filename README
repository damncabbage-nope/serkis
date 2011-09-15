Serkis
============

Serkis is wiki software that is beautiful and simple to use. It runs as a Sinatra rack application that uses a modified version of [Gollum](https://github.com/github/gollum). It adds authentication via Basecamp and allows for multiple users.

Pages that are written in Serkis are saved to `pages/`.


Installation
------------

```bash
git clone git://github.com/smashcon/serkis.git  # Warning: read-only.
cd serkis

cd pages
git init

cd ..

bundle install
alias be="bundle exec"

# Kick it off in development mode
be ruby app.rb
```

Now go and open http://localhost:4567/ in your browser and start contributing.


Caveats
-------

Serkis was developed for internal use. We wanted to open source it so that people could see what we were up to but there are elements of it that are still pretty tightly tied to our needs at the moment. (This is why why we have it coupled with Basecamp's authentication API.)

We haven't had time to split out the authentication into a Warden strategy yet or to even make the particular Basecamp subdomain configurable.


Licence
-------

Original code &copy; 2011 Michael Camilleri. SMASH! Wiki is distributed under an [MIT Licence](http://en.wikipedia.org/wiki/MIT_License).