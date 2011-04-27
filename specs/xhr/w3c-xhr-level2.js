/******************************************************************************
http://dev.w3.org/2006/webapi/XMLHttpRequest-2/

W3C
XMLHttpRequest Level 2
Editor's Draft 4 March 2011

This Version:
    http://www.w3.org/TR/2011/ED-XMLHttpRequest2-20110304/ 
Latest Version:
    http://www.w3.org/TR/XMLHttpRequest2/ 
Latest Editor Version:
    http://dev.w3.org/2006/webapi/XMLHttpRequest-2/ 
Previous Versions:
    http://www.w3.org/TR/2010/WD-XMLHttpRequest2-20100907/ 
    http://www.w3.org/TR/2009/WD-XMLHttpRequest2-20090820/ 
    http://www.w3.org/TR/2008/WD-XMLHttpRequest2-20080930/ 
    http://www.w3.org/TR/2008/WD-XMLHttpRequest2-20080225/ 
Editor:
    Anne van Kesteren (Opera Software ASA) <annevk@opera.com> 

Copyright © 2010 W3C® (MIT, ERCIM, Keio), All Rights Reserved. W3C liability,
trademark and document use rules apply.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Abstract

The XMLHttpRequest Level 2 specification enhances the XMLHttpRequest object
with new features, such as cross-origin requests, progress events, and the
handling of byte streams for both sending and receiving.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Status of this Document

This section describes the status of this document at the time of its
publication. Other documents may supersede this document. A list of current
W3C publications and the latest revision of this technical report can be
found in the W3C technical reports index at http://www.w3.org/TR/.

This is the 4 March 2011 Editor's Draft of XMLHttpRequest Level 2. Please
send comments to public-webapps@w3.org (archived) with [XHR2] at the start
of the subject line.

This document is produced by the Web Applications (WebApps) Working Group.
The WebApps Working Group is part of the Rich Web Clients Activity in the
W3C Interaction Domain.

This document was produced by a group operating under the 5 February 2004
W3C Patent Policy. W3C maintains a public list of any patent disclosures
made in connection with the deliverables of the group; that page also
includes instructions for disclosing a patent. An individual who has actual
knowledge of a patent which the individual believes contains Essential
Claim(s) must disclose the information in accordance with section 6 of the
W3C Patent Policy.

Publication as a Working Draft does not imply endorsement by the W3C
Membership. This is a draft document and may be updated, replaced or
obsoleted by other documents at any time. It is inappropriate to cite this
document as other than work in progress.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Table of Contents

    1. Introduction
    2. Conformance
        2.1. Dependencies
        2.2. Extensibility 
    3. Terminology
    4. The XMLHttpRequest Interface
        4.1. Origin and Base URL
        4.2. Task Sources
        4.3. Constructors
        4.4. Event Handler Attributes
        4.5. States
        4.6. Request
            4.6.1. The open() method
            4.6.2. The setRequestHeader() method
            4.6.3. The timeout attribute
            4.6.4. The withCredentials attribute
            4.6.5. The upload attribute
            4.6.6. The send() method
            4.6.7. Infrastructure for the send() method
            4.6.8. The abort() method 
        4.7. Response
            4.7.1. The status attribute
            4.7.2. The statusText attribute
            4.7.3. The getResponseHeader() method
            4.7.4. The getAllResponseHeaders() method
            4.7.5. Response Entity Body
            4.7.6. The overrideMimeType() method
            4.7.7. The responseType attribute
            4.7.8. The response attribute
            4.7.9. The responseText attribute
            4.7.10. The responseXML attribute 
        4.8. Events summary 
    5. The FormData Interface
        5.1. Constructors
        5.2. The append() method 
    Differences from XMLHttpRequest
    References
    Acknowledgments 

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

1. Introduction

This section is non-normative.

The XMLHttpRequest object implements an interface exposed by a scripting
engine that allows scripts to perform HTTP client functionality, such as
submitting form data or loading data from a server. It is the ECMAScript
HTTP API.

The name of the object is XMLHttpRequest for compatibility with the Web,
though each component of this name is potentially misleading. First, the
object supports any text based format, including XML. Second, it can be
used to make requests over both HTTP and HTTPS (some implementations
support protocols in addition to HTTP and HTTPS, but that functionality is
not covered by this specification). Finally, it supports "requests" in a
broad sense of the term as it pertains to HTTP; namely all activity
involved with HTTP requests or responses for the defined HTTP methods.

Some simple code to do something with data from an XML document fetched
over the network:

function processData(data) {
  // taking care of data
}

function handler() {
  if(this.readyState == this.DONE) {
    if(this.status == 200 &&
       this.responseXML != null &&
       this.responseXML.getElementById('test').textContent) {
      // success!
      processData(this.responseXML.getElementById('test').textContent);
      return;
    }
    // something went wrong
    processData(null);
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
    if(this.readyState == this.DONE)
      returnStatus(this.status);
  }
  client.open("HEAD", address);
  client.send();
}

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

2. Conformance

Everything in this specification is normative except for diagrams,
examples, notes and sections marked non-normative.

The key words must, must not, should, should not, and may in this document
are to be interpreted as described in RFC 2119. [RFC2119]

This specification defines a single conformance class:

Conforming user agent

    A user agent must behave as described in this specification in order to
    be considered conformant.
    
     User agents may implement algorithms given in this specification in
    any way desired, so long as the end result is indistinguishable from
    the result that would be obtained by the specification's algorithms.
    
     This specification uses both the terms "conforming user agent(s)" and
    "user agent(s)" to refer to this product class.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

2.1. Dependencies

This specification relies on several underlying specifications.

Cross-Origin Resource Sharing

    A conforming user agent must support the algorithms of the Cross-Origin
    Resource Sharing specification. [CORS]

DOM Core

    A conforming user agent must support at least the subset of the
    functionality defined in DOM Core that this specification relies upon,
    such as various exceptions and EventTarget. [DOMCore]

File API

    A conforming user agent must support at least the subset of the
    functionality defined in File API that this specification relies upon,
    such as the Blob and File interfaces. [FileAPI]

HTML

    A conforming user agent must support at least the subset of the
    functionality defined in HTML that this specification relies upon, such
    as the basics of the Window object and serializing a Document object.
    [HTML]

HTTP

    A conforming user agent must support some version of the HTTP protocol.
    Requirements regarding HTTP are made throughout the specification.
    [RFC2616]

Web IDL

    A conforming user agent must also be a conforming implementation of the
    IDL fragments in this specification, as described in the Web IDL
    specification. [WebIDL]

XML

    A conforming user agent must be a conforming XML processor that reports
    violations of namespace well-formedness. [XML]

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

2.2. Extensibility

User agents, Working Groups, and other interested parties are strongly
encouraged to discuss extensions on a relevant public forum, preferably
public-webapps@w3.org. If this is for some reason not possible prefix the
extension in some way and start the prefix with an uppercase letter. E.g.
if company Foo wants to add a private method bar() it could be named
FooBar() to prevent clashes with a potential future standardized bar().

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

3. Terminology

Convert a DOMString to a sequence of Unicode characters is defined by the
Web IDL specification. [WebIDL]

The term user credentials for the purposes of this specification means
cookies, HTTP authentication, and client-side SSL certificates.
Specifically it does not refer to proxy authentication or the Origin
header. [COOKIES]

The exceptions INVALID_STATE_ERR, SYNTAX_ERR, INVALID_ACCESS_ERR,
SECURITY_ERR, NETWORK_ERR, ABORT_ERR, and TIMEOUT_ERR are defined in DOM
Core. [DOMCore]

The terms and algorithms Document, EventTarget, and fire an event named e
are defined in DOM Core. [DOMCore]

The terms and algorithms <fragment>, <scheme>, constructing the form data
set, document base URL, document's character encoding, event handler
attributes, event handler event type, fetch, fully active, Function, HTML
documents, HTMLFormElement, innerHTML, multipart/form-data boundary string,
multipart/form-data encoding algorithm, origin, preferred MIME name,
resolve a URL, same origin, storage mutex, task, task source, task queues,
URL, URL character encoding, queue a task, valid MIME type, and Window are
defined by the HTML specification. [HTML]

The term entity body is used as described in RFC 2616. Method token is used
as described in section 5.1.1 of RFC 2616. field-name and field-value are
used as described in section 4.2 of RFC 2616. [RFC2616]

To deflate a DOMString into a byte sequence means to create a sequence of
bytes such that the nth byte of the sequence is equal to the low-order byte
of the nth code point in the original DOMString.

To inflate a byte sequence into a DOMString means to create a DOMString
such that the nth code point has 0x00 as the high-order byte and the nth
byte of the byte sequence as the low-order byte.

userinfo is used as described in section 3.2.1 of RFC 3986. [RFC3986]

To fire a progress event named e is defined in the Progress Events
specification. [PE]

The terms cross-origin request and cross-origin request status are defined
by the Cross-Origin Resource Sharing specification. [CORS]

The ArrayBuffer interface is defined in the Typed Array specification.
[TypedArray]

The Blob and File interfaces are defined by the File API specification.
[FileAPI]

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4. The XMLHttpRequest Interface

The XMLHttpRequest object can be used by scripts to issue HTTP requests.

[NoInterfaceObject]
interface XMLHttpRequestEventTarget : EventTarget {
  // event handler attributes
           attribute Function onloadstart;
           attribute Function onprogress;
           attribute Function onabort;
           attribute Function onerror;
           attribute Function onload;
           attribute Function ontimeout;
           attribute Function onloadend;
};

interface XMLHttpRequestUpload : XMLHttpRequestEventTarget {

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
           attribute unsigned long timeout;
           attribute boolean withCredentials;
  readonly attribute XMLHttpRequestUpload upload;
  void send();
  void send(ArrayBuffer data);
  void send(Blob data);
  void send(Document data);
  void send([AllowAny] DOMString? data);
  void send(FormData data);
  void abort();

  // response
  readonly attribute unsigned short status;
  readonly attribute DOMString statusText;
  DOMString getResponseHeader(DOMString header);
  DOMString getAllResponseHeaders();
  void overrideMimeType(DOMString mime);
           attribute DOMString responseType;
  readonly attribute any response;
  readonly attribute DOMString responseText;
  readonly attribute Document responseXML;
};

[Constructor]
interface AnonXMLHttpRequest : XMLHttpRequest {
};

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.1. Origin and Base URL

Each XMLHttpRequest object has an associated XMLHttpRequest origin and an
XMLHttpRequest base URL.

This specification defines their values when the global object is
represented by the Window object. When the XMLHttpRequest object is used in
other contexts their values will have to be defined as appropriate for that
context. That is considered to be out of scope for this specification.

In environments where the global object is represented by the Window object
the XMLHttpRequest object has an associated XMLHttpRequest Document which
is the Document object associated with the Window object for which the
XMLHttpRequest interface object was created.

The XMLHttpRequest Document is used to determine the XMLHttpRequest origin
and XMLHttpRequest base URL at a later stage.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.2. Task Sources

The task source used by this specification is the XMLHttpRequest task
source.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.3. Constructors

The XMLHttpRequest object has an associated anonymous flag. When set to
true user credentials and the XMLHttpRequest origin are not exposed when
fetching resources. It is false by default and can only be set to true by
using the AnonXMLHttpRequest() constructor.

client = new XMLHttpRequest()
    Returns a new XMLHttpRequest object. 
client = new AnonXMLHttpRequest()
    Returns a new AnonXMLHttpRequest object that has the anonymous flag set to true. 

When the XMLHttpRequest() constructor is invoked, the user agent must
return a new XMLHttpRequest object.

When the AnonXMLHttpRequest() constructor is invoked, the user agent must
return a new AnonXMLHttpRequest object with its anonymous flag set to true.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.4. Event Handler Attributes

The following are the event handler attributes (and their corresponding
event handler event types) that must be supported on objects implementing
an interface that inherits from XMLHttpRequestEventTarget as DOM
attributes:

event handler attribute 	event handler event type
onloadstart 				loadstart
onprogress 					progress
onabort 					abort
onerror 					error
onload 						load
ontimeout 					timeout
onloadend 					loadend

The following is the event handler attribute (and its corresponding event
handler event type) that must be supported as DOM attribute solely by the
XMLHttpRequest object:

event handler attribute 	event handler event type
onreadystatechange 			readystatechange

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.5. States

client . readyState

    Returns the current state. 

The XMLHttpRequest object can be in several states. The readyState attribute must return the current state, which must be one of the following values:

UNSENT (numeric value 0)

    The object has been constructed. 
OPENED (numeric value 1)

    The open() method has been successfully invoked. During this state request headers can be set using setRequestHeader() and the request can be made using the send() method. 
HEADERS_RECEIVED (numeric value 2)

    All redirects (if any) have been followed and all HTTP headers of the final response have been received. Several response members of the object are now available. 
LOADING (numeric value 3)

    The response entity body is being received. 
DONE (numeric value 4)

    The data transfer has been completed or something went wrong during the transfer (e.g. infinite redirects). 

The OPENED state has an associated send() flag that indicates whether the send() method has been invoked. It can be either true or false and has an initial value of false.

The error flag indicates some type of network error or abortion. It is used during the DONE state. It can be either true or false and has an initial value of false.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.6. Request

The XMLHttpRequest object holds the following request metadata variables:

The asynchronous flag
    True when fetching is done asychronously. False when fetching is done synchronously. 
The request method
    The HTTP method used in the request. 
The request URL
    The resolved URL used in the request. 
The request username
    The username used in the request or null if there is no username. 
The request password
    The password used in the request or null if there is no password. 
The author request headers
    A list consisting of HTTP header name/value pairs to be used in the request. 
The request entity body
    The entity body used in the request or null if there is no entity body. 
The upload complete flag
    Used to determine when to stop sending upload progress events. The flag is either true or false. 
The upload events flag
    Used to determine whether to send upload progress events for cross-origin requests. The flag is either true or false. 

The XMLHttpRequest object also has an associated XMLHttpRequestUpload object.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.6.1. The open() method

client . open(method, url, async, user, password)

    Sets the request method, request URL, asynchronous flag, request username, and request password.

    Throws a SYNTAX_ERR exception if one of the following is true:

        method is not a valid HTTP method.
        url cannot be resolved.
        url contains the "user:password" format in the userinfo production. 

    Throws a SECURITY_ERR exception if method is a case-insensitive match for CONNECT, TRACE or TRACK.

    Throws an INVALID_ACCESS_ERR exception if either user or password is passed as argument and the origin of url does not match the XMLHttpRequest origin.

When the open(method, url, async, user, password) method is invoked, the user agent must run these steps (unless otherwise indicated):

    If the XMLHttpRequest object has an associated XMLHttpRequest Document run these substeps:

        If the XMLHttpRequest Document is not fully active raise an INVALID_STATE_ERR exception and terminate the overall set of steps.

        Let XMLHttpRequest base URL be the document base URL of the XMLHttpRequest Document.

        Let XMLHttpRequest origin be the origin of the XMLHttpRequest Document if the anonymous flag is false and let it be a globally unique identifier if the anonymous flag is true. 

    If any code point in method is higher than U+00FF LATIN SMALL LETTER Y WITH DIAERESIS or after deflating method it does not match the Method token production raise a SYNTAX_ERR exception and terminate these steps. Otherwise let method be the result of deflating method.

    If method is a case-insensitive match for CONNECT, DELETE, GET, HEAD, OPTIONS, POST, PUT, TRACE, or TRACK subtract 0x20 from each byte in the range 0x61 (ASCII a) to 0x7A (ASCII z).

    If it does not match any of the above, it is passed through literally, including in the final request.

    If method is a case-sensitive match for CONNECT, TRACE, or TRACK raise a SECURITY_ERR exception and terminate these steps.

    Allowing these methods poses a security risk. [HTTPVERBSEC]

    Let url be a URL.

    Let URL character encoding of url be UTF-8.

    Resolve url relative to the XMLHttpRequest base URL. If the algorithm returns an error raise a SYNTAX_ERR exception and terminate these steps.

    Drop <fragment> from url.

    If the "user:password" format in the userinfo production is not supported for the relevant <scheme> and url contains this format raise a SYNTAX_ERR and terminate these steps.

    If url contains the "user:password" format let temp user be the user part and temp password be the password part.

    If url just contains the "user" format let temp user be the user part.

    Let async be the value of the async argument or true if it was omitted.

    If the user argument was not omitted follow these sub steps:

        If user is not null and the origin of url is not same origin with the XMLHttpRequest origin raise an INVALID_ACCESS_ERR exception and terminate the overall set of steps.

        Let temp user be user. 

    These steps override anything that may have been set by the url argument.

    If the password argument was not omitted follow these sub steps:

        If password is not null and the origin of url is not same origin with the XMLHttpRequest origin raise an INVALID_ACCESS_ERR exception and terminate the overall set of steps.

        Let temp password be password. 

    These steps override anything that may have been set by the url argument.

    Terminate the abort() algorithm.

    Terminate the send() algorithm.

    The user agent should cancel any network activity for which the object is responsible.

    If there are any tasks from the object's XMLHttpRequest task source in one of the task queues, then remove those tasks.

    Set variables associated with the object as follows:

        Set the request method to method.

        Set the request URL to url.

        Set the asynchronous flag to the value of async.

        Set the request username to temp user.

        Set the request password to temp password.

        Empty the list of author request headers.

        Set the timeout attribute's value to zero.

        Set the withCredentials attribute's value to false.

        Set the responseType attribute's value to the empty string.

        Set the send() flag to false.

        Set response entity body to null. 

    Switch the state to OPENED.

    Fire an event named readystatechange. 

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.6.2. The setRequestHeader() method

client . setRequestHeader(header, value)

    Appends an header to the list of author request headers, or if header is already in the list of author request headers, combines its value with value.

    Throws an INVALID_STATE_ERR exception if the state is not OPENED or if the send() flag is true.

    Throws a SYNTAX_ERR exception if header is not a valid HTTP header field name or if value is not a valid HTTP header field value.

As indicated in the algorithm below certain headers cannot be set and are left up to the user agent. In addition there are certain other headers the user agent will take control of if they are not set by the author as indicated at the end of the send() method section.

For non same origin requests using the HTTP GET method a preflight request is made when headers other than Accept and Accept-Language are set.

When the setRequestHeader(header, value) method is invoked, the user agent must run these steps:

    If the state is not OPENED raise an INVALID_STATE_ERR exception and terminate these steps.

    If the send() flag is true raise an INVALID_STATE_ERR exception and terminate these steps.

    If any code point in header is higher than U+00FF LATIN SMALL LETTER Y WITH DIAERESIS or after deflating header it does not match the field-name production raise a SYNTAX_ERR exception and terminate these steps. Otherwise let header be the result of deflating header.

    If any code point in value is higher than U+00FF LATIN SMALL LETTER Y WITH DIAERESIS or after deflating value it does not match the field-value production raise a SYNTAX_ERR exception and terminate these steps. Otherwise let value be the result of deflating value.

    The empty string is legal and represents the empty header value.

    Terminate these steps if header is a case-insensitive match for one of the following headers:
        Accept-Charset
        Accept-Encoding
        Access-Control-Request-Headers
        Access-Control-Request-Method
        Connection
        Content-Length
        Cookie
        Cookie2
        Content-Transfer-Encoding
        Date
        Expect
        Host
        Keep-Alive
        Origin
        Referer
        TE
        Trailer
        Transfer-Encoding
        Upgrade
        User-Agent
        Via 

    … or if the start of header is a case-insensitive match for Proxy- or Sec- (including when header is just Proxy- or Sec-).

    The above headers are controlled by the user agent to let it control those aspects of transport. This guarantees data integrity to some extent. Header names starting with Sec- are not allowed to be set to allow new headers to be minted that are guaranteed not to come from XMLHttpRequest.

    If header is not in the author request headers list append header with its associated value to the list and terminate these steps.

    If header is in the author request headers list either use multiple headers, combine the values or use a combination of those (section 4.2, RFC 2616). [RFC2616]

See also the send() method regarding user agent header handling for caching, authentication, proxies, and cookies.

Some simple code demonstrating what happens when setting the same header twice:

// The following script:
var client = new XMLHttpRequest();
client.open('GET', 'demo.cgi');
client.setRequestHeader('X-Test', 'one');
client.setRequestHeader('X-Test', 'two');
client.send();

// …results in the following header being sent:
X-Test: one, two

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.6.3. The timeout attribute

client . timeout

    The amount of milliseconds a request can take before being terminated. Initially zero. Zero means there is no timeout.

    When set: throws an INVALID_STATE_ERR exception if the state is not OPENED or if the send() flag is true.

On setting the timeout attribute these steps must be run:

    If the state is not OPENED raise an INVALID_STATE_ERR exception and terminate these steps.

    If the send() flag is true raise an INVALID_STATE_ERR exception and terminate these steps.

    Set timeout attribute's value to the given value. 

On getting, the timeout attribute must return its value.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.6.4. The withCredentials attribute

client . withCredentials

    True when user credentials are to be included in a cross-origin request. False when they are to be excluded in a cross-origin request and when cookies are to be ignored in its response. Initially false. 

When set: throws an INVALID_STATE_ERR exception if the state is not OPENED or if the send() flag is true.

When set: throws an INVALID_ACCESS_ERR exception if the anonymous flag is true.

On setting the withCredentials attribute these steps must be run:

    If the state is not OPENED raise an INVALID_STATE_ERR exception and terminate these steps.

    If the send() flag is true raise an INVALID_STATE_ERR exception and terminate these steps.

    If the anonymous flag is true raise an INVALID_ACCESS_ERR exception and terminate these steps.

    Set the withCredentials attribute's value to the given value. 

On getting the withCredentials attribute it must return its value.

The withCredentials attribute has no effect when fetching same-origin resources.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.6.5. The upload attribute

client . upload

    Returns the associated XMLHttpRequestUpload object. 

The upload attribute must return the associated XMLHttpRequestUpload object.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.6.6. The send() method

client . send(data)

    Initiates the request. The optional argument provides the request entity body. The argument is ignored if request method is GET or HEAD.

    Throws an INVALID_STATE_ERR exception if the state is not OPENED or if the send() flag is true.

When the send(data) method is invoked, the user agent must run these steps (unless otherwise noted). This algorithm can be terminated by invoking the open() or abort() method. When it is terminated the user agent must terminate the algorithm after finishing the step it is on.

The send() algorithm can only be terminated when the asynchronous flag is true and only after the method call has returned.

    If the state is not OPENED raise an INVALID_STATE_ERR exception and terminate these steps.

    If the send() flag is true raise an INVALID_STATE_ERR exception and terminate these steps.

    If the request method is a case-sensitive match for GET or HEAD act as if data is null.

    If the data argument has been omitted or is null, do not include a request entity body and go to the next step.

    Otherwise, let encoding be null, mime type be null, and then follow these rules:

    If data is a ArrayBuffer

        Let the request entity body be the raw data represented by data. 
    If data is a Blob

        If the object's type attribute is not the empty string let mime type be its value.

        Let the request entity body be the raw data represented by data.
    If data is a Document

        Let encoding be the preferred MIME name of the character encoding of data. If encoding is UTF-16 change it to UTF-8.

        Let mime type be "application/xml" or "text/html" if Document is flagged as HTML document, followed by ";charset=", followed by encoding.

        Let the request entity body be the result of getting the innerHTML attribute on data converted to Unicode and encoded as encoding. Re-raise any exception this raises.

        In particular, if the document cannot be serialized an INVALID_STATE_ERR exception is raised.

        Subsequent changes to the Document have no effect on what is submitted.
    If data is a DOMString

        Let encoding be UTF-8.

        Let mime type be "text/plain;charset=UTF-8".

        Let the request entity body be data converted to Unicode and encoded as UTF-8.
    If data is a FormData

        Let the request entity body be the result of running the multipart/form-data encoding algorithm with data as form data set and with UTF-8 as the explicit character encoding.

        Let mime type be the concatenation of "multipart/form-data;", a U+0020 SPACE character, "boundary=", and the multipart/form-data boundary string generated by the multipart/form-data encoding algorithm.

    If a Content-Type header is set using setRequestHeader() whose value is a valid MIME type and has a charset parameter whose value is not a case-insensitive match for encoding, and encoding is not null, set all the charset parameters of the Content-Type header to encoding.

    If no Content-Type header has been set using setRequestHeader() and mime type is not null set a Content-Type request header with as value mime type.

    If the asynchronous flag is false release the storage mutex.

    If the asynchronous flag is true and one or more event listeners are registered on the XMLHttpRequestUpload object set the upload events flag to true. Otherwise, set the upload events flag to false.

    Set the error flag to false.

    Set the upload complete flag to true if there is no request entity body or if the request entity body is empty. Otherwise, set the upload complete flag to false.

    If the asynchronous flag is true run these substeps:

        Set the send() flag to true.

        Fire an event named readystatechange.

        The state does not change. The event is dispatched for historical reasons.

        Fire a progress event named loadstart.

        If the upload complete flag is false fire a progress event named loadstart on the XMLHttpRequestUpload object.

        Return the send() method call, but continue running the steps in this algorithm. 

    If the XMLHttpRequest origin and the request URL are same origin

        These are the same-origin request steps.

        Fetch the request URL from origin XMLHttpRequest origin, with the synchronous flag set if the asynchronous flag is false, using HTTP method request method, user request username (if non-null) and password request password (if non-null), taking into account the request entity body, list of author request headers and the rules listed at the end of this section.

        If the asynchronous flag is false

            While making the request also follow the same-origin request event rules.

            The send() method call will now be returned by virtue of this algorithm ending.
        If the asynchronous flag is true

            Make upload progress notifications.

            Make progress notifications.

            While processing the request, as data becomes available and when the user interferes with the request, queue tasks to update the response entity body and follow the same-origin request event rules.

    Otherwise

        These are the cross-origin request steps.

        Make a cross-origin request, passing these as parameters:

        request URL
            The request URL. 
        request method
            The request method. 
        custom request headers
            The list of author request headers. 
        request entity body
            The request entity body. 
        source origin
            The XMLHttpRequest origin. 
        credentials flag
            The withCredentials attribute's value. 
        force preflight flag
            The upload events flag. 

        Request username and request password are always ignored as part of a cross-origin request; including them would allow a site to perform a distributed password search. However, user agents will include user credentials in the request (if the user has any and if withCredentials is true).

        If the asynchronous flag is false

            While making the request also follow the cross-origin request event rules.

            The send() method call will now be returned by virtue of this algorithm ending.
        If the asynchronous flag is true

            While processing the request, as data becomes available and when the end user interferes with the request, queue tasks to update the response entity body and follow the cross-origin request event rules.

If the user agent allows the end user to configure a proxy it should modify the request appropriately; i.e., connect to the proxy host instead of the origin server, modify the Request-Line and send Proxy-Authorization headers as specified.

If the user agent supports HTTP Authentication and Authorization is not in the list of author request headers, it should consider requests originating from the XMLHttpRequest object to be part of the protection space that includes the accessed URIs and send Authorization headers and handle 401 Unauthorized requests appropriately.

If authentication fails, XMLHttpRequest origin and the request URL are same origin, Authorization is not in the list of author request headers, request username is null, and request password is null, user agents should prompt the end user for their username and password.

Otherwise, if authentication fails, user agents must not prompt the end user for their username and password. [RFC2617]

End users are not prompted for various cases so that authors can implement their own user interface.

If the user agent supports HTTP State Management it should persist, discard and send cookies (as received in the Set-Cookie response header, and sent in the Cookie header) as applicable. [COOKIES]

If the user agent implements a HTTP cache it should respect Cache-Control request headers set by the setRequestHeader() (e.g., Cache-Control: no-cache bypasses the cache). It must not send Cache-Control or Pragma request headers automatically unless the end user explicitly requests such behavior (e.g. by reloading the page).

For 304 Not Modified responses that are a result of a user agent generated conditional request the user agent must act as if the server gave a 200 OK response with the appropriate content. The user agent must allow setRequestHeader() to override automatic cache validation by setting request headers (e.g. If-None-Match or If-Modified-Since), in which case 304 Not Modified responses must be passed through. [RFC2616]

If the user agent implements server-driven content-negotiation it must follow these constraints for the Accept and Accept-Language request headers:

    Both headers must not be modified if they are already set through setRequestHeader().

    If not set through setRequestHeader() Accept-Language should be set as appropriate.

    If not set through setRequestHeader() Accept must be set with as value *\/*. 

Responses must have the content-encodings automatically decoded. [RFC2616]

Besides the author request headers user agents should not include additional request headers other than those mentioned above or other than those authors are not allowed to set using setRequestHeader(). This ensures that authors have a reasonably predictable API.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.6.7. Infrastructure for the send() method

The same-origin request event rules are as follows:

If the response has an HTTP status code of 301, 302, 303, or 307

    If the redirect violates infinite loop precautions this is a network error.

    Otherwise, run these steps:

        Set the request URL to the URL conveyed by the Location header.

        If the XMLHttpRequest origin and the origin of request URL are same origin transparently follow the redirect while observing the same-origin request event rules.

        Otherwise, follow the cross-origin request steps and terminate the steps for this algorithm. 

    HTTP places requirements on the user agent regarding the preservation of the request method and request entity body during redirects, and also requires end users to be notified of certain kinds of automatic redirections.
If the end user cancels the request

    This is an abort error. 
If there is a network error

    In case of DNS errors, TLS negotiation failure, or other type of network errors, this is a network error. Do not request any kind of end user interaction.

    This does not include HTTP responses that indicate some type of error, such as HTTP status code 410.
If timeout is not 0 and since the request started the amount of milliseconds specified by timeout has passed

    This is a timeout error. 
Once all HTTP headers have been received, the asynchronous flag is true, and the HTTP status code of the response is not 301, 302, 303, or 307

    Switch to the HEADERS_RECEIVED state. 
Once the first byte (or more) of the response entity body has been received and the asynchronous flag is true
If there is no response entity body and the asynchronous flag is true

    Switch to the LOADING state. 
Once the whole response entity body has been received
If there is no response entity body and the state is LOADING
If there is no response entity body and the asynchronous flag is false

    Switch to the DONE state. 

The cross-origin request event rules are as follows:

If the cross-origin request status is preflight complete and the asynchronous flag is true

    Make upload progress notifications. 
If the cross-origin request status is network error

    This is a network error. 
If the cross-origin request status is abort error

    This is an abort error. 
If timeout is not 0 and since the request started the amount of milliseconds specified by timeout has passed

    This is a timeout error. 
Once all HTTP headers have been received, the cross-origin request status is success, and the asynchronous flag is true

    Switch to the HEADERS_RECEIVED state.

    Make progress notifications.
Once the first byte (or more) of the response entity body has been received, the cross-origin request status is success, and the asynchronous flag is true
If there is no response entity body, the cross-origin request status is success, and the asynchronous flag is true

    Switch to the LOADING state. 
Once the whole response entity body has been received and the cross-origin request status is success
If there is no response entity body, the cross-origin request status is success, and the state is LOADING
If there is no response entity body, the cross-origin request status is success, and the asynchronous flag is false

    Switch to the DONE state. 

When something is said to be a network error run the request error steps for exception NETWORK_ERR and event error.

When something is said to be an abort error run the request error steps for exception ABORT_ERR and event abort.

When something is said to be an timeout error run the request error steps for exception TIMEOUT_ERR and event timeout.

When something is said to be a request error for exception exception and event event run these steps:

    The user agent should cancel any network activity for which the object is responsible.

    If there are any tasks from the object's XMLHttpRequest task source in one of the task queues, then remove those tasks.

    Set the the error flag to true.

    Switch the state to DONE.

    If the asynchronous flag is false raise an exception exception and terminate the overall set of steps.

    Fire an event named readystatechange.

    At this point it is clear that the asynchronous flag is true.

    If the upload complete flag is false, follow these substeps:

        Set the upload complete flag to true.

        Fire a progress event named event on the XMLHttpRequestUpload object.

        Fire a progress event named loadend on the XMLHttpRequestUpload object. 

    Fire a progress event named event.

    Fire a progress event named loadend. 

When it is said to switch to the HEADERS_RECEIVED state run these steps:

    Switch the state to HEADERS_RECEIVED.

    Fire an event named readystatechange. 

When it is said to switch to the LOADING state run these steps:

    Switch the state to LOADING.

    Fire an event named readystatechange. 

When it is said to switch to the DONE state run these steps:

    If the asynchronous flag is false update the response entity body.

    Switch the state to DONE.

    Fire an event named readystatechange.

    Fire a progress event named load.

    Fire a progress event named loadend. 

When it is said to make progress notifications, while the download is progressing, queue a task to fire a progress event named progress about every 50ms or for every byte received, whichever is least frequent.

When it is said to make upload progress notifications run these steps:

    While the request entity body is being uploaded and the upload complete flag is false, queue a task to fire a progress event named progress at the XMLHttpRequestUpload object about every 50ms or for every byte transmitted, whichever is least frequent.

    If the request entity body has been successfully uploaded and the upload complete flag is still false, queue a task to run these substeps:

        Set the upload complete flag to true.

        Fire a progress event named load at the XMLHttpRequestUpload object.

        Fire a progress event named loadend at the XMLHttpRequestUpload object. 

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.6.8. The abort() method

client . abort()
    Cancels any network activity. 

When the abort() method is invoked, the user agent must run these steps (unless otherwise noted). This algorithm can be terminated by invoking the open() method. When it is terminated the user agent must terminate the algorithm after finishing the step it is on.

The abort() algorithm can only be terminated by invoking open() from an event handler.

    Terminate the send() algorithm.

    The user agent should cancel any network activity for which the object is responsible.

    If there are any tasks from the object's XMLHttpRequest task source in one of the task queues, then remove those tasks.

    Set the error flag to true.

    If the state is UNSENT, OPENED with the send() flag being false, or DONE go to the next step.

    Otherwise run these substeps:

        Switch the state to DONE.

        Set the send() flag to false.

        Fire an event named readystatechange.

        Fire a progress event named abort.

        Fire a progress event named loadend.

        If the upload complete flag is false run these substeps:

            Set the upload complete flag to true.

            Fire a progress event named abort on the XMLHttpRequestUpload object.

            Fire a progress event named loadend on the XMLHttpRequestUpload object. 

    Switch the state to UNSENT.

    No readystatechange event is dispatched.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
4.7. Response

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.7.1. The status attribute

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

4.7.2. The statusText attribute

client . statusText

    Returns the HTTP status text. 

The statusText attribute must return the result of running these steps:

    If the state is UNSENT or OPENED return the empty string and terminate these steps.

    If the error flag is true return the empty string and terminate these steps.

    Return the HTTP status text. 

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.7.3. The getResponseHeader() method

client . getResponseHeader(header)

    Returns the header field value from the response of which the field name matches header, unless the field name is Set-Cookie or Set-Cookie2. 

When the getResponseHeader(header) is invoked, the user agent must run these steps:

    If the state is UNSENT or OPENED return null and terminate these steps.

    If the error flag is true return null and terminate these steps.

    If any code point in header is higher than U+00FF LATIN SMALL LETTER Y WITH DIAERESIS return null and terminate these steps.

    Let header be the result of deflating header.

    If header is a case-insensitive match for Set-Cookie or Set-Cookie2 return null and terminate these steps.

    If header is a case-insensitive match for multiple HTTP response headers, return the inflated values of these headers as a single concatenated string separated from each other by a U+002C COMMA U+0020 SPACE character pair and terminate these steps.

    If header is a case-insensitive match for a single HTTP response header, return the inflated value of that header and terminate these steps.

    Return null. 

The Cross-Origin Resource Sharing specification filters the headers that are exposed by getResponseHeader() for non same-origin requests. [CORS]

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

4.7.4. The getAllResponseHeaders() method

client . getAllResponseHeaders()

    Returns all headers from the response, with the exception of those whose field name is Set-Cookie or Set-Cookie2. 

When the getAllResponseHeaders() method is invoked, the user agent must run the following steps:

    If the state is UNSENT or OPENED return the empty string and terminate these steps.

    If the error flag is true return the empty string and terminate these steps.

    Return all the HTTP headers, excluding headers that are a case-insensitive match for Set-Cookie or Set-Cookie2, inflated, as a single string, with each header line separated by a U+000D CR U+000A LF pair, excluding the status line, and with each header name and header value separated by a U+003A COLON U+0020 SPACE pair. 

The Cross-Origin Resource Sharing specification filters the headers that are exposed by getAllResponseHeaders() for non same-origin requests. [CORS]

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

4.7.5. Response Entity Body

The response MIME type is the MIME type the Content-Type header contains without any parameters or null if the header could not be parsed properly or was omitted. The override MIME type is initially null and can get a value if overrideMimeType() is invoked. Final MIME type is the override MIME type unless that is null in which case it is the response MIME type.

The response charset is the value of the charset parameter of the Content-Type header or null if there was no charset parameter or if the header could not be parsed properly or was omitted. The override charset is initially null and can get a value if overrideMimeType() is invoked. Final charset is the override charset unless that is null in which case it is the response charset.

The response entity body is the fragment of the entity body of the response received so far (LOADING) or the complete entity body of the response (DONE). If the response does not have an entity body the response entity body is null.

The response entity body is updated as part of the send() algorithm.

The text response entity body is a DOMString representing the response entity body. The text response entity body is the return value of the following algorithm:

    If the response entity body is null return the empty string and terminate these steps.

    Let charset be the final charset.

    Let mime be the final MIME type.

    If charset is null and mime is null, text/xml, application/xml or ends in +xml use the rules set forth in the XML specifications to determine the character encoding. Let charset be the determined character encoding.

    If charset is null and mime is text/html follow the rules set forth in the HTML specification to determine the character encoding. Let charset be the determined character encoding. [HTML]

    If charset is null then, for each of the rows in the following table, starting with the first one and going down, if the first bytes of bytes match the bytes given in the first column, then let charset be the encoding given in the cell in the second column of that row. If there is no match charset remains null.
    Bytes in Hexadecimal 	Description
    FE FF 	UTF-16BE BOM
    FF FE 	UTF-16LE BOM
    EF BB BF 	UTF-8 BOM

    If charset is null let charset be UTF-8.

    Return the result of decoding the response entity body using charset. Replace bytes or sequences of bytes that are not valid accordng to the charset with a single U+FFFD REPLACEMENT CHARACTER character. Remove one leading U+FEFF BYTE ORDER MARK character, if present. 

Authors are strongly encouraged to always encode their resources using UTF-8.

The document response entity body is either a Document representing the response entity body or null. If it is a Document its origin is the XMLHttpRequest origin. If the document response entity body has no value assigned to it let it be the return value of the following algorithm:

    If the response entity body is null, return null and terminate these steps.

    If final MIME type is not null, text/html, text/xml, application/xml, or does not end in +xml, return null and terminate these steps.

    If final MIME type is text/html let document be Document object that represents the response entity body parsed following the rules set forth in the HTML specification for an HTML parser with scripting disabled. [HTML]

    Otherwise, let document be a Document object that represents the result of parsing the response entity body into a document tree following the rules set forth in the XML specifications. If that fails (unsupported character encoding, namespace well-formedness error et cetera) return null and terminate these steps. [XML]

    Scripts in the resulting document tree will not be executed, resources referenced will not be loaded and no associated XSLT will be applied.

    Return document. 

The blob response entity body is a Blob representing the response entity body. If the blob response entity body has no value assigned to it let it be the return value of the following algorithm:

    If the response entity body is null, return an empty Blob object and terminate these steps.

    Return a Blob object representing the response entity body. 

The arraybuffer response entity body is an ArrayBuffer representing the response entity body. If the arraybuffer response entity body has no value assigned to it let it be the return value of the following algorithm:

    If the response entity body is null, return an empty ArrayBuffer object and terminate these steps.

    Return an ArrayBuffer object representing the response entity body. 

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.7.6. The overrideMimeType() method

client . overrideMimeType(mime)

    Sets the Content-Type header for the response to mime.

    Throws a SYNTAX_ERR exception if mime is not a valid media type.

When the overrideMimeType(mime) method is invoked, the user agent must run these steps:

    If parsing mime analogously to the value of the Content-Type headers fails raise a SYNTAX_ERR exception and abort this algorithm.

    If a MIME type (without any parameters) is successfully parsed set override MIME type to that MIME type.

    If a charset parameter is successfully parsed set override charset to its value. 

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.7.7. The responseType attribute

client . responseType [ = value ]

    Returns the response type.

    Can be set to change the response type. Values are: the empty string (default), "arraybuffer", "blob", "document", and "text".

    Throws an INVALID_STATE_ERR exception if the state is not OPENED or HEADERS_RECEIVED.

On setting the responseType attribute these steps must be run:

    If the state is not OPENED or HEADERS_RECEIVED raise an INVALID_STATE_ERR exception and terminate these steps.

    If the given value is not the empty string, "arraybuffer", "blob", "document", or "text" terminate these steps.

    Set the responseType attribute's value to the given value. 

On getting the responseType attribute it must return its value.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.7.8. The response attribute

client . response

    Returns the response entity body. 

The response attribute must return the result of running these steps:

If responseType is the empty string or "text"

        If the state is not LOADING or DONE return the empty string and terminate these steps.

        If the error flag is true return the empty string and terminate these steps.

        Return the text response entity body. 

Otherwise

        If the state is not DONE return null and terminate these steps.

        If the error flag is true return null and terminate these steps.

        If responseType is "arraybuffer"

            Return the arraybuffer response entity body. 
        If responseType is "blob"

            Return the blob response entity body. 
        If responseType is "document"

            Return the document response entity body. 

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.7.9. The responseText attribute

client . responseText

    Returns the text response entity body.

    Throws an INVALID_STATE_ERR exception if responseType is not the empty string or "text". 

The responseText attribute must return the result of running these steps:

    If responseType is not the empty string or "text" raise an INVALID_STATE_ERR exception and terminate these steps.

    If the state is not LOADING or DONE return the empty string and terminate these steps.

    If the error flag is true return the empty string and terminate these steps.

    Return the text response entity body. 

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.7.10. The responseXML attribute

client . responseXML

    Returns the document response entity body.

    Throws an INVALID_STATE_ERR exception if responseType is not the empty string or "document". 

The responseXML attribute must return the result of running these steps:

    If responseType is not the empty string or "document" raise an INVALID_STATE_ERR exception and terminate these steps.

    If the state is not DONE return null and terminate these steps.

    If the error flag is true return null and terminate these steps.

    Return the document response entity body. 

The responseXML attribute has XML in its name for historical reasons. It also returns HTML resources as documents.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.8. Events summary

The following events are dispatched on XMLHttpRequest and/or XMLHttpRequestUpload objects:
Event name 	Interface 	Dispatched when…
readystatechange 	Event 	The readyState attribute changes at some seemingly arbitrary times for historical reasons.
loadstart 	ProgressEvent 	When the request starts.
progress 	ProgressEvent 	While sending and loading data.
abort 	ProgressEvent 	When the request has been aborted. For instance, by invoking the abort() method.
error 	ProgressEvent 	When the request has failed.
load 	ProgressEvent 	When the request has successfully completed.
timeout 	ProgressEvent 	When the author specified timeout has passed before the request could complete.
loadend 	ProgressEvent 	When the request has completed (either in success or failure).
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5. The FormData Interface

The FormData object represents an ordered collection of entries. Each entry
has a name, a value, a type, and potentially a filename.

[Constructor,
 Constructor(HTMLFormElement form)]
interface FormData {
  void append(DOMString name, Blob value);
  void append(DOMString name, DOMString value);
};

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.1. Constructors

fd = FormData()

    Returns a new FormData object. 

When the FormData() constructor is invoked a new FormData object must be
returned.

When the FormData(form) constructor is invoked (i.e. with a form argument)
a new FormData object must be returned with as entries the result of
constructing the form data set for form.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.2. The append() method

fd . append(name, value)

    Appends a new name/value-pair to the FormData object. 

When the append(name, value) method is invoked, the user agent must create
a new entry with the following parameters set:

    Set its name to name.
    Set its value to value.
    Set its type to "text" if value is a string and "file" if it is a Blob.
    If type is "file" set filename to the empty string if the value is not
    a File and set it to the File's name otherwise.

It then must append this entry to the end of the collection the FormData
object represents.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Differences from XMLHttpRequest

XMLHttpRequest Level 2 adds the following new features:

    The ability to make cross-origin requests.

    The ability to make anonymous requests — Referer, origin, and
    credentials are not part of the request.

    The ability to register for progress events. Both for downloads (put
    listeners on the XMLHttpRequest object itself) and uploads (put
    listeners on the XMLHttpRequestUpload object, returned by the upload
    attribute).

    The ability to override the media type and character encoding of the
    response through the overrideMimeType() method.

    The ability to set a timeout for the request.

    The ability to transfer ArrayBuffer, Blob, File, and FormData objects.

    The responseType and response attributes. 

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

References

Unless marked "Non-normative" these references are normative.

[COOKIES]
    HTTP State Management Mechanism (work in progress), A. Barth. IETF.
[CORS]
    Cross-Origin Resource Sharing (work in progress), A. van Kesteren. W3C.
[DOMCore]
    DOM Core (work in progress), A. van Kesteren, Ms2ger. W3C. 
[ECMAScript]
    ECMAScript Language Specification. ECMA. 
[FileAPI]
    File API (work in progress), A. Ranganathan. W3C. 
[HTML]
    HTML5 (work in progress), I. Hickson. W3C. 
    HTML, I. Hickson. WHATWG. 
[HTTPVERBSEC]
    (Non-normative) Multiple vendors' web servers enable HTTP TRACE method
    	by default, US-CERT.
    (Non-normative) Microsoft Internet Information Server (IIS) vulnerable
    	to cross-site scripting via HTTP TRACK method, US-CERT.
    (Non-normative) HTTP proxy default configurations allow arbitrary TCP
    	connections, US-CERT.
[PE]
    Progress Events (work in progress), A. van Kesteren. W3C. 
[RFC2046]
    Multipurpose Internet Mail Extensions (MIME) Part Two: Media Types, N.
    	Freed, N. Borenstein. IETF.
[RFC2119]
    Key words for use in RFCs to Indicate Requirement Levels, S. Bradner.
    	IETF.
[RFC2616]
    Hypertext Transfer Protocol -- HTTP/1.1, R. Fielding, J. Gettys, J.
    Mogul, H. Frystyk, L. Masinter, P. Leach, T. Berners-Lee. IETF.
[RFC2617]
    HTTP Authentication: Basic and Digest Access Authentication, P.
    	Hallam-Baker, J. Hostetler, S. Lawrence, P. Leach, A. Luotonen, L.
    	Stewart. IETF.
[RFC3986]
    Uniform Resource Identifier (URI): Generic Syntax, T. Berners-Lee, R.
    	Fielding, L. Masinter. IETF.
[RFC3987]
    Internationalized Resource Identifiers (IRIs), M. Duerst, M. Suignard.
    	IETF.
[TypedArray]
    Typed Array, V. Vukicevic, K. Russell. Khronos. 
[WebIDL]
    Web IDL (work in progress), C. McCormack. W3C. 
[XML]
    Extensible Markup Language (XML) 1.0, T. Bray, J. Paoli, C.
    	Sperberg-McQueen, E. Maler, F. Yergeau. W3C.
    Namespaces in XML, T. Bray, D. Hollander, A. Layman, R. Tobin, H. S.
    	Thompson. W3C.

Acknowledgments

The editor would like to thank Addison Phillips, Ahmed Kamel, Alex Hopmann,
Alex Vincent, Alexey Proskuryakov, Asbjørn Ulsberg, Boris Zbarsky, Björn
Höhrmann, Cameron McCormack, Chris Marrin, Christophe Jolif, Charles
McCathieNevile, Dan Winship, David Andersson, David Flanagan, David
Håsäther, David Levin, Dean Jackson, Denis Sureau, Doug Schepers, Douglas
Livingstone, Elliotte Harold, Eric Lawrence, Eric Uhrhane, Erik Dahlström,
Geoffrey Sneddon, Gideon Cohn, Gorm Haug Eriksen, Håkon Wium Lie, Hallvord
R. M. Steen, Huub Schaeks, Ian Davis, Ian Hickson, Ivan Herman, Jeff
Walden, Jens Lindström, Jim Deegan, Jim Ley, Joe Farro, Jonas Sicking,
Julian Reschke, Karl Dubost, Lachlan Hunt, Maciej Stachowiak, Magnus
Kristiansen, Marc Hadley, Marcos Caceres, Mark Baker, Mark Birbeck, Mark
Nottingham, Mark S. Miller, Martin Hassman, Mohamed Zergaoui, Olli Pettay,
Pawel Glowacki, Peter Michaux, Philip Taylor, Robin Berjon, Rune Halvorsen,
Ruud Steltenpool, Sergiu Dumitriu, Simon Pieters, Stewart Brodie, Sunava
Dutta, Thomas Roessler, Tom Magliery, and Zhenbin Xu for their
contributions to this specification.

Special thanks to the Microsoft employees who first implemented the
XMLHttpRequest interface, which was first widely deployed by the Windows
Internet Explorer browser.

Special thanks also to the WHATWG for drafting an initial version of this
specification in their Web Applications 1.0 document (now renamed to HTML).
[HTML]

Thanks also to all those who have helped to improve this specification by
sending suggestions and corrections. (Please, keep bugging us with your
issues!)
******************************************************************************/
