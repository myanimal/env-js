/******************************************************************************
http://dev.w3.org/csswg/css3-values/

W3C
CSS3 Values and Units
Editor's Draft 21 March 2011

This version:
    http://www.w3.org/TR/2011/ED-css3-values-20110321 
Latest version:
    http://www.w3.org/TR/css3-values 
Previous version:
    http://www.w3.org/TR/2005/WD-css3-values-20050726 
Editors:
    Håkon Wium Lie, Opera Software <howcome@opera.com> 
    Chris Lilley, W3C <chris@w3.org> 

Copyright © 2011 W3C® (MIT, ERCIM, Keio), All Rights Reserved. W3C liability,
trademark and document use rules apply.

Abstract

This CSS3 module describes the various values and units that CSS properties
accept. Also, it describes how values are computed from "specified" through
"computed" and "used" into "actual" values. The main purpose of this module is
to define common values and units in one specification which can be referred to
by other modules. As such, it does not make sense to claim conformance with
this module alone.

Status of this document

This is a public copy of the editors' draft. It is provided for discussion only
and may change at any moment. Its publication here does not imply endorsement
of its contents by W3C. Don't cite this document other than as work in
progress.

The (archived) public mailing list www-style@w3.org (see instructions) is
preferred for discussion of this specification. When sending e-mail, please put
the text “css3-values” in the subject, preferably like this: “[css3-values]
…summary of comment…”

This document was produced by the CSS Working Group (part of the Style
Activity).

This document was produced by a group operating under the 5 February 2004 W3C
Patent Policy. W3C maintains a public list of any patent disclosures made in
connection with the deliverables of the group; that page also includes
instructions for disclosing a patent. An individual who has actual knowledge of
a patent which the individual believes contains Essential Claim(s) must
disclose the information in accordance with section 6 of the W3C Patent Policy.

All features described in this specification that also exist in CSS 2.1 [CSS21]
are intended to be backwards compatible. In case of conflict between this draft
and CSS 2.1 [CSS21], CSS 2.1 probably represents the intention of the CSS WG
better than this draft (other than on values and units that are new to CSS3).

This is a draft of a module of CSS level 3. It will probably be bundled with
some other modules before it becomes a W3C Recommendation.

Table of contents

    1. Dependencies on other modules
    2. Introduction
    3. Value definitions
    4. Syntax and terminology
        4.1. Integers
        4.2. Numbers
        4.3. Numbers with unit identifiers
        4.4. Identifiers
        4.5. Strings
        4.6. Functional notation 
    5. Keywords
    6. Generic data types
        6.1. <integer>
        6.2. <number>
        6.3. <length>
            6.3.1. Absolute length units: cm, mm. in, pt, pc
            6.3.2. Relative length units
                6.3.2.1. The ‘em’ unit
                6.3.2.2. The ‘ex’ unit
                6.3.2.3. The ‘px’ unit
                6.3.2.4. The ‘rem’ unit
                6.3.2.5. The ‘vw’ unit
                6.3.2.6. The ‘vh’ unit
                6.3.2.7. The ‘vm’ unit 
            6.3.3. The ‘calc’, ‘min’ and ‘max’ functions 
        6.4. <string>
        6.5. <color>
        6.6. <percentage>
        6.7. <angle>
        6.8. <time>
        6.9. <frequency>
        6.10. <attr>
        6.11. <url>
        6.12. <image>
        6.13. <fraction>
            6.13.1. The ‘fr’ unit 
        6.14. <grid>
            6.14.1. The ‘gr’ unit 
    7. Specified, computed, used, and actual values
        7.1. Finding the specified value
        7.2. Finding the computed value
        7.3. Finding the used value
        7.4. Finding the actual value 
    Acknowledgments
    References
        Normative references
        Other references 
    Index 

1. Dependencies on other modules

This CSS3 module depends on the following other CSS3 modules:

    Cascading and Inheritance [CSS3CASCADE], which describes how to find the
    resulting value from several competing values. Also, it describes how to
    replace the "inherit" keyword with the inherited value.

    Syntax [CSS3SYN], which describes the syntax of values at the lexical level.

    Color [CSS3COLOR], which defines additional values used for some properties
    that control color of text, borders, etc

    Fonts [CSS3FONT], which describes additional values used for font-related
    properties

2. Introduction

By setting property values on elements in a document, style sheets express the
appearance of the document. In order to express rich designs, a wide range of
values and associated units are necessary. This specification describes the
various types of values and units that can be used in CSS style sheets.

3. Value definitions

Each CSS property has a value definition field in the property description. The
value definition describes what types of values the property accepts. The
syntax used in the value definitions field is defined in [CSS3SYN].

Here are some sample properties with corresponding value definition fields:
Property 	Value definition field
min-width 	<length> | <percentage> | inherit
outline-color 	<color> | invert | inherit
orphans 	<integer> | inherit
pitch 	<frequency> | x-low | low | medium | high | x-high | inherit
string-set 	[[ <identifier> <content-list>] [, <identifier> <content-list>]* ] | none

The value definition fields contain keywords, data types (which appear between
"<" and ">", and information on how they can be combined. Generic data types
(<length> being the most widely used) that can be used by many properties are
described in this specification, while more specific data types (e.g.,
<border-width>) are described in the corresponding modules.

4. Syntax and terminology

The generic data types described in the next sections use some common syntactic
building blocks and terms that are described in this section.

4.1. Integers

An integer is one or more decimal digits "0" to "9". Integers may be preceded
by "-" or "+" to indicate the sign.

orphans: 3

4.2. Numbers

A number is either an integer, or zero or more decimal digits followed by a dot
(.) followed by one or more decimal digits. Numbers may be preceded by "-" or
"+" to indicate the sign.

line-height: 1.2

4.3. Numbers with unit identifiers

A number with a unit identifier is a number immediately followed by a unit
identifier.

border-left: -1.2em

4.4. Identifiers

An identifier is an sequence of characters. Identifiers cannot start with a
digit, and there are other restrictions [CSS3SYN] on what characters an
identifier can contain. Identifiers must not be quoted.

pitch-range: inherit;
counter-increment: header;

4.5. Strings

A string is a sequence of characters enclosed by double quotes or single
quotes. Double quotes cannot occur inside double quotes, unless escaped (as
‘\"’ or as ‘\22’). Analogously for single quotes ("\'" or "\27").

content: "this is a ‘string’.";
content: "this is a \"string\".";
content: ‘this is a "string".’;
content: ‘this is a \’string\‘.’;

A string cannot directly contain a newline. To include a newline in a string,
use the escape "\A" (hexadecimal A is the line feed character in Unicode
(U+000A), but represents the generic notion of "newline" in CSS). See the
‘content’ property for an example.

It is possible to break strings over several lines, for aesthetic or other
reasons, but in such a case the newline itself has to be escaped with a
backslash (\). The newline is subsequently removed from the string. For
instance, the following two selectors are exactly the same:

a[title="a not s\
o very long title"] {/*...*\/}
a[title="a not so very long title"] {/*...*\/}

4.6. Functional notation

Some values use a functional notation to type values and to and lump values
together. The syntax starts with the name of the function followed by a left
parenthesis followed by optional whitespace followed by the argument(s) to the
functions followed by optional whitespace followed by a right parenthesis. If a
function takes more than one argument, the arguments are separated by a comma
(‘,’) with optional whitespace before and after the comma.

background: url(http://www.example.org/image); color: rgb(100, 200, 50 );

Some properties accept space- or comma-separated lists of values. A value that
is composed of several values with spaces or commas between them, is called a
compound value. A value that is not a compound value is a simple value.

5. Keywords

In the value definition fields, keywords appear literally. Keywords are
identifiers.

For example, here is the value definition for the ‘border-collapse’ property:

Value: collapse | separate

And here is an example of its use:

table { border-collapse: separate }

All CSS3 properties accept the keyword values ‘inherit’ and ‘initial’, as
described in [CSS3CASCADE].

Would it be useful to have a ‘default’ value, defined to be equivalent to
‘inherit’ for properties that are inherited by default and equivalent to
‘initial’ for properties that are not inherited by default? This might be
easier for authors to use than ‘initial’ and ‘inherit’ since it wouldn't
require thinking about whether a property is inherited by default or not (which
isn't obvious for some properties, such as text-decoration and visibility).

6. Generic data types

6.1. <integer>

Integer values are denoted by <integer> in the value definitions. Properties
may restrict the integer value to some range. If the value is outside the
allowed range, the declaration is ignored.

6.2. <number>

Number values are denoted by <number> in the value definitions. Properties may
restrict the number value to some range. If the value is outside the allowed
range, the declaration is ignored.

6.3. <length>

Lengths are denoted by <length> in the property definitions. Lengths refer to
horizontal or vertical measurements. Lengths are numbers with a unit
identifier. After the ‘0’ length, the unit identifier is optional.

Some properties allow negative length values, but this may complicate the
formatting and there may be implementation-specific limits. If a negative
length value is allowed but cannot be supported, it should be converted to the
nearest value that can be supported.

There are several types of length units. Relative length units specify a length
relative to other lengths, while absolute length units express fixed lengths.

6.3.1. Absolute length units: cm, mm. in, pt, pc

Absolute length units are useful when the physical properties of the output
medium are known. The absolute units are:

unit 	definition
cm 	centimeters
mm 	millimeters
in 	inches; 1 inch is equal to 2.54 centimeters.
pt 	points; 1pt is equal to 1/72 inch.
pc 	picas; 1 pica is equal to 12 points.

h1 { margin: 0.5in }      /* inches  *\/
h2 { line-height: 3cm }   /* centimeters *\/
h3 { word-spacing: 4mm }  /* millimeters *\/
h4 { font-size: 12pt }    /* points *\/
h4 { font-size: 1pc }     /* picas *\/

In cases where the specified length cannot be supported, user agents must
approximate it in the actual value.

6.3.2. Relative length units

Relative units are:
unit 	relative to
em 	the font size of the element (or, to the parent element's font size if set on the ‘font-size’ property)
ex 	the x-height of the element's font
px 	viewing device
rem 	the font size of the root element
vw 	the viewport's width
vh 	the viewport's height
vm 	the viewport's height or width, whichever is smaller of the two
ch 	The width of the "0" (ZERO, U+0030) glyph found in the font for the font size used to render. If the "0" glyph is not found in the font, the average character width may be used. How is the "average character width" found?

6.3.2.1. The ‘em’ unit

The em unit is equal to the computed value of the ‘font-size’ property of the
element on which it is used. The exception is when "em" occurs in the value of
the ‘font-size’ property itself, in which case it refers to the font size of
the parent element.

When specified on the ‘font-size’ property of the root element, the ‘em’ units
refer to the property's initial value.

The rule:

h1 { line-height: 1.2em }

means that the line height of h1 elements will be 20% greater than the font
size of the elements. On the other hand:

h1 { font-size: 1.2em }

means that the font size of h1 elements will be 20% greater than the font size
inherited by h1 elements.

h1 { margin: 0.5em }      /* em *\/
h1 { margin: 1ex }        /* ex *\/
p  { font-size: 12px }    /* px *\/

6.3.2.2. The ‘ex’ unit

The ex unit is defined by the font's x-height. The x-height is so called
because it is often equal to the height of the lowercase "x". However, an ‘ex’
is defined even for fonts that do not contain an "x". Should we say that ex is
0.5em if no better value exists?

When specified on the ‘font-size’ property of the root element, the ‘ex’ units
refer to the property's initial value.

6.3.2.3. The ‘px’ unit

The pixel unit, px is relative to the resolution of the viewing device. For
example, the viewing device can be a computer display or a printer. Normally,
the pixel unit refers to physical pixels of the viewing device. However, if the
pixel density of the output device is very different from that of a typical
computer display, the user agent should rescale pixel values. It is recommended
that the reference pixel be the visual angle of one pixel on a device with a
pixel density of 96dpi and a distance from the reader of an arm's length. For a
nominal arm's length of 28 inches, the visual angle is therefore about 0.0213
degrees.

For reading at arm's length, 1px thus corresponds to about 0.26mm (1/96 inch).
When printed on a laser printer, meant for reading at a little less than arm's
length (55 cm, 21 inches), 1px is about 0.21mm. On a 300 dots-per-inch (dpi)
printer, that may be rounded up to 3 dots (0.25 mm); on a 600 dpi printer, it
can be rounded to 5 dots.

The two images below illustrate the effect of viewing distance on the size of a
pixel and the effect of a device's resolution. In the first image, a reading
distance of 71cm (28 inch) results in a px of 0.26mm, while a reading distance
of 3.5m (12 feet) requires a px of 1.3mm.

Showing that pixels must become larger if the viewing distance increases

In the second image, an area of 1px by 1px is covered by a single dot in a
low-resolution device (a computer screen), while the same area is covered by 16
dots in a higher resolution device (such as a 400 dpi laser printer).

Showing that more device pixels (dots) are needed to cover a 1px by 1px area on
a high-resolution device than on a low-res one

6.3.2.4. The ‘rem’ unit

The rem unit ("root em") is relative to the computed value of ‘font-size’ on
the root element.

When specified on the ‘font-size’ property of the root element, the ‘rem’ units
refer to the property's initial value.

6.3.2.5. The ‘vw’ unit

The vw unit is relative to the viewport's width. The viewport's width is equal
to 100 ‘vw’ units.

h1 { font-size: 8vw }

If the width of the viewport is 200mm, the font size of h1 elements will be
16mm ((8×200)/100). When the width of the viewport is changed (for example,
when the browser window is enlarged), lengths specified in the ‘vw’ unit are
scaled proportionally.

6.3.2.6. The ‘vh’ unit

The vh unit is relative to the viewport's height. The viewport's height is equal to 100 ‘vh’ units. When the height of the viewport is changed (for example, when the browser window is enlarged), lengths specified in the ‘vh’ unit are scaled proportionally.

6.3.2.7. The ‘vm’ unit

Do we need this now that we have the min() function?

The vm unit is relative to the viewport's height or width, whichever of the two
is smaller. The minimum of the viewport's width/height is equivalent to 100
‘vm’ units. When the height or width of the viewport is changed, lengths
specified in the ‘vm’ unit are scaled proportionally.

6.3.3. The ‘calc’, ‘min’ and ‘max’ functions

The calc(), min(), and max() functions can be used wherever length, frequency,
angle, time, or number values are allowed.

section {
  float: left;
  margin: 1em; border: solid 1px;
  width: calc(100%/3 - 2*1em - 2*1px);
}

p {
  margin: calc(1rem - 2px) calc(1rem - 1px);
}

p { font-size: min(10px, 3em) }
blockquote { font-size: max(30px, 3em) }

.box { width: min(10% + 20px, 300px) }

The expression language of these functions is described by the grammar and
prose below.

S       : calc | min | max;
calc    : "calc(" S* sum ")" S*;
min     : "min(" S* sum [ "," S* sum ]* ")" S*;
max     : "max(" S* sum [ "," S* sum ]* ")" S*;
sum     : product [ [ "+" | "-" ] S* product ]*;
product : unit [ [ "*" | "/" | "mod" ] S* unit ]*;
unit    : ["+"|"-"]? [ NUMBER S* | DIMENSION S* | PERCENTAGE S* |
          min | max | "(" S* sum ")" S* ];

The context of the expression imposes a target type, which is one of length,
frequency, angle, time, or number. NUMBER tokens are of type number. DIMENSION
tokens have types of their units (‘cm’ is length, ‘deg’ is angle etc.); any
DIMENSION whose type does not match the target type is not allowed and must be
a parse error. If percentages are accepted in that context and convertible to
the target type, a PERCENTAGE token in the expression has the target type;
otherwise percentages are not allowed and must be a parse error.

To make expressions simpler, operators have restrictions on the types they
accept. At each operator, the types of the left and right side have to be
checked for these restrictions. If compatible, they return roughly as follows
(the following ignores precedence rules on the operators for simplicity):

    At ",", "+", "-":
    check: both sides have the same type
    return: that type
    At "*":
    check: at least one side is "number"
    return: the type of the other side
    At "/":
    check: right side is "number"
    return: the type of the left side 

Division by zero is a parse error.

The value resulting from an expression must be clamped to the range allowed in
the target context.

These two are equivalentequivalent to ‘width: 0px’ since widths smaller than
0px are not allowed.

width: calc(5px - 10px);
width: 0px;

Given the complexities of ‘width’ and ‘height’ on table cells and table
elements, calc() expressions for ‘width’ and ‘height’ on table columns, table
column groups, table rows, table row groups, and table cells in both auto and
fixed layout tables are treated as if ‘auto’ had been specified.

6.4. <string>

Strings are denoted by <string> in the value definitions.

6.5. <color>

This section is not normative. The CSS3 Color module [CSS3COLOR] defines the
CSS3 color values.

Color values are denoted by <color> in the value definitions.

A color value can either be a keyword, a numerical specification in a
functional notation, or a numerical RGB specification in a hexadecimal
notation. The hexadecimal notation is special shorthand format that allows
compact color descriptions.

em { color: #F00 }
span.issue { color: red }
* { color: hsl(120, 75%, 75%) } 

6.6. <percentage>

The format of a percentage value, denoted by <percentage>, is a <number>
immediately followed by ‘%’.

Percentage values are always relative to another value, for example a length.
Each property that allows percentages also defines the value to which the
percentage refers. The value may be that of another property for the same
element, a property for an ancestor element, or a value of the formatting
context (e.g., the width of a containing block). When a percentage value is set
for a property of the root element and the percentage is defined as referring
to the inherited value of some property, the resultant value is the percentage
times the initial value of that property.

Since child elements (generally) inherit the computed values of their parent,
in the following example, the children of the P element will inherit a value of
12pt for ‘line-height’, not the percentage value (120%):

p { font-size: 10pt }
p { line-height: 120% }  /* 120% of 'font-size' *\/

Do we need a "non-negative percentage", e.g. for "font-size"?

6.7. <angle>

Angle values (denoted by <angle> in the text) are used with aural cascading
style sheets.

Their format is a <number> immediately followed by an angle unit identifier.

Angle unit identifiers are:

    deg: degrees
    grad: grads
    rad: radians
    turn: turns 

Angle values should be normalized to the range 0-360deg by the user agent. For
example, -10deg and 350deg are equivalent.

For example, a right angle is ‘90deg’ or ‘100grad’ or ‘1.570796326794897rad’.

6.8. <time>

Time values are denoted by <time> in the text. Their format is a <number>
immediately followed by a time unit identifier.

Time unit identifiers are:

    ms: milliseconds
    s: seconds 

Time values are always positive.

6.9. <frequency>

Frequency values (denoted by <frequency> in the text) are used with aural
cascading style sheets.

Their format is a <number> immediately followed by a frequency unit identifier.

Frequency unit identifiers are:

    Hz: Hertz
    kHz: kilohertz 

For example, 200Hz (or 200hz) is a bass sound, and 6kHz (or 6khz) is a treble
sound.

Frequency values are always positive.

6.10. <attr>

Describe the feature fully here, not just a delta from CSS 21.

When attr is set on a pseudo-element, it should apply to the originating
element

In CSS2.1 [CSS21], the ‘attr()’ expression always returns a string. In CSS3,
the ‘attr()’ expression can return many different types. The new syntax for the
attr() expression is:

'attr(' ident [ ',' <type> [ ',' <value> ]? ]? ')'

The first argument represents the attribute name. The value of the attribute
with that name on the element whose computed values are being computed is used
as the value of the expression, according to the rules given below.

The first argument accepts an optional namespace prefix to identify the
namespace of the attribute. The namespace prefix and the attribute name is
separated by ‘|’, with no whitespace before or after the separator
[CSS3NAMESPACE].

The second argument (which is optional but must be present if the third
argument is present) is a <type> and tells the UA how to interpret the
attribute value. It may be one of the values from the list below.

The third argument (which is optional) is a CSS value which must be valid where
the attr() expression is placed. If it is not valid, then the whole attr()
expression is invalid.

If the attribute named by the first argument is missing, cannot be parsed, or
is invalid for the property, then the value returned by attr() will be the
third argument, or, if the third argument is absent, will be the value given as
the default for the relevant type in the list below.

string
    The attribute value will be interpreted as the contents of a CSS string.
    The default is the empty string.
color
    The attribute value will be interpreted as a CSS <color> value. The default
    is UA dependent but must be the same as the initial value of the ‘color’
    property.
url
    The attribute value will be interpreted as the URI part of a ‘url()’
    expression. The default is a UA-dependent URI defined to point to a
    non-existent document with a generic error condition. (i.e. it shouldn't be
    an FTP URI that causes a DNS error, or an HTTP URI that results in a 404,
    it should be a nondescript error condition.)
integer
    The attribute value will be interpreted as a CSS integer. The default is 0.
    The default should also be used if the property in question only accepts
    integers within a certain range and the attribute is out of range.
number
    The attribute value will be interpreted as a CSS number. The default is
    0.0. The default should also be used if the property in question only
    accepts numbers within a certain range and the attribute is out of range.
length, angle, time, frequency
    The attribute value will be interpreted as a CSS length, angle, time or
    frequency (respectively), and the unit identifier (if any) will appear in
    the attribute value. The default is 0. The default should also be used if
    the property in question only accepts values within a certain range (e.g.
    positive lengths or angles from 0 to 90deg) and the attribute is out of
    range (e.g. a negative length or 180deg).
em, ex, px, gr, rem, vw, vh, vm, mm, cm, in, pt, pc, deg, grad, rad, ms, s, Hz,
kHz, %
    The attribute value will be interpreted as a float, with the given type
    suffixed as a unit. The default is 0 in the relevant units.

Should there also be a "keyword" type to, e.g., support ‘float: attr(align)’

If the <type> is missing, ‘string’ is implied.

Ideally, it shouldn't be necessary to specify the type if it is obvious. For
example, this should be valid: "background-image: attr(href);". This could be
described as: "If the property only accepts one type of value (aside from
‘inherit’ and ‘initial’), that type is implied".

The attr() form is only valid if the type given (or implied, if it is missing)
is valid for the property. For example, all of the following are invalid and
would cause a parse-time error (and thus cause the relevant declaration, in
this case all of them, to be ignored):

      content: attr(title, color); /* 'content' doesn't accept colors *\/

      content: attr(end-of-quote, string, inherit) close-quote; /* the
      'inherit' value is not allowed there, since the result would be
      'inherit close-quote', which is invalid. *\/

      margin: attr(vertical, length) attr(horizontal, deg); /* deg
      units are not valid at that point *\/

      color: attr(color); /* 'color' doesn't accept strings *\/

The attr() expression cannot return everything, for example it cannot do
counters, named strings, quotes, or values such as ‘auto’, ‘nowrap’, or
‘baseline’. This is intentional, as the intent of the ‘attr()’ expression is
not to make it possible to describe a presentational language's formatting
using CSS, but to enable CSS to take semantic data into account.

Note that the default value need not be of the type given. For instance, if the
type required of the attribute by the author is ‘px’, the default could still
be ‘5em’.

Examples:

      <stock>
        <wood length="12"/>
        <wood length="5"/>
        <metal length="19"/>
        <wood length="4"/>
      </stock>

      stock::before {
        display: block;
        content: "To scale, the lengths of materials in stock are:";
      }
      stock > * {
        display: block;
        width: attr(length, em); /* default 0 *\/
        height: 1em;
        border: solid thin;
        margin: 0.5em;
      }
      wood {
        background: orange url(wood.png);
      }
      metal {
        background: silver url(metal.png);
      }

      /* this also uses a possible extension to the 'content' property
      to handle replaced content and alternatives to unavailable,
      corrupted or unsupported content *\/
      img {
         content: replaced attr(src, url), attr(alt, string, none);
         height: attr(height, px, auto);
         width: attr(width, px, auto);
      }

The attr() expression cannot currently fall back onto another attribute. Future
versions of CSS may extend attr() in this direction.

Should ‘attr()’ be allowed on any property, in any source language? For
example, do we expect UAs to honor this rule for HTML documents?: P[COLOR] {
color: attr(COLOR, color) }.

6.11. <url>

URLs (Uniform Resource Locators, see [RFC1738] and [RFC1808]) provide the
address of a resource on the Web. An alternative and more general term is URIs
(Uniform Resource Identifiers, see [!URI]). This specification uses the term
URI.

For historical reasons, the name of the URI function is "url". The URI function
takes one URI as the argument. The URI may be quoted with single quote (') or
double quote (") characters. If quoted, the two quote characters must be the
same.

body { background: url("http://www.example.com/pinkish.gif") }

An example without quotes:

li { list-style: url(http://www.example.com/redball.png) disc }

Parentheses, commas, whitespace characters, single quotes (‘) and double quotes
(") appearing in a URI must be escaped with a backslash: ’\(‘, ’\)‘, ’\,‘.

Depending on the type of URI, it might also be possible to write the above
characters as URI-escapes (where "(" = %28, ")" = %29, etc.) as described in
[!URI].

In order to create modular style sheets that are not dependent on the absolute
location of a resource, authors should use relative URIs. Relative URIs (as
defined in [RFC1808]) are resolved to full URIs using a base URI. RFC 1808,
section 3, defines the normative algorithm for this process. For CSS style
sheets, the base URI is that of the style sheet, not that of the source
document.

For example, suppose the following rule:

body { background: url("yellow") }

is located in a style sheet designated by the URI:

http://www.example.org/style/basic.css

The background of the source document’s BODY will be tiled with whatever image
is described by the resource designated by the URI

http://www.example.org/style/yellow

User agents may vary in how they handle URIs that designate unavailable or
inapplicable resources.

6.12. <image>

TBD.

6.13. <fraction>

Some properties accept a series of length values that, in sum, should add up to
a certain length. To take up any remaining space, fractions can be used.

6.13.1. The ‘fr’ unit

The fr unit is used to distribute any remaining space in a series of length
values. If multiple fractions are specified, they take up space proportionally
to their numeric value.

border-parts: 10px 1fr 10px;
border-parts: 10px 1fr 10px 1fr 10px;
border-parts: 10px 2fr 10px 2fr 10px;

The ‘fr’ unit can only be used in combination with regular length units.

6.14. <grid>

A grid is a set of invisible vertical and horizontal lines that can be used to
align content. In CSS3, a grid lines can be established implicitly or
explicitly [CSS3COL] [CSS3GRID]. In any case, the distance between grid lines
can be referred to by the ‘gr’ unit.

6.14.1. The ‘gr’ unit

The gr unit is used to position elements in relation to grid lines.

img { 
  float: top left multicol; 
  float-offset: 2gr; 
  width: 1gr }
}

Grid lines can be laid out in uneven patterns. Therefore, the ‘gr’ unit is not
linear.

For example, "2gr" is not necessarily twice as long as "1gr".

7. Specified, computed, used, and actual values

The final value of a CSS3 property for a given element is the result of a
four-step calculation. First, cascading and inheritance yields the specified
value [CSS3CASCADE]. Second, relative values are computed into absolute values
as far as possible without formatting the document, thereby yielding the
computed value. The computed value is transformed into the used value in the
formatting process. Finally, the computed value is transformed to the actual
value based on constraints in the user agent.

7.1. Finding the specified value

The specified value is the output of the cascading and inheritance process
[CSS3CASCADE].

7.2. Finding the computed value

Specified values may be absolute (i.e., they are not specified relative to
another value, as in ‘red’ or ‘2mm’) or relative (i.e., they are specified
relative to another value, as in ‘auto’, ‘2em’). For absolute values, no
processing is needed to find the computed value.

For relative values, on the other hand, computation is necessary to find the
computed values: percentages must be multiplied by a reference value (each
property defines which value that is), values with relative units (em, ex, px)
must be made absolute by multiplying with the appropriate font or pixel size,
‘auto’ values must be computed by the formulas given with each property,
certain keywords (e.g., ‘smaller’, ‘bolder’) must be replaced according to
their definitions. See example (f), (g) and (h) in the table below.

Also, relative URIs are computed into absolute URIs at this stage. The computed
value of invalid and absolute URIs is the same as the specified value.

7.3. Finding the used value

Computed values are processed as far as possible without formatting the
document. Some values, however, can only be determined when the document is
being laid out. For example, if the width of an element is set to be a certain
percentage of its containing block, the width cannot be determined until the
width of the containing block has been determined. The used value is the result
of taking the computed value and resolving any remaining dependencies into an
absolute value.

7.4. Finding the actual value

A used value is in principle ready to be used, but a user agent may not be able
to make use of the value in a given environment. For example, a user agent may
only be able to render borders with integer pixel widths and may therefore have
to approximate the computed width. Also, the font size of an element may need
adjustment based on the availability of fonts or the value of the
‘font-size-adjust’ property. The actual value is the computed value after
adjustments have been made.

By probing the actual values of elements, much can be learned about how the
document is laid out. However, not all information is recorded in the actual
values. For example, the actual value of the ‘page-break-after’ property does
not reflect whether there is a page break or not after the element. Similarly,
the actual value of ‘orphans’ does not reflect how many orphan lines there is
in a certain element. See examples (j) and (k) in the table below.

Example 	Winning declaration 	Property 	Specified value 	Computed value 	Used value 	Actual value
a 	text-align: left 	text-align 	left 	left 	left 	left
b 	border-width: inherit 	border-top-width, border-right-width, border-bottom-width, border-left-width 	4.2px 	4.2px 	4.2px 	4px
c 	(no winning declaration) 	width 	auto (initial value) 	auto 	120px 	120px
d 	list-style-position: inherit 	list-style-position 	inside 	inside 	inside 	inside
e 	list-style-position: initial 	list-style-position 	outside (initial value) 	outside 	outside 	outside
f 	font-size: 1.2em 	font-size 	1.2em 	14.1px 	14.1px 	14px
g 	width: 80% 	width 	80% 	80% 	354.2px 	354px
h 	width: auto 	width 	auto 	auto 	134px 	134px
i 	height: auto 	height 	auto 	auto 	176px 	176px
j 	(no winning declaration) 	page-break-after 	auto (initial value) 	auto 	auto 	auto
k 	orphans: 3 	orphans 	3 	3 	3 	3

Acknowledgments

Comments and suggestions from Giovanni Campagna, Christoph Päper, Keith Rarick,
Alex Mogilevsky, Ian Hickson, David Baron, Edward Welbourne, Boris Zbarsky,
Björn Höhrmann and Michael Day improved this module.

References

Normative references

[CSS21]
    Bert Bos; et al. Cascading Style Sheets Level 2 Revision 1 (CSS 2.1)
    Specification. 7 December 2010. W3C Working Draft. (Work in progress.) URL:
    http://www.w3.org/TR/2010/WD-CSS2-20101207
[CSS3CASCADE]
    Håkon Wium Lie. CSS3 module: Cascading and inheritance. 15 December 2005.
    W3C Working Draft. (Work in progress.) URL:
    http://www.w3.org/TR/2005/WD-css3-cascade-20051215
[CSS3COL]
    Håkon Wium Lie. CSS Multi-column Layout Module. 17 December 2009. W3C
    Candidate Recommendation. (Work in progress.) URL:
    http://www.w3.org/TR/2009/CR-css3-multicol-20091217
[CSS3COLOR]
    Tantek Çelik; Chris Lilley; L. David Baron. CSS Color Module Level 3. 28
    October 2010. W3C Proposed Recommendation. (Work in progress.) URL:
    http://www.w3.org/TR/2010/PR-css3-color-20101028
[CSS3FONT]
    John Daggett. CSS Fonts Module Level 3. 18 June 2009. W3C Working Draft.
    (Work in progress.) URL: http://www.w3.org/TR/2009/WD-css3-fonts-20090618
[CSS3GRID]
    Alex Mogilevsky; Markus Mielke. CSS Grid Positioning Module Level 3. 5
    September 2007. W3C Working Draft. (Work in progress.) URL:
    http://www.w3.org/TR/2007/WD-css3-grid-20070905
[CSS3SYN]
    L. David Baron. CSS3 module: Syntax. 13 August 2003. W3C Working Draft.
    (Work in progress.) URL: http://www.w3.org/TR/2003/WD-css3-syntax-20030813

Other references

[CSS3NAMESPACE]
    Anne van Kesteren; Elika J. Etemad. CSS Namespaces Module. 23 May 2008. W3C
    Candidate Recommendation. (Work in progress.) URL:
    http://www.w3.org/TR/2008/CR-css3-namespace-20080523
[RFC1738]
    T. Berners-Lee; L. Masinter; M. McCahill. Uniform Resource Locators (URL).
    December 1994. Internet RFC 1738. URL: http://www.ietf.org/rfc/rfc1738.txt
[RFC1808]
    R. Fielding. Relative Uniform Resource Locators. June 1995. Internet RFC
    1808. (Obsoleted by RFC 3986) URL: http://www.ietf.org/rfc/rfc1808.txt

Index

    absolute length units, 6.3.
    actual value, 7.4.
    <angle>
        definition of, 6.7. 
    calc(), 6.3.3.
    color, 6.5.
    <color>, 6.5.
    compound value, 4.6.
    computed value, 7.2.
    deg (degrees), 6.7.
    em (unit), 6.3.2.1.
    ex (unit), 6.3.2.2.
    <frequency>
        definition of, 6.9. 
    fr (unit), 6.13.1.
    functional notation, 4.6.
    grad (grads), 6.7.
    gr (unit), 6.14.1.
    Hz (Hertz), 6.9.
    identifier, 4.4.
    integer, 4.1.
    <integer>, 6.1.
    kHz (kilohertz), 6.9.
    <length>, 6.3.
    max(), 6.3.3.
    min(), 6.3.3.
    ms (milliseconds), 6.8.
    newline, 4.5.
    number, 4.2.
    <number>, 6.2., 6.6., 6.7., 6.8., 6.9.
    number with a unit identifier, 4.3.
    <percentage>
        definition of, 6.6. 
    pixel unit, 6.3.2.3.
    px (pixel), 6.3.2.3.
    rad (radians), 6.7.
    reference pixel, 6.3.2.3.
    Relative length units, 6.3.
    rem (unit), 6.3.2.4.
    Resource Identifier (URI), 6.11.
    root em, 6.3.2.4.
    simple value, 4.6.
    specified value, 7.1.
    s (seconds), 6.8.
    string, 4.5.
    <string>, 6.4.
    <time>
        definition of, 6.8. 
    turn, 6.7.
    Uniform Resource Locator (URL), 6.11.
    URI (Uniform Resource Identifier), 6.11.
    URL (Uniform Resource Locator), 6.11.
    used value, 7.3.
    vh (unit), 6.3.2.6.
    vm (unit), 6.3.2.7.
    vw (unit), 6.3.2.5.
    x-height, 6.3.2.2. 


******************************************************************************/