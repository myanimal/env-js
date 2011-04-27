/******************************************************************************
http://www.w3.org/TR/css3-fonts/

W3C
CSS Fonts Module Level 3
W3C Working Draft 24 March 2011

This version:
    http://www.w3.org/TR/2011/WD-css3-fonts-20110324 
Latest version:
    http://www.w3.org/TR/css3-fonts/ 
Latest editor's draft:
    http://dev.w3.org/csswg/css3-fonts/ 
Previous version (CSS3 Fonts):
    http://www.w3.org/TR/2009/WD-css3-fonts-20090618 
    http://www.w3.org/TR/2002/WD-css3-fonts-20020802 
Previous version (CSS3 Web Fonts):
    http://www.w3.org/TR/2002/WD-css3-webfonts-20020802 
Editor:
    John Daggett (Mozilla) 

Copyright © 2011 W3C® (MIT, ERCIM, Keio), All Rights Reserved. W3C liability, trademark and document use rules apply.
Abstract

This CSS3 module describes how font properties are specified and how font resources are loaded dynamically. The contents of this specification are a consolidation of content previously divided into CSS3 Fonts and CSS3 Web Fonts modules.
Status of this document

This section describes the status of this document at the time of its publication. Other documents may supersede this document. A list of current W3C publications and the latest revision of this technical report can be found in the W3C technical reports index at http://www.w3.org/TR/.

Publication as a Working Draft does not imply endorsement by the W3C Membership. This is a draft document and may be updated, replaced or obsoleted by other documents at any time. It is inappropriate to cite this document as other than work in progress.

The (archived) public mailing list www-style@w3.org (see instructions) is preferred for discussion of this specification. When sending e-mail, please put the text “css3-fonts” in the subject, preferably like this: “[css3-fonts] …summary of comment…”

This document was produced by the CSS Working Group (part of the Style Activity).

This document was produced by a group operating under the 5 February 2004 W3C Patent Policy. W3C maintains a public list of any patent disclosures made in connection with the deliverables of the group; that page also includes instructions for disclosing a patent. An individual who has actual knowledge of a patent which the individual believes contains Essential Claim(s) must disclose the information in accordance with section 6 of the W3C Patent Policy.
Features at risk

The following features are at risk and may be removed when exiting CR:

    Description of the same origin restriction for fonts, if replaced by similar mechanism. 

Table of contents

    1 Introduction
    2 Typography Background
    3 Basic font properties
        3.1 Font family: the font-family property
            3.1.1 Generic font families 
        3.2 Font weight: the font-weight property
        3.3 Font width: the font-stretch property
        3.4 Font style: the font-style property
        3.5 Font size: the font-size property
        3.6 Relative sizing: the font-size-adjust property
        3.7 Shorthand font property: the font property
        3.8 Controlling synthetic faces: the font-synthesis property 
    4 Font resources
        4.1 The @font-face rule
        4.2 Font family: the font-family descriptor
        4.3 Font reference: the src descriptor
        4.4 Font property descriptors: the font-style, font-weight, font-stretch descriptors
        4.5 Character range: the unicode-range descriptor
        4.6 Font features: the font-variant and font-feature-settings descriptors 
    5 Font matching algorithm
        5.1 Matching font styles
        5.2 Character handling issues
        5.3 Font matching changes since CSS 2.1 
    6 Font feature properties
        6.1 Glyph selection and positioning
        6.2 Language-specific display
        6.3 Kerning: the font-kerning property
        6.4 Subscript, superscript and ordinal forms: the vertical-position property
        6.5 Ligatures: the font-variant-ligatures property
        6.6 Capitalization: the font-variant-caps property
        6.7 Numerical formatting: the font-variant-numeric property
        6.8 Alternates and swashes: the font-variant-alternates property
        6.9 Defining font specific alternates: the @font-feature-values rule
        6.10 East Asian text rendering: the font-variant-east-asian property
        6.11 Overall shorthand for font rendering: the font-variant property
        6.12 Low-level font feature settings control: the font-feature-settings property
        6.13 Font language override: the font-language-override property 
    7 Resolving font feature settings
    Appendix A: Same-origin restriction for fonts
    Appendix B: Mapping platform font properties to CSS properties
    Appendix C: Font licensing issues
    Changes
        Changes from the June 2009 CSS3 Fonts Working Draft 
    Acknowledgments
    References
        Normative References
        Other References 
    Index
    Property index 

1 Introduction

A font provides a resource containing the visual representation of characters. At the simplest level it contains information that maps character codes to shapes (called glyphs) that represent these characters. Fonts sharing a common design style are commonly grouped into font families classified by a set of standard font properties. Within a family, the shape displayed for a given character can vary by stroke weight, slant or relative width, among others. A given font face is described by a unique combination of these properties. For a given range of text, CSS font properties are used to select a font family and a specific font face within that family to be used when rendering that text. As a simple example, to use the bold form of Helvetica one could use:

body { 
    font-family: Helvetica; 
    font-weight: bold; 
}

Font resources may be local, installed on the system on which a user agent is running, or downloadable. For local font resources descriptive information can be obtained directly from the font resource. For downloadable font resources (sometimes referred to as web fonts), the descriptive information is included with the reference to the font resource.

Families of fonts typically don't contain a single face for each possible variation of font properties. The CSS font selection mechanism describes how to match a given set of CSS font properties to a given font face.
2 Typography Background

This section is included as background for some of the problems and situations that are described in other sections. It should be viewed as informative only.

Typographic traditions vary across the globe so there is no unique way to classify all fonts across languages and cultures. For even common Latin letters, wide variations are possible:
variations in glyphs for a single character

One character, many glyph variations

Differences in the anatomy of letterforms is one way to distinguish fonts. For Latin fonts, flourishes at the ends of a character's main strokes, or serifs, can distinguish a font from those without. Similar comparisons exist in non-Latin fonts between fonts with tapered strokes and those using primarily uniform strokes:
serif vs. non-serifs

Letterforms with and without serifs
serif vs. non-serifs for japanese

Similar groupings for Japanese typefaces

Fonts contain letterforms and the data needed to map characters to these letterforms. Often this may be a simple one-to-one mapping but more complex mappings are also possible. The use of combining diacritic marks creates many variations for an underlying letterform:
diacritic marks

Variations with diacritic marks

A sequence of characters can be represented by a single glyph known as a ligature:
example of a fi ligature

Ligature example

Visual transformations based on textual context like this may be a stylistic option for European languages but are required to correctly render languages like Arabic; the lam and alef characters below must be combined when they exist in sequence:
lam alef ligature

Required Arabic ligature

The relative complexity of these shaping transformations requires additional data within the font.

Sets of font faces with various stylistic variations are often grouped together into font families. In the simplest case a regular face is supplemented with bold and italic faces but much more extensive groupings are possible. Variations in the thickness of letterform strokes, or the weight, or the overall proportions of the letterform, or the width, are most common. In the example below, each letter uses a different font face within the Univers font family. The width used increases from top to bottom and the weight increases from left to right:
various width and weight variations within a single family

Weight and width variations within a single font family

Creating fonts that support multiple scripts is a difficult task; designers need to understand the cultural traditions surrounding the use of type in different scripts and come up with letterforms that somehow share a common theme. Many languages often share a common script and each of these languages may have noticeable stylistic differences. The Arabic script is shared by Persian and Urdu and Cyrillic is used with many languages, not just Russian.

The character map of a font defines the mapping of characters to glyphs for that font. If a document contains characters not supported by the character maps of explicitly specified fonts, a user agent may use a system font fallback procedure to locate an appropriate font that does. If no appropriate font can be found, some form of "missing glyph" character will be rendered by the user agent. Fallback can occur because fonts are not explicitly specified or because authors fail to explicitly indicate the encoding used by a document.

Although the character map of a font maps a given character to a glyph for that character, modern font technologies such as OpenType and AAT (Apple Advanced Typography) provide a richer set of rules for performing this mapping. Fonts in these forms allow these features to be embedded in the font itself and controlled by applications. Common typographic features which can be specified this way include ligatures, swashes, contextual alternates, proportional and tabular figures, and automatic fractions, to list just a few. For a visual overview of OpenType features, see the [OPENTYPE-FONT-GUIDE].
3 Basic font properties

The particular font face used to render a character is determined by the font family and other font properties that apply to a given element. This structure allows settings to be varied independent of each other.
3.1 Font family: the font-family property
Name: 	font-family
Value: 	[[ <family-name> | <generic-family> ] [, <family-name> | <generic-family>]* ] | inherit
Initial: 	depends on user agent
Applies to: 	all elements
Inherited: 	yes
Percentages: 	N/A
Media: 	visual
Computed value: 	as specified

This property specifies a prioritized list of font family names or generic family names. Unlike other CSS properties, component values are a comma-separated list indicating alternatives. A user agent iterates through the list of family names until it matches an available font that contains a glyph for the character to be rendered. This allows for differences in available fonts across platforms and for differences in the range of characters supported by individual fonts.

A font family name only specifies a name given to a set of font faces, it does not specify an individual face. Given the availability of the fonts below, Futura would match but Futura Medium would not:
family and face names

Family and individual face names

Consider the example below:

body { 
    font-family: Helvetica, Verdana, sans-serif; 
}

If Helvetica is available it will be used when rendering. If neither Helvetica nor Verdana is present, then the user-agent-defined sans serif font will be used.

There are two types of font family names:

<family-name>
    The name of a font family of choice such as Helvetica or Verdana in the previous example. 
<generic-family>
    The following generic family keywords are defined: ‘serif’, ‘sans-serif’, ‘cursive’, ‘fantasy’, and ‘monospace’. These keywords can be used as a general fallback mechanism when an author's desired font choices are not available. As keywords, they must not be quoted. Authors are encouraged to append a generic font family as a last alternative for improved robustness. 

Font family names must either be given quoted as strings, or unquoted as a sequence of one or more identifiers. This means most punctuation characters and digits at the start of each token must be escaped in unquoted font family names.

For example, the following declarations are invalid:

font-family: Red/Black, sans-serif;
font-family: "Lucida" Grande, sans-serif;
font-family: Ahem!, sans-serif;
font-family: test@foo, sans-serif;
font-family: #POUND, sans-serif;
font-family: Hawaii 5-0, sans-serif;

If a sequence of identifiers is given as a font family name, the computed value is the name converted to a string by joining all the identifiers in the sequence by single spaces.

To avoid mistakes in escaping, it is recommended to quote font family names that contain white space, digits, or punctuation characters other than hyphens:

body { font-family: "New Century Schoolbook", serif }

<BODY STYLE="font-family: '21st Century', fantasy">

Font family names that happen to be the same as a keyword value (‘inherit’, ‘serif’, ‘sans-serif’, ‘monospace’, ‘fantasy’, and ‘cursive’) must be quoted to prevent confusion with the keywords with the same names. The keywords ‘initial’ and ‘default’ are reserved for future use and must also be quoted when used as font names. UAs must not consider these keywords as matching the ‘<family-name>’ type.

Some font formats allow fonts to carry multiple localizations of the family name. User agents must recognize and correctly match all of these names independent of the underlying platform localization, system API used or document encoding:
examples of localized family names

Localized family names
3.1.1 Generic font families

All five generic font families are defined to exist in all CSS implementations (they need not necessarily map to five distinct actual fonts). User agents should provide reasonable default choices for the generic font families, which express the characteristics of each family as well as possible within the limits allowed by the underlying technology. User agents are encouraged to allow users to select alternative choices for the generic fonts.
serif

Glyphs of serif fonts, as the term is used in CSS, have finishing strokes, flared or tapering ends, or have actual serifed endings (including slab serifs). Serif fonts are typically proportionately-spaced. They often display a greater variation between thick and thin strokes than fonts from the ‘sans-serif’ generic font family. CSS uses the term ‘serif’ to apply to a font for any script, although other names may be more familiar for particular scripts, such as Mincho (Japanese), Sung or Song (Chinese), Batang (Korean). Any font that is so described may be used to represent the generic ‘serif’ family.
sample serif fonts

Sample serif fonts
sans-serif

Glyphs in sans-serif fonts, as the term is used in CSS, have stroke endings that are plain -- without any flaring, cross stroke, or other ornamentation. Sans-serif fonts are typically proportionately-spaced. They often have little variation between thick and thin strokes, compared to fonts from the ‘serif’ family. CSS uses the term ‘sans-serif’ to apply to a font for any script, although other names may be more familiar for particular scripts, such as Gothic (Japanese), Kai (Chinese), or Gulim (Korean). Any font that is so described may be used to represent the generic ‘sans-serif’ family.
sample sans-serif fonts

Sample sans-serif fonts
cursive

Glyphs in cursive fonts generally have either joining strokes or other cursive characteristics beyond those of italic typefaces. The glyphs are partially or completely connected, and the result looks more like handwritten pen or brush writing than printed letterwork. Some scripts, such as Arabic, are almost always cursive. CSS uses the term ‘cursive’ to apply to a font for any script, although other names such as Chancery, Brush, Swing and Script are also used in font names.
sample cursive fonts

Sample cursive fonts
fantasy

Fantasy fonts are primarily decorative fonts that contain playful representations of characters. These do not include Pi or Picture fonts which do not represent actual characters.
sample fantasy fonts

Sample fantasy fonts
monospace

The sole criterion of a monospace font is that all glyphs have the same fixed width. This is often used to render samples of computer code.
sample monospace fonts

Sample monospace fonts
3.2 Font weight: the font-weight property
Name: 	font-weight
Value: 	normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | inherit
Initial: 	normal
Applies to: 	all elements
Inherited: 	yes
Percentages: 	N/A
Media: 	visual
Computed value: 	see description

The ‘font-weight’ property specifies weight of glyphs in the font, their degree of blackness or stroke thickness.

Values have the following meanings:

100 to 900
    These values form an ordered sequence, where each number indicates a weight that is at least as dark as its predecessor. These roughly correspond to the commonly used weight names below: 

    100 - Thin
    200 - Extra Light (Ultra Light)
    300 - Light
    400 - Normal
    500 - Medium
    600 - Semi Bold (Demi Bold)
    700 - Bold
    800 - Extra Bold (Ultra Bold)
    900 - Black (Heavy) 

normal
    Same as ‘400’. 
bold
    Same as ‘700’. 
bolder
    Specifies the weight of the face bolder than the inherited value. 
lighter
    Specifies the weight of the face lighter than the inherited value. 

Font formats that use a scale other than a nine step scale should map their scale onto the CSS scale so that 400 roughly corresponds with a face that would be labeled as Regular, Book, Roman and 700 roughly matches a face that would be labeled as Bold. Or weights may be inferred from the style names, ones that correspond roughly with the scale above. The scale is relative, so a face with a larger weight value must never appear lighter. If style names are used to infer weights, care should be taken to handle variations in style names across locales.

Quite often there are only a few weights available for a particular font family. When a weight is specified for which no face exists, a face with a nearby weight is used. In general, bold weights map to faces with heavier weights and light weights map to faces with lighter weights (see the font matching section below for a precise definition). The examples here illustrate which face is used for different weights, grey indicates a face for that weight does not exist so a face with a nearby weight is used:
weight mappings for a family with 400, 700 and 900 weights

Weight mappings for a font family with 400, 700 and 900 weight faces
weight mappings for a family with 300, 600 weights

Weight mappings for a font family with 300 and 600 weight faces

Although the practice is not well-loved by typographers, bold faces are often synthesized by user agents for faces that lack actual bold faces. For the purposes of style matching, these faces must be treated as if they exist within the family.

Values of ‘bolder’ and ‘lighter’ indicate values relative to the weight of the parent element. Based on the inherited weight value, the weight used is calculated using the chart below. Child elements inherit the calculated weight, not a value of ‘bolder’ or ‘lighter’.
Inherited value 	bolder 	lighter
100 	400 	100
200 	400 	100
300 	400 	100
400 	700 	100
500 	700 	100
600 	900 	400
700 	900 	400
800 	900 	700
900 	900 	700

The table above is equivalent to selecting the next relative bolder or lighter face, given a font family containing normal and bold faces along with a thin and a heavy face. Authors who desire finer control over the exact weight values used for a given element should use numerical values instead of relative weights.
3.3 Font width: the font-stretch property
Name: 	font-stretch
Value: 	normal | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded | inherit
Initial: 	normal
Applies to: 	all elements
Inherited: 	yes
Percentages: 	N/A
Media: 	visual
Computed value: 	as specified

The ‘font-stretch’ property selects a normal, condensed, or expanded face from a font family. Absolute keyword values have the following ordering, from narrowest to widest:

    Ultra Condensed
    Extra Condensed
    Condensed
    Semi Condensed
    Normal
    Semi Expanded
    Expanded
    Extra Expanded
    Ultra Expanded 

The scale is relative, so a face with a font-stretch value higher in the list above should never appear wider. When a face does not exist for a given width, normal or condensed values map to a narrower face, otherwise a wider face. Conversely, expanded values map to a wider face, otherwise a narrower face. The figure below shows how the nine font-stretch property settings affect font selection for font family containing a variety of widths, grey indicates a width for which no face exists and a different width is substituted:
width mappings for a family with condensed, normal and expanded faces

Width mappings for a font family with condensed, normal and expanded width faces
3.4 Font style: the font-style property
Name: 	font-style
Value: 	normal | italic | oblique | inherit
Initial: 	normal
Applies to: 	all elements
Inherited: 	yes
Percentages: 	N/A
Media: 	visual
Computed value: 	as specified

The ‘font-style’ property allows italic or oblique faces to be selected. Italic forms are generally cursive in nature while oblique faces are typically sloped versions of the regular face. Oblique faces can be simulated by artificially sloping the glyphs of the regular face. Compare the artificially sloped renderings of Palatino ‘a’ and Baskerville ‘N’ in grey with the actual italic versions:
artificial sloping vs. real italics

Artificial sloping versus real italics

A value of ‘normal’ selects a face that is classified as ‘normal’, while ‘oblique’ selects a font that is labeled ‘oblique’. A value of ‘italic’ selects a font that is labeled ‘italic’, or, if that is not available, one labeled ‘oblique’. If no italic or oblique faces is available, an oblique face can by synthesized by rendering the normal face with a sloping transformation applied.

Many scripts lack the tradition of mixing a cursive form within text rendered with a normal face. Chinese, Japanese and Korean fonts almost always lack italic or oblique faces. Fonts that support a mixture of scripts will sometimes omit specific scripts such as Arabic from the set of glyphs supported in the italic face. User agents should be careful about making character map assumptions across faces.
3.5 Font size: the font-size property
Name: 	font-size
Value: 	<absolute-size> | <relative-size> | <length> | <percentage> | inherit
Initial: 	medium
Applies to: 	all elements
Inherited: 	yes
Percentages: 	refer to parent element's font size
Media: 	visual
Computed value: 	absolute length

This property indicates the desired height of glyphs from the font. For scalable fonts, the font-size is a scale factor applied to the EM unit of the font. (Note that certain glyphs may bleed outside their EM box.) For non-scalable fonts, the font-size is converted into absolute units and matched against the declared font-size of the font, using the same absolute coordinate space for both of the matched values. Values have the following meanings:

<absolute-size>
    An <absolute-size> keyword refers to an entry in a table of font sizes computed and kept by the user agent. Possible values are:

    [ xx-small | x-small | small | medium | large | x-large | xx-large ]
<relative-size>
    A <relative-size> keyword is interpreted relative to the table of font sizes and the font size of the parent element. Possible values are:

    [ larger | smaller ]

    For example, if the parent element has a font size of ‘medium’, a value of ‘larger’ will make the font size of the current element be ‘large’. If the parent element's size is not close to a table entry, the user agent is free to interpolate between table entries or round off to the closest one. The user agent may have to extrapolate table values if the numerical value goes beyond the keywords. 
<length>
    A length value specifies an absolute font size (that is independent of the user agent's font table). Negative lengths are illegal. 
<percentage>
    A percentage value specifies an absolute font size relative to the parent element's font size. Use of percentage values, or values in ‘em’s, leads to more robust and cascadable style sheets. 

The following table provides user agent's guideline for the absolute-size scaling factor and their mapping to XHTML heading and absolute font-sizes. The ‘medium’ value is used as the reference middle value. The user agent may fine-tune these values for different fonts or different types of display devices.
CSS absolute-size values 	xx-small 	x-small 	small 	medium 	large 	x-large 	xx-large 	 
scaling factor 	3/5 	3/4 	8/9 	1 	6/5 	3/2 	2/1 	3/1
XHTML headings 	h6 	  	h5 	h4 	h3 	h2 	h1 	 
XHTML font sizes 	1 	  	2 	3 	4 	5 	6 	7

Note 1. To preserve readability, an UA applying these guidelines should nevertheless avoid creating font-size resulting in less than 9 pixels per EM unit on a computer display .

Note 2. In CSS1, the suggested scaling factor between adjacent indexes was 1.5 which user experience proved to be too large. In CSS2, the suggested scaling factor for computer screen between adjacent indexes was 1.2 which still created issues for the small sizes. The new scaling factor varies between each index to provide a better readability.

The actual value [link to Cascading module] of this property may differ from the computed value due a numerical value on ‘font-size-adjust’ and the unavailability of certain font sizes.

Child elements inherit the computed ‘font-size’ value (otherwise, the effect of ‘font-size-adjust’ would compound).

p { font-size: 12pt; }
blockquote { font-size: larger }
em { font-size: 150% }
em { font-size: 1.5em }

3.6 Relative sizing: the font-size-adjust property
Name: 	font-size-adjust
Value: 	<number> | none | inherit
Initial: 	none
Applies to: 	all elements
Inherited: 	yes
Percentages: 	N/A
Media: 	visual
Computed value: 	as specified

For any given font size, the apparent size and legibility of text varies across fonts. For scripts such as Latin or Cyrillic that distinguish between upper and lowercase letters, the relative height of lowercase letters compared to their uppercase counterparts is a determining factor of legibility. This is commonly referred to as the aspect value. Precisely defined, it is equal to the x-height of a font divided by the font size.

In situations where font fallback occurs, fallback fonts may not share the same aspect ratio as the desired font family and will thus appear less readable. The font-size-adjust property is a way to preserve the readability of text when font fallback occurs. It does this by adjusting the font-size so that the x-height is the same regardless of the font used.

The style defined below defines Verdana as the desired font family, but if Verdana is not available Futura or Times will be used.

p { 
    font-family: Verdana, Futura, Times; 
}

<p>Lorem ipsum dolor sit amet, ...</p>

Verdana has a relatively high aspect ratio, lowercase letters are relatively tall compared to uppercase letters, so at small sizes text appears legible. Times has a lower aspect ratio and so if fallback occurs, the text will be less legible at small sizes than Verdana.

How text rendered in each of these fonts compares is shown below, the columns show text rendered in Verdana, Futura and Times. The same font-size value is used across cells within each row and red lines are included to show the differences in x-height. In the upper half each row is rendered in the same font-size value. The same is true for the lower half but in this half the font-size-adjust property is also set so that the actual font size is adjusted to preserve the x-height across each row. Note how small text remains relatively legible across each row in the lower half.
text with and without font-size-adjust

Text with and without the use of font-size-adjust

This property allows authors to specify an aspect value for an element that will effectively preserve the x-height of the first choice font, whether it is substituted or not. Values have the following meanings:

none
    Do not preserve the font's x-height. 
<number>
    Specifies the aspect value used in the calculation below to calculate the adjusted font size:

    c  =  ( a / a' ) s 

    where:

    s  =  font-size value
    a  =  aspect value as specified by the font-size-adjust property
    a' =  aspect value of actual font
    c  =  adjusted font-size to use

    This value applies to any font that is selected but in typical usage it should be based on the aspect value of the first font in the font-family list. If this is specified accurately, the (a/a') term in the formula above is effectively 1 for the first font and no adjustment occurs. If the value is specified inaccurately, text rendered using the first font in the family list will display differently in older user agents that don't support font-size-adjust.

Authors can calculate the aspect value for a given font by comparing spans with the same content but different font-size-adjust properties. If the same font-size is used, the spans will match when the font-size-adjust value is accurate for the given font.

Two spans with borders are used to determine the aspect value of a font. The font-size is the same for both spans but the font-size-adjust property is specified only for the right span. Starting with a value of 0.5, the aspect value can be adjusted until the borders around the two letters line up.

p {
    font-family: Futura;
    font-size: 500px;
}

span {
    border: solid 1px red;
}

.adjust {
    font-size-adjust: 0.5;
}

<p><span>b</span><span class="adjust">b</span></p>

Futura with an aspect value of 0.5

Futura with an aspect value of 0.5

The box on the right is a bit bigger than the one on the left, so the aspect value of this font is something less than 0.5. Adjust the value until the boxes align.
3.7 Shorthand font property: the font property
Name: 	font
Value: 	[ [ <‘font-style’> || <font-variant-css21> || <‘font-weight’> ]? <‘font-size’> [ / <‘line-height’> ]? <‘font-family’> ] | caption | icon | menu | message-box | small-caption | status-bar | inherit
Initial: 	see individual properties
Applies to: 	all elements
Inherited: 	yes
Percentages: 	see individual properties
Media: 	visual
Computed value: 	see individual properties

The ‘font’ property is, except as described below, a shorthand property for setting ‘font-style’, ‘font-variant’, ‘font-weight’, ‘font-size’, ‘line-height’, ‘font-family’ at the same place in the stylesheet. Values for the ‘font-variant’ property may also be included but only those supported in CSS 2.1, none of the font-variant values added in this specification can be used in the ‘font’ shorthand:

<font-variant-css21> = [normal | small-caps | inherit]

The syntax of this property is based on a traditional typographical shorthand notation to set multiple properties related to fonts.

All font-related properties are first reset to their initial values, including those listed in the preceding paragraph plus ‘font-stretch’, ‘font-size-adjust’, ‘font-kerning’ and all font feature properties. Then, those properties that are given explicit values in the ‘font’ shorthand are set to those values. For a definition of allowed and initial values, see the previously defined properties. For reasons of backwards compatibility, it is not possible to set ‘font-stretch’ and ‘font-size-adjust’ to other than their initial values using the ‘font’ shorthand property; instead, set the individual properties.

p { font: 12pt/14pt sans-serif }
p { font: 80% sans-serif }
p { font: x-large/110% "new century schoolbook", serif }
p { font: bold italic large Palatino, serif }
p { font: normal small-caps 120%/120% fantasy }
p { font: oblique 12pt "Helvetica Neue", serif; font-stretch: condensed }

In the second rule, the font size percentage value (‘80%’) refers to the font size of the parent element. In the third rule, the line height percentage (‘110%’) refers to the font size of the element itself.

The first three rules do not specify the ‘font-variant’ and ‘font-weight’ explicitly, so these properties receive their initial values (‘normal’). Notice that the font family name "new century schoolbook", which contains spaces, is enclosed in quotes. The fourth rule sets the ‘font-weight’ to ‘bold’, the ‘font-style’ to ‘italic’, and implicitly sets ‘font-variant’ to ‘normal’.

The fifth rule sets the ‘font-variant’ (‘small-caps’), the ‘font-size’ (120% of the parent's font size), the ‘line-height’ (120% of the font size) and the ‘font-family’ (‘fantasy’). It follows that the keyword ‘normal’ applies to the two remaining properties: ‘font-style’ and ‘font-weight’.

The sixth fifth rule sets the ‘font-style’, ‘font-size’, and ‘font-family’, the other font properties being set to their initial values. It then sets ‘font-stretch’ to ‘condensed’ since that property cannot be set to that value using the ‘font’ shorthand property.

The following values refer to system fonts:

caption
    The font used for captioned controls (e.g., buttons, drop-downs, etc.). 
icon
    The font used to label icons. 
menu
    The font used in menus (e.g., dropdown menus and menu lists). 
message-box
    The font used in dialog boxes. 
small-caption
    The font used for labeling small controls. 
status-bar
    The font used in window status bars. 

System fonts may only be set as a whole; that is, the font family, size, weight, style, etc. are all set at the same time. These values may then be altered individually if desired. If no font with the indicated characteristics exists on a given platform, the user agent should either intelligently substitute (e.g., a smaller version of the ‘caption’ font might be used for the ‘smallcaption’ font), or substitute a user agent default font. As for regular fonts, if, for a system font, any of the individual properties are not part of the operating system's available user preferences, those properties should be set to their initial values.

That is why this property is "almost" a shorthand property: system fonts can only be specified with this property, not with ‘font-family’ itself, so ‘font’ allows authors to do more than the sum of its subproperties. However, the individual properties such as ‘font-weight’ are still given values taken from the system font, which can be independently varied.

button { font: 300 italic 1.3em/1.7em "FB Armada", sans-serif }
button p { font: menu }
button p em { font-weight: bolder }

If the font used for dropdown menus on a particular system happened to be, for example, 9-point Charcoal, with a weight of 600, then P elements that were descendants of BUTTON would be displayed as if this rule were in effect:

button p { font: 600 9pt Charcoal }

Because the ‘font’ shorthand resets to its initial value any property not explicitly given a value, this has the same effect as this declaration:

button p {
  font-style: normal;
  font-variant: normal;
  font-weight: 600;
  font-size: 9pt;
  line-height: normal;
  font-family: Charcoal
} 

3.8 Controlling synthetic faces: the font-synthesis property
Name: 	font-synthesis
Value: 	none | [ weight || style ]
Initial: 	weight style
Applies to: 	all elements
Inherited: 	yes
Percentages: 	N/A
Media: 	visual
Computed value: 	as specified

This property controls whether user agents are allowed to synthesize bold or oblique font faces when a font family lacks bold or italic faces. If ‘weight’ is not specified, user agents must not synthesize bold faces and if ‘style’ is not specified user agents must not synthesize italic faces. A value of ‘none’ disallows all synthetic faces.

The style rule below disables the use of synthetically obliqued Arabic:

*:lang(ar) { font-synthesis: none; }

4 Font resources
4.1 The @font-face rule

The @font-face rule allows for linking to fonts that are automatically activated when needed. This allows authors to select a font that closely matches the design goals for a given page rather than limiting the font choice to a set of fonts available on all platforms. A set of font descriptors define the location of a font resource, either locally or externally, along with the style characteristics of an individual face. Multiple @font-face rules can be used to construct font families with a variety of faces. Using CSS font matching rules, a user agent can selectively download only those faces that are needed for a given piece of text.

The general form of an @font-face at-rule is:

@font-face { <font-description> }

where <font-description> has the form:

descriptor: value;
descriptor: value;
[...]
descriptor: value;

Each @font-face rule specifies a value for every font descriptor, either implicitly or explicitly. Those not given explicit values in the rule take the initial value listed with each descriptor in this specification. These descriptors apply solely within the context of the @font-face rule in which they are defined, and do not apply to document language elements. There is no notion of which elements the descriptors apply to or whether the values are inherited by child elements. When a given descriptor occurs multiple times in a given @font-face rule, only the last specified value is used, all prior values for that descriptor are ignored.

To use a downloadable font called Gentium:

@font-face {
  font-family: Gentium;
  src: url(http://example.com/fonts/Gentium.ttf);
}

p { font-family: Gentium, serif; }

The user agent will download Gentium and use it when rendering text within paragraph elements. If for some reason the site serving the font is unavailable, the default serif font will be used.

A given set of @font-face rules define a set of fonts available to containing documents. Multiple rules can be used to define a family with a large set of faces. When font matching is done fonts defined using these rules are considered before other available fonts on a system.

Downloaded fonts are only available to documents that reference them, the process of activating these fonts should not make them available to other applications or to documents that don't directly link to the same font. User agent implementers might consider it convenient to use downloaded fonts when rendering characters in other documents for which no other available font exists as part of the system font fallback procedure. This would cause a security leak since the contents of one page would be able to affect other pages, something an attacker could use as an attack vector. These restrictions do not affect caching behavior, fonts are cached the same way other web resources are cached.

User agents which do not understand the @font-face rule encounter the opening curly bracket and ignore forward until the closing curly bracket. This at-rule conforms with the forward-compatible parsing requirement of CSS, parsers may ignore these rules without error. Any descriptors that are not recognized or implemented by a given user agent must be ignored. @font-face rules require a font-family and src descriptor, if either of these are missing the @font-face must be ignored.

In cases where user agents have limited platform resources or implement the ability to disable downloadable font resources, @font-face rules must simply be ignored; the behavior of individual descriptors as defined in this specification should not be altered.
4.2 Font family: the font-family descriptor
Name: 	font-family
Value: 	<family-name>
Initial: 	N/A

This descriptor defines the font family name that will be used in all CSS font family name matching, overriding font family names contained in the underlying font data. If the font family name is the same as a font family available in a given user's environment, it effectively hides the underlying font for documents that use the stylesheet. This permits a web author to freely choose font-family names without worrying about conflicts with font family names present in a given user's environment. Errors loading font data do not affect font name matching behavior. User agents that apply platform font aliasing rules to font family names defined via @font-face rules are considered non-conformant.
4.3 Font reference: the src descriptor
Name: 	src
Value: 	[ <uri> [format(<string> [, <string>]*)] | <font-face-name> ] [, <uri> [format(<string> [, <string>]*)] | <font-face-name> ]*
Initial: 	N/A

This descriptor specifies the resource containing font data. It is required, whether the font is downloadable or locally installed. Its value is a prioritized, comma-separated list of external references or locally installed font face names. When a font is needed the user agent iterates over the set of references listed, using the first one it can successfully activate. Fonts containing invalid data or local font faces that are not found are ignored and the user agent loads the next font in the list (platform substitutions for a given font must not be used).

As with other URIs in CSS, the URI may be partial, in which case it is resolved relative to the location of the style sheet containing the @font-face rule. In the case of SVG fonts, the URL points to an element within a document containing SVG font definitions. If the element reference is omitted, a reference to the first defined font is implied.

src: url(fonts/simple.ttf);   /* load simple.ttf relative to stylesheet location */
src: url(/fonts/simple.ttf);  /* load simple.ttf from absolute location */
src: url(fonts.svg#simple);   /* load SVG font with id 'simple' */

External references consist of a URI, followed by an optional hint describing the format of the font resource referenced by that URI. The format hint contains a comma-separated list of format strings that denote well-known font formats. Conformant user agents must skip downloading a font resource if the format hints indicate only unsupported or unknown font formats. If no format hints are supplied, the user agent should download the font resource.

/* load WOFF font if possible, otherwise use OpenType font */
@font-face {
  font-family: bodytext;
  src: url(ideal-sans-serif.woff) format("woff"),
       url(basic-sans-serif.ttf) format("opentype");
}

Format strings defined by this specification:
String 	Font Format 	Common extensions
"woff" 	WOFF (Web Open Font Format) 	.woff
"truetype" 	TrueType 	.ttf
"opentype" 	OpenType 	.ttf, .otf
"embedded-opentype" 	Embedded OpenType 	.eot
"svg" 	SVG Font 	.svg, .svgz

Given the overlap in common usage between TrueType and OpenType, the format hints "truetype" and "opentype" must be considered as synonymous; a format hint of "opentype" does not imply that the font contains Postscript CFF style glyph data or that it contains OpenType layout information (see Appendix B for more background on this).

When authors would prefer to use a locally available copy of a given font and download it if it's not, local() can be used. The locally installed <font-face-name> is a format-specific string that uniquely identifies a single font face within a larger family. The syntax for a <font-face-name> is a unique font face name enclosed by "local(" and ")".

/* regular face of Gentium */
@font-face {
  font-family: MyGentium;
  src: local(Gentium),   /* use locally available Gentium */
       url(Gentium.ttf); /* otherwise, download it */
}

The name can optionally be enclosed in quotes. For OpenType and TrueType fonts, this string is used to match only the Postscript name or the full font name in the name table of locally available fonts. Which is used varies by platform and font, so authors should include both of these names to assure proper matching across platforms.

/* bold face of Gentium */
@font-face {
  font-family: MyGentium;
  src: local(Gentium Bold),   /* full font name */
       local(Gentium-Bold),   /* Postscript name */
       url(GentiumBold.ttf);  /* otherwise, download it */
  font-weight: bold;
}

Just as a @font-face rule specifies the characteristics of a single font within a family, the unique name used with local() specifies a single font, not an entire font family. Defined in terms of OpenType font data, the Postscript name is found in the font's name table, in the name record with nameID = 6 (see [OPENTYPE] for more details). The Postscript name is the commonly used key for all fonts on OSX and for Postscript CFF fonts under Windows. The full font name (nameID = 4) is used as a unique key for fonts with TrueType glyphs on Windows.

For OpenType fonts with multiple localizations of the full font name, the US English version is used (language ID = 0x409 for Windows and language ID = 0 for Macintosh) or the first localization when a US English full font name is not available (the OpenType specification recommends that all fonts minimally include US English names). User agents that also match other full font names, e.g. matching the Dutch name when the current system locale is set to Dutch, are considered non-conformant. This is done not to prefer English but to avoid matching inconsistencies across font versions and OS localizations, since font style names (e.g. "Bold") are frequently localized into many languages and the set of localizations available varies widely across platform and font version. User agents that match a concatenation of family name (nameID = 1) with style name (nameID = 2) are considered non-conformant.

This also allows for referencing faces that belong to larger families that cannot otherwise be referenced.

Use a local font or reference an SVG font in another document:

@font-face {
  font-family: Headline;
  src: local(Futura-Medium), 
       url(fonts.svg#MyGeometricModern) format("svg");
}

Create an alias for local Japanese fonts on different platforms:

@font-face {
  font-family: jpgothic;
  src: local(HiraKakuPro-W3), local(Meiryo), local(IPAPGothic);
}

Reference a font face that cannot be matched within a larger family:

@font-face {
  font-family: Hoefler Text Ornaments;
  /* has the same font properties as Hoefler Text Regular */
  src: local(HoeflerText-Ornaments); 
}

Since localized fullnames should never match, a document with the header style rules below would always render using the default serif font, regardless whether a particular system locale parameter is set to Finnish or not:

@font-face {
  font-family: SectionHeader;
  src: local("Arial Lihavoitu");  /* Finnish fullname for Arial Bold, matching should fail */
  font-weight: bold;
}

h2 { font-family: SectionHeader, serif; }

A conformant user agent should never load the font ‘gentium.eot’ in the example below, since it is included in the first definition of the ‘src’ descriptor which is overridden by the second definition in the same @font-face rule:

@font-face {
  font-family: MainText;
  src: url(gentium.eot); /* for compatibility with older non-conformant user agents */
  src: local("Gentium"), url(gentium.ttf);  /* Overrides src definition */
}

4.4 Font property descriptors: the font-style, font-weight, font-stretch descriptors
Name: 	font-style
Value: 	normal | italic | oblique
Initial: 	normal
Name: 	font-weight
Value: 	normal | bold | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
Initial: 	normal
Name: 	font-stretch
Value: 	normal | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded
Initial: 	normal

These descriptors define the characteristics of a font face and are used in the process of matching styles to specific faces. For a font family defined with several @font-face rules, user agents can either download all faces in the family or use these descriptors to selectively download font faces that match actual styles used in document. The values for these descriptors are the same as those for the corresponding font properties except that relative keywords are not allowed, ‘bolder’ and ‘lighter’. If these descriptors are omitted, default values are assumed.

The value for these font face style attributes is used in place of the style implied by the underlying font data. This allows authors to combine faces in flexible combinations, even in situations where the original font data was arranged differently. User agents that implement synthetic bolding and obliqueing must only apply synthetic styling in cases where the font descriptors imply this is needed, rather than based on the style attributes implied by the font data.
4.5 Character range: the unicode-range descriptor
Name: 	unicode-range
Value: 	<urange> [, <urange>]*
Initial: 	U+0-10FFFF

This descriptor defines the range of Unicode characters supported by a given font. The values of <urange> are expressed using hexadecimal numbers prefixed by "U+", corresponding to Unicode character code points. The unicode-range descriptor serves as a hint for user agents when deciding whether or not to download a font resource.

Unicode range values are written using hexadecimal values and are case insensitive. Each is prefixed by "U+" and multiple, discontinuous ranges are separated by commas. Whitespace before or after commas is ignored. Valid character code values vary between 0 and 10FFFF inclusive. A single range has three basic forms:

    a single code point (e.g. U+416)
    an interval value range (e.g. U+400-4ff)
    a range where trailing ‘?’ characters imply ‘any digit value’ (e.g. U+4??) 

Ranges that do not fit any of the above three forms are considered to be parse errors and the descriptor is omitted. Interval ranges consisting of a single code point are valid. Ranges specified with ‘?’ that lack an initial digit (e.g. "U+???") are also valid, and are treated as if there was a single 0 before the question marks (thus, "U+???" = "U+0???" = "U+0000-0FFF"). "U+??????" is not a syntax error, even though "U+0??????" would be. Ranges can overlap but interval ranges that descend (e.g. U+400-32f) are invalid and omitted rather than treated as parse errors; they have no effect on other ranges in a list of ranges. Ranges are clipped to the domain of Unicode code points (currently 0 - 10FFFF inclusive); a range entirely outside the domain is omitted. Without any valid ranges, the descriptor is omitted. User agents may normalize the list of ranges into a list that is different but represents the same set of character code points.

The character range can be a subset of the full character map of the underlying font. The effective unicode-range used when mapping characters to fonts is the intersection of the unicode range specified and the underlying character map of the font. This means that authors do not need to define the unicode-range of a font precisely, broad ranges for which a sparse set of code points are defined in the font can be used. Code points outside of the defined unicode-range are ignored, regardless of whether the font contains a glyph for that code point or not. User agents that download fonts for characters outside the defined unicode-range are considered non-conformant. Likewise, user agents that render a character using a font resource for which the defined unicode-range does not include that character are also considered non-conformant.

Example ranges for specific languages or characters:

unicode-range: U+A5;
    a single code point, the yen/yuan symbol 
unicode-range: U+0-7F;
    code range for basic ASCII characters 
unicode-range: U+590-5ff;
    code range for Hebrew characters 
unicode-range: U+A5, U+4E00-9FFF, U+30??, U+FF00-FF9F;
    code range for Japanese kanji, hiragana and katakana characters plus yen/yuan symbol 

The BBC provides news services in a wide variety of languages, many that are not well supported across all platforms. Using an @font-face rule, the BBC could provide a font for any of these languages, as it already does via a manual font download.

@font-face {
  font-family: BBCBengali;
  src: url(fonts/BBCBengali.ttf) format("opentype");
  unicode-range: U+00-FF, U+980-9FF;
}

Technical documents often require a wide range of symbols. The STIX Fonts project is one project aimed at providing fonts to support a wide range of technical typesetting in a standardized way. The example below shows the use of a font that provides glyphs for many of the mathematical and technical symbol ranges within Unicode:

@font-face {
  font-family: STIXGeneral;
  src: local(STIXGeneral), url(/stixfonts/STIXGeneral.otf);
  unicode-range: U+000-49F, U+2000-27FF, U+2900-2BFF, U+1D400-1D7FF;
}

Multiple @font-face rules with different unicode ranges for the same family and style descriptor values can be used to create composite fonts that mix the glyphs from different fonts for different scripts. This can be used to combine fonts that only contain glyphs for a single script (e.g. Latin, Greek, Cyrillic) or it can be used by authors as a way of segmenting a font into fonts for commonly used characters and less frequently used characters. Since the user agent will only pull down the fonts it needs this helps reduce page bandwidth.

It has been suggested that named ranges for commonly used ranges be defined. Is this useful and if so, what should those ranges be based on (e.g. Unicode's block definitions)? This would be especially helpful for CJK segmenting where the goal would be to have named ranges that group codepoints by relative frequency but it's unclear what source to use as a basis for specifying this.

If the unicode ranges overlap for a set of @font-face rules with the same family and style descriptor values, the rules are ordered in the reverse order they were defined; the last rule defined is the first to be checked for a given character.

This example shows how an author can override the glyphs used for Latin characters in a Japanese font with glyphs from a different font. The first rule specifies no range so it defaults to the entire range. The range specified in the second rule overlaps but takes precedence because it is defined later.

@font-face {
  font-family: JapaneseWithGentium;
  src: local(MSMincho);
  /* no range specified, defaults to entire range */
}

@font-face {
  font-family: JapaneseWithGentium;
  src: url(../fonts/Gentium.ttf);
  unicode-range: U+0-2FF;
}

Consider a family constructed to optimize bandwidth by separating out Latin, Japanese and other characters into different font files:

/* fallback font - size: 4.5MB */
@font-face {
  font-family: DroidSans;
  src: url(DroidSansFallback.ttf);
  /* no range specified, defaults to entire range */
}

/* Japanese glyphs - size: 1.2MB */
@font-face {
  font-family: DroidSans;
  src: url(DroidSansJapanese.ttf);
  unicode-range: U+3000-9FFF, U+ff??;
}

/* Latin, Greek, Cyrillic along with some 
   punctuation and symbols - size: 190KB */
@font-face {
  font-family: DroidSans;
  src: url(DroidSans.ttf);
  unicode-range: U+000-5FF, U+1e00-1fff, U+2000-2300;
}

For simple Latin text, only the font for Latin characters is downloaded:

body { font-family: DroidSans; }

<p>This is that</p>

In this case the user agent first checks the unicode-range for the font containing Latin characters (DroidSans.ttf). Since all the characters above are in the range U+0-5FF, the user agent downloads the font and renders the text with that font.

Next, consider text that makes use of an arrow character (⇨):

<p>This &#x21e8; that<p>

The user agent again first checks the unicode-range of the font containing Latin characters. Since U+2000-2300 includes the arrow code point (U+21E8), the user agent downloads the font. For this character however the Latin font does not have a matching glyph, so the effective unicode-range used for font matching excludes this code point. Next, the user agent evaluates the Japanese font. The unicode-range for the Japanese font, U+3000-9FFF and U+ff??, does not include U+21E8, so the user agent does not download the Japanese font. Next the fallback font is considered. The @font-face rule for the fallback font does not define unicode-range so its value defaults to the range of all Unicode code points. The fallback font is downloaded and used to render the arrow character.
4.6 Font features: the font-variant and font-feature-settings descriptors
Name: 	font-variant
Value: 	normal | [<ligature-values> | <alternates-values> | <caps-value> | <numeric-values> | <east-asian-variations>]+
Initial: 	normal
Name: 	font-feature-settings
Value: 	normal | <feature-tag-value> [, <feature-tag-value>]*
Initial: 	normal

These descriptors define settings that apply when the font defined by an @font-face rule is rendered. They do not affect font selection. Values are identical to those defined for the corresponding ‘font-variant’ and ‘font-feature-settings’ properties defined below except that the value ‘inherit’ is omitted. When multiple font feature descriptors or properties are used, the cumulative effect on text rendering is described below.
5 Font matching algorithm

The algorithm below describes how fonts are associated with individual runs of text. For each character in the run a font family is chosen and a particular font face is selected containing a glyph for that character.
5.1 Matching font styles

The procedure for choosing fonts consists of iterating over the font families determined by the font-family property, selecting a font face with the appropriate style based on other font properties and then determining whether a glyph exists for a given character.

    Using the computed font property values for a given element, the user agent starts with the first family name in the fontlist specified by the ‘font-family’ property.
    If the family name is unquoted and is a generic family name, the user agent looks up the appropriate font family name to be used. User agents may choose the generic font family to use based on the language of the containing element or the Unicode range of the character.
    For other family names, the user agent attempts to find the family name among fonts defined via @font-face rules and then among available system fonts, matching names with a case-insensitive comparison. On systems containing fonts with multiple localized font family names, user agents must match any of these names independent of the underlying system locale or platform API used. If a font family defined via @font-face rules contains only invalid font data, it should be considered as if a font was present but contained an empty character map; matching a platform font with the same name must not occur in this case.
    If a font family match occurs, the user agent assembles the set of font faces in that family that contain a glyph for the character. It then narrows this matching set to a single face using other font properties in the order given below:
        ‘font-stretch’ is tried first. If the matching set contains faces with width values matching the ‘font-stretch’ value, faces with other width values are removed from the matching set. If there is no face that exactly matches the width value the nearest width is used instead. If the value of ‘font-stretch’ is ‘normal’ or one of the condensed values, narrower width values are checked first, then wider values. If the value of ‘font-stretch’ is one of the expanded values, wider values are checked first, followed by narrower values. Once the closest matching width has been determined by this process, faces with other widths are removed from the matching set.
        ‘font-style’ is tried next. If the value of ‘font-style’ is ‘italic’, italic faces are checked first, then oblique, then normal faces. If the value is ‘oblique’, oblique faces are checked first, then italic faces and then normal faces. If the value is ‘normal’, normal faces are checked first, then oblique faces, then italic faces. Faces with other style values are excluded from the matching set. User agents are permitted to distinguish between italic and oblique faces within platform font families but this is not required, they may treat all italic or oblique faces as italic faces. However, within font families defined via @font-face rules, italic and oblique faces must be distinguished using the value of the ‘font-style’ descriptor.
        ‘font-weight’ is matched next, it will always reduce the matching set to a single font face. If bolder/lighter relative weights are used, the effective weight is calculated based on the inherited weight value, as described in the definition of the ‘font-weight’ property. Given the desired weight and the weights of faces in the matching set after the steps above, if the desired weight is available that face matches. Otherwise, a weight is chosen using the rules below:
            If the desired weight is less than 400, weights below the desired weight are checked in descending order followed by weights above the desired weight in ascending order until a match is found.
            If the desired weight is greater than 500, weights above the desired weight are checked in ascending order followed by weights below the desired weight in descending order until a match is found.
            If the desired weight is 400, 500 is checked first and then the rule for desired weights less than 400 is used.
            If the desired weight is 500, 400 is checked first and then the rule for desired weights less than 400 is used. 
        ‘font-size’ must be matched within a UA-dependent margin of tolerance. (Typically, sizes for scalable fonts are rounded to the nearest whole pixel, while the tolerance for bitmapped fonts could be as large as 20%.) Further computations, e.g., by ‘em’ values in other properties, are based on the ‘font-size’ value that is used, not the one that is specified. 
    If no matching face exists or the matched face does not contain a glyph for the character to be rendered, the next family name is selected and the previous two steps repeated. If the matched font is defined via an @font-face rule, the font resource is downloaded. If the matched font is defined via @font-face and needs to be downloaded, the user agent can either wait until the font is downloaded or render once with substituted font metrics and render again once the font is downloaded.
    If there are no more font families to be evaluated and no matching face has been found, then the user agent performs a system font fallback procedure to find the best match for the character to be rendered. The result of this procedure may vary across user agents.
    If a particular character cannot be displayed using any font, the user agent should indicate by some means that a character is not being displayed, displaying either a symbolic representation of the missing glyph (e.g. using a Last Resort Font) or using the missing character glyph from a default font. 

5.2 Character handling issues

The procedure above is always performed on text runs containing Unicode characters, documents using legacy encodings are assumed to have been transcoded before matching fonts. For fonts containing character maps for both legacy encodings and Unicode, the contents of the legacy encoding character map must have no effect on the results of the font matching process.

The font matching process does not assume that text runs are in either normalized or denormalized form (see [CHARMOD-NORM] for more details). Layout engines often convert base character plus combining character sequences into precomposed characters if they exist. Fonts can generally support both ways of matching characters but variations can occur. Authors should always tailor their choice of fonts to their content, including whether that content contains normalized or denormalized character streams.

If a text run contains Unicode variation selectors, special handling is required. For each character + variation selector pair, if the first font with a glyph for the base character also contains a glyph for the variant specified by the variation selector, user agents must display the variant glyph instead of the default one. If the first font with a glyph for the base character does not have a glyph for the variation selector pair, the default glyph is displayed.

If a given character is a Private-Use Area Unicode codepoint and none of the fonts in the fontlist contain a glyph for that codepoint, user agents must display some form of missing glyph symbol for that character rather than attempting system font fallback for that codepoint. When matching the replacement character U+FFFD, user agents may skip the font matching process and immediately display some form of missing glyph symbol, they are not required to display the glyph from the font that would be selected by the font matching process.

In general, the fonts for a given family will all have the same or similar character maps. The process outlined here is designed to handle even font families containing faces with widely variant character maps. However, authors are cautioned that the use of such families can lead to unexpected results. A special character only available in the condensed italic face of a family may still be used even when font properties imply a bold expanded face should be used instead.

Optimizations of this process are allowed provided that an implementation behaves as if the algorithm had been followed exactly. Matching occurs in a well-defined order to insure that the results are as consistent as possible across user agents, given an identical set of available fonts and rendering technology.

How to match grapheme clusters needs to be specified explicitly.
5.3 Font matching changes since CSS 2.1

The algorithm above is different from CSS 2.1 in a number of key places. These changes were made to better reflect actual font matching behavior across user agent implementations.

Differences compared to the font matching algorithm in CSS 2.1:

    The algorithm includes font-stretch matching.
    All possible font-style matching scenarios are delineated.
    Small-caps fonts are not matched as part of the font matching process, they are now handled via font features.
    Unicode variation selector matching is required. 

It's useful to note that the CSS selector syntax may be used to create language-sensitive typography. For example, some Chinese and Japanese characters are unified to have the same Unicode code point, although the abstract glyphs are not the same in the two languages.

*:lang(ja-jp) { font: 900 14pt/16pt "Heisei Mincho W9", serif; }
*:lang(zh-tw) { font: 800 14pt/16.5pt "Li Sung", serif; }

This selects any element that has the given language - Japanese or Traditional Chinese - and uses the appropriate font.
6 Font feature properties

Modern font technologies support a variety of advanced typographic and language-specific font features. Using these features, a single font can provide glyphs for a wide range of ligatures, contextual and stylistic alternates, tabular and old-style figures, small capitals, automatic fractions, swashes, and alternates specific to a given language. To allow authors control over these font capabilities, the font-variant property has been expanded for CSS3, it now functions as a shorthand for a set of properties that provide control over stylistic font features.
6.1 Glyph selection and positioning

Simple fonts used for displaying Latin text use a very basic processing model, fonts contain a character map which maps a given character to a glyph for that character. Glyphs for subsequent characters are simply placed next in line along a run of text. Font formats such as OpenType and AAT (Apple Advanced Typography) use a richer processing model, the glyph for a given character can be chosen and positioned not just based on a single character, but also based on surrounding characters along with the language, script, and features enabled for the text. Font features may be required for specific scripts, or recommended as enabled by default or they may be stylistic features meant to be used under author control.

For a good visual overview of these features, see the [OPENTYPE-FONT-GUIDE]. For a detailed description of glyph processing for OpenType fonts, see [WINDOWS-GLYPH-PROC].

The subproperties of font-variant listed below are used to control these stylistic font features; they do not control features that are required for displaying certain scripts, such as the OpenType features used when displaying Arabic or Indic language text. They affect glyph selection and positioning, they do not affect font selection as described in the font matching section (except in cases required for compatibility with CSS 2.1).

To assure consistent behavior across user agents, the equivalent OpenType property settings are listed for individual properties and must be considered normative. When using other font formats these should be used as a guideline to map CSS font feature property values to specific font features.

The complete set of features on by default is not completely specified in OpenType documentation. Should these be listed in a normative appendix or should a more complete list be requested from those controlling the OpenType specification?
6.2 Language-specific display

OpenType also supports language-specific glyph selection and positioning, so that text can be displayed correctly in cases where the language dictates a specific display behavior. Languages often share a common script but the shape of certain letters may vary across those languages, such as the variations in certain Cyrillic letters used in Russian and Bulgarian text. In Latin text, it's common to render "fi" with an explicit fi-ligature that lacks a dot on the "i". However, in languages such as Turkish which uses both a dotted-i and a dotless-i, it's important to not use this ligature or use a specialized version that contains a dot over the "i". The example below shows language-specific variations based on stylistic traditions found in Spanish, Italian and French orthography:
language specific forms, spanish
language specific forms, italian
language specific forms, french

Users agents are required to infer the OpenType language system from the value of the ‘lang’ attribute and use that when selecting and positioning glyphs using an OpenType font. If the ‘lang’ attribute is not defined, the default OpenType language system must be used.

In some cases it may be necessary to explicitly declare the OpenType language to be used, for example when displaying text in a given language that uses the typographic conventions of another language, or when the font does not explicitly support a given language but supports a language that shares common typographic conventions. The ‘font-language-override’ property is used for this purpose.

Should user agents be allowed to infer the Opentype language or simply use only the default language system?
6.3 Kerning: the font-kerning property
Name: 	font-kerning
Value: 	auto | normal | none
Initial: 	auto
Applies to: 	all elements
Inherited: 	yes
Percentages: 	N/A
Media: 	visual
Computed value: 	as specified

Kerning is the contextual adjustment of inter-glyph spacing. This property controls metric kerning, kerning that utilizes adjustment data contained in the font. The value ‘normal’ implies that kerning is applied while the value ‘none’ implies that kerning is not applied when rendering text. If the value is ‘auto’, a user agent is free to choose whether kerning is enabled or not by default and to vary that default based on the underlying text script.

For fonts that do not include kerning data this property will have no visible effect. When rendering with OpenType fonts, the [OPENTYPE] specification suggests that kerning be enabled by default. When kerning is enabled, the OpenType kern feature is enabled. User agents must also support fonts that only support kerning via data contained in a ‘kern’ font table, as detailed in the OpenType specification. Authors may prefer to disable kerning in situations where performance is more important that precise appearance. If the ‘letter-spacing’ property is defined, kerning adjustments are considered part of the default spacing, letter spacing adjustments are made after kerning has been applied.
6.4 Subscript, superscript and ordinal forms: the vertical-position property
Name: 	vertical-position
Value: 	normal | subscript | superscript | ordinal
Initial: 	normal
Applies to: 	all elements
Inherited: 	yes
Percentages: 	N/A
Media: 	visual
Computed value: 	as specified

The name for this feature has been a point of contention. The name used here is taken from the AAT feature name but the eventual name may change.

The values ‘subscript’, ‘superscript’, and ‘ordinal’ imply the appropriate variant glyph is displayed when available in the font (OpenType features: subs, supr, ordn). Because of the semantic nature of subscripts and superscripts, when the value is either ‘subscript’ or ‘superscript’ and a variant glyph is not available, a simulated glyph is synthesized using a reduced form of the default glyph. If the value is ‘ordinal’ and a variant glyph is not available, the normal glyph is used, no attempt is made to synthesize one. A value of ‘normal’ implies use of the default glyph at normal size.

In the past, user agents have used font-size and vertical-align to simulate subscripts and superscripts for the sub and sup elements. To allow a backwards combatible way of defining subscripts and superscripts, when the value is either ‘subscript’ or ‘superscript’, the property acts as a shorthand and resets the value of font-size to ‘inherit’ and vertical-align to its initial value. Other than this, the property does not affect the height of the line box.

It would be nice to define this in a way such that it would work with nested subscripts or superscripts which would allow it to be used in user agent stylesheets. But one of the goals for this is to allow simple subscripts and superscripts to be displayed without affecting the line box. To achieve both appears to be a very hairy problem.

Fonts often include default values for subscript/superscript metrics. As a result, a mixture of designed glyphs and simulated glyphs may not display correctly, effectively the baseline would bounce between the two types of glyphs.

Steve Z is concerned about the fact that this property effectively breaks inheritance by resetting font-size and vertical-align.

A typical user agent default style for the sub element:

sub {
  vertical-align: sub;
  font-size: smaller;
  line-height: normal;
}

Using vertical-position to specify typographic subscripts in a way that will still show subscripts in older user agents:

sub {
  vertical-align: sub;
  font-size: smaller;
  line-height: normal;
  vertical-position: subscript;
}

User agents that support the ‘vertical-position’ property will select a subscript variant glyph and reset vertical-align and font-size to ‘inherit’. Older user agents will ignore the vertical-position property definition and use the standard defaults for subscripts.

Note that because this property is not cumulative, it's not suitable for nested subscripts or superscripts. Due to this limitation, vertical-position is not recommended for use in user agent stylesheets.

In the case of OpenType fonts that lack subscript or superscript glyphs for a given character, to calculate the size and offset of the synthesized substitutes user agents must use the appropriate subscript and superscript metrics specified in the selected font's OS/2 table [OPENTYPE].
6.5 Ligatures: the font-variant-ligatures property
Name: 	font-variant-ligatures
Value: 	normal | inherit | [ <common-lig-values> || <additional-lig-values> || <historical-lig-values> ]
Initial: 	normal
Applies to: 	all elements
Inherited: 	yes
Percentages: 	N/A
Media: 	visual
Computed value: 	as specified

Specifies control over which ligatures are enabled or disabled. A value of ‘normal’ implies that the defaults set by the font are used.

<common-lig-values>     = [ common-ligatures | no-common-ligatures ]

<additional-lig-values> = [ additional-ligatures | no-additional-ligatures ]

<historical-lig-values> = [ historical-ligatures | no-historical-ligatures ]

Individual values have the following meanings:

common-ligatures
    Enables display of common ligatures (OpenType feature: liga). For OpenType fonts, common ligatures are enabled by default. 

common ligature example

no-common-ligatures
    Disables display of common ligatures (OpenType feature: liga). 
additional-ligatures
    Enables display of additional ligatures (OpenType feature: dlig). 

additional ligature example

no-additional-ligatures
    Disables display of additional ligatures (OpenType feature: dlig). 
historical-ligatures
    Enables display of historical ligatures (OpenType feature: hlig). 

historical ligature example

no-historical-ligatures
    Disables display of historical ligatures (OpenType feature: hlig). 

Required ligatures, needed for correctly rendering complex scripts, are not affected by the settings above.
6.6 Capitalization: the font-variant-caps property
Name: 	font-variant-caps
Value: 	normal | inherit | <caps-value>
Initial: 	normal
Applies to: 	all elements
Inherited: 	yes
Percentages: 	N/A
Media: 	visual
Computed value: 	as specified

Specifies control over capitalized forms.

<caps-value> = small-caps | all-small-caps | petite-caps | all-petite-caps | titling-caps | unicase

Individual values have the following meanings:

small-caps
    Enables display of small capitals (OpenType feature: smcp). Small-caps glyphs typically use the form of uppercase letters but are reduced to the size of lowercase letters. 

small-caps example

all-small-caps
    Enables display of small capitals for both upper and lowercase letters (OpenType features: c2sc, smcp). 
petite-caps
    Enables display of petite capitals (OpenType feature: pcap). 
all-petite-caps
    Enables display of petite capitals for both upper and lowercase letters (OpenType features: c2pc, pcap). 
titling-caps
    Enables display of titling capitals (OpenType feature: titl). Uppercase letter glyphs are often designed for use with lowercase letters. When used in all uppercase titling sequences they can appear too strong. Titling capitals are designed specifically for this situation. 
unicase
    Enables display of mixture of small capitals for uppercase letters with normal lowercase letters (OpenType feature: unic). 

For backwards compatibility with CSS 2.1, if ‘small-caps’ or ‘all-small-caps’ is specified but small-caps glyphs are not available for a given font, user agents should simulate a small-caps font, for example by taking a normal font and replacing the lowercase letters by scaled uppercase characters (and also uppercase letters in the case of ‘all-small-caps’). As a last resort, unscaled uppercase letter glyphs in a normal font may replace glyphs in a small-caps font so that the text appears in all uppercase letters. If either ‘petite-caps’ or ‘all-petite-caps’ is specified for a font that doesn't support these features, the property behaves as if ‘small-caps’ or ‘all-small-caps’, respectively, had been specified. If ‘titling-caps’ is specified with a font that does not support these features, this property has no visible effect. For scripts that lack uppercase and lowercase letters, ‘small-caps’, ‘all-small-caps’, ‘petite-caps’, ‘all-petite-caps’ and ‘unicase’ have no visible effect.

Quotes rendered italicised, with small-caps on the first line:

blockquote            { font-style: italic; }
blockquote:first-line { font-variant: small-caps; }

<blockquote>I'll be honor-bound to slap them like a haddock.</blockquote>

Insofar as this property causes text to be transformed to uppercase, the same considerations as for ‘text-transform’ apply.
6.7 Numerical formatting: the font-variant-numeric property
Name: 	font-variant-numeric
Value: 	normal | inherit | [ <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || slashed-zero ]
Initial: 	normal
Applies to: 	all elements
Inherited: 	yes
Percentages: 	N/A
Media: 	visual
Computed value: 	as specified

Specifies control over numerical forms.

<numeric-figure-values>   = [ lining-nums | oldstyle-nums ]

<numeric-spacing-values>  = [ proportional-nums | tabular-nums ]

<numeric-fraction-values> = [ diagonal-fractions | stacked-fractions ]

Individual values have the following meanings:

lining-nums
    Enables display of lining numerals (OpenType feature: lnum). 
oldstyle-nums
    Enables display of old-style numerals (OpenType feature: onum). 
proportional-nums
    Enables display of proportional numerals (OpenType feature: pnum). 
tabular-nums
    Enables display of tabular numerals (OpenType feature: tnum). 

The example below shows how these different properties can be combined to influence the rendering of tabular data with fonts that support these features. Within normal paragraph text, proportional numbers are used while tabular numbers are used so that columns of numbers line up properly:
combining number styles

Using number styles

diagonal-fractions
    Enables display of lining diagonal fractions (OpenType feature: frac). 

diagonal fraction example

stacked-fractions
    Enables display of lining stacked fractions (OpenType feature: afrc). 

stacked fraction example

slashed-zero
    Enables display of slashed zeros (OpenType feature: zero). 

slashed zero example

A simple flank steak marinade recipe, rendered with automatic fractions and old-style numerals:

.amount { font-variant-numeric: oldstyle-nums diagonal-fractions; }

<h4>Steak marinade:</h4>
<ul>
  <li><span class="amount">2</span> tbsp olive oil</li>
  <li><span class="amount">1</span> tbsp lemon juice</li>
  <li><span class="amount">1</span> tbsp soy sauce</li>
  <li><span class="amount">1 1/2</span> tbsp dry minced onion</li>
  <li><span class="amount">2 1/2</span> tsp italian seasoning</li>
  <li>Salt &amp; pepper</li>
</ul>

<p>Mix the meat with the marinade and let it sit covered in the refrigerator for a few hours or overnight.</p>

6.8 Alternates and swashes: the font-variant-alternates property
Name: 	font-variant-alternates
Value: 	normal | inherit | [ <contextual-alt-values> || stylistic(<feature-value-name>) || historical-forms || styleset(<feature-value-name> [, <feature-value-name>]*) || character-variant(<feature-value-name> [,<feature-value-name>]*) || swash(<feature-value-name>) || ornament(<feature-value-name>) || annotation(<feature-value-name>) || ruby ]
Initial: 	normal
Applies to: 	all elements
Inherited: 	yes
Percentages: 	N/A
Media: 	visual
Computed value: 	as specified

<contextual-alt-values> = [ contextual | no-contextual ]

For any given character, fonts can provide a variety of alternate glyphs in addition to the default glyph for that character. This property provides control over the selection of these alternate glyphs.

In cases where multiple alternates are possible, authors define a <feature-value-name> using the @font-feature-values rule described below to indicate the specific alternate to be used. The nature of these alternates is font specific, so the rule defines values for a specific font family or set of families. When a particular value has not been defined for a given family, the named value is treated as if the feature had omitted from the style rule. If a given value is outside the range supported by a given font, the value is ignored. These values never apply to generic font families, nor to families selected as part of system font fallback. Values that behave this way are marked as font specific.

Individual values have the following meanings:

stylistic(<feature-value-name>)
    Enables display of stylistic alternates (font specific, OpenType feature: salt <feature-value-name>). 

stylistic alternate example

contextual
    Enables display of contextual alternates (OpenType feature: calt, clig). 

contextual alternate example

no-contextual
    Disables display of contextual alternates (OpenType feature: calt, clig). 
historical-forms
    Enables display of historical forms (OpenType feature: hist). 

historical form example

styleset(<feature-value-name> [,<feature-value-name>]*)
    Enables display with stylistic sets (font specific, OpenType feature: ss<feature-index> OpenType currently defines ss01 through ss20). 

styleset example

character-variant(<feature-value-name> [,<feature-value-name>]*)
    Enables display of specific character variants (font specific, OpenType feature: cv<feature-index> OpenType currently defines cv01 through cv99). 
swash(<feature-value-name>)
    Enables display of swash glyphs (font specific, OpenType feature: swsh <feature-index>, cswh <feature-index>). 

swash example

ornaments(<feature-value-name>)
    Enables replacement of default glyphs with ornaments, if provided in the font (font specific, OpenType feature: ornm <feature-index>). Some fonts may offer ornament glyphs as alternates for a wide collection of characters; however, displaying arbitrary characters (e.g., alphanumerics) as ornaments is poor practice as it distorts the semantics of the data. Font designers are encouraged to encode all ornaments (except those explicitly encoded in the Unicode Dingbats blocks, etc.) as alternates for the bullet character (U+2022) to allow authors to select the desired glyph using <feature-value-name>. 

ornaments example

annotation(<feature-value-name>)
    Enables display of alternate annotation forms (font specific, OpenType feature: nalt <feature-index>). 

alternate annotation form example

ruby
    Enables display of ruby glyphs (OpenType feature: ruby). This value only selects a glyph for use in ruby text, it does not affect font scaling. 

The example below uses stylistic sets and swashes for section titles but not for the main title.

h2 { font-variant-alternates: styleset(3,5); }
h2:first-letter { font-variant-alternates: swash(2); }

<h1>Main title</h1>

<h2>Section title</h2>

6.9 Defining font specific alternates: the @font-feature-values rule

Several of the possible values of ‘font-variant-alternates’ listed above are labeled as "font specific". For these features fonts may define not just a single glyph but a set of alternate glyphs with an index to select a given alternate. Since these are font family specific, the @font-feature-values rule is used to define named-values for these indices for a given family.

In the case of the swash Q in the example shown above, the swash could be specified using these style rules:

@font-feature-values Jupiter Sans {
  @swash delicate 1, flowing 2;
}

h2 { font-family: Jupiter Sans, sans-serif; }

/* show the second swash variant in h2 headings */
h2:first-letter { font-variant-alternates: swash(flowing); }

<h2>Quick</h2>

When Jupiter Sans is present, the second alternate swash alternate will be displayed. When not present, no swash character will be shown, since the specific named-value "flowing" is only defined for the Jupiter Sans family. The @-mark indicates the name of the property value for which a named-value can be used. The name "flowing" is chosen by the author.

The syntax of the @font-feature-values rule is defined as:

@font-feature-values <font-family> [, <font-family>]* {
  <font-variant-value-definition>;
  <font-variant-value-definition>;
     .
     .
}

where:

<font-variant-value-definition> = @<font-variant-value> <feature-value-list> [, <feature-value-list>]*

<font-family>                   = font family name, quoted or unquoted, using the same quoting rules that apply within style rules

<font-variant-value>            = the name of one of the font-specific font-variant values (e.g. swash, styleset, annotation)

<feature-value-list>            = <feature-value-name> <feature-index>+

<feature-value-name>            = a user-defined identifier used to describe the index

<feature-index>                 = an integer value greater than 0 specific to a given font or set of fonts

These @font-feature-values rules can appear anywhere within a stylesheet and are exposed bidirectionally across @import boundaries. If multiple @font-feature-values rules are defined for a given family, the resulting values defined are the union of these rules. This allows a set of named-values to be defined for a given font family globally for a site and specific additions made per-page. If the same <feature-value-name> is defined mulitple times for a given font-variant value, the last defined value is used.

site.css:

  @font-feature-values Mercury Serif {
    @styleset stacked-g 3, stacked-a 4; /* "two-storey" versions of g, a */
  }

page.css:
  
  @font-feature-values Mercury Serif {
    @styleset geometric-m 7; /* alternate version of m */
  }
  
  body {
    font-family: Mercury Serif, serif;

    /* enable both the use of stacked g and alternate m */
    font-variant-alternates: styleset(stacked-g, geometric-m);
  }

Only named font families are allowed for <font-family>, rules defined for generic and system fonts must be ignored. However, if a user agent defines a generic font to be a specific named font (e.g. Helvetica), the settings associated with that family name will be used.

For font-variant-value, only font-specific value names supported by the ‘font-variant’ property are recognized, definitions for other value names are a syntax error and ignored. Each value that is font specific is clearly marked as such. Feature value names follow the rules of CSS identifiers and are unique only for a given set of font families and font variant value; the same identifier used with a different font variant value is treated as a distinct value.

Using a commonly named value allows authors to use a single style rule to cover a set of fonts for which the underlying selector is different for each font. If either font in the example below is found, a circled number glyph will be used:

@font-feature-values Taisho Gothic {
  @annotation boxed 1, circled 4;
}

@font-feature-values Otaru Kisa {
  @annotation circled 1, black-boxed 3;
}

h3.title {
  /* circled form defined for both fonts */
  font-family: Taisho Gothic, Otaru Kisa;
  font-variant: annotation(circled);
}

Most font-specific font-variant values take a single value (e.g. swash). If multiple values are assigned to a given name a syntax error occurs and the entire <font-variant-value-definition> is ignored. For the styleset value, multiple values can be assigned to a given name. Multiple values indicate the style sets to be enabled. Values between 1 and 20 enable OpenType features ‘ss01’ through ‘ss20’. Values greater than 20 are ignored.

@font-feature-values Mars Serif {
  @styleset alt-g 1,        /* implies ss01 = 1 */
            curly-quotes 3, /* implies ss03 = 1 */
            code 4 5;       /* implies ss04 = 1, ss05 = 1 */
}

p.codeblock {
  /* implies ss03 = 1, ss04 = 1, ss05 = 1 */
  font-variant-alternates: styleset(curly-quotes, code);
}

For character-variant, a single value between 1 and 99 indicates the enabling of OpenType feature ‘cv01’ through ‘cv99’. Values greater than 99 are ignored. When two values are listed, the first value indicates the feature used and the second the value passed for that feature. Values beyond the first two are ignored.

@font-feature-values MM Greek {
  @character-variant alpha-2 1 2;  /* implies cv01 = 2 */
  @character-variant beta-3 2 3;   /* implies cv02 = 3 */
  @character-variant gamma 12;     /* implies cv12 = 1 */
  @character-variant zeta 20 3 2;  /* implies cv20 = 3, '2' is ignored */
  @character-variant silly 105;    /* >99, ignored */
  @character-variant dumb 323 3;   /* >99, ignored */
}

#title {
  /* use the third alternate beta, first alternate gamma */
  font-variant-alternates: character-variant(beta-3, gamma);
}

Matching text on Byzantine seals using character variants

Byzantine seal text displayed with character variants

In the figure above, the text in red is rendered using a font containing character variants that mimic the character forms found on a Byzantine seal from the 8th century A.D. Two lines below is the same text displayed in a font without variants. Note the two variants for U and N used on the seal.

@font-feature-values Athena Ruby {
  @character-variant
    leo-B 2 1, leo-M 13 3, 
    leo-alt-N 14 1, leo-N 14 2,
    leo-T 20 1, 
    leo-U 21 2, leo-alt-U 21 4;
}

p {
  font-variant: additional-ligatures, character-variant(leo-B, leo-M, leo-N, leo-T, leo-U);
}

span.alt-N { 
  font-variant-alternates: character-variant(leo-alt-N);
}

span.alt-U {
  font-variant-alternates: character-variant(leo-alt-U);
}

<p>ENO....UP͞RSTU<span class="alt-U">U</span>͞<span class="alt-U">U</span>ΚΑΙTỤẠG̣IUPNS</p>

<p>LEON|ΚΑΙCONSTA|NTI<span class="alt-N">N</span>OS..|STOIBAṢ.|LIṢROM|AIO<span class="alt-N">N</span></p> 

6.10 East Asian text rendering: the font-variant-east-asian property
Name: 	font-variant-east-asian
Value: 	normal | inherit | [ <east-asian-variant-values> || <east-asian-width-values> ]
Initial: 	normal
Applies to: 	all elements
Inherited: 	yes
Percentages: 	N/A
Media: 	visual
Computed value: 	as specified

Allows control of glyph substitute and positioning in East Asian text. In cases where multiple alternates are possible, an integer is included to indicate the index of the alternate to be used. Omitting the integer indicates the first alternate.

<east-asian-variant-values> = [ hojo-kanji | jis78 | jis83 | jis90 | jis04 | nlckanji 
                                | simplified | traditional ]

<east-asian-width-values>   = [ full-width | proportional-width ]

Individual values have the following meanings:

hojo-kanji
    Enables rendering of Hojo Kanji forms (OpenType feature: hojo). 
jis78
    Enables rendering of JIS78 forms (OpenType feature: jp78). 

JIS78 form example

jis83
    Enables rendering of JIS83 forms (OpenType feature: jp83). 
jis90
    Enables rendering of JIS90 forms (OpenType feature: jp90). 
jis04
    Enables rendering of JIS2004 forms (OpenType feature: jp04). 
nlckanji
    Enables rendering of NLC Kanji forms (OpenType feature: nlck). 
simplified
    Enables rendering of simplified forms (OpenType feature: smpl). 
traditional
    Enables rendering of traditional forms (OpenType feature: trad). 

tradtional form example

full-width
    Enables rendering of full-width variants (OpenType feature: fwid). 
proportional-width
    Enables rendering of proportionally-spaced variants (OpenType feature: pwid). 

proportionally spaced Japanese example
6.11 Overall shorthand for font rendering: the font-variant property
Name: 	font-variant
Value: 	normal | inherit | [ <common-lig-values> || <additional-lig-values> || <historical-lig-values> || <contextual-alt-values> || stylistic[(<integer>)]? || historical-forms || styleset(<integer> [,<integer>]*) || character-variant(<integer> [,<integer>]*) || swash[(<integer>)]? || ornament[(<integer>)]? || annotation[(<integer>)]? || ruby || <caps-value> || <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || slashed-zero || <east-asian-variant-values> || <east-asian-width-values> ]
Initial: 	normal
Applies to: 	all elements
Inherited: 	yes
Percentages: 	N/A
Media: 	visual
Computed value: 	as specified

The value ‘normal’ resets all other font feature properties to normal and font defaults are used when rendering text. Like other shorthands, using ‘font-variant’ resets all font feature properties to their initial values. It does not reset the values of either ‘font-language-override’ or ‘font-feature-settings’.
6.12 Low-level font feature settings control: the font-feature-settings property
Name: 	font-feature-settings
Value: 	normal | <feature-tag-value> [, <feature-tag-value>]*
Initial: 	normal
Applies to: 	all elements
Inherited: 	yes
Percentages: 	N/A
Media: 	visual
Computed value: 	as specified

This property provides low-level control over OpenType font features. It is intended as a way of providing access to font features that are not widely used but are needed for a particular use case. A value of ‘normal’ means that no change in glyph selection or positioning occurs due to this property.

/* enable small caps and use second swash alternate */
font-feature-settings: "smcp", "swsh" 2;

Feature tag values have the following syntax:

<feature-tag-value> = <string> [ <integer> | on | off ]?

The <string> is a case-sensitive OpenType feature tag. For it to match an OpenType feature contained in a font, it must follow the syntax rules for tags. As specified in the OpenType specification, feature tags contain four characters. Tag strings longer than four characters must be ignored, user agents must not use a feature tag created by truncating the string to four characters. Feature tags need only match a feature tag defined in the font, they are not limited to explicitly registered OpenType features. Fonts defining custom feature tags should follow the tag name rules defined in the OpenType specification [OPENTYPE-FEATURES]. Feature tags not present in the font are ignored; a user agent must not attempt to synthesize fallback behavior based on these feature tags.

If present, a value indicates an index used for glyph selection. An <integer> value must be 0 or greater. A value of 0 indicates that the feature is disabled. For boolean features, a value of 1 enables the feature. For non-boolean features, a value of 1 or greater enables the feature and indicates the feature selection index. A value of ‘on’ is synonymous with 1 and ‘off’ is synonymous with 0. If the value is omitted, a value of 1 is assumed.

font-feature-settings: "dlig" 1;       /* dlig=1 enable discretionary ligatures */
font-feature-settings: "smcp" on;      /* smcp=1 enable small caps */
font-feature-settings: 'c2sc';         /* c2sc=1 enable caps to small caps */
font-feature-settings: "liga" off;     /* liga=0 no common ligatures */
font-feature-settings: "tnum", 'hist'; /* tnum=1, hist=1 enable tabular numbers and historical forms */
font-feature-settings: "palin" off;    /* good idea but invalid tagname, ignored */
font-feature-settings: "PKRN";         /* PKRN=1 enable custom feature */

Authors should generally use ‘font-variant’ and its related subproperties whenever possible and only use this property for special cases where its use is the only way of accessing a particular infrequently used font feature.

Although specifically defined for OpenType feature tags, feature tags for other modern font formats that support font features may be added in the future.

While the use of quotes distinguishes feature tags as defined in an external resource, they still seem a bit clumsy.

The Japanese text below will be rendered with half-width kana characters:

body { font-feature-settings: "hwid"; /* Half-width OpenType feature */ }

<p>毎日カレー食べてるのに、飽きない</p>

6.13 Font language override: the font-language-override property
Name: 	font-language-override
Value: 	normal | inherit | <string>
Initial: 	normal
Applies to: 	all elements
Inherited: 	yes
Percentages: 	N/A
Media: 	visual
Computed value: 	as specified

The value of ‘normal’ implies that when rendering with OpenType fonts the language of the document is used to infer the OpenType language system, used to select language specific features when rendering. The value of the <string> is a single three-letter OpenType language system tag, defined in the layout tag registry of the OpenType specification.

The Universal Declaration of Human Rights has been translated into a wide variety of languages. In Turkish, Article 9 of this document might be marked up as below:

<body lang="tr">

<h4>Madde 9</h4>
<p>Hiç kimse keyfi olarak tutuklanamaz, alıkonulanamaz veya sürülemez.</p>

Here the user agent uses the value of the ‘lang’ attribute when rendering text and appropriately renders this text without ‘fi’ ligatures. There is no need to use the ‘font-language-override’ property.

However, a given font may lack support for a specific language. In this situation authors may need to use the typographic conventions of a related language that are supported by that font:

<body lang="mk">     <!-- Macedonian lang code -->

body { font-language-override: "SRB"; /* Serbian OpenType language tag */ }

<h4>Члeн 9</h4>
<p>Никoj чoвeк нeмa дa бидe пoдлoжeн нa прoизвoлнo aпсeњe, притвoр или прoгoнувaњe.</p>

The Macedonian text here will be rendered using Serbian typographic conventions, with the assumption that the font specified supports Serbian.
7 Resolving font feature settings

General and font-specific font feature property settings are resolved in the order below, in low to high precedence. These are used to construct an explicit list of font features to be enabled or disabled which is applied on top of layout engine defaults. When the resolved list includes two mutually exclusive feature settings, the setting later in the list is used.

    If the font is defined via an @font-face rule, the font features implied by the font-variant descriptor in the @font-face rule.
    If the font is defined via an @font-face rule, the font features implied by the font-feature-settings descriptor in the @font-face rule.
    Font features implied by the value of the ‘font-variant’ property, the related font-variant subproperties and any other CSS property that may use OpenType features (e.g. the ‘font-kerning’ property).
    Font features implied by the value of ‘font-feature-settings’ property. 

Note that this order means that general property settings can be used to override font-specific settings in @font-face rules and the low-level font feature settings can override ‘font-variant’ property settings.

For situations where the combined list of font feature settings contains two mutually exclusive feature settings, values occurring later in the order listed above take precedence. This order only affects the cumulative list of feature settings used for rendering text. When a font lacks support for a given underlying font feature, text is simply rendered as if that font feature was not enabled; font fallback does not occur.

With the styles below, numbers are rendered proportionally when used within a paragraph but are shown in tabular form within tables of prices:

body { 
  font-variant-numeric: proportional-nums; 
}

table.prices td {
  font-variant-numeric: tabular-nums; 
}

When the font-variant descriptor is used within an @font-face rule, it only applies to the font defined by that rule.

@font-face {
  font-family: MainText;
  src: url(http://example.com/font.ttf);
  font-variant: oldstyle-nums proportional-nums styleset(1,3);
}

body {
  font-family: MainText, Helvetica;
}

table.prices td {
  font-variant-numeric: tabular-nums; 
}

In this case, old-style numerals will be used throughout but only where the font "MainText" is used. Just as in the previous example, tabular values will be used in price tables since ‘tabular-nums’ appears in a general style rule and its use is mutually exclusive with ‘proportional-nums’. Stylistic alternate sets will only be used where MainText is used.

The @font-face rule can also be used to access font features in locally available fonts via the use of local() in the ‘src’ descriptor of the @font-face definition:

@font-face {
  font-family: BodyText;
  src: local("HiraMaruPro-W4");
  font-variant: proportional-width;
  font-feature-settings: "ital"; /* Latin italics within CJK text feature */
}

body { font-family: BodyText, serif; }

If available, a Japanese font "Hiragino Maru Gothic" will be used. When text rendering occurs, Japanese kana will be proportionally spaced and Latin text will be italicised. Text rendered with the fallback serif font will use default rendering properties.

In the example below, additional ligatures are enabled only for a downloadable font but are disabled within spans of class "special":

@font-face {
  font-family: main;
  src: url(fonts/ffmeta.woff) format("woff");
  font-variant: additional-ligatures;
}

body         { font-family: main, Helvetica; }
span.special { font-variant-ligatures: no-additional-ligatures; }

Adding an additional style rule with the @font-face above:

body         { font-family: main, Helvetica; }
span         { font-feature-settings: "dlig"; }
span.special { font-variant-ligatures: no-additional-ligatures; }

Within spans of class "special", additional ligatures will be rendered. This is because both the ‘font-feature-settings’ and ‘font-variant-ligatures’ properties apply to these spans. Although the ‘no-additional ligatures’ setting of ‘font-variant-ligatures’ effectively disables the OpenType dlig feature, because the ‘font-feature-settings’ is resolved after that, the ‘dlig’ value reenables additional ligatures.
Appendix A: Same-origin restriction for fonts

This appendix is normative.

Some user agents implement a same-origin restriction when loading font resources. This section defines the meaning of that restriction.

A same-origin restriction limits the loading of fonts for a given document to fonts loaded from the same origin. This means that fonts can only be loaded via the same host, port, and method combination as the containing document, using the same origin matching algorithm described in the [HTML5] specification. The origin of the stylesheet containing @font-face rules is not used when deciding whether a font is same origin or not, only the origin of the containing document is used.

Given a document located at http://example.com/page.html, fonts defined with ‘src’ definitions considered cross origin must not be loaded:

/* same origin (i.e. domain, protocol, port match document) */
src: url(fonts/simple.ttf);                     
src: url(//fonts/simple.ttf);                     

/* cross origin, different protocol */
src: url(https://example.com/fonts/simple.ttf);              

/* cross origin, different domain */
src: url(http://another.example.com/fonts/simple.ttf); 

If a user agent implements a same-origin restriction for fonts loaded via @font-face rules it must implement that restriction for all font types, rather than for a subset of possible types. It must also implement the ability to relax this restriction using cross-site origin controls [CORS]. Sites can explicitly allow cross-site downloading of font data using the Access-Control-Allow-Origin HTTP header.

Some implementers feel a same-origin restriction should be the default for all new resource types while others feel strongly that an opt-in strategy usuable for all resource types would be a better mechanism and that the default should always be to allow cross-origin linking for consistency with existing resource types (e.g. script, images). As such, this section should be considered at risk for removal if the consensus is to use an alternative mechanism.
Appendix B: Mapping platform font properties to CSS properties

This appendix is included as background for some of the problems and situations that are described in other sections. It should be viewed as informative only.

Font properties in CSS are designed to be independent of the underlying font formats used; they can be used to specify bitmap fonts, Type1 fonts, SVG fonts in addition to the common TrueType and OpenType fonts. But there are facets of the TrueType and OpenType formats that often cause confusion for authors and present challenges to implementers on different platforms.

Originally developed at Apple, TrueType was designed as an outline font format for both screen and print. Microsoft joined Apple in developing the TrueType format and both platforms have supported TrueType fonts since then. Font data in the TrueType format consists of a set of tables distinguished with common four-letter tag names, each containing a specific type of data. For example, naming information, including copyright and license information, is stored in the ‘name’ table. The character map (‘cmap’) table contains a mapping of character encodings to glyphs. Apple later added additional tables for supporting enhanced typographic functionality; these are now called Apple Advanced Typography, or AAT, fonts. Microsoft and Adobe developed a separate set of tables for advanced typography and called their format OpenType [OPENTYPE].

In many cases the font data used under Microsoft Windows or Linux is slightly different from the data used under Apple's Mac OS X because the TrueType format allowed for variation across platforms. This includes font metrics, names and character map data.

Font family names for TrueType and OpenType fonts are contained in the ‘name’ table, in name records with name ID 1. Mulitple names can be stored for different locales but Microsoft recommends fonts always include at least a US English version of the name. On Windows, the family name can only be used for a maximum of four faces; for larger groupings the "preferred family" (name ID 16) or "WWS family" (name ID 21) can be used. The full font name (name ID 4) and the Postscript name (name ID 6) describe a single face uniquely. The bold face of the Gill Sans family has a fullname of "Gill Sans Bold" and a Postscript name of "GillSans-Bold". There can be multiple localized versions of the fullname for a given face but the Postscript name is always a unique name made from a limited set of ASCII characters.

On various platforms, different names are used to search for a font. For example, with the Windows GDI CreateIndirectFont API, either a family or fullname can be used to lookup a face while on Mac OS X the ATSFontFindFromName and ATSFontFindFromPostScriptName API calls are used to lookup a given face using the fullname and Postscript name. Under Linux, the fontconfig API allows fonts to be searched using any of these names. In situations where platform API's automatically substitute other font choices, it may be necessary to verify a returned font matches a given name.

The weight of a given face can be determined via the usWeightClass field of the OS/2 table or inferred from the style name (name ID 2). Likewise, the width can be determined via the usWidthClass of the OS/2 table or inferred from the style name. For historical reasons, font designers have sometimes skewed values in the OS/2 table to work around problems in the Windows GDI API.

Rendering complex scripts that use contextual shaping such as Thai, Arabic and Devanagari requires features present only in OpenType or AAT fonts. Currently, complex script rendering is supported on Windows and Linux using OpenType font features while AAT font features are used under Mac OS X. Apple has indicated it intends to support complex script rendering using OpenType font features in the future.

Need to define normatively how WWS names are handled across platforms.
Appendix C: Font licensing issues

This appendix is informative only.

The use of fonts on the web is often surrounded in controversy. Font designers expend huge amounts of effort to create their designs, painstakingly refining letterforms and tuning font data to assure that the letterforms appear as desired both in print and on the screen. As a result they often license their fonts very carefully, often with somewhat complex terms. Authors who want to use specific fonts via a downloadable font mechanism must always carefully verify that their intended use is within the scope of the font license. Many commercial fonts presently do not allow web downloading of their fonts in any form. Font formats often store references to the font license within the font data itself. When in doubt, it is best to verify with the font designer directly. Vendors that bundle fonts with their products are also strongly encouraged to carefully explain the license details that covers the fonts they bundle.

An author would like to use Gotham, a font designed by Hoefler & Frere-Jones, as a downloadable font for their webpages. But the end-user license agreement that covers Gotham specifically notes that usage via @font-face rules in CSS style sheets is not allowed. The author cannot link to this font in their web pages.

An author wants to use Gentium, a font developed by SIL International. This font is licensed under the terms of the Open Font License, so as long as the author follows the relatively liberal terms of this license, they can use Gentium as a downloadable font for their web pages.
Changes
Changes from the June 2009 CSS3 Fonts Working Draft

Major changes include:

    Revised definition of permissible unquoted font family names to match latest CSS 2.1 draft
    Added font-kerning property
    Added extensions to font-variant property for supporting OpenType font features
    Added @font-feature-values rule for defining font-specific variant selectors
    Added font-language-override property
    Added font-feature-settings property for access to low-level OpenType features
    Revised font matching algorithm
    Added font-synthesis property

Acknowledgments

I'd like to thank Tal Leming, Jonathan Kew and Christopher Slye for all their help and feedback. John Hudson was kind enough to take the time to explain the subtleties of OpenType language tags and provided the example of character variant usage for displaying text on Byzantine seals. Ken Lunde and Eric Muller provided valuable feedback on CJK OpenType features and Unicode variation selectors. The idea for supporting font features by using font-variant subproperties originated with Håkon Wium Lie, Adam Twardoch and Tal Leming. Thanks also to House Industries for allowing the use of Ed Interlock in the discretionary ligatures example.

A special thanks to Robert Bringhurst for the sublime mind expansion that is The Elements of Typographic Style.
References
Normative References

[AAT-FEATURES]
    Apple Advanced Typography font feature registry. Apple. URL: http://developer.apple.com/fonts/registry/ 
[CHARMOD]
    Martin J. Dürst; et al. Character Model for the World Wide Web 1.0: Fundamentals. 15 February 2005. W3C Recommendation. URL: http://www.w3.org/TR/2005/REC-charmod-20050215 
[CHARMOD-NORM]
    François Yergeau; et al. Character Model for the World Wide Web 1.0: Normalization. 27 October 2005. W3C Working Draft. (Work in progress.) URL: http://www.w3.org/TR/2005/WD-charmod-norm-20051027 
[CORS]
    Anne van Kesteren. Cross-Origin Resource Sharing. 27 July 2010. W3C Working Draft. (Work in progress.) URL: http://www.w3.org/TR/2010/WD-cors-20100727/ 
[HTML5]
    Ian Hickson. HTML5. 13 January 2011. W3C Working Draft. (Work in progress.) URL: http://www.w3.org/TR/2011/WD-html5-20110113 
[OPEN-FONT-FORMAT]
    Information technology — Coding of audio-visual objects — Part 22: Open Font Format. International Organization for Standardization. ISO/IEC 14496-22:2009. URL: http://standards.iso.org/ittf/PubliclyAvailableStandards/c052136_ISO_IEC_14496-22_2009(E).zip 
[OPENTYPE]
    OpenType specification. Microsoft. URL: http://www.microsoft.com/typography/otspec/default.htm 
[OPENTYPE-FEATURES]
    OpenType feature registry. Microsoft. URL: http://www.microsoft.com/typography/otspec/featurelist.htm 
[UAX15]
    Mark Davis. Unicode Normalization Forms. 17 September 2010. Unicode Standard Annex #15. URL: http://www.unicode.org/reports/tr15/tr15-33.html 
[UAX29]
    Mark Davis. Unicode Text Segmentation. 8 October 2010. Unicode Standard Annex #29. URL: http://www.unicode.org/reports/tr29/tr29-17.html 
[UNICODE5]
    The Unicode Consortium. The Unicode Standard, Version 5.1.0. Addison-Wesley. 2007. ISBN 0-321-48091-0. URL: http://www.unicode.org/versions/Unicode5.1.0/ 

Other References

[ARABIC-TYPO]
    Huda Smitshuijzen AbiFares. Arabic Typography: A Comprehensive Sourcebook. Saqi Books. 2001. ISBN 0-86356-347-3.
[CJKV-INFO-PROCESSING]
    Ken Lunde. CJKV Information Processing, Second Edition. O'Reilly Media, Inc. 2009. ISBN 0-596-51447-1.
[DIGITAL-TYPOGRAPHY]
    Richard Rubinstein. Digital Typography, An Introduction to Type and Composition for Computer System Design. Addison-Wesley. 1988. ISBN 0-201-17633-5.
[ELEMTYPO]
    Robert Bringhurst. The Elements of Typographic Style, Version 3.1. Hartley & Marks. 2005. ISBN 0-88179-206-3.
[LANGCULTTYPE]
    John D. Berry, Ed. Language Culture Type. Graphis. 2001. ISBN 1-932026-01-0.
[OPENTYPE-FONT-GUIDE]
    OpenType User Guide. FontShop International. URL: http://www.fontfont.com/opentype/FF_OT_UserGuide_v2.pdf 
[RASTER-TRAGEDY]
    Beat Stamm. The Raster Tragedy at Low-Resolution Revisited. 14 March 2011. URL: http://www.rastertragedy.com/
[WINDOWS-GLYPH-PROC]
    John Hudson. Windows Glyph Processing. Microsoft Typogrraphy. URL: http://www.microsoft.com/typography/developers/opentype/default.htm 

Index

    <absolute-size>
        definition of, 3.5 
    <additional-lig-values>, 6.5
    <caps-value>, 6.6
    <common-lig-values>, 6.5
    <contextual-alt-values>, 6.8
    <east-asian-variant-values>, 6.10
    <east-asian-width-values>, 6.10
    <feature-index>, 6.9
    <feature-tag-value>, 6.12
    <feature-value-list>, 6.9
    <feature-value-name>, 6.9
    <font-description>
        definition of, 4.1 
    <font-face-name>
        definition of, 4.3 
    <font-family>, 6.9
    <font-variant-css21>, 3.7
    <font-variant-value-definition>, 6.9
    <font-variant-value>, 6.9
    <historical-lig-values>, 6.5
    <length>, 3.5
    <number>, 3.6
    <numeric-figure-values>, 6.7
    <numeric-fraction-values>, 6.7
    <numeric-spacing-values>, 6.7
    <percentage>, 3.5
    <relative-size>
        definition of, 3.5 
    <urange>
        definition of, 4.5 
    @font-face, 4.1, 4.1, 4.3
    additional-ligatures, 6.5
    all-petite-caps, 6.6
    all-small-caps, 6.6
    annotation(<feature-value-name>), 6.8
    aspect value, 3.6
    at-rules, 4.1
    character-variant(<feature-value-name> [,<feature-value-name>]*), 6.8
    common-ligatures, 6.5
    contextual, 6.8
    cursive, definition of, #
    diagonal-fractions, 6.7
    fantasy, definition of, #
    font, 3.7
    font-family, 4.2, 3.1
    font-feature-settings, 4.6, 6.12
    font-kerning, 6.3
    font-language-override, 6.13
    font-size, 3.5
    font-size-adjust, 3.6
    font-stretch, 4.4, 3.3
    font-style, 4.4, 3.4
    font-synthesis, 3.8
    font-variant, 4.6, 6.11
    font-variant-alternates, 6.8
    font-variant-caps, 6.6
    font-variant-east-asian, 6.10
    font-variant-ligatures, 6.5
    font-variant-numeric, 6.7
    font-weight, 4.4, 3.2
    full-width, 6.10
    historical-forms, 6.8
    historical-ligatures, 6.5
    hojo-kanji, 6.10
    jis04, 6.10
    jis78, 6.10
    jis83, 6.10
    jis90, 6.10
    lining-nums, 6.7
    monospace, definition of, #
    nlckanji, 6.10
    no-additional-ligatures, 6.5
    no-common-ligatures, 6.5
    no-contextual, 6.8
    no-historical-ligatures, 6.5
    oldstyle-nums, 6.7
    ornaments(<feature-value-name>), 6.8
    petite-caps, 6.6
    proportional-nums, 6.7
    proportional-width, 6.10
    ruby, 6.8
    sans-serif, definition of, #
    serif, definition of, #
    simplified, 6.10
    slashed-zero, 6.7
    small-caps, 6.6
    src, 4.3
    stacked-fractions, 6.7
    styleset(<feature-value-name> [,<feature-value-name>]*), 6.8
    stylistic(<feature-value-name>), 6.8
    swash(<feature-value-name>), 6.8
    tabular-nums, 6.7
    titling-caps, 6.6
    traditional, 6.10
    unicase, 6.6
    unicode-range, 4.5
    vertical-position, 6.4 

Property index
Property 	Values 	Initial 	Applies to 	Inh. 	Percentages 	Media
font 	[ [ <‘font-style’> || <font-variant-css21> || <‘font-weight’> ]? <‘font-size’> [ / <‘line-height’> ]? <‘font-family’> ] | caption | icon | menu | message-box | small-caption | status-bar | inherit 	see individual properties 	all elements 	yes 	see individual properties 	visual
font-family 	[[ <family-name> | <generic-family> ] [, <family-name> | <generic-family>]* ] | inherit 	depends on user agent 	all elements 	yes 	N/A 	visual
font-feature-settings 	normal | <feature-tag-value> [, <feature-tag-value>]* 	normal 	all elements 	yes 	N/A 	visual
font-kerning 	auto | normal | none 	auto 	all elements 	yes 	N/A 	visual
font-language-override 	normal | inherit | <string> 	normal 	all elements 	yes 	N/A 	visual
font-size 	<absolute-size> | <relative-size> | <length> | <percentage> | inherit 	medium 	all elements 	yes 	refer to parent element's font size 	visual
font-size-adjust 	<number> | none | inherit 	none 	all elements 	yes 	N/A 	visual
font-stretch 	normal | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded | inherit 	normal 	all elements 	yes 	N/A 	visual
font-style 	normal | italic | oblique | inherit 	normal 	all elements 	yes 	N/A 	visual
font-synthesis 	none | [ weight || style ] 	weight style 	all elements 	yes 	N/A 	visual
font-variant 	normal | inherit | [ <common-lig-values> || <additional-lig-values> || <historical-lig-values> || <contextual-alt-values> || stylistic[(<integer>)]? || historical-forms || styleset(<integer> [,<integer>]*) || character-variant(<integer> [,<integer>]*) || swash[(<integer>)]? || ornament[(<integer>)]? || annotation[(<integer>)]? || ruby || <caps-value> || <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || slashed-zero || <east-asian-variant-values> || <east-asian-width-values> ] 	normal 	all elements 	yes 	N/A 	visual
font-variant-alternates 	normal | inherit | [ <contextual-alt-values> || stylistic(<feature-value-name>) || historical-forms || styleset(<feature-value-name> [, <feature-value-name>]*) || character-variant(<feature-value-name> [,<feature-value-name>]*) || swash(<feature-value-name>) || ornament(<feature-value-name>) || annotation(<feature-value-name>) || ruby ] 	normal 	all elements 	yes 	N/A 	visual
font-variant-caps 	normal | inherit | <caps-value> 	normal 	all elements 	yes 	N/A 	visual
font-variant-east-asian 	normal | inherit | [ <east-asian-variant-values> || <east-asian-width-values> ] 	normal 	all elements 	yes 	N/A 	visual
font-variant-ligatures 	normal | inherit | [ <common-lig-values> || <additional-lig-values> || <historical-lig-values> ] 	normal 	all elements 	yes 	N/A 	visual
font-variant-numeric 	normal | inherit | [ <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || slashed-zero ] 	normal 	all elements 	yes 	N/A 	visual
font-weight 	normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | inherit 	normal 	all elements 	yes 	N/A 	visual
vertical-position 	normal | subscript | superscript | ordinal 	normal 	all elements 	yes 	N/A 	visual

******************************************************************************/