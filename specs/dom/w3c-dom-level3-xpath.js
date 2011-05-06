QUnit.module('DOM Level 3 XPath');
/******************************************************************************
http://www.w3.org/TR/DOM-Level-3-XPath/xpath.html

26 February 2004
1. Document Object Model XPath

Editor:
    Ray Whitmer, Netscape/AOL

Table of contents

    * 1.1 Introduction
    * 1.2 Mapping DOM to XPath
          o 1.2.1 Element Nodes
          o 1.2.2 Attribute Nodes
          o 1.2.3 Namespace Nodes
          o 1.2.4 Text Nodes
          o 1.2.5 Entity Reference Nodes
          o 1.2.6 Comment Nodes
          o 1.2.7 Processing Instruction Nodes
          o 1.2.8 Document order 
    * 1.3 Conformance
    * 1.4 Interfaces
          o XPathException, XPathExceptionCode, XPathEvaluator, 
            XPathExpression, XPathNSResolver, XPathResult, XPathNamespace

1.1 Introduction

XPath 1.0 [XPath 1.0] is becoming an important part of a variety of many
specifications including XForms, XPointer, XSL, XML Query, and so on. It is
also a clear advantage for user applications which use DOM to be able to use
XPath expressions to locate nodes automatically and declaratively.

This specification was created to map between the Document Object Model's
representation of the W3C Information Set and XPath's model to permit XPath
functions to be supplied and results returned within the framework of DOM APIs
in a standard, interoperable way, allowing also for liveness of data, which is
not addressed by the XPath specification but is present in results coming from
the DOM hierarchy. 

1.2 Mapping DOM to XPath

This section presents a mapping between the Document Object Model [DOM Level 2
Core] and the XPath 1.0 [XPath 1.0] model for the purposes of implementing the
APIs. 

1.2.1 Element Nodes

The DOM model uses Element nodes to represent Element Information Items. These
nodes of a document are directly used to represent the elements of an XPath
result. 

1.2.2 Attribute Nodes

The DOM model uses Attr nodes to represent Attribute Information Items of
attribute and namespace attribute properties of Element Information Item. These
nodes have no parent, but have an ownerElement which can be used as XPath
defines an attribute's parent.

XPath 1.0 does not make available the namespace attributes of an element. The
DOM implementation of XPath 1.0 using these defined interfaces never directly
returns Attr nodes of namespace attributes, but returned Element nodes still
contain them. 

1.2.3 Namespace Nodes

The XPath model expects namespace nodes for each in-scope namespace to be
attached to each element. DOM only maintains the namespace attributes instead
of replicating in-scope namespaces on each Element where they are in-scope. The
DOM implementation of XPath produces a new node of type XPATH_NAMESPACE_NODE,
defined in the XPathNamespace interface, to properly preserve identity and
ordering in a way that is compatible with XPath. This node type is only visible
using the XPath evaluation methods.

The set of in-scope namespaces of an element is the default xml namespace
combined with the contributions of namespace attributes of the current and all
ancestor elements. In addition to explicit namespace attributes, any element
has an implicit declaration of its own prefix, if any, or if no prefix then of
the default namespace, which is enforced during namespace serialization, fixup,
and lookup, which must be added to the set of in-scope namespaces when
generating namespace nodes for an element. This causes the set of namespace
nodes to be consistent with serialization, fixup, and lookup of namespaces in
DOM Level 3. 

1.2.4 Text Nodes

The XPath model relies on the XML Information Set [XML Information Set] ands
represents Character Information Items in a single logical text node where DOM
may have multiple fragmented Text nodes due to cdata sections, entity
references, etc. Instead of returning multiple nodes where XPath sees a single
logical text node, only the first non-empty DOM Text or CDATASection node of
any logical XPath text will be returned in the node set. Applications using
XPath in an environment with fragmented text nodes must manually gather the
text of a single logical text node possibly from multiple nodes beginning with
the first Text node or CDATASection node returned by the implementation.

Note: In an attempt to better implement the XML Information Set, DOM Level 3
Core [DOM Level 3 Core] adds the attribute wholeText on the Text interface for
retrieving the whole text for logically-adjacent Text nodes and the method
replaceWholeText for replacing those nodes. 

1.2.5 Entity Reference Nodes

The DOM model may represent Unexpanded Entity Reference Information Items or
may provide the position and URI of expanded entity hierarchies by using
EntityReference nodes. XPath 1.0 does not preserve corresponding information.

Where the node represents an unexpanded entity reference, it is skipped as
dictated by the XPath specifications for all infoset items besides those
specifically processed.

Where there is a hierarchy underneath the node, these nodes are processed as
though they were siblings of the entity reference, as is consistent with the
rest of the DOM specification.

EntityReference nodes found within a DOM hierarchy are never returned as a node
of the result, but returned nodes may contain or be contained within an
EntityReference node. Text may be split partially inside and partially outside
of an EntityReference node, but this is solved by handling Text nodes as
described in the previous section. 

1.2.6 Comment Nodes

The DOM model uses Comment nodes to represent Comment Information Items. These
nodes of a document are directly used to represent the comments of an XPath
result. 

1.2.7 Processing Instruction Nodes

The DOM model uses ProcessingInstruction nodes to represent Processing
Instruction Information Items. These nodes of a document are directly used to
represent the processing instructions of an XPath result. 

1.2.8 Document order

The document order of nodes in the DOM Core has been defined to be compatible
with the XPath document order. The XPath DOM extends the document order of the
DOM Core to include the XPathNamespace nodes. Element nodes occur before their
children. The attribute nodes and namespace nodes of an element occur before
the children of the element. The namespace nodes are defined to occur before
the attribute nodes. The relative order of namespace nodes is
implementation-dependent. The relative order of attribute nodes is
implementation-dependent. The compareTreePosition method on the Node interface
defined in the DOM Core must compare the XPathNamespace nodes using this
extended document order if the XPath DOM module is supported.

Note: It is possible that in future versions of XPath, the order of namespace
nodes or other aspects of document order may change incompatibly. 

1.3 Conformance

This section explains conformance to DOM Level 3 XPath Module.

A DOM implementation must not return true to hasFeature("xpath", "3.0") unless
the implementation conforms to that module. As documented in [DOM Level 3
Core], if a null or empty string is passed in for the second parameter, then
conformance is still required to some version of the DOM XPath Module or false
must be returned.
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************

A conformant implementation is DOM Level 3 XPath must support all the
interfaces as specified in that specification. In addition to implementing the
interfaces in the DOM XPath Module, a conforming implementation must correctly
implement each part of the XPath 1.0 specification when evaluating expressions
including Location Paths, Expressions, the Core Function Library, and the
mapping between DOM and the XPath 1.0 data model described in the DOM Level 3
XPath Module. The XPath id()function must return the corresponding element, if
any, returned by the DOM method Document.getElementById.

After meeting the requirements for conformance, a conforming implementation may
implement additional functions and variables. Applications which evaluate
expressions using these extensions will not necessarily be portable to other
implementations of the DOM Level 3 XPath Module. 

1.4 Interfaces

An implementation is DOM Level 3 XPath conformant if it supports the Core
module defined in [DOM Level 2 Core] and the module defined in this
specification. An implementation conforms to a DOM module if it supports all
the interfaces for that module and the associated semantics.

A DOM application may use the hasFeature(feature, version) method of the
DOMImplementation interface with parameter values "XPath" and "3.0"
(respectively) to determine whether or not the XPath module is supported by the
implementation. In order to fully support this module, an implementation must
also support the "Core" feature defined in the DOM Level 2 Core specification
[DOM Level 2 Core].

A DOM implementation must not return true to the hasFeature(feature, version)
method of the DOMImplementation interface for that feature unless the
implementation conforms to that module. The version number for the feature used
in this document is "3.0".

Exception XPathException

    A new exception has been created for exceptions specific to these XPath
    interfaces.


    IDL Definition

        exception XPathException {
          unsigned short   code;
        };
        // XPathExceptionCode
        const unsigned short      INVALID_EXPRESSION_ERR         = 51;
        const unsigned short      TYPE_ERR                       = 52;

******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

    Definition group XPathExceptionCode

        Defined Constants

            INVALID_EXPRESSION_ERR
                If the expression has a syntax error or otherwise is not a
                legal expression according to the rules of the specific
                XPathEvaluator or contains specialized extension functions or
                variables not supported by this implementation.
            TYPE_ERR
                If the expression cannot be converted to return the specified
                type.

******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
Interface XPathEvaluator

    The evaluation of XPath expressions is provided by XPathEvaluator. In a DOM
    implementation which supports the XPath 3.0 feature, as described above,
    the XPathEvaluator interface will be implemented on the same object which
    implements the Document interface permitting it to be obtained by the usual
    binding-specific method such as casting or by using the DOM Level 3
    getInterface method. In this case the implementation obtained from the
    Document supports the XPath DOM module and is compatible with the XPath 1.0
    specification.
    
     Evaluation of expressions with specialized extension functions or
    variables may not work in all implementations and is, therefore, not
    portable. XPathEvaluator implementations may be available from other
    sources that could provide specific support for specialized extension
    functions or variables as would be defined by other specifications.


    IDL Definition

        interface XPathEvaluator {
          XPathExpression    createExpression(in DOMString expression, 
                                              in XPathNSResolver resolver)
                                                raises(XPathException, 
                                                       DOMException);
          XPathNSResolver    createNSResolver(in Node nodeResolver);
          DOMObject          evaluate(in DOMString expression, 
                                      in Node contextNode, 
                                      in XPathNSResolver resolver, 
                                      in unsigned short type, 
                                      in DOMObject result)
                                                raises(XPathException, 
                                                       DOMException);
        };

******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

    Methods

        createExpression
            Creates a parsed XPath expression with resolved namespaces. This is
            useful when an expression will be reused in an application since it
            makes it possible to compile the expression string into a more
            efficient internal form and preresolve all namespace prefixes which
            occur within the expression.

            Parameters

            expression of type DOMString
                The XPath expression string to be parsed.
            resolver of type XPathNSResolver
                The resolver permits translation of all prefixes, including the
                xml namespace prefix, within the XPath expression into
                appropriate namespace URIs. If this is specified as null, any
                namespace prefix within the expression will result in
                DOMException being thrown with the code NAMESPACE_ERR.

            Return Value

            XPathExpression
            	

            The compiled form of the XPath expression.
            Exceptions

            XPathException
            	

            INVALID_EXPRESSION_ERR: Raised if the expression is not legal
            according to the rules of the XPathEvaluator.

            DOMException
            	

            NAMESPACE_ERR: Raised if the expression contains namespace prefixes
            which cannot be resolved by the specified XPathNSResolver.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        createNSResolver
            Adapts any DOM node to resolve namespaces so that an XPath
            expression can be easily evaluated relative to the context of the
            node where it appeared within the document. This adapter works like
            the DOM Level 3 method lookupNamespaceURI on nodes in resolving the
            namespaceURI from a given prefix using the current information
            available in the node's hierarchy at the time lookupNamespaceURI is
            called. also correctly resolving the implicit xml prefix.

            Parameters

            nodeResolver of type Node
                The node to be used as a context for namespace resolution.

            Return Value

            XPathNSResolver
            	
            XPathNSResolver which resolves namespaces with respect to the
            definitions in scope for a specified node.           
            
            No Exceptions
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        evaluate
            Evaluates an XPath expression string and returns a result of the
            specified type if possible.

            Parameters

            expression of type DOMString
                The XPath expression string to be parsed and evaluated.
            contextNode of type Node
                The context is context node for the evaluation of this XPath
                expression. If the XPathEvaluator was obtained by casting the
                Document then this must be owned by the same document and must
                be a Document, Element, Attribute, Text, CDATASection, Comment,
                ProcessingInstruction, or XPathNamespace node. If the context
                node is a Text or a CDATASection, then the context is
                interpreted as the whole logical text node as seen by XPath,
                unless the node is empty in which case it may not serve as the
                XPath context.
            resolver of type XPathNSResolver
                The resolver permits translation of all prefixes, including the
                xml namespace prefix, within the XPath expression into
                appropriate namespace URIs. If this is specified as null, any
                namespace prefix within the expression will result in
                DOMException being thrown with the code NAMESPACE_ERR.
            type of type unsigned short
                If a specific type is specified, then the result will be
                returned as the corresponding type.

                For XPath 1.0 results, this must be one of the codes of the
                XPathResult interface.
            result of type DOMObject
                The result specifies a specific result object which may be
                reused and returned by this method. If this is specified as
                nullor the implementation does not reuse the specified result,
                a new result object will be constructed and returned.

                For XPath 1.0 results, this object will be of type XPathResult.

            Return Value

            DOMObject
            	

            The result of the evaluation of the XPath expression.
            For XPath 1.0 results, this object will be of type XPathResult.
            Exceptions

            XPathException
            	

            INVALID_EXPRESSION_ERR: Raised if the expression is not legal
            according to the rules of the XPathEvaluatori
            
            TYPE_ERR: Raised if the result cannot be converted to return the
            specified type.
            
            DOMException
            
            NAMESPACE_ERR: Raised if the expression contains namespace
            prefixes which cannot be resolved by the specified XPathNSResolver.
            
            WRONG_DOCUMENT_ERR: The Node is from a document that is not
            supported by this XPathEvaluator.
            
            NOT_SUPPORTED_ERR: The Node is not a type permitted as an XPath
            context node or the request type is not permitted by this
            XPathEvaluator.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

Interface XPathExpression

    The XPathExpression interface represents a parsed and resolved XPath
    expression.


    IDL Definition

        interface XPathExpression {
          DOMObject          evaluate(in Node contextNode, 
                                      in unsigned short type, 
                                      in DOMObject result)
                                                raises(XPathException, 
                                                       DOMException);
        };


******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************
    Methods

        evaluate
            Evaluates this XPath expression and returns a result.
            Parameters

            contextNode of type Node
                The context is context node for the evaluation of this XPath
                expression.
                
                 If the XPathEvaluator was obtained by casting the Document
                then this must be owned by the same document and must be a
                Document, Element, Attribute, Text, CDATASection, Comment,
                ProcessingInstruction, or XPathNamespace node.
                
                 If the context node is a Text or a CDATASection, then the
                context is interpreted as the whole logical text node as seen
                by XPath, unless the node is empty in which case it may not
                serve as the XPath context.

            type of type unsigned short

                If a specific type is specified, then the result will be
                coerced to return the specified type relying on XPath
                conversions and fail if the desired coercion is not possible.
                This must be one of the type codes of XPathResult.

            result of type DOMObject

                The result specifies a specific result object which may be
                reused and returned by this method. If this is specified as
                nullor the implementation does not reuse the specified result,
                a new result object will be constructed and returned.
                
                 For XPath 1.0 results, this object will be of type
                XPathResult.

            Return Value

            DOMObject
            	

            The result of the evaluation of the XPath expression.
            For XPath 1.0 results, this object will be of type XPathResult.
            Exceptions

            XPathException
            	

            TYPE_ERR: Raised if the result cannot be converted to return the
            specified type.
            
            DOMException
            
             WRONG_DOCUMENT_ERR: The Node is from a document that is not
            supported by the XPathEvaluator that created this XPathExpression.
            
             NOT_SUPPORTED_ERR: The Node is not a type permitted as an XPath
            context node or the request type is not permitted by this
            XPathExpression.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

Interface XPathNSResolver

    The XPathNSResolver interface permit prefix strings in the expression to be
    properly bound to namespaceURI strings. XPathEvaluator can construct an
    implementation of XPathNSResolver from a node, or the interface may be
    implemented by any application.


    IDL Definition

        interface XPathNSResolver {
          DOMString          lookupNamespaceURI(in DOMString prefix);
        };


******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
    Methods

        lookupNamespaceURI
            Look up the namespace URI associated to the given namespace prefix.
            The XPath evaluator must never call this with a null or empty
            argument, because the result of doing this is undefined.

            Parameters

            prefix of type DOMString
                The prefix to look for.

            Return Value

            DOMString
            	

            Returns the associated namespace URI or null if none is found.
            No Exceptions

******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
Interface XPathResult

    The XPathResult interface represents the result of the evaluation of an
    XPath 1.0 expression within the context of a particular node. Since
    evaluation of an XPath expression can result in various result types, this
    object makes it possible to discover and manipulate the type and value of
    the result.


    IDL Definition

        interface XPathResult {

          // XPathResultType
          const unsigned short      ANY_TYPE                       = 0;
          const unsigned short      NUMBER_TYPE                    = 1;
          const unsigned short      STRING_TYPE                    = 2;
          const unsigned short      BOOLEAN_TYPE                   = 3;
          const unsigned short      UNORDERED_NODE_ITERATOR_TYPE   = 4;
          const unsigned short      ORDERED_NODE_ITERATOR_TYPE     = 5;
          const unsigned short      UNORDERED_NODE_SNAPSHOT_TYPE   = 6;
          const unsigned short      ORDERED_NODE_SNAPSHOT_TYPE     = 7;
          const unsigned short      ANY_UNORDERED_NODE_TYPE        = 8;
          const unsigned short      FIRST_ORDERED_NODE_TYPE        = 9;

          readonly attribute unsigned short  resultType;
          readonly attribute double          numberValue;
                                        // raises(XPathException) on retrieval

          readonly attribute DOMString       stringValue;
                                        // raises(XPathException) on retrieval

          readonly attribute boolean         booleanValue;
                                        // raises(XPathException) on retrieval

          readonly attribute Node            singleNodeValue;
                                        // raises(XPathException) on retrieval

          readonly attribute boolean         invalidIteratorState;
          readonly attribute unsigned long   snapshotLength;
                                        // raises(XPathException) on retrieval

          Node               iterateNext()
                                                raises(XPathException, 
                                                       DOMException);
          Node               snapshotItem(in unsigned long index)
                                                raises(XPathException);
        };
        
******************************************************************************/
test('TODO:', function(){

});
/******************************************************************************

    Definition group XPathResultType

        An integer indicating what type of result this is.

        If a specific type is specified, then the result will be returned as
        the corresponding type, using XPath type conversions where required and
        possible.

        Defined Constants

            ANY_TYPE
                This code does not represent a specific type. An evaluation of
                an XPath expression will never produce this type. If this type
                is requested, then the evaluation returns whatever type
                naturally results from evaluation of the expression.

                If the natural result is a node set when ANY_TYPE was
                requested, then UNORDERED_NODE_ITERATOR_TYPE is always the
                resulting type. Any other representation of a node set must be
                explicitly requested.
            ANY_UNORDERED_NODE_TYPE
                The result is a node set as defined by [XPath 1.0] and will be
                accessed as a single node, which may be nullif the node set is
                empty. Document modification does not invalidate the node, but
                may mean that the result node no longer corresponds to the
                current document. This is a convenience that permits
                optimization since the implementation can stop once any node in
                the resulting set has been found.

                If there is more than one node in the actual result, the single
                node returned might not be the first in document order.           BOOLEAN_TYPE

                The result is a boolean as defined by [XPath 1.0]. Document
                modification does not invalidate the boolean, but may mean that
                reevaluation would not yield the same boolean.
            FIRST_ORDERED_NODE_TYPE
                The result is a node set as defined by [XPath 1.0] and will be
                accessed as a single node, which may be null if the node set is
                empty. Document modification does not invalidate the node, but
                may mean that the result node no longer corresponds to the
                current document. This is a convenience that permits
                optimization since the implementation can stop once the first
                node in document order of the resulting set has been found.

                If there are more than one node in the actual result, the
                single node returned will be the first in document order.
            NUMBER_TYPE
                The result is a number as defined by [XPath 1.0]. Document
                modification does not invalidate the number, but may mean that
                reevaluation would not yield the same number.
            ORDERED_NODE_ITERATOR_TYPE
                The result is a node set as defined by [XPath 1.0] that will be
                accessed iteratively, which will produce document-ordered
                nodes. Document modification invalidates the iteration.
            ORDERED_NODE_SNAPSHOT_TYPE
                The result is a node set as defined by [XPath 1.0] that will be
                accessed as a snapshot list of nodes that will be in original
                document order. Document modification does not invalidate the
                snapshot but may mean that reevaluation would not yield the
                same snapshot and nodes in the snapshot may have been altered,
                moved, or removed from the document.
            STRING_TYPE
                The result is a string as defined by [XPath 1.0]. Document
                modification does not invalidate the string, but may mean that
                the string no longer corresponds to the current document.
            UNORDERED_NODE_ITERATOR_TYPE
                The result is a node set as defined by [XPath 1.0] that will be
                accessed iteratively, which may not produce nodes in a
                particular order. Document modification invalidates the
                iteration.

                This is the default type returned if the result is a node set
                and ANY_TYPE is requested.
            UNORDERED_NODE_SNAPSHOT_TYPE
                The result is a node set as defined by [XPath 1.0] that will be
                accessed as a snapshot list of nodes that may not be in a
                particular order. Document modification does not invalidate the
                snapshot but may mean that reevaluation would not yield the
                same snapshot and nodes in the snapshot may have been altered,
                moved, or removed from the document.

******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
    Attributes

        booleanValue of type boolean, readonly
            The value of this boolean result.
            Exceptions on retrieval

            XPathException
            	

            TYPE_ERR: raised if resultType is not BOOLEAN_TYPE.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        invalidIteratorState of type boolean, readonly
            Signifies that the iterator has become invalid. True if resultType
            is UNORDERED_NODE_ITERATOR_TYPE or ORDERED_NODE_ITERATOR_TYPE and
            the document has been modified since this result was returned.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        numberValue of type double, readonly
            The value of this number result. If the native double type of the
            DOM binding does not directly support the exact IEEE 754 result of
            the XPath expression, then it is up to the definition of the
            binding to specify how the XPath number is converted to the native
            binding number.

            Exceptions on retrieval

            XPathException
            	

            TYPE_ERR: raised if resultType is not NUMBER_TYPE.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        resultType of type unsigned short, readonly
            A code representing the type of this result, as defined by the type
            constants.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        singleNodeValue of type Node, readonly
            The value of this single node result, which may be null.
            Exceptions on retrieval

            XPathException
            	

            TYPE_ERR: raised if resultType is not ANY_UNORDERED_NODE_TYPE or 
            FIRST_ORDERED_NODE_TYPE.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        snapshotLength of type unsigned long, readonly
            The number of nodes in the result snapshot. Valid values for
            snapshotItem indices are 0 to snapshotLength-1 inclusive.

            Exceptions on retrieval

            XPathException
            	

            TYPE_ERR: raised if resultType is not UNORDERED_NODE_SNAPSHOT_TYPE
            or ORDERED_NODE_SNAPSHOT_TYPE.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        stringValue of type DOMString, readonly
            The value of this string result.
            Exceptions on retrieval

            XPathException
            	

            TYPE_ERR: raised if resultType is not STRING_TYPE.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

    Methods

        iterateNext
            Iterates and returns the next node from the node set or nullif
            there are no more nodes.

            Return Value

            Node
            	
            Returns the next node.
            
            Exceptions

            XPathException
            	
            TYPE_ERR: raised if resultType is not UNORDERED_NODE_ITERATOR_TYPE
            or ORDERED_NODE_ITERATOR_TYPE.

            DOMException
            	
            INVALID_STATE_ERR: The document has been mutated since the result
            was returned.

            No Parameters
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
        snapshotItem
            Returns the indexth item in the snapshot collection. If index is
            greater than or equal to the number of nodes in the list, this
            method returns null. Unlike the iterator result, the snapshot does
            not become invalid, but may not correspond to the current document
            if it is mutated.

            Parameters

            index of type unsigned long
                Index into the snapshot collection.

            Return Value

            Node
            	
            The node at the indexth position in the NodeList, or null if that
            is not a valid index.

            Exceptions

            XPathException            	

            TYPE_ERR: raised if resultType is not UNORDERED_NODE_SNAPSHOT_TYPE
            or ORDERED_NODE_SNAPSHOT_TYPE.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

Interface XPathNamespace

    The XPathNamespace interface is returned by XPathResult interfaces to
    represent the XPath namespace node type that DOM lacks. There is no public
    constructor for this node type. Attempts to place it into a hierarchy or a
    NamedNodeMap result in a DOMException with the code HIERARCHY_REQUEST_ERR.
    This node is read only, so methods or setting of attributes that would
    mutate the node result in a DOMException with the code
    NO_MODIFICATION_ALLOWED_ERR.
    
    The core specification describes attributes of the Node interface that are
    different for different node types but does not describe
    XPATH_NAMESPACE_NODE, so here is a description of those attributes for this
    node type. All attributes of Node not described in this section have a null
    or false value.
    
    ownerDocument matches the ownerDocument of the ownerElement even if the
    element is later adopted.
    
    nodeName is always the string "#namespace".
    
    prefix is the prefix of the namespace represented by the node.
    
    localName is the same as prefix.
    
    nodeType is equal to XPATH_NAMESPACE_NODE.
    
    namespaceURI is the namespace URI of the namespace represented by the
    node.
    
    nodeValue is the same as namespaceURI.
    
    adoptNode, cloneNode, and importNode fail on this node type by raising a
    
    DOMException with the code NOT_SUPPORTED_ERR.
    
    Note: In future versions of the XPath specification, the definition of a
    namespace node may be changed incomatibly, in which case incompatible
    changes to field values may be required to implement versions beyond XPath
    1.0.

******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

    IDL Definition

        interface XPathNamespace : Node {

          // XPathNodeType
          const unsigned short      XPATH_NAMESPACE_NODE           = 13;

          readonly attribute Element         ownerElement;
        };
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************
    Definition group XPathNodeType

        An integer indicating which type of node this is.

        Note: There is currently only one type of node which is specific to
        XPath. The numbers in this list must not collide with the values
        assigned to core node types.

        Defined Constants

            XPATH_NAMESPACE_NODE
                The node is a Namespace.
******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

    Attributes

        ownerElement of type Element, readonly
            The Element on which the namespace was in scope when it was
            requested. This does not change on a returned namespace node even
            if the document changes such that the namespace goes out of scope
            on that element and this node is no longer found there by XPath.


******************************************************************************/
test('TODO', function(){
    
});
/******************************************************************************

******************************************************************************/
//TODO: Legacy tests to be reintegrated
QUnit.module('XPath');
/**
* XPATH - borrowed from the google ajaxslt project and modified to work inside our unit tests
*/

