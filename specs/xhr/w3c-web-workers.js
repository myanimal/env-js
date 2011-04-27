/******************************************************************************
http://dev.w3.org/html5/workers/

W3C
Web Workers
Editor's Draft 14 March 2011

Latest Published Version:
    http://www.w3.org/TR/workers/
Latest Editor's Draft:
    http://dev.w3.org/html5/workers/
Previous Versions:
    http://www.w3.org/TR/2009/WD-workers-20090423/ 
    http://www.w3.org/TR/2009/WD-workers-20091029/
Editor:
    Ian Hickson, Google, Inc.

Copyright © 2010 W3C® (MIT, ERCIM, Keio), All Rights Reserved. W3C liability,
trademark and document use rules apply.

The bulk of the text of this specification is also available in the WHATWG Web
Applications 1.0 specification, under a license that permits reuse of the
specification text.

Abstract

This specification defines an API that allows Web application authors to spawn
background workers running scripts in parallel to their main page. This allows
for thread-like operation with message-passing as the coordination mechanism.

Status of This document

This section describes the status of this document at the time of its
publication. Other documents may supersede this document. A list of current W3C
publications and the most recently formally published revision of this
technical report can be found in the W3C technical reports index at
http://www.w3.org/TR/.

If you wish to make comments regarding this document in a manner that is
tracked by the W3C, please submit them via using our public bug database. If
you do not have an account then you can enter feedback using this form:

Feedback Comments

Please enter your feedback, carefully indicating the title of the section for
which you are submitting feedback, quoting the text that's wrong today if
appropriate. If you're suggesting a new feature, it's really important to say
what the problem you're trying to solve is. That's more important than the
solution, in fact.

Please don't use section numbers as these tend to change rapidly and make your
feedback harder to understand.

(Note: Your IP address and user agent will be publicly recorded for spam
prevention purposes.)

You can also e-mail feedback to public-webapps@w3.org (subscribe, archives), or
whatwg@whatwg.org (subscribe, archives). All feedback is welcome.

Implementors should be aware that this specification is not stable.
Implementors who are not taking part in the discussions are likely to find the
specification changing out from under them in incompatible ways. Vendors
interested in implementing this specification before it eventually reaches the
Candidate Recommendation stage should join the aforementioned mailing lists and
take part in the discussions.

The latest stable version of the editor's draft of this specification is always
available on the W3C CVS server and in the WHATWG Subversion repository. The
latest editor's working copy (which may contain unfinished text in the process
of being prepared) contains the latest draft text of this specification
(amongst others). For more details, please see the WHATWG FAQ.

Notifications of changes to this specification are sent along with
notifications of changes to related specifications using the following
mechanisms:

E-mail notifications of changes
    Commit-Watchers mailing list (complete source diffs):
    http://lists.whatwg.org/listinfo.cgi/commit-watchers-whatwg.org
Browsable version-control record of all changes:
    CVSWeb interface with side-by-side diffs: http://dev.w3.org/cvsweb/html5/
    Annotated summary with unified diffs:
    http://html5.org/tools/web-apps-tracker
    Raw Subversion interface: svn checkout http://svn.whatwg.org/webapps/

The W3C Web Applications Working Group is the W3C working group responsible for
this specification's progress along the W3C Recommendation track. This
specification is the 14 March 2011 Editor's Draft.

This document was produced by a group operating under the 5 February 2004 W3C
Patent Policy. W3C maintains a public list of any patent disclosures made in
connection with the deliverables of the group; that page also includes
instructions for disclosing a patent. An individual who has actual knowledge of
a patent which the individual believes contains Essential Claim(s) must
disclose the information in accordance with section 6 of the W3C Patent Policy.

Table of Contents

    1 Introduction
        1.1 Scope
        1.2 Tutorial
            1.2.1 A background number-crunching worker
            1.2.2 A worker for updating a client-side database
            1.2.3 Worker used for background I/O
            1.2.4 Shared workers introduction
            1.2.5 Shared state using a shared worker
            1.2.6 Delegation
    2 Conformance requirements
        2.1 Dependencies
    3 Terminology
    4 Infrastructure
        4.1 The global scope
            4.1.1 The WorkerGlobalScope abstract interface
            4.1.2 Dedicated workers and the DedicatedWorkerGlobalScope interface
            4.1.3 Shared workers and the SharedWorkerGlobalScope interface
        4.2 Origins of workers
        4.3 The event loop
        4.4 The worker's lifetime
        4.5 Processing model
        4.6 Runtime script errors
        4.7 Creating workers
            4.7.1 The AbstractWorker abstract interface
            4.7.2 Dedicated workers and the Worker interface
            4.7.3 Shared workers and the SharedWorker interface
    5 APIs available to workers
        5.1 Importing scripts and libraries
        5.2 The WorkerNavigator object
        5.3 Interface objects and constructors
        5.4 Worker locations
    References
    Acknowledgements

1 Introduction
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
1.1 Scope

This section is non-normative.

This specification defines an API for running scripts in the background
independently of any user interface scripts.

This allows for long-running scripts that are not interrupted by scripts that
respond to clicks or other user interactions, and allows long tasks to be
executed without yielding to keep the page responsive.

Workers (as these background scripts are called herein) are relatively
heavy-weight, and are not intended to be used in large numbers. For example, it
would be inappropriate to launch one worker for each pixel of a four megapixel
image. The examples below show some appropriate uses of workers.

Generally, workers are expected to be long-lived, have a high start-up
performance cost, and a high per-instance memory cost.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

1.2 Tutorial

This section is non-normative.

There are a variety of uses that workers can be put to. The following
subsections show various examples of this use.

1.2.1 A background number-crunching worker

This section is non-normative.

The simplest use of workers is for performing a computationally expensive task
without interrupting the user interface.

In this example, the main document spawns a worker to (naïvely) compute prime
numbers, and progressively displays the most recently found prime number.

The main page is as follows:

<!DOCTYPE HTML>
<html>
 <head>
  <title>Worker example: One-core computation</title>
 </head>
 <body>
  <p>The highest prime number discovered so far is: <output id="result"></output></p>
  <script>
   var worker = new Worker('worker.js');
   worker.onmessage = function (event) {
     document.getElementById('result').textContent = event.data;
   };
  </script>
 </body>
</html>

The Worker() constructor call creates a worker and returns a Worker object
representing that worker, which is used to communicate with the worker. That
object's onmessage event handler allows the code to receive messages from the
worker.

The worker itself is as follows:

var n = 1;
search: while (true) {
  n += 1;
  for (var i = 2; i <= Math.sqrt(n); i += 1)
    if (n % i == 0)
     continue search;
  // found a prime!
  postMessage(n);
}

The bulk of this code is simply an unoptimized search for a prime number. To
send a message back to the page, the send() method is used to post a message
when a prime is found.

View this example online.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

1.2.2 A worker for updating a client-side database

This section is non-normative.

In this example, the main document spawns a worker whose only task is to listen
for notifications from the server, and, when appropriate, either add or remove
data from the client-side database.

Since no communication occurs between the worker and the main page, the main
page can start the worker by just doing:

<script>
 new Worker('worker.js');
</script>

The worker itself is as follows:

var server = new WebSocket('ws://whatwg.org/database');
var database = openDatabase('demobase', '1.0', 'Demo Database', 10240);
server.onmessage = function (event) {
  // data is in the format "command key value"
  var data = event.data.split(' ');
  switch (data[0]) {
    case '+':
     database.transaction(function(tx) {
       tx.executeSql('INSERT INTO pairs (key, value) VALUES (?, ?)', data[1], data[2]);
     });
    case '-':
     database.transaction(function(tx) {
       tx.executeSql('DELETE FROM pairs WHERE key=? AND value=?', data[1], data[2]);
     });
  }
};

This connects to the server using the WebSocket mechanism and opens the local
database (which, we presume, has been created earlier). The worker then just
listens for messages from the server and acts on them as appropriate, forever
(or until the main page is closed).

View this example online. (This example will not actually function, since the
server does not actually exist and the database is not created by this sample
code.)

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

1.2.3 Worker used for background I/O

This section is non-normative.

In this example, the main document uses two workers, one for fetching stock
updates for at regular intervals, and one for fetching performing search
queries that the user requests.

The main page is as follows:

<!DOCTYPE HTML>
<html>
 <head>
  <title>Worker example: Stock ticker</title>
  <script>
   // TICKER
   var symbol = 'GOOG'; // default symbol to watch
   var ticker = new Worker('ticker.js');

   // SEARCHER
   var searcher = new Worker('searcher.js');
   function search(query) {
     searcher.postMessage(query);
   }

   // SYMBOL SELECTION UI
   function select(newSymbol) {
     symbol = newSymbol;
     ticker.postMessage(symbol);
   }
  </script>
 </head>
 <body onload="search('')">
  <p><output id="symbol"></output> <output id="value"></output></p>
  <script>
   ticker.onmessage = function (event) {
     var data = event.data.split(' ');
     document.getElementById('symbol').textContent = data[0];
     document.getElementById('value').textContent = data[1];
   };
   ticker.postMessage(symbol);
  </script>
  <p><label>Search: <input type="text" autofocus oninput="search(this.value)"></label></p>
  <ul id="results"></ul>
  <script>
   searcher.onmessage = function (event) {
     var data = event.data.split(' ');
     var results = document.getElementById('results');
     while (results.hasChildNodes()) // clear previous results
       results.removeChild(results.firstChild);
     for (var i = 0; i < data.length; i += 1) {
       // add a list item with a button for each result
       var li = document.createElement('li');
       var button = document.createElement('button');
       button.value = data[i];
       button.type = 'button';
       button.onclick = function () { select(this.value); };
       button.textContent = data[i];
       li.appendChild(button);
       results.appendChild(li);
     }
   };
  </script>
  <p>(The data in this example is not real. Try searching for "Google" or "Apple".)</p>
 </body>
</html>

The two workers use a common library for performing the actual network calls.
This library is as follows:

function get(url) {
  try {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();
    return xhr.responseText;
  } catch (e) {
    return ''; // turn all errors into empty results
  }
}

The stock updater worker is as follows:

importScripts('io.js');
var timer;
var symbol;
function update() {
  postMessage(symbol + ' ' + get('stock.cgi?' + symbol));
  timer = setTimeout(update, 10000);
}
onmessage = function (event) {
  if (timer)
    clearTimeout(timer);
  symbol = event.data;
  update();
};

The search query worker is as follows:

importScripts('io.js');
onmessage = function (event) {
  postMessage(get('search.cgi?' + event.data));
};

View this example online.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

1.2.4 Shared workers introduction

This section is non-normative.

This section introduces shared workers using a Hello World example. Shared
workers use slightly different APIs, since each worker can have multiple
connections.

This first example shows how you connect to a worker and how a worker can send
a message back to the page when it connects to it. Received messages are
displayed in a log.

Here is the HTML page:

<!DOCTYPE HTML>
<title>Shared workers: demo 1</title>
<pre id="log">Log:</pre>
<script>
  var worker = new SharedWorker('test.js');
  var log = document.getElementById('log');
  worker.port.onmessage = function(e) { // note: not worker.onmessage!
    log.textContent += '\n' + e.data;
  }
</script>

Here is the JavaScript worker:

onconnect = function(e) {
  var port = e.ports[0];
  port.postMessage('Hello World!');
}

View this example online.

This second example extends the first one by changing two things: first,
messages are received using addEventListener() instead of an event handler IDL
attribute, and second, a message is sent to the worker, causing the worker to
send another message in return. Received messages are again displayed in a log.

Here is the HTML page:

<!DOCTYPE HTML>
<title>Shared workers: demo 2</title>
<pre id="log">Log:</pre>
<script>
  var worker = new SharedWorker('test.js');
  var log = document.getElementById('log');
  worker.port.addEventListener('message', function(e) {
    log.textContent += '\n' + e.data;
  }, false);
  worker.port.start(); // note: need this when using addEventListener
  worker.port.postMessage('ping');
</script>

Here is the JavaScript worker:

onconnect = function(e) {
  var port = e.ports[0];
  port.postMessage('Hello World!');
  port.onmessage = function(e) {
    port.postMessage('pong'); // not e.ports[0].postMessage!
    // e.target.postMessage('pong'); would work also
  }
}

View this example online.

Finally, the example is extended to show how two pages can connect to the same
worker; in this case, the second page is merely in an iframe on the first page,
but the same principle would apply to an entirely separate page in a separate
top-level browsing context.

Here is the outer HTML page:

<!DOCTYPE HTML>
<title>Shared workers: demo 3</title>
<pre id="log">Log:</pre>
<script>
  var worker = new SharedWorker('test.js');
  var log = document.getElementById('log');
  worker.port.addEventListener('message', function(e) {
    log.textContent += '\n' + e.data;
  }, false);
  worker.port.start();
  worker.port.postMessage('ping');
</script>
<iframe src="inner.html"></iframe>

Here is the inner HTML page:

<!DOCTYPE HTML>
<title>Shared workers: demo 3 inner frame</title>
<pre id=log>Inner log:</pre>
<script>
  var worker = new SharedWorker('test.js');
  var log = document.getElementById('log');
  worker.port.onmessage = function(e) {
   log.textContent += '\n' + e.data;
  }
</script>

Here is the JavaScript worker:

var count = 0;
onconnect = function(e) {
  count += 1;
  var port = e.ports[0];
  port.postMessage('Hello World! You are connection #' + count);
  port.onmessage = function(e) {
    port.postMessage('pong');
  }
}

View this example online.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

1.2.5 Shared state using a shared worker

This section is non-normative.

In this example, multiple windows (viewers) can be opened that are all viewing
the same map. All the windows share the same map information, with a single
worker coordinating all the viewers. Each viewer can move around independently,
but if they set any data on the map, all the viewers are updated.

The main page isn't interesting, it merely provides a way to open the viewers:

<!DOCTYPE HTML>
<html>
 <head>
  <title>Workers example: Multiviewer</title>
  <script>
   function openViewer() {
     window.open('viewer.html');
   }
  </script>
 </head>
 <body>
  <p><button type=button onclick="openViewer()">Open a new
  viewer</button></p>
  <p>Each viewer opens in a new window. You can have as many viewers
  as you like, they all view the same data.</p>
 </body>
</html>

The viewer is more involved:

<!DOCTYPE HTML>
<html>
 <head>
  <title>Workers example: Multiviewer viewer</title>
  <script>
   var worker = new SharedWorker('worker.js', 'core');

   // CONFIGURATION
   function configure(event) {
     if (event.data.substr(0, 4) != 'cfg ') return;
     var name = event.data.substr(4).split(' ', 1);
     // update display to mention our name is name
     document.getElementsByTagName('h1')[0].textContent += ' ' + name;
     // no longer need this listener
     worker.port.removeEventListener('message', configure, false);
   }
   worker.port.addEventListener('message', configure, false);

   // MAP
   function paintMap(event) {
     if (event.data.substr(0, 4) != 'map ') return;
     var data = event.data.substr(4).split(',');
     // display tiles data[0] .. data[8]
     var canvas = document.getElementById('map');
     var context = canvas.getContext('2d');
     for (var y = 0; y < 3; y += 1) {
       for (var x = 0; x < 3; x += 1) {
         var tile = data[y * 3 + x];
         if (tile == '0')
           context.fillStyle = 'green';
         else 
           context.fillStyle = 'maroon';
         fillRect(x * 50, y * 50, 50, 50);
       }
     }
   }
   worker.port.addEventListener('message', paintMap, false);

   // PUBLIC CHAT
   function updatePublicChat(event) {
     if (event.data.substr(0, 4) != 'txt ') return;
     var name = event.data.substr(4).split(' ', 1);
     var message = event.data.substr(4 + length(name) + 1);
     // display "<name> message" in public chat
     var dialog = document.getElementById('public');
     var dt = document.createElement('dt');
     dt.textContent = name;
     dialog.appendChild(dt);
     var dd = document.createElement('dd');
     dd.textContent = message;
     dialog.appendChild(dd);
   }
   worker.port.addEventListener('message', updatePublicChat, false);

   // PRIVATE CHAT
   function startPrivateChat(event) {
     if (event.data.substr(0, 4) != 'msg ') return;
     var name = event.data.substr(4).split(' ', 1);
     var port = event.ports[0];
     // display a private chat UI
     var ul = document.getElementById('private');
     var li = document.createElement('li');
     var h3 = document.createElement('h3');
     h3.textContent = 'Private chat with ' + name;
     li.appendChild(h3);
     var dialog = document.createElement('dialog');
     var addMessage = function(name, message) {
       var dt = document.createElement('dt');
       dt.textContent = name;
       dialog.appendChild(dt);
       var dd = document.createElement('dd');
       dd.textContent = message;
       dialog.appendChild(dd);
     };
     port.onmessage = function (event) {
       addMessage(name, event.data);
     };
     li.appendChild(dialog);
     var form = document.createElement('form');
     var p = document.createElement('p');
     var input = document.createElement('input');
     input.size = 50;
     p.appendChild(input);
     p.appendChild(document.createTextNode(' '));
     var button = document.createElement('button');
     button.textContent = 'Post';
     p.appendChild(button);
     form.onsubmit = function () {
       port.postMessage(input.value);
       addMessage('me', input.value);
       input.value = '';
       return false;
     };
     form.appendChild(p);
     li.appendChild(form);
   }
   worker.port.addEventListener('message', startPrivateChat, false);

   worker.port.start();
  </script>
 </head>
 <body>
  <h1>Viewer</h1>
  <h2>Map</h2>
  <p><canvas id="map" height=150 width=150></canvas></p>
  <p>
   <button type=button onclick="worker.port.postMessage('mov left')">Left</button>
   <button type=button onclick="worker.port.postMessage('mov up')">Up</button>
   <button type=button onclick="worker.port.postMessage('mov down')">Down</button>
   <button type=button onclick="worker.port.postMessage('mov right')">Right</button>
   <button type=button onclick="worker.port.postMessage('set 0')">Set 0</button>
   <button type=button onclick="worker.port.postMessage('set 1')">Set 1</button>
  </p>
  <h2>Public Chat</h2>
  <dialog id="public"></dialog>
  <form onsubmit="worker.port.postMessage('txt ' + message.value); message.value = ''; return false;">
   <p>
    <input type="text" name="message" size="50">
    <button>Post</button>
   </p>
  </form>
  <h2>Private Chat</h2>
  <ul id="private"></ul>
 </body>
</html>

There are several key things worth noting about the way the viewer is written.

Multiple listeners. Instead of a single message processing function, the code
here attaches multiple event listeners, each one performing a quick check to
see if it is relevant for the message. In this example it doesn't make much
difference, but if multiple authors wanted to collaborate using a single port
to communicate with a worker, it would allow for independent code instead of
changes having to all be made to a single event handling function.

Registering event listeners in this way also allows you to unregister specific
listeners when you are done with them, as is done with the configure() method
in this example.

Finally, the worker:

var nextName = 0;
function getNextName() {
  // this could use more friendly names
  // but for now just return a number
  return nextName++;
}

var map = [
 [0, 0, 0, 0, 0, 0, 0],
 [1, 1, 0, 1, 0, 1, 1],
 [0, 1, 0, 1, 0, 0, 0],
 [0, 1, 0, 1, 0, 1, 1],
 [0, 0, 0, 1, 0, 0, 0],
 [1, 0, 0, 1, 1, 1, 1],
 [1, 1, 0, 1, 1, 0, 1],
];

function wrapX(x) {
  if (x < 0) return wrapX(x + map[0].length);
  if (x >= map[0].length) return wrapX(x - map[0].length);
  return x;
}

function wrapY(y) {
  if (y < 0) return wrapY(y + map.length);
  if (y >= map[0].length) return wrapY(y - map.length);
  return y;
}

function sendMapData(callback) {
  var data = '';
  for (var y = viewer.y-1; y <= viewer.y+1; y += 1) {
    for (var x = viewer.x-1; x <= viewer.x+1; x += 1) {
      if (data != '')
        data += ',';
      data += map[y][x];
    }
  }
  callback('map ' + data);
}

var viewers = {};
onconnect = function (event) {
  event.ports[0]._name = getNextName();
  event.ports[0]._data = { port: event.port, x: 0, y: 0, };
  viewers[event.ports[0]._name] = event.port._data;
  event.ports[0].postMessage('cfg ' + name);
  event.ports[0].onmessage = getMessage;
  sendMapData(event.ports[0].postMessage);
};

function getMessage(event) {
  switch (event.data.substr(0, 4)) {
    case 'mov ':
      var direction = event.data.substr(4);
      var dx = 0;
      var dy = 0;
      switch (direction) {
        case 'up': dy = -1; break;
        case 'down': dy = 1; break;
        case 'left': dx = -1; break;
        case 'right': dx = 1; break;
      }
      event.target._data.x = wrapX(event.target._data.x + dx);
      event.target._data.y = wrapY(event.target._data.y + dy);
      sendMapData(event.target.postMessage);
      break;
    case 'set ':
      var value = event.data.substr(4);
      map[event.target._data.y][event.target._data.x] = value;
      for (var viewer in viewers)
        sendMapData(viewers[viewer].port.postMessage);
      break;
    case 'txt ':
      var name = event.target._name;
      var message = event.data.substr(4);
      for (var viewer in viewers)
        viewers[viewer].port.postMessage('txt ' + name + ' ' + message);
      break;
    case 'msg ':
      var party1 = event._data;
      var party2 = viewers[event.data.substr(4).split(' ', 1)];
      if (party2) {
        var channel = new MessageChannel();
        party1.port.postMessage('msg ' + party2.name, [channel.port1]);
        party2.port.postMessage('msg ' + party1.name, [channel.port2]);
      }
      break;
  }
}

Connecting to multiple pages. The script uses the onconnect event listener to
listen for multiple connections.

Direct channels. When the worker receives a "msg" message from one viewer
naming another viewer, it sets up a direct connection between the two, so that
the two viewers can communicate directly without the worker having to proxy all
the messages.

View this example online.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

1.2.6 Delegation

This section is non-normative.

With multicore CPUs becoming prevalent, one way to obtain better performance is
to split computationally expensive tasks amongst multiple workers. In this
example, a computationally expensive task that is to be performed for every
number from 1 to 10,000,000 is farmed out to ten subworkers.

The main page is as follows, it just reports the result:

<!DOCTYPE HTML>
<html>
 <head>
  <title>Worker example: Multicore computation</title>
 </head>
 <body>
  <p>Result: <output id="result"></output></p>
  <script>
   var worker = new Worker('worker.js');
   worker.onmessage = function (event) {
     document.getElementById('result').textContent = event.data;
   };
  </script>
 </body>
</html>

The worker itself is as follows:

// settings
var num_workers = 10;
var items_per_worker = 1000000;

// start the workers
var result = 0;
var pending_workers = num_workers;
for (var i = 0; i < num_workers; i += 1) {
  var worker = new Worker('core.js');
  worker.postMessage(i * items_per_worker);
  worker.postMessage((i+1) * items_per_worker);
  worker.onmessage = storeResult;
}

// handle the results
function storeResult(event) {
  result += 1*event.data;
  pending_workers -= 1;
  if (pending_workers <= 0)
    postMessage(result); // finished!
}

It consists of a loop to start the subworkers, and then a handler that waits
for all the subworkers to respond.

The subworkers are implemented as follows:

var start;
onmessage = getStart;
function getStart(event) {
  start = 1*event.data;
  onmessage = getEnd;
}

var end;
function getEnd(event) {
  end = 1*event.data;
  onmessage = null;
  work();
}

function work() {
  var result = 0;
  for (var i = start; i < end; i += 1) {
    // perform some complex calculation here
    result += 1;
  }
  postMessage(result);
  close();
}

They receive two numbers in two events, perform the computation for the range
of numbers thus specified, and then report the result back to the parent.

View this example online.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

2 Conformance requirements

All diagrams, examples, and notes in this specification are non-normative, as
are all sections explicitly marked non-normative. Everything else in this
specification is normative.

The key words "MUST", "MUST NOT", "REQUIRED", "SHOULD", "SHOULD NOT",
"RECOMMENDED", "MAY", and "OPTIONAL" in the normative parts of this document
are to be interpreted as described in RFC2119. For readability, these words do
not appear in all uppercase letters in this specification. [RFC2119]

Requirements phrased in the imperative as part of algorithms (such as "strip
any leading space characters" or "return false and abort these steps") are to
be interpreted with the meaning of the key word ("must", "should", "may", etc)
used in introducing the algorithm.

Some conformance requirements are phrased as requirements on attributes,
methods or objects. Such requirements are to be interpreted as requirements on
user agents.

Conformance requirements phrased as algorithms or specific steps may be
implemented in any manner, so long as the end result is equivalent. (In
particular, the algorithms defined in this specification are intended to be
easy to follow, and not intended to be performant.)

The only conformance class defined by this specification is user agents.

User agents may impose implementation-specific limits on otherwise
unconstrained inputs, e.g. to prevent denial of service attacks, to guard
against running out of memory, or to work around platform-specific limitations.

When support for a feature is disabled (e.g. as an emergency measure to
mitigate a security problem, or to aid in development, or for performance
reasons), user agents must act as if they had no support for the feature
whatsoever, and as if the feature was not mentioned in this specification. For
example, if a particular feature is accessed via an attribute in a Web IDL
interface, the attribute itself would be omitted from the objects that
implement that interface — leaving the attribute on the object but making it
return null or throw an exception is insufficient.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

2.1 Dependencies

This specification relies on several other underlying specifications.

HTML

    Many fundamental concepts from HTML are used by this specification. [HTML]

WebIDL

    The IDL blocks in this specification use the semantics of the WebIDL
    specification. [WEBIDL]

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

3 Terminology

The construction "a Foo object", where Foo is actually an interface, is
sometimes used instead of the more accurate "an object implementing the
interface Foo".

The term DOM is used to refer to the API set made available to scripts in Web
applications, and does not necessarily imply the existence of an actual
Document object or of any other Node objects as defined in the DOM Core
specifications. [DOMCORE]

An IDL attribute is said to be getting when its value is being retrieved (e.g.
by author script), and is said to be setting when a new value is assigned to
it.

The term "JavaScript" is used to refer to ECMA262, rather than the official
term ECMAScript, since the term JavaScript is more widely known. [ECMA262]

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4 Infrastructure

There are two kinds of workers; dedicated workers, and shared workers.
Dedicated workers, once created, and are linked to their creator; but message
ports can be used to communicate from a dedicated worker to multiple other
browsing contexts or workers. Shared workers, on the other hand, are named, and
once created any script running in the same origin can obtain a reference to
that worker and communicate with it.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.1 The global scope

The global scope is the "inside" of a worker.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.1.1 The WorkerGlobalScope abstract interface

interface WorkerGlobalScope {
  readonly attribute WorkerGlobalScope self;
  readonly attribute WorkerLocation location;

  void close();
           attribute Function onerror;
};
WorkerGlobalScope implements WorkerUtils;
WorkerGlobalScope implements EventTarget;

The self attribute must return the WorkerGlobalScope object itself.

The location attribute must return the WorkerLocation object created for the
WorkerGlobalScope object when the worker was created. It represents the
absolute URL of the script that was used to initialize the worker, after any
redirects.

When a script invokes the close() method on a WorkerGlobalScope object, the
user agent must run the following steps (atomically):

    Discard any tasks that have been added to the event loop's task queues.

    Set the worker's WorkerGlobalScope object's closing flag to true. (This
    prevents any further tasks from being queued.)

The following are the event handlers (and their corresponding event handler
event types) that must be supported, as IDL attributes, by objects implementing
the WorkerGlobalScope interface:

Event handler 	Event handler event type
onerror 		error

The WorkerGlobalScope interface must not exist if the interface's relevant
namespace object is a Window object. [WEBIDL]
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.1.2 Dedicated workers and the DedicatedWorkerGlobalScope interface

[Supplemental, NoInterfaceObject]
interface DedicatedWorkerGlobalScope : WorkerGlobalScope {
  void postMessage(in any message, in optional MessagePortArray ports);
           attribute Function onmessage;
};

DedicatedWorkerGlobalScope objects act as if they had an implicit MessagePort
associated with them. This port is part of a channel that is set up when the
worker is created, but it is not exposed. This object must never be garbage
collected before the DedicatedWorkerGlobalScope object.

All messages received by that port must immediately be retargeted at the
DedicatedWorkerGlobalScope object.

The postMessage() method on DedicatedWorkerGlobalScope objects must act as if,
when invoked, it immediately invoked the method of the same name on the port,
with the same arguments, and returned the same return value.

The following are the event handlers (and their corresponding event handler
event types) that must be supported, as IDL attributes, by objects implementing
the DedicatedWorkerGlobalScope interface:

Event handler 	Event handler event type
onmessage 		message

For the purposes of the application cache networking model, a dedicated worker
is an extension of the cache host from which it was created.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.1.3 Shared workers and the SharedWorkerGlobalScope interface

[Supplemental, NoInterfaceObject]
interface SharedWorkerGlobalScope : WorkerGlobalScope {
  readonly attribute DOMString name;
  readonly attribute ApplicationCache applicationCache;
           attribute Function onconnect;
};

Shared workers receive message ports through connect events on their global
object for each connection.

The name attribute must return the value it was assigned when the
SharedWorkerGlobalScope object was created by the "run a worker" algorithm. Its
value represents the name that can be used to obtain a reference to the worker
using the SharedWorker constructor.

The following are the event handlers (and their corresponding event handler
event types) that must be supported, as IDL attributes, by objects implementing
the SharedWorkerGlobalScope interface:

Event handler 	Event handler event type
onconnect 		connect

For the purposes of the application cache networking model, a shared worker is
its own cache host. The run a worker algorithm takes care of associating the
worker with an application cache.

The applicationCache attribute returns the ApplicationCache object for the
worker.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
4.2 Origins of workers

Both the origin and effective script origin of scripts running in workers are
the origin of the absolute URL given in that the worker's location attribute
represents.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.3 The event loop

Each WorkerGlobalScope object has an event loop distinct from those defined for
units of related similar-origin browsing contexts. This event loop has no
associated browsing context, and its task queues only have events, callbacks,
and networking activity as tasks. The processing model of these event loops is
defined below in the run a worker algorithm.

Each WorkerGlobalScope object also has a closing flag, which must initially be
false, but which can get set to true by the algorithms in the processing model
section below.

Once the WorkerGlobalScope's closing flag is set to true, the event loop's task
queues must discard any further tasks that would be added to them (tasks
already on the queue are unaffected except where otherwise specified).
Effectively, once the closing flag is true, timers stop firing, notifications
for all pending asynchronous operations are dropped, etc.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
4.4 The worker's lifetime

Workers communicate with other workers and with browsing contexts through
message channels and their MessagePort objects.

Each WorkerGlobalScope worker global scope has a list of the worker's ports,
which consists of all the MessagePort objects that are entangled with another
port and that have one (but only one) port owned by worker global scope. This
list includes the implicit MessagePort in the case of dedicated workers.

Each WorkerGlobalScope also has a list of the worker's workers. Initially this
list is empty; it is populated when the worker creates or obtains further
workers.

Finally, each WorkerGlobalScope also has a list of the worker's Documents.
Initially this list is empty; it is populated when the worker is created.

Whenever a Document d is added to the worker's Documents, the user agent must,
for each worker in the list of the worker's workers whose list of the worker's
Documents does not contain d, add d to q's WorkerGlobalScope owner's list of
the worker's Documents.

Whenever a Document object is discarded, it must be removed from the list of
the worker's Documents of each worker whose list contains that Document.

Given a script's global object o when creating or obtaining a worker, the list
of relevant Document objects to add depends on the type of o. If o is a
WorkerGlobalScope object (i.e. if we are creating a nested worker), then the
relevant Documents are the Documents that are in o's own list of the worker's
Documents. Otherwise, o is a Window object, and the relevant Document is just
the Document that is the active document of the Window object o.

A worker is said to be a permissible worker if its list of the worker's
Documents is not empty.

A worker is said to be a protected worker if it is a permissible worker and
either it has outstanding timers, database transactions, or network
connections, or its list of the worker's ports is not empty, or its
WorkerGlobalScope is actually a SharedWorkerGlobalScope object (i.e. the worker
is a shared worker).

A worker is said to be an active needed worker if any of the Document objects
in the worker's Documents are fully active.

A worker is said to be a suspendable worker if it is not an active needed
worker but it is a permissible worker.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.5 Processing model

When a user agent is to run a worker for a script with URL url, a browsing
context owner browsing context, a Document owner document, an origin owner
origin, and with global scope worker global scope, it must run the following
steps:

    Create a separate parallel execution environment (i.e. a separate thread or
    process or equivalent construct), and run the rest of these steps
    asynchronously in that context.
    
     If worker global scope is actually a SharedWorkerGlobalScope object (i.e.
    the worker is a shared worker), and there are any relevant application
    caches that are identified by a manifest URL with the same origin as url
    and that have url as one of their entries, not excluding entries marked as
    foreign, then associate the worker global scope with the most appropriate
    application cache of those that match.
    
     Attempt to fetch the resource identified by url, from the owner origin,
    with the synchronous flag set and the force same-origin flag set.
    
     If the attempt fails, then for each Worker or SharedWorker object
    associated with worker global scope, queue a task to fire a simple event
    named error at that object. Abort these steps.
    
     If the attempt succeeds, then let source be the script resource decoded as
    UTF-8, with error handling. [HTML]
    
     Let language be JavaScript.
    
     As with script elements, the MIME type of the script is ignored. Unlike
    with script elements, there is no way to override the type. It's always
    assumed to be JavaScript.
    
     A new script is now created, as follows.
    
     Create a new script execution environment set up as appropriate for the
    scripting language language.
    
     Parse/compile/initialize source using that script execution environment,
    as appropriate for language, and thus obtain a list of code entry-points;
    set the initial code entry-point to the entry-point for any executable code
    to be immediately run.
    
     Set the script's global object to worker global scope.
    
     Set the script's browsing context to owner browsing context.
    
     Set the script's document to owner document.
    
     Set the script's URL character encoding to UTF-8. (This is just used for
    encoding non-ASCII characters in the query component of URLs.)
    
     Set the script's base URL to url.
    
     Closing orphan workers: Start monitoring the worker such that no sooner
    than it stops being either a protected worker or a suspendable worker, and
    no later than it stops being a permissible worker, worker global scope's
    closing flag is set to true.
    
     Suspending workers: Start monitoring the worker, such that whenever worker
    global scope's closing flag is false and the worker is a suspendable
    worker, the user agent suspends execution of script in that worker until
    such time as either the closing flag switches to true or the worker stops
    being a suspendable worker.
    
     Jump to the script's initial code entry-point, and let that run until it
    either returns, fails to catch an exception, or gets prematurely aborted by
    the "kill a worker" or "terminate a worker" algorithms defined below.
    
     If worker global scope is actually a DedicatedWorkerGlobalScope object
    (i.e. the worker is a dedicated worker), then enable the port message queue
    of the worker's implicit port.
    
     Event loop: Wait until either there is a task in one of the event loop's
    task queues or worker global scope's closing flag is set to true.
    
     Run the oldest task on one of the event loop's task queues, if any. The
    user agent may pick any task queue.
    
     The handling of events or the execution of callbacks might get prematurely
    aborted by the "kill a worker" or "terminate a worker" algorithms defined
    below.
    
     If the storage mutex is now owned by the worker's event loop, release it
    so that it is once again free.
    
     Remove the task just run in the earlier step, if any, from its task queue.
    
     If there are any more events in the event loop's task queues or if worker
    global scope's closing flag is set to false, then jump back to the step
    above labeled event loop.
    
     Empty the worker global scope's list of active timeouts and its list of
    active intervals.
    
     Disentangle all the ports in the list of the worker's ports.

When a user agent is to kill a worker it must run the following steps in
parallel with the worker's main loop (the "run a worker" processing model
defined above):

    Set the worker's WorkerGlobalScope object's closing flag to true.
    
     If there are any tasks queued in the event loop's task queues, discard
    them without processing them.
    
     Wait a user-agent-defined amount of time.
    
     Abort the script currently running in the worker.

User agents may invoke the "kill a worker" processing model on a worker at any
time, e.g. in response to user requests, in response to CPU quota management,
or when a worker stops being an active needed worker if the worker continues
executing even after its closing flag was set to true.

When a user agent is to terminate a worker it must run the following steps in
parallel with the worker's main loop (the "run a worker" processing model
defined above):

    Set the worker's WorkerGlobalScope object's closing flag to true.
    
     If there are any tasks queued in the event loop's task queues, discard
    them without processing them.
    
     Abort the script currently running in the worker.
    
     If the worker's WorkerGlobalScope object is actually a
    DedicatedWorkerGlobalScope object (i.e. the worker is a dedicated worker),
    then empty the port message queue of the port that the worker's implicit
    port is entangled with.

The task source for the tasks mentioned above is the DOM manipulation task
source.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.6 Runtime script errors

Whenever an uncaught runtime script error occurs in one of the worker's
scripts, if the error did not occur while handling a previous script error, the
user agent must report the error using the WorkerGlobalScope object's onerror
attribute. [HTML]

For shared workers, if the error is still not handled afterwards, or if the
error occurred while handling a previous script error, the error may be
reported to the user. [HTML]

For dedicated workers, if the error is still not handled afterwards, or if the
error occurred while handling a previous script error, the user agent must
queue a task to fire a worker error event at the Worker object associated with
the worker.

When the user agent is to fire a worker error event at a Worker object, it must
dispatch an event that uses the ErrorEvent interface, with the name error, that
doesn't bubble and is cancelable, with its message, filename, and lineno
attributes set appropriately. The default action of this event depends on
whether the Worker object is itself in a worker. If it is, and that worker is
also a dedicated worker, then the user agent must again queue a task to fire a
worker error event at the Worker object associated with that worker. Otherwise,
then the error may be reported to the user.

The task source for the tasks mentioned above is the DOM manipulation task
source.

interface ErrorEvent : Event {
  readonly attribute DOMString message;
  readonly attribute DOMString filename;
  readonly attribute unsigned long lineno;
  void initErrorEvent(in DOMString typeArg, in boolean canBubbleArg, 
	in boolean cancelableArg, in DOMString messageArg, 
	in DOMString filenameArg, in unsigned long linenoArg);
};

The initErrorEvent() method must initialize the event in a manner analogous to
the similarly-named method in the DOM Events interfaces. [DOMEVENTS]

The message attribute represents the error message.

The filename attribute represents the absolute URL of the script in which the
error originally occurred.

The lineno attribute represents the line number where the error occurred in the
script.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.7 Creating workers
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.7.1 The AbstractWorker abstract interface

[Supplemental, NoInterfaceObject]
interface AbstractWorker {
           attribute Function onerror;

};
AbstractWorker implements EventTarget;

The following are the event handlers (and their corresponding event handler
event types) that must be supported, as IDL attributes, by objects implementing
the AbstractWorker interface:

Event handler 	Event handler event type
onerror 		error

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.7.2 Dedicated workers and the Worker interface

[Constructor(in DOMString scriptURL)]
interface Worker : AbstractWorker {
  void terminate();

  void postMessage(in any message, in optional MessagePortArray ports);
           attribute Function onmessage;
};

The terminate() method, when invoked, must cause the "terminate a worker"
algorithm to be run on the worker with with the object is associated.

Worker objects act as if they had an implicit MessagePort associated with them.
This port is part of a channel that is set up when the worker is created, but
it is not exposed. This object must never be garbage collected before the
Worker object.

All messages received by that port must immediately be retargeted at the Worker
object.

The postMessage() method on Worker objects must act as if, when invoked, it
immediately invoked the method of the same name on the port, with the same
arguments, and returned the same return value.

The following are the event handlers (and their corresponding event handler
event types) that must be supported, as IDL attributes, by objects implementing
the Worker interface:

Event handler 	Event handler event type
onmessage 		message

When the Worker(scriptURL) constructor is invoked, the user agent must run the
following steps:

    Resolve the scriptURL argument relative to the entry script's base URL,
    when the method is invoked.
    
     If this fails, throw a SYNTAX_ERR exception.
    
     If the origin of the resulting absolute URL is not the same as the origin
    of the entry script, then throw a SECURITY_ERR exception.
    
     Thus, scripts must be external files with the same scheme as the original
    page: you can't load a script from a data: URL or javascript: URL, and an
    https: page couldn't start workers using scripts with http: URLs.
    
     Create a new DedicatedWorkerGlobalScope object. Let worker global scope be
    this new object.
    
     Create a new Worker object, associated with worker global scope. Let
    worker be this new object.
    
     Create a new MessagePort object owned by the global object of the script
    that invoked the constructor. Let this be the outside port.
    
     Associate the outside port with worker.
    
     Create a new MessagePort object owned by worker global scope. Let inside
    port be this new object.
    
     Associate inside port with worker global scope.
    
     Entangle outside port and inside port.
    
     Return worker, and run the following steps asynchronously.
    
     Enable outside port's port message queue.
    
     Let docs be the list of relevant Document objects to add given the global
    object of the script that invoked the constructor.
    
     Add to worker global scope's list of the worker's Documents the Document
    objects in docs.
    
     If the global object of the script that invoked the constructor is a
    WorkerGlobalScope object (i.e. we are creating a nested worker), add worker
    global scope to the list of the worker's workers of the WorkerGlobalScope
    object that is the global object of the script that invoked the
    constructor.
    
     Run a worker for the resulting absolute URL, with the script's browsing
    context of the script that invoked the method as the owner browsing
    context, with the script's document of the script that invoked the method
    as the owner document, with the origin of the entry script as the owner
    origin, and with worker global scope as the global scope.

This constructor must be visible when the script's global object is either a
Window object or an object implementing the WorkerUtils interface.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.7.3 Shared workers and the SharedWorker interface

[Constructor(in DOMString scriptURL, in optional DOMString name)]
interface SharedWorker : AbstractWorker {
  readonly attribute MessagePort port;
};

The port attribute must return the value it was assigned by the object's
constructor. It represents the MessagePort for communicating with the shared
worker.

When the SharedWorker(scriptURL, name) constructor is invoked, the user agent
must run the following steps:

    Resolve the scriptURL argument.

    If this fails, throw a SYNTAX_ERR exception.

    Otherwise, let scriptURL be the resulting absolute URL.

    Let name be the value of the second argument, or the empty string if the
    second argument was omitted.
    
     If the origin of scriptURL is not the same as the origin of the entry
    script, then throw a SECURITY_ERR exception.
    
     Thus, scripts must be external files with the same scheme as the original
    page: you can't load a script from a data: URL or javascript: URL, and a
    https: page couldn't start workers using scripts with http: URLs.
    
     Let docs be the list of relevant Document objects to add given the global
    object of the script that invoked the constructor.

    Execute the following substeps atomically:

        Create a new SharedWorker object, which will shortly be associated with
       a SharedWorkerGlobalScope object. Let this SharedWorker object be
       worker.
       
        Create a new MessagePort object owned by the global object of the
       script that invoked the method. Let this be the outside port.
       
        Assign outside port to the port attribute of worker.
       
        Let worker global scope be null.
       
        If name is not the empty string and there exists a
       SharedWorkerGlobalScope object whose closing flag is false, whose name
       attribute is exactly equal to name, and whose location attribute
       represents an absolute URL with the same origin as scriptURL, then let
       worker global scope be that SharedWorkerGlobalScope object.
       
        Otherwise, if name is the empty string and there exists a
       SharedWorkerGlobalScope object whose closing flag is false, and whose
       location attribute represents an absolute URL that is exactly equal to
       scriptURL, then let worker global scope be that SharedWorkerGlobalScope
       object.
       
        If worker global scope is not null, then run these steps:

            If worker global scope's location attribute represents an absolute
           URL that is not exactly equal to scriptURL, then throw a
           URL_MISMATCH_ERR exception and abort all these steps.
           
            Associate worker with worker global scope.
           
            Create a new MessagePort object owned by worker global scope. Let
           this be the inside port.
           
            Entangle outside port and inside port.
           
            Return worker and perform the next step asynchronously.
           
            Create an event that uses the MessageEvent interface, with the name
           connect, which does not bubble, is not cancelable, has no default
           action, has a data attribute whose value is the empty string and has
           a ports attribute whose value is an array containing only the newly
           created port, and queue a task to dispatch the event at worker
           global scope.
           
            Add to worker global scope's list of the worker's Documents the
           Document objects in docs.
           
            If the global object of the script that invoked the constructor is
           a WorkerGlobalScope object, add worker global scope to the list of
           the worker's workers of the WorkerGlobalScope object that is the
           global object of the script that invoked the constructor.
           
            Abort all these steps.

        Create a new SharedWorkerGlobalScope object. Let worker global scope be
        this new object.
        
         Associate worker with worker global scope.
        
         Set the name attribute of worker global scope to name.
        
         Create a new MessagePort object owned by worker global scope. Let
        inside port be this new object.
        
         Entangle outside port and inside port.

    Return worker and perform the remaining steps asynchronously.
    
     Create an event that uses the MessageEvent interface, with the name
    connect, which does not bubble, is not cancelable, has no default action,
    has a data attribute whose value is the empty string and has a ports
    attribute whose value is an array containing only the newly created port,
    and queue a task to dispatch the event at worker global scope.
    
     Add to worker global scope's list of the worker's Documents the Document
    objects in docs.
    
     If the global object of the script that invoked the constructor is a
    WorkerGlobalScope object, add worker global scope to the list of the
    worker's workers of the WorkerGlobalScope object that is the global object
    of the script that invoked the constructor.
    
     Run a worker for scriptURL, with the script's browsing context of the
    script that invoked the method as the owner browsing context, with the
    script's document of the script that invoked the method as the owner
    document, with the origin of the entry script as the owner origin, and with
    worker global scope as the global scope.

This constructor must be visible when the script's global object is either a
Window object or an object implementing the WorkerUtils interface.

The task source for the tasks mentioned above is the DOM manipulation task
source.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5 APIs available to workers

[Supplemental, NoInterfaceObject]
interface WorkerUtils {
  void importScripts(in DOMString... urls);
  readonly attribute WorkerNavigator navigator;
};
WorkerUtils implements WindowTimers;

The DOM APIs (Node objects, Document objects, etc) are not available to workers
in this version of this specification.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.1 Importing scripts and libraries

When a script invokes the importScripts(urls) method on a WorkerGlobalScope
object, the user agent must run the following steps:

    If there are no arguments, return without doing anything. Abort these
    steps.

    Resolve each argument.

    If any fail, throw a SYNTAX_ERR exception.

    Attempt to fetch each resource identified by the resulting absolute URLs,
    from the entry script's origin, with the synchronous flag set.
    
     For each argument in turn, in the order given, starting with the first
    one, run these substeps:

        Wait for the fetching attempt for the corresponding resource to
        complete.
        
         If the fetching attempt failed, throw a NETWORK_ERR exception and
        abort all these steps.
        
         If the attempt succeeds, then let source be the script resource
        decoded as UTF-8, with error handling. [HTML]

        Let language be JavaScript.

        As with the worker's script, the script here is always assumed to be
        JavaScript, regardless of the MIME type.
        
         Create a script, using source as the script source and language as the
        scripting language, using the same global object, browsing context, URL
        character encoding, base URL, and script group as the script that was
        created by the worker's run a worker algorithm.
        
         Let the newly created script run until it either returns, fails to
        parse, fails to catch an exception, or gets prematurely aborted by the
        "kill a worker" or "terminate a worker" algorithms defined above.
        
         If it failed to parse, then throw an ECMAScript SyntaxError exception
        and abort all these steps. [ECMA262]
        
         If an exception was raised or if the script was prematurely aborted,
        then abort all these steps, letting the exception or aborting continue
        to be processed by the script that called the importScripts() method.
        
         If the "kill a worker" or "terminate a worker" algorithms abort the
        script then abort all these steps.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.2 The WorkerNavigator object

The navigator attribute of the WorkerUtils interface must return an instance of
the WorkerNavigator interface, which represents the identity and state of the
user agent (the client):

interface WorkerNavigator {};
WorkerNavigator implements NavigatorID;
WorkerNavigator implements NavigatorOnLine;

Objects implementing the WorkerNavigator interface also implement the
NavigatorID and NavigatorOnLine interfaces. [HTML]

This WorkerNavigator interface must not exist if the interface's relevant
namespace object is a Window object. [WEBIDL]
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.3 Interface objects and constructors

There must be no interface objects and constructors available in the global
scope of scripts whose script's global object is a WorkerGlobalScope object
except for the following:

    XMLHttpRequest and all interface objects and constructors defined by the
    XMLHttpRequest specifications, except that the document response entity
    body must always be null. The XMLHttpRequest base URL is the script's base
    URL; the XMLHttpRequest origin is the script's origin. [XHR]
    
     The interface objects and constructors defined by this specification.
    
     Constructors defined by specifications that explicitly say that they
    should be visible when the script's global object is a
    DedicatedWorkerGlobalScope, a SharedWorkerGlobalScope, or an object
    implementing the WorkerUtils interface; the interfaces of any objects with
    such constructors; and the interfaces of any objects made accessible
    through APIs exposed by those constructors or made accessible through
    interfaces to be implemented by any objects that are themselves accessible
    to scripts whose script's global object implements the WorkerUtils
    interface.

These requirements do not override the requirements defined by the Web IDL
specification, in particular concerning the visibility of interfaces annotated
with the [NoInterfaceObject] extended attribute.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.4 Worker locations

interface WorkerLocation {
  // URL decomposition IDL attributes
  readonly attribute DOMString href;
  readonly attribute DOMString protocol;
  readonly attribute DOMString host;
  readonly attribute DOMString hostname;
  readonly attribute DOMString port;
  readonly attribute DOMString pathname;
  readonly attribute DOMString search;
  readonly attribute DOMString hash;
};

A WorkerLocation object represents an absolute URL set at its creation.

The href attribute must return the absolute URL that the object represents.

The WorkerLocation interface also has the complement of URL decomposition IDL
attributes, protocol, host, port, hostname, pathname, search, and hash. These
must follow the rules given for URL decomposition IDL attributes, with the
input being the absolute URL that the object represents (same as the href
attribute), and the common setter action being a no-op, since the attributes
are defined to be readonly. [HTML]

The WorkerLocation interface must not exist if the interface's relevant
namespace object is a Window object. [WEBIDL]
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

References

All references are normative unless marked "Non-normative".

[DOMCORE]
    Web DOM Core, A. van Kesteren. W3C.
[DOMEVENTS]
    Document Object Model (DOM) Level 3 Events Specification, D. Schepers. W3C.
[ECMA262]
    ECMAScript Language Specification. ECMA.
[HTML]
    HTML, I. Hickson. WHATWG.
[RFC2119]
    Key words for use in RFCs to Indicate Requirement Levels, S. Bradner. IETF.
[WEBIDL]
    Web IDL, C. McCormack. W3C.
[XHR]
    XMLHttpRequest, A. van Kesteren. W3C.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Acknowledgements

Thanks to Aaron Boodman, Алексей Проскуряков (Alexey Proskuryakov), Anne van
Kesteren, Ben Turner, Dmitry Titov, Drew Wilson, Jeremy Orlow, Jonas Sicking,
Justin James, Kevin Hakanson, Maciej Stachowiak, Michael Nordman, Mike Smith,
and Philip Taylor for their useful and substantial comments.

Huge thanks to the whole Gears team, who pioneered this technology and whose
experience has been a huge influence on this specification.

******************************************************************************/