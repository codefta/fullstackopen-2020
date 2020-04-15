![new_note](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgQWRkIE5ldyBOb3RlIFByb2NjZXNzCgpCcm93c2VyLT5TZXJ2ZXI6IEhUVFAgUE9TVCBodHRwczovL2Z1bGxzdGFjay1leGFtcGxlYXBwLmhlcm9rdWFwcC5jb20vbmV3X25vdGUKbm90ZSBvdmVyIABSBzoKUmVjZWl2ZSB0ZXh0L2h0bWwgZmlsZQp0aGF0IG5vdGlmeSBzdGF0dXMgb2YAcwZtZXRob2QKZW5kIABQBQCBFQYtLT4ATAggSFRNTC1jb2QAWhdkaXJlY3Qgd2l0aCBoZWFkZXIgbG9jYXRpb24ATAoAgWQWR0UAgUsub3RlcwCBBB0AIkVtYWluLmNzAFYUABIJAB9KagBPGWpzAINOFGpzIHNjcmlwdCBnZXQgZGF0YS5qc29uAIJ6BmFqYXgAgiZPAFkJAIRbFHRoZQB0DwpuZXcgdmFsdWUgd2FzIGFkZGVkIGJ5IHN1Ym1pdHRlZCBmb3JtAIRTHFt7Y29udGVudDogIkhUTUwgaXMgZWFzeSIsIGRhdGU6ICIyMDE5LTA1LTIzVDE3OjMwOjMxLjA5OFoifSzigKZdAIYEFACGcwcgZXhlY3V0ZXMgdGhlIGV2ZW50IGhhbmRsZXIsIApzbyAAhiMGZXdzAIYIBXMgcmVuZGVyaW5nIHRvIGRpc3BsYXkAhiIK&s=default)

### The raws of code from image ###
```
title Add New Note Proccess

Browser->Server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note
note over Browser:
Receive text/html file
that notify status of POST method
end note
Server-->Browser: HTML-code
note over Browser:
Redirect with header location
end note
Browser->Server: HTTP GET https://fullstack-exampleapp.herokuapp.com/notes
Server-->Browser: HTML-code
Browser->Server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css
Server-->Browser: main.css
Browser->Server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.js
Server-->Browser: main.js
note over Browser:
js script get data.json with ajax
end note
Browser->Server: HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json
note over Browser:
the data.json with new value was added by submitted form
end note
Server-->Browser: [{content: "HTML is easy", date: "2019-05-23T17:30:31.098Z"},…]
note over Browser:
Browser executes the event handler, so that news notes rendering to display
end note
```

