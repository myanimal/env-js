QUnit.module('DOM Level 1');
/******************************************************************************
http://www.w3.org/TR/REC-DOM-Level-1

1. Document Object Model Core

Editors 
    Mike Champion, ArborText (from November 20, 1997)
    Steve Byrne, JavaSoft (until November 19, 1997)
    Gavin Nicol, Inso EPS
    Lauren Wood, SoftQuad, Inc.

Table of contents

    * 1.1. Overview of the DOM Core Interfaces
          o 1.1.1. The DOM Structure Model
          o 1.1.2. Memory Management
          o 1.1.3. Naming Conventions
          o 1.1.4. Inheritance vs. Flattened Views of the API
          o 1.1.5. The DOMString type
          o 1.1.6. String comparisons in the DOM 
    * 1.2. Fundamental Interfaces
          o DOMException, ExceptionCode, DOMImplementation, DocumentFragment, 
            Document, Node, NodeList, NamedNodeMap, CharacterData, Attr, 
            Element, Text, Comment
    * 1.3. Extended Interfaces
          o CDATASection, DocumentType, Notation, Entity, EntityReference, 
            ProcessingInstruction

******************************************************************************/
test('1. Document Object Model Core', function(){
    ok(true, 'http://www.w3.org/TR/REC-DOM-Level-1');
});
/******************************************************************************
            
1.1. Overview of the DOM Core Interfaces

This section defines a set of objects and interfaces for accessing and 
manipulating document objects. The functionality specified in this section 
(the Core functionality) is sufficient to allow software developers and web 
script authors to access and manipulate parsed HTML and XML content inside 
conforming products. The DOM Core API also allows creation and population of a 
Document object using only DOM API calls; loading a Document and saving it 
persistently is left to the product that implements the DOM API.

******************************************************************************/
test('1.1. Overview of the DOM Core Interfaces', function(){
    expect(18);
    ok(DOMException,            'DOMException defined');
    ok(DOMImplementation,       'DOMImplementation defined');
    ok(DocumentFragment,        'DocumentFragment defined');
    ok(Document,                'Document defined');
    ok(Node,                    'Node defined');
    ok(NodeList,                'NodeList defined');
    ok(NamedNodeMap,            'NamedNodeMap defined');
    ok(CharacterData,           'CharacterData defined');
    ok(Attr,                    'Attr defined');
    ok(Element,                 'Element defined');
    ok(Text,                    'Text defined');
    ok(Comment,                 'Comment defined');
    ok(CDATASection,            'CDATASection defined');
    ok(DocumentType,            'DocumentType defined');
    ok(Notation,                'Notation defined');
    ok(Entity,                  'Entity defined');
    ok(EntityReference,         'EntityReference defined');
    ok(ProcessingInstruction,   'ProcessingInstruction defined');
});
/******************************************************************************

1.1.1. The DOM Structure Model

The DOM presents documents as a hierarchy of Node objects that also implement 
other, more specialized interfaces. Some types of nodes may have child nodes of 
various types, and others are leaf nodes that cannot have anything below them 
in the document structure. For XML and HTML, the node types, and which node 
types they may have as children, are as follows:

    * Document -- Element (maximum of one), ProcessingInstruction, Comment, 
        DocumentType (maximum of one)
    * DocumentFragment -- Element, ProcessingInstruction, Comment, Text, 
        CDATASection, EntityReference
    * DocumentType -- no children
    * EntityReference -- Element, ProcessingInstruction, Comment, Text, 
        CDATASection, EntityReference
    * Element -- Element, Text, Comment, ProcessingInstruction, CDATASection, 
        EntityReference
    * Attr -- Text, EntityReference
    * ProcessingInstruction -- no children
    * Comment -- no children
    * Text -- no children
    * CDATASection -- no children
    * Entity -- Element, ProcessingInstruction, Comment, Text, CDATASection, 
        EntityReference
    * Notation -- no children

The DOM also specifies a NodeList interface to handle ordered lists of Nodes, 
such as the children of a Node, or the elements returned by the 
getElementsByTagName method of the Element interface, and also a NamedNodeMap 
interface to handle unordered sets of nodes referenced by their name attribute, 
such as the attributes of an Element. NodeList and NamedNodeMap objects in the 
DOM are live; that is, changes to the underlying document structure are 
reflected in all relevant NodeList and NamedNodeMap objects. For example, if a 
DOM user gets a NodeList object containing the children of an Element, then 
subsequently adds more children to that element (or removes children, or 
modifies them), those changes are automatically reflected in the NodeList, 
without further action on the user's part. Likewise, changes to a Node in the 
tree are reflected in all references to that Node in NodeList and NamedNodeMap 
objects.

Finally, the interfaces Text, Comment, and CDATASection all inherit from the 
CharacterData interface.

******************************************************************************/
test('1.1.1. The DOM Structure Model', function(){
    
    var doc1,
        doc2,
        doctype1,
        doctype2,
        fragment1,
        fragment2,
        entityReference1,
        entityReference2,
        element1,
        element2,
        attr1,
        attr2,
        pi1,
        pi2,
        comment1,
        comment2,
        text1,
        text2,
        cdata1,
        cdata2,
        entity1,
        entity2,
        notation1,
        notation2,
        HIERARCHY_REQUEST_ERR_MSG = 
            "Node cannot be inserted at the specified point in the hierarchy",
        WRONG_DOCUMENT_ERR_MSG = 
            "Node cannot be inserted at the specified point in the hierarchy",
        TEST;
    
    function reset(){
        doctype1 = document.implementation.createDocumentType('xyz', null, 
            "-//WTF//DTD XYZ 5 Final//EN");
        doctype2 = document.implementation.createDocumentType('xyzxyz', null, 
            "-//WTF//DTD XYZXYZ 5 Final//EN");
        doc1 = document.implementation.createDocument(null, 'abc', doctype1);
        doc2 = document.implementation.createDocument(null, 'abcabc', null);
        fragment1 = doc1.createDocumentFragment();
        fragment2 = doc1.createDocumentFragment();
        entityReference1 = doc1.createEntityReference('nbsg');
        entityReference2 = doc1.createEntityReference('nbsgnbsg');
        element1 = doc1.createElement('def');
        element2 = doc1.createElement('defdef');
        attr1 = doc1.createAttribute('pqr');
        attr2 = doc1.createAttribute('pqrpqr');
        pi1 = doc1.createProcessingInstruction('ghi', 'jkl=mno');
        pi2 = doc1.createProcessingInstruction('ghighi', 'jkljkl=mnomno');
        comment1 = doc1.createComment('this is a pig. oink, oink');
        comment2 = doc1.createComment('this is a cow. moo, moo');
        text1 = doc1.createTextNode('abcdefghi');
        text2 = doc1.createTextNode('jklmnopqr');
        cdata1 = doc1.createCDATASection('stuv');
        cdata2 = doc1.createCDATASection('wxyz');
        entity1 = null; //can't test these until dom2 or maybe use domparser?
        entity2 = null; //can't test these until dom2 or maybe use domparser?
        notation1 = null; //can't test these until dom2 or maybe use domparser?
        notation2 = null; //can't test these until dom2 or maybe use domparser?
    }
    
    /************************
     * Document
     ***********************/  
    reset();
    
    TEST = "Document cant be appended to another Document";
    try{
        doc1.appendChild(doc2);
        ok( false, TEST +":"+ WRONG_DOCUMENT_ERR_MSG);
    }catch(e){
        ok( e.code == DOMException.WRONG_DOCUMENT_ERR || //Webkit
            e.code == DOMException.HIERARCHY_REQUEST_ERR, //Mozilla
            TEST);
    }
                
    TEST = "Document cant be appended to self";
    try{
        doc1.appendChild(doc1);
        ok( false, TEST +":"+ HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = 'Empty DocumentFragment can be appended to Document.';
    ok(doc1.appendChild(fragment1), TEST);
    fragment2.appendChild(element2);
    
    TEST = "DocumentFragment cannot be appended to Document";
    try{
        doc1.appendChild(fragment2);
        ok( false, TEST+':'+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "DocumentType can only be appended once to Document";
    try{
        doc1.appendChild(doctype2);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Elements can only be appended once to Documentt";
    try{
        doc1.appendChild(element1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }    
    
    TEST = "(XML)Document may have one or more ProcessingInstruction";
    ok(doc1.appendChild(pi1), TEST);
    ok(doc1.appendChild(pi2), TEST);
    
    TEST = "Comments can be appended to Document";
    ok(doc1.appendChild(comment1), TEST);
    ok(doc1.appendChild(comment2), TEST);
    
    TEST = "Attr can be appended to Document";
    try{
        doc1.appendChild(attr1);
        ok(false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals(e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Text Nodes may or may not be appended to Document";
    try{
        doc1.appendChild(text1);
        //Webkit is ok with this
        ok(true, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        //Mozilla follows the dom spec here more closely
        equals(e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "CDATA may or may not be appended to Document";
    try{
        doc1.appendChild(cdata1);
        //Webkit is ok with this
        ok(true, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        //Mozilla follows the dom spec here more closely
        equals(e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Entity may not be appended to Document";
    ok(true, 'TODO:'+TEST);
    
    TEST = "Notations may not be appended to Document";
    ok(true, 'TODO:'+TEST);

    /************************
     * DocumentFragment
     ***********************/
    reset(); 
    
    TEST = "Another Document cant be appended to a DocumentFragment";
    try{
        fragment1.appendChild(doc2);
        ok(false, TEST+":"+WRONG_DOCUMENT_ERR_MSG);
    }catch(e){
        ok( e.code == DOMException.WRONG_DOCUMENT_ERR || //Webkit
            e.code == DOMException.HIERARCHY_REQUEST_ERR, //Mozilla
            TEST);
    }
    
    TEST = "Document cant be appended to a DocumentFragment";
    try{
        fragment1.appendChild(doc1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "An empty DocumentFragment can be appended to a DocumentFragment";
    ok(fragment1.appendChild(fragment2), TEST);  
    
    TEST = "A nonempty DocumentFragment may be appended to a DocumentFragment";  
    fragment2.appendChild(element2);
    ok( fragment1.appendChild(fragment2), TEST);
    
    TEST = "DocumentType may not be appended to DocumentFragment";
    try{
        fragment1.appendChild(doctype2);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    
    TEST = "Element can be appended to DocumentFragment";
    ok(fragment1.appendChild(element1), TEST);
    ok(fragment1.appendChild(element2), TEST);
    
    TEST = "ProcessingInstruction may be appeded to (XML)DocumentFragment";
    ok(fragment1.appendChild(pi1), TEST);
    ok(fragment1.appendChild(pi2), TEST);
    
    TEST = "Comments may be appended to DocumentFragment";
    ok(fragment1.appendChild(comment1), TEST);
    ok(fragment1.appendChild(comment2), TEST);
    
    TEST = "Attr can not be appended to DocumentFragment";
    try{
        //No Attr on Document
        fragment1.appendChild(attr1);
        ok(false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals(e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Text may be appended to DocumentFragment";
    ok(fragment1.appendChild(text1), TEST);
    ok(fragment1.appendChild(text2), TEST);
    
    TEST = "CDATASection may be appended to DocumentFragment";
    ok(fragment1.appendChild(cdata1), TEST);
    ok(fragment1.appendChild(cdata2), TEST);
    
    TEST = "Entity may not be appended to DocumentFragment";
    ok(true, 'TODO: How to test? '+TEST);
    
    TEST = "Notation may not be appended to DocumentFragment";
    ok(true, 'TODO: How to test? '+TEST);
    
    /************************
     * DocumentType
     ***********************/
    reset();
    
    TEST = "Another Document cannot be appended to a DocumentType";
    try{
        doctype1.appendChild(doc2);
        ok(false, TEST+":"+WRONG_DOCUMENT_ERR_MSG);
    }catch(e){
        ok( e.code == DOMException.WRONG_DOCUMENT_ERR || //Webkit
            e.code == DOMException.HIERARCHY_REQUEST_ERR, //Mozilla
            TEST);
    }
    
    TEST = "Document cannot be appended to a DocumentType";
    try{
        doctype1.appendChild(doc1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "A DocumentFragment cannot be appended to a DocumentType";
    try{
        doctype1.appendChild(fragment1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "DocumentType may not be appended to DocumentType";
    try{
        doctype1.appendChild(doctype2);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Element may not be appended to DocumentType";
    try{
        doctype1.appendChild(element1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "ProcessingInstruction may not be appended to DocumentType";
    try{
        doctype1.appendChild(pi1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Comment may not be appended to DocumentType";
    try{
        doctype1.appendChild(comment1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Attr may not be appended to DocumentType";
    try{
        doctype1.appendChild(attr1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Text may not be appended to DocumentType";
    try{
        doctype1.appendChild(text1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "CDATA may not be appended to DocumentType";
    try{
        doctype1.appendChild(cdata1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Entity may not be appended to DocumentType";
    ok(true, 'TODO:'+TEST);
    
    TEST = "Notation may not be appended to DocumentType";
    ok(true, 'TODO:'+TEST);
    
    /************************
     * EntityReference
     ***********************/
    reset();
    ok(true, 'TODO: One or Many * on EntityReference. Not sure how to test');
    
    /************************
     * Element
     ***********************/
    reset();
    
    TEST = "Another Document cant be appended to a Element";
    try{
        element1.appendChild(doc2);
        ok(false, TEST+":"+WRONG_DOCUMENT_ERR_MSG);
    }catch(e){
        ok( e.code == DOMException.WRONG_DOCUMENT_ERR || //Webkit
            e.code == DOMException.HIERARCHY_REQUEST_ERR, //Mozilla
            TEST);
    }
    
    TEST = "Document cant be appended to a Element";
    try{
        element1.appendChild(doc1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "An empty DocumentFragment can be appended to a Element";
    ok(element1.appendChild(fragment1), TEST);
    
    TEST = "A nonempty DocumentFragment can be appended to a Element";
    fragment2.appendChild(doc1.createElement('cdcdcdcd'));
    ok( element1.appendChild(fragment2), TEST);
    
    TEST = "DocumentType may not be appended to Element";
    try{
        element1.appendChild(doctype2);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Element can be appended to Element";
    ok(element1.appendChild(doc1.createElement('ababab')), TEST);
    ok(element1.appendChild(element2), TEST);
    
    TEST = "ProcessingInstruction may be appeded to (XML)Element";
    ok(element1.appendChild(pi1), TEST);
    ok(element1.appendChild(pi2), TEST);
    
    TEST = "Comments may be appended to Element";
    ok(element1.appendChild(comment1), TEST);
    ok(element1.appendChild(comment2), TEST);
    
    TEST = "Attr may not be appended to Element";
    try{
        element1.appendChild(attr1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Text may be appended to Element";
    ok(element1.appendChild(text1), TEST);
    ok(element1.appendChild(text2), TEST);
    
    TEST = "CDATASection may be appended to Element";
    ok(element1.appendChild(cdata1), TEST);
    ok(element1.appendChild(cdata2), TEST);
    
    TEST = "Entity may not be appended to Element";
    ok(true, 'TODO: How to test? '+TEST);
    
    TEST = "Notation may not be appended to Element";
    ok(true, 'TODO: How to test? '+TEST);
    
    /************************
     * Attr
     ***********************/
    reset();
    
    TEST = "Another Document cannot be appended to a Attr";
    try{
        attr1.appendChild(doc2);
        ok(false, TEST+":"+WRONG_DOCUMENT_ERR_MSG);
    }catch(e){
        ok( e.code == DOMException.WRONG_DOCUMENT_ERR || //Webkit
            e.code == DOMException.HIERARCHY_REQUEST_ERR, //Mozilla
            TEST);
    }
    
    TEST = "Document cannot be appended to a Attr";
    try{
        attr1.appendChild(doc1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "A DocumentFragment cannot be appended to a Attr";
    try{
        fragment1.appendChild(element2);
        attr1.appendChild(fragment1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "DocumentType may not be appended to Attr";
    try{
        attr1.appendChild(doctype2);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Element may not be appended to Attr";
    try{
        attr1.appendChild(element1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "ProcessingInstruction may not be appended to Attr";
    try{
        attr1.appendChild(pi1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Comment may not be appended to Attr";
    try{
        attr1.appendChild(comment1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Attr may not be appended to Attr";
    try{
        attr1.appendChild(attr2);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Text may not be appended to Attr";
    try{
        attr1.appendChild(text1);
        //Webkit is ok with this
        ok( true, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        //Mozilla is closer to the spec
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "CDATA may not be appended to Attr";
    try{
        attr1.appendChild(cdata1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Entity may not be appended to Attr";
    ok(true, 'TODO:'+TEST);
    
    TEST = "Notation may not be appended to Attr";
    ok(true, 'TODO:'+TEST);
    
    
    /************************
     * ProcessingInstruction
     ***********************/
    reset();
    
    TEST = "Another Document cannot be appended to a ProcessingInstruction";
    try{
        pi1.appendChild(doc2);
        ok(false, TEST+":"+WRONG_DOCUMENT_ERR_MSG);
    }catch(e){
        ok( e.code == DOMException.WRONG_DOCUMENT_ERR || //Webkit
            e.code == DOMException.HIERARCHY_REQUEST_ERR, //Mozilla
            TEST);
    }
    
    TEST = "Document cannot be appended to a ProcessingInstruction";
    try{
        pi1.appendChild(doc1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "A DocumentFragment cannot be appended to a ProcessingInstruction";
    try{
        fragment1.appendChild(element2);
        pi1.appendChild(fragment1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "DocumentType may not be appended to ProcessingInstruction";
    try{
        pi1.appendChild(doctype2);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Element may not be appended to ProcessingInstruction";
    try{
        pi1.appendChild(element1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "ProcessingInstruction may not be appended to ProcessingInstruction";
    try{
        pi1.appendChild(pi2);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Comment may not be appended to ProcessingInstruction";
    try{
        pi1.appendChild(comment1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Attr may not be appended to ProcessingInstruction";
    try{
        pi1.appendChild(attr1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Text may not be appended to ProcessingInstruction";
    try{
        pi1.appendChild(text1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "CDATA may not be appended to ProcessingInstruction";
    try{
        pi1.appendChild(cdata1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Entity may not be appended to ProcessingInstruction";
    ok(true, 'TODO:'+TEST);
    
    TEST = "Notation may not be appended to ProcessingInstruction";
    ok(true, 'TODO:'+TEST);
    
    /************************
     * Comment
     ***********************/
    reset();
    
    TEST = "Another Document cannot be appended to a Comment";
    try{
        comment1.appendChild(doc2);
        ok(false, TEST+":"+WRONG_DOCUMENT_ERR_MSG);
    }catch(e){
        ok( e.code == DOMException.WRONG_DOCUMENT_ERR || //Webkit
            e.code == DOMException.HIERARCHY_REQUEST_ERR, //Mozilla
            TEST);
    }
    
    TEST = "Document cannot be appended to a Comment";
    try{
        comment1.appendChild(doc1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "A DocumentFragment cannot be appended to a Comment";
    try{
        fragment1.appendChild(element2);
        comment1.appendChild(fragment1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "DocumentType may not be appended to Comment";
    try{
        comment1.appendChild(doctype2);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Element may not be appended to Comment";
    try{
        comment1.appendChild(element1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "ProcessingInstruction may not be appended to Comment";
    try{
        comment1.appendChild(pi1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Comment may not be appended to Comment";
    try{
        comment1.appendChild(comment2);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Attr may not be appended to Comment";
    try{
        comment1.appendChild(attr1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Text may not be appended to Comment";
    try{
        comment1.appendChild(text1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "CDATA may not be appended to Comment";
    try{
        comment1.appendChild(cdata1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Entity may not be appended to Comment";
    ok(true, 'TODO:'+TEST);
    
    TEST = "Notation may not be appended to Comment";
    ok(true, 'TODO:'+TEST);
    
    /************************
     * Text
     ***********************/
    reset();
    
    TEST = "Another Document cannot be appended to a Text";
    try{
        text1.appendChild(doc2);
        ok(false, TEST+":"+WRONG_DOCUMENT_ERR_MSG);
    }catch(e){
        ok( e.code == DOMException.WRONG_DOCUMENT_ERR || //Webkit
            e.code == DOMException.HIERARCHY_REQUEST_ERR, //Mozilla
            TEST);
    }
    
    TEST = "Document cannot be appended to a Text";
    try{
        text1.appendChild(doc1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "A DocumentFragment cannot be appended to a Text";
    try{
        fragment1.appendChild(element2);
        text1.appendChild(fragment1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "DocumentType may not be appended to Text";
    try{
        text1.appendChild(doctype2);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Element may not be appended to Text";
    try{
        text1.appendChild(element1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "ProcessingInstruction may not be appended to Text";
    try{
        text1.appendChild(pi1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Comment may not be appended to Text";
    try{
        text1.appendChild(comment2);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Attr may not be appended to Text";
    try{
        text1.appendChild(attr1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Text may not be appended to Text";
    try{
        text1.appendChild(text2);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "CDATA may not be appended to Text";
    try{
        text1.appendChild(cdata1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Entity may not be appended to Text";
    ok(true, 'TODO:'+TEST);
    
    TEST = "Notation may not be appended to Text";
    ok(true, 'TODO:'+TEST);
    
    /************************
     * CDATASection
     ***********************/
    reset();
    
    TEST = "Another Document cannot be appended to a CDATASection";
    try{
        cdata1.appendChild(doc2);
        ok(false, TEST+":"+WRONG_DOCUMENT_ERR_MSG);
    }catch(e){
        ok( e.code == DOMException.WRONG_DOCUMENT_ERR || //Webkit
            e.code == DOMException.HIERARCHY_REQUEST_ERR, //Mozilla
            TEST);
    }
    
    TEST = "Document cannot be appended to a CDATASection";
    try{
        cdata1.appendChild(doc1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "A DocumentFragment cannot be appended to a CDATASection";
    try{
        fragment1.appendChild(element2);
        cdata1.appendChild(fragment1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "DocumentType may not be appended to CDATASection";
    try{
        cdata1.appendChild(doctype2);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Element may not be appended to CDATASection";
    try{
        cdata1.appendChild(element1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "ProcessingInstruction may not be appended to CDATASection";
    try{
        cdata1.appendChild(pi1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Comment may not be appended to CDATASection";
    try{
        cdata1.appendChild(comment1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Attr may not be appended to CDATASection";
    try{
        cdata1.appendChild(attr1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Text may not be appended to CDATASection";
    try{
        cdata1.appendChild(text1);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "CDATA may not be appended to CDATASection";
    try{
        cdata1.appendChild(cdata2);
        ok( false, TEST+":"+HIERARCHY_REQUEST_ERR_MSG);
    }catch(e){
        equals( e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }
    
    TEST = "Entity may not be appended to CDATASection";
    ok(true, 'TODO:'+TEST);
    
    TEST = "Notation may not be appended to CDATASection";
    ok(true, 'TODO:'+TEST);
    
    /************************
     * Entity
     ***********************/
    reset();
    ok(true, 'TODO: One or Many * on Entity. Not sure how to test');
    
    /************************
     * Notation
     ***********************/
    reset();
    ok(true, 'TODO: One or Many * on Notation. Not sure how to test');
});
/******************************************************************************

1.1.2. Memory Management

Most of the APIs defined by this specification are interfaces rather than 
classes. That means that an implementation need only expose methods with the 
defined names and specified operation, not implement classes that correspond 
directly to the interfaces. This allows the DOM APIs to be implemented as a 
thin veneer on top of legacy applications with their own data structures, or 
on top of newer applications with different class hierarchies. This also means 
that ordinary constructors (in the Java or C++ sense) cannot be used to create 
DOM objects, since the underlying objects to be constructed may have little 
relationship to the DOM interfaces. The conventional solution to this in 
object-oriented design is to define factory methods that create instances of 
objects that implement the various interfaces. In the DOM Level 1, objects 
implementing some interface "X" are created by a "createX()" method on the 
Document interface; this is because all DOM objects live in the context of a 
specific Document.

The DOM Level 1 API does not define a standard way to create DOMImplementation 
or Document objects; DOM implementations must provide some proprietary way of 
bootstrapping these DOM interfaces, and then all other objects can be built 
from there.

The Core DOM APIs are designed to be compatible with a wide range of languages, 
including both general-user scripting languages and the more challenging 
languages used mostly by professional programmers. Thus, the DOM APIs need to 
operate across a variety of memory management philosophies, from language 
bindings that do not expose memory management to the user at all, through those 
(notably Java) that provide explicit constructors but provide an automatic 
garbage collection mechanism to automatically reclaim unused memory, to those 
(especially C/C++) that generally require the programmer to explicitly allocate 
object memory, track where it is used, and explicitly free it for re-use. To 
ensure a consistent API across these platforms, the DOM does not address memory 
management issues at all, but instead leaves these for the implementation. 
Neither of the explicit language bindings devised by the DOM Working Group (for 
ECMAScript and Java) require any memory management methods, but DOM bindings 
for other languages (especially C or C++) may require such support. These 
extensions will be the responsibility of those adapting the DOM API to a 
specific language, not the DOM Working Group.

******************************************************************************/
test('1.1.2. Memory Management', function(){
   ok(true, 'Memory Management is transparent. Nothing to test.');
});
/******************************************************************************

1.1.3. Naming Conventions

While it would be nice to have attribute and method names that are short, 
informative, internally consistent, and familiar to users of similar APIs, the 
names also should not clash with the names in legacy APIs supported by DOM 
implementations. Furthermore, both OMG IDL and ECMAScript have significant 
limitations in their ability to disambiguate names from different namespaces 
that make it difficult to avoid naming conflicts with short, familiar names. 
So, some DOM names tend to be long and quite descriptive in order to be unique 
across all environments.

The Working Group has also attempted to be internally consistent in its use of 
various terms, even though these may not be common distinctions in other APIs. 
For example, we use the method name "remove" when the method changes the 
structural model, and the method name "delete" when the method gets rid of 
something inside the structure model. The thing that is deleted is not returned. 
The thing that is removed may be returned, when it makes sense to return it.

******************************************************************************/
test('1.1.3. Naming Conventions', function(){
    ok(true, 'Naming Conventions is explanitory. Nothing to test.');
});
/******************************************************************************

1.1.4. Inheritance vs. Flattened Views of the API

The DOM Core APIs present two somewhat different sets of interfaces to an 
XML/HTML document; one presenting an "object oriented" approach with a hierarchy 
of inheritance, and a "simplified" view that allows all manipulation to be done 
via the Node interface without requiring casts (in Java and other C-like 
languages) or query interface calls in COM environments. These operations are 
fairly expensive in Java and COM, and the DOM may be used in performance-
critical environments, so we allow significant functionality using just the 
Node interface. Because many other users will find the inheritance hierarchy 
easier to understand than the "everything is a Node" approach to the DOM, we 
also support the full higher-level interfaces for those who prefer a more 
object-oriented API.

In practice, this means that there is a certain amount of redundancy in the 
API. The Working Group considers the "inheritance" approach the primary view of 
the API, and the full set of functionality on Node to be "extra" functionality 
that users may employ, but that does not eliminate the need for methods on 
other interfaces that an object-oriented analysis would dictate. (Of course, 
when the O-O analysis yields an attribute or method that is identical to one on 
the Node interface, we don't specify a completely redundant one.) Thus, even 
though there is a generic nodeName attribute on the Node interface, there is 
still a tagName attribute on the Element interface; these two attributes must 
contain the same value, but the Working Group considers it worthwhile to 
support both, given the different constituencies the DOM API must satisfy.

******************************************************************************/
test('1.1.4. Inheritance vs. Flattened Views of the API', function(){
    //This might be a good place to test the generic node interface 
    //properties on all fundamental types
    ok(true, 'Inheritance vs. Flattened Views of the API. Nothing to test.');
});
/******************************************************************************

1.1.5. The DOMString type

To ensure interoperability, the DOM specifies the following:

    * Type Definition DOMString

          A DOMString is a sequence of 16-bit units.


          IDL Definition

              typedef sequence<unsigned short> DOMString;


    * Applications must encode DOMString using UTF-16 (defined in [Unicode] and
      Amendment 1 of [ISO/IEC 10646]).
      The UTF-16 encoding was chosen because of its widespread industry 
      practice. Note that for both HTML and XML, the document character set 
      (and therefore the notation of numeric character references) is based on 
      UCS [ISO-10646]. A single numeric character reference in a source 
      document may therefore in some cases correspond to two 16-bit units in a 
      DOMString (a high surrogate and a low surrogate).

      Note: Even though the DOM defines the name of the string type to be 
            DOMString, bindings may use different names. For example for Java, 
            DOMString is bound to the String type because it also uses UTF-16 
            as its encoding.

Note: As of August 1998, the OMG IDL specification included a wstring type. 
      However, that definition did not meet the interoperability criteria of 
      the DOM API since it relied on negotiation to decide the width and 
      encoding of a character.
      
******************************************************************************/
test('1.1.5. The DOMString type', function(){
    ok(true, "The DOMString type is ECMAScript String type. Nothing to test.");
});
/******************************************************************************

1.1.6. String comparisons in the DOM

The DOM has many interfaces that imply string matching. HTML processors 
generally assume an uppercase (less often, lowercase) normalization of names 
for such things as elements, while XML is explicitly case sensitive. For the 
purposes of the DOM, string matching is performed purely by binary comparison 
of the 16-bit units of the DOMString. In addition, the DOM assumes that any 
case normalizations take place in the processor, before the DOM structures are 
built.

Note: Besides case folding, there are additional normalizations that can be 
      applied to text. The W3C I18N Working Group is in the process of defining 
      exactly which normalizations are necessary, and where they should be 
      applied. The W3C I18N Working Group expects to require early 
      normalization, which means that data read into the DOM is assumed to 
      already be normalized. The DOM and applications built on top of it in 
      this case only have to assure that text remains normalized when being 
      changed. For further details, please see [Charmod].

      
******************************************************************************/
test('1.1.6. String comparisons in the DOM', function(){
    //it might be worth showing utf-8 and utf-16 strings are equivalent
    //to their ascii counterparts during string comparisions
    ok(true, "String comparisons in the DOM are transparent. Nothing to test.");
});
/******************************************************************************

1.2. Fundamental Interfaces

The interfaces within this section are considered fundamental, and must be 
fully implemented by all conforming implementations of the DOM, including all
HTML DOM implementations, unless otherwise specified.

******************************************************************************/
test('1.2. Fundamental Interfaces', function(){
    ok(true, "Note we break 1.2 into subsections for the purpose of testing");
});
/******************************************************************************

1.2.1. Exception DOMException

    DOM operations only raise exceptions in "exceptional" circumstances, i.e., 
    when an operation is impossible to perform (either for logical reasons, 
    because data is lost, or because the implementation has become unstable). 
    In general, DOM methods return specific error values in ordinary processing
    situations, such as out-of-bound errors when using NodeList.

    Implementations may raise other exceptions under other circumstances. For 
    example, implementations may raise an implementation-dependent exception 
    if a null argument is passed.

    Some languages and object systems do not support the concept of exceptions. 
    For such systems, error conditions may be indicated using native error 
    reporting mechanisms. For some bindings, for example, methods may return 
    error codes similar to those listed in the corresponding method 
    descriptions.


    IDL Definition

        exception DOMException {
          unsigned short   code;
        };
        // ExceptionCode
        const unsigned short      INDEX_SIZE_ERR                 = 1;
        const unsigned short      DOMSTRING_SIZE_ERR             = 2;
        const unsigned short      HIERARCHY_REQUEST_ERR          = 3;
        const unsigned short      WRONG_DOCUMENT_ERR             = 4;
        const unsigned short      INVALID_CHARACTER_ERR          = 5;
        const unsigned short      NO_DATA_ALLOWED_ERR            = 6;
        const unsigned short      NO_MODIFICATION_ALLOWED_ERR    = 7;
        const unsigned short      NOT_FOUND_ERR                  = 8;
        const unsigned short      NOT_SUPPORTED_ERR              = 9;
        const unsigned short      INUSE_ATTRIBUTE_ERR            = 10;

    Definition group ExceptionCode

        An integer indicating the type of error generated.

        Note: Other numeric codes are reserved for W3C for possible future use.

        Defined Constants

            DOMSTRING_SIZE_ERR
                If the specified range of text does not fit into a DOMString

            HIERARCHY_REQUEST_ERR
                If any node is inserted somewhere it doesn't belong

            INDEX_SIZE_ERR
                If index or size is negative, or greater than the allowed value

            INUSE_ATTRIBUTE_ERR
                If an attempt is made to add an attribute that is already in 
                use elsewhere

            INVALID_CHARACTER_ERR
                If an invalid or illegal character is specified, such as in a 
                name. See production 2 in the XML specification for the 
                definition of a legal character, and production 5 for the 
                definition of a legal name character.

            NOT_FOUND_ERR
                If an attempt is made to reference a node in a context where it
                does not exist

            NOT_SUPPORTED_ERR
                If the implementation does not support the type of object 
                requested

            NO_DATA_ALLOWED_ERR
                If data is specified for a node which does not support data

            NO_MODIFICATION_ALLOWED_ERR
                If an attempt is made to modify an object where modifications 
                are not allowed

            WRONG_DOCUMENT_ERR
                If a node is used in a different document than the one that 
                created it (that doesn't support it)

******************************************************************************/
test('1.2.1. Exception DOMException', function(){
    //IDL Definition
    equals(DOMException.INDEX_SIZE_ERR, 1);
    equals(DOMException.DOMSTRING_SIZE_ERR, 2);
    equals(DOMException.HIERARCHY_REQUEST_ERR, 3);
    equals(DOMException.WRONG_DOCUMENT_ERR, 4);
    equals(DOMException.INVALID_CHARACTER_ERR, 5);
    equals(DOMException.NO_DATA_ALLOWED_ERR, 6);
    equals(DOMException.NO_MODIFICATION_ALLOWED_ERR, 7);
    equals(DOMException.NOT_FOUND_ERR, 8);
    equals(DOMException.NOT_SUPPORTED_ERR, 9);
    equals(DOMException.INUSE_ATTRIBUTE_ERR, 10);
});
/******************************************************************************

1.2.2. Interface DOMImplementation

    The DOMImplementation interface provides a number of methods for performing 
    operations that are independent of any particular instance of the document 
    object model.

    The DOM Level 1 does not specify a way of creating a document instance, and
    hence document creation is an operation specific to an implementation. 
    Future Levels of the DOM specification are expected to provide methods for 
    creating documents directly.


    IDL Definition

        interface DOMImplementation {
          boolean            hasFeature(in DOMString feature, 
                                        in DOMString version);
        };

    Methods

        hasFeature
            Test if the DOM implementation implements a specific feature.
            
            Parameters

            feature of type DOMString
                The name of the feature to test (case-insensitive). The values 
                used by DOM features are defined throughout this specification 
                and listed in the Compliance section. The name must be an XML 
                name. To avoid possible conflicts, as a convention, names 
                referring to features defined outside the DOM specification 
                should be made unique by reversing the name of the Internet 
                domain name of the person (or the organization that the person 
                belongs to) who defines the feature, component by component, 
                and using this as a prefix. For instance, the W3C SYMM Working 
                Group defines the feature "org.w3c.dom.smil".

            version of type DOMString
                This is the version number of the feature to test. In Level 1, 
                this is the string "1.0". If the version is not specified, 
                supporting any version of the feature causes the method to 
                return true.

            Return Value

            boolean

            true if the feature is implemented in the specified version, false 
            otherwise.
            
            No Exceptions
******************************************************************************/
test('1.2.2. Interface DOMImplementation', function(){
    //IDL Definition
    ok(DOMImplementation.prototype.hasFeature, 'hasFeature');
    
    //Methods
    //hasFeature
    equals(document.implementation.hasFeature('xml', '1.0'), true, 'xml');
    equals(document.implementation.hasFeature('html', '1.0'), true, 'html');
    equals(document.implementation.hasFeature('xml', '1.0'), true, 'xml 1.0');
    equals(document.implementation.hasFeature('html', '1.0'), true, 'html 1.0');
    equals(document.implementation.hasFeature('abc', '1.0'), false, 'abc 1.0');
    
    equals(document.implementation.hasFeature('XML', '1.0'), true, 'xml');
    equals(document.implementation.hasFeature('HTML', '1.0'), true, 'html');
    equals(document.implementation.hasFeature('Xml', '1.0'), true, 'xml 1.0');
    equals(document.implementation.hasFeature('hTMl', '1.0'), true, 'html 1.0');
    equals(document.implementation.hasFeature('AbC', '1.0'), false, 'abc 1.0');
});
/******************************************************************************

1.2.3. Interface DocumentFragment

    DocumentFragment is a "lightweight" or "minimal" Document object. It is 
    very common to want to be able to extract a portion of a document's tree or
    to create a new fragment of a document. Imagine implementing a user command
    like cut or rearranging a document by moving fragments around. It is 
    desirable to have an object which can hold such fragments and it is quite 
    natural to use a Node for this purpose. While it is true that a Document 
    object could fulfill this role, a Document object can potentially be a 
    heavyweight object, depending on the underlying implementation. What is 
    really needed for this is a very lightweight object. DocumentFragment is 
    such an object.

    Furthermore, various operations -- such as inserting nodes as children of 
    another Node -- may take DocumentFragment objects as arguments; this 
    results in all the child nodes of the DocumentFragment being moved to the
    child list of this node.

    The children of a DocumentFragment node are zero or more nodes representing 
    the tops of any sub-trees defining the structure of the document. 
    DocumentFragment nodes do not need to be well-formed XML documents 
    (although they do need to follow the rules imposed upon well-formed XML 
    parsed entities, which can have multiple top nodes). For example, a 
    DocumentFragment might have only one child and that child node could be a 
    Text node. Such a structure model represents neither an HTML document nor 
    a well-formed XML document.

    When a DocumentFragment is inserted into a Document (or indeed any other 
    Node that may take children) the children of the DocumentFragment and not 
    the DocumentFragment itself are inserted into the Node. This makes the 
    DocumentFragment very useful when the user wishes to create nodes that are 
    siblings; the DocumentFragment acts as the parent of these nodes so that 
    the user can use the standard methods from the Node interface, such as 
    insertBefore and appendChild.


    IDL Definition

        interface DocumentFragment : Node {
        };
******************************************************************************/
test('1.2.3. Interface DocumentFragment', function(){

    //IDL Definition
    ok(true, "Please se IDL Definition for Node");
    
    var doc,
        fragment,
        elementA,
        elementB;

    doc = document.implementation.createDocument('', '', null);
    fragment = doc.createDocumentFragment();
    elementA = doc.createElement('elementA');
    elementB = doc.createElement('elementB');
    elementA.textContent = "abc";
    elementB.textContent = "def";
    fragment.appendChild(elementA);
    fragment.appendChild(elementB);

    ok(fragment.childNodes,  '.childNodes');
    equals(fragment.childNodes.length, 2, '.childNodes.length');
    equals(fragment.firstChild, elementA, '.firstChild');
    equals(fragment.lastChild, elementB, '.lastChild');
    equals(fragment.localName, null, '.localName');
    equals(fragment.namespaceURI, null, '.namespaceURI');
    equals(fragment.nextSibling, null, '.nextSibling');
    equals(fragment.nodeName, '#document-fragment', '.nodeName');
    equals(fragment.nodeType, 11, '.nodeType');
    equals(fragment.nodeValue, null, '.nodeValue');
    equals(fragment.ownerDocument, doc, '.ownerDocument');
    equals(fragment.parentNode, null, '.parentNode');
    equals(fragment.prefix, null, '.prefix');
    equals(fragment.previousSibling, null, '.previousSibling');
    equals(fragment.textContent, "abcdef", '.textContent');

    var clone = fragment.cloneNode(false);//shallow

    ok(clone, 'clone');
    ok(clone.childNodes,  '.childNodes');
    equals(clone.childNodes.length, 0, '.childNodes.length');
    equals(clone.localName, null, '.localName');
    equals(clone.namespaceURI, null, '.namespaceURI');
    equals(clone.nextSibling, null, '.nextSibling');
    equals(clone.nodeName, '#document-fragment', '.nodeName');
    equals(clone.nodeType, 11, '.nodeType');
    equals(clone.nodeValue, null, '.nodeValue');
    equals(clone.ownerDocument, doc, '.ownerDocument');
    equals(clone.parentNode, null, '.parentNode');
    equals(clone.prefix, null, '.prefix');
    equals(clone.previousSibling, null, '.previousSibling');
    equals(clone.textContent, "", '.textContent');

    clone = fragment.cloneNode(true);//deep

    ok(clone, 'clone');
    ok(clone.childNodes,  '.childNodes');
    equals(clone.childNodes.length, 2, '.childNodes.length');
    equals(clone.firstChild.tagName, 'elementA', '.firstChild');
    equals(clone.lastChild.tagName, 'elementB', '.lastChild');
    ok(clone.firstChild !== elementA, 'clone.firstChild !== elementA');
    ok(clone.lastChild !== elementB, 'clone.lastChild !== elementB');
    equals(clone.localName, null, '.localName');
    equals(clone.namespaceURI, null, '.namespaceURI');
    equals(clone.nextSibling, null, '.nextSibling');
    equals(clone.nodeName, '#document-fragment', '.nodeName');
    equals(clone.nodeType, 11, '.nodeType');
    equals(clone.nodeValue, null, '.nodeValue');
    equals(clone.ownerDocument, doc, '.ownerDocument');
    equals(clone.parentNode, null, '.parentNode');
    equals(clone.prefix, null, '.prefix');
    equals(clone.previousSibling, null, '.previousSibling');
    equals(clone.textContent, "abcdef", '.textContent');
    
    var fragment = doc.createDocumentFragment();
    ok(fragment, 'fragment');
    equals(fragment.attributes, null, '.attributes');
    equals(fragment.baseURI, 'about:blank', '.baseURI');
    ok(fragment.childNodes,  '.childNodes');
    equals(fragment.childNodes.length, 0, '.childNodes.length');
    equals(fragment.firstChild, null, '.firstChild');
    equals(fragment.lastChild, null, '.lastChild');
    equals(fragment.localName, null, '.localName');
    equals(fragment.namespaceURI, null, '.namespaceURI');
    equals(fragment.nextSibling, null, '.nextSibling');
    equals(fragment.nodeName, '#document-fragment', '.nodeName');
    equals(fragment.nodeType, 11, '.nodeType');
    equals(fragment.nodeValue, null, '.nodeValue');
    equals(fragment.ownerDocument, doc, '.ownerDocument');
    equals(fragment.parentNode, null, '.parentNode');
    equals(fragment.prefix, null, '.prefix');
    equals(fragment.previousSibling, null, '.previousSibling');
    equals(fragment.textContent, "", '.textContent');
});

/******************************************************************************
1.2.4. Interface Document

    The Document interface represents the entire HTML or XML document. 
    Conceptually, it is the root of the document tree, and provides the primary 
    access to the document's data.

    Since elements, text nodes, comments, processing instructions, etc. cannot 
    exist outside the context of a Document, the Document interface also 
    contains the factory methods needed to create these objects. The Node 
    objects created have a ownerDocument attribute which associates them with 
    the Document within whose context they were created.


    IDL Definition

        interface Document : Node {
          readonly attribute DocumentType     doctype;
          readonly attribute DOMImplementation  implementation;
          readonly attribute Element          documentElement;
          Element            createElement(in DOMString tagName)
                                                raises(DOMException);
          DocumentFragment   createDocumentFragment();
          Text               createTextNode(in DOMString data);
          Comment            createComment(in DOMString data);
          CDATASection       createCDATASection(in DOMString data)
                                                raises(DOMException);
          ProcessingInstruction createProcessingInstruction(in DOMString target, 
                                                            in DOMString data)
                                                raises(DOMException);
          Attr               createAttribute(in DOMString name)
                                                raises(DOMException);
          EntityReference    createEntityReference(in DOMString name)
                                                raises(DOMException);
          NodeList           getElementsByTagName(in DOMString tagname);
        };

    Attributes

        doctype of type DocumentType, readonly
            The Document Type Declaration (see DocumentType) associated with 
            this document. For HTML documents as well as XML documents without 
            a document type declaration this returns null. The DOM Level 1 does
            not support editing the Document Type Declaration. docType cannot 
            be altered in any way, including through the use of methods 
            inherited from the Node interface, such as insertNode or 
            removeNode.

        documentElement of type Element, readonly
            This is a convenience attribute that allows direct access to the 
            child node that is the root element of the document. For HTML 
            documents, this is the element with the tagName "HTML".

        implementation of type DOMImplementation, readonly
            The DOMImplementation object that handles this document. A DOM 
            application may use objects from multiple implementations.

    Methods

        createAttribute
            Creates an Attr of the given name. Note that the Attr instance can 
            then be set on an Element using the setAttributeNode method.
            Parameters

            name of type DOMString
                The name of the attribute.

            Return Value

            Attr
                    

            A new Attr object with the NodeName attribute set to name. The 
            value of the attribute is the empty string.
            
            Exceptions

            DOMException
                    

            INVALID_CHARACTER_ERR: Raised if the specified name contains an 
            illegal character.
            
        createCDATASection
            Creates a CDATASection node whose value is the specified string.
            Parameters

            data of type DOMString
                The data for the CDATASection contents.

            Return Value

            CDATASection
                    

            The new CDATASection object.
            Exceptions

            DOMException
                    

            NOT_SUPPORTED_ERR: Raised if this document is an HTML document.
            
        createComment
            Creates a Comment node given the specified string.
            Parameters

            data of type DOMString
                The data for the node.

            Return Value

            Comment
                    

            The new Comment object.
            No Exceptions
            
        createDocumentFragment
            Creates an empty DocumentFragment object.
            Return Value

            DocumentFragment
                    

            A new DocumentFragment.
            No Parameters
            No Exceptions
            
        createElement
            Creates an element of the type specified. Note that the instance 
            returned implements the Element interface, so attributes can be 
            specified directly on the returned object.
            In addition, if there are known attributes with default values, 
            Attr nodes representing them are automatically created and attached
            to the element.
            
            Parameters

            tagName of type DOMString
                The name of the element type to instantiate. For XML, this is 
                case-sensitive. For HTML, the tagName parameter may be provided
                in any case, but it must be mapped to the canonical uppercase 
                form by the DOM implementation.

            Return Value

            Element
                    

            A new Element object with the nodeName attribute set to tagName.
            Exceptions

            DOMException
                    

            INVALID_CHARACTER_ERR: Raised if the specified name contains an 
            illegal character.
            
        createEntityReference
            Creates an EntityReference object. In addition, if the referenced 
            entity is known, the child list of the EntityReference node is made 
            the same as that of the corresponding Entity node.
            
            Parameters

            name of type DOMString
                The name of the entity to reference.

            Return Value

            EntityReference
                    

            The new EntityReference object.
            Exceptions

            DOMException
                    

            INVALID_CHARACTER_ERR: Raised if the specified name contains an 
            illegal character.

            NOT_SUPPORTED_ERR: Raised if this document is an HTML document.
            
        createProcessingInstruction
            Creates a ProcessingInstruction node given the specified name and 
            data strings.
            
            Parameters

            target of type DOMString
                The target part of the processing instruction.

            data of type DOMString
                The data for the node.

            Return Value

            ProcessingInstruction
                    

            The new ProcessingInstruction object.
            Exceptions

            DOMException
                    

            INVALID_CHARACTER_ERR: Raised if the specified target contains an 
            illegal character.

            NOT_SUPPORTED_ERR: Raised if this document is an HTML document.

        createTextNode
            Creates a Text node given the specified string.
            Parameters

            data of type DOMString
                The data for the node.

            Return Value

            Text
                    

            The new Text object.
            No Exceptions

        getElementsByTagName
            Returns a NodeList of all the Elements with a given tag name in the
            order in which they are encountered in a preorder traversal of the 
            Document tree.
            
            Parameters

            tagname of type DOMString
                The name of the tag to match on. The special value "*" matches 
                all tags.

            Return Value

            NodeList
                    

            A new NodeList object containing all the matched Elements.
            No Exceptions

******************************************************************************/
test('1.2.4. Interface Document', function(){
    
    //TODO: A lot of these tests belong in the respective interface
    //      test, eg Interface Element, which will both reduce the 
    //      overall size and complexity of this test, but also 
    //      help illuminate missing assertions
    var doc = document.implementation.createDocument('', '', null),
        keyboardish=''+
        '`1234567890-='+
        '\tqwertyuiop[]\\'+
        'asdfghjkl;\'\n'+
        'zxcvbnm,./'+
        ' '+
        '~!@#$%^&*()_+'+
        '\tQWERTYUIOP{}|'+
        'ASDFGHJKL:"\n'+
        'ZXCVBNM<>?'+
        ' ',
        illegalName = '$abc',
        domparser = new DOMParser();

    //Interface
    ok(document.doctype !== undefined, 'doctype');
    ok(document.implementation !== undefined, 'implementation');
    ok(document.documentElement !== undefined, 'documentElement');
    ok(document.createElement, 'createElement');
    ok(document.createDocumentFragment, 'createDocumentFragment');
    ok(document.createTextNode, 'createTextNode');
    ok(document.createComment, 'createComment');
    ok(document.createCDATASection, 'createCDATASection');
    ok(document.createProcessingInstruction, 'createProcessingInstruction');
    ok(document.createAttribute, 'createAttribute');
    ok(document.createEntityReference, 'createEntityReference');
    ok(document.getElementsByTagName, 'getElementsByTagName');
    

    //Attributes
    ok(document.doctype instanceof(DocumentType), 'doctype');
    ok(document.implementation instanceof(DOMImplementation), 'implementation');
    ok(document.documentElement instanceof(Element), 'documentElement');
    
    //createAttribute
    var attribute = doc.createAttribute('envjs');
    ok(attribute, 'attribute created');
    ok(attribute instanceof(Attr), 'instanceof Attr');
    equals(attribute.ownerDocument, doc, 'ownerDocument is doc');
    equals(attribute.nodeType, Node.ATTRIBUTE_NODE, 'Node.ATTRIBUTE_NODE');
    equals(attribute.nodeName, 'envjs', 'name is same as arg');
    equals(attribute.value, '', 'default value is empty string');
    try{
        doc.createAttribute(illegalName);
        ok(false, 'String contains an invalid character');
    }catch(e){
        ok(e instanceof(DOMException), 'DOMExcpetion');
        equals(e.code, DOMException.INVALID_CHARACTER_ERR, 'code');
        equals(e.message, 'String contains an invalid character', 'message');
    }

    //createCDATASection
    var cdata = doc.createCDATASection(keyboardish);
    ok(cdata, 'node was created');
    ok(cdata instanceof(CDATASection), 'instanceof CDATASection');
    equals(cdata.ownerDocument, doc, 'ownerDocument');
    equals(cdata.nodeType, Node.CDATA_SECTION_NODE, 'nodeType');
    equals(cdata.nodeValue, keyboardish, 'nodeValue');
    

    //createComment
    var comment = doc.createComment(keyboardish);
    ok(comment, 'node was created');
    ok(comment instanceof(Comment), 'instanceof Comment');
    equals(comment.ownerDocument, doc, 'ownerDocument');
    equals(comment.nodeType, Node.COMMENT_NODE, 'nodeType');
    equals(comment.nodeValue, keyboardish, 'nodeValue');

    //createDocumentFragment
    var fragment = doc.createDocumentFragment();
    ok(fragment, 'fragment');
    ok(fragment instanceof(DocumentFragment), 'instanceof DocumentFragment');
    equals(fragment.ownerDocument, doc, 'ownerDocument');
    equals(fragment.nodeType, Node.DOCUMENT_FRAGMENT_NODE, 'nodeType');

    //createElement
    var element = doc.createElement('envjs');
    ok(element, 'element created');
    ok(element instanceof(Element), 'instanceof Element');
    equals(element.ownerDocument, doc, 'ownerDocument');
    equals(element.nodeType, Node.ELEMENT_NODE, 'nodeType');
    try{
        doc.createElement(illegalName);
        ok(false, 'String contains an invalid character');
    }catch(e){
        ok(e instanceof(DOMException), 'DOMExcpetion');
        equals(e.code, DOMException.INVALID_CHARACTER_ERR, 'code');
        equals(e.message, 'String contains an invalid character', 'message');
    }
    
    //createEntityReference
    //TODO: this is not really supported by any browser we can
    //      find: https://bugzilla.mozilla.org/show_bug.cgi?id=9850
    var entityReference = doc.createEntityReference('&envjs;');
    ok(!entityReference, 'entityReference created');//SPEC WRECK
    try{
        doc.createEntityReference(illegalName);
        ok(!false, 'String contains an invalid character');//SPEC WRECK
    }catch(e){
        ok(e instanceof(DOMException), 'DOMExcpetion');
        equals(e.code, DOMException.INVALID_CHARACTER_ERR, 'code');
        equals(e.message, 'String contains an invalid character', 'message');
    }
    try{
        document.createEntityReference('envjs');
        ok(false, 'Operation is not supported');
    }catch(e){
        //html documents do not support this operation
        ok(e instanceof(DOMException), 'DOMExcpetion');
        equals(e.code, DOMException.NOT_SUPPORTED_ERR, 'code');
        equals(e.message, 'Operation is not supported', 'message');
    }
    
    //createProcessingInstruction
    var target = 'foo', 
        data = 'bar="pooh"',
        pi = doc.createProcessingInstruction(target, data);
    ok(pi, 'node was created');
    ok(element instanceof(Element), 'instanceof Element');
    equals(pi.ownerDocument, doc, 'ownerDocument');
    equals(pi.nodeType, Node.PROCESSING_INSTRUCTION_NODE, 'nodeType');
    equals(pi.nodeName, target, '.nodeName');
    equals(pi.nodeValue, data, '.nodeValue');
    try{
        doc.createProcessingInstruction(illegalName, data);
        ok(false, 'String contains an invalid character');
    }catch(e){
        ok(e instanceof(DOMException), 'DOMExcpetion');
        equals(e.code, DOMException.INVALID_CHARACTER_ERR, 'code');
        equals(e.message, 'String contains an invalid character', 'message');
    }
    try{
        //html documents do not support this operation
        document.createProcessingInstruction('envjs', data);
        ok(false, 'Operation is not supported');
    }catch(e){
        ok(e instanceof(DOMException), 'DOMExcpetion');
        equals(e.code, DOMException.NOT_SUPPORTED_ERR, 'code');
        equals(e.message, 'Operation is not supported', 'message');
    }

    //createTextNode
    var text = doc.createTextNode(keyboardish);
    ok(text, 'text node was created');
    ok(text instanceof(Text), 'instanceof Text');
    equals(text.ownerDocument, doc, 'ownerDocument');
    equals(text.nodeType, Node.TEXT_NODE, 'nodeType');
    equals(text.nodeValue, keyboardish, '.nodeValue');

    //getElementsByTagName
    //TODO: should remove use of domparser for these tests
    //TODO: should move live nodelist tests to nodelist
    var all, node, nodes, expected, i;
    doc = domparser.parseFromString(
        '<root>123</root>',
        'text/xml'
    );
    all = nodes = doc.getElementsByTagName('*');
    equals(nodes.length, 1, 'all elements');
    nodes = doc.getElementsByTagName('root');
    equals(nodes.length, 1, 'named index - root');
    expected = ['root'];
    for(i=0;i<all.length;i++){
        equals(all[i].tagName, expected[i], 'order of live nodelists is correct');
    }

    doc = domparser.parseFromString(
        '<root><a>123</a></root>',
        'text/xml'
    );
    all = nodes = doc.getElementsByTagName('*');
    equals(nodes.length, 2, 'all elements');
    nodes = doc.getElementsByTagName('root');
    equals(nodes.length, 1, 'named index - root');
    nodes = doc.getElementsByTagName('a');
    equals(nodes.length, 1, 'named index - a');
    expected = ['root','a'];
    for(i=0;i<all.length;i++){
        equals(all[i].tagName, expected[i], 'order of live nodelists is correct');
    }
    
    
    doc = domparser.parseFromString(
        '<root><a>123<b>456</b></a><c/></root>',
        'text/xml'
    );
    all = nodes = doc.getElementsByTagName('*');
    equals(nodes.length, 4, 'all elements');
    nodes = doc.getElementsByTagName('root');
    equals(nodes.length, 1, 'named index - root');
    nodes = doc.getElementsByTagName('a');
    equals(nodes.length, 1, 'named index - a');
    nodes = doc.getElementsByTagName('b');
    equals(nodes.length, 1, 'named index - b');
    nodes = doc.getElementsByTagName('c');
    equals(nodes.length, 1, 'named index - c');
    expected = ['root','a','b','c'];
    for(i=0;i<all.length;i++){
        equals(all[i].tagName, expected[i], 'order of live nodelists is correct');
    }
    
    doc = domparser.parseFromString(
        '<root><a id="a1">123<b>456</b></a><c><a id="a2">789</a></c></root>',
        'text/xml'
    );
    all = nodes = doc.getElementsByTagName('*');
    equals(nodes.length, 5, 'all elements');
    nodes = doc.getElementsByTagName('root');
    equals(nodes.length, 1, 'named index - root');
    nodes = doc.getElementsByTagName('a');
    equals(nodes.length, 2, 'named index - a');
    nodes = doc.getElementsByTagName('b');
    equals(nodes.length, 1, 'named index - b');
    nodes = doc.getElementsByTagName('c');
    equals(nodes.length, 1, 'named index - c');
    expected = ['root','a','b','c', 'a'];
    for(i=0;i<all.length;i++){
        equals(all[i].tagName, expected[i], 'order of live nodelists is correct');
    }
    
    doc = domparser.parseFromString(
        '<root><div id="d0"><div id="d1">123<a>456</a></div><b>789</b></div><div id="d2"><c/></div><d>abc</d></root>',
        'text/xml'
    );

    all = nodes = doc.getElementsByTagName('*');
    equals(all.length, 8, 'all elements');
    nodes = doc.getElementsByTagName('root');
    equals(nodes.length, 1, 'named index - root');
    nodes = doc.getElementsByTagName('div');
    equals(nodes.length, 3, 'named index - div');
    nodes = doc.getElementsByTagName('b');
    equals(nodes.length, 1, 'named index - b');

    expected = ['root', 'div', 'div', 'a', 'b', 'div', 'c', 'd'];
    for(i=0;i<all.length;i++){
        equals(all[i].tagName, expected[i], 'order of live nodelists is correct');
    }
    
    nodes = doc.getElementsByTagName('a');
    equals(nodes.length, 1, 'named index - a');
    doc.documentElement.appendChild(doc.createElement('a'));
    equals(nodes.length, 2, 'live list - named index - a');
    equals(all.length, 9, 'all elements');
    nodes[0].parentNode.removeChild(nodes[0]);
    equals(nodes.length, 1, 'live list - named index - a');
    equals(all.length, 8, 'all elements');
});
/******************************************************************************
1.2.5. Interface Node

    The Node interface is the primary datatype for the entire Document Object 
    Model. It represents a single node in the document tree. While all objects 
    implementing the Node interface expose methods for dealing with children, 
    not all objects implementing the Node interface may have children. For 
    example, Text nodes may not have children, and adding children to such 
    nodes results in a DOMException being raised.

    The attributes nodeName, nodeValue and attributes are included as a 
    mechanism to get at node information without casting down to the specific 
    derived interface. In cases where there is no obvious mapping of these 
    attributes for a specific nodeType (e.g., nodeValue for an Element or 
    attributes for a Comment), this returns null. Note that the specialized 
    interfaces may contain additional and more convenient mechanisms to get and
    set the relevant information.


    IDL Definition

        interface Node {

          // NodeType
          const unsigned short      ELEMENT_NODE                   = 1;
          const unsigned short      ATTRIBUTE_NODE                 = 2;
          const unsigned short      TEXT_NODE                      = 3;
          const unsigned short      CDATA_SECTION_NODE             = 4;
          const unsigned short      ENTITY_REFERENCE_NODE          = 5;
          const unsigned short      ENTITY_NODE                    = 6;
          const unsigned short      PROCESSING_INSTRUCTION_NODE    = 7;
          const unsigned short      COMMENT_NODE                   = 8;
          const unsigned short      DOCUMENT_NODE                  = 9;
          const unsigned short      DOCUMENT_TYPE_NODE             = 10;
          const unsigned short      DOCUMENT_FRAGMENT_NODE         = 11;
          const unsigned short      NOTATION_NODE                  = 12;

          readonly attribute DOMString        nodeName;
                   attribute DOMString        nodeValue;
                                        // raises(DOMException) on setting
                                        // raises(DOMException) on retrieval

          readonly attribute unsigned short   nodeType;
          readonly attribute Node             parentNode;
          readonly attribute NodeList         childNodes;
          readonly attribute Node             firstChild;
          readonly attribute Node             lastChild;
          readonly attribute Node             previousSibling;
          readonly attribute Node             nextSibling;
          readonly attribute NamedNodeMap     attributes;
          readonly attribute Document         ownerDocument;
          Node               insertBefore(in Node newChild, 
                                          in Node refChild)
                                                raises(DOMException);
          Node               replaceChild(in Node newChild, 
                                          in Node oldChild)
                                                raises(DOMException);
          Node               removeChild(in Node oldChild)
                                                raises(DOMException);
          Node               appendChild(in Node newChild)
                                                raises(DOMException);
          boolean            hasChildNodes();
          Node               cloneNode(in boolean deep)
                                                raises(DOMException);
        };


    Definition group NodeType

        An integer indicating which type of node this is.

        Note: Numeric codes up to 200 are reserved to W3C for possible future 
              use.

        Defined Constants

            ATTRIBUTE_NODE
                The node is an Attr.

            CDATA_SECTION_NODE
                The node is a CDATASection.

            COMMENT_NODE
                The node is a Comment.

            DOCUMENT_FRAGMENT_NODE
                The node is a DocumentFragment.

            DOCUMENT_NODE
                The node is a Document.

            DOCUMENT_TYPE_NODE
                The node is a DocumentType.

            ELEMENT_NODE
                The node is an Element.

            ENTITY_NODE
                The node is an Entity.

            ENTITY_REFERENCE_NODE
                The node is an EntityReference.

            NOTATION_NODE
                The node is a Notation.

            PROCESSING_INSTRUCTION_NODE
                The node is a ProcessingInstruction.

            TEXT_NODE
                The node is a Text node.

        The values of nodeName, nodeValue, and attributes vary according to 
        the node type as follows:
        
        /                       nodeName                    nodeValue                           attributes
        Attr                    name of attribute           value of attribute                  null
        CDATASection            #cdata-section              content of the CDATA Section        null
        Comment                 #comment                    content of the comment              null
        Document                #document                   null                                null
        DocumentFragment        #document-fragment          null                                null
        DocumentType            document type name          null                                null
        Element                 tag name                    null                                NamedNodeMap
        Entity                  entity name                 null                                null
        EntityReference         name of entity referenced   null                                null
        Notation                notation name               null                                null
        ProcessingInstruction   target                      entire content excluding the target null
        Text                    #text                       content of the text node            null



    Attributes

        attributes of type NamedNodeMap, readonly
            A NamedNodeMap containing the attributes of this node (if it is an 
            Element) or null otherwise.

        childNodes of type NodeList, readonly
            A NodeList that contains all children of this node. If there are no
            children, this is a NodeList containing no nodes.

        firstChild of type Node, readonly
            The first child of this node. If there is no such node, this 
            returns null.

        lastChild of type Node, readonly
            The last child of this node. If there is no such node, this returns 
            null.

        nextSibling of type Node, readonly
            The node immediately following this node. If there is no such node, 
            this returns null.
            
        nodeName of type DOMString, readonly
            The name of this node, depending on its type; see the table above.
            
        nodeType of type unsigned short, readonly
            A code representing the type of the underlying object, as defined 
            above.

        nodeValue of type DOMString
            The value of this node, depending on its type; see the table above.
            When it is defined to be null, setting it has no effect.
            
            Exceptions on setting

            DOMException
                    

            NO_MODIFICATION_ALLOWED_ERR: Raised when the node is readonly.
            
            Exceptions on retrieval

            DOMException
                    

            DOMSTRING_SIZE_ERR: Raised when it would return more characters 
            than fit in a DOMString variable on the implementation platform.

        ownerDocument of type Document, readonly
            The Document object associated with this node. This is also the 
            Document object used to create new nodes. When this node is a 
            Document, this is null.

        parentNode of type Node, readonly
            The parent of this node. All nodes, except Attr, Document, 
            DocumentFragment, Entity, and Notation may have a parent. However, 
            if a node has just been created and not yet added to the tree, or 
            if it has been removed from the tree, this is null.

        previousSibling of type Node, readonly
            The node immediately preceding this node. If there is no such node, 
            this returns null.
            
    Methods

        appendChild
            Adds the node newChild to the end of the list of children of this 
            node. If the newChild is already in the tree, it is first removed.
            
            Parameters

            newChild of type Node
                The node to add.
                If it is a DocumentFragment object, the entire contents of the 
                document fragment are moved into the child list of this node

            Return Value

            Node
                    
            The node added.
            
            Exceptions

            DOMException

            HIERARCHY_REQUEST_ERR: Raised if this node is of a type that does 
            not allow children of the type of the newChild node, or if the node
            to append is one of this node's ancestors.

            WRONG_DOCUMENT_ERR: Raised if newChild was created from a different
            document than the one that created this node.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.

        cloneNode
            Returns a duplicate of this node, i.e., serves as a generic copy 
            constructor for nodes. The duplicate node has no parent; 
            (parentNode is null.).
            
            Cloning an Element copies all attributes and their values, 
            including those generated by the XML processor to represent 
            defaulted attributes, but this method does not copy any text it 
            contains unless it is a deep clone, since the text is contained in 
            a child Text node. Cloning an Attribute directly, as opposed to be 
            cloned as part of an Element cloning operation, returns a specified
            attribute (specified is true). Cloning any other type of node 
            simply returns a copy of this node.
            
            Note that cloning an immutable subtree results in a mutable copy, 
            but the children of an EntityReference clone are readonly. In 
            addition, clones of unspecified Attr nodes are specified. And, 
            cloning Document, DocumentType, Entity, and Notation nodes is 
            implementation dependent.
            
            Parameters

            deep of type boolean
                If true, recursively clone the subtree under the specified 
                node; if false, clone only the node itself (and its attributes,
                if it is an Element).

            Return Value

            Node
                    

            The duplicate node.
            Exceptions

            DOMException
                    

            NOT_SUPPORTED_ERR: Raised if this node is a of type DOCUMENT_NODE, 
            DOCUMENT_TYPE_NODE, ENTITY_NODE, or NOTATION_NODE and the 
            implementation does not support cloning this type of node.

        hasChildNodes
            This is a convenience method to allow easy determination of whether
            a node has any children.
            
            Return Value

            boolean
                    

            true if the node has any children, false if the node has no 
            children.
            
            No Parameters
            No Exceptions

        insertBefore
            Inserts the node newChild before the existing child node refChild. 
            If refChild is null, insert newChild at the end of the list of 
            children.
            
            If newChild is a DocumentFragment object, all of its children are 
            inserted, in the same order, before refChild. If the newChild is 
            already in the tree, it is first removed.
            
            Parameters

            newChild of type Node
                The node to insert.

            refChild of type Node
                The reference node, i.e., the node before which the new node 
                must be inserted.

            Return Value

            Node
                    

            The node being inserted.
            Exceptions

            DOMException
                    

            HIERARCHY_REQUEST_ERR: Raised if this node is of a type that does 
            not allow children of the type of the newChild node, or if the node
            to insert is one of this node's ancestors.

            WRONG_DOCUMENT_ERR: Raised if newChild was created from a different
            document than the one that created this node.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly or if 
            the parent of the node being inserted is readonly.

            NOT_FOUND_ERR: Raised if refChild is not a child of this node.

        removeChild
            Removes the child node indicated by oldChild from the list of 
            children, and returns it.
            
            Parameters

            oldChild of type Node
                The node being removed.

            Return Value

            Node

            The node removed.
            
            Exceptions

            DOMException
                    

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.

            NOT_FOUND_ERR: Raised if oldChild is not a child of this node.

        replaceChild
            Replaces the child node oldChild with newChild in the list of 
            children, and returns the oldChild node.
            
            If newChild is a DocumentFragment object, oldChild is replaced by 
            all of the DocumentFragment children, which are inserted in the 
            same order. If the newChild is already in the tree, it is first 
            removed.
            
            Parameters

            newChild of type Node
                The new node to put in the child list.

            oldChild of type Node
                The node being replaced in the list.

            Return Value

            Node
                    

            The node replaced.
            Exceptions

            DOMException

            HIERARCHY_REQUEST_ERR: Raised if this node is of a type that does 
            not allow children of the type of the newChild node, or it the node
            to put in is one of this node's ancestors.

            WRONG_DOCUMENT_ERR: Raised if newChild was created from a different 
            document than the one that created this node.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node or the parent of 
            the new node is readonly.

            NOT_FOUND_ERR: Raised if oldChild is not a child of this node.
******************************************************************************/
test('1.2.5. Interface Node', function(){
    
    //IDL Definition
    var TEST = "IDL Definition of Node interface is elusive. "
        "Testing instance where required.";
    ok(true, TEST);
    
    //Defined Constants
    equals(Node.ELEMENT_NODE, 1,'The node is an Element.');
    equals(Node.ATTRIBUTE_NODE, 2,'The node is an Attr.');
    equals(Node.TEXT_NODE, 3,'The node is a Text node.');
    equals(Node.CDATA_SECTION_NODE, 4,'The node is a CDATASection.');
    equals(Node.ENTITY_REFERENCE_NODE, 5,'The node is an EntityReference.');
    equals(Node.ENTITY_NODE, 6,'The node is an Entity.');
    equals(Node.PROCESSING_INSTRUCTION_NODE, 7,'The node is a ProcessingInstruction.');
    equals(Node.COMMENT_NODE, 8,'The node is a Comment.');
    equals(Node.DOCUMENT_NODE, 9,'The node is a Document.');
    equals(Node.DOCUMENT_TYPE_NODE, 10,'The node is a DocumentType.');
    equals(Node.DOCUMENT_FRAGMENT_NODE, 11,'The node is a DocumentFragment.');
    equals(Node.NOTATION_NODE, 12,'The node is a Notation.');
    
    var doc1,
        doc2,
        doc3,
        doctype1,
        doctype2,
        fragment1,
        fragment2,
        entityReference1,
        entityReference2,
        element1,
        element2,
        attr1,
        attr2,
        pi1,
        pi2,
        comment1,
        comment2,
        text1,
        text2,
        cdata1,
        cdata2,
        entity1,
        entity2,
        notation1,
        notation2,
        clone1,
        clone2,
        NO_MODIFICATION_ALLOWED_ERR_MSG = 
            "Node cannot be inserted at the specified point in the hierarchy",
        WRONG_DOCUMENT_ERR_MSG = 
            "Node cannot be inserted at the specified point in the hierarchy",
        NOT_SUPPORTED_ERR_MSG = 
            "",
        error;
    
    function reset(){
        doctype1 = document.implementation.createDocumentType('xyz', null, 
            "-//WTF//DTD XYZ 5 Final//EN");
        doctype2 = document.implementation.createDocumentType('html', null, 
            'html');
        doctype3 = document.implementation.createDocumentType('xyz', null, 
            "-//WTF//DTD XYZ 5 Final//EN");
        doc1 = document.implementation.createDocument(null, null, doctype1);    
        doc2 = document.implementation.createDocument(null, null, null);
        doc3 = document.implementation.createDocument(null, 'html', doctype2);
        fragment1 = doc1.createDocumentFragment();
        fragment2 = doc1.createDocumentFragment();
        entityReference1 = doc1.createEntityReference('nbsg');
        entityReference2 = doc1.createEntityReference('nbsgnbsg');
        element1 = doc1.createElement('def');
        element2 = doc1.createElement('defdef');
        attr1 = doc1.createAttribute('pqr');
        attr2 = doc1.createAttribute('pqrpqr');
        pi1 = doc1.createProcessingInstruction('ghi', 'jkl=mno');
        pi2 = doc1.createProcessingInstruction('ghighi', 'jkljkl=mnomno');
        comment1 = doc1.createComment('this is a pig. oink, oink');
        comment2 = doc1.createComment('this is a cow. moo, moo');
        text1 = doc1.createTextNode('abcdefghi');
        text2 = doc1.createTextNode('jklmnopqr');
        cdata1 = doc1.createCDATASection('stuv');
        cdata2 = doc1.createCDATASection('wxyz');
        entity1 = null; //can't test these until dom2 or maybe use domparser?
        entity2 = null; //can't test these until dom2 or maybe use domparser?
        notation1 = null; //can't test these until dom2 or maybe use domparser?
        notation2 = null; //can't test these until dom2 or maybe use domparser?
        clone1 = null;
        clone2 = null;
    }
    
    reset();
    TEST = "Document : Method insertBefore(newChild, refChild)";

    reset();
    TEST = "Document : Method replaceChild(newChild, oldChild)";
    
    reset();
    TEST = "Document : Method removeChild(oldChild)";
    
    
    
    /************************
     * Document
     ***********************/
    reset();
    
    TEST = "Document : Node readonly attribute nodeName";
    equals(doc1.nodeName, "#document", TEST);
    doc1.nodeName = "lmnop";
    equals(doc1.nodeName, "#document", TEST);
        
    TEST = "Document : Node attribute nodeValue";
    ok( doc1.nodeValue === undefined || //Mozilla reports undefined
        doc1.nodeValue === null, //Webkit adheres to spec with null 
        TEST );
    doc1.nodeValue = "lmnop";
    ok( doc1.nodeValue === undefined || //Mozilla reports undefined
        doc1.nodeValue === null, //Webkit adheres to spec with null 
        TEST );
        
    TEST = "Document : Node readonly attribute nodeType";
    equals(doc1.nodeType, Node.DOCUMENT_NODE, TEST);
    doc1.nodeType = "lmnop";
    equals(doc1.nodeType, Node.DOCUMENT_NODE, TEST);
    
    TEST = "Document : Node readonly attribute parentNode";
    equals(doc1.parentNode, null, TEST);
    doc1.parentNode = "lmnop";
    equals(doc1.parentNode, null, TEST);
    
    TEST = "Document : Node readonly attribute childNodes";
    ok(doc1.childNodes instanceof(NodeList), TEST+"(w/ doctype)");
    ok(doc1.childNodes.length === 1, TEST+"(w/ doctype)");
    doc1.childNodes = "lmnop";
    ok(doc1.childNodes instanceof(NodeList), TEST+"(w/ doctype)");
    ok(doc1.childNodes.length === 1, TEST+"(w/ doctype)");
    ok(doc2.childNodes instanceof(NodeList), TEST+"(w/o doctype)");
    ok(doc2.childNodes.length === 0, TEST+"(w/o doctype)");
    doc2.childNodes = "lmnop";
    ok(doc2.childNodes instanceof(NodeList), TEST+"(w/o doctype)");
    ok(doc2.childNodes.length === 0, TEST+"(w/o doctype)");
    ok(doc3.childNodes instanceof(NodeList), TEST+"(w/ doctype and root)");
    ok(doc3.childNodes.length === 2, TEST+"(w/ doctype and root)");
    doc3.childNodes = "lmnop";
    ok(doc3.childNodes instanceof(NodeList), TEST+"(w/ doctype and root)");
    ok(doc3.childNodes.length === 2, TEST+"(w/ doctype and root)");
    
    TEST = "Document : Node readonly attribute firstChild";
    equals(doc1.firstChild, doctype1, TEST);
    doc1.firstChild = "lmnop";
    equals(doc1.firstChild, doctype1, TEST);
    
    TEST = "Document : Node readonly attribute lastChild";
    equals(doc1.lastChild, doctype1, TEST);
    doc1.lastChild = "lmnop";
    equals(doc1.lastChild, doctype1, TEST);
    
    TEST = "Document : Node readonly attribute previousSibling";
    equals(doc1.previousSibling, null, TEST);
    doc1.previousSibling = "lmnop";
    equals(doc1.previousSibling, null, TEST);
    
    TEST = "Document : Node readonly attribute nextSibling";
    equals(doc1.nextSibling, null, TEST);
    doc1.nextSibling = "lmnop";
    equals(doc1.nextSibling, null, TEST);
    
    TEST = "Document : Node readonly attribute attributes";
    equals(doc1.attributes, null, TEST);
    doc1.attributes = "lmnop";
    equals(doc1.attributes, null, TEST);
    
    TEST = "Document : Node readonly attribute ownerDocument";
    equals(doc1.ownerDocument, null, TEST);
    doc1.ownerDocument = "lmnop";
    equals(doc1.ownerDocument, null, TEST);
    
    reset();
    TEST = "Document : Methods";
    ok(doc1.appendChild, TEST);
    ok(doc1.cloneNode, TEST);
    ok(doc1.hasChildNodes, TEST);
    ok(doc1.insertBefore, TEST);
    ok(doc1.removeChild, TEST);
    ok(doc1.replaceChild, TEST);
    
    reset();
    TEST = "Document : Method appendChild(newChild)";
    //For HIERARCHY_REQUEST_ERR assertion on appendChild see
    //DOM Level 1 - ( 1.1.1. The DOM Structure Model )
    equals(doc1.appendChild(element1), element1, TEST);
    equals(doc1.childNodes[1], element1, TEST);
    equals(doc1.firstChild, doctype1, TEST);
    equals(doc1.lastChild, element1, TEST);
    element1.appendChild(comment1);
    equals(element1.childNodes[0], comment1, TEST);
    equals(doc1.appendChild(comment1), comment1, TEST);
    equals(element1.childNodes.length, 0, TEST);
    equals(doc1.childNodes[2], comment1, TEST);
    equals(doc1.lastChild, comment1, TEST);
    try{
        //Both Webkit and Mozilla transfer the appended node into 
        //the new document instead of throwing a WRONG_DOCUMENT_ERR
        //This is likely due to higher level dom 3 implementations
        //which provide the importNode interface
        comment2 = doc2.createComment('brother from another mother');
        ok(comment2.ownerDocument !== doc1, TEST+" - ownerDocument different");
        equals(doc1.appendChild(comment2), comment2, TEST);
        ok(comment2.ownerDocument === doc1, TEST+" - ownerDocument transfered");
    }catch(e){
        equals(e.code, DOMException.WRONG_DOCUMENT_ERR, TEST);
    }
    
    reset();
    TEST = "Document : Method cloneNode(deep)";
    try{
        element1.appendChild(text1);
        doc1.appendChild(element1);
        clone1 = doc1.cloneNode(false);
        if(!clone1){
            //Webkit will not clone a Document node, and also not
            //throw a NOT_SUPPORTED_ERR so we are functionally forced to
            //branch the test on an if statement - blah - Mozilla does
            //adhere to the spec in this case, cloning the document
            ok(clone1 === null, "Webkit: "+TEST +" NOT SUPPORTED but NO EXPECTION");
        }else{
            ok(clone1, TEST+": shallow copy ");
            equals(clone1.childNodes.length, 0, TEST+": shallow copy - childNodes");
        
            reset();
            element1.appendChild(text1);
            doc1.appendChild(element1);
            clone1 = doc1.cloneNode(true);
            ok(clone1, TEST+": deep copy ");
            //TODO: it's arguable if these following assertions are truly
            //      sufficient to prove deep cloning.  I suspect that we
            //      actually have to test every property and method since 
            //      reading properties and return values from methods are 
            //      not guaranteed to be reducable to a finite set of 
            //      readable values on the dom node -- though it's likely in
            //      reality implied de facto
            equals(clone1.childNodes.length, 2, TEST+": deep copy - childNodes");
            equals(clone1.childNodes[0].nodeType, doctype1.nodeType, TEST+": deep copy - childNodes");
            equals(clone1.childNodes[0].nodeName, doctype1.nodeName, TEST+": deep copy - childNodes");
            equals(clone1.childNodes[0].nodeValue, doctype1.nodeValue, TEST+": deep copy - childNodes");
            equals(clone1.childNodes[1].nodeType, element1.nodeType, TEST+": deep copy - childNodes");
            equals(clone1.childNodes[1].nodeName, element1.nodeName, TEST+": deep copy - childNodes");
            equals(clone1.childNodes[1].nodeValue, element1.nodeValue, TEST+": deep copy - childNodes");
            element2 = clone1.childNodes[1];
            equals(element2.childNodes[0].nodeType, text1.nodeType, TEST+": deep copy - childNodes");
            equals(element2.childNodes[0].nodeName, text1.nodeName, TEST+": deep copy - childNodes");
            equals(element2.childNodes[0].nodeValue, text1.nodeValue, TEST+": deep copy - childNodes");
        }
    }catch(e){
        equals(e.code, DOMException.NOT_SUPPORTED_ERR, 
            TEST+":"+NOT_SUPPORTED_ERR_MSG);
    }

    reset();
    TEST = "Document : Method hasChildNodes()";
    equals(doc1.hasChildNodes(), true, TEST);
    equals(doc2.hasChildNodes(), false, TEST);
    doc2.appendChild(comment1);
    equals(doc2.hasChildNodes(), true, TEST);
    equals(doc3.hasChildNodes(), true, TEST);
    /************************
     * DocumentFragment
     ***********************/
    reset();
    
    TEST = "DocumentFragment : Node readonly attribute nodeName";
    equals(fragment1.nodeName, "#document-fragment", TEST);
    fragment1.nodeName = "lmnop";
    equals(fragment1.nodeName, "#document-fragment", TEST);
        
    TEST = "DocumentFragment : Node attribute nodeValue";
    ok( fragment1.nodeValue === undefined || //Mozilla reports undefined
        fragment1.nodeValue === null, //Webkit adheres to spec with null 
        TEST );
    fragment1.nodeValue = "lmnop";
    ok( fragment1.nodeValue === undefined || //Mozilla reports undefined
        fragment1.nodeValue === null, //Webkit adheres to spec with null 
        TEST );
        
    TEST = "DocumentFragment : Node readonly attribute nodeType";
    equals(fragment1.nodeType, Node.DOCUMENT_FRAGMENT_NODE, TEST);
    fragment1.nodeType = "lmnop";
    equals(fragment1.nodeType, Node.DOCUMENT_FRAGMENT_NODE, TEST);
    
    TEST = "DocumentFragment : Node readonly attribute parentNode";
    equals(fragment1.parentNode, null, TEST);
    fragment1.parentNode = "lmnop";
    equals(fragment1.parentNode, null, TEST);
    
    TEST = "DocumentFragment : Node readonly attribute childNodes";
    ok(fragment1.childNodes instanceof(NodeList), TEST);
    ok(fragment1.childNodes.length === 0, TEST);
    fragment1.childNodes = "lmnop";
    ok(fragment1.childNodes instanceof(NodeList), TEST);
    ok(fragment1.childNodes.length === 0, TEST);
    
    TEST = "DocumentFragment : Node readonly attribute firstChild";
    equals(fragment1.firstChild, null, TEST);
    fragment1.firstChild = "lmnop";
    equals(fragment1.firstChild, null, TEST);
    
    TEST = "DocumentFragment : Node readonly attribute lastChild";
    equals(fragment1.lastChild, null, TEST);
    fragment1.lastChild = "lmnop";
    equals(fragment1.lastChild, null, TEST);
    
    TEST = "DocumentFragment : Node readonly attribute previousSibling";
    equals(fragment1.previousSibling, null, TEST);
    fragment1.previousSibling = "lmnop";
    equals(fragment1.previousSibling, null, TEST);
    
    TEST = "DocumentFragment : Node readonly attribute nextSibling";
    equals(fragment1.nextSibling, null, TEST);
    fragment1.nextSibling = "lmnop";
    equals(fragment1.nextSibling, null, TEST);
    
    TEST = "DocumentFragment : Node readonly attribute attributes";
    equals(fragment1.attributes, null, TEST);
    fragment1.attributes = "lmnop";
    equals(fragment1.attributes, null, TEST);
    
    TEST = "DocumentFragment : Node readonly attribute ownerDocument";
    equals(fragment1.ownerDocument, doc1, TEST);
    fragment1.ownerDocument = "lmnop";
    equals(fragment1.ownerDocument, doc1, TEST);
     
    reset();
    TEST = "DocumentFragment : Node Methods";
    ok(fragment1.appendChild, TEST);
    ok(fragment1.cloneNode, TEST);
    ok(fragment1.hasChildNodes, TEST);
    ok(fragment1.insertBefore, TEST);
    ok(fragment1.removeChild, TEST);
    ok(fragment1.replaceChild, TEST);
    
    reset();
    TEST = "DocumentFragment : Node Method appendChild(newChild)";
    //For HIERARCHY_REQUEST_ERR assertion on appendChild see
    //DOM Level 1 - ( 1.1.1. The DOM Structure Model )
    equals(fragment1.appendChild(element1), element1, TEST);
    equals(fragment1.childNodes[0], element1, TEST);
    equals(fragment1.firstChild, element1, TEST);
    equals(fragment1.lastChild, element1, TEST);
    element1.appendChild(comment1);
    equals(element1.childNodes[0], comment1, TEST);
    equals(fragment1.appendChild(comment1), comment1, TEST);
    equals(element1.childNodes.length, 0, TEST);
    equals(fragment1.childNodes[1], comment1, TEST);
    equals(fragment1.lastChild, comment1, TEST);
    try{
        //Both Webkit and Mozilla transfer the appended node into 
        //the new document instead of throwing a WRONG_DOCUMENT_ERR
        //This is likely due to higher level dom 3 implementations
        //which provide the importNode interface
        comment2 = doc2.createComment('brother from another mother');
        ok(comment2.ownerDocument !== fragment1.ownerDocument, 
            TEST+" - ownerDocument different");
        equals(fragment1.appendChild(comment2), comment2, TEST);
        ok(comment2.ownerDocument === fragment1.ownerDocument, 
            TEST+" - ownerDocument transfered");
    }catch(e){
        equals(e.code, DOMException.WRONG_DOCUMENT_ERR, TEST);
    }
    
    reset();
    TEST = "DocumentFragment : Node Method cloneNode(deep)";
    try{
        element1.appendChild(text1);
        fragment1.appendChild(element1);
        clone1 = fragment1.cloneNode(false);
        ok(clone1, TEST+": shallow copy ");
        equals(clone1.childNodes.length, 0, TEST+": shallow copy - childNodes");
    
        reset();
        element1.appendChild(text1);
        fragment1.appendChild(element1);
        clone1 = fragment1.cloneNode(true);
        ok(clone1, TEST+": deep copy ");
        equals(clone1.childNodes.length, 1, TEST+": deep copy - childNodes");
        equals(clone1.childNodes[0].nodeType, element1.nodeType, TEST+": deep copy - childNodes");
        equals(clone1.childNodes[0].nodeName, element1.nodeName, TEST+": deep copy - childNodes");
        equals(clone1.childNodes[0].nodeValue, element1.nodeValue, TEST+": deep copy - childNodes");
        element2 = clone1.childNodes[0];
        equals(element2.childNodes[0].nodeType, text1.nodeType, TEST+": deep copy - childNodes");
        equals(element2.childNodes[0].nodeName, text1.nodeName, TEST+": deep copy - childNodes");
        equals(element2.childNodes[0].nodeValue, text1.nodeValue, TEST+": deep copy - childNodes");
    }catch(e){
        equals(e.code, DOMException.NOT_SUPPORTED_ERR, 
            TEST+":"+NOT_SUPPORTED_ERR_MSG);
    }

    reset();
    TEST = "DocumentFragment : Node Method hasChildNodes()";
    equals(fragment1.hasChildNodes(), false, TEST);
    fragment1.appendChild(comment1);
    equals(fragment1.hasChildNodes(), true, TEST);
    
    /************************
     * DocumentType
     ***********************/
    reset();
     
    TEST = "DocumentType : Node readonly attribute nodeName";
    equals(doctype1.nodeName, "xyz", TEST);
    doctype1.nodeName = "lmnop";
    equals(doctype1.nodeName, "xyz", TEST);

    TEST = "DocumentType : Node attribute nodeValue";
    ok( doctype1.nodeValue === undefined || //Mozilla reports undefined
        doctype1.nodeValue === null, //Webkit adheres to spec with null 
        TEST );
    doctype1.nodeValue = "lmnop";
    ok( doctype1.nodeValue === undefined || //Mozilla reports undefined
        doctype1.nodeValue === null, //Webkit adheres to spec with null 
        TEST );

    TEST = "DocumentType : Node readonly attribute nodeType";
    equals(doctype1.nodeType, Node.DOCUMENT_TYPE_NODE, TEST);
    doctype1.nodeType = "lmnop";
    equals(doctype1.nodeType, Node.DOCUMENT_TYPE_NODE, TEST);

    TEST = "DocumentType : Node readonly attribute parentNode";
    equals(doctype1.parentNode, doc1, TEST);
    doctype1.parentNode = "lmnop";
    equals(doctype1.parentNode, doc1, TEST);
    equals(doctype3.parentNode, null, TEST);
    doctype3.parentNode = "lmnop";
    equals(doctype3.parentNode, null, TEST);

    TEST = "DocumentType : Node readonly attribute childNodes";
    ok(doctype1.childNodes instanceof(NodeList), TEST);
    ok(doctype1.childNodes.length === 0, TEST);
    doctype1.childNodes = "lmnop";
    ok(doctype1.childNodes instanceof(NodeList), TEST);
    ok(doctype1.childNodes.length === 0, TEST);

    TEST = "DocumentType : Node readonly attribute firstChild";
    equals(doctype1.firstChild, null, TEST);
    doctype1.firstChild = "lmnop";
    equals(doctype1.firstChild, null, TEST);

    TEST = "DocumentType : Node readonly attribute lastChild";
    equals(doctype1.lastChild, null, TEST);
    doctype1.lastChild = "lmnop";
    equals(doctype1.lastChild, null, TEST);

    TEST = "DocumentType : Node readonly attribute previousSibling";
    equals(doctype1.previousSibling, null, TEST);
    doctype1.previousSibling = "lmnop";
    equals(doctype1.previousSibling, null, TEST);

    TEST = "DocumentType : Node readonly attribute nextSibling";
    equals(doctype1.nextSibling, null, TEST);
    doctype1.nextSibling = "lmnop";
    equals(doctype1.nextSibling, null, TEST);

    TEST = "DocumentType : Node readonly attribute attributes";
    equals(doctype1.attributes, null, TEST);
    doctype1.attributes = "lmnop";
    equals(doctype1.attributes, null, TEST);

    TEST = "DocumentType : Node readonly attribute ownerDocument";
    equals(doctype1.ownerDocument, doc1, TEST);
    doctype1.ownerDocument = "lmnop";
    equals(doctype1.ownerDocument, doc1, TEST);
    equals(doctype3.ownerDocument, null, TEST);
    doctype3.ownerDocument = "lmnop";
    equals(doctype3.ownerDocument, null, TEST);
     
    reset();
    TEST = "DocumentType : Node Methods";
    ok(doctype1.appendChild, TEST);
    ok(doctype1.cloneNode, TEST);
    ok(doctype1.hasChildNodes, TEST);
    ok(doctype1.insertBefore, TEST);
    ok(doctype1.removeChild, TEST);
    ok(doctype1.replaceChild, TEST);
    
    reset();
    TEST = "DocumentType : Node Method appendChild(newChild)";
    //For HIERARCHY_REQUEST_ERR assertion on appendChild see
    //DOM Level 1 - ( 1.1.1. The DOM Structure Model )
    ok(true, TEST + 'TODO: test appending entity and entity refs?');
    
    reset();
    TEST = "DocumentType : Node Method cloneNode(deep)";
    try{
        clone1 = doctype1.cloneNode(false);
        ok(clone1, TEST+": shallow copy ");
        equals(clone1.childNodes.length, 0, TEST+": shallow copy - childNodes");
    
        reset();
        clone1 = doctype1.cloneNode(true);
        ok(clone1, TEST+": TODO deep copy with enity and notations?");
    }catch(e){
        equals(e.code, DOMException.NOT_SUPPORTED_ERR, 
            TEST+":"+NOT_SUPPORTED_ERR_MSG);
    }
    
    reset();
    TEST = "DocumentType : Node Method hasChildNodes()";
    equals(doctype1.hasChildNodes(), false, TEST);
    
    /************************
     * EntityReference
     ***********************/
    reset();
    ok(true, "TODO:TEST EntityReference : Node Attributes");
    
    /************************
     * Element
     ***********************/
    reset();
    TEST = "Element : Node readonly attribute nodeName";
    equals(element1.nodeName, "def", TEST);
    element1.nodeName = "lmnop";
    equals(element1.nodeName, "def", TEST);

    TEST = "Element : Node attribute nodeValue";
    ok( element1.nodeValue === undefined || //Mozilla reports undefined
        element1.nodeValue === null, //Webkit adheres to spec with null 
        TEST );
    element1.nodeValue = "lmnop";
    ok( element1.nodeValue === undefined || //Mozilla reports undefined
        element1.nodeValue === null, //Webkit adheres to spec with null 
        TEST );

    TEST = "Element : Node readonly attribute nodeType";
    equals(element1.nodeType, Node.ELEMENT_NODE, TEST);
    element1.nodeType = "lmnop";
    equals(element1.nodeType, Node.ELEMENT_NODE, TEST);

    TEST = "Element : Node readonly attribute parentNode";
    equals(element1.parentNode, null, TEST);
    element1.parentNode = "lmnop";
    equals(element1.parentNode, null, TEST);

    TEST = "Element : Node readonly attribute childNodes";
    ok(element1.childNodes instanceof(NodeList), TEST);
    ok(element1.childNodes.length === 0, TEST);
    element1.childNodes = "lmnop";
    ok(element1.childNodes instanceof(NodeList), TEST);
    ok(element1.childNodes.length === 0, TEST);

    TEST = "Element : Node readonly attribute firstChild";
    equals(element1.firstChild, null, TEST);
    element1.firstChild = "lmnop";
    equals(element1.firstChild, null, TEST);

    TEST = "Element : Node readonly attribute lastChild";
    equals(element1.lastChild, null, TEST);
    element1.lastChild = "lmnop";
    equals(element1.lastChild, null, TEST);

    TEST = "Element : Node readonly attribute previousSibling";
    equals(element1.previousSibling, null, TEST);
    element1.previousSibling = "lmnop";
    equals(element1.previousSibling, null, TEST);

    TEST = "Element : Node readonly attribute nextSibling";
    equals(element1.nextSibling, null, TEST);
    element1.nextSibling = "lmnop";
    equals(element1.nextSibling, null, TEST);

    TEST = "Element : Node readonly attribute attributes";
    ok(element1.attributes instanceof(NamedNodeMap), TEST);
    ok(element1.attributes.length === 0, TEST);
    element1.attributes = "lmnop";
    ok(element1.attributes instanceof(NamedNodeMap), TEST);
    ok(element1.attributes.length === 0, TEST);

    TEST = "Element : Node readonly attribute ownerDocument";
    equals(element1.ownerDocument, doc1, TEST);
    element1.ownerDocument = "lmnop";
    equals(element1.ownerDocument, doc1, TEST);
     
    reset();
    TEST = "Element : Node Methods";
    ok(element1.appendChild, TEST);
    ok(element1.cloneNode, TEST);
    ok(element1.hasChildNodes, TEST);
    ok(element1.insertBefore, TEST);
    ok(element1.removeChild, TEST);
    ok(element1.replaceChild, TEST);
    
    reset();
    TEST = "Element : Node Method appendChild(newChild)";
    //For HIERARCHY_REQUEST_ERR assertion on appendChild see
    //DOM Level 1 - ( 1.1.1. The DOM Structure Model )
    equals(element2.appendChild(element1), element1, TEST);
    equals(element2.childNodes[0], element1, TEST);
    equals(element2.firstChild, element1, TEST);
    equals(element2.lastChild, element1, TEST);
    element1.appendChild(comment1);
    equals(element1.childNodes[0], comment1, TEST);
    equals(element2.appendChild(comment1), comment1, TEST);
    equals(element1.childNodes.length, 0, TEST);
    equals(element2.childNodes[1], comment1, TEST);
    equals(element2.lastChild, comment1, TEST);
    try{
        //Both Webkit and Mozilla transfer the appended node into 
        //the new document instead of throwing a WRONG_DOCUMENT_ERR
        //This is likely due to higher level dom 3 implementations
        //which provide the importNode interface
        comment2 = doc2.createComment('brother from another mother');
        ok(comment2.ownerDocument !== element2.ownerDocument, 
            TEST+" - ownerDocument different");
        equals(element2.appendChild(comment2), comment2, TEST);
        ok(comment2.ownerDocument === element2.ownerDocument, 
            TEST+" - ownerDocument transfered");
    }catch(e){
        equals(e.code, DOMException.WRONG_DOCUMENT_ERR, TEST);
    }
    
    reset();
    TEST = "Element : Method cloneNode(deep)";
    try{
        element1.appendChild(text1);
        element2.appendChild(element1);
        clone1 = element2.cloneNode(false);
        ok(clone1, TEST+": shallow copy ");
        equals(clone1.childNodes.length, 0, TEST+": shallow copy - childNodes");
    
        reset();
        element1.appendChild(text1);
        element2.appendChild(element1);
        clone1 = element2.cloneNode(true);
        ok(clone1, TEST+": deep copy ");
        equals(clone1.childNodes.length, 1, TEST+": deep copy - childNodes");
        equals(clone1.childNodes[0].nodeType, element1.nodeType, TEST+": deep copy - childNodes");
        equals(clone1.childNodes[0].nodeName, element1.nodeName, TEST+": deep copy - childNodes");
        equals(clone1.childNodes[0].nodeValue, element1.nodeValue, TEST+": deep copy - childNodes");
        clone2 = clone1.childNodes[0];
        equals(clone2.childNodes[0].nodeType, text1.nodeType, TEST+": deep copy - childNodes");
        equals(clone2.childNodes[0].nodeName, text1.nodeName, TEST+": deep copy - childNodes");
        equals(clone2.childNodes[0].nodeValue, text1.nodeValue, TEST+": deep copy - childNodes");
    }catch(e){
        equals(e.code, DOMException.NOT_SUPPORTED_ERR, 
            TEST+":"+NOT_SUPPORTED_ERR_MSG);
    }

    reset();
    TEST = "Document : Method hasChildNodes()";
    equals(element2.hasChildNodes(), false, TEST);
    element2.appendChild(comment1);
    equals(element2.hasChildNodes(), true, TEST);
    
    /************************
     * Attr
     ***********************/
    reset();
    
    TEST = "Attr : Node readonly attribute nodeName";
    equals(attr1.nodeName, "pqr", TEST);
    attr1.nodeName = "lmnop";
    equals(attr1.nodeName, "pqr", TEST);

    TEST = "Attr : Node attribute nodeValue";
    equals( attr1.nodeValue, "", TEST );
    //this affects the rest of the tests since now the
    //nodeValue for attr1 is not the default nodeValue
    //so several tests check attr2 for default value
    attr1.nodeValue = "lmnop";
    equals( attr1.nodeValue, "lmnop", TEST );

    TEST = "Attr : Node readonly attribute nodeType";
    equals(attr1.nodeType, Node.ATTRIBUTE_NODE, TEST);
    attr1.nodeType = "lmnop";
    equals(attr1.nodeType, Node.ATTRIBUTE_NODE, TEST);

    TEST = "Attr : Node readonly attribute parentNode";
    equals(attr1.parentNode, null, TEST);
    attr1.parentNode = "lmnop";
    equals(attr1.parentNode, null, TEST);

    TEST = "Attr : Node readonly attribute childNodes";
    ok(attr1.childNodes instanceof(NodeList), TEST);
    ok(attr1.childNodes.length === 1, TEST);
    attr1.childNodes = "lmnop";
    ok(attr1.childNodes instanceof(NodeList), TEST);
    ok(attr1.childNodes.length === 1, TEST);
    ok(attr2.childNodes instanceof(NodeList), TEST);
    ok(attr2.childNodes.length === 0, TEST);
    attr2.childNodes = "lmnop";
    ok(attr2.childNodes instanceof(NodeList), TEST);
    ok(attr2.childNodes.length === 0, TEST);

    TEST = "Attr : Node readonly attribute firstChild";
    ok(attr1.firstChild !== null, TEST);
    attr1.firstChild = "lmnop";
    ok(attr1.firstChild !== "lmnop", TEST);
    equals(attr2.firstChild, null, TEST);
    attr2.firstChild = "lmnop";
    equals(attr2.firstChild, null, TEST);

    TEST = "Attr : Node readonly attribute lastChild";
    ok(attr1.lastChild !== null, TEST);
    attr1.lastChild = "lmnop";
    ok(attr1.lastChild !== "lmnop", TEST);
    equals(attr2.lastChild, null, TEST);
    attr2.lastChild = "lmnop";
    equals(attr2.lastChild, null, TEST);

    TEST = "Attr : Node readonly attribute previousSibling";
    equals(attr1.previousSibling, null, TEST);
    attr1.previousSibling = "lmnop";
    equals(attr1.previousSibling, null, TEST);

    TEST = "Attr : Node readonly attribute nextSibling";
    equals(attr1.nextSibling, null, TEST);
    attr1.nextSibling = "lmnop";
    equals(attr1.nextSibling, null, TEST);

    TEST = "Attr : Node readonly attribute attributes";
    equals(attr1.attributes, null, TEST);
    attr1.attributes = "lmnop";
    equals(attr1.attributes, null, TEST);

    TEST = "Attr : Node readonly attribute ownerDocument";
    equals(attr1.ownerDocument, doc1, TEST);
    attr1.ownerDocument = "lmnop";
    equals(attr1.ownerDocument, doc1, TEST);
     
    reset();
    TEST = "Attr : Node Methods";
    ok(attr1.appendChild, TEST);
    ok(attr1.cloneNode, TEST);
    ok(attr1.hasChildNodes, TEST);
    ok(attr1.insertBefore, TEST);
    ok(attr1.removeChild, TEST);
    ok(attr1.replaceChild, TEST);
    
    reset();
    TEST = "Attr : Node Method appendChild(newChild)";
    //For HIERARCHY_REQUEST_ERR assertion on appendChild see
    //DOM Level 1 - ( 1.1.1. The DOM Structure Model )
    try{
        //Webkit,imho, adhere's most closely to the spirit of
        //the node interface allowing you to use appendChild
        ok(attr1.appendChild(text1) === text1, TEST);
        ok(attr1.childNodes[0] === text1, TEST);
        ok(attr1.firstChild === text1, TEST);
        ok(attr1.lastChild === text1, TEST);
        ok(attr1.nodeValue === text1.nodeValue, TEST);
        ok(attr1.appendChild(text2) === text2, TEST);
        ok(attr1.childNodes[1] === text2, TEST);
        ok(attr1.firstChild === text1, TEST);
        ok(attr1.lastChild === text2, TEST);
        ok(attr1.nodeValue === text1.nodeValue + text2.nodeValue, TEST);
    }catch(e){
        //Mozilla doesnt let you directly append a text node
        equals(e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    } finally {
        //these approachs should work for both Webkit and Mozilla
        attr1.nodeValue = text1.nodeValue;
        ok(attr1.childNodes[0].nodeValue === text1.nodeValue, TEST);
        attr1.nodeValue += text2.nodeValue;
        ok(attr1.childNodes[0].nodeValue === text1.nodeValue + text2.nodeValue, TEST);
    }
    try{
        //Webkit,imho, adhere's most closely to the spirit of
        //the node interface allowing you to use appendChild
        text2 = doc2.createTextNode('brother from another mother');
        ok(attr2.ownerDocument !== text2.ownerDocument, 
            TEST+" - ownerDocument different");
        ok(attr2.appendChild(text2) === text2, TEST);
        ok(attr2.ownerDocument === text2.ownerDocument, 
            TEST+" - ownerDocument transfered");
    }catch(e){
        //Mozilla doesnt let you directly append a text node
        ok(e.code === DOMException.WRONG_DOCUMENT_ERR ||
           e.code === DOMException.HIERARCHY_REQUEST_ERR, 
            TEST+": DOMException "+e.code);
    }finally{
        //this is not really an issue when using string literals
        //these approachs should work for both Webkit and Mozilla
        text2 = doc2.createTextNode('brother from another mother');
        attr1.nodeValue = text2.nodeValue;
        ok(attr1.childNodes[0].nodeValue === 'brother from another mother', TEST);
    }
    
    reset();
    TEST = "Attr : Node Method cloneNode(deep)";
    try{
        //Webkit,imho, adhere's most closely to the spirit of
        //the node interface allowing you to use appendChild
        attr1.appendChild(text1);
        clone1 = attr1.cloneNode(false);
        ok(clone1, TEST+": shallow copy ");
        equals(clone1.childNodes.length, 1, TEST+": shallow copy - childNodes");
    
        reset();
        attr1.appendChild(text1);
        clone1 = attr1.cloneNode(true);
        ok(clone1, TEST+": deep copy ");
        equals(clone1.childNodes.length, 1, TEST+": deep copy - childNodes");
        equals(clone1.childNodes[0].nodeType, text1.nodeType, TEST+": deep copy - childNodes");
        equals(clone1.childNodes[0].nodeName, text1.nodeName, TEST+": deep copy - childNodes");
        equals(clone1.childNodes[0].nodeValue, text1.nodeValue, TEST+": deep copy - childNodes");
    }catch(e){
        //Mozilla doesnt let you directly append a text node
        equals(e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }finally{
        attr2.nodeValue = text1.nodeValue;
        clone1 = attr2.cloneNode(false);
        ok(clone1, TEST+": shallow copy ");
        equals(clone1.childNodes.length, 1, TEST+": shallow copy - childNodes");
        
        reset();
        attr2.nodeValue = text1.nodeValue;
        clone1 = attr2.cloneNode(true);
        ok(clone1, TEST+": deep copy ");
        equals(clone1.childNodes.length, 1, TEST+": deep copy - childNodes");
        equals(clone1.childNodes[0].nodeType, text1.nodeType, TEST+": deep copy - childNodes");
        equals(clone1.childNodes[0].nodeName, text1.nodeName, TEST+": deep copy - childNodes");
        equals(clone1.childNodes[0].nodeValue, text1.nodeValue, TEST+": deep copy - childNodes");
    }

    reset();
    TEST = "Attr : Node Method hasChildNodes()";
    equals(attr1.hasChildNodes(), false, TEST);
    try{
        //Webkit,imho, adhere's most closely to the spirit of
        //the node interface allowing you to use appendChild
        attr1.appendChild(text1);
        equals(attr1.hasChildNodes(), true, TEST);
    }catch(e){
        //Mozilla doesnt let you directly append a text node
        equals(e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    }finally{
        //these approachs should work for both Webkit and Mozilla
        equals(attr2.hasChildNodes(), false, TEST);
        attr2.nodeValue = text2.nodeValue;
        equals(attr2.hasChildNodes(), true, TEST);
    }
    
    /************************
     * ProcessingInstruction
     ***********************/
    reset();
    
    TEST = "ProcessingInstruction : Node readonly attribute nodeName";
    equals(pi1.nodeName, "ghi", TEST);
    pi1.nodeName = "lmnop";
    equals(pi1.nodeName, "ghi", TEST);

    TEST = "ProcessingInstruction : Node attribute nodeValue";
    equals( pi1.nodeValue, "jkl=mno", TEST );
    pi1.nodeValue = "lmn=op";
    equals( pi1.nodeValue, "lmn=op", TEST );

    TEST = "ProcessingInstruction : Node readonly attribute nodeType";
    equals(pi1.nodeType, Node.PROCESSING_INSTRUCTION_NODE, TEST);
    pi1.nodeType = "lmnop";
    equals(pi1.nodeType, Node.PROCESSING_INSTRUCTION_NODE, TEST);

    TEST = "ProcessingInstruction : Node readonly attribute parentNode";
    equals(pi1.parentNode, null, TEST);
    pi1.parentNode = "lmnop";
    equals(pi1.parentNode, null, TEST);

    TEST = "ProcessingInstruction : Node readonly attribute childNodes";
    ok(pi1.childNodes instanceof(NodeList), TEST);
    ok(pi1.childNodes.length === 0, TEST);
    pi1.childNodes = "lmnop";
    ok(pi1.childNodes instanceof(NodeList), TEST);
    ok(pi1.childNodes.length === 0, TEST);

    TEST = "ProcessingInstruction : Node readonly attribute firstChild";
    equals(pi1.firstChild, null, TEST);
    pi1.firstChild = "lmnop";
    equals(pi1.firstChild, null, TEST);

    TEST = "ProcessingInstruction : Node readonly attribute lastChild";
    equals(pi1.lastChild, null, TEST);
    pi1.lastChild = "lmnop";
    equals(pi1.lastChild, null, TEST);

    TEST = "ProcessingInstruction : Node readonly attribute previousSibling";
    equals(pi1.previousSibling, null, TEST);
    pi1.previousSibling = "lmnop";
    equals(pi1.previousSibling, null, TEST);

    TEST = "ProcessingInstruction : Node readonly attribute nextSibling";
    equals(pi1.nextSibling, null, TEST);
    pi1.nextSibling = "lmnop";
    equals(pi1.nextSibling, null, TEST);

    TEST = "ProcessingInstruction : Node readonly attribute attributes";
    equals(pi1.attributes, null, TEST);
    pi1.attributes = "lmnop";
    equals(pi1.attributes, null, TEST);

    TEST = "ProcessingInstruction : Node readonly attribute ownerDocument";
    equals(pi1.ownerDocument, doc1, TEST);
    pi1.ownerDocument = "lmnop";
    equals(pi1.ownerDocument, doc1, TEST);
      
    reset();
    TEST = "ProcessingInstruction : Node Methods";
    ok(pi1.appendChild, TEST);
    ok(pi1.cloneNode, TEST);
    ok(pi1.hasChildNodes, TEST);
    ok(pi1.insertBefore, TEST);
    ok(pi1.removeChild, TEST);
    ok(pi1.replaceChild, TEST);
    
    reset();
    TEST = "ProcessingInstruction : Node Method appendChild(newChild)";
    //For more HIERARCHY_REQUEST_ERR assertion on appendChild see
    //DOM Level 1 - ( 1.1.1. The DOM Structure Model )
    try{
        //Webkit and Mozilla agree this is not what the spec intends
        ok(pi1.appendChild(text1) === text1, TEST);
    }catch(e){
        equals(e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    } finally {
        //these approachs should work for both Webkit and Mozilla
        pi1.nodeValue = text1.nodeValue;
        ok(pi1.childNodes.length === 0, TEST);
    }
    
    reset();
    TEST = "ProcessingInstruction : Node Method cloneNode(deep)";
    pi2.nodeValue = text1.nodeValue;
    clone1 = pi2.cloneNode(false);
    ok(clone1, TEST+": shallow copy ");
    equals(clone1.childNodes.length, 0, TEST+": shallow copy - childNodes");
    equals(clone1.nodeValue, pi2.nodeValue, TEST+": shallow copy - childNodes");
    
    reset();
    pi2.nodeValue = text1.nodeValue;
    clone1 = pi2.cloneNode(true);
    ok(clone1, TEST+": deep copy ");
    equals(pi2.childNodes.length, 0, TEST+": deep copy - childNodes");
    equals(clone1.childNodes.length, 0, TEST+": deep copy - childNodes");
    equals(clone1.nodeType, pi2.nodeType, TEST+": deep copy - childNodes");
    equals(clone1.nodeName, pi2.nodeName, TEST+": deep copy - childNodes");
    equals(clone1.nodeValue, pi2.nodeValue, TEST+": deep copy - childNodes");


    reset();
    TEST = "ProcessingInstruction : Node Method hasChildNodes()";
    equals(pi1.hasChildNodes(), false, TEST);
    
    
    /************************
     * Comment
     ***********************/
    reset();
    
    TEST = "Comment : Node readonly attribute nodeName";
    equals(comment1.nodeName, "#comment", TEST);
    comment1.nodeName = "lmnop";
    equals(comment1.nodeName, "#comment", TEST);

    TEST = "Comment : Node attribute nodeValue";
    equals( comment1.nodeValue, "this is a pig. oink, oink", TEST );
    comment1.nodeValue = "this is a duck. quack, quack";
    equals( comment1.nodeValue, "this is a duck. quack, quack", TEST );

    TEST = "Comment : Node readonly attribute nodeType";
    equals(comment1.nodeType, Node.COMMENT_NODE, TEST);
    comment1.nodeType = "lmnop";
    equals(comment1.nodeType, Node.COMMENT_NODE, TEST);

    TEST = "Comment : Node readonly attribute parentNode";
    equals(comment1.parentNode, null, TEST);
    comment1.parentNode = "lmnop";
    equals(comment1.parentNode, null, TEST);

    TEST = "Comment : Node readonly attribute childNodes";
    ok(comment1.childNodes instanceof(NodeList), TEST);
    ok(comment1.childNodes.length === 0, TEST);
    comment1.childNodes = "lmnop";
    ok(comment1.childNodes instanceof(NodeList), TEST);
    ok(comment1.childNodes.length === 0, TEST);

    TEST = "Comment : Node readonly attribute firstChild";
    equals(comment1.firstChild, null, TEST);
    comment1.firstChild = "lmnop";
    equals(comment1.firstChild, null, TEST);

    TEST = "Comment : Node readonly attribute lastChild";
    equals(comment1.lastChild, null, TEST);
    comment1.lastChild = "lmnop";
    equals(comment1.lastChild, null, TEST);

    TEST = "Comment : Node readonly attribute previousSibling";
    equals(comment1.previousSibling, null, TEST);
    comment1.previousSibling = "lmnop";
    equals(comment1.previousSibling, null, TEST);

    TEST = "Comment : Node readonly attribute nextSibling";
    equals(comment1.nextSibling, null, TEST);
    comment1.nextSibling = "lmnop";
    equals(comment1.nextSibling, null, TEST);

    TEST = "Comment : Node readonly attribute attributes";
    equals(comment1.attributes, null, TEST);
    comment1.attributes = "lmnop";
    equals(comment1.attributes, null, TEST);

    TEST = "Comment : Node readonly attribute ownerDocument";
    equals(comment1.ownerDocument, doc1, TEST);
    comment1.ownerDocument = "lmnop";
    equals(comment1.ownerDocument, doc1, TEST);
    
    reset();
    TEST = "Comment : Node Methods";
    ok(comment1.appendChild, TEST);
    ok(comment1.cloneNode, TEST);
    ok(comment1.hasChildNodes, TEST);
    ok(comment1.insertBefore, TEST);
    ok(comment1.removeChild, TEST);
    ok(comment1.replaceChild, TEST);
    
    reset();
    TEST = "Comment : Node Method appendChild(newChild)";
    //For more HIERARCHY_REQUEST_ERR assertion on appendChild see
    //DOM Level 1 - ( 1.1.1. The DOM Structure Model )
    try{
        //Webkit and Mozilla agree this is not what the spec intends
        ok(comment1.appendChild(text1) === text1, TEST);
    }catch(e){
        equals(e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    } finally {
        //these approachs should work for both Webkit and Mozilla
        comment1.nodeValue = text1.nodeValue;
        ok(comment1.childNodes.length === 0, TEST);
    }
    
    reset();
    TEST = "Comment : Node Method cloneNode(deep)";
    comment1.nodeValue = text1.nodeValue;
    clone1 = comment1.cloneNode(false);
    ok(clone1, TEST+": shallow copy ");
    equals(clone1.childNodes.length, 0, TEST+": shallow copy - childNodes");
    equals(clone1.nodeValue, comment1.nodeValue, TEST+": shallow copy - childNodes");
    
    reset();
    comment1.nodeValue = text1.nodeValue;
    clone1 = comment1.cloneNode(true);
    ok(clone1, TEST+": deep copy ");
    equals(comment1.childNodes.length, 0, TEST+": deep copy - childNodes");
    equals(clone1.childNodes.length, 0, TEST+": deep copy - childNodes");
    equals(clone1.nodeType, comment1.nodeType, TEST+": deep copy - childNodes");
    equals(clone1.nodeName, comment1.nodeName, TEST+": deep copy - childNodes");
    equals(clone1.nodeValue, comment1.nodeValue, TEST+": deep copy - childNodes");

    reset();
    TEST = "Comment : Node Method hasChildNodes()";
    equals(comment1.hasChildNodes(), false, TEST);
    
    /************************
     * Text
     ***********************/  
    reset(); 
    
    TEST = "Text : Node readonly attribute nodeName";
    equals(text1.nodeName, "#text", TEST);
    text1.nodeName = "lmnop";
    equals(text1.nodeName, "#text", TEST);

    TEST = "Text : Node attribute nodeValue";
    equals( text1.nodeValue, "abcdefghi", TEST );
    text1.nodeValue = "jklmnopqrstuvwxyz";
    equals( text1.nodeValue, "jklmnopqrstuvwxyz", TEST );

    TEST = "Text : Node readonly attribute nodeType";
    equals(text1.nodeType, Node.TEXT_NODE, TEST);
    text1.nodeType = "lmnop";
    equals(text1.nodeType, Node.TEXT_NODE, TEST);

    TEST = "Text : Node readonly attribute parentNode";
    equals(text1.parentNode, null, TEST);
    text1.parentNode = "lmnop";
    equals(text1.parentNode, null, TEST);

    TEST = "Text : Node readonly attribute childNodes";
    ok(text1.childNodes instanceof(NodeList), TEST);
    ok(text1.childNodes.length === 0, TEST);
    text1.childNodes = "lmnop";
    ok(text1.childNodes instanceof(NodeList), TEST);
    ok(text1.childNodes.length === 0, TEST);

    TEST = "Text : Node readonly attribute firstChild";
    equals(text1.firstChild, null, TEST);
    text1.firstChild = "lmnop";
    equals(text1.firstChild, null, TEST);

    TEST = "Text : Node readonly attribute lastChild";
    equals(text1.lastChild, null, TEST);
    text1.lastChild = "lmnop";
    equals(text1.lastChild, null, TEST);

    TEST = "Text : Node readonly attribute previousSibling";
    equals(text1.previousSibling, null, TEST);
    text1.previousSibling = "lmnop";
    equals(text1.previousSibling, null, TEST);

    TEST = "Text : Node readonly attribute nextSibling";
    equals(text1.nextSibling, null, TEST);
    text1.nextSibling = "lmnop";
    equals(text1.nextSibling, null, TEST);

    TEST = "Text : Node readonly attribute attributes";
    equals(text1.attributes, null, TEST);
    text1.attributes = "lmnop";
    equals(text1.attributes, null, TEST);

    TEST = "Text : Node readonly attribute ownerDocument";
    equals(text1.ownerDocument, doc1, TEST);
    text1.ownerDocument = "lmnop";
    equals(text1.ownerDocument, doc1, TEST);
    
    reset();
    TEST = "Text : Node Methods";
    ok(text1.appendChild, TEST);
    ok(text1.cloneNode, TEST);
    ok(text1.hasChildNodes, TEST);
    ok(text1.insertBefore, TEST);
    ok(text1.removeChild, TEST);
    ok(text1.replaceChild, TEST);
    
    reset();
    TEST = "Text : Node Method appendChild(newChild)";
    //For more HIERARCHY_REQUEST_ERR assertion on appendChild see
    //DOM Level 1 - ( 1.1.1. The DOM Structure Model )
    try{
        //Webkit and Mozilla agree this is not what the spec intends
        ok(text2.appendChild(text1) === text1, TEST);
    }catch(e){
        equals(e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    } finally {
        //these approachs should work for both Webkit and Mozilla
        text2.nodeValue = text1.nodeValue;
        ok(text2.childNodes.length === 0, TEST);
    }
    
    reset();
    TEST = "Text : Node Method cloneNode(deep)";
    text2.nodeValue = text1.nodeValue;
    clone1 = text2.cloneNode(false);
    ok(clone1, TEST+": shallow copy ");
    equals(clone1.childNodes.length, 0, TEST+": shallow copy - childNodes");
    equals(clone1.nodeValue, text2.nodeValue, TEST+": shallow copy - childNodes");
    
    reset();
    text2.nodeValue = text1.nodeValue;
    clone1 = text2.cloneNode(true);
    ok(clone1, TEST+": deep copy ");
    equals(text2.childNodes.length, 0, TEST+": deep copy - childNodes");
    equals(clone1.childNodes.length, 0, TEST+": deep copy - childNodes");
    equals(clone1.nodeType, text2.nodeType, TEST+": deep copy - childNodes");
    equals(clone1.nodeName, text2.nodeName, TEST+": deep copy - childNodes");
    equals(clone1.nodeValue, text2.nodeValue, TEST+": deep copy - childNodes");

    reset();
    TEST = "Text : Node Method hasChildNodes()";
    equals(text2.hasChildNodes(), false, TEST);
    
    /************************
     * CDATASection
     ***********************/
    reset();
    
    TEST = "CDATASection : Node readonly attribute nodeName";
    equals(cdata1.nodeName, "#cdata-section", TEST);
    cdata1.nodeName = "lmnop";
    equals(cdata1.nodeName, "#cdata-section", TEST);

    TEST = "CDATASection : Node attribute nodeValue";
    equals( cdata1.nodeValue, "stuv", TEST );
    cdata1.nodeValue = "wxyz";
    equals( cdata1.nodeValue, "wxyz", TEST );

    TEST = "CDATASection : Node readonly attribute nodeType";
    equals(cdata1.nodeType, Node.CDATA_SECTION_NODE, TEST);
    cdata1.nodeType = "lmnop";
    equals(cdata1.nodeType, Node.CDATA_SECTION_NODE, TEST);

    TEST = "CDATASection : Node readonly attribute parentNode";
    equals(cdata1.parentNode, null, TEST);
    cdata1.parentNode = "lmnop";
    equals(cdata1.parentNode, null, TEST);

    TEST = "CDATASection : Node readonly attribute childNodes";
    ok(cdata1.childNodes instanceof(NodeList), TEST);
    ok(cdata1.childNodes.length === 0, TEST);
    cdata1.childNodes = "lmnop";
    ok(cdata1.childNodes instanceof(NodeList), TEST);
    ok(cdata1.childNodes.length === 0, TEST);

    TEST = "CDATASection : Node readonly attribute firstChild";
    equals(cdata1.firstChild, null, TEST);
    cdata1.firstChild = "lmnop";
    equals(cdata1.firstChild, null, TEST);

    TEST = "CDATASection : Node readonly attribute lastChild";
    equals(cdata1.lastChild, null, TEST);
    cdata1.lastChild = "lmnop";
    equals(cdata1.lastChild, null, TEST);

    TEST = "CDATASection : Node readonly attribute previousSibling";
    equals(cdata1.previousSibling, null, TEST);
    cdata1.previousSibling = "lmnop";
    equals(cdata1.previousSibling, null, TEST);

    TEST = "CDATASection : Node readonly attribute nextSibling";
    equals(cdata1.nextSibling, null, TEST);
    cdata1.nextSibling = "lmnop";
    equals(cdata1.nextSibling, null, TEST);

    TEST = "CDATASection : Node readonly attribute attributes";
    equals(cdata1.attributes, null, TEST);
    cdata1.attributes = "lmnop";
    equals(cdata1.attributes, null, TEST);

    TEST = "CDATASection : Node readonly attribute ownerDocument";
    equals(cdata1.ownerDocument, doc1, TEST);
    cdata1.ownerDocument = "lmnop";
    equals(cdata1.ownerDocument, doc1, TEST);
    
    reset();
    TEST = "CDATASection : Node Methods";
    ok(cdata1.appendChild, TEST);
    ok(cdata1.cloneNode, TEST);
    ok(cdata1.hasChildNodes, TEST);
    ok(cdata1.insertBefore, TEST);
    ok(cdata1.removeChild, TEST);
    ok(cdata1.replaceChild, TEST);
    
    reset();
    TEST = "CDATASection : Node Method appendChild(newChild)";
    //For more HIERARCHY_REQUEST_ERR assertion on appendChild see
    //DOM Level 1 - ( 1.1.1. The DOM Structure Model )
    try{
        //Webkit and Mozilla agree this is not what the spec intends
        ok(cdata1.appendChild(text1) === text1, TEST);
    }catch(e){
        equals(e.code, DOMException.HIERARCHY_REQUEST_ERR, TEST);
    } finally {
        //these approachs should work for both Webkit and Mozilla
        cdata1.nodeValue = text1.nodeValue;
        ok(cdata1.childNodes.length === 0, TEST);
    }
    
    reset();
    TEST = "CDATASection : Node Method cloneNode(deep)";
    clone1 = cdata1.cloneNode(false);
    ok(clone1, TEST+": shallow copy ");
    equals(clone1.childNodes.length, 0, TEST+": shallow copy - childNodes");
    equals(clone1.nodeValue, cdata1.nodeValue, TEST+": shallow copy - childNodes");
    
    reset();
    clone1 = cdata1.cloneNode(true);
    ok(clone1, TEST+": deep copy ");
    equals(cdata1.childNodes.length, 0, TEST+": deep copy - childNodes");
    equals(clone1.childNodes.length, 0, TEST+": deep copy - childNodes");
    equals(clone1.nodeType, cdata1.nodeType, TEST+": deep copy - childNodes");
    equals(clone1.nodeName, cdata1.nodeName, TEST+": deep copy - childNodes");
    equals(clone1.nodeValue, cdata1.nodeValue, TEST+": deep copy - childNodes");

    reset();
    TEST = "CDATASection : Node Method hasChildNodes()";
    equals(cdata2.hasChildNodes(), false, TEST);
    
    /************************
     * Entity
     ***********************/
    reset();
    ok(true, "TODO:TEST DocumentType : Node Attributes");
     
    /************************
     * Notation
     ***********************/
    reset();
    ok(true, "TODO:TEST Notation : Node Attributes");
   
});
/******************************************************************************           
1.2.6. Interface NodeList

    The NodeList interface provides the abstraction of an ordered collection of
    nodes, without defining or constraining how this collection is implemented. 
    NodeList objects in the DOM are live.

    The items in the NodeList are accessible via an integral index, starting 
    from 0.


    IDL Definition

        interface NodeList {
          Node               item(in unsigned long index);
          readonly attribute unsigned long    length;
        };


    Attributes

        length of type unsigned long, readonly
            The number of nodes in the list. The range of valid child node 
            indices is 0 to length-1 inclusive.

    Methods

        item
            Returns the indexth item in the collection. If index is greater 
            than or equal to the number of nodes in the list, this returns 
            null.
            
            Parameters

            index of type unsigned long
                Index into the collection.

            Return Value

            Node
                    

            The node at the indexth position in the NodeList, or null if that 
            is not a valid index.
            
            No Exceptions

******************************************************************************/
test('1.2.6. Interface NodeList', function(){
//IDL Definition
    ok(NodeList.prototype.item, "NodeList.prototype.item");

//Attributes

//Methods
//item
});
/******************************************************************************
1.2.7. Interface NamedNodeMap

    Objects implementing the NamedNodeMap interface are used to represent 
    collections of nodes that can be accessed by name. Note that NamedNodeMap 
    does not inherit from NodeList; NamedNodeMaps are not maintained in any 
    particular order. Objects contained in an object implementing NamedNodeMap 
    may also be accessed by an ordinal index, but this is simply to allow 
    convenient enumeration of the contents of a NamedNodeMap, and does not 
    imply that the DOM specifies an order to these Nodes.


    IDL Definition

        interface NamedNodeMap {
          Node               getNamedItem(in DOMString name);
          Node               setNamedItem(in Node arg)
                                                raises(DOMException);
          Node               removeNamedItem(in DOMString name)
                                                raises(DOMException);
          Node               item(in unsigned long index);
          readonly attribute unsigned long    length;
        };

        NamedNodeMap objects in the DOM are live. 
        
    Attributes

        length of type unsigned long, readonly
            The number of nodes in this map. The range of valid child node 
            indices is 0 to length-1 inclusive.

    Methods

        getNamedItem
            Retrieves a node specified by name.
            Parameters

            name of type DOMString
                The nodeName of a node to retrieve.

            Return Value

            Node
                    

            A Node (of any type) with the specified nodeName, or null if it 
            does not identify any node in this map.
            
            No Exceptions

        item
            Returns the indexth item in the map. If index is greater than or 
            equal to the number of nodes in this map, this returns null.
            
            Parameters

            index of type unsigned long
                Index into this map.

            Return Value

            Node
                    

            The node at the indexth position in the map, or null if that is not
            a valid index.
            
            No Exceptions


        removeNamedItem
            Removes a node specified by name. When this map contains the 
            attributes attached to an element, if the removed attribute is 
            known to have a default value, an attribute immediately appears 
            containing the default value.
            
            Parameters

            name of type DOMString
                The nodeName of the node to remove.

            Return Value

            Node
                    

            The node removed from this map if a node with such a name exists.
            Exceptions

            DOMException
                    

            NOT_FOUND_ERR: Raised if there is no node named name in this map.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this map is readonly.

        setNamedItem
            Adds a node using its nodeName attribute. If a node with that name 
            is already present in this map, it is replaced by the new one.
            
            As the nodeName attribute is used to derive the name which the node
            must be stored under, multiple nodes of certain types (those that 
            have a "special" string value) cannot be stored as the names would 
            clash. This is seen as preferable to allowing nodes to be aliased.
            
            Parameters

            arg of type Node
                A node to store in this map. The node will later be accessible 
                using the value of its nodeName attribute.

            Return Value

            Node
                    

            If the new Node replaces an existing node the replaced Node is 
            returned, otherwise null is returned.
            
            Exceptions

            DOMException
                    

            WRONG_DOCUMENT_ERR: Raised if arg was created from a different 
            document than the one that created this map.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this map is readonly.

            INUSE_ATTRIBUTE_ERR: Raised if arg is an Attr that is already an 
            attribute of another Element object. The DOM user must explicitly 
            clone Attr nodes to re-use them in other elements.

******************************************************************************/
test('1.2.7. Interface NamedNodeMap', function(){
//TODO: IDL Definition
    
//TODO: Attributes
    //length

//TODO: Methods
    //getNamedItem
    
    //item
    
    //removeNamedItem

    //setNamedItem
    //TODO: move to NamedNodeMap test and/or Element
    var element;

    doc = document.implementation.createDocument('', '', null);
    element = doc.createElement('envjs');
    equals(element.attributes.length, 0, '.attributes.length');

    element.setAttribute('animal', 'pig');
    //console.log('dom-spec setAttribute done');
    equals(element.attributes.length, 1, '.attributes.length');
    //console.log('dom-spec attributes.length');
    equals(element.attributes.animal.value, 'pig', 
    'element.attributes.animal');
    //console.log('dom-spec attributes.getNamedItem');
    equals(element.attributes.getNamedItem('animal').value, 'pig', 
    'element.attributes.getNamedItem');

});
/******************************************************************************

1.2.8. Interface CharacterData

    The CharacterData interface extends Node with a set of attributes and 
    methods for accessing character data in the DOM. For clarity this set is 
    defined here rather than on each object that uses these attributes and 
    methods. No DOM objects correspond directly to CharacterData, though Text 
    and others do inherit the interface from it. All offsets in this 
    interface start from 0.

    As explained in the DOMString interface, text strings in the DOM are 
    represented in UTF-16, i.e. as a sequence of 16-bit units. In the 
    following, the term 16-bit units is used whenever necessary to indicate 
    that indexing on CharacterData is done in 16-bit units.


    IDL Definition

        interface CharacterData : Node {
                   attribute DOMString        data;
                                        // raises(DOMException) on setting
                                        // raises(DOMException) on retrieval

          readonly attribute unsigned long    length;
          DOMString          substringData(in unsigned long offset, 
                                           in unsigned long count)
                                                raises(DOMException);
          void               appendData(in DOMString arg)
                                                raises(DOMException);
          void               insertData(in unsigned long offset, 
                                        in DOMString arg)
                                                raises(DOMException);
          void               deleteData(in unsigned long offset, 
                                        in unsigned long count)
                                                raises(DOMException);
          void               replaceData(in unsigned long offset, 
                                         in unsigned long count, 
                                         in DOMString arg)
                                                raises(DOMException);
        };


    Attributes

        data of type DOMString
            The character data of the node that implements this interface. The 
            DOM implementation may not put arbitrary limits on the amount of 
            data that may be stored in a CharacterData node. However, 
            implementation limits may mean that the entirety of a node's data 
            may not fit into a single DOMString. In such cases, the user may 
            call substringData to retrieve the data in appropriately sized 
            pieces.
            
            Exceptions on setting

            DOMException
                    

            NO_MODIFICATION_ALLOWED_ERR: Raised when the node is readonly.
            Exceptions on retrieval

            DOMException
                    

            DOMSTRING_SIZE_ERR: Raised when it would return more characters 
            than fit in a DOMString variable on the implementation platform.
            
        length of type unsigned long, readonly
            The number of 16-bit units that are available through data and the 
            substringData method below. This may have the value zero, i.e., 
            CharacterData nodes may be empty.

    Methods

        appendData
            Append the string to the end of the character data of the node. 
            Upon success, data provides access to the concatenation of data and 
            the DOMString specified.
            
            Parameters

            arg of type DOMString
                The DOMString to append.

            Exceptions

            DOMException
                    

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
            No Return Value

        deleteData
            Remove a range of 16-bit units from the node. Upon success, data 
            and length reflect the change.
            
            Parameters

            offset of type unsigned long
                The offset from which to start removing.

            count of type unsigned long
                The number of 16-bit units to delete. If the sum of offset and 
                count exceeds length then all 16-bit units from offset to the 
                end of the data are deleted.

            Exceptions

            DOMException
                    

            INDEX_SIZE_ERR: Raised if the specified offset is negative or 
            greater than the number of 16-bit units in data, or if the 
            specified count is negative.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
            No Return Value

        insertData
            Insert a string at the specified 16-bit unit offset.
            Parameters

            offset of type unsigned long
                The character offset at which to insert.

            arg of type DOMString
                The DOMString to insert.

            Exceptions

            DOMException
                    

            INDEX_SIZE_ERR: Raised if the specified offset is negative or 
            greater than the number of 16-bit units in data.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
            No Return Value

        replaceData
            Replace the characters starting at the specified 16-bit unit offset
            with the specified string.
            
            Parameters

            offset of type unsigned long
                The offset from which to start replacing.

            count of type unsigned long
                The number of 16-bit units to replace. If the sum of offset and
                count exceeds length, then all 16-bit units to the end of the 
                data are replaced; (i.e., the effect is the same as a remove 
                method call with the same range, followed by an append method 
                invocation).

            arg of type DOMString
                The DOMString with which the range must be replaced.

            Exceptions

            DOMException
                    

            INDEX_SIZE_ERR: Raised if the specified offset is negative or 
            greater than the number of 16-bit units in data, or if the 
            specified count is negative.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
            No Return Value

        substringData
            Extracts a range of data from the node.
            Parameters

            offset of type unsigned long
                Start offset of substring to extract.

            count of type unsigned long
                The number of 16-bit units to extract.

            Return Value

            DOMString
                    

            The specified substring. If the sum of offset and count exceeds the
            length, then all 16-bit units to the end of the data are returned.
            
            Exceptions

            DOMException
                    

            INDEX_SIZE_ERR: Raised if the specified offset is negative or 
            greater than the number of 16-bit units in data, or if the 
            specified count is negative.

            DOMSTRING_SIZE_ERR: Raised if the specified range of text does not 
            fit into a DOMString.
******************************************************************************/
test('1.2.8. Interface CharacterData', function(){
//TODO: IDL Definition
    //CharacterData.prototype
        
//TODO: Attributes
    //CharacterData.prototype.data
    //CharacterData.prototype.length
    
//TODO: Methods
    //CharacterData.prototype.appendData
    //CharacterData.prototype.deleteData
    //CharacterData.prototype.insertData
    //CharacterData.prototype.replaceData
    //CharacterData.prototype.substringData
    
   
});
/******************************************************************************
1.2.9. Interface Attr

    The Attr interface represents an attribute in an Element object. Typically 
    the allowable values for the attribute are defined in a document type 
    definition.

    Attr objects inherit the Node interface, but since they are not actually 
    child nodes of the element they describe, the DOM does not consider them 
    part of the document tree. Thus, the Node attributes parentNode, 
    previousSibling, and nextSibling have a null value for Attr objects. The 
    DOM takes the view that attributes are properties of elements rather than 
    having a separate identity from the elements they are associated with; this
    should make it more efficient to implement such features as default 
    attributes associated with all elements of a given type. Furthermore, Attr 
    nodes may not be immediate children of a DocumentFragment. However, they 
    can be associated with Element nodes contained within a DocumentFragment. 
    In short, users and implementors of the DOM need to be aware that Attr 
    nodes have some things in common with other objects inheriting the Node 
    interface, but they also are quite distinct.

    The attribute's effective value is determined as follows: if this attribute
    has been explicitly assigned any value, that value is the attribute's 
    effective value; otherwise, if there is a declaration for this attribute, 
    and that declaration includes a default value, then that default value is 
    the attribute's effective value; otherwise, the attribute does not exist on
    this element in the structure model until it has been explicitly added. 
    Note that the nodeValue attribute on the Attr instance can also be used to 
    retrieve the string version of the attribute's value(s).

    In XML, where the value of an attribute can contain entity references, the 
    child nodes of the Attr node provide a representation in which entity 
    references are not expanded. These child nodes may be either Text or 
    EntityReference nodes. Because the attribute type may be unknown, there are
    no tokenized attribute values.


    IDL Definition

        interface Attr : Node {
          readonly attribute DOMString        name;
          readonly attribute boolean          specified;
          // Modified in DOM Level 1:
                   attribute DOMString        value;
                                            // raises(DOMException) on setting

        };


    Attributes

        name of type DOMString, readonly
            Returns the name of this attribute.
            
        specified of type boolean, readonly
            If this attribute was explicitly given a value in the original 
            document, this is true; otherwise, it is false. Note that the 
            implementation is in charge of this attribute, not the user. If the
            user changes the value of the attribute (even if it ends up having 
            the same value as the default value) then the specified flag is 
            automatically flipped to true. To re-specify the attribute as the 
            default value from the DTD, the user must delete the attribute. The
            implementation will then make a new attribute available with 
            specified set to false and the default value (if one exists).
            
            In summary:

                * If the attribute has an assigned value in the document then 
                  specified is true, and the value is the assigned value.
                * If the attribute has no assigned value in the document and 
                  has a default value in the DTD, then specified is false, and 
                  the value is the default value in the DTD.
                * If the attribute has no assigned value in the document and 
                  has a value of #IMPLIED in the DTD, then the attribute does 
                  not appear in the structure model of the document.
                * If the attribute is not associated to any element (i.e. 
                  because it was just created or was obtained from some removal
                  or cloning operation) specified is true.
                  
        value of type DOMString, modified in DOM Level 1
            On retrieval, the value of the attribute is returned as a string. 
            Character and general entity references are replaced with their 
            values. See also the method getAttribute on the Element interface.
            
            On setting, this creates a Text node with the unparsed contents of 
            the string. I.e. any characters that an XML processor would 
            recognize as markup are instead treated as literal text. See also 
            the method setAttribute on the Element interface.
            
            Exceptions on setting

            DOMException

            NO_MODIFICATION_ALLOWED_ERR: Raised when the node is readonly.

******************************************************************************/
test('1.2.9. Interface Attr', function(){
//Attr.prototype
//Attr.prototype.name
//Attr.prototype.specified
//Attr.prototype.value
//TODO: IDL Definition

    var doc = document.implementation.createDocument('','',null);
    var attribute = doc.createAttribute('envjs');
        
//TODO: Attributes
    ok(attribute, 'attribute created');
    ok(attribute instanceof(Attr), 'instanceof Attr');
    equals(attribute.attributes, null, '.attributes');
    equals(attribute.name, 'envjs', '.name');
    equals(attribute.value, '', '.value');
    
    equals(attribute.specified, true, '.specified');
    equals(attribute.ownerElement, null, '.ownerElement');
    equals(attribute.childNodes.length, 0, '.childNodes');
    equals(attribute.localName, 'envjs', '.localName');
    equals(attribute.namespaceURI, null, '.namespaceURI');
    equals(attribute.nodeName, 'envjs', '.nodeName');
    equals(attribute.nodeType, Node.ATTRIBUTE_NODE, 'nodeType');
    equals(attribute.ownerDocument, doc, '.ownerDocument');
    equals(attribute.parentNode, null, '.parentNode');
    equals(attribute.prefix, null, '.prefix');
    ok(attribute.value = 'abc123', 'set value');
    equals(attribute.value, 'abc123', '.value');
    equals(attribute.name, 'envjs', '.name');
    
//TODO: Methods    
    equals(attribute.toString(), '[object Attr]', '.toString');
   
});
/******************************************************************************

1.2.10. Interface Element

    The Element interface represents an element in an HTML or XML document. 
    Elements may have attributes associated with them; since the Element 
    interface inherits from Node, the generic Node interface attribute 
    attributes may be used to retrieve the set of all attributes for an 
    element. There are methods on the Element interface to retrieve either an 
    Attr object by name or an attribute value by name. In XML, where an 
    attribute value may contain entity references, an Attr object should be 
    retrieved to examine the possibly fairly complex sub-tree representing the 
    attribute value. On the other hand, in HTML, where all attributes have 
    simple string values, methods to directly access an attribute value can 
    safely be used as a convenience.


    IDL Definition

        interface Element : Node {
          readonly attribute DOMString        tagName;
          DOMString          getAttribute(in DOMString name);
          void               setAttribute(in DOMString name, 
                                          in DOMString value)
                                                raises(DOMException);
          void               removeAttribute(in DOMString name)
                                                raises(DOMException);
          Attr               getAttributeNode(in DOMString name);
          Attr               setAttributeNode(in Attr newAttr)
                                                raises(DOMException);
          Attr               removeAttributeNode(in Attr oldAttr)
                                                raises(DOMException);
          NodeList           getElementsByTagName(in DOMString name);
          void               normalize();
        };

    Attributes

        tagName of type DOMString, readonly
            The name of the element. For example, in:

            <elementExample id="demo"> 
                    ... 
            </elementExample> ,

            tagName has the value "elementExample". Note that this is case-
            preserving in XML, as are all of the operations of the DOM. The 
            HTML DOM returns the tagName of an HTML element in the canonical 
            uppercase form, regardless of the case in the source HTML document.

    Methods

        getAttribute
            Retrieves an attribute value by name.
            Parameters

            name of type DOMString
                The name of the attribute to retrieve.

            Return Value

            DOMString
                    

            The Attr value as a string, or the empty string if that attribute 
            does not have a specified or default value.
            
            No Exceptions

        getAttributeNode
            Retrieves an Attr node by name.
            Parameters

            name of type DOMString
                The name of the attribute to retrieve.

            Return Value

            Attr
                    

            The Attr node with the specified attribute name or null if there is
            no such attribute.
            
            No Exceptions

        getElementsByTagName
            Returns a NodeList of all descendant Elements with a given tag 
            name, in the order in which they would be encountered in a preorder
            traversal of the Element tree.
            
            Parameters

            name of type DOMString
                The name of the tag to match on. The special value "*" matches 
                all tags.

            Return Value

            NodeList
                    

            A list of matching Element nodes.
            No Exceptions

        normalize
            Puts all Text nodes in the full depth of the sub-tree underneath 
            this Element, including attribute nodes, into a "normal" form where
            only markup (e.g., tags, comments, processing instructions, CDATA 
            sections, and entity references) separates Text nodes, i.e., there 
            are no adjacent Text nodes. This can be used to ensure that the DOM
            view of a document is the same as if it were saved and re-loaded, 
            and is useful when operations (such as XPointer [XPointer] lookups)
            that depend on a particular document tree structure are to be used.

            Note: In cases where the document contains CDATASections, the 
                  normalize operation alone may not be sufficient, since 
                  XPointers do not differentiate between Text nodes and 
                  CDATASection nodes.

            No Parameters
            No Return Value
            No Exceptions

        removeAttribute
            Removes an attribute by name. If the removed attribute is known to 
            have a default value, an attribute immediately appears containing 
            the default value.
            
            Parameters

            name of type DOMString
                The name of the attribute to remove.

            Exceptions

            DOMException
                    

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
            No Return Value

        removeAttributeNode
            Removes the specified attribute. If the removed Attr has a default 
            value it is immediately replaced.
            
            Parameters

            oldAttr of type Attr
                The Attr node to remove from the attribute list.

            Return Value

            Attr
                    

            The Attr node that was removed.
            Exceptions

            DOMException
                    

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.

            NOT_FOUND_ERR: Raised if oldAttr is not an attribute of the element.

        setAttribute
            Adds a new attribute. If an attribute with that name is already 
            present in the element, its value is changed to be that of the 
            value parameter. This value is a simple string; it is not parsed as
            it is being set. So any markup (such as syntax to be recognized as 
            an entity reference) is treated as literal text, and needs to be 
            appropriately escaped by the implementation when it is written out.
            In order to assign an attribute value that contains entity 
            references, the user must create an Attr node plus any Text and 
            EntityReference nodes, build the appropriate subtree, and use 
            setAttributeNode to assign it as the value of an attribute.
            
            Parameters

            name of type DOMString
                The name of the attribute to create or alter.

            value of type DOMString
                Value to set in string form.

            Exceptions

            DOMException
                    

            INVALID_CHARACTER_ERR: Raised if the specified name contains an 
            illegal character.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
            No Return Value

        setAttributeNode
            Adds a new attribute node. If an attribute with that name is 
            already present in the element, it is replaced by the new one.
            
            Parameters

            newAttr of type Attr
                The Attr node to add to the attribute list.

            Return Value

            Attr
                    

            If the newAttr attribute replaces an existing attribute, the 
            replaced Attr node is returned, otherwise null is returned.
            
            Exceptions

            DOMException
                    

            WRONG_DOCUMENT_ERR: Raised if newAttr was created from a different 
            document than the one that created the element.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.

            INUSE_ATTRIBUTE_ERR: Raised if newAttr is already an attribute of 
            another Element object. The DOM user must explicitly clone Attr 
            nodes to re-use them in other elements.
            
******************************************************************************/
test('1.2.10. Interface Element', function(){
//TODO: IDL Definition
        
    var doc = document.implementation.createDocument('','',null);
    var element = doc.createElement('envjs');
    
//TODO: Attributes
    
//TODO: Methods

    ok(element, 'element created');
    equals(element.attributes.length, 0, '.attributes.length');
    equals(element.tagName, 'envjs', '.name');
    equals(element.childNodes.length, 0, '.childNodes');
    equals(element.localName, 'envjs', '.localName');
    equals(element.namespaceURI, null, '.namespaceURI');
    equals(element.nodeName, 'envjs', '.nodeName');
    equals(element.nodeType, Node.ELEMENT_NODE, 'nodeType');
    equals(element.ownerDocument, doc, '.ownerDocument');
    equals(element.parentNode, null, '.parentNode');
    equals(element.prefix, null, '.prefix');
    equals(element.toString(), '[object Element]', '.toString');
    
//Element.prototype
//Element.prototype.tagName
//Element.prototype.getAttribute
//Element.prototype.getAttributeNode
//Element.prototype.getElementsByTagName
//Element.prototype.normalize
//Element.prototype.removeAttribute
//Element.prototype.removeAttributeNode
//Element.prototype.setAttribute
//Element.prototype.setAttributeNode   
   
});
/******************************************************************************

1.2.11. Interface Text

    The Text interface inherits from CharacterData and represents the textual 
    content (termed character data in XML) of an Element or Attr. If there is 
    no markup inside an element's content, the text is contained in a single 
    object implementing the Text interface that is the only child of the 
    element. If there is markup, it is parsed into the information items 
    (elements, comments, etc.) and Text nodes that form the list of children of
    the element.

    When a document is first made available via the DOM, there is only one Text
    node for each block of text. Users may create adjacent Text nodes that 
    represent the contents of a given element without any intervening markup, 
    but should be aware that there is no way to represent the separations 
    between these nodes in XML or HTML, so they will not (in general) persist 
    between DOM editing sessions. The normalize() method on Element merges any 
    such adjacent Text objects into a single node for each block of text.


    IDL Definition

        interface Text : CharacterData {
          Text               splitText(in unsigned long offset)
                                                raises(DOMException);
        };


    Methods

        splitText
            Breaks this node into two nodes at the specified offset, keeping 
            both in the tree as siblings. This node then only contains all the 
            content up to the offset point. A new node of the same type, which 
            is inserted as the next sibling of this node, contains all the 
            content at and after the offset point. When the offset is equal to 
            the length of this node, the new node has no data.
            
            Parameters

            offset of type unsigned long
                The 16-bit unit offset at which to split, starting from 0.

            Return Value

            Text
                    

            The new node, of the same type as this node.
            Exceptions

            DOMException
                    

            INDEX_SIZE_ERR: Raised if the specified offset is negative or 
            greater than the number of 16-bit units in data.

            NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.

******************************************************************************/
test('1.2.11. Interface Text', function(){
//TODO: IDL Definition
        
//TODO: Attributes
    
//TODO: Methods

    var doc = document.implementation.createDocument('', '', null),
        keyboardish=''+
        '`1234567890-='+
        '\tqwertyuiop[]\\'+
        'asdfghjkl;\'\n'+
        'zxcvbnm,./'+
        ' '+
        '~!@#$%^&*()_+'+
        '\tQWERTYUIOP{}|'+
        'ASDFGHJKL:"\n'+
        'ZXCVBNM<>?'+
        ' ';
        
    var text = doc.createTextNode(keyboardish);
    ok(text, 'text node was created');
    equals(text.attributes, null, '.attributes');
    equals(text.baseURI, 'about:blank', '.baseURI');
    equals(text.childNodes.length, 0, '.childNodes');
    equals(text.data, keyboardish, '.data');
    equals(text.length, 100, '.length');
    equals(text.localName, null, '.localName');
    equals(text.namespaceURI, null, '.namespaceURI');
    equals(text.nodeName, '#text', '.nodeName');
    equals(text.nodeType, Node.TEXT_NODE, 'nodeType');
    equals(text.nodeValue, keyboardish, '.nodeValue');
    equals(text.ownerDocument, doc, '.ownerDocument');
    equals(text.parentNode, null, '.parentNode');
    equals(text.prefix, null, '.prefix');
    equals(text.textContent, keyboardish, '.textContent');
    
//TODO: Text.prototype
//TODO: Text.prototype.splitText

});
/******************************************************************************

1.2.12. Interface Comment

    This interface inherits from CharacterData and represents the content of a 
    comment, i.e., all the characters between the starting 
    '<!--' and ending '-->'. Note that this is the definition of a comment in 
    XML, and, in practice, HTML, although some HTML tools may implement the 
    full SGML comment structure.


    IDL Definition

        interface Comment : CharacterData {
        };
        
******************************************************************************/
test('1.2.12. Interface Comment', function(){
//TODO: IDL Definition
        
//TODO: Attributes
    
//TODO: Methods

    var doc = document.implementation.createDocument('', '', null),
        keyboardish=''+
        '`1234567890-='+
        '\tqwertyuiop[]\\'+
        'asdfghjkl;\'\n'+
        'zxcvbnm,./'+
        ' '+
        '~!@#$%^&*()_+'+
        '\tQWERTYUIOP{}|'+
        'ASDFGHJKL:"\n'+
        'ZXCVBNM<>?'+
        ' ';
   
   var comment = doc.createComment(keyboardish);
   ok(comment, 'node was created');
   equals(comment.attributes, null, '.attributes');
   equals(comment.baseURI, 'about:blank', '.baseURI');
   equals(comment.childNodes.length, 0, '.childNodes');
   equals(comment.data, keyboardish, '.data');
   equals(comment.length, 100, '.length');
   equals(comment.localName, null, '.localName');
   equals(comment.namespaceURI, null, '.namespaceURI');
   equals(comment.nodeName, '#comment', '.nodeName');
   equals(comment.nodeType, Node.COMMENT_NODE, 'nodeType');
   equals(comment.nodeValue, keyboardish, '.nodeValue');
   equals(comment.ownerDocument, doc, '.ownerDocument');
   equals(comment.parentNode, null, '.parentNode');
   equals(comment.prefix, null, '.prefix');
   equals(comment.textContent, keyboardish, '.textContent');

   comment = doc.createComment("This is a pig, 'oink, oink'");

   ok(comment, 'comment');
   equals(comment.data, "This is a pig, 'oink, oink'", '.data');
   equals(comment.length, 27, '.length');
   ok(comment.appendData,  '.appendData');
   ok(comment.deleteData,  '.deleteData');
   ok(comment.insertData,  '.insertData');
   ok(comment.replaceData,  '.replaceData');
   ok(comment.substringData,  '.substringData');
   equals(comment.attributes, null, '.attributes');
   equals(comment.baseURI, 'about:blank', '.baseURI');
   ok(comment.childNodes,  '.childNodes');
   equals(comment.childNodes.length, 0, '.childNodes.length');
   equals(comment.firstChild, null, '.firstChild');
   equals(comment.lastChild, null, '.lastChild');
   equals(comment.localName, null, '.localName');
   equals(comment.namespaceURI, null, '.namespaceURI');
   equals(comment.nextSibling, null, '.nextSibling');
   equals(comment.nodeName, '#comment', '.nodeName');
   equals(comment.nodeType, 8, '.nodeType');
   equals(comment.nodeValue, "This is a pig, 'oink, oink'", '.nodeValue');
   equals(comment.ownerDocument, doc, '.ownerDocument');
   equals(comment.parentNode, null, '.parentNode');
   equals(comment.prefix, null, '.prefix');
   equals(comment.previousSibling, null, '.previousSibling');
   equals(comment.textContent, "This is a pig, 'oink, oink'", '.textContent');
});
/******************************************************************************

1.3. Extended Interfaces

The interfaces defined here form part of the DOM Level 1 Core specification, 
but objects that expose these interfaces will never be encountered in a DOM 
implementation that deals only with HTML. As such, HTML-only DOM 
implementations do not need to have objects that implement these interfaces.

A DOM application can use the hasFeature method of the DOMImplementation 
interface to determine whether they are supported or not. The feature string 
for all the interfaces listed in this section is "XML" and the version is 
"1.0".
******************************************************************************/
test('1.3. Extended Interfaces', function(){
    ok(document.implementation.hasFeature("XML","1.0"), 'Extended Interfaces Supported')
});
/******************************************************************************

1.3.1. Interface CDATASection

    CDATA sections are used to escape blocks of text containing characters 
    that would otherwise be regarded as markup. The only delimiter that is 
    recognized in a CDATA section is the "]]>" string that ends the CDATA 
    section. CDATA sections cannot be nested. Their primary purpose is for 
    including material such as XML fragments, without needing to escape all 
    the delimiters.

    The DOMString attribute of the Text node holds the text that is contained 
    by the CDATA section. Note that this may contain characters that need to 
    be escaped outside of CDATA sections and that, depending on the character 
    encoding ("charset") chosen for serialization, it may be impossible to 
    write out some characters as part of a CDATA section.

    The CDATASection interface inherits from the CharacterData interface 
    through the Text interface. Adjacent CDATASection nodes are not merged by 
    use of the normalize method on the Element interface.

    Note: Because no markup is recognized within a CDATASection, character 
          numeric references cannot be used as an escape mechanism when 
          serializing. Therefore, action needs to be taken when serializing a 
          CDATASection with a character encoding where some of the contained 
          characters cannot be represented. Failure to do so would not produce 
          well-formed XML.
          
    One potential solution in the serialization process is to end the CDATA 
    section before the character, output the character using a character 
    reference or entity reference, and open a new CDATA section for any further
    characters in the text node. Note, however, that some code conversion 
    libraries at the time of writing do not return an error or exception when a
    character is missing from the encoding, making the task of ensuring that 
    data is not corrupted on serialization more difficult.


    IDL Definition

        interface CDATASection : Text {
        };

******************************************************************************/
test('1.3.1. Interface CDATASection', function(){
//TODO: IDL Definition

//TODO: Attributes

//TODO: Methods
    var doc = document.implementation.createDocument('', '', null),
        keyboardish=''+
        '`1234567890-='+
        '\tqwertyuiop[]\\'+
        'asdfghjkl;\'\n'+
        'zxcvbnm,./'+
        ' '+
        '~!@#$%^&*()_+'+
        '\tQWERTYUIOP{}|'+
        'ASDFGHJKL:"\n'+
        'ZXCVBNM<>?'+
        ' ';
        
    var cdata = doc.createCDATASection(keyboardish);
    ok(cdata, 'node was created');
    equals(cdata.attributes, null, '.attributes');
    equals(cdata.baseURI, 'about:blank', '.baseURI');
    equals(cdata.childNodes.length, 0, '.childNodes');
    equals(cdata.data, keyboardish, '.data');
    equals(cdata.length, 100, '.length');
    equals(cdata.localName, null, '.localName');
    equals(cdata.namespaceURI, null, '.namespaceURI');
    equals(cdata.nodeName, '#cdata-section', '.nodeName');
    equals(cdata.nodeType, Node.CDATA_SECTION_NODE, 'nodeType');
    equals(cdata.nodeValue, keyboardish, '.nodeValue');
    equals(cdata.ownerDocument, doc, '.ownerDocument');
    equals(cdata.parentNode, null, '.parentNode');
    equals(cdata.prefix, null, '.prefix');
    equals(cdata.textContent, keyboardish, '.textContent');
        
});
/******************************************************************************

1.3.2. Interface DocumentType

    Each Document has a doctype attribute whose value is either null or a 
    DocumentType object. The DocumentType interface in the DOM Level 1 Core 
    provides an interface to the list of entities that are defined for the 
    document, and little else because the effect of namespaces and the various 
    XML scheme efforts on DTD representation are not clearly understood as of 
    this writing.

    The DOM Level 1 doesn't support editing DocumentType nodes.


    IDL Definition

        interface DocumentType : Node {
          readonly attribute DOMString        name;
          readonly attribute NamedNodeMap     entities;
          readonly attribute NamedNodeMap     notations;
        };
        

    Attributes

        entities of type NamedNodeMap, readonly
            A NamedNodeMap containing the general entities, both external and 
            internal, declared in the DTD. Parameter entities are not 
            contained. Duplicates are discarded. For example in:

            <!DOCTYPE ex SYSTEM "ex.dtd" [
              <!ENTITY foo "foo">
              <!ENTITY bar "bar">
              <!ENTITY bar "bar2">
              <!ENTITY % baz "baz">
            ]>
            <ex/>

            the interface provides access to foo and the first declaration of 
            bar but not the second declaration of bar or baz. Every node in 
            this map also implements the Entity interface.
            
            The DOM Level 1 does not support editing entities, therefore 
            entities cannot be altered in any way.

        name of type DOMString, readonly
            The name of DTD; i.e., the name immediately following the DOCTYPE 
            keyword.

        notations of type NamedNodeMap, readonly
            A NamedNodeMap containing the notations declared in the DTD. 
            Duplicates are discarded. Every node in this map also implements 
            the Notation interface.
            
            The DOM Level 1 does not support editing notations, therefore 
            notations cannot be altered in any way.
******************************************************************************/
test('1.3.2. Interface DocumentType', function(){
//TODO: IDL Definition

//TODO: Attributes

//TODO: Methods

});
/******************************************************************************

1.3.3. Interface Notation

    This interface represents a notation declared in the DTD. A notation either
    declares, by name, the format of an unparsed entity (see section 4.7 of the
    XML 1.0 specification [XML]), or is used for formal declaration of 
    processing instruction targets (see section 2.6 of the XML 1.0 
    specification [XML]). The nodeName attribute inherited from Node is set to 
    the declared name of the notation.

    The DOM Level 1 does not support editing Notation nodes; they are therefore
    readonly.

    A Notation node does not have any parent.


    IDL Definition

        interface Notation : Node {
          readonly attribute DOMString        publicId;
          readonly attribute DOMString        systemId;
        };

    Attributes

        publicId of type DOMString, readonly
            The public identifier of this notation. If the public identifier 
            was not specified, this is null.
            
        systemId of type DOMString, readonly
            The system identifier of this notation. If the system identifier 
            was not specified, this is null.
            
******************************************************************************/
test('1.3.3. Interface Notation', function(){
//TODO: IDL Definition

//TODO: Attributes

//TODO: Methods

});
/******************************************************************************

1.3.4. Interface Entity

    This interface represents an entity, either parsed or unparsed, in an XML 
    document. Note that this models the entity itself not the entity 
    declaration. Entity declaration modeling has been left for a later Level 
    of the DOM specification.

    The nodeName attribute that is inherited from Node contains the name of 
    the entity.

    An XML processor may choose to completely expand entities before the 
    structure model is passed to the DOM; in this case there will be no 
    EntityReference nodes in the document tree.

    XML does not mandate that a non-validating XML processor read and process 
    entity declarations made in the external subset or declared in external 
    parameter entities. This means that parsed entities declared in the 
    external subset need not be expanded by some classes of applications, and 
    that the replacement value of the entity may not be available. When the 
    replacement value is available, the corresponding Entity node's child list 
    represents the structure of that replacement text. Otherwise, the child 
    list is empty.

    The resolution of the children of the Entity (the replacement value) may be
    lazily evaluated; actions by the user (such as calling the childNodes 
    method on the Entity Node) are assumed to trigger the evaluation.

    The DOM Level 1 does not support editing Entity nodes; if a user wants to 
    make changes to the contents of an Entity, every related EntityReference 
    node has to be replaced in the structure model by a clone of the Entity's 
    contents, and then the desired changes must be made to each of those clones
    instead. Entity nodes and all their descendants are readonly.

    An Entity node does not have any parent.


    IDL Definition

        interface Entity : Node {
          readonly attribute DOMString        publicId;
          readonly attribute DOMString        systemId;
          readonly attribute DOMString        notationName;
        };

    Attributes

        notationName of type DOMString, readonly
            For unparsed entities, the name of the notation for the entity. 
            For parsed entities, this is null.

        publicId of type DOMString, readonly
            The public identifier associated with the entity, if specified. 
            If the public identifier was not specified, this is null.

        systemId of type DOMString, readonly
            The system identifier associated with the entity, if specified. 
            If the system identifier was not specified, this is null.
            
******************************************************************************/
test('1.3.4. Interface Entity', function(){
//TODO: IDL Definition

//TODO: Attributes

//TODO: Methods

});
/******************************************************************************

1.3.5. Interface EntityReference

    EntityReference objects may be inserted into the structure model when an 
    entity reference is in the source document, or when the user wishes to 
    insert an entity reference. Note that character references and references 
    to predefined entities are considered to be expanded by the HTML or XML 
    processor so that characters are represented by their Unicode equivalent 
    rather than by an entity reference. Moreover, the XML processor may 
    completely expand references to entities while building the structure 
    model, instead of providing EntityReference objects. If it does provide 
    such objects, then for a given EntityReference node, it may be that there 
    is no Entity node representing the referenced entity. If such an Entity 
    exists, then the child list of the EntityReference node is the same as that
    of the Entity node.

    As for Entity nodes, EntityReference nodes and all their descendants are 
    readonly.

    The resolution of the children of the EntityReference (the replacement 
    value of the referenced Entity) may be lazily evaluated; actions by the 
    user (such as calling the childNodes method on the EntityReference node) 
    are assumed to trigger the evaluation.


    IDL Definition

        interface EntityReference : Node {
        };
        
******************************************************************************/
test('1.3.5. Interface EntityReference', function(){
//TODO: IDL Definition

//TODO: Attributes

//TODO: Methods

});
/******************************************************************************

1.3.6. Interface ProcessingInstruction

    The ProcessingInstruction interface represents a "processing instruction", 
    used in XML as a way to keep processor-specific information in the text of 
    the document.


    IDL Definition

        interface ProcessingInstruction : Node {
          readonly attribute DOMString        target;
                   attribute DOMString        data;
                                        // raises(DOMException) on setting

        };

    Attributes

        data of type DOMString
            The content of this processing instruction. This is from the first 
            non white space character after the target to the character 
            immediately preceding the ?>.
            
            Exceptions on setting

            DOMException
                    

            NO_MODIFICATION_ALLOWED_ERR: Raised when the node is readonly.

        target of type DOMString, readonly
            The target of this processing instruction. XML defines this as 
            being the first token following the markup that begins the 
            processing instruction.
            

******************************************************************************/


test('1.3.6. Interface ProcessingInstruction', function(){
//TODO: IDL Definition
    //ProcessingInstruction.prototype
    
//TODO: Attributes
    //ProcessingInstruction.prototype.data
    //ProcessingInstruction.prototype.target
    var doc,
        data,
        root,
        target,
        processinginstruction;

    target = 'foo'
    data = 'bar="pooh"';
    doc = document.implementation.createDocument('', '', null);
    pi = doc.createProcessingInstruction(target, data);
    equals(pi.target, 'foo', 'processinginstruction.target');
    equals(pi.data, 'bar="pooh"', 'processinginstruction.data');

    target = 'this-is-a-pig'
    data = 'sounds-like="oink, oink"';
    doc = document.implementation.createDocument('', '', null);
    pi = doc.createProcessingInstruction(target, data);
    equals(pi.target, 'this-is-a-pig', 'processinginstruction.target');
    equals(pi.data, 'sounds-like="oink, oink"', 'processinginstruction.data');
    pi.data = 'sounds-like="oh,oh,ah,ah"';
    ok(true, "processinginstruction.data changed before part of the document");
    equals(pi.data, 'sounds-like="oh,oh,ah,ah"', "data value updated");

    root = doc.createElement('root');
    doc.appendChild(root);
    root.appendChild(pi);
    /* TODO:
    try{
        pi.data = 'sounds-like="woof, woof"';
        ok(false, 'Modification should not be allowed');
    }catch(e){
        equals(e.code,  DOMException.NO_MODIFICATION_ALLOWED_ERR, 
            'Modification in document was not allowed.');
    }*/

    
    //seriously i never use pi's--is there a better example
    var target = 'foo', 
        data = 'bar="pooh"',
        pi = doc.createProcessingInstruction(target, data);
    ok(pi, 'node was created');
    equals(pi.attributes, null, '.attributes');
    equals(pi.baseURI, 'about:blank', '.baseURI');
    equals(pi.childNodes.length, 0, '.childNodes');
    equals(pi.data, data, '.data');
    equals(pi.localName, null, '.localName');
    equals(pi.namespaceURI, null, '.namespaceURI');
    equals(pi.nodeName, target, '.nodeName');
    equals(pi.nodeType, Node.PROCESSING_INSTRUCTION_NODE, 'nodeType');
    equals(pi.nodeValue, data, '.nodeValue');
    equals(pi.ownerDocument, doc, '.ownerDocument');
    equals(pi.parentNode, null, '.parentNode');
    equals(pi.prefix, null, '.prefix');
    equals(pi.textContent, data, '.textContent');
});