// Copyright 2005, Google Inc.
// All Rights Reserved.
//
// Unit test for the XPath parser and engine.
//
// Author: Steffen Meschkat <mesch@google.com>
//         Junji Takagi <jtakagi@google.com>

test('document.createExpression', function(){
	
	var expr = [
	    "@*",
	    "@*|node()",
	    "/descendant-or-self::div",
	    "/div",
	    "//div",
	    "/descendant-or-self::node()/child::para",
	    "substring('12345', 0, 3)",
	    "//title | //link",
	    "$x//title",
	    // "$x/title",  // TODO(mesch): parsing of this expression is broken
	    "id('a')//title",
	    "//*[@about]",
	    "count(descendant::*)",
	    "count(descendant::*) + count(ancestor::*)",
	    "concat(substring-before(@image,'marker'),'icon',substring-after(@image,'marker'))",
	    "@*|text()",
	    "*|/",
	    "source|destination",
	    "$page != 'to' and $page != 'from'",
	    "substring-after(icon/@image, '/mapfiles/marker')",
	    "substring-before($str, $c)",
	    "$page = 'from'",
	    "segments/@time",
	    "child::para",
	    "child::*",
	    "child::text()",
	    "child::node()",
	    "attribute::name",
	    "attribute::*",
	    "descendant::para",
	    "ancestor::div",
	    "ancestor-or-self::div",
	    "descendant-or-self::para",
	    "self::para",
	    "child::chapter/descendant::para",
	    "child::*/child::para",
	    "/",
	    "/descendant::para",
	    "/descendant::olist/child::item",
	    "child::para[position()=1]",
	    "child::para[position()=last()]",
	    "child::para[position()=last()-1]",
	    "child::para[position()>1]",
	    "following-sibling::chapter[position()=1]",
	    "preceding-sibling::chapter[position()=1]",
	    "/descendant::figure[position()=42]",
	    "/child::doc/child::chapter[position()=5]/child::section[position()=2]",
	    "child::para[attribute::type='warning']",
	    "child::para[attribute::type='warning'][position()=5]",
	    "child::para[position()=5][attribute::type='warning']",
	    "child::chapter[child::title='Introduction']",
	    "child::chapter[child::title]",
	    "child::*[self::chapter or self::appendix]",
	    "child::*[self::chapter or self::appendix][position()=last()]",
	    "count(//*[id='u1']|//*[id='u2'])",
	    "count(//*[id='u1']|//*[class='u'])",
	    "count(//*[class='u']|//*[class='u'])",
	    "count(//*[class='u']|//*[id='u1'])",

	    // Axis expressions
	    "count(//*[@id='self']/ancestor-or-self::*)",
	    "count(//*[@id='self']/ancestor::*)",
	    "count(//*[@id='self']/attribute::*)",
	    "count(//*[@id='self']/child::*)",
	    "count(//*[@id='self']/descendant-or-self::*)",
	    "count(//*[@id='self']/descendant::*)",
	    "count(//*[@id='self']/following-sibling::*)",
	    "count(//*[@id='self']/following::*)",
	    "//*[@id='self']/parent::*/@id",
	    "count(//*[@id='self']/preceding-sibling::*)",
	    "count(//*[@id='self']/preceding::*)",
	    "//*[@id='self']/self::*/@id",

	    // (Japanese)
	    "/descendant-or-self::\u90e8\u5206",
	    "//\u90e8\u5206",
	    "substring('\uff11\uff12\uff13\uff14\uff15', 0, 3)",
	    "//\u30bf\u30a4\u30c8\u30eb | //\u30ea\u30f3\u30af",
	    "$\u8b0e//\u30bf\u30a4\u30c8\u30eb",
	    "//*[@\u30c7\u30b9\u30c6\u30a3\u30cd\u30a4\u30b7\u30e7\u30f3]",
	    "concat(substring-before(@\u30a4\u30e1\u30fc\u30b8,'\u76ee\u5370'),'\u30a2\u30a4\u30b3\u30f3',substring-after(@\u30a4\u30e1\u30fc\u30b8,'\u76ee\u5370'))",
	    "\u30bd\u30fc\u30b9|\u30c7\u30b9\u30c6\u30a3\u30cd\u30a4\u30b7\u30e7\u30f3",
	    "$\u30da\u30fc\u30b8 != '\u307e\u3067' and $\u30da\u30fc\u30b8 != '\u304b\u3089'",
	    "substring-after(\u30a2\u30a4\u30b3\u30f3/@\u30a4\u30e1\u30fc\u30b8, '/\u5730\u56f3\u30d5\u30a1\u30a4\u30eb/\u76ee\u5370')",
	    "substring-before($\u6587\u5b57\u5217, $\u6587\u5b57)",
	    "$\u30da\u30fc\u30b8 = '\u304b\u3089'",
	    "\u30bb\u30b0\u30e1\u30f3\u30c8/@\u6642\u523b",
	    "child::\u6bb5\u843d",
	    "attribute::\u540d\u524d",
	    "descendant::\u6bb5\u843d",
	    "ancestor::\u90e8\u5206",
	    "ancestor-or-self::\u90e8\u5206",
	    "descendant-or-self::\u6bb5\u843d",
	    "self::\u6bb5\u843d",
	    "child::\u7ae0/descendant::\u6bb5\u843d",
	    "child::*/child::\u6bb5\u843d",
	    "/descendant::\u6bb5\u843d",
	    "/descendant::\u9806\u5e8f\u30ea\u30b9\u30c8/child::\u9805\u76ee",
	    "child::\u6bb5\u843d[position()=1]",
	    "child::\u6bb5\u843d[position()=last()]",
	    "child::\u6bb5\u843d[position()=last()-1]",
	    "child::\u6bb5\u843d[position()>1]",
	    "following-sibling::\u7ae0[position()=1]",
	    "preceding-sibling::\u7ae0[position()=1]",
	    "/descendant::\u56f3\u8868[position()=42]",
	    "/child::\u6587\u66f8/child::\u7ae0[position()=5]/child::\u7bc0[position()=2]",
	    "child::\u6bb5\u843d[attribute::\u30bf\u30a4\u30d7='\u8b66\u544a']",
	    "child::\u6bb5\u843d[attribute::\u30bf\u30a4\u30d7='\u8b66\u544a'][position()=5]",
	    "child::\u6bb5\u843d[position()=5][attribute::\u30bf\u30a4\u30d7='\u8b66\u544a']",
	    "child::\u7ae0[child::\u30bf\u30a4\u30c8\u30eb='\u306f\u3058\u3081\u306b']",
	    "child::\u7ae0[child::\u30bf\u30a4\u30c8\u30eb]",
	    "child::*[self::\u7ae0 or self::\u4ed8\u9332]",
	    "child::*[self::\u7ae0 or self::\u4ed8\u9332][position()=last()]",

	    //Selenium bugs
	    "id('nested1')/div[1]//input[2]",
	    "id('foo')//div[contains(@id, 'useful')]//input",
	    "(//table[@class='stylee'])//th[text()='theHeaderText']/../td",

	    // The following are all expressions that used to occur in google
	    // maps XSLT templates.
	    "$address",
	    "$address=string(/page/user/defaultlocation)",
	    "$count-of-snippet-of-url = 0",
	    "$daddr",
	    "$form",
	    "$form = 'from'",
	    "$form = 'to'",
	    "$form='near'",
	    "$home",
	    "$i",
	    "$i > $page and $i < $page + $range",
	    "$i < $page and $i >= $page - $range",
	    "$i < @max",
	    "$i <= $page",
	    "$i + 1",
	    "$i = $page",
	    "$i = 1",
	    "$info = position() or (not($info) and position() = 1)",
	    "$is-first-order",
	    "$is-first-order and $snippets-exist",
	    "$more",
	    "$more > 0",
	    "$near-point",
	    "$page",
	    "$page != 'from'",
	    "$page != 'to'",
	    "$page != 'to' and $page != 'from'",
	    "$page > 1",
	    "$page = 'basics'",
	    "$page = 'details'",
	    "$page = 'from'",
	    "$page = 'to'",
	    "$page='from'",
	    "$page='to'",
	    "$r >= 0.5",
	    "$r >= 1",
	    "$r - 0",
	    "$r - 1",
	    "$r - 2",
	    "$r - 3",
	    "$r - 4",
	    "$saddr",
	    "$sources",
	    "$sources[position() < $details]",
	    "$src",
	    "$str",
	    "\"'\"",
	    "(//location[string(info/references/reference[1]/url)=string($current-url)]/info/references/reference[1])[1]",
	    "(not($count-of-snippet-of-url = 0) and (position() = 1) or not($current-url = //locations/location[position() = $last-pos]//reference[1]/url))",
	    "(not($info) and position() = 1) or $info = position()",
	    ".",
	    "../@arg0",
	    "../@filterpng",
	    "/page/@filterpng",
	    "4",
	    "@attribution",
	    "@id",
	    "@max > @num",
	    "@meters > 16093",
	    "@name",
	    "@start div @num + 1",
	    "@url",
	    "ad",
	    "address/line",
	    "adsmessage",
	    "attr",
	    "boolean(location[@id='near'][icon/@image])",
	    "bubble/node()",
	    "calltoaction/node()",
	    "category",
	    "contains($str, $c)",
	    "count(//location[string(info/references/reference[1]/url)=string($current-url)]//snippet)",
	    "count(//snippet)",
	    "count(attr)",
	    "count(location)",
	    "count(structured/source) > 1",
	    "description/node()",
	    "destination",
	    "destinationAddress",
	    "domain",
	    "false()",
	    "icon/@class != 'noicon'",
	    "icon/@image",
	    "info",
	    "info/address/line",
	    "info/distance",
	    "info/distance and $near-point",
	    "info/distance and info/phone and $near-point",
	    "info/distance or info/phone",
	    "info/panel/node()",
	    "info/phone",
	    "info/references/reference[1]",
	    "info/references/reference[1]/snippet",
	    "info/references/reference[1]/url",
	    "info/title",
	    "info/title/node()",
	    "line",
	    "location",
	    "location[@id!='near']",
	    "location[@id='near'][icon/@image]",
	    "location[position() > $numlocations div 2]",
	    "location[position() <= $numlocations div 2]",
	    "locations",
	    "locations/location",
	    "near",
	    "node()",
	    "not($count-of-snippets = 0)",
	    "not($form = 'from')",
	    "not($form = 'near')",
	    "not($form = 'to')",
	    "not(../@page)",
	    "not(structured/source)",
	    "notice",
	    "number(../@info)",
	    "number(../@items)",
	    "number(/page/@linewidth)",
	    "page/ads",
	    "page/directions",
	    "page/error",
	    "page/overlay",
	    "page/overlay/locations/location",
	    "page/refinements",
	    "page/request/canonicalnear",
	    "page/request/near",
	    "page/request/query",
	    "page/spelling/suggestion",
	    "page/user/defaultlocation",
	    "phone",
	    "position()",
	    "position() != 1",
	    "position() != last()",
	    "position() > 1",
	    "position() < $details",
	    "position()-1",
	    "query",
	    "references/@total",
	    "references/reference",
	    "references/reference/domain",
	    "references/reference/url",
	    "reviews/@positive div (reviews/@positive + reviews/@negative) * 5",
	    "reviews/@positive div (reviews/@positive + reviews/@negative) * (5)",
	    "reviews/@total",
	    "reviews/@total > 1",
	    "reviews/@total > 5",
	    "reviews/@total = 1",
	    "segments/@distance",
	    "segments/@time",
	    "segments/segment",
	    "shorttitle/node()",
	    "snippet",
	    "snippet/node()",
	    "source",
	    "sourceAddress",
	    "sourceAddress and destinationAddress",
	    "string(../@daddr)",
	    "string(../@form)",
	    "string(../@page)",
	    "string(../@saddr)",
	    "string(info/title)",
	    "string(page/request/canonicalnear) != ''",
	    "string(page/request/near) != ''",
	    "string-length($address) > $linewidth",
	    "structured/@total - $details",
	    "structured/source",
	    "structured/source[@name]",
	    "substring($address, 1, $linewidth - 3)",
	    "substring-after($str, $c)",
	    "substring-after(icon/@image, '/mapfiles/marker')",
	    "substring-before($str, $c)",
	    "tagline/node()",
	    "targetedlocation",
	    "title",
	    "title/node()",
	    "true()",
	    "url",
	    "visibleurl"
	];
	for (var i = 0; i < expr.length; ++i) {
	    ok( document.createExpression(expr[i], null), expr[i]);
	}
	
});

