/******************************************************************************
http://dev.w3.org/csswg/cssom/

CSSOM
Editor's Draft 31 August 2010

This Version:
    http://www.w3.org/TR/2010/ED-cssom-20100831/ 
Latest Version:
    http://www.w3.org/TR/cssom/ 
Latest Editor's draft:
    http://dev.w3.org/csswg/cssom/ 
Previous Version:
    http://www.w3.org/TR/2000/REC-DOM-Level-2-Style-20001113/ 
Editor:
    Anne van Kesteren (Opera Software ASA) <annevk@opera.com> 

Abstract

CSSOM defines APIs (including generic parsing and serialization rules) for Media Queries, Selectors, and of course CSS itself.
Status of this Document

The plan is that this document provides the successor to DOM Level 2 Style.

This is a public copy of the editors' draft. It is provided for discussion only and may change at any moment. It probably contains errors. Its publication here does not imply endorsement of its contents by W3C.
Table of Contents

    1. Introduction
        1.1. History 
    2. Common Infrastructure
        2.1. Terminology
        2.2. Conformance Requirements
        2.3. Common Serializing Idioms 
    3. Media Queries
        3.1. Parsing Media Queries
        3.2. Serializing Media Queries
            3.2.1. Serializing Media Feature Values 
        3.3. Comparing Media Queries
        3.4. The MediaList Interface
        3.5. Creating a MediaList Object 
    4. Selectors
        4.1. Parsing Selectors
        4.2. Serializing Selectors 
    5. CSS
        5.1. Style Sheet
            5.1.1. The StyleSheet Interface
            5.1.2. The CSSStyleSheet Interface 
        5.2. Style Sheet Collections
            5.2.1. The HTTP Default-Style Header
            5.2.2. The StyleSheetList Sequence
            5.2.3. Extensions to the Document Interface
            5.2.4. Interaction with the User Interface
                5.2.4.1. Persisting the selected style sheet set 
            5.2.5. Examples 
        5.3. Style Sheet Association
            5.3.1. The LinkStyle Interface
            5.3.2. Requirements on specifications
            5.3.3. Requirements on User Agents Implementing the xml-stylesheet processing instruction
            5.3.4. Requirements on User Agents Implementing the HTTP Link Header 
        5.4. CSS Rules
            5.4.1. The CSSRuleList Sequence
            5.4.2. The CSSRule Interface
                5.4.2.1. Extensibility 
            5.4.3. CSS Style Rule (Rule Set)
            5.4.4. CSS @import Rule
            5.4.5. CSS @media Rule
            5.4.6. CSS @font-face Rule
            5.4.7. CSS @page Rule
            5.4.8. CSS @namespace Rule 
        5.5. CSS Declaration Blocks
            5.5.1. The CSSStyleDeclaration Interface
            5.5.2. The CSSStyleDeclarationValue Interface 
        5.6. CSS Values
            5.6.1. Parsing CSS Values
            5.6.2. Serializing CSS Values
                5.6.2.1. Examples 
            5.6.3. The CSSPropertyValue Interface
            5.6.4. The CSSMapValue Interface
            5.6.5. The CSSPropertyValueList Interface
            5.6.6. The CSSComponentValue Interface 
    6. DOM Access to CSS Declaration Blocks
        6.1. The ElementCSSInlineStyle Interface
        6.2. Extensions to the Window Interface 
    7. Resolved Values
    8. IANA Considerations
        8.1. Default-Style 
    References
    Acknowledgments 

1. Introduction

...
1.1. History

Several interfaces from DOM Level 2 Style have been obsoleted because they were thought to be too awkward for frequent use. This specification no longer contains those features. DOMImplementationCSS and CSSCharsetRule have been removed as well as they were not deemed necessary.
2. Common Infrastructure
2.1. Terminology

resolve a URL, case-sensitive, converted to ASCII lowercase, ASCII case-insensitive, URL, Content-Type metadata, supported styling language, xml-stylesheet processing instruction, fetch, ...

When this specification talks about object A where A is actually an interface, it generally means an object implementing interface A.

The term whitespace is used as defined in CSS.
2.2. Conformance Requirements

Everything in this specification is normative except for diagrams, examples, notes and sections marked non-normative.

The key words must, must not, required, shall, shall not, should, should not, recommended, may, and optional in the normative parts of this document are to be interpreted as described in RFC 2119 [RFC2119].
2.3. Common Serializing Idioms

To serialize a character means to create a string of "\" (U+005C), followed by the character.

To serialize a character as code point means to create a string of "\" (U+005C), followed by the Unicode code point as the smallest possible number of hexadecimal digits in the range 0-9 a-f (U+0030 to U+0039 and U+0061 to U+0066) to represent the code point in base 16, followed by a space (U+0020).

To serialize an identifier means to create a string represented by the concatenation of, for each character of the identifier:

    If the character is in the range U+0000 to U+001F, the character escaped as code point.
    If the character is the first character and is in the range 0-9 (U+0030 to U+0039), the character escaped as code point.
    If the character is the second character and is in the range 0-9 (U+0030 to U+0039) and the first character is a "-" (U+002D), the character escaped as code point.
    If the character is the second character and is "-" (U+002D) and the first character is "-" too, the escaped character.
    If the character is not handled by one of the above rules and is greater than or equal to U+0080, is "-" (U+002D) or "_" (U+005F), or is in one of the ranges 0-9 (U+0030 to U+0039), A-Z (U+0041 to U+005A), or a-z (U+0061 to U+007A), the character itself.
    Otherwise, the escaped character. 

To serialize a string means to create a string represented by '"' (U+0022), followed by the result of applying the rules below to each character of the given string, followed by '"' (U+0022):

    If the character is in the range U+0000 to U+001F, the character escaped as code point.
    If the character is '"' (U+0022) or '\' (U+005C), the escaped character.
    Otherwise, the character itself. 

"'" (U+0027) is not escaped because strings are always serialized with '"' (U+0022).

To serialize a URL means to create a string represented by "url(", followed by the string escaped value of the given string, followed by ")".

To serialize a comma-separated list concatenate all items of the list in list order while separating them by "," (U+002C), followed by a space (U+0020).

To serialize a whitespace-separated list concatenate all items of the list in list order while separating them a space (U+0020).
3. Media Queries

Media queries are defined by the Media Queries specification. This section defines various concepts around media queries, including their API and serialization form.
3.1. Parsing Media Queries

To parse a media query list for a given string s into a media query list is defined in the Media Queries specification. Return the list of one or more media queries that the algorithm defined there gives.

A media query that ends up being "ignored" will turn into "not all".

To parse a media query for a given string s means to follow the parse a media query list steps and return null if more than one media query is returned or a media query if a single media query is returned.

Again, a media query that ends up being "ignored" will turn into "not all".
3.2. Serializing Media Queries

To serialize a media query list run these steps:

    If the media query list is empty return the empty string and terminate these steps.

    Serialize each media query in the list of media queries, sort them in lexicographical order, and then serialize the list. 

To serialize a media query let s be the empty string, run the steps below, and finally return s:

    If the media query is negated append "not", followed by a space (U+0020), to s.

    Let type be the media type of the media query, escaped and converted to ASCII lowercase.

    If the media query does not contain media features append type, to s, then return s and terminate this algorithm.

    If type is not "all" or if the media query is negated append type, followed by a space (U+0020), followed by "and", followed by a space (U+0020), to s.

    Sort the media features in lexicographical order.

    Then, for each media feature:
        Append a "(" (U+0028), followed by the media feature name, converted to ASCII lowercase, to s.

        If a value is given append a ":" (U+003A), followed by a space (U+0020), followed by the serialized media feature value, to s.

        Append a ")" (U+0029) to s.

        If this is not the last media feature append a space (U+0020), followed by "and", followed by a space (U+0020), to s. 

Here are some examples of input (first column) and output (second column):
Input 	Output
not screen and (min-WIDTH:5px) AND (max-width:40px ) 	not screen and (max-width: 40px) and (min-width: 5px)
all and (color) and (color) 	(color)
3.2.1. Serializing Media Feature Values

This should probably be done in terms of mapping it to serializing CSS values as media features are defined in terms of CSS values after all.

To serialize a media feature value named v locate v in the first column of the table below and use the serialization format described in the second column:
Media Feature 	Serialization
width 	...
height 	...
device-width 	...
device-height 	...
orientation 	

If the value is `portrait`: "portrait".

If the value is `landscape`: "landscape".
aspect-ratio 	...
device-aspect-ratio 	...
color 	...
color-index 	...
monochrome 	...
resolution 	...
scan 	

If the value is `progressive`: "progressive".

If the value is `interlace`: "interlace".
grid 	...

Other specifications can extend this table and vendor-prefixed media features can have custom serialization formats as well.
3.3. Comparing Media Queries

To compare media queries m1 and m2 means to serialize them both and return true if they are a case-sensitive match and false if they are not.
3.4. The MediaList Interface

An object that implements the MediaList interface has an associated collection of media queries.

interface MediaList {
  stringifier attribute DOMString mediaText;
  readonly attribute unsigned long length;
  getter DOMString item(unsigned long index);
  void appendMedium(DOMString medium);
  void deleteMedium(DOMString medium);
};

The mediaText attribute, on getting, must return a serialization of the collection of media queries.

On setting the mediaText attribute these steps must be run:

    Empty the collection of media queries.

    If the given value is the empty string terminate these steps.

    Append all the media queries as a result of parsing the given value to the collection of media queries. 

The length attribute must return the number of media queries in the collection of media queries.

The item(index) method must return the media query in the collection of media queries given by index, or null, if index is greater than or equal to the number of media queries in the collection of media queries.

The appendMedium(medium) method must run these steps:

    Let m be the result of parsing the given value.

    If m is null terminate these steps.

    If comparing m with any of the media queries in the collection of media queries returns true terminate these steps.

    Append m to the collection of media queries. 

The deleteMedium(medium) method must run these steps:

    Let m be the result of parsing the given value.

    If m is null terminate these steps.

    Remove any media query from the collection of media queries for which comparing the media query with m returns true. 

3.5. Creating a MediaList Object

To create a MediaList object from s run these steps:

    Create a new MediaList object.

    Set its mediaText attribute to s.

    Return the newly created MediaList object. 

4. Selectors

Selectors are defined in the Selectors specification. This section mainly defines how to serialize them.
4.1. Parsing Selectors

To parse a group of selectors means to parse the value using the selectors_group production defined in the Selectors specification and return either a group of selectors if parsing did not fail or null if parsing did fail.
4.2. Serializing Selectors

To serialize a group of selectors serialize each selector in the group of selectors and then serialize the group.

To serialize a selector let s be the empty string, run the steps below for each part of the chain of the selector, and finally return s:

    If there is only one simple selector in the sequence of simple selectors which is a universal selector, append the result of serializing the universal selector to s.

    Otherwise, for each simple selector in the sequence of simple selectors that is not a universal selector of which the namespace prefix maps to the null namespace (not in a namespace) or of which the namespace prefix maps to a namespace that is not the default namespace serialize the simple selector and append the result to s.

    If this is not the last part of the chain of the selector append a space (U+0020), followed by the combinator ">", "+", or "~" as appropriate, followed by another space (U+0020) if the combinator was not whitespace, to s.

    If this is the last part of the chain of the selector and there is a pseudo-element, append "::" followed by the name of the pseudo-class, to s. 

To serialize a simple selector let s be the empty string, run the steps below, and finally return s:

type selector
universal selector

        If the namespace prefix maps to a namespace that is not the default namespace and is not the null namespace (not in a namespace) append the escaped namespace prefix, followed by a "|" (U+007C) to s.

        If the namespace prefix maps to a namespace that is the null namespace (not in a namespace) append "|" (U+007C) to s.

        If this is a type selector append the escaped element name to s.

        If this is a universal selector append "* (U+002A) to s. 

attribute selector

        Append "[" (U+005B) to s.

        If the namespace prefix maps to a namespace that is not the null namespace (not in a namespace) append the escaped namespace prefix, followed by a "|" (U+007C) to s.

        If the namespace prefix maps to a namespace that is the null namespace (not in a namespace) append "|" (U+007C) to s.

        Append the escaped attribute name to s.

        If there is an attribute value specified, append "=", "~=", "|=", "^=", "$=", or "*=" as appropriate (depending on the type of attribute selector), followed by the string escaped attribute value, to s.

        Append "]" (U+005D) to s. 

class selector

    Append a "." (U+002E), followed by the escaped class name to s. 
ID selector

    Append a "#" (U+0023), followed by the escaped ID to s. 
pseudo-class

    If the pseudo-class does not accept arguments append ":" (U+003A), followed by the name of the pseudo-class, to s.

    Otherwise, append ":" (U+003A), followed by the name of the pseudo-class, followed by "(" (U+0028), followed by the value of the pseudo-class argument determined as per below, followed by ")" (U+0029), to s.

    :lang()

        The escaped value. 
    :nth-child()
    :nth-last-child()
    :nth-of-type()
    :nth-last-of-type()

            If the value is odd let the value be "2n+1".

            If the value is even let the value be "2n".

            If a is zero let the value be b serialized as <integer>.

            If a is one or minus one and b is zero let the value be "n" (U+006E).

            If a is one or minus one let the value be "n" (U+006E), followed by "+" (U+002B) if b is positive, followed by b serialized as <integer>.

            If b is zero let the value be a serialized as <integer>, followed by "n" (U+006E).

            Otherwise let the value be a serialized as <integer>, followed by "n" (U+006E), followed by "+" (U+002B) if b is positive, followed by b serialized as <integer>. 

    :not()

        The result of serializing the value using the rules for serializing a group of selectors. 

5. CSS
5.1. Style Sheet

A style sheet is an abstract concept that represents a style sheet as defined by the CSS specification. In the DOM a style sheet is a CSSStyleSheet object. A style sheet has a number of associated properties:

style sheet type

    The literal string "text/css". 
style sheet location

    The URL of the style sheet or null if the style sheet was embedded. 
style sheet parent

    The style sheet that is the parent of the style sheet. 
style sheet owner node

    The DOM node associated with the style sheet or null if there is no associated DOM node. 
style sheet owner CSS rule

    The CSS rule in the style sheet parent that caused the inclusion of the style sheet or null if there is no such CSS rule. 
style sheet media

    The MediaList object associated with the style sheet.

    If this property is set to a string run the create a MediaList object steps for that string and associate the returned object with the style sheet.
style sheet title

    The title of the style sheet. It is said to be empty if the title is the empty string.

    In these examples the style sheet title ends up being empty:

    <style title=""> body { background:papayawhip } </style>

    <style> body { background:orange } </style>

style sheet alternate flag

    Either true or false. False by default.

    The following style sheets have their style sheet alternate flag set:

    <?xml-stylesheet alternate="yes" title="x" href="data:text/css,…"?>

    <link rel="alternate stylesheet" title="x" href="data:text/css,…">

style sheet disabled flag

    Either true or false. False by default.

    Even when false it does not necessarily mean that the style sheet is actually rendered.
style sheet CSS rules

    The CSS rules associated with the style sheet. 

When you are to create a style sheet the above properties, with the exception of style sheet type and style sheet CSS rules, are to be set to their proper values.
5.1.1. The StyleSheet Interface

The StyleSheet interface represents a base interface that has no meaning on its own.

interface StyleSheet {
  readonly attribute DOMString type;
  readonly attribute DOMString href;
  readonly attribute Node ownerNode;
  readonly attribute StyleSheet parentStyleSheet;
  readonly attribute DOMString title;
  [PutForwards=mediaText] readonly attribute MediaList media;
           attribute boolean disabled;
};

The type attribute must return the style sheet type.

The href attribute must return the style sheet location.

The ownerNode attribute must return the style sheet owner node.

The parentStyleSheet attribute must return the style sheet parent.

The title attribute must return the style sheet title.

The media attribute must return the style sheet media.

The disabled attribute must, on getting, return the style sheet disabled flag. On setting, it must set the style sheet disabled flag to the given value.
5.1.2. The CSSStyleSheet Interface

The CSSStyleSheet interface represents a style sheet.

interface CSSStyleSheet : StyleSheet {
  readonly attribute CSSRule ownerRule;
  readonly attribute CSSRuleList cssRules;
  unsigned long insertRule(DOMString rule, unsigned long index);
  void deleteRule(unsigned long index);
};

The ownerRule attribute must return the style sheet owner CSS rule.

The cssRules attribute must return a CSSRuleList object representing the style sheet CSS rules.

CSS rules that were dropped during parsing can not be found using APIs described by this specification.

The insertRule(rule, index) method must insert a CSS rule rule the in CSS rule list returned by cssRules at index.

The deleteRule(index) method must remove a CSS rule from the CSS rule list returned by cssRules at index.
5.2. Style Sheet Collections

Below various new concepts are defined that are associated with each Document object.

Each Document has an associated list of zero or more style sheets, named the document style sheets. This is an ordered list that contains all style sheets associated with the Document, in tree order, with style sheets created from HTTP Link headers first, if any, in header order.

To create a style sheet, run these steps:

    Create a new style sheet object and set its properties as specified.

    Then run the add a style sheet steps for the newly created style sheet. 

To add a style sheet, run these steps:

    Add the style sheet to the list of document style sheets at the appropriate location. The remainder of these steps deal with the style sheet disabled flag.

    If the style sheet disabled flag is true terminate these steps.

    If the style sheet title is non-empty, the style sheet alternate flag is false, and preferred style sheet set name is the empty string change the preferred style sheet set name to the style sheet title.

    If any of the following is true set the style sheet disabled flag to false and terminate these steps:

        The style sheet title is empty.

        The last style sheet set name is null and the style sheet title is a case-sensitive match for the preferred style sheet set name.

        The style sheet title is a case-sensitive match for the last style sheet set name. 

    Set the style sheet disabled flag to true. 

A persistent style sheet is a style sheet from the document style sheets whose style sheet title is the empty string and whose style sheet alternate flag is false.

A style sheet set is an ordered collection of one or more style sheets from the document style sheets which have an identical style sheet title that is not the empty string.

A style sheet set name is the style sheet title the style sheet set has in common.

An enabled style sheet set is a style sheet set of which each style sheet has its style sheet disabled flag set to false.

To enable a style sheet set with name name, run these steps:

    If name is the empty string set the style sheet disabled flag for each style sheet that is in a style sheet set to true and terminate these steps.

    Set the style sheet disabled flag for each style sheet in a style sheet set whose style sheet set name is a case-sensitive match for name to false and set it to true for all other style sheets in a style sheet set. 

To select a style sheet set with name name, run these steps:

    Enable a style sheet set with name name.

    Set last style sheet set name to name. 

A last style sheet set name is a concept to determine what style sheet set was last selected. Initially its value is null.

A preferred style sheet set name is a concept to determine which style sheets need to have their style sheet disabled flag set to false. Initially its value is the empty string.

To change the preferred style sheet set name with name name, run these steps:

    Let the preferred style sheet set name be current.

    Set preferred style sheet set name to name.

    If name is not a case-sensitive match for current and last style sheet set name is null enable a style sheet set with name new. 

5.2.1. The HTTP Default-Style Header

The HTTP Default-Style header can be used to set the preferred style sheet set name influencing which style sheet set is (initially) the enabled style sheet set.

For each HTTP Default-Style header, in header order, the user agent must change the preferred style sheet set name with name being the value of the header.
5.2.2. The StyleSheetList Sequence

The sequence parameterized type represents an ordered collection of style sheets.

typedef sequence<StyleSheet> StyleSheetList;

5.2.3. Extensions to the Document Interface

[Supplemental] interface Document {
  readonly attribute StyleSheetList styleSheets;
           attribute DOMString? selectedStyleSheetSet;
  readonly attribute DOMString? lastStyleSheetSet;
  readonly attribute DOMString? preferredStyleSheetSet;
  readonly attribute DOMStringList styleSheetSets;
  void enableStyleSheetsForSet(DOMString? name);
};

The styleSheets attribute must return a StyleSheetList sequence representing the document style sheets.

Because of historical IDL limitations the styleSheets attribute used to be on a separate interface, DocumentStyle.

The selectedStyleSheetSet attribute, on getting, must run these steps:

    If there is a single enabled style sheet set and no other document style sheets with a non-empty style sheet title have the style sheet disabled flag set to false return the style sheet set name of the enabled style sheet set and terminate this set of steps.

    Otherwise, if style sheets from different style sheet sets have their style sheet disabled flag set to false return null and terminate this set of steps.

    Otherwise, return the empty string.

    At this point either all style sheets with a non-empty style sheet title have the style sheet disabled flag set to true or there are no such style sheets.

On setting the selectedStyleSheetSet attribute these steps must be run:

    If the value is null terminate this set of steps.

    Otherwise, select a style sheet set with as name the value passed. 

From the DOM's perspective, all views have the same selectedStyleSheetSet. If a user agent supports multiple views with different selected alternative style sheets, then this attribute (and the StyleSheet interface's disabled attribute) must return and set the value for the default view.

The lastStyleSheetSet attribute must return the last style sheet set name.

This attribute is initially null.

The preferredStyleSheetSet attribute must return the preferred style sheet set name.

Unlike lastStyleSheetSet, this attribute is initially the empty string.

The styleSheetSets attribute must return a list of the style sheet set names of the style sheet sets, in order of the document style sheets.

The enableStyleSheetsForSet(name) method must, when invoked, run these steps:

    If name is null terminate these steps.

    Enable a style sheet set with name name. 

Style sheets with an empty style sheet title are never affected by this method. This method does not change the values of the lastStyleSheetSet or preferredStyleSheetSet attributes.
5.2.4. Interaction with the User Interface

The user interface of Web browsers that support style sheets should list the style sheet titles given in the styleSheetSets list, showing the selectedStyleSheetSet as the selected style sheet set, leaving none selected if it is null or the empty string, and selecting an extra option "Basic Page Style" (or similar) if it is the empty string and the preferredStyleSheetSet is the empty string as well.

Selecting a style sheet from this list should use the select a style sheet set set of steps. This (by definition) affects the lastStyleSheetSet attribute.
5.2.4.1. Persisting the selected style sheet set

If a user agent persist the selected style sheet set, they should use the value of the selectedStyleSheetSet attribute, or if that is null, the lastStyleSheetSet attribute, when leaving the page (or at some other time) to determine the set name to store. If that is null then the style sheet set should not be persisted.

When re-setting the style sheet set to the persisted value (which can happen at any time, typically at the first time the style sheets are needed for styling the document, after the <head> of the document has been parsed, after any scripts that are not dependent on computed style have executed), the style sheet set should be set by using the select a style sheet set set of steps as if the user had selected the set manually.

This specification does not give any suggestions on how user agents should decide to persist the style sheet set or whether or how to persist the selected set across pages.
5.2.5. Examples

Thus, in the following HTML snippet:

<link rel="alternate stylesheet" title="foo" href="a">
<link rel="alternate stylesheet" title="bar" href="b">
<script>

  document.selectedStyleSheetSet = 'foo';
  document.styleSheets[1].disabled = false;
</script>
<link rel="alternate stylesheet" title="foo" href="c">
<link rel="alternate stylesheet" title="bar" href="d">

...the style sheets that end up enabled are style sheets "a", "b", and "c", the selectedStyleSheetSet attribute would return null, lastStyleSheetSet would return "foo", and preferredStyleSheetSet would return the empty string.

Similarly, in the following HTML snippet:

<link rel="alternate stylesheet" title="foo" href="a">
<link rel="alternate stylesheet" title="bar" href="b">
<script>
  var before = document.preferredStyleSheetSet;
  document.styleSheets[1].disabled = false;
</script>
<link rel="stylesheet" title="foo" href="c">

<link rel="alternate stylesheet" title="bar" href="d">
<script>
  var after = document.preferredStyleSheetSet;
</script>

...the "before" variable will be equal to the empty string, the "after" variable will be equal to "foo", and style sheets "a" and "c" will be enabled. This is the case even though the first script block sets style sheet "b" to be enabled, because upon parsing the following <link> element, the preferredStyleSheetSet is set and the enableStyleSheetsForSet() method is called (since selectedStyleSheetSet was never set explicitly, leaving lastStyleSheetSet at null throughout), which changes which style sheets are enabled and which are not.
5.3. Style Sheet Association

This section defines the interface a style sheet owner node of a style sheet has to implement and defines the requirements for xml-stylesheet processing instructions and HTTP Link headers when the link releation type is an ASCII case-insensitive match for "stylesheet" since nobody else was interested in defining this.

The editor is in good hope that HTML and SVG will define the appropriate processing in their respective specifications, in terms of this specification, in due course.
5.3.1. The LinkStyle Interface

The associated style sheet of a node is the style sheet in the list of document style sheets of which the style sheet owner node implements the LinkStyle interface.

Also [Supplemental]?

[NoInterfaceObject] interface LinkStyle {
  readonly attribute StyleSheet sheet;
};

The sheet attribute must return the associated style sheet for the node, or null, if there is no associated style sheet.

In the following HTML snippet the first HTML style element has a sheet attribute that returns a StyleSheet object representing the style sheet, but for the second style attribute it returns null. (Assuming the user agent supports CSS (text/css) and does not support ExampleSheets (text/example-sheets).

<style type=text/css> body { background:lime } </style>
<style type=text/example-sheets> $(body).background := lime </style>

Whether or not the node refers to a style sheet is defined by the specification that defines the semantics of said node.
5.3.2. Requirements on specifications

Specifications introducing new ways of associating style sheets through the DOM should define which nodes implement the LinkStyle interface. When doing so, they must also define when a style sheet is created.
5.3.3. Requirements on User Agents Implementing the xml-stylesheet processing instruction

ProcessingInstruction implements LinkStyle;

For each xml-stylesheet processing instruction that is not part of the document type declaration and has an href pseudo-attribute these steps must (unless otherwise stated) be run:

    Let title be the value of the title pseudo-attribute or the empty string if the title pseudo-attribute is not specified.

    If there is an alternate pseudo-attribute whose value is a case-sensitive match for "yes" and title is the empty string terminate these steps.

    If there is a type pseudo-attribute whose value is not a supported styling language the user agent may terminate these steps.

    Resolve the URL specified by the href pseudo-attribute and then fetch it.

    When the resource is available, the document is in quirks mode and the Content-Type metadata of the resource is not a supported styling language change the Content-Type metadata of the resource to text/css.

    This step might never actually happen, but is included here in case other specifications change, to keep things consistent.

    If the resource is not in a supported styling language terminate these steps.

    Create a style sheet with the following properties:

    style sheet location

        The absolute URL of the resource. 
    style sheet parent

        null 
    style sheet owner node

        The node. 
    style sheet owner CSS rule

        null 
    style sheet media

        The value of the media pseudo-attribute if any, or the empty string otherwise. 
    style sheet title

        title 
    style sheet alternate flag

        True if the alternate pseudo-attribute value is a case-sensitive match for "yes". Otherwise, false. 

5.3.4. Requirements on User Agents Implementing the HTTP Link Header

For each HTTP Link header of which one of the link relation types is an ASCII case-insensitive match for "stylesheet" these steps must be run:

    Let title be the value of the first of all the title and title* parameters. If there are no such parameters it is the empty string.

    If one of the (other) link relation types is an ASCII case-insensitive match for "alternate" and title is the empty string terminate these steps.

    Resolve the specified URL and fetch it.

    When the resource is available, the document is in quirks mode and the Content-Type metadata of the resource is not a supported styling language change the Content-Type metadata of the resource to text/css.

    If the resource is not in a supported styling language terminate these steps.

    Create a style sheet with the following properties:

    style sheet location

        The absolute URL of the resource. 
    style sheet owner node

        null 
    style sheet parent

        null 
    style sheet owner node

        null 
    style sheet owner CSS rule

        null 
    style sheet media

        The value of the first media parameter. 
    style sheet title

        title 
    style sheet alternate flag

        True if one of the specified link relation type for this HTTP Link header is an ASCII case-insensitive match for "alternate". Otherwise, false. 

5.4. CSS Rules

To parse a CSS rule ...

To serialize a CSS rule depends on the type of CSS rule, as follows:

CSSStyleRule
    ... 
CSSImportRule

    The result of concatenating these strings:

        The literal string "@import", followed by a space (U+0020), followed by the URL escaped value of the href attribute.
        If the associated MediaList object is not empty, a space (U+0020), followed by the value of the mediaText attribute of the associated MediaList object.
        A ";" (U+003B). 

CSSMediaRule
    ... 
CSSFontFaceRule
    ... 
CSSPageRule
    ... 
CSSNamespaceRule

    The literal string "@namespace", followed by a space (U+0020), followed by the identifier escaped value of the prefix attribute (if any), followed by a space (U+0020) if there is a prefix, followed by the URL escaped value of the namespaceURI attribute, followed the character ";" (U+003B). 

To insert a CSS rule rule into a CSS rule list list at location index follow these steps:

    If index is negative or greater than the length of the list raise an INDEX_SIZE_ERR exception and terminate these steps.

    Parse rule.

    If parsing failed terminate these steps.

    If the new object can not be inserted within the list at the given index due to limitations of the CSS specification raise a HIERARCHY_REQUEST_ERR exception and terminate these steps.

    Insert the new object at the given index within the list. 

To remove a CSS rule from CSS rule list list at location index follow these steps:

    If index is negative or greater than the length of the list raise an INDEX_SIZE_ERR exception and terminate these steps.

    Remove the object at index from list. 

5.4.1. The CSSRuleList Sequence

The CSSRuleList object represents an ordered collection of CSS rules.

typedef sequence<CSSRule> CSSRuleList;

5.4.2. The CSSRule Interface

The CSSRule interface is a base interface. Each unique CSS rule has its own interface which inherits from this one.

interface CSSRule {
  // Types
  const unsigned short STYLE_RULE = 1;
  const unsigned short IMPORT_RULE = 3;
  const unsigned short MEDIA_RULE = 4;
  const unsigned short FONT_FACE_RULE = 5;
  const unsigned short PAGE_RULE = 6;
  const unsigned short NAMESPACE_RULE = 10;
  readonly attribute unsigned short type;

  // Parsing and serialization
           attribute DOMString cssText;

  // Context
  readonly attribute CSSRule parentRule;
  readonly attribute CSSStyleSheet parentStyleSheet;
};

The type attribute must return the CSS rule type, as follows:

STYLE_RULE (numeric value 1)
    The object is a CSSStyleRule. 
IMPORT_RULE (numeric value 3)
    The object is a CSSImportRule. 
MEDIA_RULE (numeric value 4)
    The object is a CSSMediaRule. 
FONT_FACE_RULE (numeric value 5)
    The object is a CSSFontFaceRule. 
PAGE_RULE (numeric value 6)
    The object is a CSSPageRule. 
NAMESPACE_RULE (numeric value 10)
    The object is a CSSNamespaceRule. 

Constants with values 0 and 2 have been obsoleted by this specification. They might be re-allocated in the future. 7 is reserved for @color-profile. 8 and 9 are reserved for CSS animation.

The cssText attribute, on getting, must return a serialization of the CSS rule.

On setting the cssText attribute these steps must be run:

    Parse the value.

    If parsing failed terminate this algorithm.

    If the type of the new object does not match the type of the current object raise an INVALID_MODIFICATION_ERR exception.

    Replace the current object with the new object. 

The parentRule attribute must return the nearest enclosing rule of the current rule or null, if there is no enclosing rule.

E.g. @media can enclose a rule.

The parentStyleSheet attribute must return the CSSStyleSheet object that contains the the current rule.
5.4.2.1. Extensibility

The constant values 0-1000 are reserved for future use by the CSS WG.

Vendors are encouraged to use reasonably unique values outside this range so that they do not clash with extensions from other vendors. For example, the first value for Mozilla could be 0x08EC0001 and 0x09E8A001 could be the first for Opera.

Vendors are encouraged to prefix the new interface names with a vendor specific prefix. For example, "Example company" could have an interface called "ExampleCSSTestRule".

In general, vendors are encouraged to discuss extensions on a public forum, such as www-style@w3.org.
5.4.3. CSS Style Rule (Rule Set)

The CSSStyleRule object represents a rule set.

interface CSSStyleRule : CSSRule {
           attribute DOMString selectorText;
  readonly attribute CSSStyleDeclaration style;
};

The selectorText attribute, on getting, must return the result of serializing the associated group of selectors.

On setting the selectorText attribute these steps must be run:

    Run the parse a group of selectors algorithm on the given value.

    If the algorithm returns a non-null value replace the associated group of selectors with the returned value.

    Otherwise, if the algorithm returns a null value, do nothing. 

The style attribute must return a CSSStyleDeclaration object for the rule set.
5.4.4. CSS @import Rule

The CSSImportRule object represents an @import rule.

interface CSSImportRule : CSSRule {
  readonly attribute DOMString href;
  [PutForwards=mediaText] readonly attribute MediaList media;
  readonly attribute CSSStyleSheet styleSheet;
};

The href attribute must return the URL specified by the @import rule.

To get the resolved URL use the href attribute of the associated style sheet.

The media attribute must return the value of the media attribute of the associated style sheet.

The styleSheet attribute must return the associated style sheet.

If loading of the style sheet fails its cssRules list is simply empty. I.e. an @import rule always has an associated style sheet.
5.4.5. CSS @media Rule

The CSSMediaRule object represents an @media rule.

interface CSSMediaRule : CSSRule {
  [PutForwards=mediaText] readonly attribute MediaList media;
  readonly attribute CSSRuleList cssRules;
  unsigned long insertRule(DOMString rule, in unsigned long index);
  void deleteRule(unsigned long index);
};

The media attribute must return a MediaList object for the list of media queries specified with the @media rule.

The cssRules attribute must return a CSSRuleList object for the list of CSS rules specified with the @media rule.

The insertRule(rule, index) method must insert a CSS rule rule into the CSS rule list returned by cssRules at index.

The deleteRule(index) method must remove a CSS rule from the CSS rule list returned by cssRules at index.
5.4.6. CSS @font-face Rule

The CSSFontFaceRule object represents an @font-face rule.

interface CSSFontFaceRule : CSSRule {
  readonly attribute CSSStyleDeclaration style;
};

The style attribute must return a CSSStyleDeclaration block that contains the property declarations specified within the @font-face rule.
5.4.7. CSS @page Rule

Need to define the rules for parse a CSS page selector and serialize a CSS page selector.

The CSSPageRule object represents an @page rule.

interface CSSPageRule : CSSRule {
           attribute DOMString selectorText;
  readonly attribute CSSStyleDeclaration style;
};

The selectorText attribute, on getting, must return the result of serializing the associated CSS page selector.

On setting the selectorText attribute these steps must be run:

    Run the parse a CSS page selector algorithm on the given value.

    If the algorithm returns a non-null value replace the associated CSS page selector with the returned value.

    Otherwise, if the algorithm returns a null value, do nothing. 

The style attribute must return a CSSStyleDeclaration for the @page rule.
5.4.8. CSS @namespace Rule

The CSSNamespaceRule object represents an @namespace rule.

interface CSSNamespaceRule : CSSRule {
  readonly attribute DOMString namespaceURI;
  readonly attribute DOMString? prefix;
};

The namespaceURI attribute must return the namespace of the @namespace rule.

The prefix attribute must return the prefix of the @namespace rule or the empty string if there is no prefix.
5.5. CSS Declaration Blocks

A CSS declaration block is an ordered collection of CSS properties with their associated values, also named CSS declarations. In the DOM a CSS declaration block is a CSSStyleDeclaration object. A CSS declaration block has two associated properties:

CSS declaration block readonly flag

    False if the object can be manipulated. True if it can not be manipulated. If not explicitly set its value is false. 
CSS declaration block declarations

    The CSS declarations associated with the object. 

The CSS declaration block declarations are ordered. This matters for the item() method.

To parse a CSS declaration block ...

To serialize a CSS declaration block ...
5.5.1. The CSSStyleDeclaration Interface

interface CSSStyleDeclaration {
           attribute DOMString cssText;

  readonly attribute unsigned long length;
  DOMString item(unsigned long index);

  DOMString getPropertyValue(DOMString property);
  DOMString getPropertyPriority(DOMString property);
  void setProperty(DOMString? property, DOMString? value);
  void setProperty(DOMString? property, DOMString? value, DOMString? priority);
  DOMString removeProperty(DOMString property);

  readonly attribute CSSStyleDeclarationValue values;

  readonly attribute CSSRule parentRule;

  // CSS Properties
           attribute DOMString? azimuth;
           attribute DOMString? background;
           attribute DOMString? backgroundAttachment;
           attribute DOMString? backgroundColor;
           attribute DOMString? backgroundImage;
           attribute DOMString? backgroundPosition;
           attribute DOMString? backgroundRepeat;
           attribute DOMString? border;
           attribute DOMString? borderCollapse;
           attribute DOMString? borderColor;
           attribute DOMString? borderSpacing;
           attribute DOMString? borderStyle;
           attribute DOMString? borderTop;
           attribute DOMString? borderRight;
           attribute DOMString? borderBottom;
           attribute DOMString? borderLeft;
           attribute DOMString? borderTopColor;
           attribute DOMString? borderRightColor;
           attribute DOMString? borderBottomColor;
           attribute DOMString? borderLeftColor;
           attribute DOMString? borderTopStyle;
           attribute DOMString? borderRightStyle;
           attribute DOMString? borderBottomStyle;
           attribute DOMString? borderLeftStyle;
           attribute DOMString? borderTopWidth;
           attribute DOMString? borderRightWidth;
           attribute DOMString? borderBottomWidth;
           attribute DOMString? borderLeftWidth;
           attribute DOMString? borderWidth;
           attribute DOMString? bottom;
           attribute DOMString? captionSide;
           attribute DOMString? clear;
           attribute DOMString? clip;
           attribute DOMString? color;
           attribute DOMString? content;
           attribute DOMString? counterIncrement;
           attribute DOMString? counterReset;
           attribute DOMString? cue;
           attribute DOMString? cueAfter;
           attribute DOMString? cueBefore;
           attribute DOMString? cursor;
           attribute DOMString? direction;
           attribute DOMString? display;
           attribute DOMString? elevation;
           attribute DOMString? emptyCells;
           attribute DOMString? cssFloat;
           attribute DOMString? font;
           attribute DOMString? fontFamily;
           attribute DOMString? fontSize;
           attribute DOMString? fontSizeAdjust;
           attribute DOMString? fontStretch;
           attribute DOMString? fontStyle;
           attribute DOMString? fontVariant;
           attribute DOMString? fontWeight;
           attribute DOMString? height;
           attribute DOMString? left;
           attribute DOMString? letterSpacing;
           attribute DOMString? lineHeight;
           attribute DOMString? listStyle;
           attribute DOMString? listStyleImage;
           attribute DOMString? listStylePosition;
           attribute DOMString? listStyleType;
           attribute DOMString? margin;
           attribute DOMString? marginTop;
           attribute DOMString? marginRight;
           attribute DOMString? marginBottom;
           attribute DOMString? marginLeft;
           attribute DOMString? markerOffset;
           attribute DOMString? marks;
           attribute DOMString? maxHeight;
           attribute DOMString? maxWidth;
           attribute DOMString? minHeight;
           attribute DOMString? minWidth;
           attribute DOMString? orphans;
           attribute DOMString? outline;
           attribute DOMString? outlineColor;
           attribute DOMString? outlineStyle;
           attribute DOMString? outlineWidth;
           attribute DOMString? overflow;
           attribute DOMString? padding;
           attribute DOMString? paddingTop;
           attribute DOMString? paddingRight;
           attribute DOMString? paddingBottom;
           attribute DOMString? paddingLeft;
           attribute DOMString? page;
           attribute DOMString? pageBreakAfter;
           attribute DOMString? pageBreakBefore;
           attribute DOMString? pageBreakInside;
           attribute DOMString? pause;
           attribute DOMString? pauseAfter;
           attribute DOMString? pauseBefore;
           attribute DOMString? pitch;
           attribute DOMString? pitchRange;
           attribute DOMString? playDuring;
           attribute DOMString? position;
           attribute DOMString? quotes;
           attribute DOMString? richness;
           attribute DOMString? right;
           attribute DOMString? size;
           attribute DOMString? speak;
           attribute DOMString? speakHeader;
           attribute DOMString? speakNumeral;
           attribute DOMString? speakPunctuation;
           attribute DOMString? speechRate;
           attribute DOMString? stress;
           attribute DOMString? tableLayout;
           attribute DOMString? textAlign;
           attribute DOMString? textDecoration;
           attribute DOMString? textIndent;
           attribute DOMString? textShadow;
           attribute DOMString? textTransform;
           attribute DOMString? top;
           attribute DOMString? unicodeBidi;
           attribute DOMString? verticalAlign;
           attribute DOMString? visibility;
           attribute DOMString? voiceFamily;
           attribute DOMString? volume;
           attribute DOMString? whiteSpace;
           attribute DOMString? widows;
           attribute DOMString? width;
           attribute DOMString? wordSpacing;
           attribute DOMString? zIndex;
};

The cssText attribute must, on getting, return the result of serializing the CSS declaration block declarations.

On setting the cssText attribute these steps must be run:

    If the CSS declaration block readonly flag is true raise a NO_MODIFICATION_ALLOWED_ERR and terminate this algorithm.

    Empty the CSS declaration block declarations.

    Parse the given value and, if the return value is not null, insert it into the CSS declaration block declarations. 

The length attribute must return the number of declarations in the collection of CSS declarations.

The item(index) method, when invoked, ....

The getPropertyValue(property) method, when invoked, ....

The getPropertyPriority(property) method, when invoked, if property is an ASCII case-insensitive match for a property that has a priority user agents must return the canonical priority of that property as given in the syntax definition. Otherwise, the empty string must be returned.

E.g. for background-color:lime !IMPORTANT the return value would be "important".

When the setProperty(property, value, priority) method is invoked these steps must be run:

    If the CSS declaration block readonly flag is true raise a NO_MODIFICATION_ALLOWED_ERR and terminate this algorithm.

    If property does not case-insensitively match a supported property terminate this algorithm.

    If value is null or the empty string invoke removeProperty() with property as argument and terminate this algorithm.

    If the priority argument has been omitted let priority be the empty string.

    If priority is neither a valid priority nor the empty string terminate this algorithm.

    If parsing the value returns null abort this algorithm.

    value can not include "!important".

    Finally, set property to value with priority priority when priority is not the empty string. Otherwise set property to value. 

When the removeProperty(property) method is invoked these steps must be run:

    If the CSS declaration block readonly flag is true raise a NO_MODIFICATION_ALLOWED_ERR and terminate this algorithm.

    If property is an ASCII case-insensitive match for a property of a declaration in the collection of CSS declarations remove the declaration.

The values attribute must return ...

The parentRule attribute must return the CSSrule object the CSSStyleDeclaration is object is associated with or null if it is not associated with a CSSrule object.

For the table below, the IDL attribute in the first column must, on getting return the result of invoking getPropertyValue() with as argument the CSS property given in the second column on the same row.

Similarly for the table below, setting the IDL attribute in the first column must invoke setProperty() with as first argument the CSS property given in the second column on the same row, as second argument the given value, and no third argument. Any exceptions raised must be re-raised.
IDL attribute 	CSS property
azimuth 	"azimuth"
background 	"background"
backgroundAttachment 	"background-attachment"
backgroundColor 	"background-color"
backgroundImage 	"background-image"
backgroundPosition 	"background-position"
backgroundRepeat 	"background-repeat"
border 	"border"
borderCollapse 	"border-collapse"
borderColor 	"border-color"
borderSpacing 	"border-spacing"
borderStyle 	"border-style"
borderTop 	"border-top"
borderRight 	"border-right"
borderBottom 	"border-bottom"
borderLeft 	"border-left"
borderTopColor 	"border-top-color"
borderRightColor 	"border-right-color"
borderBottomColor 	"border-bottom-color"
borderLeftColor 	"border-left-color"
borderTopStyle 	"border-top-style"
borderRightStyle 	"border-right-style"
borderBottomStyle 	"border-bottom-style"
borderLeftStyle 	"border-left-style"
borderTopWidth 	"border-top-width"
borderRightWidth 	"border-right-width"
borderBottomWidth 	"border-bottom-width"
borderLeftWidth 	"border-left-width"
borderWidth 	"border-width"
bottom 	"bottom"
captionSide 	"caption-side"
clear 	"clear"
clip 	"clip"
color 	"color"
content 	"content"
counterIncrement 	"counter-increment"
counterReset 	"counter-reset"
cue 	"cue"
cueAfter 	"cue-after"
cueBefore 	"cue-before"
cursor 	"cursor"
direction 	"direction"
display 	"display"
elevation 	"elevation"
emptyCells 	"empty-cells"
cssFloat 	"float"
font 	"font"
fontFamily 	"font-family"
fontSize 	"font-size"
fontSizeAdjust 	"font-size-adjust"
fontStretch 	"font-stretch"
fontStyle 	"font-style"
fontVariant 	"font-variant"
fontWeight 	"font-weight"
height 	"height"
left 	"left"
letterSpacing 	"letter-spacing"
lineHeight 	"line-height"
listStyle 	"list-style"
listStyleImage 	"list-style-image"
listStylePosition 	"list-style-position"
listStyleType 	"list-style-type"
margin 	"margin"
marginTop 	"margin-top"
marginRight 	"margin-right"
marginBottom 	"margin-bottom"
marginLeft 	"margin-left"
markerOffset 	"marker-offset"
marks 	"marks"
maxHeight 	"max-height"
maxWidth 	"max-width"
minHeight 	"min-height"
minWidth 	"min-width"
orphans 	"orphans"
outline 	"outline"
outlineColor 	"outline-color"
outlineStyle 	"outline-style"
outlineWidth 	"outline-width"
overflow 	"overflow"
padding 	"padding"
paddingTop 	"padding-top"
paddingRight 	"padding-right"
paddingBottom 	"padding-bottom"
paddingLeft 	"padding-left"
page 	"page"
pageBreakAfter 	"page-break-after"
pageBreakBefore 	"page-break-before"
pageBreakInside 	"page-break-inside"
pause 	"pause"
pauseAfter 	"pause-after"
pauseBefore 	"pause-before"
pitch 	"pitch"
pitchRange 	"pitch-range"
playDuring 	"play-during"
position 	"position"
quotes 	"quotes"
richness 	"richness"
right 	"right"
size 	"size"
speak 	"speak"
speakHeader 	"speak-header"
speakNumeral 	"speak-numeral"
speakPunctuation 	"speak-punctuation"
speechRate 	"speech-rate"
stress 	"stress"
tableLayout 	"table-layout"
textAlign 	"text-align"
textDecoration 	"text-decoration"
textIndent 	"text-indent"
textShadow 	"text-shadow"
textTransform 	"text-transform"
top 	"top"
unicodeBidi 	"unicode-bidi"
verticalAlign 	"vertical-align"
visibility 	"visibility"
voiceFamily 	"voice-family"
volume 	"volume"
whiteSpace 	"white-space"
widows 	"widows"
width 	"width"
wordSpacing 	"word-spacing"
zIndex 	"z-index"
5.5.2. The CSSStyleDeclarationValue Interface

interface CSSStyleDeclarationValue {
  // ...

  // CSS Properties

};

The rought idea is that this interface exposes the full list of supported properties as well that each return a CSSPropertyValue object. That object can implement other objects depending on the property involved. E.g. for 'width' the object would implement CSSLengthComponentValue and CSSPercentageComponentValue.
5.6. CSS Values
5.6.1. Parsing CSS Values

To parse a CSS value for a given property means to a parse the given value according to the definition of the property that is an ASCII case-insensitive match for property in the CSS specification. If the given value is ignored return null. Otherwise return the CSS value for the given property.

"!important" declarations are not part of the property value space and will therefore cause parse a CSS value to return null.
5.6.2. Serializing CSS Values

To serialize a CSS value follow these rules:

    Serialize any CSS component values in the value.

    Where multiple CSS component values can appear in any order without changing the meaning of the value (typically represented by a double bar || in the value syntax), use the order as given in the syntax.

    Where CSS component values of the value can be omitted without changing the meaning of the value (e.g. initial values in shorthand properties), omit them. If this would remove all the values, then include the first allowed value.

    E.g. margin: 20px 20px becomes margin: 20px.

    E.g. the value 0 for the 'border' property.

    If the value of a shorthand property is requested and it cannot be computed because the properties associated with the shorthand have values that cannot be represented by the shorthand the serialization is the empty string.

    If a value has a whitespace-separated list of CSS component values, serialize the value as a whitespace-separated list.

    If a value has a comma-separated list of CSS component values, serialize the value as a comma-separated list. 

To serialize a CSS component value depends on the component, as follows:

keyword

    The keyword converted to ASCII lowercase. 
<angle>

    The number of degrees serialized as per <number> followed by the literal string "deg". 
<color>

    preserve system colors, maybe color keywords... 
<counter>

    The concatenation of:

        If <counter> has three CSS component values the string "counters(".

        If <counter> has two CSS component values the string "counter(".

        The result of serializing the serialized CSS component values belonging to <counter> as list while omitting the last CSS component value if it is 'decimal'.

        ")" (U+0029). 

<frequency>

    The frequency in hertz serialized as per <number> followed by the literal string "hz". 
<identifier>

    The identifier escaped. 
<integer>

    A base-ten integer using digits 0-9 (U+0030 to U+0039) in the shortest form possible, preceded by "-" (U+002D) if it is negative. 
<length>

    A length of zero is represented by the literal string "0px".

    Absolute lengths: the number of millimeters serialized as per <number> followed by the literal string "mm". Rumor has it absolute lengths will become relative lengths. Centimeters would be compatible with <resolution>...

    Relative lengths: the <number> component serialized as per <number> followed by the unit in its canonical form as defined in its respective specification.
<number>

    Browsers seem to use ToString(), but that might give a significand which according to some is teh evil (and also currently does not parse correctly). 
<percentage>

    The <number> component serialized as per <number> followed by the literal string "%" (U+0025). 
<resolution>

    The resolution in dots per centimeter serialized as per <number> followed by the literal string "dpcm". 
<shape>

    The string "rect(", followed by the result of serializing the serialized CSS component values belonging to <shape> as list, followed by ")" (U+0029). 
<string>
<family-name>
<specific-voice>

    The string string escaped. 
<time>

    The time in seconds serialized as per <number> followed by the literal string "s". 
<uri>

    The absolute URL URL escaped. 

<absolute-size>, <border-width>, <border-style>, <bottom>, <generic-family>, <generic-voice>, <left>, <margin-width>, <padding-width>, <relative-size>, <right>, and <top>, are considered macros by this specification. They all represent instances of components outlined above.

One idea is that we can remove this section somewhere in the CSS3/CSS4 timeline by moving the above definitions to the drafts that define the CSS components.
5.6.2.1. Examples

Here are some examples of before and after results on specified values. The before column could be what the author wrote in a style sheet, while the after column shows what querying the DOM would return.
Before 	After
background: none 	background: rgba(0, 0, 0, 0)
outline: none 	outline: invert
border: none 	border: medium
list-style: none 	list-style: disc
margin: 0 1px 1px 1px 	margin: 0px 1px 1px
azimuth: behind left 	azimuth: 220deg
font-family: a, 'b"', serif 	font-family: "a", "b\"", serif
content: url('h)i') '\[\]' 	content: url("h)i") "[]"
azimuth: leftwards 	azimuth: leftwards
color: rgb(18, 52, 86) 	color: #123456
color: rgba(000001, 0, 0, 1) 	color: #000000

Some of these need to be updated per the new rules.
5.6.3. The CSSPropertyValue Interface

interface CSSPropertyValue {
           attribute DOMString cssText;
};

...
5.6.4. The CSSMapValue Interface

[NoInterfaceObject] interface CSSMapValue {
  getter CSSValue (DOMString name);
};

This seems the simplest we can get away with.
5.6.5. The CSSPropertyValueList Interface

[NoInterfaceObject] interface CSSPropertyValueList {
  readonly attribute CSSValue[] list;
};

Ideally this attribute just returns a mutable array.
5.6.6. The CSSComponentValue Interface

[NoInterfaceObject] interface CSSComponentValue {
  readonly attribute DOMString type;
           attribute any value;
};

type returns "string", "keyword", "identifier", "color", "em", "ex", "px", "url".

[NoInterfaceObject] interface CSSStringComponentValue {
           attribute DOMString string;
};

[NoInterfaceObject] interface CSSKeywordComponentValue {
           attribute DOMString keyword;
};

[NoInterfaceObject] interface CSSIdentifierComponentValue {
           attribute DOMString identifier;
};

[NoInterfaceObject] interface CSSColorComponentValue {
           attribute short red;
           attribute short green;
           attribute short blue;
           attribute float alpha;
};

We can make this more complex later. This will probably move into the CSS Color Level 4.

[NoInterfaceObject] interface CSSLengthComponentValue {
           attribute float em;
           attribute float ex;
           attribute float px;
           // figure out what to do with absolute lengths
};

[NoInterfaceObject] interface CSSPercentageComponentValue {
           attribute float percent;
};

[NoInterfaceObject] interface CSSURLComponentValue {
           attribute DOMString? url;
};

6. DOM Access to CSS Declaration Blocks
6.1. The ElementCSSInlineStyle Interface

[NoInterfaceObject] interface ElementCSSInlineStyle {
  readonly attribute CSSStyleDeclaration style;
};

...
6.2. Extensions to the Window Interface

[Supplemental] interface Window {
  CSSStyleDeclaration getComputedStyle(Element elt);
  CSSStyleDeclaration getComputedStyle(Element elt, DOMString pseudoElt);
};

The getComputedStyle(elt, pseudoElt) method must run these steps:

    Let doc be the Document associated with the Window object on which the method was invoked.

    Let obj be elt.

    If pseudoElt is as an ASCII case-insensitive match for either ":before" or "::before" let obj be the '::before' pseudo-element of elt.

    If pseudoElt is as an ASCII case-insensitive match for either ":after" or "::after" let obj be the '::after' pseudo-element of elt.

    Return a CSS declaration block with the CSS declaration block readonly flag set to true and the CSS declaration block declarations set to all properties the user agent supports with as value the resolved value computed for obj using the style rules associated with doc.

    This means that even if obj is in a different document (e.g. one fetched via XMLHttpRequest) it will still use the style rules associated with the document that is associated with the global object on which getComputedStyle() was invoked to compute the CSS declaration block.

Because of historical IDL limitations the getComputedStyle() method used to be on a separate interface, ViewCSS.
7. Resolved Values

getComputedStyle() was historically defined to return the "computed value" of an element or pseudo-element. However, the concept of "computed value" changed between revisions of CSS while the implementation of getComputedStyle() had to remain the same for compatibility with deployed scripts. To address this issue this specification introduces the concept of a resolved value.

The resolved value for a given property can be determined as follows:

'line-height'

    The resolved value is the used value. 
'height'
'margin'
'margin-bottom'
'margin-left'
'margin-right'
'margin-top'
'padding'
'padding-bottom'
'padding-left'
'padding-right'
'padding-top'
'width'

    If the property applies to the element or pseudo-element and the resolved value of the 'display' property is not none, the resolved value is the used value. Otherwise the resolved value is the computed value. 
Any other property

    The resolved value is the computed value. 

8. IANA Considerations
8.1. Default-Style

This section describes a header field for registration in the Permanent Message Header Field Registry.

Header field name
    Default-Style 
Applicable protocol
    http 
Status
    standard 
Author/Change controller
    W3C 
Specification document(s)
    This document is the relevant specification. 
Related information
    None. 

References

This section will be done when going to Last Call. Before that state please ask the author whenever a reference is unclear.
Acknowledgments

The editor would like to thank Alexey Feldgendler, Björn Höhrmann, Christian Krebs, Daniel Glazman, David Baron, fantasai, Hallvord R. M. Steen, Ian Hickson, Lachlan Hunt, Morten Stenshorne, Philip Taylor, Robert O'Callahan, Sjoerd Visscher, Simon Pieters, Sylvain Galineau, and Tarquin Wilton-Jones for contributing to this specification.

And additional bonus thanks to Ian Hickson for writing up the the initial version of the alternative style sheets API and canonicalization (now serialization) rules for CSS values.


******************************************************************************/