![spa_new_note](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgQWRkIE5vdGUgd2l0aCBTaW5nbGUgUGFnZSBBcHAKCkJyb3dzZXItPlNlcnZlcjogSFRUUCBQT1NUIGh0dHBzOi8vZnVsbHN0YWNrLWV4YW1wbGVhcHAuaGVyb2t1YXBwLmNvbS9uZXdfbm90ZV9zcGEKbm90ZSBvdmVyIABNBwoAVgYgcmVjZWl2ZSBkYXRhCmFuZCBzYXZlIHRvAAwFYmFzZS4KdGhlbiBzZW5kIGEganNvbiBtZXNzYWdlCnRvIGIAgSUGCmVuZCBub3RlAFAHLS0-AIE-BzogeyIAKQciOiIAgQIFY3JlYXRlZCJ9AIELCwAmCACBdAggZG9lc24nIHJlZGlyZWN0CnRoZSBwYWdlLgpkYXRhIHdhcyBwdXNoIG9yIGFkZAoAgkQFc3BhLmpzIHRoYXQgbG9hZGVkCndoZW4AMwUgaXMADwUgZWFybHkuAIEnCg&s=default)

### The raws of code from image ###
```
title Add Note with Single Page App

Browser->Server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note_spa
note over Server:
Server receive data
and save to database.
then send a json message
to browser
end note
Server-->Browser: {"message":"note created"}
note over Browser:
Browser doesn' redirect
the page.
data was push or add
with spa.js that loaded
when page is load early.
end note
```
