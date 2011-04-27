/******************************************************************************
http://dev.w3.org/csswg/cssom-view/

W3C
CSSOM View Module
Editor's Draft 31 August 2010

This Version:
    http://www.w3.org/TR/2010/ED-cssom-view-20100831/ 
Latest Version:
    http://www.w3.org/TR/cssom-view/ 
Latest Editor Version:
    http://dev.w3.org/csswg/cssom-view/ 
Previous Versions:
    http://www.w3.org/TR/2009/WD-cssom-view-20090804/ 
    http://www.w3.org/TR/2008/WD-cssom-view-20080222/ 
Editor:
    Anne van Kesteren (Opera Software ASA) <annevk@opera.com> 

Copyright © 2010 W3C® (MIT, ERCIM, Keio), All Rights Reserved. W3C liability,
trademark and document use rules apply.

Abstract

The APIs introduced by this specification provide authors with a way to inspect
and manipulate the visual view of a document. This includes getting the
position of element layout boxes, obtaining the width of the viewport through
script, and also scrolling an element.

Status of this Document

This is a public copy of the editors' draft. It is provided for discussion only
and may change at any moment. Its publication here does not imply endorsement
of its contents by W3C. Don't cite this document other than as work in
progress.

The (archived) public mailing list www-style@w3.org (see instructions) is
preferred for discussion of this specification. When sending e-mail, please put
the text “cssom-view” in the subject, preferably like this: “[cssom-view]
…summary of comment…”

This document was produced by the CSS Working Group (part of the Style
Activity).

This document was produced by a group operating under the 5 February 2004 W3C
Patent Policy. W3C maintains a public list of any patent disclosures made in
connection with the deliverables of the group; that page also includes
instructions for disclosing a patent. An individual who has actual knowledge of
a patent which the individual believes contains Essential Claim(s) must
disclose the information in accordance with section 6 of the W3C Patent Policy.

Table of Contents

    1. Background
    2. Conformance Criteria
        2.1. Web IDL
        2.2. Terminology
        2.3. CSS pixels 
    3. Extensions to the Window Interface
        3.1. The MediaQueryList Interface
        3.2. The Screen Interface 
    4. Extensions to the Document Interface
        4.1. The CaretPosition Interface 
    5. Extensions to the Element Interface
        5.1. The getClientRects() and getBoundingClientRect() methods
        5.2. Element Scrolling Members
        5.3. The clientTop, clientLeft, clientWidth, and clientHeight 
			 attributes 
    6. Extensions to the HTMLElement Interface
        6.1. The offsetParent, offsetTop, offsetLeft, offsetWidth, and 
			 offsetHeight attributes 
    7. Extensions to the Range Interface
    8. Extensions to the MouseEvent Interface
    9. Rectangles
        9.1. The ClientRectList Interface
        9.2. The ClientRect Interface 
    References
    Acknowledgments 

1. Background

Many of the features defined in this specification have been supported by
browsers for a long period of time. The goal of this specification is to define
these features in such a way that they can be implemented by all browsers in an
interoperable manner. The specification also defines a couple of new features
that will hopefully be useful to authors. (If they are not you can bug us!)

2. Conformance Criteria

Everything in this specification is normative except for diagrams, examples,
notes and sections marked non-normative.

The key word must in this document is to be interpreted as described in RFC
2119. [RFC2119]

A conforming user agent implements all the requirements made by this
specification.

2.1. Web IDL

The IDL fragments in this specification must be interpreted as required for
conforming IDL fragments, as described in the Web IDL specification. [WebIDL]

2.2. Terminology

Document and Element are defined by DOM Level 3 Core. [DOM3Core]

Range is defined in DOM Level 2 Traversal and Range. [DOM2TR]

MouseEvent is defined in DOM Level 2 Events. [DOM2Events]

Serialize a media query list and parse a media query list are defined by the
CSSOM. [CSSOM]

Firing a simple event named e, HTML element, HTMLElement, queue a task, quirks
mode, same origin, task, and Window are defined by HTML5. [HTML5]

The HTML body element is the first body HTML element child of the root HTML
element html.

Content edge, padding edge, border edge, and canvas are defined by CSS 2.1.
[CSS21]

Viewport and initial containing block are defined by CSS 2.1 unless there is an
ancestor foreignObject element in the http://www.w3.org/2000/svg namespace in
which case that element acts as viewport and initial containing block. [CSS21]
[SVG]

The term content refers to the dimensions of the element's content area,
including overflown content. [CSS21]

The term document content refers to the area on the canvas that is rendered
upon, excluding content on negative axis.

2.3. CSS pixels

All coordinates and dimensions for the APIs defined in this specification are
in CSS pixels. [CSS21]

This does not apply to e.g. matchMedia() as the units are explicitly given
there.

3. Extensions to the Window Interface

[Supplemental] interface Window {
  MediaQueryList matchMedia(DOMString media_query_list);
  readonly attribute Screen screen;

  // viewport
  readonly attribute long innerWidth;
  readonly attribute long innerHeight;

  // viewport scrolling
  readonly attribute long scrollX;
  readonly attribute long pageXOffset;
  readonly attribute long scrollY;
  readonly attribute long pageYOffset;
  void scroll(long x, long y);
  void scrollTo(long x, long y);
  void scrollBy(long x, long y);

  // client
  readonly attribute long screenX;
  readonly attribute long screenY;
  readonly attribute long outerWidth;
  readonly attribute long outerHeight;
};

When the matchMedia(media_query_list) method is invoked these steps must be
run:

    Let parsed_media_query_list be the result of parsing media_query_list.

    Return a new MediaQueryList object, associated with the Window object, with
    parsed_media_query_list as its associated media query list.

The screen attribute must return the Screen object associated with the Window
object. It always returns the same object.

Accessing screen through a WindowProxy object might yield different results
when the Document is navigated.

The innerWidth attribute must return the viewport width including the size of a
rendered scroll bar (if any).

The following snippet shows how to obtain the width of the viewport:

var viewportWidth = innerWidth

The innerHeight attribute must return the viewport height including the size of
a rendered scroll bar (if any).

The scrollX and pageXOffset attributes must return the x-coordinate, relative
to the initial containing block origin, of the left of the viewport.

The scrollY and pageYOffset attributes must return the y-coordinate, relative
to the initial containing block origin, of the top of the viewport.

When the scroll(x,y) method is invoked these steps must be run:

    If either x or y is infinite or NaN terminate this algorithm.

    If document content can have overflow to the right

        Let x be max(0, min(x, content width - content edge width)). 

    If document content can have overflow to the left (under right-to-left
    conditions)

        Let x be min(0, max(x, content edge width - content width)). 

    Let y be max(0, min(y, document content height - viewport height excluding
    the size of a rendered scroll bar (if any))).
    
    Align the x-coordinate x of the document content with the left of the
    viewport and align the y-coordinate y of the document content with the top
    of the viewport.
    
    If the aligning caused content to move queue a task to fire a simple event
    named scroll that bubbles at the Document object, unless a task to fire
    that event at the Document object was already queued.

When the scrollTo(x,y) method is invoked, the user agent must act as if the
scroll() method was invoked with the same arguments.

When the scrollBy(x,y) method is invoked, the user agent must act as if the
scroll() method was invoked with x plus scrollX as first argument and y plus
scrollY as second argument.

The screenX attribute must return the x-coordinate, relative to the origin of
the screen of the output device, of the top of the client window as number of
pixels, or zero if there is no such thing.

The screenY attribute must return the y-coordinate, relative to the origin of
the screen of the output device, of the left of the client window as number of
pixels, or zero if there is no such thing.

The outerWidth attribute must return the width of the client window. If there
is no client window this attribute must return zero.

The outerHeight attribute must return the height of the client window. If there
is no client window this attribute must return zero.

3.1. The MediaQueryList Interface

A MediaQueryList object has an associated media query list set on creation and
an associated list of media query list listeners, which is initially empty.

If the associated media query list changes in evaluation then, for each
listener in the list of media query list listeners — in appending order, queue
a task that invokes the listener, passing as argument the MediaQueryList
object.

A simple piece of code that detects changes in the orientation of the viewport
can be written as follows:

function handleOrientationChange(mql) {
  if(mql.matches) // landscape
    …
  else
    …
}
var mql = matchMedia("(orientation:landscape)")
mql.addListener(handleOrientationChange)

interface MediaQueryList {
  readonly attribute DOMString media;
  readonly attribute DOMString matches;
  void addListener(MediaQueryListListener listener);
  void removeListener(MediaQueryListListener listener);
};

[Callback=FunctionOnly, NoInterfaceObject]
interface MediaQueryListListener {
  void handleChange(MediaQueryList mql);
};

The media must return the serialized form of the associated media query list.

The matches must return true if the associated media query list matches the
state of the rendered Document and false if it does not.

When the addListener(listener) is invoked listener must be appended to the list
of media query list listeners, unless it is already in the list of media query
list listeners.

When the removeListener(listener) is invoked listener must be removed from the
list of media query list listeners.

3.2. The Screen Interface

As its name suggests, the Screen interface represents information about the
screen of the output device.

interface Screen {
  readonly attribute unsigned long availWidth;
  readonly attribute unsigned long availHeight;
  readonly attribute unsigned long width;
  readonly attribute unsigned long height;
  readonly attribute unsigned long colorDepth;
  readonly attribute unsigned long pixelDepth;
};

The availWidth attribute must return the available width of the rendering
surface of the output device.

The availHeight attribute must return the available height of the rendering
surface of the output device.

The width attribute must return the width of the output device.

The height attribute must return the height of the output device.

The colorDepth and pixelDepth attributes must both return the number of bits
allocated to colors (i.e. excluding the alpha channel) in the output device. If
the output device does not support colors these attributes must return zero.

4. Extensions to the Document Interface

[Supplemental] interface Document {
  Element elementFromPoint(float x, float y);
  CaretPosition caretPositionFromPoint(float x, float y);
};

The elementFromPoint(x, y) method, when invoked, must return the element at
coordinates x,y in the viewport. The element to be returned is determined
through hit testing. If either argument is negative, x is greater than the
viewport width excluding the size of a rendered scroll bar (if any), or y is
greather than the viewport height excluding the size of a rendered scroll bar
(if any), the method must return null. If there is no element at the given
position the method must return the root element, if any, or null otherwise.

The caretPositionFromPoint(x, y) method, when invoked, must return the result
of running these steps:

    If either argument is negative, x is greater than the viewport width
    excluding the size of a rendered scroll bar (if any), y is greather than
    the viewport height excluding the size of a rendered scroll bar (if any)
    return null.
    
    If at the coordinates x,y in the viewport no text insertion point
    indicator would have been inserted return null.
    
    If at the coordinates x,y in the viewport a text insertion point indicator
    would have been inserted in a text entry widget which is also a replaced
    element return a caret position with its properties set as follows:

    caret node

        The node corresponding to the text entry widget.

    caret offset

        The amount of 16-bit units to the left of where the text insertion
        point indicator would have inserted.

    caret range

        null 

    Otherwise, return a caret position where the caret range is a collapsed
    Range object for the position where the text insertion point indicator
    would have been inserted and the other properties are set as follows:

    caret node

        The startContainer of the caret range. 

    caret offset

        The startOffset of the caret range.

The specifics of hit testing are out of scope of this specification and
therefore the exact details of elementFromPoint() and caretPositionFromPoint()
are therefore too. Hit testing will hopefully be defined in a future revision
of CSS or HTML.

4.1. The CaretPosition Interface

A caret position gives the position of a text insertion point indicator. It
always has an associated caret node, caret offset, and caret range. It is
represented by a CaretPosition object.

interface CaretPosition {
  readonly attribute Node offsetNode;
  readonly attribute unsigned long offset;
  readonly attribute Range range;
};

The offsetNode attribute must return the caret node.

The offset attribute must return the caret offset.

The range attribute must return the caret range.

5. Extensions to the Element Interface

[Supplemental] interface Element {
  ClientRectList getClientRects();
  ClientRect getBoundingClientRect();

  // scrolling
  void scrollIntoView(optional boolean top);
           attribute long scrollTop;   // scroll on setting
           attribute long scrollLeft;  // scroll on setting
  readonly attribute long scrollWidth;
  readonly attribute long scrollHeight;

  readonly attribute long clientTop;
  readonly attribute long clientLeft;
  readonly attribute long clientWidth;
  readonly attribute long clientHeight;
};

5.1. The getClientRects() and getBoundingClientRect() methods

The getClientRects() and getBoundingClientRect() methods provide information
about the position of the border box edges of an element relative to the
viewport. The objects these methods return must be static. That is, changes to
the underlying document are not reflected in the objects.

The getClientRects() method, when invoked, must return the result of the
following algorithm:

    If the element on which it was invoked does not have an associated CSS
    layout box and is not in the http://www.w3.org/2000/svg namespace return an
    empty ClientRectList object and stop this algorithm.
    
    If the element does not have an associated CSS layout box and is in the
    http://www.w3.org/2000/svg namespace return a ClientRectList object
    containing a single ClientRect object that describes the bounding box of
    the element as defined by the SVG specification. [SVG]
    
    Return a ClientRectList object containing a list of ClientRect objects in
    content order describing the border boxes (including those with a height or
    width of zero) with the following constraints:

        If the element on which the method was invoked has a computed value for
        display property of table or inline-table include both the table box
        and the caption box, if any, but not the anonymous container box.
        [CSS21]
        
        Replace each anonymous block box with its child box(es) and repeat
        this until no anonymous block boxes are left in the final list. [CSS21]

The getBoundingClientRect() method, when invoked, must return the result of the
following algorithm:

    Let list be the result of invoking getClientRects() on the same element
    this method was invoked on.
    
    If the list is empty return a ClientRect object whose top, right, bottom
    and left members are zero.
    
    Otherwise, return a ClientRect object describing the smallest rectangle
    that includes the first rectangle in list and all of the remaining
    rectangles of which the height or width is not zero.

The following snippet gets the dimensions of the first div element in a
document:

var example = document.getElementsByTagName("div")[0].getBoundingClientRect();
var exampleWidth = example.width;
var exampleHeight = example.height;

5.2. Element Scrolling Members

To scroll an element into view, optionally with an align to top flag set, means
to run these steps for each ancestor element or viewport that establishes a
scrolling box, in order of innermost to outermost scrolling box:

    If the Document associated with the element to be scrolled into view is not
    same origin with the Document associated with the element or viewport
    associated with the scrolling box, terminate these steps.
    
    If the align to top flag is set align the top of the border box of the
    element to be scrolled into view with the top of the scrolling box.
    
    Otherwise, if the align to top flag is not set align the bottom of the
    border box of the element to be scrolled into view with the bottom of the
    scrolling box.
    
    Align the left of the border box of the element to be scrolled into view
    with the left of the scrolling box.
    
     If the aligning did not cause content to move terminate these steps.

    If the scrolling box is associated with an element

        Queue a task to fire a simple event named scroll at the element
        associated with the scrolling box, unless a task to fire that event at
        that element was already queued.

    If the scrolling box is associated with a viewport

        Queue a task to fire a simple event named scroll that bubbles at the
        Document object associated with the viewport, unless a task to fire
        that event at that Document object was already queued.

To scroll an element to x,y means to:

    If either x or y is infinite or NaN terminate this algorithm.

    If the element can have overflow to the right

        Let x be max(0, min(x, content width - content edge width)).

    If the element can have overflow to the left (under right-to-left
    conditions)

        Let x be min(0, max(x, content edge width - content width)). 

    Let y be max(0, min(y, content height - content edge height)).

    Align content x-coordinate x with the left of the content edge of the
    element and align content y-coordinate y with the top of the content edge
    of the element.
    
     If the aligning caused content to move queue a task to fire a simple event
    named scroll at the element, unless a task to fire that event at that
    element was already queued.

The scrollIntoView([top]) method must run these steps:

    If the element does not have any associated CSS layout box terminate these
    steps.
    
     Scroll the element into view with the align to top flag set if top is true
    or omitted.

The scrollTop attribute must return the result of running these steps:

    If the element does not have any associated CSS layout box or the element
    is the root element and the Document is in quirks mode return zero and
    terminate these steps.
    
     If the element is the root element return the value of scrollY.
    
     If the element is the HTML body element, the Document is in quirks mode,
    and the element does not have any overflow, return the value of scrollY.
    
     Return the y-coordinate of the content at the alignment point with the top
    of the content edge of the element.

When setting the scrollTop attribute these steps must be run:

    Let y be the given value.

    If the element does not have any associated CSS layout box, the element is
    the root element and the Document is in quirks mode, or the element has no
    overflow, terminate these steps.
    
     If the element is the root element invoke scroll() with zero as first
    argument and y as second.
    
     If the element is the HTML body element, the Document is in quirks mode,
    and the element does not have any vertical overflow, invoke scroll() with
    scrollX as first argument and y as second.

    Scroll the element to scrollLeft,y. 

The scrollLeft attribute must return the result of running these steps:

    If the element does not have any associated CSS layout box or the element
    is the root element and the Document is in quirks mode return zero and
    terminate these steps.
    
     If the element is the root element return the value of scrollX.
    
     If the element is the HTML body element, the Document is in quirks mode,
    and the element does not have any overflow, return the value of scrollX.
    
     Return the x-coordinate of the content at the alignment point with the
    left of the content edge of the element.

When setting the scrollLeft attribute these steps must be run:

    Let x be the given value.

    If the element does not have any associated CSS layout box, the element is
    the root element and the Document is in quirks mode, or the element has no
    overflow, terminate these steps.
    
     If the element is the root element invoke scroll() with x as first
    argument and zero as second.
    
     If the element is the HTML body element, the Document is in quirks mode,
    and the element does not have any vertical overflow, invoke scroll() with x
    as first argument and scrollY as second.

    Scroll the element to x,scrollTop. 

The scrollWidth attribute must return the result of running these steps:

    If the element does not have any associated CSS layout box return zero and
    terminate these steps.
    
     If the element is the root element and the Document is not in quirks mode
    return the value of innerWidth.
    
     If the element is the HTML body element and the Document is in quirks mode
    return the value of innerWidth.
    
     Return the computed value of the ‘padding-left’ property, plus the
    computed value of the ‘padding-right’, plus the content width of the
    element.

The scrollHeight attribute must return the result of running these steps:

    If the element does not have any associated CSS layout box return zero and
    terminate these steps.
    
     If the element is the root element and the Document is not in quirks mode
    return the value of innerHeight.
    
     If the element is the HTML body element and the Document is in quirks mode
    return the value of innerHeight.
    
     Return the computed value of the ‘padding-top’ property, plus the computed
    value of the ‘padding-bottom’, plus the content height of the element.

5.3. The clientTop, clientLeft, clientWidth, and clientHeight attributes

The clientTop, clientLeft, clientWidth, and clientHeight attributes must return
zero if the element does not have any associated CSS layout box or if the CSS
layout box is inline. Otherwise, these attributes must behave as defined in the
remainder of this section.

The clientTop attribute returns the computed value of the ‘border-top-width’
property plus the width of any scrollbar rendered between the top padding edge
and the top border edge.

The clientLeft attribute returns the computed value of the ‘border-left-width’
property plus the width of any scrollbar rendered between the left padding edge
and the left border edge.

The clientWidth attribute returns the viewport width excluding the size of a
rendered scroll bar (if any) if the element is the root element and the width
of the padding edge (excluding the width of any rendered scrollbar between the
padding edge and the border edge) otherwise.

The clientHeight attribute returns the viewport height excluding the size of a
rendered scroll bar (if any) if the element is the root element and the height
of the padding edge (excluding the width of any rendered scrollbar between the
padding edge and the border edge) otherwise.

6. Extensions to the HTMLElement Interface

[Supplemental] interface HTMLElement {
  readonly attribute Element offsetParent;
  readonly attribute long offsetTop;
  readonly attribute long offsetLeft;
  readonly attribute long offsetWidth;
  readonly attribute long offsetHeight;
};

6.1. The offsetParent, offsetTop, offsetLeft, offsetWidth, and offsetHeight 
     attributes

The offsetParent attribute must return the result of running these steps:

    If any of the following holds true return null and terminate this
    algorithm:
        The element does not have an associated CSS layout box.
        The element is the root element.
        The element is the HTML body element.
        The element's computed value of the ‘position’ property is fixed. 

    Return the nearest ancestor element of the element for which at least one
    of the following is true and terminate this algorithm if such an ancestor
    is found:
        The computed value of the ‘position’ property is not static.
        It is the HTML body element.
        The computed value of the ‘position’ property of the element is static
        and the ancestor is one of the following HTML elements: td, th, or
        table.

    Return null. 

The offsetTop attribute must return the result of running these steps:

    If the element is the HTML body element or does not have any associated CSS
    layout box return zero and terminate this algorithm.
    
    If the offsetParent of the element is null return the y-coordinate of the
    top border edge of the first CSS layout box associated with the element,
    relative to the initial containing block origin, and terminate this
    algorithm.
    
    Return the result of subtracting the y-coordinate of the top padding edge
    of the first CSS layout box associated with the offsetParent of the element
    from the y-coordinate of the top border edge of the first CSS layout box
    associated with the element, relative to the initial containing block
    origin.
    
     An inline element that consists of multiple line boxes will only have its
    first CSS layout box considered.

The offsetLeft attribute must return the result of running these steps:

    If the element is the HTML body element or does not have any associated CSS
    layout box return zero and terminate this algorithm.
    
    If the offsetParent of the element is null return the x-coordinate of the
    left border edge of the first CSS layout box associated with the element,
    relative to the initial containing block origin, and terminate this
    algorithm.
    
    Return the result of subtracting the x-coordinate of the left padding edge
    of the first CSS layout box associated with the offsetParent of the element
    from the x-coordinate of the left border edge of the first CSS layout box
    associated with the element, relative to the initial containing block
    origin.

The offsetWidth attribute must return the result of running these steps:

    If the element does not have any associated CSS layout box return zero and
    terminate this algorithm.
    
    Return the border edge width of the first CSS layout box associated with
    the element.

The offsetHeight attribute must return the result of running these steps:

    If the element does not have any associated CSS layout box return zero and
    terminate this algorithm.
    
    Return the border edge height of the first CSS layout box associated with
    the element.

7. Extensions to the Range Interface

[Supplemental] interface Range {
  ClientRectList getClientRects();
  ClientRect getBoundingClientRect();
};

The objects the methods described below return must be static.

The getClientRects() method, when invoked, must return an empty ClientRectList
object if the range is not in the document and otherwise a ClientRectList
object containing a list of ClientRect objects in content order that matches
the following constraints:

    For each element selected by the range, whose parent is not selected by the
    range, include the border boxes returned by invoking getClientRects() on
    the element.

    For each Text node selected or partially selected by the range (including
    when the boundary-points are identical), include a ClientRect object (for
    the part that is selected, not the whole line box). The bounds of these
    ClientRect objects are computed using font metrics; thus, for horizontal
    writing, the vertical dimension of each box is determined by the font
    ascent and descent, and the horizontal dimension by the text advance width.

The getBoundingClientRect() method, when invoked, must return the result of the
following algorithm:

    Let list be the result of invoking getClientRects() on the same range this
    method was invoked on.
    
    If list is empty return a ClientRect object whose top, right, bottom and
    left members are zero.
    
    Otherwise, return a ClientRect object describing the smallest rectangle
    that includes the first rectangle in list and all of the remaining
    rectangles of which the height or width is not zero.

8. Extensions to the MouseEvent Interface

[Supplemental] interface MouseEvent {
  readonly attribute long screenX;
  readonly attribute long screenY;

  readonly attribute long pageX;
  readonly attribute long pageY;

  readonly attribute long clientX;
  readonly attribute long clientY;
  readonly attribute long x;
  readonly attribute long y;

  readonly attribute long offsetX;
  readonly attribute long offsetY;
};

The object IDL fragment redefines some members. Can we resolve this somehow?

The screenX attribute must return the x-coordinate of the position where the
event occurred relative to the origin of the screen.

The screenY attribute must return the y-coordinate of the position where the
event occurred relative to the origin of the screen.

The pageX attribute must return the horizontal coordinate of the position where
the event occurred relative to the origin of the initial containing block.

The pageY attribute must return the y-coordinate of the position where the
event occurred relative to the origin of the initial containing block.

The clientX attribute must return the x-coordinate of the position where the
event occurred relative to the origin of the viewport.

The clientY attribute must return the y-coordinate of the position where the
event occurred relative to the origin of the viewport.

The x attribute must return the value of clientX.

The y attribute must return the value of clientY.

The offsetX attribute must return the x-coordinate of the position where the
event occurred relative to the origin of the padding edge of the target node.

The offsetY attribute must return the y-coordinate of the position where the
event occurred relative to the origin of the padding edge of the target node.

9. Rectangles

9.1. The ClientRectList Interface

The ClientRectList object consists of an ordered list of ClientRect objects.

interface ClientRectList {
  readonly attribute unsigned long length;
  getter ClientRect item(unsigned long index);
};

The length attribute must return the total number of ClientRect objects
associated with the object.

The item(index) method, when invoked, must raise an INDEX_SIZE_ERR exception
when index is negative or greater than the number of ClientRect objects
associated with the object. Otherwise, the ClientRect object at index must be
returned.

9.2. The ClientRect Interface

Objects implementing the ClientRect interface represent a rectangular box. The
type of box is specified by the method that returns a ClientRect object.

interface ClientRect {
  readonly attribute float top;
  readonly attribute float right;
  readonly attribute float bottom;
  readonly attribute float left;
  readonly attribute float width;
  readonly attribute float height;
};

The top attribute must return the y-coordinate, relative to the viewport
origin, of the top of the rectangle box.

The right attribute must return the x-coordinate, relative to the viewport
origin, of the right of the rectangle box.

The bottom attribute must return the y-coordinate, relative to the viewport
origin, of the bottom of the rectangle box.

The left attribute must return the x-coordinate, relative to the viewport
origin, of the left of the rectangle box.

The width attribute must return the width of the rectangle box.

This is identical to right minus left.

The height attribute must return the height of the rectangle box.

This is identical to bottom minus top.

References

All references are normative.

[CSS21]
    Cascading Style Sheets Level 2 Revision 1, B. Bos, T. Çelik, I. Hickson, H.
    Wium Lie. W3C.
[CSSOM]
    CSSOM (work in progress), A. van Kesteren. W3C. 
[DOM2Events]
    Document Object Model (DOM) Level 2 Events Specification, T. Pixley. W3C. 
[DOM2TR]
    Document Object Model (DOM) Level 2 Traversal and Range Specification, J.
    Kesselman, J. Robie, M. Champion, P. Sharpe, V. Apparao, L. Wood. W3C.
[DOM3Core]
    Document Object Model (DOM) Level 3 Core Specification, A. Le Hors, P. Le
    Hégaret, L. Wood, G. Nicol, J. Robie, M. Champion, S. Byrne. W3C.
[HTML5]
    HTML5 (work in progress), I. Hickson. W3C. 
    HTML5 (work in progress), I. Hickson. WHATWG. 
[RFC2119]
    Key words for use in RFCs to Indicate Requirement Levels, S. Bradner. IETF.
[SVG]
    Scalable Vector Graphics (SVG) 1.1 Specification, J. Ferraiolo, 藤沢 淳, D.
    Jackson. W3C.
[WebIDL]
    Web IDL (work in progress), C. McCormack. W3C. 

Acknowledgments

The editor would like to thank Alexey Feldgendler, Björn Höhrmann, David Vest,
Garrett Smith, Hallvord R. M. Steen, Luiz Agostini, Maciej Stachowiak, Michael
Dyck, Mike Wilson, Morten Stenshorne, Peter-Paul Koch, Rachel Kmetz, Robert
O'Callahan, Sam Weinig, Simon Pieters, Sylvain Galineau, Tarquin Wilton-Jones,
Thomas Moore, and Xiaomei Ji for their contributions to this document.

Special thanks to the Microsoft employees who first implemented many of the
features specified in this draft, which were first widely deployed by the
Windows Internet Explorer browser.
******************************************************************************/