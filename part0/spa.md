![spa](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgU2luZ2xlIFBhZ2UgQXBwCgpCcm93c2VyLT5TZXJ2ZXI6IEhUVFAgR0VUIGh0dHBzOi8vZnVsbHN0YWNrLWV4YW1wbGVhcHAuaGVyb2t1YXBwLmNvbS9zcGEKADoGLS0-AEsHOiBIVE1MLWNvZGUgb2Ygc3BhLmh0bWwAK0ZtYWluLmNzcwBjEwASCQCBEkguagBTFAASB25vdGUgb3ZlciAAgW8ICgAtBiBleGVjdXRlcyBzY3JpcHQKdGhhdCBnZXQgZGF0YS5qc29uCndpdGggQUpBWAplbmQgbm90ZQCCSUYAWAoAgwMSW3tjb250ZW50OiAiSFRNTCBpcyBlYXN5IiwgZGF0ZTogIjIwMTktMDUtMjNUMTc6MzA6MzEuMDk4WiJ9LOKApl0AgV8UAIQ-BwCBagp0aGUgZXZlbnQgaGFuZGxlcgCBeQZyZW5kZXJpbmcAgWgFcyB0byBkaXNwbGF5AIF4Cg&s=default)

### The raws of code from image ###
```
title Single Page App

Browser->Server: HTTP GET https://fullstack-exampleapp.herokuapp.com/spa
Server-->Browser: HTML-code of spa.html
Browser->Server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css
Server-->Browser: main.css
Browser->Server: HTTP GET https://fullstack-exampleapp.herokuapp.com/spa.js
Server-->Browser: spa.js
note over Browser:
spa.js executes script
that get data.json
with AJAX
end note
Browser->Server: HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json
Server-->Browser: [{content: "HTML is easy", date: "2019-05-23T17:30:31.098Z"},…]
note over Browser:
Browser executes the event handler
that rendering notes to display
end note
```
