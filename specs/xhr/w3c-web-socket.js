/******************************************************************************
http://dev.w3.org/html5/websockets/

W3C
The WebSocket API
Editor's Draft 24 March 2011

Latest Published Version:
    http://www.w3.org/TR/websockets/
Latest Editor's Draft:
    http://dev.w3.org/html5/websockets/
Previous Versions:
    http://www.w3.org/TR/2009/WD-websockets-20090423/ 
    http://www.w3.org/TR/2009/WD-websockets-20091029/
Editor:
    Ian Hickson, Google, Inc.

Copyright © 2010 W3C® (MIT, ERCIM, Keio), All Rights Reserved. W3C liability,
trademark and document use rules apply.

The bulk of the text of this specification is also available in the WHATWG Web
Applications 1.0 specification, under a license that permits reuse of the
specification text.

Abstract

This specification defines an API that enables Web pages to use the WebSocket
protocol for two-way communication with a remote host.

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
specification is the 24 March 2011 Editor's Draft.

This specification is being developed in conjunction with an Internet Draft for
a wire protocol, the WebSocket Protocol, available from the following location:

    WebSocket Protocol Internet-Draft:
    http://www.whatwg.org/specs/web-socket-protocol/

This document was produced by a group operating under the 5 February 2004 W3C
Patent Policy. W3C maintains a public list of any patent disclosures made in
connection with the deliverables of the group; that page also includes
instructions for disclosing a patent. An individual who has actual knowledge of
a patent which the individual believes contains Essential Claim(s) must
disclose the information in accordance with section 6 of the W3C Patent Policy.

This document was produced by a group operating under the 5 February 2004 W3C
Patent Policy. W3C maintains a public list of any patent disclosures made in
connection with the deliverables of the group; that page also includes
instructions for disclosing a patent. An individual who has actual knowledge of
a patent which the individual believes contains Essential Claim(s) must
disclose the information in accordance with section 6 of the W3C Patent Policy.

Table of Contents

    1 Introduction
    2 Conformance requirements
        2.1 Dependencies
    3 Terminology
    4 The WebSocket interface
    5 Feedback from the protocol
        5.1 Event definitions
        5.2 Garbage collection
    References
    Acknowledgements

1 Introduction

This section is non-normative.

To enable Web applications to maintain bidirectional communications with
server-side processes, this specification introduces the WebSocket interface.

This interface does not allow for raw access to the underlying network. For
example, this interface could not be used to implement an IRC client without
proxying messages through a custom server.

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

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4 The WebSocket interface

[Constructor(in DOMString url, in optional DOMString protocols)]
[Constructor(in DOMString url, in optional DOMString[] protocols)]
interface WebSocket {
  readonly attribute DOMString url;

  // ready state
  const unsigned short CONNECTING = 0;
  const unsigned short OPEN = 1;
  const unsigned short CLOSING = 2;
  const unsigned short CLOSED = 3;
  readonly attribute unsigned short readyState;
  readonly attribute unsigned long bufferedAmount;

  // networking
           attribute Function onopen;
           attribute Function onmessage;
           attribute Function onerror;
           attribute Function onclose;
  readonly attribute DOMString protocol;
  void send(in DOMString data);
  void close();
};
WebSocket implements EventTarget;

The WebSocket(url, protocols) constructor takes one or two arguments. The first
argument, url, specifies the URL to which to connect. The second, protocols, if
present, is either a string or an array of strings. If it is a string, it is
equivalent to an array consisting of just that string; if it is omitted, it is
equivalent to the empty array. Each string in the array is a subprotocol name.
The connection will only be established if the server reports that it has
selected one of these subprotocols. The subprotocol names must all be non-empty
ASCII strings with no control characters and no spaces in them (i.e. only
characters in the range U+0021 to U+007E).

When the WebSocket() constructor is invoked, the UA must run these steps:

    Parse a WebSocket URL's components from the url argument, to obtain host,
    port, resource name, and secure. If this fails, throw a SYNTAX_ERR
    exception and abort these steps. [WSP]
    
     If port is a port to which the user agent is configured to block access,
    then throw a SECURITY_ERR exception. (User agents typically block access to
    well-known ports like SMTP.)
    
     Access to ports 80 and 443 should not be blocked, including the unlikely
    cases when secure is false but port is 443 or secure is true but port is
    80.
    
     If protocols is absent, let protocols be an empty array.
    
     Otherwise, if protocols is present and a string, let protocols instead be
    an array consisting of just that string.
    
     If any of the values in protocols occur more than once or contain
    characters with Unicode code points less than U+0021 or greater than U+007E
    (i.e. the space character or any characters that are not printable ASCII
    characters), then throw a SYNTAX_ERR exception and abort these steps.
    
     Let origin be the ASCII serialization of the origin of the script that
    invoked the WebSocket() constructor, converted to ASCII lowercase.
    
     Return a new WebSocket object, and continue these steps in the background
    (without blocking scripts).
    
     Establish a WebSocket connection to a host host, on port port (if one was
    specified), from origin, with the flag secure, with resource name as the
    resource name, with protocols as the (possibly empty) list of protocols,
    and with the defer cookies flag set. [WSP]
    
     If the "establish a WebSocket connection" algorithm fails, it triggers the
    "fail the WebSocket connection" algorithm, which then invokes the "close
    the WebSocket connection" algorithm, which then establishes that the
    "WebSocket connection is closed", which fires the close event as described
    below.

This constructor must be visible when the script's global object is either a
Window object or an object implementing the WorkerUtils interface.

The url attribute must return the result of resolving the URL that was passed
to the constructor. (It doesn't matter what it is resolved relative to, since
we already know it is an absolute URL.)

The readyState attribute represents the state of the connection. It can have
the following values:

CONNECTING (numeric value 0)
    The connection has not yet been established.
OPEN (numeric value 1)
    The WebSocket connection is established and communication is possible.
CLOSING (numeric value 2)
    The connection is going through the closing handshake.
CLOSED (numeric value 3)
    The connection has been closed or could not be opened.

When the object is created its readyState must be set to CONNECTING (0).

The protocol attribute must initially return the empty string. After the
WebSocket connection is established, its value might change, as defined below.

The protocol attribute returns the subprotocol selected by the server, if any.
It can be used in conjunction with the array form of the constructor's second
argument to perform subprotocol negotiation.

The send(data) method transmits data using the connection. If the readyState
attribute is CONNECTING, it must raise an INVALID_STATE_ERR exception.
Otherwise, if the data argument has any unpaired surrogates, then it must raise
SYNTAX_ERR. If the connection is established, and the string has no unpaired
surrogates, and the WebSocket closing handshake has not yet started, then the
user agent must send data using the WebSocket; if the data cannot be sent, e.g.
because it would need to be buffered but the buffer is full, the user agent
must close the WebSocket connection. Any invokation of this method that does
not raise an exception must increase the bufferedAmount attribute by the number
of bytes needed to express the argument as UTF-8. [WSP]

The close() method must run the first matching steps from the following list:

If the readyState attribute is in the CLOSING (2) or CLOSED (3) state

    Do nothing.

    The connection is already closing or is already closed. If it has not
    already, a close event will eventually fire as described below.

If the WebSocket connection is not yet established [WSP]

    Fail the WebSocket connection and set the readyState attribute's value to
    CLOSING (2). [WSP]
    
     The "fail the WebSocket connection" algorithm invokes the "close the
    WebSocket connection" algorithm, which then establishes that the "WebSocket
    connection is closed", which fires the close event as described below.

If the WebSocket closing handshake has not yet been started [WSP]

    Start the WebSocket closing handshake and set the readyState attribute's
    value to CLOSING (2). [WSP]
    
     The "start the WebSocket closing handshake" algorithm eventually invokes
    the "close the WebSocket connection" algorithm, which then establishes that
    the "WebSocket connection is closed", which fires the close event as
    described below.

Otherwise

    Set the readyState attribute's value to CLOSING (2).
    
     The WebSocket closing handshake has started, and will eventually invokethe
    "close the WebSocket connection" algorithm, which will establish that the
    "WebSocket connection is closed", and thus the close event will fire, as
    described below.

The bufferedAmount attribute must return the number of bytes of UTF-8 text that
have been queued using send() but that, as of the last time the event loop
started executing a task, had not yet been transmitted to the network. (This
thus includes any text sent during the execution of the current task,
regardless of whether the user agent is able to transmit text asynchronously
with script execution.) This does not include framing overhead incurred by the
protocol, or buffering done by the operating system or network hardware. If the
connection is closed, this attribute's value will only increase with each call
to the send() method (the number does not reset to zero once the connection
closes).

In this simple example, the bufferedAmount attribute is used to ensure that
updates are sent either at the rate of one update every 50ms, if the network
can handle that rate, or at whatever rate the network can handle, if that is
too fast.

var socket = new WebSocket('ws://game.example.com:12010/updates');
socket.onopen = function () {
  setInterval(function() {
    if (socket.bufferedAmount == 0)
      socket.send(getUpdateData());
  }, 50);
};

The bufferedAmount attribute can also be used to saturate the network without
sending the data at a higher rate than the network can handle, though this
requires more careful monitoring of the value of the attribute over time.

The following are the event handlers that must be supported, as IDL attributes,
by all objects implementing the WebSocket interface:

Event handler 	Event handler event type
onopen 	open
onmessage 	message
onerror 	error
onclose 	close

5 Feedback from the protocol

When the WebSocket connection is established, the user agent must queue a task
to first change the readyState attribute's value to OPEN (1); apply the cookies
that were collected in the list of cookies when the connection was established;
change the protocol attribute's value to the selected WebSocket subprotocol, if
there is one; and then fire a simple event named open at the WebSocket object.
[WSP]

When a WebSocket message has been received with text data, the user agent must
create an event that uses the MessageEvent interface, with the event name
message, which does not bubble, is not cancelable, has no default action, and
whose data attribute is set to data, and queue a task to check to see if the
readyState attribute's value is OPEN (1) or CLOSING (2), and if so, dispatch
the event at the WebSocket object. [WSP]

When a WebSocket error has been detected, the user agent must queue a task to
check to see if the readyState attribute's value is OPEN (1) or CLOSING (2),
and if so, fire a simple event named error at the WebSocket object. [WSP]

When the WebSocket closing handshake has started, the user agent must queue a
task to change the readyState attribute's value to CLOSING (2). (If the close()
method was called, the readyState attribute's value will already be set to
CLOSING (2) when this task runs.) [WSP]

When the WebSocket connection is closed, possibly cleanly, the user agent must
create an event that uses the CloseEvent interface, with the event name close,
which does not bubble, is not cancelable, has no default action, whose wasClean
attribute is set to true if the connection closed cleanly and false otherwise,
whose code attribute is set to the WebSocket connection close code, and whose
reason attribute is set to the WebSocket connection close reason; and queue a
task to first change the readyState attribute's value to CLOSED (3), and then
dispatch the event at the WebSocket object. [WSP]

The task source for all tasks queued in this section is the WebSocket task
source.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.1 Event definitions

interface CloseEvent : Event {
  readonly attribute boolean wasClean;
  readonly attribute unsigned long code;
  readonly attribute DOMString reason;
  void initCloseEvent(in DOMString typeArg, in boolean canBubbleArg, in boolean
  cancelableArg, in boolean wasCleanArg, in unsigned long codeArg, in unsigned
  long reasonArg);
};

The initCloseEvent() method must initialize the event in a manner analogous to
the similarly-named method in the DOM Events interfaces. [DOMEVENTS]

The wasClean attribute represents whether the connection closed cleanly or not.

The code attribute represents the WebSocket connection close code provided by
the server.

The reason attribute represents the WebSocket connection close reason provided
by the server.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.2 Garbage collection

A WebSocket object whose readyState attribute's value was set to CONNECTING (0)
as of the last time the event loop started executing a task must not be garbage
collected if there are any event listeners registered for open events, message
events, error events, or close events.

A WebSocket object whose readyState attribute's value was set to OPEN (1) or
CLOSING (2) as of the last time the event loop started executing a task must
not be garbage collected if there are any event listeners registered for
message events, error events, or close events.

A WebSocket object with an established connection that has data queued to be
transmitted to the network must not be garbage collected. [WSP]

If a WebSocket object is garbage collected while its connection is still open,
the user agent must close the WebSocket connection. [WSP]

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

References

All references are normative unless marked "Non-normative".

[COOKIES]
    HTTP State Management Mechanism, A. Barth. IETF.
[DOMCORE]
    Web DOM Core, A. van Kesteren. W3C.
[DOMEVENTS]
    Document Object Model (DOM) Level 3 Events Specification, D. Schepers. W3C.
[HTML]
    HTML, I. Hickson. WHATWG.
[RFC2119]
    Key words for use in RFCs to Indicate Requirement Levels, S. Bradner. IETF.
[RFC3629]
    UTF-8, a transformation format of ISO 10646, F. Yergeau. IETF.
[WEBIDL]
    Web IDL, C. McCormack. W3C.
[WSP]
    The WebSocket protocol, I. Fette. IETF.

Acknowledgements

For a full list of acknowledgements, please see the HTML specification. [HTML]

******************************************************************************/