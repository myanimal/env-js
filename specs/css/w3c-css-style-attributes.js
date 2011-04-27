/******************************************************************************
http://dev.w3.org/csswg/css-style-attr/

W3C
CSS Style Attributes
Editor's Draft 28 September 2010

This version:
    http://dev.w3.org/csswg/css-style-attr/ 
Latest version:
    http://www.w3.org/TR/css-style-attr 
Previous version:
    http://www.w3.org/TR/2010/WD-css-style-attr-20100121/ 
Editors:
    Tantek Çelik (Invited Expert, formerly Microsoft Corporation)
    <tantek@cs.stanford.edu>
    Elika J. Etemad (Invited Expert) 
Previous Editors:
    Bert Bos (W3C), <bert@w3.org> 
    Marc Attinasi (AOL/Netscape), <attinasi@netscape.com> 

Copyright © 2010 W3C® (MIT, ERCIM, Keio), All Rights Reserved. W3C liability,
trademark and document use rules apply.

Abstract

Markup languages such as HTML [HTML401] and SVG [SVG11] provide a style
attribute on most elements, to hold inline style information that applies to
those elements. One of the possible style sheet languages is CSS. This draft
describes the syntax and interpretation of the CSS fragment that can be used in
such style attributes.

Status of this document

This is a public copy of the editors' draft. It is provided for discussion only
and may change at any moment. Its publication here does not imply endorsement
of its contents by W3C. Don't cite this document other than as work in
progress.

The (archived) public mailing list www-style@w3.org (see instructions) is
preferred for discussion of this specification. When sending e-mail, please put
the text “css-style-attr” in the subject, preferably like this:
“[css-style-attr] …summary of comment…”

This document was produced by the CSS Working Group (part of the Style
Activity).

This document was produced by a group operating under the 5 February 2004 W3C
Patent Policy. W3C maintains a public list of any patent disclosures made in
connection with the deliverables of the group; that page also includes
instructions for disclosing a patent. An individual who has actual knowledge of
a patent which the individual believes contains Essential Claim(s) must
disclose the information in accordance with section 6 of the W3C Patent Policy.

For this specification to exit the CR stage, the following conditions shall be
met:

    There must be at least two interoperable implementations. For the purposes
    of this criterion, we define the following terms:

    interoperable

        passing the respective test case(s) in the CSS test suite, or, if the
        implementation is not a Web browser, an equivalent test. Every relevant
        test in the test suite should have an equivalent test created if such a
        user agent (UA) is to be used to claim interoperability. In addition if
        such a UA is to be used to claim interoperability, then there must one
        or more additional UAs which can also pass those equivalent tests in
        the same way for the purpose of interoperability. The equivalent tests
        must be made publicly available for the purposes of peer review.

    implementation

        a user agent which:
            implements the specification.

            is available (i.e. publicly downloadable or available through some
            other public point of sale mechanism). This is the "show me"
            requirement.
            
            is shipped, or is a "nightly build" (i.e., a development version
            for the next release), but is not experimental (i.e., a version
            specifically designed to pass the test suite and not intended for
            daily usage going forward).

    A minimum of three months of the CR period must elapse. That is, this
    specification will not exit CR before (DATE OF PUBLICATION PLUS THREE
    MONTHS). When the specification exits CR, an implementation report will be
    published. At this point, no such report exists.

A CSS Style Attributes Test Suite will be developed during the Candidate
Recommendation phase of this CSS Style Attributes specification.

Table of contents

    1. Introduction
    2. Conformance
    3. Syntax and Parsing
    4. Cascading and Interpretation
    5. Acknowledgments
    6. References
        Normative references
        Informative references 

1. Introduction

Some document formats have a style attribute to permit the author to directly
apply style information to specific elements in documents. If a document format
defines a style attribute (whether named ‘style’ or something else) and the
attribute accepts CSS as its value, then this specification defines that style
attribute’s syntax and interpretation.

The following example shows the use of the style attribute in HTML [HTML401]:

<p style="color: #090; line-height: 1.2">...</p>

2. Conformance

A document or implementation cannot conform to CSS Style Attributes alone, but
can claim conformance to CSS Style Attributes if it satisfies the conformance
requirements in this specification when implementing CSS together with style
attribute handling as defined in a document language that has one or more CSS
style attributes.

Conformance to CSS Style Attributes is defined for two classes:

document
    A document represented in a document language that defines a style
    attribute for one or more of its elements.
interpreter
    Someone or something that interprets the semantics of a document and its
    associated style information. (Most CSS user agents fall under this
    category.)

The conformance requirements are expressed with a combination of descriptive
assertions and RFC 2119 terminology. The key words "MUST", "MUST NOT",
"REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY",
and "OPTIONAL" in the normative parts of this document are to be interpreted as
described in RFC 2119. However, for readability, these words do not appear in
all uppercase letters in this specification. All of the text of this
specification is normative except sections explicitly marked as non-normative,
examples, and notes. [RFC2119]

Examples in this specification are introduced with the words "for example" or
are set apart from the normative text with class="example", like this:

This is an example of an informative example.

Informative notes begin with the word "Note" and are set apart from the
normative text with class="note", like this:

Note, this is an informative note.

3. Syntax and Parsing

The value of the style attribute must match the syntax of the contents of a CSS
declaration block (excluding the delimiting braces), whose formal grammar is
given below in the terms and conventions of the CSS core grammar:

declaration-list
  : S* declaration? [ ';' S* declaration? ]*
  ;

Note that following the CSS2.1 convention, comment tokens are not shown in the
rule above.

The interpreter must parse the style attribute's value using the same
forward-compatible parsing rules that apply to parsing declaration block
contents in a normal CSS style sheet. See chapter 4 of the CSS2.1 specification
for details. [CSS21]

Note that because there is no open brace delimiting the declaration list in the
CSS style attribute syntax, a close brace (}) in the style attribute's value
does not terminate the style data: it is merely an invalid token.

4. Cascading and Interpretation

The declarations in a style attribute apply to the element to which the
attribute belongs. In the cascade, these declarations are considered to have
author origin and a specificity higher than any selector. CSS2.1 defines how
style sheets and style attributes are cascaded together. [CSS21] Relative URLs
in the style data must be resolved relative to the style attribute's element
(or to the document if per-element resolution is not defined) when the
attribute's value is parsed.

Aside from the differences in cascading, the declarations in a style attribute
must be interpreted exactly as if they were given in a CSS style rule that
applies to the element.

The CSS Working Group strongly recommends that document languages do not allow
multiple CSS style attributes on a single element. If a document language
allows multiple CSS style attributes, each must be parsed independently and
treated as a separate style rule, the ordering of which should be defined by
the document language, else is undefined.

5. Acknowledgments

Thanks to feedback from Daniel Glazman, Ian Hickson, Eric A. Meyer, Björn
Höhrmann.

6. References

Normative references

[CSS21]
    Bert Bos; et al. Cascading Style Sheets Level 2 Revision 1 (CSS 2.1)
    Specification. 8 September 2009. W3C Candidate Recommendation. (Work in
    progress.) URL: http://www.w3.org/TR/2009/CR-CSS2-20090908
[RFC2119]
    S. Bradner. Key words for use in RFCs to Indicate Requirement Levels.
    Internet RFC 2119. URL: http://www.ietf.org/rfc/rfc2119.txt

Informative references

[HTML401]
    David Raggett; Ian Jacobs; Arnaud Le Hors. HTML 4.01 Specification. 24
    December 1999. W3C Recommendation. URL:
    http://www.w3.org/TR/1999/REC-html401-19991224
[SVG11]
 

******************************************************************************/