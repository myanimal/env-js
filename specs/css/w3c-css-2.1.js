/******************************************************************************
http://www.w3.org/TR/CSS/

next   contents   properties   index  

W3C
Cascading Style Sheets Level 2 Revision 1 (CSS 2.1) Specification
W3C Working Draft 07 December 2010

This version:
    http://www.w3.org/TR/2010/WD-CSS2-20101207 
Latest version:
    http://www.w3.org/TR/CSS2 
Previous versions:
    http://www.w3.org/TR/2009/CR-CSS2-20090908 
    http://www.w3.org/TR/2008/REC-CSS2-20080411/ 
Editors:
    Bert Bos <bert @w3.org>
    Tantek Çelik <tantek @cs.stanford.edu>
    Ian Hickson <ian @hixie.ch>
    Håkon Wium Lie <howcome @opera.com>

This document is also available in these non-normative formats: plain text, gzip'ed tar file, zip file, gzip'ed PostScript, PDF. See also translations.

Copyright © 2010 W3C® (MIT, ERCIM, Keio), All Rights Reserved. W3C liability, trademark and document use rules apply.
Abstract

This specification defines Cascading Style Sheets, level 2 revision 1 (CSS 2.1). CSS 2.1 is a style sheet language that allows authors and users to attach style (e.g., fonts and spacing) to structured documents (e.g., HTML documents and XML applications). By separating the presentation style of documents from the content of documents, CSS 2.1 simplifies Web authoring and site maintenance.

CSS 2.1 builds on CSS2 [CSS2] which builds on CSS1 [CSS1]. It supports media-specific style sheets so that authors may tailor the presentation of their documents to visual browsers, aural devices, printers, braille devices, handheld devices, etc. It also supports content positioning, table layout, features for internationalization and some properties related to user interface.

CSS 2.1 corrects a few errors in CSS2 (the most important being a new definition of the height/width of absolutely positioned elements, more influence for HTML's "style" attribute and a new calculation of the 'clip' property), and adds a few highly requested features which have already been widely implemented. But most of all CSS 2.1 represents a "snapshot" of CSS usage: it consists of all CSS features that are implemented interoperably at the date of publication of the Recommendation.

CSS 2.1 is derived from and is intended to replace CSS2. Some parts of CSS2 are unchanged in CSS 2.1, some parts have been altered, and some parts removed. The removed portions may be used in a future CSS3 specification. Future specs should refer to CSS 2.1 (unless they need features from CSS2 which have been dropped in CSS 2.1, and then they should only reference CSS2 for those features, or preferably reference such feature(s) in the respective CSS3 Module that includes those feature(s)).
Status of this document

This section describes the status of this document at the time of its publication. Other documents may supersede this document. A list of current W3C publications and the latest revision of this technical report can be found in the W3C technical reports index at http://www.w3.org/TR/.

Publication as a Working Draft does not imply endorsement by the W3C Membership. This is a draft document and may be updated, replaced or obsoleted by other documents at any time. It is inappropriate to cite this document as other than work in progress.

The (archived) public mailing list www-style@w3.org (see instructions) is preferred for discussion of this specification. When sending e-mail, please put the text “CSS21” in the subject, preferably like this: “[CSS21] …summary of comment…”

This document was produced by the CSS Working Group (part of the Style Activity).

This document was produced by a group operating under the 5 February 2004 W3C Patent Policy. W3C maintains a public list of any patent disclosures made in connection with the deliverables of the group; that page also includes instructions for disclosing a patent. An individual who has actual knowledge of a patent which the individual believes contains Essential Claim(s) must disclose the information in accordance with section 6 of the W3C Patent Policy.

A test suite and an implementations report will be provided before the document becomes a Proposed Recommendation.

This document incorporates errata resulting from implementation experience since the previous publication. Some of the corrections remove ambiguities or change the behavior in edge cases, and the Working Group therefore published this Working Draft, in order to invite more review. If that review is positive, the expected next publication is a Proposed Recommendation.

This document represents a last call for comments. The deadline for comments is 7 January 2011.
Candidate Recommendation Exit Criteria

For this specification to enter Proposed Recommendation, the following conditions must be met:

    There must be at least two interoperable implementations for every feature. For the purposes of this criterion, we define the following terms:

    feature

        A section or subsection of the specification.
    interoperable

        passing the respective test cases in the test suite, or, if the implementation is not a web browser, equivalent tests. Every relevant test in the test suite should have an equivalent test created if such a UA is to be used to claim interoperability. In addition if such a UA is to be used to claim interoperability, then there must one or more additional UAs which can also pass those equivalent tests in the same way for the purpose of interoperability. The equivalent tests must be made publicly available for the purposes of peer review.
    implementation

        a user agent which:
            implements the feature.
            is available (i.e., publicly downloadable or available through some other public point of sale mechanism). This is the "show me" requirement.
            is shipping (i.e., development, private or unofficial versions are insufficient).
            is not experimental (i.e., is intended for a wide audience and could be used on a daily basis).

    A minimum of six months of the CR period must have elapsed. This is to ensure that enough time is given for any remaining major errors to be caught.

    The CR period will be extended if implementations are slow to appear.

    Features that were not in CSS1 will be dropped (thus reducing the list of "all" features mentioned above) if two or more interoperable implementations of those features are not found by the end of the CR period.

    Features will also be dropped if sufficient and adequate tests (by judgment of the working group) have not been produced for those features by the end of the CR period.

Features at risk

The working group has identified the following features as being currently poorly implemented by UAs. They are therefore most at risk of being removed from CSS 2.1 when exiting CR. (Any changes of this nature will still result in the specification being returned to last call.) Implementors are urged to implement these features, or correct bugs in their implementations, if they wish to see these features remain in this specification.

New 'list-style-type' values

        'armenian'
        'georgian'
        'lower-greek'

    Implementors are advised to look at CSS3 Lists instead, where these and many other new values not found in CSS1 are defined in detail. [CSS3LIST]
Support for multiple ID attributes for the ID selector

    Because implementations are not expected to support multiple IDs per element soon, this feature may be made informative. The W3C Selectors specification will continue to have this feature normatively. (Section 5.9.) 
Automatic table layout algorithm

    The input to the suggested (non-normative) automatic layout algorithm for tables is restricted to (1) the containing block width and (2) the content and properties of the table and its children. This restriction may be lifted. 
Quotes

    The 'quotes' property and the 'open-quote', 'close-quote', 'no-open-quote' and 'no-close-quote' keywords may be dropped. 
BODY element in XHTML

    The effect of 'overflow' and 'background' is different on BODY elements in HTML than on other elements. It may be that the exceptional handling of BODY in HTML is extended to BODY in XHTML1. 

Quick Table of Contents

    1 About the CSS 2.1 Specification
    2 Introduction to CSS 2.1
    3 Conformance: Requirements and Recommendations
    4 Syntax and basic data types
    5 Selectors
    6 Assigning property values, Cascading, and Inheritance
    7 Media types
    8 Box model
    9 Visual formatting model
    10 Visual formatting model details
    11 Visual effects
    12 Generated content, automatic numbering, and lists
    13 Paged media
    14 Colors and Backgrounds
    15 Fonts
    16 Text
    17 Tables
    18 User interface
    Appendix A. Aural style sheets
    Appendix B. Bibliography
    Appendix C. Changes
    Appendix D. Default style sheet for HTML 4
    Appendix E. Elaborate description of Stacking Contexts
    Appendix F. Full property table
    Appendix G. Grammar of CSS 2.1
    Appendix I. Index 

Full Table of Contents

    1 About the CSS 2.1 Specification
        1.1 CSS 2.1 vs CSS 2
        1.2 Reading the specification
        1.3 How the specification is organized
        1.4 Conventions
            1.4.1 Document language elements and attributes
            1.4.2 CSS property definitions
                1.4.2.1 Value
                1.4.2.2 Initial
                1.4.2.3 Applies to
                1.4.2.4 Inherited
                1.4.2.5 Percentage values
                1.4.2.6 Media groups
                1.4.2.7 Computed value 
            1.4.3 Shorthand properties
            1.4.4 Notes and examples
            1.4.5 Images and long descriptions 
        1.5 Acknowledgments 
    2 Introduction to CSS 2.1
        2.1 A brief CSS 2.1 tutorial for HTML
        2.2 A brief CSS 2.1 tutorial for XML
        2.3 The CSS 2.1 processing model
            2.3.1 The canvas
            2.3.2 CSS 2.1 addressing model 
        2.4 CSS design principles 
    3 Conformance: Requirements and Recommendations
        3.1 Definitions
        3.2 UA Conformance
        3.3 Error conditions
        3.4 The text/css content type 
    4 Syntax and basic data types
        4.1 Syntax
            4.1.1 Tokenization
            4.1.2 Keywords
                4.1.2.1 Vendor-specific extensions
                4.1.2.2 Informative Historical Notes 
            4.1.3 Characters and case
            4.1.4 Statements
            4.1.5 At-rules
            4.1.6 Blocks
            4.1.7 Rule sets, declaration blocks, and selectors
            4.1.8 Declarations and properties
            4.1.9 Comments 
        4.2 Rules for handling parsing errors
        4.3 Values
            4.3.1 Integers and real numbers
            4.3.2 Lengths
            4.3.3 Percentages
            4.3.4 URLs and URIs
            4.3.5 Counters
            4.3.6 Colors
            4.3.7 Strings
            4.3.8 Unsupported Values 
        4.4 CSS style sheet representation
            4.4.1 Referring to characters not represented in a character encoding 
    5 Selectors
        5.1 Pattern matching
        5.2 Selector syntax
            5.2.1 Grouping 
        5.3 Universal selector
        5.4 Type selectors
        5.5 Descendant selectors
        5.6 Child selectors
        5.7 Adjacent sibling selectors
        5.8 Attribute selectors
            5.8.1 Matching attributes and attribute values
            5.8.2 Default attribute values in DTDs
            5.8.3 Class selectors 
        5.9 ID selectors
        5.10 Pseudo-elements and pseudo-classes
        5.11 Pseudo-classes
            5.11.1 :first-child pseudo-class
            5.11.2 The link pseudo-classes: :link and :visited
            5.11.3 The dynamic pseudo-classes: :hover, :active, and :focus
            5.11.4 The language pseudo-class: :lang 
        5.12 Pseudo-elements
            5.12.1 The :first-line pseudo-element
            5.12.2 The :first-letter pseudo-element
            5.12.3 The :before and :after pseudo-elements 
    6 Assigning property values, Cascading, and Inheritance
        6.1 Specified, computed, and actual values
            6.1.1 Specified values
            6.1.2 Computed values
            6.1.3 Used values
            6.1.4 Actual values 
        6.2 Inheritance
            6.2.1 The 'inherit' value 
        6.3 The @import rule
        6.4 The cascade
            6.4.1 Cascading order
            6.4.2 !important rules
            6.4.3 Calculating a selector's specificity
            6.4.4 Precedence of non-CSS presentational hints 
    7 Media types
        7.1 Introduction to media types
        7.2 Specifying media-dependent style sheets
            7.2.1 The @media rule 
        7.3 Recognized media types
            7.3.1 Media groups 
    8 Box model
        8.1 Box dimensions
        8.2 Example of margins, padding, and borders
        8.3 Margin properties: 'margin-top', 'margin-right', 'margin-bottom', 'margin-left', and 'margin'
            8.3.1 Collapsing margins 
        8.4 Padding properties: 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', and 'padding'
        8.5 Border properties
            8.5.1 Border width: 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width', and 'border-width'
            8.5.2 Border color: 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color', and 'border-color'
            8.5.3 Border style: 'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style', and 'border-style'
            8.5.4 Border shorthand properties: 'border-top', 'border-right', 'border-bottom', 'border-left', and 'border' 
        8.6 The box model for inline elements in bidirectional context 
    9 Visual formatting model
        9.1 Introduction to the visual formatting model
            9.1.1 The viewport
            9.1.2 Containing blocks 
        9.2 Controlling box generation
            9.2.1 Block-level elements and block boxes
                9.2.1.1 Anonymous block boxes 
            9.2.2 Inline-level elements and inline boxes
                9.2.2.1 Anonymous inline boxes 
            9.2.3 Run-in boxes
            9.2.4 The 'display' property 
        9.3 Positioning schemes
            9.3.1 Choosing a positioning scheme: 'position' property
            9.3.2 Box offsets: 'top', 'right', 'bottom', 'left' 
        9.4 Normal flow
            9.4.1 Block formatting contexts
            9.4.2 Inline formatting contexts
            9.4.3 Relative positioning 
        9.5 Floats
            9.5.1 Positioning the float: the 'float' property
            9.5.2 Controlling flow next to floats: the 'clear' property 
        9.6 Absolute positioning
            9.6.1 Fixed positioning 
        9.7 Relationships between 'display', 'position', and 'float'
        9.8 Comparison of normal flow, floats, and absolute positioning
            9.8.1 Normal flow
            9.8.2 Relative positioning
            9.8.3 Floating a box
            9.8.4 Absolute positioning 
        9.9 Layered presentation
            9.9.1 Specifying the stack level: the 'z-index' property 
        9.10 Text direction: the 'direction' and 'unicode-bidi' properties 
    10 Visual formatting model details
        10.1 Definition of "containing block"
        10.2 Content width: the 'width' property
        10.3 Calculating widths and margins
            10.3.1 Inline, non-replaced elements
            10.3.2 Inline, replaced elements
            10.3.3 Block-level, non-replaced elements in normal flow
            10.3.4 Block-level, replaced elements in normal flow
            10.3.5 Floating, non-replaced elements
            10.3.6 Floating, replaced elements
            10.3.7 Absolutely positioned, non-replaced elements
            10.3.8 Absolutely positioned, replaced elements
            10.3.9 'Inline-block', non-replaced elements in normal flow
            10.3.10 'Inline-block', replaced elements in normal flow 
        10.4 Minimum and maximum widths: 'min-width' and 'max-width'
        10.5 Content height: the 'height' property
        10.6 Calculating heights and margins
            10.6.1 Inline, non-replaced elements
            10.6.2 Inline replaced elements, block-level replaced elements in normal flow, 'inline-block' replaced elements in normal flow and floating replaced elements
            10.6.3 Block-level non-replaced elements in normal flow when 'overflow' computes to 'visible'
            10.6.4 Absolutely positioned, non-replaced elements
            10.6.5 Absolutely positioned, replaced elements
            10.6.6 Complicated cases
            10.6.7 'Auto' heights for block formatting context roots 
        10.7 Minimum and maximum heights: 'min-height' and 'max-height'
        10.8 Line height calculations: the 'line-height' and 'vertical-align' properties
            10.8.1 Leading and half-leading 
    11 Visual effects
        11.1 Overflow and clipping
            11.1.1 Overflow: the 'overflow' property
            11.1.2 Clipping: the 'clip' property 
        11.2 Visibility: the 'visibility' property 
    12 Generated content, automatic numbering, and lists
        12.1 The :before and :after pseudo-elements
        12.2 The 'content' property
        12.3 Quotation marks
            12.3.1 Specifying quotes with the 'quotes' property
            12.3.2 Inserting quotes with the 'content' property 
        12.4 Automatic counters and numbering
            12.4.1 Nested counters and scope
            12.4.2 Counter styles
            12.4.3 Counters in elements with 'display: none' 
        12.5 Lists
            12.5.1 Lists: the 'list-style-type', 'list-style-image', 'list-style-position', and 'list-style' properties 
    13 Paged media
        13.1 Introduction to paged media
        13.2 Page boxes: the @page rule
            13.2.1 Page margins
            13.2.2 Page selectors: selecting left, right, and first pages
            13.2.3 Content outside the page box 
        13.3 Page breaks
            13.3.1 Page break properties: 'page-break-before', 'page-break-after', 'page-break-inside'
            13.3.2 Breaks inside elements: 'orphans', 'widows'
            13.3.3 Allowed page breaks
            13.3.4 Forced page breaks
            13.3.5 "Best" page breaks 
        13.4 Cascading in the page context 
    14 Colors and Backgrounds
        14.1 Foreground color: the 'color' property
        14.2 The background
            14.2.1 Background properties: 'background-color', 'background-image', 'background-repeat', 'background-attachment', 'background-position', and 'background' 
        14.3 Gamma correction 
    15 Fonts
        15.1 Introduction
        15.2 Font matching algorithm
        15.3 Font family: the 'font-family' property
            15.3.1 Generic font families
                15.3.1.1 serif
                15.3.1.2 sans-serif
                15.3.1.3 cursive
                15.3.1.4 fantasy
                15.3.1.5 monospace 
        15.4 Font styling: the 'font-style' property
        15.5 Small-caps: the 'font-variant' property
        15.6 Font boldness: the 'font-weight' property
        15.7 Font size: the 'font-size' property
        15.8 Shorthand font property: the 'font' property 
    16 Text
        16.1 Indentation: the 'text-indent' property
        16.2 Alignment: the 'text-align' property
        16.3 Decoration
            16.3.1 Underlining, overlining, striking, and blinking: the 'text-decoration' property 
        16.4 Letter and word spacing: the 'letter-spacing' and 'word-spacing' properties
        16.5 Capitalization: the 'text-transform' property
        16.6 White space: the 'white-space' property
            16.6.1 The 'white-space' processing model
            16.6.2 Example of bidirectionality with white space collapsing
            16.6.3 Control and combining characters' details 
    17 Tables
        17.1 Introduction to tables
        17.2 The CSS table model
            17.2.1 Anonymous table objects 
        17.3 Columns
        17.4 Tables in the visual formatting model
            17.4.1 Caption position and alignment 
        17.5 Visual layout of table contents
            17.5.1 Table layers and transparency
            17.5.2 Table width algorithms: the 'table-layout' property
                17.5.2.1 Fixed table layout
                17.5.2.2 Automatic table layout 
            17.5.3 Table height algorithms
            17.5.4 Horizontal alignment in a column
            17.5.5 Dynamic row and column effects 
        17.6 Borders
            17.6.1 The separated borders model
                17.6.1.1 Borders and Backgrounds around empty cells: the 'empty-cells' property 
            17.6.2 The collapsing border model
                17.6.2.1 Border conflict resolution 
            17.6.3 Border styles 
    18 User interface
        18.1 Cursors: the 'cursor' property
        18.2 System Colors
        18.3 User preferences for fonts
        18.4 Dynamic outlines: the 'outline' property
            18.4.1 Outlines and the focus 
        18.5 Magnification 
    Appendix A. Aural style sheets
        A.1 The media types 'aural' and 'speech'
        A.2 Introduction to aural style sheets
            A.2.1 Angles
            A.2.2 Times
            A.2.3 Frequencies 
        A.3 Volume properties: 'volume'
        A.4 Speaking properties: 'speak'
        A.5 Pause properties: 'pause-before', 'pause-after', and 'pause'
        A.6 Cue properties: 'cue-before', 'cue-after', and 'cue'
        A.7 Mixing properties: 'play-during'
        A.8 Spatial properties: 'azimuth' and 'elevation'
        A.9 Voice characteristic properties: 'speech-rate', 'voice-family', 'pitch', 'pitch-range', 'stress', and 'richness'
        A.10 Speech properties: 'speak-punctuation' and 'speak-numeral'
        A.11 Audio rendering of tables
            A.11.1 Speaking headers: the 'speak-header' property 
        A.12 Sample style sheet for HTML
        A.13 Emacspeak 
    Appendix B. Bibliography
        B.1 Normative references
        B.2 Informative references 
    Appendix C. Changes
        C.1 Additional property values
            C.1.1 Section 4.3.6 Colors
            C.1.2 Section 9.2.4 The 'display' property
            C.1.3 Section 12.2 The 'content' property
            C.1.4 Section 16.6 White space: the 'white-space' property
            C.1.5 Section 18.1 Cursors: the 'cursor' property 
        C.2 Changes
            C.2.1 Section 1.1 CSS 2.1 vs CSS 2
            C.2.2 Section 1.2 Reading the specification
            C.2.3 Section 1.3 How the specification is organized
            C.2.4 Section 1.4.2.1 Value
            C.2.5 Section 1.4.2.6 Media groups
            C.2.6 Section 1.4.2.7 Computed value
            C.2.7 Section 1.4.4 Notes and examples
            C.2.8 Section 1.5 Acknowledgments
            C.2.9 Section 3.2 Conformance
            C.2.10 Section 3.3 Error Conditions
            C.2.11 Section 4.1.1 Tokenization
            C.2.12 Section 4.1.3 Characters and case
            C.2.13 Section 4.2 Rules for handling parsing errors
            C.2.14 Section 4.3 Values
            C.2.15 Section 4.3.2 Lengths
            C.2.16 Section 4.3.4 URLs and URIs
            C.2.17 Section 4.3.5 Counters
            C.2.18 Section 4.3.6 Colors
            C.2.19 Section 4.3.8 Unsupported Values
            C.2.20 Section 4.4 CSS style sheet representation
            C.2.21 Section 5.8.1 Matching attributes and attribute values
            C.2.22 Section 5.8.3 Class selectors
            C.2.23 Section 5.9 ID selectors
            C.2.24 Section 5.10 Pseudo-elements and pseudo-classes
            C.2.25 Section 5.11.2 The link pseudo-classes: :link and :visited
            C.2.26 Section 5.11.4 The language pseudo-class: :lang
            C.2.27 Section 5.12.1 The :first-line pseudo-element
            C.2.28 Section 5.12.2 The :first-letter pseudo-element
            C.2.29 Section 6.1 Specified, computed, and actual values
            C.2.30 Section 6.4.1 Cascading order
            C.2.31 Section 6.4.3 Calculating a selector's specificity
            C.2.32 Section 6.4.4 Precedence of non-CSS presentational hints
            C.2.33 Section 7.3 Recognized Media Types
            C.2.34 Section 7.3.1 Media Groups
            C.2.35 Section 8.3 Margin properties
            C.2.36 Section 8.3.1 Collapsing margins
            C.2.37 Section 8.4 Padding properties
            C.2.38 Section 8.5.2 Border color
            C.2.39 Section 8.5.3 Border style
            C.2.40 Section 8.6 The box model for inline elements in bidirectional context
            C.2.41 Section 9.1.2 Containing blocks
            C.2.42 Section 9.2.1.1 Anonymous block boxes
            C.2.43 Section 9.2.2.1 Anonymous inline boxes
            C.2.44 Section 9.2.3 Run-in boxes
            C.2.45 Section 9.2.4 The 'display' property
            C.2.46 Section 9.3.1 Choosing a positioning scheme
            C.2.47 Section 9.3.2 Box offsets
            C.2.48 Section 9.4.1 Block formatting contexts
            C.2.49 Section 9.4.2 Inline formatting context
            C.2.50 Section 9.4.3 Relative positioning
            C.2.51 Section 9.5 Floats
            C.2.52 Section 9.5.1 Positioning the float
            C.2.53 Section 9.5.2 Controlling flow next to floats
            C.2.54 Section 9.7 Relationships between 'display', 'position', and 'float'
            C.2.55 Section 9.9 Layered presentation
            C.2.56 Section 9.10 Text direction
            C.2.57 Chapter 10 Visual formatting model details
            C.2.58 Section 10.1 Definition of "containing block"
            C.2.59 Section 10.2 Content width
            C.2.60 Section 10.3 Calculating widths and margins
            C.2.61 Section 10.3.2 Inline, replaced elements
            C.2.62 Section 10.3.3 Block-level, non-replaced elements in normal flow
            C.2.63 Section 10.3.4 Block-level, replaced elements in normal flow
            C.2.64 Section 10.3.5 Floating, non-replaced elements
            C.2.65 Section 10.3.6 Floating, replaced elements
            C.2.66 Section 10.3.7 Absolutely positioned, non-replaced elements
            C.2.67 Section 10.3.8 Absolutely positioned, replaced elements
            C.2.68 Section 10.4 Minimum and maximum widths
            C.2.69 Section 10.5 Content height
            C.2.70 Section 10.6 Calculating heights and margins
            C.2.71 Section 10.6.1 Inline, non-replaced elements
            C.2.72 Section 10.6.2 Inline replaced elements, block-level replaced elements in normal flow, 'inline-block' replaced elements in normal flow and floating replaced elements
            C.2.73 Section 10.6.3 Block-level non-replaced elements in normal flow when 'overflow' computes to 'visible'
            C.2.74 Section 10.6.4 Absolutely positioned, non-replaced elements
            C.2.75 Section 10.6.5 Absolutely positioned, replaced elements
            C.2.76 Section 10.7 Minimum and maximum heights
            C.2.77 Section 10.8 Line height calculations
            C.2.78 Section 10.8.1 Leading and half-leading
            C.2.79 Section 11.1 Overflow and clipping
            C.2.80 Section 11.1.1 Overflow
            C.2.81 Section 11.1.2 Clipping: the 'clip' property
            C.2.82 Section 11.2 Visibility
            C.2.83 Chapter 12 Generated content, automatic numbering, and lists
            C.2.84 Section 12.1 The :before and :after pseudo-elements
            C.2.85 Section 12.2 The 'content' property
            C.2.86 Section 12.3.2 Inserting quotes with the 'content' property
            C.2.87 Section 12.4 Automatic counters and numbering
            C.2.88 Section 12.4.1 Nested counters and scope
            C.2.89 Section 12.5 Lists
            C.2.90 Section 12.5.1 Lists
            C.2.91 Chapter 13 Paged media
            C.2.92 Section 13.2.2 Page selectors
            C.2.93 Section 13.3.1 Page break properties
            C.2.94 Section 13.3.3 Allowed page breaks
            C.2.95 Section 14.2.1 Background properties
            C.2.96 Section 14.3 Gamma correction
            C.2.97 Chapter 15 Fonts
            C.2.98 Section 15.2 Font matching algorithm
            C.2.99 Section 15.2.2 Font family
            C.2.100 Section 15.5 Small-caps
            C.2.101 Section 15.6 Font boldness
            C.2.102 Section 15.7 Font size
            C.2.103 Chapter 16 Text
            C.2.104 Section 16.2 Alignment
            C.2.105 Section 16.3.1 Underlining, over lining, striking, and blinking
            C.2.106 Section 16.4 Letter and word spacing
            C.2.107 Section 16.5 Capitalization
            C.2.108 Section 16.6 White space
            C.2.109 Chapter 17 Tables
            C.2.110 Section 17.2 The CSS table model
            C.2.111 Section 17.2.1 Anonymous table objects
            C.2.112 Section 17.4 Tables in the visual formatting model
            C.2.113 Section 17.4.1 Caption position and alignment
            C.2.114 Section 17.5 Visual layout of table contents
            C.2.115 Section 17.5.1 Table layers and transparency
            C.2.116 Section 17.5.2.1 Fixed table layout
            C.2.117 Section 17.5.2.2 Automatic table layout
            C.2.118 Section 17.5.3 Table height algorithms
            C.2.119 Section 17.5.4 Horizontal alignment in a column
            C.2.120 Section 17.6 Borders
            C.2.121 Section 17.6.1 The separated borders model
            C.2.122 Section 17.6.1.1 Borders and Backgrounds around empty cells
            C.2.123 Section 17.6.2 The collapsing border model
            C.2.124 Section 17.6.2.1 Border conflict resolution
            C.2.125 Section 18.1 Cursors: the 'cursor' property
            C.2.126 Section 18.4 Dynamic outlines
            C.2.127 Chapter 12 Generated content, automatic numbering, and lists
            C.2.128 Appendix A. Aural style sheets
            C.2.129 Appendix A Section 5 Pause properties
            C.2.130 Appendix A Section 6 Cue properties
            C.2.131 Appendix A Section 7 Mixing properties
            C.2.132 Appendix B Bibliography
            C.2.133 Other 
        C.3 Errors
            C.3.1 Shorthand properties
            C.3.2 Applies to
            C.3.3 Section 4.1.1 (and G2)
            C.3.4 Section 4.1.3 Characters and case
            C.3.5 Section 4.3 (Double sign problem)
            C.3.6 Section 4.3.2 Lengths
            C.3.7 Section 4.3.3 Percentages
            C.3.8 Section 4.3.4 URLs and URIs
            C.3.9 Section 4.3.5 Counters
            C.3.10 Section 4.3.6 Colors
            C.3.11 Section 4.3.7 Strings
            C.3.12 Section 5.10 Pseudo-elements and pseudo-classes
            C.3.13 Section 6.4 The cascade
            C.3.14 Section 8.1 Box Dimensions
            C.3.15 Section 8.2 Example of margins, padding, and borders
            C.3.16 Section 8.5.4 Border shorthand properties
            C.3.17 Section 9.2.1 Block-level elements and block boxes
            C.3.18 Section 9.3.1 Choosing a positioning scheme
            C.3.19 Section 9.3.2 Box offsets
            C.3.20 Section 9.4.1 Block formatting contexts
            C.3.21 Section 9.4.2 Inline formatting context
            C.3.22 Section 9.4.3 Relative positioning
            C.3.23 Section 9.5 Floats
            C.3.24 Section 9.5.1 Positioning the float
            C.3.25 Section 9.5.2 Controlling flow next to floats
            C.3.26 Section 9.6 Absolute positioning
            C.3.27 Section 9.7 Relationships between 'display', 'position', and 'float'
            C.3.28 Section 9.10 Text direction
            C.3.29 Section 10.1 Definition of "containing block"
            C.3.30 Section 10.3.3 Block-level, non-replaced elements in normal flow
            C.3.31 Section 10.4 Minimum and maximum widths
            C.3.32 Section 10.6.3 Block-level non-replaced elements in normal flow when 'overflow' computes to 'visible'
            C.3.33 Section 10.7 Minimum and maximum heights
            C.3.34 Section 11.1.1 Overflow
            C.3.35 Section 11.1.2 Clipping: the 'clip' property
            C.3.36 Section 11.2 Visibility
            C.3.37 Section 12.4.2 Counter styles
            C.3.38 Section 12.6.2 Lists
            C.3.39 Section 14.2 The background
            C.3.40 Section 14.2.1 Background properties
            C.3.41 Section 15.2 Font matching algorithm
            C.3.42 Section 15.7 Font size
            C.3.43 Section 16.1 Indentation
            C.3.44 Section 16.2 Alignment
            C.3.45 Section 17.2 The CSS table model
            C.3.46 Section 17.2.1 Anonymous table objects
            C.3.47 Section 17.4 Tables in the visual formatting model
            C.3.48 Section 17.5 Visual layout of table contents
            C.3.49 Section 17.5.1 Table layers and transparency
            C.3.50 Section 17.6.1 The separated borders model
            C.3.51 Section 18.2 System Colors
            C.3.52 Section E.2 Painting order 
        C.4 Clarifications
            C.4.1 Section 2.1 A brief CSS 2.1 tutorial for HTML
            C.4.2 Section 2.2 A brief CSS 2.1 tutorial for XML
            C.4.3 Section 2.3 The CSS 2.1 processing model
            C.4.4 Section 3.1 Definitions
            C.4.5 Section 4.1 Syntax
            C.4.6 Section 4.1.1 Tokenization
            C.4.7 Section 4.1.3 Characters and case
            C.4.8 Section 4.1.7 Rule sets, declaration blocks, and selectors
            C.4.9 Section 4.2 Rules for handling parsing errors
            C.4.10 Section 4.3.1 Integers and real numbers
            C.4.11 Section 4.3.2 Lengths
            C.4.12 Section 4.3.4 URLs and URIs
            C.4.13 Section 5.1 Pattern matching
            C.4.14 Section 5.7 Adjacent sibling selectors
            C.4.15 Section 5.8.1 Matching attributes and attribute values
            C.4.16 Section 5.8.2 Default attribute values in DTDs
            C.4.17 Section 5.9 ID selectors
            C.4.18 Section 5.11.3 The dynamic pseudo-classes: :hover, :active, and :focus
            C.4.19 Section 5.11.4 The language pseudo-class: :lang
            C.4.20 Section 5.12.2 The :first-letter pseudo-element
            C.4.21 Section 6.2 Inheritance
            C.4.22 Section 6.2.1 The 'inherit' value
            C.4.23 Section 6.3 The @import rule
            C.4.24 Section 6.4 The Cascade
            C.4.25 Section 6.4.1 Cascading order
            C.4.26 Section 6.4.3 Calculating a selector's specificity
            C.4.27 Section 7.2.1 The @media rule
            C.4.28 Section 7.3 Recognized media types
            C.4.29 Section 7.3.1 Media groups
            C.4.30 Section 8.1 Box dimensions
            C.4.31 Section 8.3 Margin properties
            C.4.32 Section 8.3.1 Collapsing margins
            C.4.33 Section 8.5.3 Border style
            C.4.34 Section 9.1.1 The viewport
            C.4.35 Section 9.2.4 The 'display' property
            C.4.36 Section 9.3.1 Choosing a positioning scheme
            C.4.37 Section 9.3.2 Box offsets
            C.4.38 Section 9.4.2 Inline formatting context
            C.4.39 Section 9.4.3 Relative positioning
            C.4.40 Section 9.5 Floats
            C.4.41 Section 9.5.1 Positioning the float
            C.4.42 Section 9.5.2 Controlling flow next to floats
            C.4.43 Section 9.8 Comparison of normal flow, floats, and absolute positioning
            C.4.44 Section 10.1 Definition of "containing block"
            C.4.45 Section 10.2 Content width
            C.4.46 Section 10.3.3 Block-level, non-replaced elements in normal flow
            C.4.47 Section 10.3.8 Absolutely positioning, replaced elements
            C.4.48 Section 10.4 Minimum and maximum widths
            C.4.49 Section 10.6 Calculating heights and margins
            C.4.50 Section 10.7 Minimum and maximum heights
            C.4.51 Section 10.8 Line height calculations
            C.4.52 Section 10.8.1 Leading and half-leading
            C.4.53 Section 11.1 Overflow and clipping
            C.4.54 Section 11.1.1 Overflow
            C.4.55 Section 11.1.2 Clipping
            C.4.56 Section 11.2 Visibility
            C.4.57 Section 12.1 The :before and :after pseudo-elements
            C.4.58 Section 12.2 The 'content' property
            C.4.59 Section 12.3.2 Inserting quotes with the 'content' property
            C.4.60 Section 12.4 Automatic counters and numbering
            C.4.61 Section 12.4.3 Counters in elements with 'display: none'
            C.4.62 Section 14.2 The background
            C.4.63 Section 15.1 Fonts Introduction
            C.4.64 Section 15.2 Font matching algorithm
            C.4.65 Section 15.2.2 Font family
            C.4.66 Section 15.3.1 Generic font families
            C.4.67 Section 15.4 Font styling
            C.4.68 Section 15.5 Small-caps
            C.4.69 Section 15.6 Font boldness
            C.4.70 Section 15.7 Font size
            C.4.71 Section 16.1 Indentation
            C.4.72 Section 16.2 Alignment
            C.4.73 Section 16.3.1 Underlining, over lining, striking, and blinking
            C.4.74 Section 16.5 Capitalization
            C.4.75 Section 16.6 White space
            C.4.76 Section 17.1 Introduction to tables
            C.4.77 Section 17.2 The CSS table model
            C.4.78 Section 17.2.1 Anonymous table objects
            C.4.79 Section 17.4 Tables in the visual formatting model
            C.4.80 Section 17.5 Visual layout of table contents
            C.4.81 Section 17.5.1 Table layers and transparency
            C.4.82 Section 17.5.2 Table width algorithms
            C.4.83 Section 17.5.2.1 Fixed table layout
            C.4.84 Section 17.5.2.2 Automatic table layout
            C.4.85 Section 17.5.4 Horizontal alignment in a column
            C.4.86 Section 17.5.5 Dynamic row and column effects
            C.4.87 Section 17.6.1 The separated borders model
            C.4.88 Section 17.6.2 The collapsing borders model
            C.4.89 Section 18.2 System Colors
            C.4.90 Section 18.4 Dynamic outlines
            C.4.91 Section 18.4.1 Outlines and the focus
            C.4.92 Appendix D Default style sheet for HTML 4 
        C.5 Errata since the Candidate Recommendation of July 2007
            C.5.1 Section 1.4.2.1 Value
            C.5.2 Section 2.3 The CSS 2.1 processing model
            C.5.3 Section 3.1 Definitions
            C.5.4 Section 4.1.1 Tokenization
            C.5.5 Section 4.1.2.2 Informative Historical Notes
            C.5.6 Section 4.1.3 Characters and case
            C.5.7 Section 4.1.3 Characters and case
            C.5.8 Section 4.1.3 Characters and case
            C.5.9 Section 4.1.3 Characters and case
            C.5.10 Section 4.1.5 At-rules
            C.5.11 Section 4.1.7 Rule sets, declaration blocks, and selectors
            C.5.12 Section 4.2 Rules for handling parsing errors
            C.5.13 Section 4.2 Rules for handling parsing errors
            C.5.14 Section 4.3.2 Lengths
            C.5.15 Section 4.3.5 Counters
            C.5.16 Section 5.8.1 Matching attributes and attribute values
            C.5.17 Section 5.8.2 Default attribute values in DTDs
            C.5.18 Section 5.11.4 The language pseudo-class: :lang
            C.5.19 Section 5.12.3 The :before and :after pseudo-elements
            C.5.20 Section 6.3 The @import rule
            C.5.21 Section 6.3 The @import rule
            C.5.22 Section 6.4.1 Cascading order
            C.5.23 Section 6.4.1 Cascading order
            C.5.24 Section 7.2.1 The @media rule
            C.5.25 Section 8.3.1 Collapsing margins
            C.5.26 Section 8.3.1 Collapsing margins
            C.5.27 Section 8.3.1 Collapsing margins
            C.5.28 Section 9.2.2 Inline-level elements and inline boxes
            C.5.29 Section 9.2.4 The 'display' property
            C.5.30 Section 9.3.2 Box offsets: 'top', 'right', 'bottom', 'left'
            C.5.31 Section 9.5 Floats
            C.5.32 Section 9.5 Floats
            C.5.33 Section 9.5.2 Controlling flow next to floats: the 'clear' property
            C.5.34 Section 9.6.1 Fixed positioning
            C.5.35 Section 9.9.1 Specifying the stack level: the 'z-index' property
            C.5.36 Section 10.1 Definition of "containing block"
            C.5.37 Section 10.3 Calculating widths and margins
            C.5.38 Section 10.3.1 Inline, non-replaced elements
            C.5.39 Section 10.3.2 Inline, replaced elements
            C.5.40 Section 10.3.2 Inline, replaced elements
            C.5.41 Section 10.3.3 Block-level, non-replaced elements in normal flow
            C.5.42 Section 10.3.7 Absolutely positioned, non-replaced elements
            C.5.43 Section 10.3.7 Absolutely positioned, non-replaced elements
            C.5.44 Section 10.3.8 Absolutely positioned, replaced elements
            C.5.45 Section 10.3.8 Absolutely positioned, replaced elements
            C.5.46 Section 10.3.8 Absolutely positioned, replaced elements
            C.5.47 Section 10.5 Content height: the 'height' property
            C.5.48 Section 10.6.2 Inline replaced elements […]
            C.5.49 Section 10.6.4 Absolutely positioned, non-replaced elements
            C.5.50 Section 10.6.5 Absolutely positioned, replaced elements
            C.5.51 Section 10.8.1 Leading and half-leading
            C.5.52 Section 11.1.1 Overflow: the 'overflow' property
            C.5.53 Section 11.1.2 Clipping: the 'clip' property
            C.5.54 Section 12.2 The 'content' property
            C.5.55 Section 12.4.2 Counter styles
            C.5.56 Section 12.5 Lists
            C.5.57 Section 12.5.1 Lists: the 'list-style-type', 'list-style-image', 'list-style-position', and 'list-style' properties
            C.5.58 Section 12.5.1 Lists: the 'list-style-type', 'list-style-image', 'list-style-position', and 'list-style' properties
            C.5.59 Section 12.5.1 Lists: the 'list-style-type', 'list-style-image', 'list-style-position', and 'list-style' properties
            C.5.60 Section 13.2 Page boxes: the @page rule
            C.5.61 Section 13.2.1.1 Rendering page boxes that do not fit a target sheet
            C.5.62 Section 13.2.3 Content outside the page box
            C.5.63 Section 13.3.1 Page break properties: 'page-break-before', 'page-break-after', 'page-break-inside'
            C.5.64 Section 13.3.1 Page break properties: 'page-break-before', 'page-break-after', 'page-break-inside'
            C.5.65 Section 13.3.2 Breaks inside elements: 'orphans', 'widows'
            C.5.66 Section 13.3.2 Breaks inside elements: 'orphans', 'widows'
            C.5.67 Section 13.3.3 Allowed page breaks
            C.5.68 Section 13.3.3 Allowed page breaks
            C.5.69 Section 13.3.3 Allowed page breaks
            C.5.70 Section 13.3.5 "Best" page breaks
            C.5.71 Section 14.2 The background
            C.5.72 Section 14.2 The background
            C.5.73 Section 14.2.1 Background properties: 'background-color', 'background-image', 'background-repeat', 'background-attachment', 'background-position', and 'background'
            C.5.74 Section 15.6 Font boldness: the 'font-weight' property
            C.5.75 Section 16.6 Whitespace: the 'white-space' property
            C.5.76 Section 16.6.1 The 'white-space' processing model
            C.5.77 Section 17.2.1 Anonymous table objects
            C.5.78 Section 17.2.1 Anonymous table objects
            C.5.79 Section 17.4 Tables in the visual formatting model
            C.5.80 Section 17.5.4 Horizontal alignment in a column
            C.5.81 Section 18.1 Cursors: the 'cursor' property
            C.5.82 Section B.2 Informative references
            C.5.83 Appendix D. Default style sheet for HTML 4
            C.5.84 Appendix D. Default style sheet for HTML 4
            C.5.85 Section E.2 Painting order
            C.5.86 Appendix G. Grammar of CSS 2.1
            C.5.87 Section G.1 Grammar
            C.5.88 Section G.2 Lexical scanner
            C.5.89 Section G.2 Lexical scanner
            C.5.90 Section G.2 Lexical scanner
            C.5.91 Section G.2 Lexical scanner
            C.5.92 Appendix I. Index 
        C.6 Errata since the Candidate Recommendation of April 2009
            C.6.1 Section 4.2 Rules for handling parsing errors
            C.6.2 Section 13.3.3 Allowed page breaks
            C.6.3 Section 15.3 Font family: the 'font-family' property
            C.6.4 Section 15.3.1.1 serif
            C.6.5 Section 15.7 Font size: the 'font-size' property
            C.6.6 Section 17.5.2.1 Fixed table layout
            C.6.7 Section 17.5.3 Table height layout
            C.6.8 Appendix G. Grammar of CSS 2.1 
        C.7 Errata since the Candidate Recommendation of September 2009
            C.7.1 Section 1.4.2.1 Value
            C.7.2 Section 3.1 Definitions
            C.7.3 Section 4.1.1 Tokenization
            C.7.4 Section 4.1.1 Tokenization
            C.7.5 Section 4.1.1 Tokenization
            C.7.6 Section 4.1.1 Tokenization
            C.7.7 Section 4.1.2.2 Informative Historical Notes
            C.7.8 Section 4.1.3 Characters and case
            C.7.9 Section 4.1.3 Characters and case
            C.7.10 Section 4.1.8 Declarations and properties
            C.7.11 Section 4.2 Rules for handling parsing errors
            C.7.12 Section 4.3.2 Lengths
            C.7.13 Section 4.3.2 Lengths
            C.7.14 Section 4.3.4 URLs and URIs
            C.7.15 Section 4.3.4 URLs and URIs
            C.7.16 Section 5.8.2 Default attribute values in DTDs
            C.7.17 Section 5.11.4 The language pseudo-class: :lang
            C.7.18 Section 5.12 Pseudo-elements
            C.7.19 Section 5.12.1 The :first-line pseudo-element
            C.7.20 Section 5.12.2 The :first-letter pseudo-element
            C.7.21 Section 6.2 Inheritance
            C.7.22 Section 6.4.4 Precedence of non-CSS presentational hints
            C.7.23 Section 7.3 Recognized media types
            C.7.24 Section 8.3.1 Collapsing margins
            C.7.25 Section 8.3.1 Collapsing margins
            C.7.26 Section 9.2.1 Block-level elements and block boxes
            C.7.27 Section 9.2.1.1 Anonymous block boxes
            C.7.28 Section 9.2.1.1 Anonymous block boxes
            C.7.29 Section 9.2.1.1 Anonymous block boxes
            C.7.30 Section 9.2.1.1 Anonymous block boxes
            C.7.31 Section 9.2.2 Inline-level elements and inline boxes
            C.7.32 Section 9.2.3 Run-in boxes
            C.7.33 Section 9.2.4 The 'display' property
            C.7.34 Section 9.2.4 The 'display' property
            C.7.35 Section 9.3 Positioning schemes
            C.7.36 Section 9.4 Normal flow
            C.7.37 Section 9.3.2 Box offsets: 'top', 'right', 'bottom', 'left'
            C.7.38 Section 9.5 Floats
            C.7.39 Section 9.5 Floats
            C.7.40 Section 9.5.2 Controlling flow next to floats: the 'clear' property
            C.7.41 Section 9.5.2 Controlling flow next to floats: the 'clear' property
            C.7.42 Section 9.5.2 Controlling flow next to floats: the 'clear' property
            C.7.43 Section 9.5.2 Controlling flow next to floats: the 'clear' property
            C.7.44 Section 9.6.1 Fixed positioning
            C.7.45 Section 9.9.1 Specifying the stack level: the 'z-index' property
            C.7.46 Section 9.10 Text direction: the 'direction' and 'unicode-bidi' properties
            C.7.47 Section 9.10 Text direction: the 'direction' and 'unicode-bidi' properties
            C.7.48 Section 9.10 Text direction: the 'direction' and 'unicode-bidi' properties
            C.7.49 Section 10.1 Definition of "containing block"
            C.7.50 Section 10.2 Content width: the 'width' property
            C.7.51 Section 10.2 Content width: the 'width' property
            C.7.52 Section 10.2 Content width: the 'width' property
            C.7.53 Section 10.5 Content height: the 'height' property
            C.7.54 Section 10.5 Content height: the 'height' property
            C.7.55 Section 10.6.7 'Auto' heights for block formatting context roots
            C.7.56 Section 10.7 Minimum and maximum heights: 'min-height' and 'max-height'
            C.7.57 Section 10.8 Line height calculations: the 'line-height' and 'vertical-align' properties
            C.7.58 Section 10.8 Line height calculations: the 'line-height' and 'vertical-align' properties
            C.7.59 Section 10.8.1 Leading and half-leading
            C.7.60 Section 10.8.1 Leading and half-leading
            C.7.61 Section 10.8.1 Leading and half-leading
            C.7.62 Section 11.1 Overflow and clipping
            C.7.63 Section 11.1.1 Overflow: the 'overflow' property
            C.7.64 Section 11.1.1 Overflow: the 'overflow' property
            C.7.65 Section 11.1.1 Overflow: the 'overflow' property
            C.7.66 Section 11.1.2 Clipping: the 'clip' property
            C.7.67 Section 12.5 Lists
            C.7.68 Section 12.5.1 Lists: the 'list-style-type', 'list-style-image', 'list-style-position', and 'list-style' properties
            C.7.69 Section 12.5.1 Lists: the 'list-style-type', 'list-style-image', 'list-style-position', and 'list-style' properties
            C.7.70 Section 12.5.1 Lists: the 'list-style-type', 'list-style-image', 'list-style-position', and 'list-style' properties
            C.7.71 Section 12.5.1 Lists: the 'list-style-type', 'list-style-image', 'list-style-position', and 'list-style' properties
            C.7.72 Section 12.5.1 Lists: the 'list-style-type', 'list-style-image', 'list-style-position', and 'list-style' properties
            C.7.73 Section 13.2 Page boxes: the @page rule
            C.7.74 Section 13.2.2 Page selectors: selecting left, right, and first pages
            C.7.75 Section 13.3.2 Breaks inside elements: 'orphans', 'widows'
            C.7.76 Section 13.3.3 Allowed page breaks
            C.7.77 Section 15.3 Font family: the 'font-family' property
            C.7.78 Section 15.3.1 Generic font families
            C.7.79 Section 15.6 Font boldness: the 'font-weight' property
            C.7.80 Section 15.6 Font boldness: the 'font-weight' property
            C.7.81 Section 15.7 Font size: the 'font-size' property
            C.7.82 Section 16.1 Indentation: the 'text-indent' property
            C.7.83 Section 16.1 Indentation: the 'text-indent' property
            C.7.84 Section 16.2 Alignment: the 'text-align' property
            C.7.85 Section 16.2 Alignment: the 'text-align' property
            C.7.86 Section 16.3.1 Underlining, overlining, striking, and blinking: the 'text-decoration' property
            C.7.87 Section 16.3.1 Underlining, overlining, striking, and blinking: the 'text-decoration' property
            C.7.88 Section 16.4 Letter and word spacing: the 'letter-spacing' and 'word-spacing' properties
            C.7.89 Section 16.6 White space: the 'white-space' property
            C.7.90 Section 16.6.1 The 'white-space' processing model
            C.7.91 Section 16.6.1 The 'white-space' processing model
            C.7.92 Section 16.6.1 The 'white-space' processing model
            C.7.93 Section 17.2 The CSS table model
            C.7.94 Section 17.2.1 Anonymous table objects
            C.7.95 Section 17.2.1 Anonymous table objects
            C.7.96 Section 17.4 Tables in the visual formatting model
            C.7.97 Section 17.4 Tables in the visual formatting model
            C.7.98 Section 17.5.2.2 Automatic table layout
            C.7.99 Section 17.5.3 Table height algorithms
            C.7.100 Section 17.5.4 Horizontal alignment in a column
            C.7.101 Section B.2 Informative references
            C.7.102 Section D. Default style sheet for HTML 4
            C.7.103 Section E.2 Painting order
            C.7.104 Appendix G Grammar of CSS 2.1 
    Appendix D. Default style sheet for HTML 4
    Appendix E. Elaborate description of Stacking Contexts
        E.1 Definitions
        E.2 Painting order
        E.3 Notes 
    Appendix F. Full property table
    Appendix G. Grammar of CSS 2.1
        G.1 Grammar
        G.2 Lexical scanner
        G.3 Comparison of tokenization in CSS 2.1 and CSS1
        G.4 Implementation note 
    Appendix I. Index 

next   contents   properties   index  

******************************************************************************/