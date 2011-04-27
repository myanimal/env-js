/******************************************************************************
http://html5.org/specs/dom-parsing.html

DOM Parsing and Serialization
Work in Progress — Last Update 12 March 2011

Editor
    Ms2ger <ms2ger@gmail.com> 
Version history
    http://bitbucket.org/ms2ger/dom-parsing-and-serialization 

Abstract

Table of contents

    Issues
    1 Conformance
        1.1 Dependencies
        1.2 Extensibility
    2 Terminology
    3 The DOMParser interface
    4 The XMLSerializer interface
    5 Extensions to the Element interface
        5.1 innerHTML
        5.2 outerHTML
        5.3 insertAdjacentHTML()
    6 Extensions to the Range interface
    References
    Acknowledgements

Issues

Various issues are listed in the rest of the document.

This specification currently requires using the XML Parser for some APIs, when in an XML document. It is unclear whether consensus can be found for this approach.
1 Conformance

All diagrams, examples, and notes in this specification are non-normative, as are all sections explicitly marked non-normative. Everything else in this specification is normative.

The key words "MUST", "MUST NOT", "REQUIRED", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in the normative parts of this document are to be interpreted as described in RFC2119. For readability, these words do not appear in all uppercase letters in this specification. [RFC2119]

Requirements phrased in the imperative as part of algorithms (such as "strip any leading space characters" or "return false and abort these steps") are to be interpreted with the meaning of the key word ("must", "should", "may", etc) used in introducing the algorithm.

Conformance requirements phrased as algorithms or specific steps may be implemented in any manner, so long as the end result is equivalent. (In particular, the algorithms defined in this specification are intended to be easy to follow, and not intended to be performant.)

User agents may impose implementation-specific limits on otherwise unconstrained inputs, e.g. to prevent denial of service attacks, to guard against running out of memory, or to work around platform-specific limitations.

When a method or an attribute is said to call another method or attribute, the user agent must invoke its internal API for that attribute or method so that e.g. the author can't change the behavior by overriding attributes or methods with custom properties or functions in ECMAScript.

Unless otherwise stated, string comparisons are done in a case-sensitive manner.
1.1 Dependencies

The IDL fragments in this specification must be interpreted as required for conforming IDL fragments, as described in the Web IDL specification. [WEBIDL]

Some of the terms used in this specification are defined in DOM Core, DOM Range and HTML. [DOMCORE] [DOMRANGE] [HTML]
1.2 Extensibility

Vendor-specific proprietary extensions to this specification are strongly discouraged. Authors must not use such extensions, as doing so reduces interoperability and fragments the user base, allowing only users of specific user agents to access the content in question.

If vendor-specific extensions are needed, the members should be prefixed by vendor-specific strings to prevent clashes with future versions of this specification. Extensions must be defined so that the use of extensions neither contradicts nor causes the non-conformance of functionality defined in the specification.

When vendor-neutral extensions to this specification are needed, either this specification can be updated accordingly, or an extension specification can be written that overrides the requirements in this specification. When someone applying this specification to their activities decides that they will recognise the requirements of such an extension specification, it becomes an applicable specification for the purposes of conformance requirements in this specification.
2 Terminology

The term context object means the object on which the method or attribute being discussed was called.
3 The DOMParser interface

interface XMLDocument : Document {
};

[Constructor]
interface DOMParser {
  Document parseFromString(DOMString str, DOMString contentType);
};

The parseFromString(str, contentType) method must run the following steps:

    If contentType isn't text/xml, application/xml or application/xhtml+xml, raise a NOT_SUPPORTED_ERR exception and abort these steps.

    Parse str with a namespace-enabled XML parser.

    If the previous step didn't return an error, return the newly created Document.

    Otherwise, let document a newly-created XMLDocument node. Append an Element node to it, with its localName set to parsererror and its namespaceURI set to http://www.mozilla.org/newlayout/xml/parsererror.xml. User agents may append nodes to this element, for example to describe the nature of the error. 

4 The XMLSerializer interface

[Constructor]
interface XMLSerializer {
  DOMString serializeToString(Node root);
};

The serializeToString(root) method must run the appropriate steps, depending on root's interface:

Element
Document

    Run the XML fragment serialization algorithm on root. If this threw an exception, allow that exception to propagate out from this algorithm. Otherwise, return the returned string. 
Comment

    Let markup the concatenation of "<!--", root's data, and "-->".

    If markup matches the Comment production, return markup. Otherwise, throw an INVALID_STATE_ERR exception. 
DocumentFragment
DocumentType
ProcessingInstruction
Text
    You tell me. 

5 Extensions to the Element interface

[Supplemental]
interface Element {
  attribute DOMString innerHTML;
  attribute DOMString outerHTML;
  void insertAdjacentHTML(DOMString position, DOMString text);
};

5.1 innerHTML

The innerHTML IDL attribute represents the markup of the Element's contents.

element . innerHTML [ = value ]

    Returns a fragment of HTML or XML that represents the element's contents.

    Can be set, to replace the contents of the element with nodes parsed from the given string.

    In the case of an XML document, will throw an INVALID_STATE_ERR if the Element cannot be serialized to XML, and a SYNTAX_ERR if the given string is not well-formed. 

On getting, if the Element's ownerDocument is an HTML document, then the attribute must return the result of running the HTML fragment serialization algorithm on the Element; otherwise, the Element's ownerDocument is an XML document, and the attribute must return the result of running the XML fragment serialization algorithm on the Element instead (this might raise an exception instead of returning a string).

On setting, the following steps must be run:

    If the Element's ownerDocument is an HTML document: Invoke the HTML fragment parsing algorithm.

    If the Element's ownerDocument is an XML document: Invoke the XML fragment parsing algorithm.

    In either case, the algorithm must be invoked with the given value as the input, and the context object as the context element.

    If this raises an exception, then abort these steps.

    Otherwise, let new children be the nodes returned.

    Remove the child nodes of the context object, firing appropriate mutation events.

    Let target document be the context object's ownerDocument.

    Set the ownerDocument of all the Nodes in new children to the target document.

    Append all the new children nodes to the context object, preserving their order, and firing mutation events as if a DocumentFragment containing the new children had been inserted. 

5.2 outerHTML

The outerHTML IDL attribute represents the markup of the Element and its contents.

element . outerHTML [ = value ]

    Returns a fragment of HTML or XML that represents the element and its contents.

    Can be set, to replace the element with nodes parsed from the given string.

    In the case of an XML document, will throw an INVALID_STATE_ERR if the element cannot be serialized to XML, and a SYNTAX_ERR if the given string is not well-formed.

    Throws a NO_MODIFICATION_ALLOWED_ERR exception if the parent of the element is the Document node. 

On getting, if the Element's ownerDocument is an HTML document, then the attribute must return the result of running the HTML fragment serialization algorithm on a fictional node whose only child is context object; otherwise, the Element's ownerDocument is an XML document, and the attribute must return the result of running the XML fragment serialization algorithm on that fictional node instead (this might raise an exception instead of returning a string).

On setting, the following steps must be run:

    Let parent be the context object's parentNode.

    If parent is null, abort these steps. There would be no way to obtain a reference to the nodes created even if the remaining steps were run.

    If parent is a Document object, throw a NO_MODIFICATION_ALLOWED_ERR exception and abort these steps.

    If parent is a DocumentFragment node, let parent be a new with body as its local name and the HTML namespace as its namespace.

    If the context object's ownerDocument is an HTML document: Invoke the HTML fragment parsing algorithm.

    If the context object's ownerDocument is an XML document: Invoke the XML fragment parsing algorithm.

    In either case, the algorithm must be invoked with the string being assigned into the outerHTML attribute as the input, and parent as the context element.

    If this raises an exception, then abort these steps.

    Otherwise, let new children be the nodes returned.

    Set the ownerDocument of all the nodes in new children to the context object's ownerDocument.

    Remove the context object from its parent node, firing mutation events as appropriate, and then insert in its place all the new children nodes, preserving their order, and again firing mutation events as if a DocumentFragment containing the new children had been inserted. 

5.3 insertAdjacentHTML()

element . insertAdjacentHTML(position, text)

    Parses the given string text as HTML or XML and inserts the resulting nodes into the tree in the position given by the position argument, as follows:

    "beforebegin"
        Before the element itself. 
    "afterbegin"
        Just inside the element, before its first child. 
    "beforeend"
        Just inside the element, after its last child. 
    "afterend"
        After the element itself. 

    Throws a SYNTAX_ERR exception if the arguments have invalid values (e.g., in the case of an XML document, if the given string is not well-formed).

    Throws a NO_MODIFICATION_ALLOWED_ERR exception if the given position isn't possible (e.g. inserting elements after the root element of a Document). 

The insertAdjacentHTML(position, text) method, when invoked, must run the following algorithm:

    Use the first matching item from this list:

    If position is an ASCII case-insensitive match for the string "beforebegin"
    If position is an ASCII case-insensitive match for the string "afterend"

        Let context be the context object's parentNode.

        If context is null, abort these steps.

        If context is a Document object, throw a NO_MODIFICATION_ALLOWED_ERR exception and abort these steps. 
    If position is an ASCII case-insensitive match for the string "afterbegin"
    If position is an ASCII case-insensitive match for the string "beforeend"

        Let context be the context object. 
    Otherwise

        Throw a SYNTAX_ERR exception. 

    If the context object's ownerDocument is an HTML document: Invoke the HTML fragment parsing algorithm.

    If the context object's ownerDocument is an XML document: Invoke the XML fragment parsing algorithm.

    In either case, the algorithm must be invoked with text as the input, and context as the context element.

    If this raises an exception, then abort these steps.

    Otherwise, let new children be the nodes returned.

    Set the ownerDocument of all the Nodes in new children to the target document.

    Use the first matching item from this list:

    If position is an ASCII case-insensitive match for the string "beforebegin"

        Insert all the new children nodes immediately before the context object. 
    If position is an ASCII case-insensitive match for the string "afterbegin"

        Insert all the new children nodes before the first child of the context object, if there is one. If there is no such child, append them all to the context object. 
    If position is an ASCII case-insensitive match for the string "beforeend"

        Append all the new children nodes to the context object. 
    If position is an ASCII case-insensitive match for the string "afterend"

        Insert all the new children nodes immediately after the context object. 

    The new children nodes must be inserted in a manner that preserves their order and fires mutation events as if a DocumentFragment containing the new children had been inserted. 

6 Extensions to the Range interface

[Supplemental]
interface Range {
  DocumentFragment createContextualFragment(DOMString fragment);
};

fragment = range . createContextualFragment(fragment)

    Returns a DocumentFragment, created from the markup string given. 

The createContextualFragment(fragment) method must run the following steps:

    If the context object's start's node is null, raise an INVALID_STATE_ERR exception and abort these steps.

    Let node the context object's start's node.

    Let element be as follows, depending on node's interface:

    Element
        node 
    Text
        node's parentElement 
    …
        You tell me 

    If either element is null or the following are all true:
        element's ownerDocument is an HTML document,
        element's local name is "html", and
        element's namespace is the HTML namespace; 

    let element be a new Element with "body" as its local name and the HTML namespace as its namespace.

    If the node's document is an HTML document: Invoke the HTML fragment parsing algorithm.

    If the node's document is an XML document: Invoke the XML fragment parsing algorithm.

    In either case, the algorithm must be invoked with fragment as the input and element as the context element.
    If this raises an exception, then abort these steps. Otherwise, let new children be the nodes returned.
    Unmark all scripts in new children as "already started".
    Set the ownerDocument of all the nodes in new children to the context object's root's ownerDocument.
    Let fragment be a new DocumentFragment and append all new children to it.
    Return fragment. 

References

All references are normative unless marked "Non-normative".

[DOMCORE]
    DOM Core, A. van Kesteren and Ms2ger. W3C. 
[DOMRANGE]
    DOM Range, Ms2ger. WHATWG. 
[HTML]
    HTML, I. Hickson. WHATWG. 
[RFC2119]
    Key words for use in RFCs to Indicate Requirement Levels, S. Bradner. IETF. 
[WEBIDL]
    Web IDL, C. McCormack and S. Weinig. W3C. 

Acknowledgements

Thanks to Aryeh Gregor and Henri Sivonen for their useful comments.

Special thanks to Ian Hickson for defining the innerHTML and outerHTML attributes, and the insertAdjacentHTML() method in HTML. [HTML]