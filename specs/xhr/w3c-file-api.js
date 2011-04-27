/******************************************************************************
http://dev.w3.org/2006/webapi/FileAPI/

W3C
File API
W3C Editor’s Draft 8 March 2011

Latest Editor’s Draft:
    http://dev.w3.org/2006/webapi/FileAPI/
Latest Published Version:
    http://www.w3.org/TR/FileAPI/
Previous Version(s):
    http://www.w3.org/TR/2009/WD-FileAPI-20091117/
Editors:
    Arun Ranganathan, Mozilla Corporation <arun@mozilla.com>
    Jonas Sicking, Mozilla Corporation <jonas@sicking.cc>

Copyright © 2010 W3C® (MIT, ERCIM, Keio), All Rights Reserved. W3C liability,
trademark and document use rules apply.

Abstract

This specification provides an API for representing file objects in web
applications, as well as programmatically selecting them and accessing their
data. This includes:

    A FileList sequence, which represents an array of individually selected
    files from the underlying system. The user interface for selection can be
    invoked via <input type="file">, i.e. when the input element is in the File
    Upload state [HTML5] .

    A Blob interface, which represents raw binary data, and allows access to
    ranges of bytes within the Blob object.

    A File interface, which includes readonly informational attributes about a
    file such as its name and the date of the last modification (on disk) of
    the file.

    A FileReader interface, which provides methods to read a File or a Blob,
    and an event model to obtain the results of these reads.

    A FileError interface and a FileException exception which define error
    conditions used by this specification.

    A URI scheme for use with binary data such as files, so that they can be
    referenced within web applications.

Additionally, this specification defines objects to be used within threaded web
applications for the synchronous reading of files.

The section on Requirements and Use Cases [REQ] covers the motivation behind
this specification.

This API is designed to be used in conjunction with other APIs and elements on
the web platform, notably: XMLHttpRequest (e.g. with an overloaded send()
method for File or Blob objects), postMessage, DataTransfer (part of the drag
and drop API defined in [HTML5,]) and Web Workers. Additionally, it should be
possible to programmatically obtain a list of files from the input element when
it is in the File Upload state[HTML5]. These kinds of behaviors are defined in
the appropriate affiliated specifications.

Editorial note

This is revision $Id: Overview.html,v 1.46 2011-03-08 20:26:11 arangana Exp $.

There are 1 further editorial notes in the document.

Status of this Document

This section describes the status of this document at the time of its
publication. Other documents may supersede this document. A list of current W3C
publications and the latest revision of this technical report can be found in
the W3C technical reports index at http://www.w3.org/TR/.

This document is the 8 March 2011 Editor’s Draft of the File API specification.
Please send comments about this document to public-webapps@w3.org (archived).

Previous discussion of this specification has taken place on two other mailing
lists: public-webapps@w3.org (archive) and public-webapi@w3.org (archive).
Ongoing discussion will be on the public-webapps@w3.org mailing list.

This section describes the status of this document at the time of its
publication. Other documents may supersede this document, since it is only an
editor's draft. A list of current W3C publications and the latest revision of
this technical report can be found in the W3C technical reports index at
http://www.w3.org/TR/.

This document is produced by the Web Applications WG in the W3C Interaction
Domain.

Web content and browser developers are encouraged to review this draft. Please
send comments to public-webapps@w3.org, the W3C's public email list for issues
related to Web APIs. Archives of the list are available.

This document is produced by the Web Applications Working Group, part of the
Rich Web Clients Activity in the W3C Interaction Domain. Changes made to this
document can be found in the W3C public CVS server.

Publication as an Editor’s Draft does not imply endorsement by the W3C
Membership. This is a draft document and may be updated, replaced or obsoleted
by other documents at any time. It is inappropriate to cite this document as
other than work in progress.

This document was produced by a group operating under the 5 February 2004 W3C
Patent Policy. W3C maintains a public list of any patent disclosures made in
connection with the deliverables of the group; that page also includes
instructions for disclosing a patent. An individual who has actual knowledge of
a patent which the individual believes contains Essential Claim(s) must
disclose the information in accordance with section 6 of the W3C Patent Policy.

Table of Contents

    1. Introduction
    2. Conformance
    3. Terminology and Algorithms
    4. The FileList Sequence
        4.1. Conformance Criteria for FileList
    5. The Blob Interface
        5.1. Attributes
        5.2. Methods and Parameters
        5.3. The File Interface
            5.3.1. Attributes
        5.4. The FileReader Interface
            5.4.1. The FileReader Task Source
            5.4.2. Constructors
            5.4.3. Event Handler Attributes
            5.4.4. FileReader States
            5.4.5. Reading a File or Blob
                5.4.5.1. Multiple Reads
                5.4.5.2. The result attribute
                5.4.5.3. The readAsBinaryString() method
                5.4.5.4. The readAsDataURL() method
                5.4.5.5. The readAsText() method
                5.4.5.6. The readAsArrayBuffer() method
                5.4.5.7. The abort() method
                5.4.5.8. Blob Parameters
                5.4.5.9. Determining Encoding
                5.4.5.10. Events
                    5.4.5.10.1. Event Summary
        5.5. Reading on Threads
            5.5.1. The FileReaderSync Interface
                5.5.1.1. Constructors
                5.5.1.2. The readAsBinaryString method
                5.5.1.3. The readAsText method
                5.5.1.4. The readAsDataURL method
                5.5.1.5. The readAsArrayBuffer method
        5.6. Errors and Exceptions
            5.6.1. The FileError Interface
            5.6.2. The FileException exception
            5.6.3. Error Code Descriptions
        5.7. A URI for Blob and File reference
            5.7.1. Definition of blob URI Scheme
            5.7.2. Origin of Blob URIs
            5.7.3. Lifetime of Blob URIs
            5.7.4. Dereferencing Model for Blob URIs
                5.7.4.1. 200 OK
                5.7.4.2. 403 Not Allowed
                5.7.4.3. 404 Not Found
                5.7.4.4. 500 Internal Server Error
            5.7.5. Creating and Revoking a Blob URI
        5.8. Security Considerations
        5.9. Requirements and Use Cases
        5.10. Acknowledgements
        5.11. References
            5.11.1. Normative references
            5.11.2. Informative References

1. Introduction

This section is informative.

Web applications should have the ability to manipulate as wide as possible a
range of user input, including files that a user may wish to upload to a remote
server or manipulate inside a rich web application. This specification defines
the basic representations for files, lists of files, errors raised by access to
files, and programmatic ways to read files. Additionally, this specification
also defines an interface that represents "raw data" which can be
asynchronously processed on the main thread of conforming user agents. The
interfaces and API defined in this specification can be used with other
interfaces and APIs exposed to the web platform.

The File interface represents file data typically obtained from the underlying
file system, and the Blob interface ("Binary Large Object" -- a name originally
introduced to web APIs in Google Gears) represents raw data. File or Blob reads
should happen asynchronously on the main thread, with an optional synchronous
API used within threaded web applications. An asynchronous API for reading
files prevents blocking and UI "freezing" on a user agent's main thread. This
specification defines an asynchronous API based on an event model to read and
access a File or Blob's data. A FileReader object provides asynchronous read
methods to access that file's data through event handler attributes and the
firing of events. The use of events and event handlers allows separate code
blocks the ability to monitor the progress of the read (which is particularly
useful for remote drives or mounted drives, where file access performance may
vary from local drives) and error conditions that may arise during reading of a
file. An example will be illustrative. 

Example

In the example below, different code blocks handle progress, error, and success
conditions.

ECMAScript


function startRead() {  
  // obtain input element through DOM 
  
  var file = document.getElementById('file').files[0];
  if(file){
    getAsText(file);
  }
}

function getAsText(readFile) {
        
  var reader = new FileReader();
  
  // Read file into memory as UTF-16      
  reader.readAsText(readFile, "UTF-16");
  
  // Handle progress, success, and errors
  reader.onprogress = updateProgress;
  reader.onload = loaded;
  reader.onerror = errorHandler;
}

function updateProgress(evt) {
  if (evt.lengthComputable) {
    // evt.loaded and evt.total are ProgressEvent properties
    var loaded = (evt.loaded / evt.total);
    if (loaded < 1) {
      // Increase the prog bar length
      // style.width = (loaded * 200) + "px";
    }
  }
}

function loaded(evt) {  
  // Obtain the read file data    
  var fileString = evt.target.result;
  // Handle UTF-16 file dump
  if(utils.regexp.isChinese(fileString)) {
    //Chinese Characters + Name validation
  }
  else {
    // run other charset test
  }
  // xhr.send(fileString)     
}

function errorHandler(evt) {
  if(evt.target.error.code == evt.target.error.NOT_READABLE_ERR) {
    // The file could not be read
  }
}
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
2. Conformance

Everything in this specification is normative except for examples and sections
marked as being informative.

The keywords “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”,
“RECOMMENDED”, “MAY” and “OPTIONAL” in this document are to be interpreted as
described in Key words for use in RFCs to Indicate Requirement Levels
[RFC2119].

The following conformance classes are defined by this specification:

conforming implementation

    A user agent is considered to be a conforming implementation if it
    satisfies all of the MUST-, REQUIRED- and SHALL-level criteria in this
    specification that apply to implementations.

3. Terminology and Algorithms

The terms and algorithms <fragment>, <scheme>, document, document base URL,
unload a document, unloading document cleanup steps, event handler attributes,
event handler event type, Function, origin, resolve a URL, same origin, task,
task source, URL, URL character encoding, the "already started" flag for script
processing, and queue a task are defined by the HTML 5 specification [HTML5].

This specification includes algorithms (steps) as part of the definition of
methods. Conforming implementations (referred to as "user agents" from here on)
MAY use other algorithms in the implementation of these methods, provided the
end result is the same.

4. The FileList Sequence

This sequence parameterized type exposes the list of files that have been
selected.

IDL

    typedef sequence<File> FileList;
    
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

Example

Sample usage typically involves DOM access to the <input type="file"> element
within a form, and then accessing selected files.

ECMAScript


    // uploadData is a form element
    // fileChooser is input element of type 'file'
    var file = document.forms['uploadData']['fileChooser'].files[0];
    
    if(file)
    {
      // Perform file ops
    }  
    

Note

The HTMLInputElement interface [HTML5] has a readonly attribute of type
FileList, which is what is being accessed in the above example. Other
interfaces with a readonly attribute of type FileList include the DataTransfer
interface [HTML5].
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.1. Conformance Criteria for FileList

Conforming user agents MUST expose the selected file(s) with an object of type
FileList, which is a sequenced parametrized type of File objects. Some
conforming user agents support multiple file selections, in which case the
FileList object MUST make available all selected files. If the IDL object does
not apply, or if there are no file selections (e.g. through cancelation)
conforming user agents MUST return null where they would return an object of
type FileList
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5. The Blob Interface

This interface represents raw data. It provides a method to slice data objects
between ranges of bytes into further chunks of raw data. It also provides an
attribute representing the size of the chunk of data. The File interface
inherits from this interface.

IDL

    interface Blob {
      
      readonly attribute unsigned long long size;
      readonly attribute DOMString type;
      //slice Blob into byte-ranged chunks
      
      Blob slice(in unsigned long long start,
                 in unsigned long long length,
                 optional DOMString contentType); 
    
    };
    

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.1. Attributes

size

    Represents the size of the Blob object in bytes. On getting, conforming
    user agents MUST return the total number of bytes that a FileReader or
    FileReaderSync object can read, or 0 if the Blob has no bytes to be read.

type

    The ASCII-encoded string in lower case representing the media type of the
    Blob, expressed as an RFC2046 MIME type [RFC2046]. Conforming user agents
    SHOULD return the MIME type of the Blob, if it is known. If conforming user
    agents cannot determine the media type of the Blob, they MUST return the
    empty string. A string is a valid MIME type if it matches the media-type
    token defined in section 3.7 "Media Types" of RFC 2616 [HTTP].

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.2. Methods and Parameters

The slice method

    Returns a new Blob object between the ranges of bytes specified.
    
    The start parameter is a value for the start point of a slice call.
    
    The length parameter is a value for the end point of a slice call as byte
    offsets from start.
    
    The contentType parameter is optional, and can be used to set a value
    identical to one that is set with the HTTP/1.1 Content-Type header [HTTP]
    on the Blob returned by the slice call. If this parameter is used, the
    returned Blob MUST have a type attribute that, on getting, returns the
    string used for this parameter.
    
    The slice method MUST clamp on values of size if index arithmetic exceeds
    the bounds of size. In particular, this means that for a given slice call
    the following are conformance criteria:

        If start + length > size then a user agent MUST return a Blob object as
        if slice(start, size-start) was called.
        
		If start > size then a user agent MUST return a Blob object of size 0
        
		Otherwise, a user agent MUST return a new Blob object between the
        ranges of bytes specified, with a type that matches the optional
        contentType argument, if it is provided.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.3. The File Interface

This interface describes a single file in a FileList and exposes its name. It
inherits from Blob.

IDL

  interface File : Blob {

      readonly attribute DOMString name;
      readonly attribute Date lastModifiedDate;
};
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************  

5.3.1. Attributes

name

    The name of the file; on getting, this MUST return the name of the file as
    a string. There are numerous file name variations on different systems;
    this is merely the name of the file, without path information. On getting,
    if user agents cannot make this information available, they MUST return the
    empty string.

lastModifiedDate

    The last modified date of the file. On getting, if user agents can make
    this information available, this MUST return a new Date[HTML5] object
    initialized to the last modified date of the file; otherwise, this MUST
    return null.

Note

The File interface is available on objects that expose an attribute of type
FileList; these objects are defined in HTML5 [HTML5].
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.4. The FileReader Interface

This interface provides methods to read Files or Blobs into memory, and to
access the data from those Files or Blobs using progress events and event
handler attributes [DOM3Events]. It is desirable to read data from file systems
asynchronously in the main thread of user agents. This interface provides such
an asynchronous API, and is specified to be used with the global object (Window
[HTML5]).

IDL

[Constructor]
interface FileReader {

  // async read methods
  void readAsArrayBuffer(in Blob blob);
  void readAsBinaryString(in Blob blob);
  void readAsText(in Blob blob, [Optional] in DOMString encoding);
  void readAsDataURL(in Blob blob);

  void abort();

  // states
  const unsigned short EMPTY = 0;
  const unsigned short LOADING = 1;
  const unsigned short DONE = 2;
  
  
  readonly attribute unsigned short readyState;

  // File or Blob data
  readonly attribute any result;
  
  readonly attribute FileError error;

  // event handler attributes
  attribute Function onloadstart;
  attribute Function onprogress;
  attribute Function onload;
  attribute Function onabort;
  attribute Function onerror;
  attribute Function onloadend;

};
FileReader implements EventTarget;
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************  

5.4.1. The FileReader Task Source

The FileReader interface enables asynchronous reads on individual blobs by
dispatching events to event handler methods. Unless stated otherwise, the task
source that is used in this specification is the FileReader. This task source
is used for tasks that are asynchronously dispatched, or for event tasks that
are queued for dispatching.

5.4.2. Constructors

When the FileReader() constructor is invoked, the user agent MUST return a new
FileReader object.

In environments where the global object is represented by a Window or a
WorkerGlobalScope object, the FileReader constructor MUST be available.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.4.3. Event Handler Attributes

The following are the event handler attributes (and their corresponding event
handler event types) that user agents MUST support on FileReader as DOM
attributes:
event handler attribute 	event handler event type
onloadstart 				loadstart
onprogress 					progress
onabort 					abort
onerror 					error
onload 						load
onloadend 					loadend
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.4.4. FileReader States

The FileReader object can be in one of 3 states. The readyState attribute, on
getting, MUST return the current state, which MUST be one of the following
values:

EMPTY (numeric value 0)

    The object has been constructed, and there are no pending reads.

LOADING (numeric value 1)

    A File or Blob is being read. One of the read methods is being processed.

DONE (numeric value 2)

    The entire File or Blob has been read into memory, or a file error occurred
    during read, or the read was aborted using abort(). The FileReader is no
    longer reading a File or Blob.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.4.5. Reading a File or Blob

5.4.5.1. Multiple Reads

The FileReader interface makes available four asynchronous read methods --
readAsArrayBuffer, readAsBinaryString, readAsText, and readAsDataURL, which
read files into memory. If multiple read methods are called on the same
FileReader object, user agents MUST only process the last call to a read
method, which is the call that occurs last in a script block that has the
"already started" flag set [HTML5].
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.4.5.2. The result attribute

On getting, the result attribute returns a Blob's data as a DOMString, or as an
ArrayBuffer [TypedArrays], or null, depending on the read method that has been
called on the FileReader, and any errors that may have occurred. It can also
return partial Blob data. Partial Blob data is the part of the File or Blob
that has been read into memory currently; when processing the read methods
readAsBinaryString or readAsText, partial Blob data is a DOMString that is
incremented as more bytes are loaded (a portion of the total) [ProgressEvents],
and when processing readAsArrayBuffer partial Blob data is an ArrayBuffer
[TypedArrays] object consisting of the bytes loaded so far (a portion of the
total)[ProgressEvents]. The list below is normative for the result attribute
and are the conformance criteria for this attribute:

    On getting, if the readyState is EMPTY (no read method has been called)
    then the result attribute MUST return null.
    
     On getting, if an error in reading the File or Blob has occurred (using
    any read method), then the result attribute MUST return null.
    
     On getting, if the readAsDataURL read method is used, the result attribute
    MUST return a DOMString that is a Data URL [DataURL] encoding of the File
    or Blob's data.
    
     On getting, if the readAsBinaryString read method is called (and no error
    in reading the File or Blob has occurred), then the result attribute MUST
    return a DOMString representing the File or Blob's data as a binary string,
    in which every byte is represented by an integer in the range [0..255]. On
    getting, while processing the readAsBinaryString read method, the result
    attribute SHOULD return partial Blob data in binary string format as a
    DOMString that is incremented as more data is read.
    
     On getting, if the readAsText read method is called (and no error in
    reading the File or Blob has occurred), then the result attribute MUST
    return a string representing the File or Blob's data as a text string, and
    SHOULD decode the string into memory in the format specified by the
    encoding determination. On getting, while processing the readAsText read
    method, this attibute SHOULD return partial Blob data in the format
    specified by the encoding determination as a DOMString that is incremented
    as more data is read.
    
     On getting, if the readAsArrayBuffer read method is called (and no error
    in reading the File or Blob has occurred), then the result attribute MUST
    return an ArrayBuffer [TypedArrays] object. On getting, while processing
    the readAsArrayBuffer read method, the result attribute SHOULD return
    partial Blob data as an ArrayBuffer [TypedArrays]; at least one ArrayBuffer
    object is returned till the Blob is fully loaded.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
5.4.5.3. The readAsBinaryString() method

When the readAsBinaryString(blob) method is called, the user agent MUST run the
steps below (unless otherwise indicated).

    Set readyState to EMPTY and set result to null.

    If an error occurs during reading of the blob parameter, set readyState to
    DONE and set result to null. Proceed to the error steps below.

        Dispatch a progress event called error. Set the error attribute; on
        getting, the error attribute MUST be a a FileError object with a valid
        error code that indicates the kind of file error that has occurred.

        Dispatch a progress event called loadend.

        Terminate this overall set of steps.

    If no error has occurred, set readyState to LOADING

    Queue a task to dispatch a progress event called loadstart.

    Make progress notifications. As the bytes from the blob argument are read,
    user agents SHOULD ensure that on getting, the result attribute returns
    partial Blob data representing the number of bytes currently loaded (as a
    fraction of the total) [ProgressEvents], as a binary string.

    When the blob has been read into memory fully, set readyState to DONE

    Set the result attribute to be blob's data content represented as a binary
    string; on getting, the result attribute returns the (complete) data of
    blob as a binary string.

    Terminate this overall set of steps.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
5.4.5.4. The readAsDataURL() method

When the readAsDataURL(blob) method is called, the user agent MUST run the
steps below (unless otherwise indicated).

    Set readyState to EMPTY and set result to null.

    If an error occurs during reading of the blob parameter, OR if a user
    agent's URL length limitations prevent returning data as a Data URL
    [DataURL], set readyState to DONE and set result to null. Proceed to the
    error steps below.

        Dispatch a progress event called error. Set the error attribute; on
        getting, the error attribute MUST be a a FileError object with a valid
        error code that indicates the kind of file error that has occurred.

        Dispatch a progress event called loadend.

        Terminate this overall set of steps.

    If no error has occurred, set readyState to LOADING

    Queue a task to dispatch a progress event called loadstart.

    Make progress notifications.

    When the blob has been read into memory fully, set readyState to DONE

    Set the result attribute to be blob's data content represented as a Data
    URL [DataURL]; on getting, the result attribute returns the (complete) data
    of blob as a Data URL [DataURL].

        Use the blob's type attribute as part of the Data URL if it is
        available in keeping with the Data URL specification [DataURL] .

        If the type attribute is not available on the blob return a Data URL
        without a media-type. [DataURL].

        Note

        Data URLs that do not have media-types [RFC2046] MUST be treated as
        plain text by conforming user agents. [DataURL].

    Terminate this overall set of steps.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
5.4.5.5. The readAsText() method

When the readAsText(blob, encoding) method is called (the encoding argument is
optional), the user agent MUST run the steps below (unless otherwise
indicated).

    Set readyState to EMPTY and set result to null.

    If an error occurs during reading the blob parameter, set readyState to
    DONE and set result to null. Proceed to the error steps below.

        Dispatch a progress event called error. Set the error attribute; on
        getting, the error attribute MUST be a a FileError object with a valid
        error code that indicates the kind of file error that has occurred.

        Dispatch a progress event called loadend.

        Terminate this overall set of steps.

    If no error has occurred, set readyState to LOADING

    Queue a task to dispatch a progress event called loadstart.

    Make progress notifications. As the bytes from the blob argument are read,
    user agents SHOULD ensure that on getting, the result attribute returns
    partial Blob data representing the number of bytes currently loaded (as a
    fraction of the total) [ProgressEvents], decoded into memory according to
    the encoding determination.

    When the blob has been read into memory fully, set readyState to DONE

    Set the result attribute to be blob's data content represented as a string
    in a format determined by the encoding determination; on getting, the
    result attribute returns the (complete) data of blob as a string, decoded
    into memory according to the encoding determination.

    Terminate this overall set of steps.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
5.4.5.6. The readAsArrayBuffer() method

When the readAsArrayBuffer(blob) method is called, the user agent MUST run the
steps below (unless otherwise indicated).

    Set readyState to EMPTY and set result to null.

    If an error occurs during reading the blob parameter, set readyState to
    DONE and set result to null. Proceed to the error steps below.

        Dispatch a progress event called error. Set the error attribute; on
        getting, the error attribute MUST be a a FileError object with a valid
        error code that indicates the kind of file error that has occurred.

        Dispatch a progress event called loadend.

        Terminate this overall set of steps.

    If no error has occurred, set readyState to LOADING

    Queue a task to dispatch a progress event called loadstart.

    Make progress notifications. As the bytes from the blob argument are read,
    user agents SHOULD ensure that on getting, the result attribute returns
    partial Blob data representing the number of bytes currently loaded (as a
    fraction of the total) [ProgressEvents], as an ArrayBuffer [TypedArrays];
    user agents SHOULD return at least one such ArrayBuffer [TypedArrays] while
    processing this read method.

    When the blob has been read into memory fully, set readyState to DONE

    Set the result attribute to be blob's data content represented as an
    ArrayBuffer [TypedArrays]; on getting, the result attribute returns the
    (complete) data of blob as an ArrayBuffer [TypedArrays].

    Terminate this overall set of steps.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
5.4.5.7. The abort() method

When the abort() method is called, the user agent MUST run the steps below:

    Set readyState to DONE and result to null.

    Terminate any steps while processing a read method.

    Dispatch a progress event called abort

    Dispatch a progress event called loadend

    Stop dispatching any further progress events.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.4.5.8. Blob Parameters

Many methods in this specification take mandatory Blob parameters.

blob

    This is a Blob argument used to call all four asynchronous read methods on
    FileReader and all four synchronous read methods on FileReaderSync; it is
    also used to call the createObjectURL method. For the purposes of this
    specification, it will typically be a reference to a single File in a
    FileList or a Blob object not obtained from the file system that is in
    scope of the global object from which the method call was made.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.4.5.9. Determining Encoding

When reading blob objects using the readAsText() read method, the optional
encoding string parameter MUST be a name or an alias of a character set used on
the Internet [IANACHARSET], or else is considered invalid. If the encoding
argument supplied is valid, user agents SHOULD decode the blob using that
encoding. If the encoding argument is invalid, or the optional encoding
argument is not supplied, or the user agent cannot decode the blob using
encoding, the following encoding determination algorithm MUST be followed:

    User agents SHOULD decode blob data using encoding, if it is provided. If
    the encoding argument is invalid, or the optional encoding argument is not
    supplied, or the user agent cannot decode the blob using encoding, then let
    charset be null.

    For each of the rows in the following table, starting with the first one
    and going down, if the first bytes of blob match the bytes given in the
    first column, then let charset be the encoding given in the cell in the
    second column of that row. If there is no match charset remains null.

    Bytes in Hexadecimal 	Description
    FE FF 	UTF-16BE BOM
    FF FE 	UTF-16LE BOM
    EF BB BF 	UTF-8 BOM

    If charset is null let charset be UTF-8.

    Return the result of decoding the blob using charset; on getting, the
    result attribute of the FileReader object returns a string in charset
    format. The synchronous readAsText method of the FileReaderSync object
    returns a string in charset format. Replace bytes or sequences of bytes
    that are not valid according to the charset with a single U+FFFD character
    [Unicode].

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.4.5.10. Events

When this specification says to make progress notifications for a read method,
the following steps MUST be followed:

    While the read method is processing, queue a task to dispatch a progress
    event called progress about every 50ms or for every byte read into memory,
    whichever is least frequent.
    
    When the data from the blob has been completely read into memory, queue a
    task to dispatch a progress event called load
    
    When the data from the blob has been completely read into memory, queue a
    task to dispatch a progress event called loadend

When this specification says to dispatch a progress event called e (for some
ProgressEvent e [DOM3Events] dispatched on a FileReader reader), the following
list MUST be followed:

    The progress event e does not bubble. e.bubbles MUST be false [DOM3Events]
    
    The progress event e is NOT cancelable. e.cancelable MUST be false
    [DOM3Events]
    
    The progress event e is dispatched on the FileReader object (which is the
    task source in this specification, and the EventTarget). User agents MUST
    call reader.dispatchEvent(e) [DOM3Events]

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.4.5.10.1. Event Summary

The following are the events that are dispatched on FileReader objects.

Event name 	Interface 		Dispatched when…
loadstart 	ProgressEvent 	When the read starts.
progress 	ProgressEvent 	While reading (and decoding) blob, and reporting 
							partial Blob data (progess.loaded/progress.total)
abort 		ProgressEvent 	When the read has been aborted. For instance, by 
							invoking the abort() method.
error 		ProgressEvent 	When the read has failed (see errors).
load 		ProgressEvent 	When the read has successfully completed.
loadend 	ProgressEvent 	When the request has completed (either in success 
							or failure).
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.5. Reading on Threads

Web Workers allow for the use of synchronous File or Blob read APIs, since such
reads on threads do not block the main thread. This section defines a
synchronous API, which can be used within Workers [Web Workers]. Workers can
avail of both the asynchronous API (the FileReader object) and the synchronous
API (the FileReaderSync object).

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.5.1. The FileReaderSync Interface

This interface provides methods to read files or Blobs into memory, and to
access the data of these files or Blobs.

IDL

[Constructor]
interface FileReaderSync {

  // Synchronously return strings
  // All three methods raise FileException
  
  ArrayBuffer readAsArrayBuffer(in Blob blob);
  DOMString readAsBinaryString(in Blob blob); 
  DOMString readAsText(in Blob blob, [Optional] in DOMString encoding);                                                       
  DOMString readAsDataURL(in Blob blob); 
};

Note

The FileReaderSync object's read methods -- namely readAsBinaryString,
readAsText, readAsDataURL and readAsArrayBuffer -- have the same method
signatures as the read methods of the FileReader object, and read files into
memory. The difference is that these are specified to behave synchronously,
with string or ArrayBuffer [TypedArrays] return values. These methods raise
FileException.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.5.1.1. Constructors

When the FileReaderSync() constructor is invoked, the user agent MUST return a
new FileReaderSync object.

In environments where the global object is represented by a WorkerGlobalScope
object, the FileReaderSync constructor MUST be available.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
5.5.1.2. The readAsBinaryString method

When the readAsBinaryString(blob) method is called, the following steps MUST be
followed:

    If an error occurs during reading the blob parameter, throw a FileException
    with the appropriate error code. Terminate these overall steps.
    
    If no error has occurred, read blob into memory. Return the data contents
    of blob as a binary string.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
5.5.1.3. The readAsText method

When the readAsText(blob, encoding) method is called (the encoding argument is
optional), the following steps MUST be followed:

    If an error occurs during reading of the blob parameter, throw a
    FileException with the appropriate error code. Terminate these overall
    steps.

    If no error has occurred, read blob into memory. Return the data contents
    of blob using the encoding determination algorithm.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.5.1.4. The readAsDataURL method

When the readAsDataURL(blob) method is called, the following steps MUST be
followed:

    If an error occurs during reading of the blob parameter, throw a
    FileException with the appropriate error code. Terminate these overall
    steps.

    If no error has occurred, read blob into memory. Return the data contents
    of blob as a Data URL [DataURL]
        
		Use the blob's type attribute as part of the Data URL if it is
        available in keeping with the Data URL specification [DataURL] .
        
		If the type attribute is not available on the blob return a Data URL
        without a media-type. [DataURL].

        Note

        Data URLs that do not have media-types [RFC2046] MUST be treated as
        plain text by conforming user agents. [DataURL].

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.5.1.5. The readAsArrayBuffer method

When the readAsArrayBuffer(blob) method is called, the following steps MUST be
followed:

    If an error occurs during reading the blob parameter, throw a FileException
    with the appropriate error code. Terminate these overall steps.

    If no error has occurred, read blob into memory. Return the data contents
    of blob as an ArrayBuffer [TypedArrays]

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.6. Errors and Exceptions

Error conditions can occur when reading files from the underlying filesystem.
The list below of potential error conditions is informative, with links to
normative descriptions of error codes:

    The File or Blob being accessed may not exist at the time one of the
    asynchronous read methods or synchronous read methods are called. This may
    be due to it having been moved or deleted after a reference to it was
    acquired (e.g. concurrent modification with another application). See
    NOT_FOUND_ERR
    
     A File or Blob may be unreadable. This may be due to permission problems
    that occur after a reference to a File or Blob has been acquired (e.g.
    concurrent lock with another application). See NOT_READABLE_ERR
    
     User agents MAY determine that some files are unsafe for use within Web
    applications. A file may change on disk since the original file selection,
    thus resulting in an invalid read. Additionally, some file and directory
    structures may be considered restricted by the underlying filesystem;
    attempts to read from them may be considered a security violation. See the
    security considerations. See SECURITY_ERR
    
     Files may be too large to return to the data structures of a Web
    application. An example might be that URL length limitations imposed by
    user agents on Data URLs may make obtaining large files encoded as Data
    URLs impossible to return [DataURL]. See ENCODING_ERR
    
     During the reading of a File or Blob, the Web application may itself wish
    to abort (see abort()) the call to an asynchronous read method. See
    ABORT_ERR

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.6.1. The FileError Interface

This interface is used to report errors asynchronously. The FileReader object's
error attribute is a FileError object, and is accessed asynchronously through
the onerror event handler when error events are generated. Conforming user
agents that make available the FileReader() constructor on their global objects
MUST also make available the FileError interface object.

IDL

 interface FileError {
   // File error codes
   // Found in DOMException
   const unsigned short NOT_FOUND_ERR = 1;
   const unsigned short SECURITY_ERR = 2;
   const unsigned short ABORT_ERR = 3;
   
   // Added by this specification
   const unsigned short NOT_READABLE_ERR = 4;
   const unsigned short ENCODING_ERR = 5;
 
   readonly attribute unsigned short code;
};

The code attribute MUST return one of the constants of the FileError error,
which MUST be the most appropriate code from the table below.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.6.2. The FileException exception

Errors in the synchronous read methods for Web Workers [Web Workers] are
reported using the FileException exception. Conforming user agents that make
available the FileReaderSync() constructor on WorkerGlobalScope MUST also make
available the FileException interface object.

IDL

 exception FileException {
  
  const unsigned short NOT_FOUND_ERR = 1;
  const unsigned short SECURITY_ERR = 2;
  const unsigned short ABORT_ERR = 3;
  
  const unsigned short NOT_READABLE_ERR = 4;
  const unsigned short ENCODING_ERR = 5;
 
  unsigned short code;
};

The code attribute MUST return one of the constants of the FileException
exception, which MUST be the most appropriate code from the table below.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.6.3. Error Code Descriptions

Constant 		Code 	Situation
NOT_FOUND_ERR 	1 		User agents MUST use this code if the File or Blob 
						resource could not be found at the time the read was 
						processed
SECURITY_ERR 	2 		User agents MAY use this code if:

    it is determined that certain files are unsafe for access within a Web
    application

    it is determined that too many read calls are being made on File or Blob
    resources

    it is determined that the file has changed on disk since the user selected
    it

This is a security error code to be used in situations not covered by any other
error codes.

ABORT_ERR 			3 	User agents MUST use this code if the read operation 
						was aborted, typically with a call to abort()

NOT_READABLE_ERR 	4 	User agents MUST use this code if the File or Blob 
						cannot be read, typically due due to permission 
						problems that occur after a reference to a File or 
						Blob has been acquired (e.g. concurrent lock with 
						another application).

ENCODING_ERR 		5 	User agents MAY use this code if URL length 
						limitations for Data URLs in their implementations 
						place limits on the File or Blob data that can be 
						represented as a Data URL [DataURL]. User agents 
						MUST NOT use this code for the asynchronous 
						readAsText() call and MUST NOT use this code for the 
						synchronous readAsText() call, since encoding is 
						determined by the encoding determination algorithm.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.7. A URI for Blob and File reference

This section defines a scheme for a URI used to refer to Blob objects (and File
objects). Whereas the file URI scheme (defined in [RFC1630] and [RFC1738])
allows user agents to surface local file and directory structures, it cannot be
used within web applications owing to origin considerations and lack of HTTP
[HTTP] semantics. The introduction of a scheme to be used with individual File
or Blob objects is useful for a number of reasons. The following list is
informative:

    This scheme can be used with web APIs such as XMLHttpRequest [XHR2], and
    with elements that are designed to be used with URLs, such as the img
    element [HTML5]. In general, this scheme is designed to be used wherever
    URLs can be used on the web. This would allow File or Blob data to be used
    within web applications and accessed by URLs.
    
     This scheme can be associated with a well-defined subset of HTTP response
    codes, so that web applications can benefit from use alongside HTTP URLs.
    [HTTP]. This differs from file URIs, which do not have an affiliated
    request-response behavior with status codes. Some user agents silently fail
    if file URIs are requested insecurely.
    
     This scheme can allow for fragment identifiers for well-defined format
    types. For example, if the file selected is an SVG file, this scheme should
    allow for SVG fragment identifiers. If the file selected is an HTML file,
    this scheme should allow for fragment identifiers within an HTML document.
    
     Whereas file URIs are subject to strict same origin restrictions for
    security reasons and allow directory browsing, this scheme is applicable
    only to user-selected files (and to Blob objects that web applications
    generate). Along with an origin policy and a lifetime stipulation, this
    scheme can allow safe access to binary data from web applications.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.7.1. Definition of blob URI Scheme

This section defines a blob: URI scheme using a formal grammar. A blob: URI
consists of the blob: scheme and an opaque string, along with zero or one
fragment identifiers. In this specification an opaque string is a unique string
which can be heuristically generated upon demand such that the probability that
two are alike is small, and which is hard to guess (e.g. the Universally Unique
IDentifier (UUID) as defined in [RFC4122] is an opaque string). A fragment
identifier is optional, and if used, has a distinct interpretation depending on
the media type of the Blob or File resource in question [RFC2046].

This section uses the Augmented Backus-Naur Form (ABNF), defined in [RFC5234].
All blob: URLs MUST follow this ABNF.

ABNF

blob = scheme ":" opaqueString [fragIdentifier]

scheme = "blob"

; scheme is always "blob"

; opaqueString could be a UUID in its canonical form
; opaqueString tokens MUST be unique

fragIdentifier = "#" fragment

; Fragment Identifiers depend on the media type of the Blob
; fragment is defined in [RFC3986]

fragment    = *( pchar / "/" / "?" )

pchar       = unreserved / pct-encoded / sub-delims / ":" / "@"

unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"

pct-encoded   = "%" HEXDIG HEXDIG

sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
                 / "*" / "+" / "," / ";" / "="

The fragment's format and resolution depend on the media type [RFC2046] of a
potentially retrieved representation, even though such a retrieval is only
performed if the blob: URI is dereferenced. For example, in an HTML file
[HTML5] the fragment identifier would be used to refer to an anchor within the
file. If the user agent does not recognize the media type of the resource, OR
if a fragment identifer is not meaningful within the resource, it MUST ignore
the fragment identifier.

UUID is one potential option available to user agents for use with Blob URIs as
opaque strings. UUIDs are defined in [RFC4122] and are used here without the
urn: scheme. Below is an ABNF [RFC5234] for UUID; this is provided
informationally and is not normative.

ABNF


UUID                   = time-low "-" time-mid "-"
                         time-high-and-version "-"
                         clock-seq-and-reserved
                         clock-seq-low "-" node
time-low               = 4hexOctet
time-mid               = 2hexOctet
time-high-and-version  = 2hexOctet
clock-seq-and-reserved = hexOctet
clock-seq-low          = hexOctet
node                   = 6hexOctet
hexOctet               = hexDigit hexDigit
hexDigit =
         "0" / "1" / "2" / "3" / "4" / "5" / "6" / "7" / "8" / "9" /
         "a" / "b" / "c" / "d" / "e" / "f" /
         "A" / "B" / "C" / "D" / "E" / "F"


A valid Blob URI reference could look like:
blob:550e8400-e29b-41d4-a716-446655440000#aboutABBA

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.7.2. Origin of Blob URIs

The origin of a Blob URI MUST be the origin of the script that called
URL.createObjectURL. Blob URIs MUST only be valid within this origin.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.7.3. Lifetime of Blob URIs

This specification defines the following lifetime conditions on Blob URIs:

    This specification adds an additional unloading document cleanup step: User
    agents MUST revoke any Blob URIs created with URL.createObjectURL from
    within that document. If these Blob URIs are dereferenced, user agents must
    respond with 404 Not Found.
    
    Implementations MUST ensure that any Blob URIs are revoked after
    URL.revokeObjectURL is called with that Blob URI as an argument.
    Implementations MUST respond with a 404 Not Found if a Blob URI is
    dereferenced after URL.revokeObjectURL is called on that particular Blob
    URI.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.7.4. Dereferencing Model for Blob URIs

User agents MUST only support requests with GET [HTTP]. If the Blob has a type
attribute, or if the Blob has been created with a slice call which uses a
contentType argument, responses to derefencing the Blob URI must include the
Content-Type header from HTTP [HTTP] with the value of the type attribute or
contentType argument. Specifically, responses MUST only support a subset of
responses that are equivalent to the following from HTTP [HTTP]:

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.7.4.1. 200 OK

This response [HTTP] MUST be used if the request has succeeded, namely the
blob: URI has been requested with a GET, satisfies the origin requirement, and
satisfies the lifetime requirement. If this response code is used, the user
agent MUST also use a Content-Type header [HTTP] with a value equal to the Blob
object's type attribute.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.7.4.2. 403 Not Allowed

This response [HTTP] MUST be used if the request violates the origin
requirement. Additionally, it MUST be used if the underlying file's permission
structure has changed (thus preventing access from web content).
Implementations MAY accompany this response with a message (e.g. "Origin
Violation").
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.7.4.3. 404 Not Found

This response [HTTP] MUST be used if the request violates the lifetime
requirement (e.g. if a cached Blob URI persists after the specified lifetime of
the URI has elapsed). Additionally, it MUST be used if the underlying file has
moved.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.7.4.4. 500 Internal Server Error

This response [HTTP] MAY be used as a generic error condition, including for
security errors or access violations (e.g if the request method is anything
other than GET [HTTP]. Implementations MAY accompany this response with a
message (e.g. "Data Access Error").
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.7.5. Creating and Revoking a Blob URI

Blob URIs are created and revoked using methods exposed on the URL object,
supported by global objects Window [HTML5] and WorkerGlobalScope [Web Workers].
This section describes a supplemental interface to the URL specification [URL
API] and presents a methods for Blob URI creation and revocation.

IDL

[Supplemental]
interface URL {

    static DOMString createObjectURL(in Blob blob);
    static void revokeObjectURL(in DOMString url);
};

Note

ECMAScript implementations of this specification MUST ensure that they do not
expose a prototype property on the URL interface object unless the
implementation also implements the URL [URL API] specification. In other words,
URL.prototype MUST evaluate to true if the implementation implements the URL
[URL API] specification, and MUST NOT evaluate to true otherwise.

// Window implements URL;

// WorkerUtils implements URL;

The createObjectURL method

    Returns a unique Blob URI each time it is called on a valid blob argument,
    which is a non-null Blob in scope of the global object's URL property from
    which this static method is called.

        If this method is called with a Blob argument that is NOT valid, then
        user agents MUST return null.

        If this method is called with a valid Blob argument, user agents MUST
        return a unique Blob URI that can be used to dereference the blob
        argument.

    Example

    In the example below, after obaining a reference to a Blob object, the
    static method URL.createObjectURL is called on that Blob object.

    ECMAScript


    var file = document.getElementById('file').files[0];
    if(file){
      blobURLref = window.URL.createObjectURL(file);
      myimg.src = blobURLref;
    }

The revokeObjectURL method

    Revokes the Blob URI provided in the string url argument.

        If the url refers to a Blob that is both valid and in the same origin
        of the global object's URL property on which this static method was
        called, user agents MUST return a 404 response code when the url is
        dereferenced.

        If the url refers to a Blob that is NOT valid OR if the value provided
        for the url argument is not a Blob URI OR if the url argument refers to
        a Blob that is NOT in the same origin as the global object's URL
        property, this method call does nothing. User agents MAY display a
        message on the error console.

    The url argument to the revokeObjectURL method is a Blob URI string.

    Example

    In the example below, window1 and window2 are separate, but in the same
    origin; window2 could be an iframe [HTML5] inside window1.

    ECMAScript


    myurl = window1.URL.createObjectURL(myblob);
    window2.URL.revokeObjectURL(myurl);

    Since window1 and window2 are in the same origin, the URL.revokeObjectURL
    call ensures that subsequent dereferencing of myurl results in a 404 Not
    Found response.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.8. Security Considerations

This section is informative.

This specification allows web content to read files from the underlying file
system, as well as provides a means for files to be accessed by unique
identifiers, and as such is subject to some security considerations. This
specification also assumes that the primary user interaction is with the <input
type="file"/> element of HTML forms [HTML5], and that all files that are being
read by FileReader objects have first been selected by the user. Important
security considerations include preventing malicious file selection attacks
(selection looping), preventing access to system-sensitive files, and guarding
against modifications of files on disk after a selection has taken place.

    Preventing selection looping. During file selection, a user may be
    bombarded with the file picker associated with <input type="file"/> (in a
    "must choose" loop that forces selection before the file picker is
    dismissed) and a user agent may prevent file access to any selections by
    making the FileList object returned be of size 0.
    
     System-sensitive files (e.g. files in /usr/bin, password files, other
    native operating system executables) typically should not be exposed to web
    content, and should not be accessed via Blob URIs. User agents MAY raise a
    SECURITY_ERR if such files are accessed or a read method is called on them.
    
     Post-selection file modifications occur when a file changes on disk after
    it has been selected. In such cases, if a read method is called on a file,
    user agents MAY raise a SECURITY_ERR.
    
     Cross-origin requests on Blob URIs occur when a Blob URI is accessed
    across origins. In particular, code of the sort: document.location =
    window.URL.createObjectURL(myFile); is problematic. User agents should
    ensure that the 403 Not Allowed response is used in cross-origin request
    contexts. User agents MAY return 403 Not Allowed at any attempt to set the
    entire document location to a file or Blob.

Editorial note

This section is provisional; more security data may supplement this in
subsequent drafts.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.9. Requirements and Use Cases

This section covers what the requirements are for this API, as well as
illustrates some use cases. This version of the API does not satisfy all use
cases; subsequent versions may elect to address these.

    Once a user has given permission, user agents should provide the ability to
    read and parse data directly from a local file programmatically.
        Example: A lyrics viewer. User wants to read song lyrics from songs in
        his plist file. User browses for plist file. File is opened, read,
        parsed, and presented to the user as a sortable, actionable list within
        a web application. User can select songs to fetch lyrics. User uses the
        "browse for file" dialog.

    Data should be able to be stored locally so that it is available for later
    use, which is useful for offline data access for web applications.
        Example: A Calendar App. User's company has a calendar. User wants to
        sync local events to company calendar, marked as "busy" slots (without
        leaking personal info). User browses for file and selects it. The
        text/calendar file is parsed in the browser, allowing the user to merge
        the files to one calendar view. The user wants to then save the file
        back to his local calendar file. (using "Save As" ?). The user can also
        send the integrated calendar file back to the server calendar store
        asynchronously.

    User agents should provide the ability to save a local file
    programmatically given an amount of data and a file name.
        Example: A Spreadsheet App. User interacts with a form, and generates
        some input. The form then generates a CSV (Comma Separated Variables)
        output for the user to import into a spreadsheet, and uses "Save...".
        The generated output can also be directly integrated into a web-based
        spreadsheet, and uploaded asynchronously.

    User agents should provide a streamlined programmatic ability to send data
    from a file to a remote server that works more efficiently than form-based
    uploads today
        Example: A Video/Photo Upload App. User is able to select large files
        for upload, which can then be "chunk-transfered" to the server.

    User agents should provide an API exposed to script that exposes the
    features above. The user is notified by UI anytime interaction with the
    file system takes place, giving the user full ability to cancel or abort
    the transaction. The user is notified of any file selections, and can
    cancel these. No invocations to these APIs occur silently without user
    intervention.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

5.10. Acknowledgements

This specification was originally developed by the SVG Working Group. Many
thanks to Mark Baker and Anne van Kesteren for their feedback.

Thanks to Robin Berjon for editing the original specification.

Special thanks to Olli Pettay, Nikunj Mehta, Garrett Smith, Aaron Boodman,
Michael Nordman, Jian Li, Dmitry Titov, Ian Hickson, Darin Fisher, Sam Weinig,
Adrian Bateman and Julian Reschke.

Thanks to the W3C WebApps WG, and to participants on the public-webapps@w3.org
listserv

5.11. References

5.11.1. Normative references

RFC2119
    Key words for use in RFCs to Indicate Requirement Levels, S. Bradner. IETF.
HTML5
    HTML 5: A vocabulary and associated APIs for HTML and XHTML (work in
    progress), I. Hickson. W3C.
ProgressEvents 1.0
    Progress Events (work in progress), A. van Kesteren, C. McCathieNevile.
    W3C.
RFC2397
    The "data" URL Scheme, L. Masinter. IETF.
Web Workers
    Web Workers (work in progress), I. Hickson. W3C.
DOM 3 Core
    DOM 3 Core, A. Le Hors, P. Le Hégaret, G. Nicol, L. Wood, M. Champion, S.
    Byrne. W3C.
DOM 3 Events
    DOM 3 Events, D. Schepers, B. Höhrmann, P. Le Hégaret, T. Pixley. W3C.
Unicode
    The Unicode Standard, Version 5.2.0., J. D. Allen, D. Anderson, et al.
    Unicode Consortium.
RFC2616
    Hypertext Transfer Protocol -- HTTP/1.1, R. Fielding, J. Gettys, J. Mogul,
    H. Frystyk, L. Masinter, P. Leach, T. Berners-Lee. IETF.
RFC2046
    Multipurpose Internet Mail Extensions (MIME) Part Two: Media Extensions, N.
    Freed, N. Borenstein. IETF.
IANA Charsets
    Official Names for Character Sets on the Internet, K. Simonsen, W.Choi, et
    al. IANA.
RFC3986
    Uniform Resource Identifier (URI): Generic Syntax, T. Berners-Lee, R.
    Fielding, L. Masinter. IETF.
RFC1738
    Uniform Resource Locators (URL), T. Berners-Lee, L. Masinter, M. McCahill.
    IETF.
RFC1630
    Universal Resource Identifiers in WWW, T. Berners-Lee. IETF.
Typed Arrays
    Typed Arrays (work in progress), V. Vukicevic, K. Russell. Khronos Group.
RFC5234
    Augmented BNF for Syntax Specifications: ABNF, D. Crocker, P. Overell.
    IETF.
URL Specification
    URL API, A. Barth. TBD.

5.11.2. Informative References

XMLHttpRequest
    XMLHttpRequest Level 2, A. van Kesteren. W3C.
File Upload State of the input element
    File Upload State of the HTML5 input Element, I. Hickson. W3C.
RFC4648
    The Base16, Base32, and Base64 Data Encodings, S. Josefsson. IETF.
DOMException Extensions Defined in HTML5
    DOM 3 Core DOMException Extensions Defined in HTML5 (work in progress), I.
    Hickson. W3C.
Google Gears Blob API
    Google Gears Blob API
RFC4122
    A Universally Unique IDentifier (UUID) URN Namespace, P. Leach, M.
    Mealling, R. Salz. IETF.

******************************************************************************/