/******************************************************************************
http://dev.w3.org/2006/webapi/progress/

W3C
Progress Events
W3C Working Draft 10 March 2011

This Version:
    http://www.w3.org/TR/2011/WD-progress-events-20110310/ 
Latest Version:
    http://www.w3.org/TR/progress-events/ 
Latest Editor Version:
    http://dev.w3.org/2006/webapi/progress/ 
Previous Versions:
    http://www.w3.org/TR/2010/WD-progress-events-20101019/ 
    http://www.w3.org/TR/2008/WD-progress-events-20080521/ 
    http://www.w3.org/TR/2007/WD-progress-events-20071023/ 
    http://www.w3.org/TR/2007/WD-progress-events-20070419/ 
Editor:
    Anne van Kesteren (Opera Software) <annevk@opera.com> 
Former Editor:
    Charles McCathieNevile (Opera Software) <chaals@opera.com> 

Copyright © 2010 W3C® (MIT, ERCIM, Keio), All Rights Reserved. W3C liability, trademark and document use rules apply.
Abstract

The Progress Events specification defines an abstract event interface that can be used for measuring progress; e.g. HTTP entity body transfers.
Status of this Document

This section describes the status of this document at the time of its publication. Other documents may supersede this document. A list of current W3C publications and the latest revision of this technical report can be found in the W3C technical reports index at http://www.w3.org/TR/.

This is the 10 March 2011 Last Call Working Draft of Progress Events. Please send comments to public-webapps@w3.org (archived) by 1 June 2011 with [progress-events] at the start of the subject line.

This document is produced by the Web Applications (WebApps) Working Group. The WebApps Working Group is part of the Rich Web Clients Activity in the W3C Interaction Domain.

This document was produced by a group operating under the 5 February 2004 W3C Patent Policy. W3C maintains a public list of any patent disclosures made in connection with the deliverables of the group; that page also includes instructions for disclosing a patent. An individual who has actual knowledge of a patent which the individual believes contains Essential Claim(s) must disclose the information in accordance with section 6 of the W3C Patent Policy.

Publication as a Working Draft does not imply endorsement by the W3C Membership. This is a draft document and may be updated, replaced or obsoleted by other documents at any time. It is inappropriate to cite this document as other than work in progress.
Table of Contents

    1. Introduction
    2. Conformance
        2.1. Extensibility 
    3. Terminology
    4. Interface ProgressEvent
        4.1. Firing events using the ProgressEvent interface for HTTP
        4.2. Firing events using the ProgressEvent interface for other contexts
        4.3. Suggested names for events using the ProgressEvent interface
        4.4. Security Considerations 
    References
    Acknowledgments 

1. Introduction

This section is non-normative.

This specification defines an abstract event interface — ProgressEvent — that can be used for measuring progress. Other specifications use this specification for that purpose.

In this example XMLHttpRequest, combined with concepts defined in this specification, and the HTML progress element are used together to display the process of fetching a resource. [XHR] [HTML]

<!DOCTYPE html>
<title>Waiting for Magical Unicorns</title>
<progress id=p></progress>
<script>
  var progressBar = document.getElementById("p"),
      client = new XMLHttpRequest()
  client.open("GET", "magical-unicorns")
  client.onprogress = function(pe) {
    if(pe.lengthComputable) {
      progressBar.max = pe.total
      progressBar.value = pe.loaded
    }
  }
  client.onloadend = function(pe) {
    progressBar.value = pe.loaded
  }
  client.send()
</script>

Fully working code would of course be more elaborate and deal with more scenarios, such as network errors or the end user terminating the request.
2. Conformance

Everything in this specification is normative except for diagrams, examples, notes and sections marked non-normative.

The key word must in this document is to be interpreted as described in RFC 2119. [RFC2119]

A user agent must also be a conforming implementation of the IDL fragments in this specification, as described in the Web IDL specification. [WebIDL]
2.1. Extensibility

User agents, Working Groups, and other interested parties are strongly encouraged to discuss extensions on a relevant public forum, preferably public-webapps@w3.org. If this is for some reason not possible prefix the extension in some way and start the prefix with an uppercase letter. E.g. if company Foo wants to add a private method bar() it could be named FooBar() to prevent clashes with a potential future standardized bar().
3. Terminology

Bubble flag, cancel flag dispatch, dispatch flag, event, Event, fire an event named e, initEvent(), and type are defined by DOM Core. [DOMCore]

Content-Length and entity body are defined by HTTP. [HTTP]
4. Interface ProgressEvent

interface ProgressEvent : Event {
  readonly attribute boolean lengthComputable;
  readonly attribute unsigned long long loaded;
  readonly attribute unsigned long long total;

  void initProgressEvent(DOMString type, boolean bubbles, boolean cancelable, boolean lengthComputable, unsigned long long loaded, unsigned long long total);
};

Events using the ProgressEvent interface indicate some kind of progression.

Events using the ProgressEvent interface have an associated value, maximum, and maximum known flag. The value and maximum are initially zero and the maximum known flag is initially unset.

The lengthComputable attribute must return true if the maximum known flag is set and false otherwise.

The loaded attribute must return value.

The total attribute must return maximum.

When the initProgressEvent(type, bubbles, cancelable, lengthComputable, loaded, total) method is invoked these steps must be run:

    If the dispatch flag is set, terminate these steps.

    Invoke initEvent() with the first three arguments.

    If the lengthComputable argument is true, set the maximum known flag.

    Set value to the loaded argument.

    Set maximum to the total argument. 

4.1. Firing events using the ProgressEvent interface for HTTP

To fire a progress event named e means to fire an event named e with an event using the ProgressEvent interface that also meets these conditions:

    Set value to the number of HTTP entity body octets transferred.
    If the length of the HTTP entity body is known through the Content-Length header, set the maximum known flag and set maximum to the length. 

This definition can be used by other specifications. XMLHttpRequest does this for instance. [XHR]
4.2. Firing events using the ProgressEvent interface for other contexts

This is left as an exercise for the editor of the specification that introduces such a context. The editor is encouraged to define it in a way consistent with this and other specifications that utilize events using the ProgressEvent interface.
4.3. Suggested names for events using the ProgressEvent interface

This section is non-normative.

The suggested types for use with events using the ProgressEvent interface are summarized in the table below. Specification editors are free to tune the details to their specific scenarios, though are strongly encouraged to discuss their usage with the W3C WebApps Working Group on public-webapps@w3.org to ensure input from people familiar with the subject.
Name 	Description 	Times 	When
loadstart 	Progress has begun. 	Once. 	First.
progress 	In progress. 	Zero or more. 	After loadstart has been dispatched.
error 	Progression failed. 	Zero or once. 	After the last progress has been dispatched, or after loadstart has been dispatched if progress has not been dispatched.
abort 	Progression is terminated. 	Zero or once.
load 	Progression is successful. 	Zero or once.
loadend 	Progress has stopped. 	Once. 	After one of error, abort, or load has been dispatched.

The error, abort, and load event types are mutually exclusive.

Throughout the web platform the error, abort, and load event types have their bubble flag and cancel flag unset so it is suggested that for consistency all events using the ProgressEvent interface have these unset.
4.4. Security Considerations

For cross-origin requests some kind of opt-in, e.g. Cross-Origin Resource Sharing, has to be used before events using the ProgressEvent interface are dispatched as information (e.g. size) would be revealed that cannot be obtained otherwise. [CORS]
References

Unless marked "Non-normative" these references are normative.

[CORS]
    (Non-normative) Cross-Origin Resource Sharing (work in progress), A. van Kesteren. W3C. 
[DOMCore]
    DOM Core (work in progress), A. van Kesteren, Ms2ger. W3C. 
[HTML]
    (Non-normative) HTML5 (work in progress), I. Hickson. W3C. 
    (Non-normative) HTML, I. Hickson. WHATWG. 
[HTTP]
    Hypertext Transfer Protocol -- HTTP/1.1, R. Fielding, J. Gettys, J. Mogul, H. Frystyk, L. Masinter, P. Leach, T. Berners-Lee. IETF. 
[RFC2119]
    Key words for use in RFCs to Indicate Requirement Levels, S. Bradner. IETF. 
[WebIDL]
    Web IDL (work in progress), C. McCormack. W3C. 
[XHR]
    (Non-normative) XMLHttpRequest (work in progress), A. van Kesteren. W3C. 

Acknowledgments

The editor would like to thank Aaron Leventhal, Alan Schepers, Alex Danilo, Andrew Emmons, Andrew Shellshear, Andy Sledd, Arthur Barstow, Björn Höhrmann, Boris Zbarsky, Cameron McCormack, Chris Lilley, David Håsäther, Doug Schepers, Ellen Siegel, Erik Dahlström, Garrett Smith, Gorm Eriksen, Gottfried Zimmermann, Ian Hickson, Jean-Claude Duford, Jean-Yves Bitterlich, Jim Ley, João Eiras, Kartikaya Gupta, Lisa Seeman, Maciej Stachowiak, Marcos Caceres, Michael Antony Puls, Nandini Ramani, Olli Pettay, Philip Jägenstedt, Rich Schwerdtfeger, Robert Sayre, Robin Berjon, Simon Pieters, Suresh Chitturi, and Travis Leithead for their contributions to this specification.

Special thanks to the SVG WG for drafting the original ProgressEvent interface as part of the SVG Micro DOM.

Thanks also to all those who have helped to improve this specification by sending suggestions and corrections. (Please, keep bugging us with your issues!)
******************************************************************************/