test('expression.evaluate', function(){
	
	var numExpr = [
	    /* number expressions */
	    [ "1+1", 2 ],
	    [ "floor( -3.1415 )", -4 ],
	    [ "-5 mod -2", -1 ],
	    [ "-5 mod 2", -1 ],
	    [ "5 mod -2", 1 ],
	    [ "5 mod 2", 1 ],
	    [ "ceiling( 3.1415 )", 4.0 ],
	    [ "floor( 3.1415 )", 3.0 ],
	    [ "ceiling( -3.1415 )", -3.0 ],
	    /* string expressions */
	    [ "substring('12345', -42, 1 div 0)", "12345" ],
	    [ "normalize-space( '  qwerty ' )", "qwerty" ],
	    [ "contains('1234567890','9')", true ],
	    [ "contains('1234567890','1')", true ],
	    [ "'Hello World!'", 'Hello World!' ],
	    [ "substring('12345', 1.5, 2.6)", "234" ],
	    [ "substring('12345', 0, 3)", "12" ],
	    /* string expressions (Japanese) */
	    [ "substring('\u3042\u3044\u3046\u3048\u304a', -42, 1 div 0)",
	      "\u3042\u3044\u3046\u3048\u304a" ],
	    [ "normalize-space( '  \u3044\u308d\u306f\u306b\u307b\u3078\u3068 ' )",
	      "\u3044\u308d\u306f\u306b\u307b\u3078\u3068" ],
	    [ "contains('\u5357\u7121\u5999\u6cd5\u9023\u83ef\u7d4c','\u7d4c')",
	      true ],
	    [ "contains('\u5357\u7121\u5999\u6cd5\u9023\u83ef\u7d4c','\u5357')",
	      true ],
	    [ "'\u3053\u3093\u306b\u3061\u306f\u3001\u4e16\u754c\uff01'",
	      '\u3053\u3093\u306b\u3061\u306f\u3001\u4e16\u754c\uff01' ],
	    [ "substring('\uff11\uff12\uff13\uff14\uff15', 1.5, 2.6)",
	      "\uff12\uff13\uff14" ],
	    [ "substring('\uff11\uff12\uff13\uff14\uff15', 0, 3)",
	      "\uff11\uff12" ],
	    /* selenium bug SEL-347, AJAXSLT issue 19 */
	    [ "count(//a[@href=\"javascript:doFoo('a', 'b')\"])", 1 ],
	    /* variables */
	    //[ "$foo", 'bar', { foo: 'bar' } ],
	    //[ "$foo", 100, { foo: 100 } ],
	    //[ "$foo", true, { foo: true } ],
	    //[ "$foo + 1", 101, { foo: 100 } ],
	    /* variables (Japanese) */
	    //[ "$\u307b\u3052", '\u307b\u3048', { \u307b\u3052: '\u307b\u3048' } ],
	    //[ "$\u307b\u3052", 100, { \u307b\u3052: 100 } ],
	    //[ "$\u307b\u3052", true, { \u307b\u3052: true } ],
	    //[ "$\u307b\u3052 + 1", 101, { \u307b\u3052: 100 } ],
	    /* functions */
	    // function id() with string argument
	    [ "count(id('test1'))", 1 ],
	    // function id() with node-set argument
	    [ "count(id(//*[@id='testid']))", 1 ],
	    /* union expressions */
	    [ "count(//*[@id='u1'])", 1 ],
	    [ "count(//*[@class='u'])", 3 ],
	    [ "count(//*[@id='u1']|//*[@id='u2'])", 2 ],
	    [ "count(//*[@id='u1']|//*[@class='u'])", 3 ],
	    [ "count(//*[@class='u']|//*[@class='u'])", 3 ],
	    [ "count(//*[@class='u']|//*[@id='u1'])", 3 ]
	];

	
    var doc = domparser.parseFromString(
        '<body>\
			\
		    <div id="test1"></div>\
		    <div id="testid">test1</div>\
		    <a id="jshref" href="javascript:doFoo(\'a\', \'b\')">javascript href with spaces</a>\
			\
		    <!-- for union expression -->\
		    <span id="u1" class="u"></span>\
		    <span id="u2" class="u"></span>\
		    <span id="u3" class="u"></span>\
		  </body>',
        'text/xml'
    );
	
	for (var i = 0; i < numExpr.length; ++i) {
    	
    	var e = numExpr[i];
		/**
		 * this is related to xslt variables and we haven't
		 * pulled this into Envjs yet.  Implementation details will
		 * have to change.
		 */
		/*  
		var ctx = new ExprContext(document.body);
    	if (e[2]) {
      		for (var k in e[2]) {
        		var v = e[2][k];
        		if (typeof v == 'number') {
          			ctx.setVariable(k, new NumberValue(v));
        		} else if (typeof v == 'string') {
          			ctx.setVariable(k, new StringValue(v));
        		} else if (typeof v == 'boolean') {
          			ctx.setVariable(k, new BooleanValue(v));
        		}
      		}
    	}
		*/

    	var result = doc.createExpression(e[0], null).evaluate(doc, null, null);
    	if (typeof e[1] == 'number') {
      		equals(e[1], result.numberValue, 'expected .numberValue');
    	} else if (typeof e[1] == 'string') {
      		equals(e[1], result.stringValue, 'expected .stringValue');
    	} else if (typeof e[1] == 'boolean') {
      		equals(e[1], result.booleanValue, 'expected .booleanValue');
    	}
  	}
	
	// For the following axis expressions, we need full control over the
	// entire document, so we cannot evaluate them against document.body,
	// but use our own XML document here. We verify that they give the
	// right results by counting the nodes in their result node sets. For
	// the axes that contain only one node, we check that we found the
	// right node using the id. For axes that contain elements, we only
	// count the elements, so we don't have to worry about whitespace
	// normalization for the text nodes.
	var axisTests = [
	    [ "count(//*[@id='self']/ancestor-or-self::*)", 3 ],
	    [ "count(//*[@id='self']/ancestor::*)", 2 ],
	    [ "count(//*[@id='self']/attribute::node())", 1 ],
	    [ "count(//*[@id='self']/child::*)", 1 ],
	    [ "count(//*[@id='self']/descendant-or-self::*)", 3 ],
	    [ "count(//*[@id='self']/descendant::*)", 2 ],
	    [ "count(//*[@id='self']/following-sibling::*)", 3 ],
	    [ "count(//*[@id='self']/@*/following-sibling::*)", 0 ],
	    [ "count(//*[@id='self']/following::*)", 4 ],
	    [ "//*[@id='self']/parent::*/@id", "parent" ],
	    [ "count(/parent::*)", 0 ],
	    [ "count(//*[@id='self']/preceding-sibling::*)", 1 ],
	    [ "count(//*[@id='self']/@*/preceding-sibling::*)", 0 ],
	    [ "count(//*[@id='self']/preceding::*)", 2 ],
	    [ "//*[@id='self']/self::*/@id", "self" ]
	];
	
	doc = domparser.parseFromString(
	  	'<page>\
	       	<p></p>\
	       	<list id="parent">\
	        	<item></item>\
	        	<item id="self"><d><d></d></d></item>\
	        	<item></item>\
	        	<item></item>\
	        	<item></item>\
	       	</list>\
	       	<f></f>\
	    </page>'
	);
	
	for (var i = 0; i < axisTests.length; ++i) {
	    var e = axisTests[i];
    	var result = doc.createExpression(e[0], null).evaluate(doc, null, null);
	    if (typeof e[1] == 'number') {
	      equals(e[1], result.numberValue, 'expected .numberValue');
	    } else if (typeof e[1] == 'string') {
	      equals(e[1], result.stringValue, 'expected .stringValue');
	    } else if (typeof e[1] == 'boolean') {
	      equals(e[1], result.booleanValue, 'expected .booleanValue');
	    }
	}
});

