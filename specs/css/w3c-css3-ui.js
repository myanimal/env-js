/******************************************************************************
http://www.w3.org/TR/css3-ui/

W3C
CSS3 Basic User Interface Module
W3C Candidate Recommendation 11 May 2004

This version:
    http://www.w3.org/TR/2004/CR-css3-ui-20040511 
Latest version:
    http://www.w3.org/TR/css3-ui 
Previous version:
    http://www.w3.org/TR/2003/WD-css3-ui-20030703/ 
Editor:
    Tantek Çelik (Microsoft Corporation) <tantekc@microsoft.com> 

Copyright © 2004 W3C® (MIT, ERCIM, Keio), All Rights Reserved. W3C liability,
trademark, document use and software licensing rules apply.

Abstract

This section is informative.

CSS (Cascading Style Sheets) is a language for describing the rendering of HTML
and XML documents on screen, on paper, in speech, etc. It uses various
selectors, properties and values to style basic user interface elements in a
document. This specification describes those user interface related selectors,
properties and values that are proposed for CSS level 3 to style HTML and XML
(including XHTML and XForms). It includes and extends user interface related
features from the selectors, properties and values of CSS level 2 revision 1
and Selectors specifications.

Status of this document

This section is normative.

This section describes the status of this document at the time of its
publication. Other documents may supersede it. A list of current W3C
publications and the latest revision of this technical report can be found in
the W3C technical reports index at http://www.w3.org/TR/.

This is a W3C Candidate Recommendation, which means the specification has been
widely reviewed and W3C recommends that it be implemented. It will remain
Candidate Recommendation at least until 11 November 2004.

Publication as a Candidate Recommendation does not imply endorsement by the W3C
Membership. It is inappropriate to cite this document as other than work in
progress.

To find the latest version of this specification, please follow the "Latest
version" link above, or visit the list of W3C Technical Reports.

A test suite and a report on implementations will be provided before the
document becomes a Proposed Recommendation.

The (archived) public mailing list www-style@w3.org (see instructions) is
preferred for discussion of this and other specifications in the Style area.
When commenting on this document, please put the text "CSS3UI" in the subject,
preferably like this: "[CSS3UI] <summary of comment>"

This document is produced by the CSS Working Group (part of the Style Activity,
see summary).

Patent disclosures relevant to CSS may be found on the Working Group's public
patent disclosure page. The document was developed under the 24 January 2002
CPP as amended by the W3C Patent Policy Transition Procedure.

Candidate Recommendation Exit Criteria

For this specification to exit the CR stage, the following conditions must be
met:

    There must be at least two interoperable implementations for every feature. For the purposes of this criterion, we define the following terms:

    feature

        A section or subsection of the specification.

    interoperable

        passing the respective test cases in the test suite, or, if the implementation is not a web browser, equivalent tests. Every relevant test in the test suite should have an equivalent test created if such a user agent (UA) is to be used to claim interoperability. In addition if such a UA is to be used to claim interoperability, then there must one or more additional UAs which can also pass those equivalent tests in the same way for the purpose of interoperability. The equivalent tests must be made publicly available for the purposes of peer review.

    implementation

        a user agent which:
            implements the feature.

            is available (i.e. publicly downloadable or available through some
            other public point of sale mechanism). This is the "show me"
            requirement.

            is shipping (i.e. development, private or unofficial versions are
            insufficient).
            
             is not experimental (i.e. is intended for a wide audience and
            could be used on a daily basis).

    A minimum of six months of the CR period must have elapsed. This is to
    ensure that enough time is given for any remaining major errors to be
    caught.
    
     The CR period will be extended if implementations are slow to appear.
    
     Features that are at risk (see the below list) will be dropped (thus
    reducing the list of "all" features mentioned above) if two or more
    interoperable implementations of those features are not found by the end of
    the CR period, or if sufficient and adequate tests (by judgment of the
    Working Group) have not been produced for those features by the end of the
    CR period.

Features at risk

The Working Group has identified the following features as at risk of being
removed from CSS3 Basic User Interface when exiting CR. Implementors are urged
to implement these features, if they wish to see these features remain in this
specification. All other features are either defined in a normative reference
(e.g. CSS 2.1 [CSS21] or Selectors [SELECT]), or dependencies for another
specification (e.g. XForms [XFORMS10]) or are believed to have one or more
implementations (perhaps experimental), and thus will not be dropped without
returning to last call.

    'cursor' property values: ew-resize | ns-resize | nesw-resize | nwse-resize
    'font' property values: window | document | workspace | desktop | tooltip | dialog | button | push-button | hyperlink | radio-button | checkbox | menu-item | tab | menubar | pull-down-menu | pop-up-menu | list-menu | radio-group | checkbox-group | outline-tree | range | field | combo-box | signature | password
    'content' property value: icon
    'icon' property
    'resize' property 

Overview

This section is informative.

This document is one of the "modules" for the upcoming CSS3 specification. It
not only describes the user interface related properties and values that
already exist in CSS1 [CSS1] and CSS2.1 [CSS21], but introduces new properties
and values for CSS3 as well. The Working Group doesn't expect that all
implementations of CSS3 will implement all properties or values. Instead, there
will probably be a small number of variants of CSS3, so-called "profiles".

This document is the result of the merging of relevant parts of the following
Recommendations and Working Drafts, and the addition of some new features.

    Cascading Style Sheets, level 2, revision 1 [CSS21]
    User Interface for CSS3 (16 February 2000) [CSSUI] 

This specification contains:

    Pseudo-classes and pseudo-elements to style user interface states and
    element fragments respectively.
    
    Additions to the user interface features in CSS2.1.
    
    The ability to style the appearance of various standard form elements in
    languages such as HTML/XHTML/XForms (and properties to augment or replace
    some of the remaining stylistic attributes in HTML4/XHTML1).
    
    Directional focus navigation properties.
    
    A mechanism to allow the styling of elements as icons for accessibility.

Table of contents

    1. Introduction
        1.1. Purpose
        1.2. Scope 
    2. Conformance
        2.1. Definitions
        2.2. Classes of products
        2.3. Profiles
        2.4. Extensions 
    3. Dependencies on other modules
    4. User Interface Selectors
        4.1. User interface states: pseudo-classes
            4.1.1. :active details
            4.1.2. :default
            4.1.3. :valid and :invalid
            4.1.4. :in-range and :out-of-range
            4.1.5. :required and :optional
            4.1.6. :read-only and :read-write 
        4.2. User interface element fragments: pseudo-elements
            4.2.1. ::value
            4.2.2. ::choices
            4.2.3. ::repeat-item
            4.2.4. ::repeat-index 
    5. System Appearance
        5.1. Appearance values
        5.2. 'appearance' property
        5.3. System fonts 
    6. Element icons
        6.1. 'content' property addition
        6.2. 'icon' property 
    7. Box Model addition
        7.1. 'box-sizing' property 
    8. Outline properties
        8.1. 'outline' property
        8.2. 'outline-width' property
        8.3. 'outline-style' property
        8.4. 'outline-color' property
        8.5. 'outline-offset' property 
    9. Resizing
        9.1. 'resize' property 
    10. Mouse and Keyboard
        10.1. 'cursor' property
        10.2. Keyboard control
            10.2.1. Sequential navigation order: the 'nav-index' property
            10.2.2. Directional focus navigation: the 'nav-up', 'nav-right', 'nav-down', 'nav-left' properties 
    Appendix A. Acknowledgments
    Appendix B. Bibiliography
    Appendix C. Changes
    Appendix D. Default style sheet additions for HTML4/XHTML1
    Appendix E. Example profiles
    Appendix F: Test Suite
    Index
    Property index 

1. Introduction

This section is normative.

CSS3 is a set of modules, divided up and profiled in order to simplify the specification, and to allow implementors the flexibility of supporting the particular modules appropriate for their implementations.

This module describes selectors and CSS properties which enable authors to style user interface related states, element fragments, properties and values.

Section 2.1 of CSS1 [CSS1] and Chapter 18 of CSS2 [CSS2] introduced several user interface related pseudo-classes, properties and values. Section 6.6.4 of Selectors [SELECT] also describes several additional user interface related pseudo-classes (and one pseudo-element).

This Working Draft extends them to provide the ability, through CSS, to style elements based upon additional user interface states, to style fragments of user interface elements, and to alter the dynamic presentation of elements in ways previously only available through specific HTML4/XHTML1 elements and attributes.
1.1. Purpose

The purpose of this specification is to achieve the following objectives:

    Extend the user interface features in CSS2.1.
    Provide additional CSS mechanisms to simulate the appearance of various standard form elements.
    Provide additional CSS mechanisms to augment or replace other dynamic presentation related features in HTML4/XHTML1.
    Introduce directional navigation properties to assist in the construction of user interfaces which make use of a directional navigation model.
    Introduce properties and values to specify icon presentations for elements to enhance accessibility. 

1.2. Scope

This proposal specifies how to alter the look and feel of various elements, and specifically does not address the meaning behind what a specific look and feel may imply. For example, with the additions in the proposal, an author can make any element look and even feel like a submit button. Yet, that arbitrary element is not afforded any additional meaning, so pushing it does nothing by default, and certainly does not submit a form.

Similarly, the HTML4 <SELECT> element for example, provides a list or menu of choices to the user. The meaning of the HTML4 <SELECT> element is that it allows the user to make a choice, to choose something among several alternatives. This says nothing about its look and feel, and in fact, the "concept" of a HTML4 <SELECT> could be visually implemented as a list-box, a popup-menu, or a group of radio-buttons. Or a group of HTML4 checkboxes (<INPUT type="checkbox">) could be styled to appear as a group of radio-buttons, and yet, since those elements are still semantic checkboxes, they can still be individually checked or unchecked, rather than acquiring any kind of radio-button group semantic where only one can be checked.

Each example of presentation has a different look and feel, but maintains its original meaning, a choice (or choices) among several alternatives. This proposal addresses only the former (look and feel), not the latter (meaning).

Since this proposal serves to simulate the appearance of various user interface and forms elements in HTML4/XHTML, it is perhaps useful to call out what specifically is believed to be outside the scope of CSS, or better suited to document structure rather than style and therefore not addressed by this proposal:

    Form semantics, including, but not limited to, submission, resetting, naming, what determines a successful or valid form control, and how to process form data.
    Form contents, including, but not limited to initial value, current value, and form content types. The HTML4 'maxlength' attribute, for example, determines the maximum number of characters the user can enter into an <INPUT type="text"> or <INPUT type="password"> field, and as such is a content constraint rather than a presentational suggestion.
    Form control dependencies, including, but not limited to, whether only one option from a set of choices may be chosen, or whether multiple options may be chosen.
    The HTML4/XHTML1 <form> element and its unique attributes ('action', 'method', 'enctype', 'accept', 'accept-charset'). 

In addition, this document does not attempt to solve all user interface related issues / features that can be found in modern user interfaces. Perhaps future versions may attempt to solve these. For example:

    Complex or composite controls (e.g. the HTML4 <INPUT type="file"> and the <ISINDEX> elements).
    The appearance, styling and coloring of scrollbars.
    Window layering. There is no attempt made to distinguish the appearance of elements in the front-most window versus non-front-most windows. The semantics of window layering must be addressed before it is appropriate to attempt to style such concepts.
    Palettes and floating windows. Along with the concept of "frontmost" window, windows that float but do not receive focus are also not addressed.
    Browser window chrome and toolbars.
    The default styling of the HTML4/XHTML1 <fieldset>, <legend>, <frame> and <frameset> elements.
    Frame-resizing behavior. The behavior of <frame> and <frameset>, specifically the ability to "share" resizability when elements share a border, perhaps by leveraging the border-collapse property is also not addressed. 

2. Conformance

This section is normative.
2.1. Definitions

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 (see [RFC2119]). However, for readability, these words do not typically appear in all uppercase letters in this specification.

Additional key words, e.g. "User agent (UA)", are defined by CSS 2.1 ([CSS21], section 3.1).
2.2. Classes of products

The following classes of products (many of which overlap) should consider implementing this specification:

    Web browsers
    User agents that implement one or more of the following types of content: HTML (e.g. [HTML401]), XHTML (e.g. [XHTML10], [XHTML11]), XForms (e.g. [XFORMS10]), SVG (e.g. [SVG10], [SVG11]) or other content languages that contain forms controls or are intended for user interaction
    User agents that implement one or more levels, modules and or profiles of CSS (e.g. [CSS1], [CSS21]) 

2.3. Profiles

This specification contains a number of informative profiles. These profiles are not mandatory for conformance.
2.4. Extensions

This specification does not define any explicit extension mechanisms. If an implementation needs to extend the functionality of this specification, it must follow any/all guidelines and requirements of extensions as defined in CSS2.1, e.g. Vendor-specific extensions ([CSS21], section 4.1.2).
3. Dependencies on other modules

This section is normative.

This CSS3 module depends on the following other specifications. Some of these specifications may be in their "Candidate Recommendation" phase. If this module depends on feature or portion of such a specification which ends up being dropped during their "CR" phase(s), then such feature or portion thereof will be presumed to be incorporated into this specification. For example, if the ":indeterminate" selector was dropped from Selectors, then the definition and description of ":indeterminate" would be incorporated into the next draft of this specification.

    [SELECT]
    [CSS3COLOR]
    [CSS21] 

The following work is related to the CSS3 Module Basic User Interface Working Draft.

    [HTML401]
    [UAAG10]
    [XML10]
    [XHTML10]
    [XHTML11]
    [XFORMS10] 

This specification does not define what is a form element.
4. User Interface Selectors

This section is normative.
4.1. User interface states: pseudo-classes

The Selectors specification defines several user interface selectors ([SELECT], sections 6.6.1 and 6.6.4) which represent user interface states:

    :hover
    :active
    :focus
    :enabled
    :disabled
    :checked
    :indeterminate 

These pseudo-classes as defined by [SELECT] are included in this specification by reference.

CSS 2.1 [CSS21] specifies additional details for some of the selectors mentioned, above and beyond Selectors.
4.1.1. :active details

In addition, on systems with more than one mouse button, :active is clarified to apply only to the primary or primary activation button (typically the "left" mouse button), and any aliases thereof.
restyling a checkbox

Authors may wish to completely redo the styling of a form control, such as a checkbox. This can be achieved using several of the above pseudo-classes and the 'normal' value for the 'appearance' property which is explained later in this specification. In this example, checkboxes with a class of "redone" are styled with specific background images according to their respective user interface states using one or more pseudo-classes.


input[type=checkbox] { 
  appearance:checkbox; /* expected from UA defaults *\/
}

input[type=checkbox].redone { 
  appearance:normal;  /* resets various properties *\/
  display:inline-block;
  width:20px; height:20px; 
  background:url(customuncheckedimage.png);
}

input[type=checkbox].redone:active {
  background:url(customuncheckedactiveimage.png);
}

input[type=checkbox].redone:checked {
  background:url(customcheckedimage.png);
}

input[type=checkbox].redone:checked:active {
  background:url(customcheckedactiveimage.png);
}

input[type=checkbox].redone:disabled {
  background:url(customdisableduncheckedimage.png);
}

input[type=checkbox].redone:disabled:checked {
  background:url(customdisabledcheckedimage.png);
}

New user interface state pseudo-classes

In addition to the above-mentioned pseudo-classes, this specification introduces several new pseudo-classes to define additional user interface states.

    :default
    :valid
    :invalid
    :in-range
    :out-of-range
    :required
    :optional
    :read-only
    :read-write 

Specifically, these new states (except for :default) are provided as a way to style elements which are in the respective states as defined by XForms [XFORMS10].
4.1.2. :default

The :default selector applies to the one or more UI elements that are the default among a set of similar elements. Typically applies to context menu items, buttons and select lists/menus.

One example is the default submit button among a set of buttons. Another example is the default option from a popup menu. Multiple elements in a select-many group could have multiple :default elements, like a selection of pizza toppings for example.
4.1.3. :valid and :invalid

An element is :valid or :invalid when it is, respectively, valid or invalid with respect to data validity semantics defined by a different specification (e.g. [XFORMS10]). An element which lacks data validity semantics is neither :valid nor :invalid. This is different from an element which otherwise has no constraints. Such an element would always be :valid.
4.1.4. :in-range and :out-of-range

The :in-range and :out-of-range pseudo-classes apply only to elements that have range limitations. An element is :in-range or :out-of-range when the value that the element is bound to is in range or out of range of the presentation (e.g. visual or spoken representation) of the element respectively. An element that lacks data range limits or is not a form control is neither :in-range nor :out-of-range. E.g. a slider element with a value of 11 presented as a slider control that only represents the values from 1-10 is :out-of-range. Another example is a menu element with a value of "E" that happens to be presented as a popup menu that only has choices "A", "B" and "C".
4.1.5. :required and :optional

A form element is :required or :optional if a value for it is, respectively, required or optional before the form it belongs to is submitted. Elements that are not form elements are neither required nor optional.
4.1.6. :read-only and :read-write

An element whose contents are not user-alterable is :read-only. However, elements whose contents are user-alterable (such as text input fields) are considered to be in a :read-write state. In typical documents, most elements are :read-only. However it may be possible (e.g. in the context of an editor) for any element to become :read-write.
4.2. User interface element fragments: pseudo-elements

Selectors ([SELECT], section 7.3) also defines one user interface element fragment selector:

    ::selection 

This pseudo-element is included in this specification as defined by [SELECT] by reference.

In addition to the above-mentioned pseudo-element, this specification introduces four new pseudo-elements to provide access to additional user interface element fragments.

    ::value
    ::choices
    ::repeat-item
    ::repeat-index 

Specifically, these new pseudo-elements are provided as a way to style user interface fragments as defined by XForms [XFORMS10].
4.2.1. ::value

A form element may contain both a label for its data value, and the data value itself. For such elements, the ::value pseudo-element selects the representation of just the data value itself, in order to style its appearance.
fictional markup and illustration

Here is an example which illustrates the ::value of a text input field with fictional markup which is then styled with CSS.
sample XForms fragment with fictional markup:


<input>
  <label>Zip code<label>
  <input::value/>
</input>

sample CSS:


input { border:dashed }
label { border:dotted }
input::value { border:solid }

an (X)HTML+CSS approximation of this example

Zip code

Spacing (in the form of padding) has been added to the above approximation to separate the borders and make the individual (pseudo-)elements easier to distinguish.
4.2.2. ::choices

Similarly, a form element which represents a list of options may contain both a label for the list, and the list of choices itself. For such elements, the ::choices pseudo-element selects the representation of just the list of choices themselves, in order to style their appearance.

A list of radio buttons can also be selected with the ::choices pseudo-element, and the currently chosen radio button can be selected with the ::value pseudo-element.
4.2.3. ::repeat-item

The ::repeat-item pseudo-element represents a single item from a repeating sequence. It is generated as a parent to all the elements in a single repeating item. Each ::repeat-item is associated with a particular instance data node, and is affected by the model item properties (e.g. 'relevant') found there, as the related style properties will cascade to the child elements.
4.2.4. ::repeat-index

The ::repeat-index pseudo-element represents the current item of a repeating sequence. It takes the place of the ::repeat-item as a parent of all the elements in the index repeating item.

Note. Any style declarations that an author wants to apply to all repeat items, including the index, must be done so by using both ::repeat-item and ::repeat-index selectors. Styles that are only applied to ::repeat-item will not automatically be applied to the respective ::repeat-index.
::repeat-item and ::repeat-index fictional markup

Here is an example that illustrates both ::repeat-item and ::repeat-index, since they are often both available and used at the same time. Assume appropriate namespace declarations were made in a header somewhere preceding the code in the example.

The following markup snippet uses XHTML and XForms:


<html:table xforms:repeat-nodeset="...">
   <html:tr>
      <html:td><xforms:input ref="..."/><xforms:input ref="..."/></html:td>
   </html:tr>
</html:table>

The following style rules are used to style all the repeated items and the current repeated item.


html|tr::repeat-item { outline: medium solid; color:gray }
html|tr::repeat-index { outline: medium dashed; color:black }

The following fictional markup shows the state of the above markup when through user interaction the XForm contains three of the repeated items, where the third item is current.


<html:table xforms:repeat-nodeset="...">
 <html:tr::repeat-item>
  <html:tr>
   <html:td><xforms:input ref="..."/><xforms:input ref="..."/></html:td>
  </html:tr>
 </html:tr::repeat-item>
 <html:tr::repeat-item>
  <html:tr>
   <html:td><xforms:input ref="..."/><xforms:input ref="..."/></html:td>
  </html:tr>
 </html:tr::repeat-item>
 <html:tr::repeat-index>
  <html:tr>
   <html:td><xforms:input ref="..."/><xforms:input ref="..."/></html:td>
  </html:tr>
 </html:tr::repeat-index>
</html:table>

Note. The ::repeat-index pseudo-element takes the place of the ::repeat-item rather than being nested inside as a separate element. Thus just like :link or :visited are mutually exclusive for selecting hyperlinks, only one will exist and apply to a particular repeated item at any point.
UI selectors example from XForms 1.0

The following example from XForms 1.0 ([XFORMS10], section F.3) shows how basic styling can be accomplished on form controls and repeating structures using the new pseudo-classes and XForms elements.


@namespace xforms url(http://www.w3.org/2002/xforms);
/* Display a red background on all invalid form controls *\/
*:invalid { background-color:red; }
/* Display a red asterisk after all required form controls *\/
*:required::after { content: "*"; color:red; }
/* Do not render non-relevant form controls *\/
*:disabled { visibility: hidden; }
/* The following declarations cause form controls and their labels
to align neatly, as if a two-column table were used *\/
xforms|group { display: table; }
xforms|input { display: table-row; }
xforms|input > xforms|label { display: table-cell; }
xforms|input::value { border: thin black solid; display: table-cell; }
/* Display an alert message when appropriate *\/
*:valid   > xforms|alert { display: none; }
*:invalid > xforms|alert { display: inline; }
/* Display repeat-items with a dashed border *\/
*::repeat-item,*::repeat-index { border: dashed; }
/* Display a teal highlight behind the current repeat item *\/
*::repeat-index { background-color: teal; }

5. System Appearance

This section is normative.
5.1. Appearance values

CSS2 introduced the concept of system colors, which is a set of keywords that allows authors to specify colors in a manner that integrates them into the user's graphic environment. However, color is not the only property for which native form controls have a default.

The properties defined and extended in this section refer to the <appearance> value type, which may take one of the following values which have been derived from the list of CSS2.1 System Colors ([CSS21], section 18.2), the list of HTML4 form controls ([HTML401], section 17), and additional typical platform user interface (UI) controls (e.g. dialog window, icon):

icon
    a small picture representing an object, often with a name or label. 
window
    a viewport, a framed surface used to present objects and content for user viewing and interaction. There are several specific types of windows:

    desktop
        a window used to represent a system as a whole that often contains other windows. 
    workspace
        a window used to represent a project or application that may contain other windows, typically with a titlebar that shows the name of the project or application. 
    document
        a window used to represent a user document, typically with a titlebar that shows its name. May also be used to represent folders or directories in a file system. 
    tooltip
        a window that is used to temporarily display information or help about an object. Also called "info" in the CSS2 system colors. 
    dialog
        a window used to present a notification or alternatives for the user to choose as part of an action taken by the user. Also called "message-box" in the CSS2 system fonts. 

button
    a small object usually labeled with text that represents a user choice

    push-button
        a button that has a border surrounding it, often beveled to appear three dimensional, as if it is raised. Also called "caption" in CSS2 system fonts. 
    hyperlink
        a button that represents a hypertext link, often as simple as normal text that is underlined and perhaps colored differently. 
    radio-button
        a button that displays whether or not it is checked with a small circle next to the button label. There may be a disc inside the circle when the button is checked. An indeterminate (neither checked nor unchecked) state may be indicated with some other graphic in the circle. 
    checkbox
        a button that displays whether or not it is checked with a small box next to the button label. There may be an 'x' or check mark inside the box when the button is checked. An indeterminate (neither checked nor unchecked) state may be indicated with a dash '-' or a square or some other graphic in the box. 
    menu-item
        a choice within a menu, which may also act as a label for a nested (hierarchical) menu. 
    tab
        a button representing the label for a pane in a tabbed interface. 

menu
    a set of options for the user to choose from, perhaps more than one at a time. There are several specific types of menus.

    menubar
        a menu of menus, typically arranged linearly, in a horizontal bar. 
    pull-down-menu
        a menu where the name of the menu is displayed and the options remain hidden until the user activates the menu. When the user releases or deactivates the menu, the options are hidden again. 
    pop-up-menu
        a menu where all but the currently selected option remains hidden until the user activates the menu. When the user releases or deactivates the menu, all but the selected option are hidden again. 
    list-menu
        a list of options for the user to choose from, perhaps more than one at a time. 
    radio-group
        a menu where the options are displayed as radio-buttons. 
    checkbox-group
        a menu where the options are displayed as checkboxes. 
    outline-tree
        a menu where the options can be shown or hidden with small widgets, often represented by a small triangle or plus and minus signs. 
    range
        a control that displays the current option, perhaps graphically and allows the user to select other options, perhaps by dragging a slider or turning a knob. 

field
    an area provided for a user to enter or edit a value, typically using a keyboard. There are several special fields.

    combo-box
        a field which is accompanied by a menu of preset values that can be used to quickly enter common or typical values. 
    signature
        a field for entering a signature. 
    password
        a field for entering a password. Typically the text is rendered as a set of bullets or boxes to obscure the value. 

Conforming user agents must support the five generic appearance values: 'icon', 'window', 'button', 'menu' and 'field'. If a user agent or platform does not support a specific user interface element (e.g. 'dialog'), it may apply the values for the respective generic user interface element (e.g. 'window').

Note. This specification recommends that user agents allow users to override system appearance and font selections with their own choices or proportions, within the user agent. See the User Agent Accessibility Guidelines, specifically Ensure user control of rendering ([UAAG10], section 2 guideline 4).
5.2. 'appearance' property
Name: 	appearance
Value: 	normal | <appearance> | inherit
Initial: 	normal
Applies to: 	all elements
Inherited: 	no
Percentages: 	N/A
Media: 	visual, interactive
Computed value: 	specified value

This document introduces the 'appearance' property which can be used to make an element look like a standard user interface element on the platform.
A few 'appearance' values demonstrated using HTML4
'appearance' 	HTML4 demonstration
normal 	hello
button 	
push-button 	
hyperlink 	CSS home page
radio-button 	Sticky
checkbox 	Gift wrap
pop-up-menu 	Honey
list-menu 	Honey
radio-group 	
tea Earl Grey lemon ginger green tea jasmine tea
checkbox-group 	
pizza toppings fresh basil fresh garlic fresh spinach green peppers mushrooms olives onions pineapple tomatoes
field 	Note to self.
password 	
'appearance' property details

The 'appearance' property is a shorthand for 'appearance', 'color', 'font', and 'cursor'. It sets 'appearance' to the specified value and the other properties to their appropriate system value; 'normal' resets 'appearance' to 'normal' and the others to 'inherit'. The 'appearance' property does not affect the specified or computed values of any other properties.

If 'appearance' is not 'normal', the UA must render the element as if it was the specified user interface (UI) control from the platform. The UA should use the computed values of the 'background-*', 'border-*', 'padding-*', 'outline-*', and 'text-decoration' properties when they do not have their initial values and the computed values of 'color', 'font', and 'cursor' (whatever their values) to influence the rendering where possible. Any values from those properties that cannot be used to influence the rendering of the UI control must not affect the rendering at all.

For example, the UA should not draw a second border around a UI control that already has a border.

If 'background-color' or 'background-image' have non-initial values and the UA is using their values for influencing the rendering of the UI control, then the UA must ensure that the 'color' property is also used to influence the rendering.

Other properties must not affect the handling of 'appearance' and must instead be applied according to normal CSS rules. In particular 'margin', 'display', 'float', 'height', 'width', and 'line-height', are not ignored and affect the element as normal.

This specification does not define the term "platform".

For example, it could be the native graphical rendering engine of the operating system, or it could be a user-agent-specific skin. In addition, which of several toolkits to use could also be decided on an element-by-element basis depending on the values of the 'background-color', 'background-image', 'border-*-style', and 'outline-style' properties, so that the author styles could be honored while still honoring 'appearance' even though the UA is unable to influence the rendering of OS native UI controls.

Note. The exact list of properties set by, influencing, and not affected by 'appearance' given in the lists above may be adjusted based on UA implementor feedback.

Appearance values take into account the user interface state (if any) of the element; thus there is no need for separate values for enabled vs. disabled checkboxes for example.
Influencing the color and background-color of a button

This example demonstrates setting the color and background-color of an element that is set to 'appearance:push-button'.
sample CSS:


input[type=button] {
  appearance:push-button; /* expected from UA defaults *\/
}

input[type=button].custom { 
  color: #393;
  background-color: #9cf; 
}

sample (X)HTML fragment:


<input type="button" value="Plain button" /> 
<input type="button" value="With color" class="custom" />

A graphical browser might render these buttons as follows:

First, a rounded button with black text on a white background, with shades of gray being used near the edges to give the impression of depth. Second, a similar rounded button but with blue text on a light blue background, and with shades of blue used to give the impression of depth.
Your browser on your system:

5.3. System fonts

CSS2 introduced system font keywords as values for the shorthand 'font' property which have the effect of setting all the elemental 'font-*' properties. This specification adds the list of <appearance> values to the set of system fonts to allow styling text the same as such system controls.
Name: 	font
System values: 	<appearance> | status-bar | message-box | caption | small-caption | inherit
Initial: 	see individual properties in CSS 2.1
Applies to: 	all elements
Inherited: 	yes
Percentages: 	N/A for system values
Media: 	visual
Computed value: 	The computed values for system font keywords are simply the keywords themselves.

icon
    The font used to label icons. 
window
    The font used in the content of a window. 
desktop
    The font used on the desktop. 
workspace
    The font used in a workspace window. 
document
    The font used for the content of a document window. 
tooltip
    The font used in a tooltip window. 
status-bar
    The font used in window status bars. 
dialog
message-box
    The font used in dialog boxes. 
button
caption
    The font used for buttons (captioned controls etc.). 
small-caption
    The font used for labeling small controls. 
push-button
    The specific font used for push-buttons. 
hyperlink
    The specific font used for hyperlinks. 
radio-button
    The specific font used for radio-button labels. 
checkbox
    The font used for checkbox button labels. 
menu-item
    The font used for menu-item labels. 
tab
    The font used for tab labels in a tabbed panel interface. 
menu
    The font used in menus (e.g., dropdown menus and menu lists). 
menubar
    The specific font used in a menubar. 
pull-down-menu
    The specific font used in pull-down menus. 
pop-up-menu
    The specific font used in popup menus. 
list-menu
    The specific font used in menu lists. 
radio-group
    The specific font used in radio button groups. 
checkbox-group
    The specific font used in checkbox button groups. 
outline-tree
    The specific font used in outline tree views. 
range
    The specific font used in range controls. 
field
    The specific font used in form text fields (input or output). 
combo-box
    The specific font used in a combo-box field. 
signature
    The specific font used in a signature field. 
password
    The specific font used in a password field. 

6. Element icons

This section is normative.
6.1. 'content' property addition
Name: 	content
New Value(s): 	icon
Initial: 	same as CSS 2.1
Applies to: 	same as CSS 2.1
Inherited: 	same as CSS 2.1
Percentages: 	same as CSS 2.1
Media: 	same as CSS 2.1
Computed value: 	the keyword 'icon' if specified as such, otherwise same as CSS 2.1

icon
    The (pseudo-)element is replaced in its entirety by the resource referenced by its 'icon' property, and treated as a replaced element. 

Note. It is expected that the next draft of the CSS3 Generated Content module [CSS3GENCON] will include and superset this functionality.
6.2. 'icon' property
Name: 	icon
Value: 	auto | <uri> [, <uri>]* | inherit
Initial: 	auto
Applies to: 	all elements
Inherited: 	no
Percentages: 	N/A
Media: 	all
Computed value: 	The computed value for 'auto' is 'auto'. The computed value for the <uri> value is either the fully qualified URI value for the referenced icon that the UA is able to render, or 'auto' if the UA did not find any referenced icons that it could render.

auto
    Use a default generic icon provided by the user agent. 
<uri>
    URIs (see [URI], [RFC1738] and [RFC1808]) provide a way of identifying resources. The <uri> value(s) in this property refer to one or more icons in a comma delimited list. The user agent loads the referenced icons one by one until it finds one that it is able to render. This permits the usage of multiple different icon formats for various platforms, and various media for that matter. 

The 'icon' property provides the author the ability to style any arbitrary element with an iconic equivalent. An element's icon is not used/rendered unless the 'content' property is set to the value 'icon' (see above). Documents whose elements have icons assigned to them can be more easily viewed by users who find too much text distracting.
Representing elements with icons

This example uses the above icon features to display icons in place of images and objects.


img,object { content:icon }
  /* note that the CSS3 Generated Content module [CSS3GENCON]
     expands the 'content' property to apply to all elements. *\/
     
img { icon:url(imgicon.png); }
  /* provide a custom icon for images *\/
  
object { icon:url(objicon.png); }
  /* provide a different custom icon for objects *\/

7. Box Model addition

This section is normative.
7.1. 'box-sizing' property
Name: 	box-sizing
Value: 	content-box | border-box | inherit
Initial: 	content-box
Applies to: 	all elements that accept width or height
Inherited: 	no
Percentages: 	N/A
Media: 	visual
Computed value: 	specified value

content-box
    This is the behavior of width and height as specified by CSS2.1. The specified width and height (and respective min/max properties) apply to the width and height respectively of the content box of the element. The padding and border of the element are laid out and drawn outside the specified width and height. 
border-box
    The specified width and height (and respective min/max properties) on this element determine the border box of the element. That is, any padding or border specified on the element is laid out and drawn inside this specified width and height. The content width and height are calculated by subtracting the border and padding widths of the respective sides from the specified 'width' and 'height' properties. As the content width and height cannot be negative ([CSS21], section 10.2), this computation is floored at 0.

    Note. This is the behavior of width and height as commonly implemented by legacy HTML user agents for replaced elements and input elements.

Using box-sizing to evenly share space

This example uses box-sizing to evenly horizontally split two divs with fixed size borders inside a div container, which would otherwise require additional markup.
sample CSS:


div.container {
	width:38em;
	border:1em solid black;
}

div.split {
	box-sizing:border-box;
	width:50%;
	border:1em silver ridge;
	float:left;
}

sample (X)HTML fragment:


<div class="container">
<div class="split">This div occupies the left half.</div>
<div class="split">This div occupies the right half.</div>
</div>

demonstration of sample CSS and (X)HTML:
This div should occupy the left half.
This div should occupy the right half.
The two divs above should appear side by side, each (including borders) 50% of the content width of their container. If instead they are stacked one on top of the other then your browser does not support 'box-sizing'.
8. Outline properties

This section is normative.

At times, style sheet authors may want to create outlines around visual objects such as buttons, active form fields, image maps, etc., to make them stand out. Outlines differ from borders in the following ways:

    Outlines do not take up space.
    Outlines may be non-rectangular. 

The outline properties control the style of these dynamic outlines.
8.1. 'outline' property
Name: 	outline
Value: 	[ <'outline-color'> || <'outline-style'> || <'outline-width'> ] | inherit
Initial: 	see individual properties
Applies to: 	all elements
Inherited: 	no
Percentages: 	N/A
Media: 	visual
Computed value: 	undefined for shorthand properties
8.2. 'outline-width' property
Name: 	outline-width
Value: 	<border-width> | inherit
Initial: 	medium
Applies to: 	all elements
Inherited: 	no
Percentages: 	N/A
Media: 	visual
Computed value: 	<length> value in absolute units (px or physical).
8.3. 'outline-style' property
Name: 	outline-style
Value: 	auto | <border-style> | inherit
Initial: 	none
Applies to: 	all elements
Inherited: 	no
Percentages: 	N/A
Media: 	visual
Computed value: 	specified value
8.4. 'outline-color' property
Name: 	outline-color
Value: 	<color> | invert | inherit
Initial: 	invert
Applies to: 	all elements
Inherited: 	no
Percentages: 	N/A
Media: 	visual
Computed value: 	The computed value for 'invert' is 'invert'. For <color> values, the computed value is as defined for the [CSS3COLOR] 'color' property.

The outline created with the outline properties is drawn "over" a box, i.e., the outline is always on top, and doesn't influence the position or size of the box, or of any other boxes. Therefore, displaying or suppressing outlines does not cause reflow.

Outlines may be non-rectangular. For example, if the element is broken across several lines, the outline should be an outline or minimum set of outlines that encloses all the element's boxes. Each part of the outline should be fully connected rather than open on some sides (as borders on inline elements are when lines are broken). The parts of the outline are not required to be rectangular. The position of the outline may be affected by descendant boxes. User agents should use an algorithm for determining the outline that encloses a region appropriate for conveying the concept of focus to the user.

The 'outline-width' property accepts the same values as 'border-width' ([CSS21], section 8.5.1).

The 'outline-style' property accepts the same values as 'border-style' ([CSS21], section 8.5.3), except that 'hidden' is not a legal outline style. In addition, in CSS3, 'outline-style' accepts the value 'auto'. The 'auto' value permits the user agent to render a custom outline style, typically a style which is either a user interface default for the platform, or perhaps a style that is richer than can be described in detail in CSS, e.g. a rounded edge outline with semi-translucent outer pixels that appears to glow. As such, this specification does not define how the 'outline-color' is incorporated or used (if at all) when rendering 'auto' style outlines. User agents may treat 'auto' as 'solid'.

The 'outline-color' property accepts all colors, as well as the keyword 'invert'. 'Invert' is expected to perform a color inversion on the pixels on the screen. This is a common trick to ensure the focus border is visible, regardless of color background.

Conformant UAs may ignore the 'invert' value on platforms that do not support color inversion of the pixels on the screen. If the UA does not support the 'invert' value then the initial value of the 'outline-color' property is the 'currentColor' [CSS3COLOR] keyword.

The 'outline' property is a shorthand property, and sets all three of 'outline-style', 'outline-width', and 'outline-color'.

Note. The outline is the same on all sides. In contrast to borders, there are no 'outline-top' or 'outline-left' etc. properties.

This specification does not define how multiple overlapping outlines are drawn, or how outlines are drawn for boxes that are partially obscured behind other elements.

Here's an example of drawing a thick outline around a BUTTON element:


button { outline: thick solid }

Graphical user interfaces may use outlines around elements to tell the user which element on the page has the focus. These outlines are in addition to any borders, and switching outlines on and off should not cause the document to reflow. The focus is the subject of user interaction in a document (e.g., for entering text, selecting a button, etc.).

For example, to draw a thick black line around an element when it has the focus, and a thick red line when it is active, the following rules can be used:


:focus  { outline: thick solid black }
:active { outline: thick solid red }

Note. Since the outline does not affect formatting (i.e., no space is left for it in the box model), it may well overlap other elements on the page.
8.5. 'outline-offset' property

By default, the outline is drawn starting just outside the border edge. However, it is possible to offset the outline and draw it beyond the border edge.
Name: 	outline-offset
Value: 	<length> | inherit
Initial: 	0
Applies to: 	all elements
Inherited: 	no
Percentages: 	N/A
Media: 	visual
Computed value: 	<length> value in absolute units (px or physical).

If the computed value of 'outline-offset' is anything other than 0, then the outline is outset from the border edge by that amount.

For example, to leave 2 pixels of space between a focus outline and the element that has the focus, or is active, the following rule can be used:


:focus,:active  { outline-offset: 2px }

9. Resizing

This section is normative.

CSS2.1 provides a mechanism for controlling the appearance of a scrolling mechanism (e.g. scrollbars), and this specification adds to that a mechanism for controlling user resizability of elements.
9.1. 'resize' property

The 'resize' property allows the author to specify whether or not an element is resizable by the user, and if so, along which axis/axes.
Name: 	resize
Value: 	none | both | horizontal | vertical | inherit
Initial: 	none
Applies to: 	elements with 'overflow' other than visible
Inherited: 	no
Percentages: 	N/A
Media: 	visual
Computed value: 	specified value.

none
    The UA does not present a resizing mechanism on the element, and the user is given no direct manipulation mechanism to resize the element. 
both
    The UA presents a bidirectional resizing mechanism to allow the user to adjust both the height and the width of the element. 
horizontal
    The UA presents a unidirectional horizontal resizing mechanism to allow the user to adjust only the width of the element. 
vertical
    The UA presents a unidirectional vertical resizing mechanism to allow the user to adjust only the height of the element. 

Currently it is possible to control the appearance of the scrolling mechanism (if any) on an element using the 'overflow' property (e.g. 'overflow: scroll' vs. 'overflow: hidden' etc.). The purpose of the 'resize' property is to also allow control over the appearance and function of the resizing mechanism (e.g. a resize box or widget) on the element.

Note. The resizing mechanism is NOT the same as the scrolling mechanism. The scrolling mechanism allows the user to determine which portion of the contents of an element is shown. The resizing mechanism allows the user to determine the size of the element.

The 'resize' property applies to elements whose computed 'overflow' value is something other than 'visible'. If 'overflow' is different in a particular axis (i.e. 'overflow-x' vs. 'overflow-y'), then this property applies to the dimension(s) which do not have the value 'visible'.

When an element is resized by the user, the user agent keeps track of a resize factor (which is initially 1.0) for the width and height, which it then applies to the computed width and height as part of determining the used width and height. The element's contents (and surroundings) are reformatted as necessary.

The resize factor introduces a step in width/height calculations and formatting as described in chapter 10 of CSS2.1. Specifically the following step is inserted between steps 1 and 2 of the algorithm in section 10.4 and 10.7 in CSS2.1 [CSS21], where [dimension] is 'width' for 10.4 and 'height' for 10.7.

    1b. If the resize [dimension] factor is not 1.0, then the tentative used [dimension] is multiplied by that factor, and the rules above are applied again, but this time using the result of that multiplication as the computed value for '[dimension]'. 

With regard to interactivity and the Document Object Model (DOM), the resize factor on an element lasts the lifetime of the element, however, if the 'resize' property itself is altered (e.g. via pseudo-class change or via DOM manipulation), then the resize factor is reset to 1.0.

The precise direction of resizing (i.e. altering the top left of the element or altering the bottom right) may depend on a number of factors including whether the element is absolutely positioned, whether it is positioned using the 'right' and 'bottom' properties, whether the language of the element is right-to-left etc. The precise direction of resizing is left to the UA to properly determine for the platform.

The user agent may restrict the resizing range to something suitable, such as between the original formatted size of the element, and large enough to encompass all the element's contents.

For example, to make iframes scrollable and resizable, the following rule can be used:


iframe,object[type^="text/"],
object[type$="+xml"],object[type="application/xml"] 
{ 
  overflow:auto;
  resize:both;
}

10. Mouse and Keyboard

This section is normative.
10.1. 'cursor' property
Name: 	cursor
Value: 	[ [<uri> [<x> <y>]?,]*
[ auto | default | none |
context-menu | help | pointer | progress | wait |
cell | crosshair | text | vertical-text |
alias | copy | move | no-drop | not-allowed |
e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll
] ] | inherit
Initial: 	auto
Applies to: 	all elements
Inherited: 	yes
Percentages: 	N/A
Media: 	visual, interactive
Computed value: 	If there are one or more <uri> values specified, and the UA finds a <uri> that it is able to support (due to format, resource availability etc.), then the computed value is that resolved absolute URI, fully qualified, with optional <x> and <y> coordinates. If no such supported <uri> value is found, or if no <uri> values were specified, then the computed value is the specified keyword value.
Value descriptions
image cursors

<uri>
    The user agent retrieves the cursor from the resource designated by the URI. If the user agent cannot handle the first cursor of a list of cursors, it must attempt to handle the second, etc. If the user agent cannot handle any user-defined cursor, it must use the cursor keyword at the end of the list. The optional <x> and <y> coordinates identify the exact position within the image which is the pointer position (i.e., the hotspot). 
<x>
<y>
    Each is a <number>. The x-coordinate and y-coordinate of the position in the cursor's coordinate system (left/top relative) which represents the precise position that is being pointed to. If the values are unspecified, then the intrinsic hotspot defined inside the image resource itself is used. If both the values are unspecific and the referenced cursor has no defined hotspot, the effect is as if a value of "0 0" were specified. 

general purpose cursors

auto
    The UA determines the cursor to display based on the current context. 
default
    The platform-dependent default cursor. Often rendered as an arrow. 
none
    No cursor is rendered for the element. 

links and status cursors

context-menu
    A context menu is available for the object under the cursor. Often rendered as an arrow with a small menu-like graphic next to it. 
help
    Help is available for the object under the cursor. Often rendered as a question mark or a balloon. 
pointer
    The cursor is a pointer that indicates a link. 
progress
    A progress indicator. The program is performing some processing, but is different from 'wait' in that the user may still interact with the program. Often rendered as a spinning beach ball, or an arrow with a watch or hourglass. 
wait
    Indicates that the program is busy and the user should wait. Often rendered as a watch or hourglass. 

selection cursors

cell
    Indicates that a cell or set of cells may be selected. Often rendered as a thick plus-sign with a dot in the middle. 
crosshair
    A simple crosshair (e.g., short line segments resembling a "+" sign). Often used to indicate a two dimensional bitmap selection mode. 
text
    Indicates text that may be selected. Often rendered as a vertical I-beam. User agents may automatically display a horizontal I-beam/cursor (e.g. same as the 'vertical-text' keyword) for vertical text, or for that matter, any angle of I-beam/cursor for text that is rendered at any particular angle. 
vertical-text
    Indicates vertical-text that may be selected. Often rendered as a horizontal I-beam. 

drag and drop cursors

alias
    Indicates an alias of/shortcut to something is to be created. Often rendered as an arrow with a small curved arrow next to it. 
copy
    Indicates something is to be copied. Often rendered as an arrow with a small plus sign next to it. 
move
    Indicates something is to be moved. 
no-drop
    Indicates that the dragged item cannot be dropped at the current cursor location. Often rendered as a hand or pointer with a small circle with a line through it. 
not-allowed
    Indicates that the requested action will not be carried out. Often rendered as a circle with a line through it. 

resizing and scrolling cursors

e-resize, n-resize, ne-resize, nw-resize, s-resize, se-resize, sw-resize, w-resize
    Indicates that some edge is to be moved. For example, the 'se-resize' cursor is used when the movement starts from the south-east corner of the box. 
ew-resize, ns-resize, nesw-resize, nwse-resize
    Indicates a bidirectional resize cursor. 
col-resize
    Indicates that the item/column can be resized horizontally. Often rendered as arrows pointing left and right with a vertical bar separating them. 
row-resize
    Indicates that the item/row can be resized vertically. Often rendered as arrows pointing up and down with a horizontal bar separating them. 
all-scroll
    Indicates that the something can be scrolled in any direction. Often rendered as arrows pointing up, down, left, and right with a dot in the middle. 

The UA may treat unsupported values as 'auto'. E.g. on platforms that do not have a concept of a 'context-menu' cursor, the UA may render 'default' or whatever is appropriate.
Example: cursor fallback

Here is an example of using several cursor values.


:link,:visited { 
    cursor: url(example.svg#linkcursor), 
            url(hyper.cur),
            url(hyper.png) 2 3, 
            pointer 
}

This example sets the cursor on all hyperlinks (whether visited or not) to an external SVG cursor ([SVG10], section 16.8.3). User agents that don't support SVG cursors would simply skip to the next value and attempt to use the "hyper.cur" cursor. If that cursor format was also not supported, the UA could attempt to use the "hyper.png" cursor with the explicit hot spot. Finally if the UA does not support any of those image cursor formats, the UA would skip to the last value and simply render the 'pointer' cursor.
10.2. Keyboard control
10.2.1. Sequential navigation order: the 'nav-index' property

The 'nav-index' property is an input-method-neutral way of specifying the sequential navigation order (also known as "tabbing order").
Name: 	nav-index
Value: 	auto | <number> | inherit
Initial: 	auto
Applies to: 	all enabled elements
Inherited: 	no
Percentages: 	n/a
Media: 	interactive
Computed value: 	specified value.

auto
    The element's sequential navigation order is assigned automatically by the user agent. 
<number>
    The number (which is non-zero and positive) indicates the sequential navigation order for the element. '1' means first. Elements with the same nav-index value are navigated in document order when that nav-index value is being navigated. 

This property is a replacement for the HTML4/XHTML1 attribute 'tabindex' ([HTML401], section 17.11.1). Borrowed and slightly rephrased from the HTML4 Recommendation:

This property specifies the position of the current element in the sequential navigation order for the current document.

The sequential navigation order defines the order in which elements will receive focus when navigated by the user via the keyboard. The sequential navigation order may include elements nested within other elements.

Elements that may receive focus should be navigated by user agents according to the following rules:

    Those elements that support the nav-index property and assign a positive value to it are navigated first. Navigation proceeds from the element with the lowest nav-index value to the element with the highest value. Values need not be sequential nor must they begin with any particular value. Elements that have identical nav-index values should be navigated in the order they appear in the character stream.
    Those elements that do not support the nav-index property or support it and assign it a value of 'auto' are navigated next. These elements are navigated in the order they appear in the character stream.
    Elements that are disabled do not participate in the sequential navigation order. 

The actual key sequence that causes sequential navigation or element activation depends on the configuration of the user agent (e.g., the "tab" key is often used for sequential navigation, and the "enter" key is used to activate a selected element).

User agents may also define key sequences to navigate the sequential navigation order in reverse. When the end (or beginning) of the tabbing order is reached, user agents may circle back to the beginning (or end). The key combination "shift-tab" is often used for reverse sequential navigation.
10.2.2. Directional focus navigation: the 'nav-up', 'nav-right', 'nav-down', 'nav-left' properties
Names: 	nav-up, nav-right, nav-down, nav-left
Value: 	auto | <id> [ current | root | <target-name> ]? | inherit
Initial: 	auto
Applies to: 	all enabled elements
Inherited: 	no
Percentages: 	N/A
Media: 	interactive
Computed value: 	<id> as specified with <target-name> string or keyword.

auto
    The user agent automatically determines which element to navigate the focus to in response to directional navigational input. 
<id>

    The <id> value consists of a '#' character followed by an identifier, similar to a fragment identifier in a URL. It indicates the element to which the focus is navigated to in response to directional navigation input respective to the specific property.

    If the <id> refers to the currently focused element, the directional navigation input respective to the nav- property is ignored — there is no need to refocus the same element.
<target-name>
    The <target-name> parameter indicates the target frame for the focus navigation. It is a string and it cannot start with the underscore "_" character. If the specified target frame does not exist, the parameter will be treated as the keyword 'current', which means to simply use the frame that the element is in. The keyword 'root' indicates that the user agent should target the full window. 

User agents for devices with directional navigation keys respond by navigating the focus according to four respective nav-* directional navigation properties (nav-up, nav-right, nav-down, nav-left). This specification does not define which keys of a device are directional navigational keys.

Note. Typical personal computers have keyboards with four arrow keys. One possible implementation would be to use those four arrow keys for directional navigation. For accessibility and user convenience, user agents should allow configuration of which keys on a keyboard are used for directional navigation.
Example: positioned buttons

Here is an example of buttons positioned in a diamond shape whose navigation order and directional focus navigation is set in such a way to navigate the focus clockwise (or counter-clockwise) around the diamond shape when the user chooses to navigate sequentially or directionally.


button { position:absolute }

button#b1 {
	top:0; left:50%;
	nav-index:1;
	nav-right:#b2; nav-left:#b4;
	nav-down:#b2; nav-up:#b4;
}

button#b2 {
	top:50%; left:100%;
	nav-index:2;
	nav-right:#b3; nav-left:#b1;
	nav-down:#b3; nav-up:#b1;
}

button#b3 {
	top:100%; left:50%;
	nav-index:3;
	nav-right:#b4; nav-left:#b2;
	nav-down:#b4; nav-up:#b2;
}
	
button#b4 {
	top:50%; left:0;
	nav-index:4;
	nav-right:#b1; nav-left:#b3;
	nav-down:#b1; nav-up:#b3;
}

Whatever markup sequence the buttons may have (which is not specified in this example) is irrelevant in this case because they are positioned, and yet, it is still important to ensure focus navigation behaviors which relate reasonably to the specified layout.
Appendix A. Acknowledgments

This appendix is informative.

Thanks to feedback and contributions from L. David Baron, Bert Bos, Matthew Brealey, Ada Chan, Michael Day, Micah Dubinko, Elika E., Steve Falkenburg, Al Gilman, Ian Hickson, Bjoern Hoehrmann, David Hyatt, Richard Ishida, Sho Kuwamoto, Susan Lesch, Peter Linss, Brad Pettit, Alexander Savenkov, Sebastian Schnitzenbaumer, Etan Wexler, David Woolley and Domel.
Appendix B. Bibiliography

This appendix is normative.
Normative References

[CSS21]
    Bert Bos; et al. Cascading Style Sheets, level 2 revision 1. 25 February 2004. W3C Candidate Recommendation. (Work in progress.) URL: http://www.w3.org/TR/2004/CR-CSS21-20040225 
[CSS3COLOR]
    Tantek Çelik; Chris Lilley. CSS3 Color Module. 14 May 2003. W3C Candidate Recommendation. (Work in progress.) URL: http://www.w3.org/TR/2003/CR-css3-color-20030514 
[RFC1738]
    T. Berners-Lee; L. Masinter; M. McCahill. Uniform Resource Locators (URL). December 1994. Internet RFC 1738. URL: http://www.ietf.org/rfc/rfc1738.txt 
[RFC1808]
    R. Fielding. Relative Uniform Resource Locators. June 1995. Internet RFC 1808. URL: http://www.ietf.org/rfc/rfc1808.txt 
[RFC2119]
    S. Bradner. Key words for use in RFCs to Indicate Requirement Levels. Internet RFC 2119. URL: http://www.ietf.org/rfc/rfc2119.txt 
[SELECT]
    Daniel Glazman; et al. Selectors. 13 November 2001. W3C Candidate Recommendation. (Work in progress.) URL: http://www.w3.org/TR/2001/CR-css3-selectors-20011113 
[URI]
    T. Berners-Lee; R. Fielding; L. Masinter. Uniform Resource Identifiers (URI): generic syntax. August 1998. Internet RFC 2396. URL: http://www.isi.edu/in-notes/rfc2396.txt 

Informative References

[CSS1]
    Håkon Wium Lie; Bert Bos. Cascading Style Sheets (CSS1) Level 1 Specification. 17 December 1996. W3C Recommendation. Revised 11 January 1999. URL: http://www.w3.org/TR/1999/REC-CSS1-19990111 
[CSS2]
    Bert Bos; et al. Cascading Style Sheets, level 2 (CSS2) Specification. 12 May 1998. W3C Recommendation. URL: http://www.w3.org/TR/1998/REC-CSS2-19980512 
[CSS3GENCON]
    Ian Hickson. CSS3 Generated and Replaced Content Module. 14 May 2003. W3C Working Draft. (Work in progress.) URL: http://www.w3.org/TR/2003/WD-css3-content-20030514 
[CSSUI]
    Tantek Çelik. User Interface for CSS3. 2 August 2002. W3C Working Draft. (Work in progress.) URL: http://www.w3.org/TR/2002/WD-css3-userint-20020802 
[HTML401]
    David Raggett; Arnaud Le Hors; Ian Jacobs. HTML 4.01 Specification. 24 December 1999. W3C Recommendation. URL: http://www.w3.org/TR/1999/REC-html401-19991224 
[SVG10]
    Jon Ferraiolo (ed). Scalable Vector Graphics (SVG) 1.0 Specification. 4 September 2001. W3C Recommendation. URL: http://www.w3.org/TR/2001/REC-SVG-20010904 
[SVG11]
    Jon Ferraiolo; 藤沢 淳 (FUJISAWA Jun); Dean Jackson (eds). Scalable Vector Graphics (SVG) 1.1 Specification. 14 January 2003. W3C Recommendation. URL: http://www.w3.org/TR/2003/REC-SVG11-20030114 
[UAAG10]
    Ian Jacobs; Jon Gunderson; Eric Hansen. User Agent Accessibility Guidelines 1.0. 17 December 2002. W3C Recommendation. URL: http://www.w3.org/TR/2002/REC-UAAG10-20021217 
[XFORMS10]
    Micah Dubinko; et al. XForms 1.0. 14 October 2003. W3C Recommendation. URL: http://www.w3.org/TR/2003/REC-xforms-20031014 
[XHTML10]
    Steven Pemberton; et al. XHTML™ 1.0 The Extensible HyperText Markup Language (Second Edition). 26 January 2000. W3C Recommendation. Revised on 1 August 2002 URL: http://www.w3.org/TR/2002/REC-xhtml1-20020801 
[XHTML11]
    Murray Altheim; Shane McCarron. XHTML™ 1.1 - Module-based XHTML. 31 May 2001. W3C Recommendation. URL: http://www.w3.org/TR/2001/REC-xhtml11-20010531 
[XML10]
    Tim Bray; et al. Extensible Markup Language (XML) 1.0 (Third Edition). 4 February 2004. W3C Recommendation. URL: http://www.w3.org/TR/2004/REC-xml-20040204 

Appendix C. Changes

This appendix is informative.

In general this draft contains numerous editorial/grammatical/spelling corrections, and several new informative examples. This appendix describes minor functional changes from the Last Call Working Draft of 3 July 2003 that were made to accommodate last call comments.

    :active pseudo-class. Clarified that :active only applies to the left mouse button on multibutton mice.
    :default pseudo-class. Clarified that multiple :default elements are possible, e.g. multiple default options for a select-many.
    :in-range and :out-of-range pseudo-classes. Added sentence: "An element that lacks data range limits or is not a form control is neither :in-range nor :out-of-range."
    'appearance' and 'font' properties. Added user interface elements 'menu-item' and 'tab' in the 'button' group, 'range' to 'menu' group, and, 'signature', 'password' and 'combo-box' to the 'field' group. Better specified 'appearance' property details.
    Icon functionality (and 'icon' value) moved from 'display' property to 'content' property.
    'key-equivalent' property removed.
    'cursor' property. Added 'none' keyword.
    'resize' property. Changed media group to 'visual' to match 'overflow'. Removed 'auto' value. Changed initial value to 'none' to match current implementation defaults.
    'outline-style' property. Added 'auto' keyword.
    directional navigation properties. Changed <uri> in value description to <id>. Added target keyword 'current' in addition to 'root'. 

Appendix D. Default style sheet additions for HTML4/XHTML1

This appendix is informative.

Potential additions to the base style sheet to express HTML4/XHTML1 form controls and a few HTML4/XHTML1 dynamic presentation attributes:

:link,:visited { 
 appearance: hyperlink; /* set color, font, background, padding, border, etc.*\/
}

:enabled:focus {
 outline: 2px inset;
}

button,
input[type=button],
input[type=reset],
input[type=submit],
input[type=checkbox],
input[type=radio],
textarea,
input,
input[type=text],
input[type=hidden],
input[type=password],
input[type=image]
{
 appearance: button;
 display: inline-block;
 white-space: nowrap;
}

button,
input[type=button],
input[type=reset][value],
input[type=submit][value]
{
/* appearance of HTML4/XHTML1 push buttons *\/
 appearance: push-button;
}

button
{
/* white space handling of BUTTON tags in particular *\/
 white-space:normal;
}

input[type=reset]
{
/* default content of HTML4/XHTML1 input type=reset button *\/
 content: "Reset";
}

input[type=submit]
{
/* default content of HTML4/XHTML1 input type=submit button *\/
 content: "Submit";
}

input[type=button],
input[type=reset][value],
input[type=submit][value]
{
/* text content/labels of HTML4/XHTML1 "input" buttons *\/
 content: attr(value);
}

input[type=checkbox]
{
 appearance:checkbox;
}

input[type=radio]
{
 appearance:radio-button;
}

textarea,
input,
input[type=text],
input[type=hidden],
input[type=password]
{
 appearance: field;
}

textarea
{
/* white space handling of TEXTAREA tags in particular *\/
 white-space:pre-wrap;
}

input[type=password]
{
 appearance: password;
}

input[type=hidden] 
{
/* appearance of the HTML4/XHTML1 hidden text field in particular *\/
 display: none;
}

input[type=image]
{
 display: inline-block;
 content: attr(src,url);
 border: none;
}

select[size]
{
/* HTML4/XHTML1 <select> w/ size more than 1 - appearance of list *\/
 appearance: list-menu;
 display: inline-block;
 height: attr(size,em);
}

select,select[size=1]
{
/* HTML4/XHTML1 <select> without size, or size=1 - popup-menu *\/
 appearance: popup-menu;
 display: inline-block;
 height: 1em;
 overflow: hidden;
}

option
{
 appearance:menu-item;
}

select[size]:active
{
/* active HTML4/XHTML <select> w/ size more than 1 - appearance of active list *\/
 display: inline-block;
}

optgroup,option
{
 display: block;
 white-space: nowrap;
}

optgroup[label],option[label] 
{
 content: attr(label);
}

option[selected]::before 
{ 
 display: inline;
 content: check; 
}

*[tabindex] { nav-index:attr(tabindex,number) }


/* Though FRAME resizing is not directly addressed by this specification,
   the following rules may provide an approximation of reasonable behavior. *\/

/*

frame { resize:both }
frame[noresize] { resize:none }

*\/


Appendix E. Example profiles

This appendix is informative.

These example profiles are written to roughly reflect the set of functionality that other specifications use/define which has been explicitly defined and/or updated in this specification. These profiles are independent of any other dimensions of variability, e.g. properties that may allow some values to be treated as other values.

This specification recommends that implementations base their support on at least one of the profiles defined below. Thus a CSS2.1 user agent for example, should consider supporting the CSS2.1 profile for CSS3 Basic UI.
CSS1 profile for CSS3 Basic UI
CSS3 Basic User Interface profile
Specification 	CSS level 1
Accepts 	:active pseudo-class on hyperlinks
Excludes 	:hover, :active on non-hyperlinks, :focus, :enabled, :disabled, :checked, :indeterminate pseudo-classes
:default, :valid, :invalid, :in-range, :out-of-range, :required, :optional, :read-only, :read-write pseudo-classes
::selection, ::value, ::choices, ::repeat-item, ::repeat-index pseudo-elements
'appearance' property
'font' property keyword additions
'icon' keyword value for 'content' property
'box-sizing' property
'outline', 'outline-width', 'outline-style', 'outline-color', 'outline-offset' properties
'resize' property
'cursor' property
'nav-index', 'nav-up', 'nav-right', 'nav-down', 'nav-left' properties
Extra constraints 	none.
CSS2.1 profile for CSS3 Basic UI
CSS3 Basic User Interface profile
Specification 	CSS level 2 revision 1
Accepts 	:hover, :active, :focus pseudo-classes
'font' property keyword values: 'caption', 'icon', 'menu', 'message-box', 'small-caption', 'status-bar'.
'outline', 'outline-width', 'outline-style', 'outline-color' properties.
'cursor' property
Excludes 	:enabled, :disabled, :checked, :indeterminate pseudo-classes
:default, :valid, :invalid, :in-range, :out-of-range, :required, :optional, :read-only, :read-write pseudo-classes
::selection, ::value, ::choices, ::repeat-item, ::repeat-index pseudo-elements
'appearance' property
'font' property keyword additions
'icon' keyword value for 'content' property
'box-sizing' property
'outline-offset' property
'resize' property
'cursor' property additions
'nav-index', 'nav-up', 'nav-right', 'nav-down', 'nav-left' properties
Extra constraints 	'cursor' property support omits hotspot for downloaded cursors, and new cursor keyword values. 'outline-style' property does not support 'auto' value.
XForms profile for CSS3 Basic UI
CSS3 Basic User Interface profile
Specification 	XForms 1.0
Accepts 	:hover, :active, :focus, :enabled, :disabled, :checked, :indeterminate pseudo-classes
:default, :valid, :invalid, :in-range, :out-of-range, :required, :optional, :read-only, :read-write pseudo-classes
::value, ::choices, ::repeat-item, ::repeat-index pseudo-elements
Excludes 	::selection pseudo-element
'appearance' property
'outline', 'outline-width', 'outline-style', 'outline-color' properties.
'cursor' property
'font' property keyword additions
'icon' keyword value for 'content' property
'box-sizing' property
'outline-offset' property
'resize' property
'cursor' property additions
'nav-index', 'nav-up', 'nav-right', 'nav-down', 'nav-left' properties
Extra constraints 	none.
Full profile for CSS3 Basic UI
CSS3 Basic User Interface profile
Specification 	CSS3
Accepts 	:hover, :active, :focus, :enabled, :disabled, :checked, :indeterminate pseudo-classes
:default, :valid, :invalid, :in-range, :out-of-range, :required, :optional, :read-only, :read-write pseudo-classes
::selection, ::value, ::choices, ::repeat-item, ::repeat-index pseudo-elements
'appearance' property
'outline', 'outline-width', 'outline-style', 'outline-color' properties.
'cursor' property
'font' property keyword additions
'icon' keyword value for 'content' property
'box-sizing' property
'outline-offset' property
'resize' property
'cursor' property additions
'nav-index', 'nav-up', 'nav-right', 'nav-down', 'nav-left' properties
Excludes 	none.
Extra constraints 	none.
Appendix F: Test Suite

This appendix is informative.

This specification shall refer to a test suite written according to the CSS Test Suite Documentation and following the CSS2.1 Test Case Authoring Guidelines. The test suite shall allow user agents to verify their basic conformance to the specification. This test suite does not pretend to be exhaustive and does not cover all possible combinations of user interface related features. These tests will be made available from the CSS Test Suites home page.
Index

This appendix is informative.

    appearance, #
    box-sizing, #
    content, #
    cursor, #
    font, #
    icon, #
    invert, #
    <appearance>, #
    MAY, #
    MUST, #
    MUST NOT, #
    nav-down, #
    nav-index, #
    nav-left, #
    nav-right, #
    nav-up, #
    OPTIONAL, #
    outline, #
    outline-color, #
    outline-offset, #
    outline-style, #
    outline-width, #
    RECOMMENDED, #
    REQUIRED, #
    resize, #
    SHALL, #
    SHALL NOT, #
    SHOULD, #
    SHOULD NOT, # 

Property index

This appendix is informative.
Property 	Values 	Initial 	Applies to 	Inh. 	Percentages 	Media
appearance 	normal | <appearance> | inherit 	normal 	all elements 	no 	N/A 	visual, interactive
box-sizing 	content-box | border-box | inherit 	content-box 	all elements that accept width or height 	no 	N/A 	visual
content 	icon 	same as CSS 2.1 	same as CSS 2.1 	same as CSS 2.1 	same as CSS 2.1 	same as CSS 2.1
cursor 	[ [<uri> [<x> <y>]?,]* [ auto | default | none | context-menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll ] ] | inherit 	auto 	all elements 	yes 	N/A 	visual, interactive
font 	<appearance> | status-bar | message-box | caption | small-caption | inherit 	see individual properties in CSS 2.1 	all elements 	yes 	N/A for system values 	visual
icon 	auto | <uri> [, <uri>]* | inherit 	auto 	all elements 	no 	N/A 	all
nav-index 	auto | <number> | inherit 	auto 	all enabled elements 	no 	n/a 	interactive
nav-up, nav-right, nav-down, nav-left 	auto | <id> [ current | root | <target-name> ]? | inherit 	auto 	all enabled elements 	no 	N/A 	interactive
outline 	[ <'outline-color'> || <'outline-style'> || <'outline-width'> ] | inherit 	see individual properties 	all elements 	no 	N/A 	visual
outline-color 	<color> | invert | inherit 	invert 	all elements 	no 	N/A 	visual
outline-offset 	<length> | inherit 	0 	all elements 	no 	N/A 	visual
outline-style 	auto | <border-style> | inherit 	none 	all elements 	no 	N/A 	visual
outline-width 	<border-width> | inherit 	medium 	all elements 	no 	N/A 	visual
resize 	none | both | horizontal | vertical | inherit 	none 	elements with 'overflow' other than visible 	no 	N/A 	visual

******************************************************************************/