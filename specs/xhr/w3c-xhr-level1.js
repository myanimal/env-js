/******************************************************************************
http://www.w3.org/TR/XMLHttpRequest/

W3C
XMLHttpRequest
W3C Candidate Recommendation 3 August 2010

This Version:
    http://www.w3.org/TR/2010/CR-XMLHttpRequest-20100803/ 
Latest Version:
    http://www.w3.org/TR/XMLHttpRequest/ 
Latest Editor Version:
    http://dev.w3.org/2006/webapi/XMLHttpRequest/ 
Previous Versions:
    http://www.w3.org/TR/2009/WD-XMLHttpRequest-20091119/ 
    http://www.w3.org/TR/2009/WD-XMLHttpRequest-20090820/ 
    http://www.w3.org/TR/2008/WD-XMLHttpRequest-20080415/ 
    http://www.w3.org/TR/2007/WD-XMLHttpRequest-20071026/ 
    http://www.w3.org/TR/2007/WD-XMLHttpRequest-20070618/ 
    http://www.w3.org/TR/2007/WD-XMLHttpRequest-20070227/ 
    http://www.w3.org/TR/2006/WD-XMLHttpRequest-20060927/ 
    http://www.w3.org/TR/2006/WD-XMLHttpRequest-20060619/ 
    http://www.w3.org/TR/2006/WD-XMLHttpRequest-20060405/ 
Editor:
    Anne van Kesteren (Opera Software ASA) <annevk@opera.com> 

Copyright © 2009 W3C® (MIT, ERCIM, Keio), All Rights Reserved. W3C liability,
trademark and document use rules apply.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Abstract

The XMLHttpRequest specification defines an API that provides scripted client
functionality for transferring data between a client and a server.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Status of this Document

This section describes the status of this document at the time of its
publication. Other documents may supersede this document. A list of current W3C
publications and the latest revision of this technical report can be found in
the W3C technical reports index at http://www.w3.org/TR/.

This is the 3 August 2010 W3C Candidate Recommendation of XMLHttpRequest.
Please send comments to public-webapps@w3.org (archived) with [XHR] at the
start of the subject line.

For the last Last Call Working Draft the Working Group has kept a disposition
of comments document. A list of changes is available via a Web view of CVS.
(Due to the way the document is edited certain commit messages have introduced
negligible changes to this document and are in fact only relevant for
XMLHttpRequest Level 2.)

This document is produced by the Web Applications (WebApps) Working Group. The
WebApps Working Group is part of the Rich Web Clients Activity in the W3C
Interaction Domain.

This document was produced by a group operating under the 5 February 2004 W3C
Patent Policy. W3C maintains a public list of any patent disclosures made in
connection with the deliverables of the group; that page also includes
instructions for disclosing a patent. An individual who has actual knowledge of
a patent which the individual believes contains Essential Claim(s) must
disclose the information in accordance with section 6 of the W3C Patent Policy.

Publication as a W3C Candidate Recommendation does not imply endorsement by the
W3C Membership. This is a draft document and may be updated, replaced or
obsoleted by other documents at any time. It is inappropriate to cite this
document as other than work in progress.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Candidate Recommendation Exit Criteria

To exit the Candidate Recommendation (CR) stage the following criteria must
have been met:

    There will be at least two interoperable implementations passing all test
    cases in the test suite for this specification. An implementation is to be
    available (i.e. for download), shipping (i.e. not private), and not
    experimental (i.e. intended for a wide audience). The working group will
    decide when the test suite is of sufficient quality to test
    interoperability and will produce implementation reports (hosted together
    with the test suite).

    A minimum of six months of the CR stage will have elapsed (i.e. not until
    after 3 February 2011). This is to ensure that enough time is given for any
    remaining major errors to be caught. The CR period will be extended if
    implementations are slow to appear.

    Text, which can be in a separate document, exists that explains the
    security considerations for this specification. This may be done in a
    generic manner as they are most likely applicable to various APIs. The
    working group will decide whether the text is of sufficient quality.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Table of Contents

    1. Introduction
    2. Conformance Criteria
        2.1. Dependencies
        2.2. Terminology
        2.3. Extensibility 
    3. The XMLHttpRequest Interface
        3.1. Origin and Base URL
        3.2. Task Sources
        3.3. Constructors
        3.4. Event Handler Attributes
        3.5. States
        3.6. Request
            3.6.1. The open() method
            3.6.2. The setRequestHeader() method
            3.6.3. The send() method
            3.6.4. Infrastructure for the send() method
            3.6.5. The abort() method 
        3.7. Response
            3.7.1. The status attribute
            3.7.2. The statusText attribute
            3.7.3. The getResponseHeader() method
            3.7.4. The getAllResponseHeaders() method
            3.7.5. Response Entity Body
            3.7.6. The responseText attribute
            3.7.7. The responseXML attribute 
    4. Exceptions
    References
    Acknowledgments 

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

1. Introduction

This section is non-normative.

The XMLHttpRequest object implements an interface exposed by a scripting engine
that allows scripts to perform HTTP client functionality, such as submitting
form data or loading data from a server. It is the ECMAScript HTTP API.

The name of the object is XMLHttpRequest for compatibility with the Web, though
each component of this name is potentially misleading. First, the object
supports any text based format, including XML. Second, it can be used to make
requests over both HTTP and HTTPS (some implementations support protocols in
addition to HTTP and HTTPS, but that functionality is not covered by this
specification). Finally, it supports "requests" in a broad sense of the term as
it pertains to HTTP; namely all activity involved with HTTP requests or
responses for the defined HTTP methods.

Some simple code to do something with data from an XML document fetched over
the network:

function test(data) {
 // taking care of data
}

function handler() {
 if(this.readyState == 4 && this.status == 200) {
  // so far so good
  if(this.responseXML != null && this.responseXML.getElementById('test').firstChild.data)
     // success!
   test(this.responseXML.getElementById('test').firstChild.data);
  else
   test(null);
 } else if (this.readyState == 4 && this.status != 200) {
  // fetched the wrong page or network error...
  test(null);
 }
}

var client = new XMLHttpRequest();
client.onreadystatechange = handler;
client.open("GET", "unicorn.xml");
client.send();

If you just want to log a message to the server:

function log(message) {
 var client = new XMLHttpRequest();
 client.open("POST", "/log");
 client.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
 client.send(message);
}

Or if you want to check the status of a document on the server:

function fetchStatus(address) {
 var client = new XMLHttpRequest();
 client.onreadystatechange = function() {
  // in case of network errors this might not give reliable results
  if(this.readyState == 4)
   returnStatus(this.status);
 }
 client.open("HEAD", address);
 client.send();
}

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

2. Conformance Criteria

Everything in this specification is normative except for diagrams, examples,
notes and sections marked non-normative.

The key words must, must not, should, should not, and may in this document are
to be interpreted as described in RFC 2119. [RFC2119]

This specification defines the following classes of products:

Conforming user agent

    A user agent must behave as described in this specification in order to be
    considered conformant.
    
     If the user agent is not a conforming XML user agent the XML response
    entity body must (always) be null.
    
     User agents may implement algorithms given in this specification in any
    way desired, so long as the end result is indistinguishable from the result
    that would be obtained by the specification's algorithms.
    
     This specification uses both the terms "conforming user agent(s)" and
    "user agent(s)" to refer to this product class.

Conforming XML user agent

    An XML user agent must be a conforming user agent and must be a conforming
    XML processor that reports violations of namespace well-formedness. [XML]

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

2.1. Dependencies

This specification relies on several underlying specifications.

DOM

    A conforming user agent must support at least the subset of the
    functionality defined in DOM Events and DOM Core that this specification
    relies upon, such as various exceptions and EventTarget. [DOM2Events]
    [DOM3Core]

HTML5

    A conforming user agent must support at least the subset of the
    functionality defined in HTML5 that this specification relies upon, such as
    the basics of the Window object and serializing a Document object. [HTML5]
    
    The Window Object 1.0 draft is not referenced normatively as it appears to
    be no longer maintained and HTML5 defines the Window object in more detail.
    This specification already depends on HTML5 for other reasons so there is
    not much additional overhead because of this.

HTTP

    A conforming user agent must support some version of the HTTP protocol.
    Requirements regarding HTTP are made throughout the specification.
    [RFC2616]

Web IDL

    A conforming user agent must also be a conforming implementation of the IDL
    fragments in this specification, as described in the Web IDL specification.
    [WebIDL]

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

2.2. Terminology

Convert a DOMString to a sequence of Unicode characters is defined by the Web
IDL specification. [WebIDL]

The term user credentials for the purposes of this specification means cookies,
HTTP authentication, and client-side SSL certificates. Specifically it does not
refer to proxy authentication or the Origin header. [COOKIES]

The terms and algorithms <fragment>, <scheme>, cookie-free Document object,
document base URL, document's character encoding, event handler attributes,
event handler event type, fetch, fully active, Function, innerHTML, origin,
preferred MIME name, resolve a URL, same origin, storage mutex, task, task
source, task queues, URL, URL character encoding, queue a task, and valid MIME
type are defined by the HTML5 specification. [HTML5]

The term entity body is used as described in RFC 2616. Method token is used as
described in section 5.1.1 of RFC 2616. field-name and field-value are used as
described in section 4.2 of RFC 2616. [RFC2616]

To deflate a DOMString into a byte sequence means to create a sequence of bytes
such that the nth byte of the sequence is equal to the low-order byte of the
nth code point in the original DOMString.

To inflate a byte sequence into a DOMString means to create a DOMString such
that the nth code point has 0x00 as the high-order byte and the nth byte of the
byte sequence as the low-order byte.

userinfo is used as described in section 3.2.1 of RFC 3986. [RFC3986]

To dispatch a readystatechange event means that an event with the name
readystatechange, which does not bubble and is not cancelable, and which uses
the Event interface, is to be dispatched at the XMLHttpRequest object.

2.3. Extensibility

User agents, Working Groups, and other interested parties are strongly
encouraged to discuss extensions on a relevant public forum, preferably
public-webapps@w3.org. If this is for some reason not possible prefix the
extension in some way and start the prefix with an uppercase letter. E.g. if
company Foo wants to add a private method bar() it could be named FooBar() to
prevent clashes with a potential future standardized bar().

3. The XMLHttpRequest Interface

The XMLHttpRequest object can be used by scripts to programmatically connect to
their originating server via HTTP.

[NoInterfaceObject]
interface XMLHttpRequestEventTarget : EventTarget {
  // for future use
};

[Constructor]
interface XMLHttpRequest : XMLHttpRequestEventTarget {
  // event handler attributes
           attribute Function onreadystatechange;

  // states
  const unsigned short UNSENT = 0;
  const unsigned short OPENED = 1;
  const unsigned short HEADERS_RECEIVED = 2;
  const unsigned short LOADING = 3;
  const unsigned short DONE = 4;
  readonly attribute unsigned short readyState;

  // request
  void open(DOMString method, DOMString url);
  void open(DOMString method, DOMString url, boolean async);
  void open(DOMString method, DOMString url, boolean async, DOMString? user);
  void open(DOMString method, DOMString url, boolean async, DOMString? user, DOMString? password);
  void setRequestHeader(DOMString header, DOMString value);
  void send();
  void send(Document data);
  void send([AllowAny] DOMString? data);
  void abort();

  // response
  readonly attribute unsigned short status;
  readonly attribute DOMString statusText;
  DOMString getResponseHeader(DOMString header);
  DOMString getAllResponseHeaders();
  readonly attribute DOMString responseText;
  readonly attribute Document responseXML;
};

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

3.1. Origin and Base URL

Each XMLHttpRequest object has an associated XMLHttpRequest origin and an
XMLHttpRequest base URL.

This specification defines their values when the global object is represented
by the Window object. When the XMLHttpRequest object is used in other contexts
their values will have to be defined as appropriate for that context. That is
considered to be out of scope for this specification.

In environments where the global object is represented by the Window object the
XMLHttpRequest object has an associated XMLHttpRequest Document which is the
Document object associated with the Window object for which the XMLHttpRequest
interface object was created.

The XMLHttpRequest Document is used to determine the XMLHttpRequest origin and
XMLHttpRequest base URL at a later stage.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

3.2. Task Sources

The task source used by this specification is the XMLHttpRequest task source.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

3.3. Constructors

client = new XMLHttpRequest()
    Returns a new XMLHttpRequest object. 

When the XMLHttpRequest() constructor is invoked, the user agent must return a
new XMLHttpRequest object.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

3.4. Event Handler Attributes

The following is the event handler attribute (and its corresponding event
handler event type) that must be supported as DOM attribute by the
XMLHttpRequest object:

event handler attribute 	event handler event type
onreadystatechange 	 		readystatechange

3.5. States

client . readyState

    Returns the current state. 

The XMLHttpRequest object can be in several states. The readyState attribute
must return the current state, which must be one of the following values:

UNSENT (numeric value 0)

    The object has been constructed. 

OPENED (numeric value 1)

    The open() method has been successfully invoked. During this state request
    headers can be set using setRequestHeader() and the request can be made
    using the send() method.

HEADERS_RECEIVED (numeric value 2)

    All redirects (if any) have been followed and all HTTP headers of the final
    response have been received. Several response members of the object are now
    available.

LOADING (numeric value 3)

    The response entity body is being received. 

DONE (numeric value 4)

    The data transfer has been completed or something went wrong during the
    transfer (e.g. infinite redirects).

The OPENED state has an associated send() flag that indicates whether the
send() method has been invoked. It can be either true or false and has an
initial value of false.

The DONE state has an associated error flag that indicates some type of network
error or abortion. It can be either true or false and has an initial value of
false.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

3.6. Request

The XMLHttpRequest object holds the following request metadata variables:

The asynchronous flag
    True when fetching is done asychronously. False when fetching is done
    synchronously.
The request method
    The method used in the request. 
The request URL
    The URL used in the request. 
The request username
    The username used in the request or null if there is no username. 
The request password
    The password used in the request or null if there is no password. 
The author request headers
    A list consisting of HTTP header name/value pairs to be used in the
    request.
The request entity body
    The entity body used in the request. 

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

3.6.1. The open() method

client . open(method, url, async, user, password)

    Sets the request method, request URL, asynchronous flag, request username,
    and request password.

    Throws a SYNTAX_ERR exception if one of the following is true:

        method is not a valid HTTP method.
        url cannot be resolved.
        url contains the "user:password" format in the userinfo production. 

    Throws a SECURITY_ERR exception if method is a case-insensitive match for
    CONNECT, TRACE or TRACK.
    
     Throws a SECURITY_ERR exception if the origin of url does not match the
    XMLHttpRequest origin.
    
     Throws a NOT_SUPPORTED_ERR exception if the <scheme> of url is not
    supported.

When the open(method, url, async, user, password) method is invoked, the user
agent must run these steps (unless otherwise indicated):

    If the XMLHttpRequest object has an associated XMLHttpRequest Document run
    these substeps:

        If the XMLHttpRequest Document is not fully active raise an
        INVALID_STATE_ERR exception and terminate the overall set of steps.
        
         Let XMLHttpRequest base URL be the document base URL of the
        XMLHttpRequest Document.
        
         Let XMLHttpRequest origin be the origin of the XMLHttpRequest
        Document.

    If any code point in method is higher than U+00FF LATIN SMALL LETTER Y WITH
    DIAERESIS or after deflating method it does not match the Method token
    production raise a SYNTAX_ERR exception and terminate these steps.
    Otherwise let method be the result of deflating method.
    
     If method is a case-insensitive match for CONNECT, DELETE, GET, HEAD,
    OPTIONS, POST, PUT, TRACE, or TRACK subtract 0x20 from each byte in the
    range 0x61 (ASCII a) to 0x7A (ASCII z).
    
     If it does not match any of the above, it is passed through literally,
    including in the final request.
    
     If method is a case-sensitive match for CONNECT, TRACE, or TRACK raise a
    SECURITY_ERR exception and terminate these steps.

    Allowing these methods poses a security risk. [HTTPVERBSEC]

    Let url be a URL.

    Let URL character encoding of url be UTF-8.

    Resolve url relative to the XMLHttpRequest base URL. If the algorithm
    returns an error raise a SYNTAX_ERR exception and terminate these steps.

    Drop <fragment> from url.

    If url contains an unsupported <scheme> raise a NOT_SUPPORTED_ERR and
    terminate these steps.
    
     If the "user:password" format in the userinfo production is not supported
    for the relevant scheme and url contains this format raise a SYNTAX_ERR and
    terminate these steps.
    
     If url contains the "user:password" format let temp user be the user part
    and temp password be the password part.
    
     If url just contains the "user" format let temp user be the user part.
    
     If the origin of url is not same origin with the XMLHttpRequest origin
    raise a SECURITY_ERR exception and terminate these steps.

    Let async be the value of the async argument or true if it was omitted.

    If the user argument was not omitted follow these sub steps:

        If user is null let temp user be null.

        Otherwise let temp user be user. 

    These steps override anything that may have been set by the url argument.

    If the password argument was not omitted follow these sub steps:

        If password is null let temp password be null.

        Otherwise let temp password be password. 

    These steps override anything that may have been set by the url argument.

    Abort the send() algorithm.

    The user agent should cancel any network activity for which the object is
    responsible.
    
     If there are any tasks from the object's XMLHttpRequest task source in one
    of the task queues, then remove those tasks.

    Set variables associated with the object as follows:

        Set the send() flag to false.

        Set response entity body to null.

        Empty the list of author request headers.

        Set the request method to method.

        Set the request URL to url.

        Set the request username to temp user.

        Set the request password to temp password.

        Set the asynchronous flag to the value of async. 

    Switch the the state to OPENED.

    Dispatch a readystatechange event. 

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

3.6.2. The setRequestHeader() method

client . setRequestHeader(header, value)

    Appends an header to the list of author request headers or if the header is
    already in the author request headers its value appended to.
    
     Throws an INVALID_STATE_ERR exception if the state is not OPENED or if the
    send() flag is true.
    
     Throws a SYNTAX_ERR exception if header is not a valid HTTP header field
    name or if value is not a valid HTTP header field value.

As indicated in the algorithm below certain headers cannot be set and are left
up to the user agent. In addition there are certain other headers the user
agent will take control of if they are not set by the author as indicated at
the end of the send() method section.

When the setRequestHeader(header, value) method is invoked, the user agent must
run these steps:

    If the state is not OPENED raise an INVALID_STATE_ERR exception and
    terminate these steps.
    
    If the send() flag is true raise an INVALID_STATE_ERR exception and
    terminate these steps.
    
    If any code point in header is higher than U+00FF LATIN SMALL LETTER Y
    WITH DIAERESIS or after deflating header it does not match the field-name
    production raise a SYNTAX_ERR exception and terminate these steps.
    Otherwise let header be the result of deflating header.
    
    If any code point in value is higher than U+00FF LATIN SMALL LETTER Y WITH
    DIAERESIS or after deflating value it does not match the field-value
    production raise a SYNTAX_ERR exception and terminate these steps.
    Otherwise let value be the result of deflating value.
    
    The empty string is legal and represents the empty header value.
    
    Terminate these steps if header is a case-insensitive match for one of the
    following headers:
        Accept-Charset
        Accept-Encoding
        Connection
        Content-Length
        Cookie
        Cookie2
        Content-Transfer-Encoding
        Date
        Expect
        Host
        Keep-Alive
        Referer
        TE
        Trailer
        Transfer-Encoding
        Upgrade
        User-Agent
        Via 

    … or if the start of header is a case-insensitive match for Proxy- or Sec-
    (including when header is just Proxy- or Sec-).
    
     The above headers are controlled by the user agent to let it control those
    aspects of transport. This guarantees data integrity to some extent. Header
    names starting with Sec- are not allowed to be set to allow new headers to
    be minted that are guaranteed not to come from XMLHttpRequest.
    
     If header is not in the author request headers list append header with its
    associated value to the list and terminate these steps.
    
     If header is in the author request headers list either use multiple
    headers, combine the values or use a combination of those (section 4.2, RFC
    2616). [RFC2616]

See also the send() method regarding user agent header handling for caching,
authentication, proxies, and cookies.

// The following script:
var client = new XMLHttpRequest();
client.open('GET', 'demo.cgi');
client.setRequestHeader('X-Test', 'one');
client.setRequestHeader('X-Test', 'two');
client.send();

// ...would result in the following header being sent:
...
X-Test: one, two
...

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

3.6.3. The send() method

client . send(data)

    Initiates the request. The optional argument provides the request entity
    body. The argument is ignored if request method is GET or HEAD.
    
     Throws an INVALID_STATE_ERR exception if the state is not OPENED or if the
    send() flag is true.

When the send(data) method is invoked, the user agent must run the following
steps (unless otherwise noted). This algorithm gets aborted when the open() or
abort() method is invoked. When the send() algorithm is aborted the user agent
must terminate the algorithm after finishing the step it is on.

The send() algorithm can only be aborted when the asynchronous flag is true and
only after the method call has returned.

    If the state is not OPENED raise an INVALID_STATE_ERR exception and
    terminate these steps.
    
     If the send() flag is true raise an INVALID_STATE_ERR exception and
    terminate these steps.
    
     If the request method is a case-sensitive match for GET or HEAD act as if
    data is null.
    
     If the data argument has been omitted or is null, do not include a request
    entity body and go to the next step.
    
     Otherwise, let encoding be null, mime type be null, and then follow these
    rules:

    If data is a Document

        Let encoding be the preferred MIME name of the character encoding of
        data. If encoding is UTF-16 change it to UTF-8.
        
         Let mime type be "application/xml;charset=" followed by encoding.
        
         Let the request entity body be the result of getting the innerHTML
        attribute on data converted to Unicode and encoded as encoding.
        Re-raise any exception this raises.
        
         In particular, if the document cannot be serialized an
        INVALID_STATE_ERR exception is raised.
        
         Subsequent changes to the Document have no effect on what is
        submitted.
    If data is a DOMString

        Let encoding be UTF-8.

        Let mime type be "text/plain;charset=UTF-8".

        Let the request entity body be data converted to Unicode and encoded as
        UTF-8.

    If a Content-Type header is set using setRequestHeader() whose value is a
    valid MIME type and has a charset parameter whose value is not a
    case-insensitive match for encoding, and encoding is not null, set all the
    charset parameters of the Content-Type header to encoding.
    
     If no Content-Type header has been set using setRequestHeader() and mime
    type is not null set a Content-Type request header with as value mime type.

    If the asynchronous flag is false release the storage mutex.

    Set the error flag to false.

    If the asynchronous flag is true run these substeps:

        Set the send() flag to true.

        Dispatch a readystatechange event.

        The state does not change. The event is dispatched for historical
        reasons.
        
         Return the send() method call, but continue running the steps in this
        algorithm.

    Fetch the request URL from origin XMLHttpRequest origin, with the
    synchronous flag set if the asynchronous flag is false, using HTTP method
    request method, user request username (if non-null) and password request
    password (if non-null), taking into account the request entity body, list
    of author request headers and the rules listed at the end of this section.

    If the asynchronous flag is false

        While making the request also follow the same-origin request event
        rules.
        
         The send() method call will now be returned by virtue of this
        algorithm ending.

    If the asynchronous flag is true

        Make progress notifications.

        Make upload progress notifications.

        While processing the request, as data becomes available and when the
        user interferes with the request, queue tasks to update the response
        entity body and follow the same-origin request event rules.

If the user agent allows the end user to configure a proxy it should modify the
request appropriately; i.e., connect to the proxy host instead of the origin
server, modify the Request-Line and send Proxy-Authorization headers as
specified.

If the user agent supports HTTP Authentication and Authorization is not in the
list of author request headers, it should consider requests originating from
the XMLHttpRequest object to be part of the protection space that includes the
accessed URIs and send Authorization headers and handle 401 Unauthorized
requests appropriately.

If authentication fails, Authorization is not in the list of author request
headers, request username is null, and request password is null, user agents
should prompt the end user for their username and password.

If authentication fails, Authorization is not in the list of author request
headers, request username is non-null, and request password is non-null, user
agents must not prompt the end user for their username and password. [RFC2617]

End users are not prompted if username/password are provided through the open()
API so that authors can implement their own user interface.

If the user agent supports HTTP State Management it should persist, discard and
send cookies (as received in the Set-Cookie and Set-Cookie2 response headers,
and sent in the Cookie header) as applicable. [COOKIES]

If the user agent implements a HTTP cache it should respect Cache-Control
request headers set by the setRequestHeader() (e.g., Cache-Control: no-cache
bypasses the cache). It must not send Cache-Control or Pragma request headers
automatically unless the end user explicitly requests such behavior (e.g. by
reloading the page).

For 304 Not Modified responses that are a result of a user agent generated
conditional request the user agent must act as if the server gave a 200 OK
response with the appropriate content. The user agent must allow
setRequestHeader() to override automatic cache validation by setting request
headers (e.g. If-None-Match or If-Modified-Since), in which case 304 Not
Modified responses must be passed through. [RFC2616]

If the user agent implements server-driven content-negotiation it should set
Accept-Encoding and Accept-Charset headers as appropriate. For Accept and
Accept-Language the user agent must follow these constraints:

    Both headers must not be modified if they are already set through
    setRequestHeader().
    
     If not set through setRequestHeader() Accept-Language should be set as
    appropriate.
    
     If not set through setRequestHeader() Accept must be set with as value
    *\/*.

Responses must have the content-encodings automatically decoded. [RFC2616]

Besides the author request headers user agents should not include additional
request headers other than those mentioned above or other than those authors
are not allowed to set using setRequestHeader(). This ensures that authors have
a reasonably predictable API.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

3.6.4. Infrastructure for the send() method

The same-origin request event rules are as follows:

If the response has an HTTP status code of 301, 302, 303, or 307

    If the origin of the URL conveyed by the Location header is same origin
    with the XMLHttpRequest origin and the redirect does not violate infinite
    loop precautions, transparently follow the redirect while observing the
    same-origin request event rules.

    Otherwise, this is a network error.

    HTTP places requirements on the user agent regarding the preservation of
    the request method and request entity body during redirects, and also
    requires end users to be notified of certain kinds of automatic
    redirections.

If the end user cancels the request

    This is an abort error. 

If there is a network error

    In case of DNS errors, TLS negotiation failure, or other type of network
    errors, this is a network error. Do not request any kind of end user
    interaction.

    This does not include HTTP responses that indicate some type of error, such
    as HTTP status code 410.

Once all HTTP headers have been received and the asynchronous flag is true (and
this is not an HTTP redirect)

    Switch to the HEADERS_RECEIVED state. 

Once the first byte (or more) of the response entity body has been received and
the asynchronous flag is true

If there is no response entity body and the asynchronous flag is true

    Switch to the LOADING state. 

Once the whole response entity body has been received

If there is no response entity body and the asynchronous flag is false or the
state is LOADING

    Switch to the DONE state. 

When something is said to be a network error run the request error steps for
exception NETWORK_ERR.

When something is said to be an abort error run the request error steps for
exception ABORT_ERR.

When something is said to be a request error for exception exception run these
steps:

    The user agent should cancel any network activity for which the object is
    responsible.
    
    If there are any tasks from the object's XMLHttpRequest task source in one
    of the task queues, then remove those tasks.

    Set the response entity body to null.

    Empty the list of author request headers.

    Set the the error flag to true.

    Switch the state to DONE.

    If the asynchronous flag is false raise an exception exception and
    terminate the overall set of steps.

    Dispatch a readystatechange event.

    At this point it is clear that the asynchronous flag is true.

    Terminate the overall algorithm. 

A future version of this specification will dispatch an error/abort event here
as well. (Depending on the type of error.)

When it is said to switch to the HEADERS_RECEIVED state run these steps:

    Switch the state to HEADERS_RECEIVED.

    Dispatch a readystatechange event. 

When it is said to switch to the LOADING state run these steps:

    Switch the state to LOADING.

    Dispatch a readystatechange event. 

When it is said to switch to the DONE state run these steps:

    If the asynchronous flag is false update the response entity body.

    Switch the state to DONE.

    Dispatch a readystatechange event. 

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
3.6.5. The abort() method

client . abort()
    Cancels any network activity. 

When the abort() method is invoked, the user agent must run these steps (unless
otherwise noted):

    Abort the send() algorithm.

    The user agent should cancel any network activity for which the object is
    responsible.

    If there are any tasks from the object's XMLHttpRequest task source in one
    of the task queues, then remove those tasks.

    Set the response entity body to null.

    Empty the list of author request headers.

    Set the error flag to true.

    If the state is UNSENT, OPENED with the send() flag being false, or DONE go
    to the next step.

    Otherwise run these substeps:

        Switch the state to DONE.

        Set the send() flag to false.

        Dispatch a readystatechange event. 

    A future version of this specification will dispatch an abort event here.

    Switch the state to UNSENT.

    No readystatechange event is dispatched.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

3.7. Response
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

3.7.1. The status attribute

client . status

    Returns the HTTP status code. 

The status attribute must return the result of running these steps:

    If the state is UNSENT or OPENED return 0 and terminate these steps.

    If the error flag is true return 0 and terminate these steps.

    Return the HTTP status code. 

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

3.7.2. The statusText attribute

client . statusText

    Returns the HTTP status text. 

The statusText attribute must return the result of running these steps:

    If the state is UNSENT or OPENED return the empty string and terminate
    these steps.

    If the error flag is true return the empty string and terminate these
    steps.

    Return the HTTP status text. 

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

3.7.3. The getResponseHeader() method

client . getResponseHeader(header)

    Returns the header field value from the response of which the field name
    matches header, unless the field name is Set-Cookie or Set-Cookie2.

When the getResponseHeader(header) is invoked, the user agent must run these
steps:

    If the state is UNSENT or OPENED return null and terminate these steps.

    If the error flag is true return null and terminate these steps.

    If any code point in header is higher than U+00FF LATIN SMALL LETTER Y WITH
    DIAERESIS return null and terminate these steps.

    Let header be the result of deflating header.

    If header is a case-insensitive match for Set-Cookie or Set-Cookie2 return
    null and terminate these steps.
    
     If header is a case-insensitive match for multiple HTTP response headers,
    return the inflated values of these headers as a single concatenated string
    separated from each other by a U+002C COMMA U+0020 SPACE character pair and
    terminate these steps.
    
     If header is a case-insensitive match for a single HTTP response header,
    return the inflated value of that header and terminate these steps.

    Return null. 

For the following script:

var client = new XMLHttpRequest();
client.open("GET", "unicorns-are-teh-awesome.txt", true);
client.send();
client.onreadystatechange = function() {
  if(this.readyState == 2) {
    print(client.getResponseHeader("Content-Type"));
  }
}

The print() function will get to process something like:

text/plain; charset=UTF-8

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

3.7.4. The getAllResponseHeaders() method

client . getAllResponseHeaders()

    Returns all headers from the response, with the exception of those whose
    field name is Set-Cookie or Set-Cookie2.

When the getAllResponseHeaders() method is invoked, the user agent must run the
following steps:

    If the state is UNSENT or OPENED return the empty string and terminate
    these steps.
    
     If the error flag is true return the empty string and terminate these
    steps.
    
     Return all the HTTP headers, excluding headers that are a case-insensitive
    match for Set-Cookie or Set-Cookie2, inflated, as a single string, with
    each header line separated by a U+000D CR U+000A LF pair, excluding the
    status line, and with each header name and header value separated by a
    U+003A COLON U+0020 SPACE pair.

For the following script:

var client = new XMLHttpRequest();
client.open("GET", "narwhals-too.txt", true);
client.send();
client.onreadystatechange = function() {
 if(this.readyState == 2) {
  print(this.getAllResponseHeaders());
 }
}

The print() function will get to process something like:

Date: Sun, 24 Oct 2004 04:58:38 GMT
Server: Apache/1.3.31 (Unix)
Keep-Alive: timeout=15, max=99
Connection: Keep-Alive
Transfer-Encoding: chunked
Content-Type: text/plain; charset=utf-8

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

3.7.5. Response Entity Body

The response MIME type is the MIME type the Content-Type header contains
without any parameters or null if the header could not be parsed properly or
was omitted. The override MIME type is always null. Final MIME type is the
override MIME type unless that is null in which case it is the response MIME
type.

The response charset is the value of the charset parameter of the Content-Type
header or null if there was no charset parameter or if the header could not be
parsed properly or was omitted. The override charset is always null. Final
charset is the override charset unless that is null in which case it is the
response charset.

Override MIME type and override charset are introduced here solely to make
editing several levels of XMLHttpRequest simultaneously somewhat easier.
Apologies for any confusion they might cause.

The response entity body is the fragment of the entity body of the response
received so far (LOADING) or the complete entity body of the response (DONE).
If the response does not have an entity body the response entity body is null.

The response entity body is updated as part of the send() algorithm.

The text response entity body is a DOMString representing the response entity
body. The text response entity body is the return value of the following
algorithm:

    If the response entity body is null return the empty string and terminate
    these steps.
    
     Let charset be the final charset.
    
     Let mime be the final MIME type.
    
     If charset is null and mime is null, text/xml, application/xml or ends in
    +xml use the rules set forth in the XML specifications to determine the
    character encoding. Let charset be the determined character encoding.
    
     If charset is null and mime is text/html follow the rules set forth in the
    HTML specification to determine the character encoding. Let charset be the
    determined character encoding. [HTML5]
    
     If charset is null then, for each of the rows in the following table,
    starting with the first one and going down, if the first bytes of bytes
    match the bytes given in the first column, then let charset be the encoding
    given in the cell in the second column of that row. If there is no match
    charset remains null.

    Bytes in Hexadecimal 	Description
    FE FF 					UTF-16BE BOM
    FF FE 					UTF-16LE BOM
    EF BB BF 				UTF-8 BOM

    If charset is null let charset be UTF-8.

    Return the result of decoding the response entity body using charset. Replace bytes or sequences of bytes that are not valid accordng to the charset with a single U+FFFD REPLACEMENT CHARACTER character. 

Authors are strongly encouraged to encode their resources using UTF-8.

The document response entity body is either a Document representing the
response entity body or null. The document response entity body is the return
value of the following algorithm:

    If the response entity body is null terminate these steps and return null.
    
     If final MIME type is not null, text/xml, application/xml, and does not
    end in +xml terminate these steps and return null.
    
     Let document be a cookie-free Document object that represents the result
    of parsing the response entity body into a document tree following the
    rules from the XML specifications. If this fails (unsupported character
    encoding, namespace well-formedness error et cetera) terminate these steps
    return null. [XML]
    
     Scripts in the resulting document tree will not be executed, resources
    referenced will not be loaded and no associated XSLT will be applied.

    Return document. 

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

3.7.6. The responseText attribute

client . responseText

    Returns the text response entity body. 

The responseText attribute must return the result of running these steps:

    If the state is not LOADING or DONE return the empty string and terminate
    these steps.

    Return the text response entity body. 

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
3.7.7. The responseXML attribute

client . responseXML

    Returns the document response entity body. 

The responseXML attribute must return the result of running these steps:

    If the state is not DONE return null and terminate these steps.

    Return the document response entity body.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4. Exceptions

Several algorithms in this specification may result in an exception being
thrown. These exceptions are all part of the group ExceptionCode and use the
DOMException object, which is defined in DOM Level 3 Core. In addition this
specification extends the ExceptionCode group with several new constants as
indicated below. [DOM3Core]

Thus, exceptions used by this specification and not defined in this section are
defined by DOM Level 3 Core.

const unsigned short SECURITY_ERR = 18;
const unsigned short NETWORK_ERR = 19;
const unsigned short ABORT_ERR = 20;

The SECURITY_ERR exception is raised if an attempt is made to perform an
operation or access some data in a way that would be a security risk or a
violation of the user agent's security policy.

The NETWORK_ERR exception is raised when a network error occurs in synchronous
requests.

The ABORT_ERR exception is raised when the user aborts a request in synchronous
requests.

These exceptions will be folded into an update of DOM Level 3 Core in due
course, as they are appropriate for other API specifications as well.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

References

Unless marked "Non-normative" these references are normative.

[COOKIES]
    HTTP State Management Mechanism (work in progress), A. Barth. IETF. 
[DOM2Events]
    Document Object Model (DOM) Level 2 Events Specification, T. Pixley. W3C. 
[DOM3Core]
    Document Object Model (DOM) Level 3 Core Specification, A. Le Hors, P. Le
    Hégaret, L. Wood, G. Nicol, J. Robie, M. Champion, S. Byrne. W3C.
[ECMAScript]
    ECMAScript Language Specification. ECMA. 
[HTML5]
    HTML5 (work in progress), I. Hickson. W3C. 
    HTML5 (work in progress), I. Hickson. WHATWG. 
[HTTPVERBSEC]
    (Non-normative) Multiple vendors' web servers enable HTTP TRACE method by
    default, US-CERT.
    (Non-normative) Microsoft Internet Information Server (IIS) vulnerable to
    cross-site scripting via HTTP TRACK method, US-CERT.
    (Non-normative) HTTP proxy default configurations allow arbitrary TCP
    connections, US-CERT.
[RFC2046]
    Multipurpose Internet Mail Extensions (MIME) Part Two: Media Types, N.
    Freed, N. Borenstein. IETF.
[RFC2119]
    Key words for use in RFCs to Indicate Requirement Levels, S. Bradner. IETF.
[RFC2616]
    Hypertext Transfer Protocol -- HTTP/1.1, R. Fielding, J. Gettys, J. Mogul,
    H. Frystyk, L. Masinter, P. Leach, T. Berners-Lee. IETF.
[RFC2617]
    HTTP Authentication: Basic and Digest Access Authentication, P.
    Hallam-Baker, J. Hostetler, S. Lawrence, P. Leach, A. Luotonen, L. Stewart.
    IETF.
[RFC3986]
    Uniform Resource Identifier (URI): Generic Syntax, T. Berners-Lee, R.
    Fielding, L. Masinter. IETF. [RFC3987]
    Internationalized Resource Identifiers (IRIs), M. Duerst, M. Suignard. IETF. 
[WebIDL]
    Web IDL (work in progress), C. McCormack. W3C.
[XML]
    Extensible Markup Language (XML) 1.0, T. Bray, J. Paoli, C.
    Sperberg-McQueen, E. Maler, F. Yergeau. W3C.
    Namespaces in XML, T. Bray, D. Hollander, A. Layman, R. Tobin, H. S.
    Thompson. W3C.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Acknowledgments

The editor would like to thank Addison Phillips, Ahmed Kamel, Alex Hopmann,
Alex Vincent, Alexey Proskuryakov, Asbjørn Ulsberg, Boris Zbarsky, Björn
Höhrmann, Cameron McCormack, Christophe Jolif, Charles McCathieNevile, Dan
Winship, David Andersson, David Håsäther, David Levin, Dean Jackson, Denis
Sureau, Doug Schepers, Douglas Livingstone, Elliotte Harold, Eric Lawrence,
Erik Dahlström, Geoffrey Sneddon, Gideon Cohn, Gorm Haug Eriksen, Håkon Wium
Lie, Hallvord R. M. Steen, Huub Schaeks, Ian Davis, Ian Hickson, Ivan Herman,
Jeff Walden, Jens Lindström, Jim Deegan, Jim Ley, Joe Farro, Jonas Sicking,
Julian Reschke, Karl Dubost, Lachlan Hunt, Maciej Stachowiak, Magnus
Kristiansen, Marc Hadley, Marcos Caceres, Mark Baker, Mark Birbeck, Mark
Nottingham, Mark S. Miller, Martin Hassman, Mohamed Zergaoui, Olli Pettay,
Pawel Glowacki, Peter Michaux, Philip Taylor, Robin Berjon, Rune Halvorsen,
Ruud Steltenpool, Simon Pieters, Stewart Brodie, Sunava Dutta, Thomas Roessler,
Tom Magliery, and Zhenbin Xu for their contributions to this specification.

Special thanks to the Microsoft employees who first implemented the
XMLHttpRequest interface, which was first widely deployed by the Windows
Internet Explorer browser.

Special thanks also to the WHATWG for drafting an initial version of this
specification in their Web Applications 1.0 document (now renamed to HTML5).
[HTML5]

Thanks also to all those who have helped to improve this specification by
sending suggestions and corrections. (Please, keep bugging us with your
issues!)
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

******************************************************************************/