test('document.evalute', function(){
	
	//test attribute asterisk
	var doc = domparser.parseFromString('<x a="1" b="1"><y><z></z></y></x>');
	var result = doc.evaluate("count(/x/@*)", doc, null, XPathResult.NUMBER_TYPE, null);
	equals(2, result.numberValue, 'attribute asterisk');
	
	doc = domparser.parseFromString(
		'<page>\
			<request>\
	    		<q>new york</q>\
	      	</request>\
	      	<location lat="100" lon="200"/>\
	    </page>'
	);
	
	doTestEvalDom(doc, 'page', 'location', 'lat', '100', 'lon', '200');
	
	doc = domparser.parseFromString(
	    '<\u30da\u30fc\u30b8>\
	      	<\u30ea\u30af\u30a8\u30b9\u30c8>\
	      		<\u30af\u30a8\u30ea>\u6771\u4eac</\u30af\u30a8\u30ea>\
	      	</\u30ea\u30af\u30a8\u30b9\u30c8>\
	      	<\u4f4d\u7f6e \u7def\u5ea6="\u4e09\u5341\u4e94" \u7d4c\u5ea6="\u767e\u56db\u5341"/>\
	    </\u30da\u30fc\u30b8>'
	);

	doTestEvalDom(doc, '\u30da\u30fc\u30b8', '\u4f4d\u7f6e', '\u7def\u5ea6', '\u4e09\u5341\u4e94', '\u7d4c\u5ea6', '\u767e\u56db\u5341');
	
	function doTestEvalDom(doc, page, location, lat, latValue, lon, lonValue) {
	  	var slashPage = '/' + page;
	  	var slashPageLocationAtLat = '/' + page + '/' + location + '/@' + lat;
	  	var slashPageLocationAtLon = '/' + page + '/' + location + '/@' + lon;

	  	var result = doc.evaluate(page, doc, null, XPathResult.ANY_TYPE, null);
	  	equals(result.snapshotLength, 1, "snapshotLength for xpath "+page);
	  	ok(result.singleNodeValue, "singleNodeValue for xpath "+page);
	  	equals(result.singleNodeValue.nodeName, page, "nodeName page");

	  	result = doc.evaluate(slashPage, doc, null, XPathResult.ANY_TYPE, null);
	  	equals(result.snapshotLength, 1, "snapshotLength for xpath "+slashPage);
	  	ok(result.singleNodeValue, "singleNodeValue for xpath "+slashPage);
	  	equals(result.singleNodeValue.nodeName, page, "nodeName page");
	
	  	result = doc.evaluate('/', doc, null, XPathResult.ANY_TYPE, null);
	  	equals(result.snapshotLength, 1, "snapshotLength for xpath /");
	  	ok(result.singleNodeValue, "singleNodeValue for xpath /");
	  	equals(result.singleNodeValue.nodeName, '#document', "nodeName #document");
	
		result = doc.evaluate(slashPageLocationAtLat, doc, null, XPathResult.ANY_TYPE, null);
		equals(result.snapshotLength, 1, "snapshotLength for xpath "+slashPageLocationAtLat);
		ok(result.singleNodeValue, "singleNodeValue for xpath "+slashPageLocationAtLat);
		equals(result.singleNodeValue.nodeName, lat, "nodeName");
		equals(result.singleNodeValue.nodeValue, latValue, "nodeValue");
		
		result = doc.evaluate(slashPageLocationAtLon, doc, null, XPathResult.ANY_TYPE, null);
		equals(result.snapshotLength, 1, "snapshotLength for xpath "+slashPageLocationAtLon);
		ok(result.singleNodeValue, "singleNodeValue for xpath "+slashPageLocationAtLon);
		equals(result.singleNodeValue.nodeName, lon, "nodeName");
		equals(result.singleNodeValue.nodeValue, lonValue, "nodeValue");
		
		
		result = doc.evaluate('//*', doc, null, XPathResult.ANY_TYPE, null);
		
		equals(result.snapshotLength, 4, "snapshotLength for xpath //*");
		equals(result.iterateNext().nodeName, page, "iterateNext().nodeName");
		ok(result.iterateNext(), "iterateNext");
		ok(result.iterateNext(), "iterateNext");
		equals(result.iterateNext().nodeName, location, "iterateNext().nodeName");
		equals(result.iterateNext(), null, "iterateNext should be null");
		
	}
});