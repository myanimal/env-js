/******************************************************************************
http://dev.w3.org/html5/webstorage/

W3C
Web Storage
Editor's Draft 28 February 2011

Latest Published Version:
    http://www.w3.org/TR/webstorage/
Latest Editor's Draft:
    http://dev.w3.org/html5/webstorage/
Previous Versions:
    http://www.w3.org/TR/2009/WD-webstorage-20090423/ 
    http://www.w3.org/TR/2009/WD-webstorage-20091029/
Editor:
    Ian Hickson, Google, Inc.

Copyright © 2010 W3C® (MIT, ERCIM, Keio), All Rights Reserved. W3C liability,
trademark and document use rules apply.

The bulk of the text of this specification is also available in the WHATWG Web
Applications 1.0 specification, under a license that permits reuse of the
specification text.

Abstract

This specification defines an API for persistent data storage of key-value pair
data in Web clients.

Status of This document

This section describes the status of this document at the time of its
publication. Other documents may supersede this document. A list of current W3C
publications and the most recently formally published revision of this
technical report can be found in the W3C technical reports index at
http://www.w3.org/TR/.

If you wish to make comments regarding this document in a manner that is
tracked by the W3C, please submit them via using our public bug database. If
you do not have an account then you can enter feedback using this form:

Feedback Comments

Please enter your feedback, carefully indicating the title of the section for
which you are submitting feedback, quoting the text that's wrong today if
appropriate. If you're suggesting a new feature, it's really important to say
what the problem you're trying to solve is. That's more important than the
solution, in fact.

Please don't use section numbers as these tend to change rapidly and make your
feedback harder to understand.

(Note: Your IP address and user agent will be publicly recorded for spam
prevention purposes.)

You can also e-mail feedback to public-webapps@w3.org (subscribe, archives), or
whatwg@whatwg.org (subscribe, archives). All feedback is welcome.

Implementors should be aware that this specification is not stable.
Implementors who are not taking part in the discussions are likely to find the
specification changing out from under them in incompatible ways. Vendors
interested in implementing this specification before it eventually reaches the
Candidate Recommendation stage should join the aforementioned mailing lists and
take part in the discussions.

The latest stable version of the editor's draft of this specification is always
available on the W3C CVS server and in the WHATWG Subversion repository. The
latest editor's working copy (which may contain unfinished text in the process
of being prepared) contains the latest draft text of this specification
(amongst others). For more details, please see the WHATWG FAQ.

Notifications of changes to this specification are sent along with
notifications of changes to related specifications using the following
mechanisms:

E-mail notifications of changes
    Commit-Watchers mailing list (complete source diffs):
    http://lists.whatwg.org/listinfo.cgi/commit-watchers-whatwg.org
Browsable version-control record of all changes:
    CVSWeb interface with side-by-side diffs: http://dev.w3.org/cvsweb/html5/
    Annotated summary with unified diffs:
    http://html5.org/tools/web-apps-tracker
    Raw Subversion interface: svn checkout http://svn.whatwg.org/webapps/

The W3C Web Applications Working Group is the W3C working group responsible for
this specification's progress along the W3C Recommendation track. This
specification is the 28 February 2011 Editor's Draft.

This document was produced by a group operating under the 5 February 2004 W3C
Patent Policy. W3C maintains a public list of any patent disclosures made in
connection with the deliverables of the group; that page also includes
instructions for disclosing a patent. An individual who has actual knowledge of
a patent which the individual believes contains Essential Claim(s) must
disclose the information in accordance with section 6 of the W3C Patent Policy.

Issues

The use of the storage mutex to avoid race conditions is currently considered
by certain implementors to be too high a performance burden, to the point where
allowing data corruption is considered preferable. Alternatives that do not
require a user-agent-wide per-origin script lock are eagerly sought after. If
reviewers have any suggestions, they are urged to send them to the addresses
given in the previous section.

More details regarding this issue are available in these e-mails (as well as
numerous others):

    http://lists.whatwg.org/htdig.cgi/whatwg-whatwg.org/2009-September/023059.html
    http://lists.whatwg.org/htdig.cgi/whatwg-whatwg.org/2009-December/024277.html

Table of Contents

    1 Introduction
    2 Conformance requirements
        2.1 Dependencies
    3 Terminology
    4 The API
        4.1 The Storage interface
        4.2 The sessionStorage attribute
        4.3 The localStorage attribute
            4.3.1 Security
        4.4 The storage event
            4.4.1 Event definition
        4.5 Threads
    5 Disk space
    6 Privacy
        6.1 User tracking
        6.2 Sensitivity of data
    7 Security
        7.1 DNS spoofing attacks
        7.2 Cross-directory attacks
        7.3 Implementation risks
    References
    Acknowledgements

1 Introduction

This section is non-normative.

This specification introduces two related mechanisms, similar to HTTP session
cookies, for storing structured data on the client side. [COOKIES]

The first is designed for scenarios where the user is carrying out a single
transaction, but could be carrying out multiple transactions in different
windows at the same time.

Cookies don't really handle this case well. For example, a user could be buying
plane tickets in two different windows, using the same site. If the site used
cookies to keep track of which ticket the user was buying, then as the user
clicked from page to page in both windows, the ticket currently being purchased
would "leak" from one window to the other, potentially causing the user to buy
two tickets for the same flight without really noticing.

To address this, this specification introduces the sessionStorage IDL
attribute. Sites can add data to the session storage, and it will be accessible
to any page from the same site opened in that window.

For example, a page could have a checkbox that the user ticks to indicate that
he wants insurance:

<label>
 <input type="checkbox" onchange="sessionStorage.insurance = checked">
 I want insurance on this trip.
</label>

A later page could then check, from script, whether the user had checked the
checkbox or not:

if (sessionStorage.insurance) { ... }

If the user had multiple windows opened on the site, each one would have its
own individual copy of the session storage object.

The second storage mechanism is designed for storage that spans multiple
windows, and lasts beyond the current session. In particular, Web applications
may wish to store megabytes of user data, such as entire user-authored
documents or a user's mailbox, on the client side for performance reasons.

Again, cookies do not handle this case well, because they are transmitted with
every request.

The localStorage IDL attribute is used to access a page's local storage area.

The site at example.com can display a count of how many times the user has
loaded its page by putting the following at the bottom of its page:

<p>
  You have viewed this page
  <span id="count">an untold number of</span>
  time(s).
</p>
<script>
  if (!localStorage.pageLoadCount)
    localStorage.pageLoadCount = 0;
  localStorage.pageLoadCount += 1;
  document.getElementById('count').textContent = localStorage.pageLoadCount;
</script>

Each site has its own separate storage area.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

2 Conformance requirements

All diagrams, examples, and notes in this specification are non-normative, as
are all sections explicitly marked non-normative. Everything else in this
specification is normative.

The key words "MUST", "MUST NOT", "REQUIRED", "SHOULD", "SHOULD NOT",
"RECOMMENDED", "MAY", and "OPTIONAL" in the normative parts of this document
are to be interpreted as described in RFC2119. For readability, these words do
not appear in all uppercase letters in this specification. [RFC2119]

Requirements phrased in the imperative as part of algorithms (such as "strip
any leading space characters" or "return false and abort these steps") are to
be interpreted with the meaning of the key word ("must", "should", "may", etc)
used in introducing the algorithm.

Some conformance requirements are phrased as requirements on attributes,
methods or objects. Such requirements are to be interpreted as requirements on
user agents.

Conformance requirements phrased as algorithms or specific steps may be
implemented in any manner, so long as the end result is equivalent. (In
particular, the algorithms defined in this specification are intended to be
easy to follow, and not intended to be performant.)

The only conformance class defined by this specification is user agents.

User agents may impose implementation-specific limits on otherwise
unconstrained inputs, e.g. to prevent denial of service attacks, to guard
against running out of memory, or to work around platform-specific limitations.

When support for a feature is disabled (e.g. as an emergency measure to
mitigate a security problem, or to aid in development, or for performance
reasons), user agents must act as if they had no support for the feature
whatsoever, and as if the feature was not mentioned in this specification. For
example, if a particular feature is accessed via an attribute in a Web IDL
interface, the attribute itself would be omitted from the objects that
implement that interface — leaving the attribute on the object but making it
return null or throw an exception is insufficient.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

2.1 Dependencies

This specification relies on several other underlying specifications.

HTML

    Many fundamental concepts from HTML are used by this specification. [HTML]

WebIDL

    The IDL blocks in this specification use the semantics of the WebIDL
    specification. [WEBIDL]

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

3 Terminology

The construction "a Foo object", where Foo is actually an interface, is
sometimes used instead of the more accurate "an object implementing the
interface Foo".

The term DOM is used to refer to the API set made available to scripts in Web
applications, and does not necessarily imply the existence of an actual
Document object or of any other Node objects as defined in the DOM Core
specifications. [DOMCORE]

An IDL attribute is said to be getting when its value is being retrieved (e.g.
by author script), and is said to be setting when a new value is assigned to
it.

The term "JavaScript" is used to refer to ECMA262, rather than the official
term ECMAScript, since the term JavaScript is more widely known. [ECMA262]

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4 The API

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.1 The Storage interface

interface Storage {
  readonly attribute unsigned long length;
  DOMString key(in unsigned long index);
  getter any getItem(in DOMString key);
  setter creator void setItem(in DOMString key, in any value);
  deleter void removeItem(in DOMString key);
  void clear();
};

Each Storage object provides access to a list of key/value pairs, which are
sometimes called items. Keys are strings. Any string (including the empty
string) is a valid key. Values can be any data type supported by the structured
clone algorithm. [HTML]

Each Storage object is associated with a list of key/value pairs when it is
created, as defined in the sections on the sessionStorage and localStorage
attributes. Multiple separate objects implementing the Storage interface can
all be associated with the same list of key/value pairs simultaneously.

The length attribute must return the number of key/value pairs currently
present in the list associated with the object.

The key(n) method must return the name of the nth key in the list. The order of
keys is user-agent defined, but must be consistent within an object so long as
the number of keys doesn't change. (Thus, adding or removing a key may change
the order of the keys, but merely changing the value of an existing key must
not.) If n is greater than or equal to the number of key/value pairs in the
object, then this method must return null.

The supported property names on a Storage object are the keys of each key/value
pair currently present in the list associated with the object.

The getItem(key) method must return a structured clone of the current value
associated with the given key. If the given key does not exist in the list
associated with the object then this method must return null. [HTML]

The setItem(key, value) method must first create a structured clone of the
given value. If this raises an exception, then the exception must be thrown and
the list associated with the object is left unchanged. If constructing the
stuctured clone would involve constructing a new ImageData object, then throw a
NOT_SUPPORTED_ERR exception instead. [HTML]

Otherwise, the user agent must then check if a key/value pair with the given
key already exists in the list associated with the object.

If it does not, then a new key/value pair must be added to the list, with the
given key and with its value set to the newly obtained clone of value.

If the given key does exist in the list, then it must have its value updated to
the newly obtained clone of value.

If it couldn't set the new value, the method must raise an QUOTA_EXCEEDED_ERR
exception. (Setting could fail if, e.g., the user has disabled storage for the
site, or if the quota has been exceeded.)

The removeItem(key) method must cause the key/value pair with the given key to
be removed from the list associated with the object, if it exists. If no item
with that key exists, the method must do nothing.

The setItem() and removeItem() methods must be atomic with respect to failure.
In the case of failure, the method does nothing. That is, changes to the data
storage area must either be successful, or the data storage area must not be
changed at all.

The clear() method must atomically cause the list associated with the object to
be emptied of all key/value pairs, if there are any. If there are none, then
the method must do nothing.

When the setItem(), removeItem(), and clear() methods are invoked, events are
fired on other Document objects that can access the newly stored or removed
data, as defined in the sections on the sessionStorage and localStorage
attributes.

This specification does not require that the above methods wait until the data
has been physically written to disk. Only consistency in what different scripts
accessing the same underlying list of key/value pairs see is required.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.2 The sessionStorage attribute

[Supplemental, NoInterfaceObject]
interface WindowSessionStorage {
  readonly attribute Storage sessionStorage;
};
Window implements WindowSessionStorage;

The sessionStorage attribute represents the set of storage areas specific to
the current top-level browsing context.

Each top-level browsing context has a unique set of session storage areas, one
for each origin.

User agents should not expire data from a browsing context's session storage
areas, but may do so when the user requests that such data be deleted, or when
the UA detects that it has limited storage space, or for security reasons. User
agents should always avoid deleting data while a script that could access that
data is running. When a top-level browsing context is destroyed (and therefore
permanently inaccessible to the user) the data stored in its session storage
areas can be discarded with it, as the API described in this specification
provides no way for that data to ever be subsequently retrieved.

The lifetime of a browsing context can be unrelated to the lifetime of the
actual user agent process itself, as the user agent may support resuming
sessions after a restart.

When a new Document is created in a browsing context which has a top-level
browsing context, the user agent must check to see if that top-level browsing
context has a session storage area for that document's origin. If it does, then
that is the Document's assigned session storage area. If it does not, a new
storage area for that document's origin must be created, and then that is the
Document's assigned session storage area. A Document's assigned storage area
does not change during the lifetime of a Document, even in the case of a nested
browsing context (e.g. in an iframe) being moved to another parent browsing
context.

The sessionStorage attribute must return a Storage object associated with the
Document's assigned session storage area, if any, or null if there isn't one.
Each Document object must have a separate object for its Window's
sessionStorage attribute.

When a new top-level browsing context is created by cloning an existing
browsing context, the new browsing context must start with the same session
storage areas as the original, but the two sets must from that point on be
considered separate, not affecting each other in any way.

When a new top-level browsing context is created by a script in an existing
browsing context, or by the user following a link in an existing browsing
context, or in some other way related to a specific Document, then the session
storage area of the origin of that Document must be copied into the new
browsing context when it is created. From that point on, however, the two
session storage areas must be considered separate, not affecting each other in
any way.

When the setItem(), removeItem(), and clear() methods are called on a Storage
object x that is associated with a session storage area, if the methods did
something, then in every Document object whose Window object's sessionStorage
attribute's Storage object is associated with the same storage area, other than
x, a storage event must be fired, as described below.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.3 The localStorage attribute

[Supplemental, NoInterfaceObject]
interface WindowLocalStorage {
  readonly attribute Storage localStorage;
};
Window implements WindowLocalStorage;

The localStorage object provides a Storage object for an origin.

User agents must have a set of local storage areas, one for each origin.

User agents should expire data from the local storage areas only for security
reasons or when requested to do so by the user. User agents should always avoid
deleting data while a script that could access that data is running.

When the localStorage attribute is accessed, the user agent must run the
following steps:

    The user agent may throw a SECURITY_ERR exception instead of returning a
    Storage object if the request violates a policy decision (e.g. if the user
    agent is configured to not allow the page to persist data).
    
    If the Document's origin is not a scheme/host/port tuple, then throw a
    SECURITY_ERR exception and abort these steps.
    
    Check to see if the user agent has allocated a local storage area for the
    origin of the Document of the Window object on which the attribute was
    accessed. If it has not, create a new storage area for that origin.
    
    Return the Storage object associated with that origin's local storage
    area. Each Document object must have a separate object for its Window's
    localStorage attribute.

When the setItem(), removeItem(), and clear() methods are called on a Storage
object x that is associated with a local storage area, if the methods did
something, then in every Document object whose Window object's localStorage
attribute's Storage object is associated with the same storage area, other than
x, a storage event must be fired, as described below.

Whenever the properties of a localStorage attribute's Storage object are to be
examined, returned, set, or deleted, whether as part of a direct property
access, when checking for the presence of a property, during property
enumeration, when determining the number of properties present, or as part of
the execution of any of the methods or attributes defined on the Storage
interface, the user agent must first obtain the storage mutex.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.3.1 Security

User agents must raise a SECURITY_ERR exception whenever any of the members of
a Storage object originally returned by the localStorage attribute are accessed
by scripts whose effective script origin is not the same as the origin of the
Document of the Window object on which the localStorage attribute was accessed.

This means Storage objects are neutered when the document.domain attribute is
used.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.4 The storage event

The storage event is fired when a storage area changes, as described in the
previous two sections (for session storage, for local storage).

When this happens, the user agent must queue a task to fire an event with the
name storage, which does not bubble and is not cancelable, and which uses the
StorageEvent interface, at each Window object whose Document object has a
Storage object that is affected.

This includes Document objects that are not fully active, but events fired on
those are ignored by the event loop until the Document becomes fully active
again.

The task source for this task is the DOM manipulation task source.

If the event is being fired due to an invocation of the setItem() or
removeItem() methods, the event must have its key attribute set to the name of
the key in question, its oldValue attribute set to a structured clone of the
old value of the key in question, or null if the key is newly added, and its
newValue attribute set to a structured clone of the new value of the key in
question, or null if the key was removed. [HTML]

Otherwise, if the event is being fired due to an invocation of the clear()
method, the event must have its key, oldValue, and newValue attributes set to
null.

In addition, the event must have its url attribute set to the address of the
document whose Storage object was affected; and its storageArea attribute set
to the Storage object from the Window object of the target Document that
represents the same kind of Storage area as was affected (i.e. session or
local).
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.4.1 Event definition

interface StorageEvent : Event {
  readonly attribute DOMString key;
  readonly attribute any oldValue;
  readonly attribute any newValue;
  readonly attribute DOMString url;
  readonly attribute Storage storageArea;
  void initStorageEvent(in DOMString typeArg, in boolean canBubbleArg, in boolean cancelableArg, in DOMString keyArg, in any oldValueArg, in any newValueArg, in DOMString urlArg, in Storage storageAreaArg);
};

The initStorageEvent() method must initialize the event in a manner analogous
to the similarly-named method in the DOM Events interfaces. [DOMEVENTS]

The key attribute represents the key being changed.

The oldValue attribute represents the old value of the key being changed.

The newValue attribute represents the new value of the key being changed.

The url attribute represents the address of the document whose key changed.

The storageArea attribute represents the Storage object that was affected.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

4.5 Threads

Because of the use of the storage mutex, multiple browsing contexts will be
able to access the local storage areas simultaneously in such a manner that
scripts cannot detect any concurrent script execution.

Thus, the length attribute of a Storage object, and the value of the various
properties of that object, cannot change while a script is executing, other
than in a way that is predictable by the script itself.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
5 Disk space

User agents should limit the total amount of space allowed for storage areas.

User agents should guard against sites storing data under the origins other
affiliated sites, e.g. storing up to the limit in a1.example.com,
a2.example.com, a3.example.com, etc, circumventing the main example.com storage
limit.

User agents may prompt the user when quotas are reached, allowing the user to
grant a site more space. This enables sites to store many user-created
documents on the user's computer, for instance.

User agents should allow users to see how much space each domain is using.

A mostly arbitrary limit of five megabytes per origin is recommended.
Implementation feedback is welcome and will be used to update this suggestion
in the future.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************
6 Privacy
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

6.1 User tracking

A third-party advertiser (or any entity capable of getting content distributed
to multiple sites) could use a unique identifier stored in its local storage
area to track a user across multiple sessions, building a profile of the user's
interests to allow for highly targeted advertising. In conjunction with a site
that is aware of the user's real identity (for example an e-commerce site that
requires authenticated credentials), this could allow oppressive groups to
target individuals with greater accuracy than in a world with purely anonymous
Web usage.

There are a number of techniques that can be used to mitigate the risk of user
tracking:

Blocking third-party storage

    User agents may restrict access to the localStorage objects to scripts
    originating at the domain of the top-level document of the browsing
    context, for instance denying access to the API for pages from other
    domains running in iframes.

Expiring stored data

    User agents may, if so configured by the user, automatically delete stored
    data after a period of time.
    
    For example, a user agent could be configured to treat third-party local
    storage areas as session-only storage, deleting the data once the user had
    closed all the browsing contexts that could access it.
    
    This can restrict the ability of a site to track a user, as the site would
    then only be able to track the user across multiple sessions when he
    authenticates with the site itself (e.g. by making a purchase or logging in
    to a service).
    
    However, this also reduces the usefulness of the API as a long-term
    storage mechanism. It can also put the user's data at risk, if the user
    does not fully understand the implications of data expiration.

Treating persistent storage as cookies

    If users attempt to protect their privacy by clearing cookies without also
    clearing data stored in the local storage area, sites can defeat those
    attempts by using the two features as redundant backup for each other. User
    agents should present the interfaces for clearing these in a way that helps
    users to understand this possibility and enables them to delete data in all
    persistent storage features simultaneously. [COOKIES]

Site-specific white-listing of access to local storage areas

    User agents may allow sites to access session storage areas in an
    unrestricted manner, but require the user to authorize access to local
    storage areas.

Origin-tracking of stored data

    User agents may record the origins of sites that contained content from
    third-party origins that caused data to be stored.
    
    If this information is then used to present the view of data currently in
    persistent storage, it would allow the user to make informed decisions
    about which parts of the persistent storage to prune. Combined with a
    blacklist ("delete this data and prevent this domain from ever storing data
    again"), the user can restrict the use of persistent storage to sites that
    he trusts.

Shared blacklists

    User agents may allow users to share their persistent storage domain
    blacklists.

    This would allow communities to act together to protect their privacy.

While these suggestions prevent trivial use of this API for user tracking, they
do not block it altogether. Within a single domain, a site can continue to
track the user during a session, and can then pass all this information to the
third party along with any identifying information (names, credit card numbers,
addresses) obtained by the site. If a third party cooperates with multiple
sites to obtain such information, a profile can still be created.

However, user tracking is to some extent possible even with no cooperation from
the user agent whatsoever, for instance by using session identifiers in URLs, a
technique already commonly used for innocuous purposes but easily repurposed
for user tracking (even retroactively). This information can then be shared
with other sites, using using visitors' IP addresses and other user-specific
data (e.g. user-agent headers and configuration settings) to combine separate
sessions into coherent user profiles.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

6.2 Sensitivity of data

User agents should treat persistently stored data as potentially sensitive;
it's quite possible for e-mails, calendar appointments, health records, or
other confidential documents to be stored in this mechanism.

To this end, user agents should ensure that when deleting data, it is promptly
deleted from the underlying storage.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

7 Security
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

7.1 DNS spoofing attacks

Because of the potential for DNS spoofing attacks, one cannot guarantee that a
host claiming to be in a certain domain really is from that domain. To mitigate
this, pages can use TLS. Pages using TLS can be sure that only pages using TLS
that have certificates identifying them as being from the same domain can
access their storage areas.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

7.2 Cross-directory attacks

Different authors sharing one host name, for example users hosting content on
geocities.com, all share one local storage object. There is no feature to
restrict the access by pathname. Authors on shared hosts are therefore
recommended to avoid using these features, as it would be trivial for other
authors to read the data and overwrite it.

Even if a path-restriction feature was made available, the usual DOM scripting
security model would make it trivial to bypass this protection and access the
data from any path.

******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

7.3 Implementation risks

The two primary risks when implementing these persistent storage features are
letting hostile sites read information from other domains, and letting hostile
sites write information that is then read from other domains.

Letting third-party sites read data that is not supposed to be read from their
domain causes information leakage, For example, a user's shopping wishlist on
one domain could be used by another domain for targeted advertising; or a
user's work-in-progress confidential documents stored by a word-processing site
could be examined by the site of a competing company.

Letting third-party sites write data to the persistent storage of other domains
can result in information spoofing, which is equally dangerous. For example, a
hostile site could add items to a user's wishlist; or a hostile site could set
a user's session identifier to a known ID that the hostile site can then use to
track the user's actions on the victim site.

Thus, strictly following the origin model described in this specification is
important for user security.
******************************************************************************/
test('TODO: ', function(){

});
/******************************************************************************

References

All references are normative unless marked "Non-normative".

[COOKIES]
    HTTP State Management Mechanism, A. Barth. IETF.
[DOMCORE]
    Web DOM Core, A. van Kesteren. W3C.
[DOMEVENTS]
    Document Object Model (DOM) Level 3 Events Specification, D. Schepers. W3C.
[ECMA262]
    ECMAScript Language Specification. ECMA.
[HTML]
    HTML, I. Hickson. WHATWG.
[RFC2119]
    Key words for use in RFCs to Indicate Requirement Levels, S. Bradner. IETF.
[WEBIDL]
    Web IDL, C. McCormack. W3C.

Acknowledgements

For a full list of acknowledgements, please see the HTML specification. [HTML]

******************************************************************************/