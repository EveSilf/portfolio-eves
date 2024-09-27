---
title: "Assignment 3: Convergent Thinking"
layout: doc
---
# Assignment 3: Convergent Thinking

### Table of Contents
1. [Pitch](#pitch)
2. [Concepts](#concepts)
3. [Synchronizations](#synchronizations)
4. [Dependency Diagram](#dependency-diagram)
5. [Wireframes](#wireframes)
6. [Designer Trade-off](#designer-trade-off)

## Pitch
*Snippets* is the ultimate app for working professionals who need quick and reliable access to both work-related news and personal interests. With the *Work-Life Mode*, you can effortlessly toggle between work and personal content, depending on your focus. This feature ensures that whether you’re in the middle of a busy workday or relaxing during your downtime, *Snippets* provides a customized feed that aligns with your needs. In addition, you are able to make custom modes!

*Snippets* doesn’t stop at delivering content — it fosters meaningful social interactions through *Communities*. Here, users can engage with others, diving deeper into the topics that matter to them. Whether it's discussing a new industry trend or exploring a shared hobby, *Communities* help enhance user engagement. Additionally, the *TapTrivia* feature adds a fun, interactive element by allowing users to test their newfound knowledge through quizzes. This feature not only reinforces what you've learned but also keeps the content engaging and enjoyable.

## Concepts 
1. Authenticating

**Purpose:** Allows verified user to access their profile.

**Principle:** The user needs to register their profile before using Snippets. Once registered, the user can log in to snippets using their credentials.

**State:** 
```
Registered: set User
username, password: registered --> one String
```
**Actions:**
```
Register(n: String, p: String, out user: User)
    user not in registered
    user.username = n
    user.password = p
    registered += user
    
Authenticate(n: String, p: String, out user: User)
    user in registered
    user.username = n && user.password = p
```

2. Sessioning[User]

**Purpose:** Enables authenticated users to access Snippets content for an extended period of time.  

**Principle:** Ater a session starts (and before it ends), the getUser action returns the user
identified at the start.

**State:** 
```
active: set Session
user: active --> one User
```
**Actions:**
```
start(u: User, out s: Session) 
    s not in active 
    s.user := u
    active += s 
getUser(s: Session, out u: User)
    s in active
    u := s.user 
end(s: Session) 
    active -= s
```
3. Posting[User,Tags]

**Purpose:** Share Snippets content with others.

**Principle:** When a snippet is posted, it is visible by other users. The creator has the option to remove the Snippet, this removes it from the user's page and other users feed.

**State:** 
```
Posts: set Post
Creator: one User | set User
Caption: Post --> one String
Content: Post --> set Media
Tags: Post --> set Tag
Shared: Post -> set User
* Media could be a picture or video
```
**Actions:**
```
create(creator: Creator, m: Content, c: Caption, out Post)
    Posts += Post(creator,m,c)
display(u: User, p: Post, out Post)
    if u in p.Shared, return p
delete(p: Post)
    Post -= p
```

4. Grouping[User]

**Purpose:** Allows user to view private content and interact with a group of users. 

**Principle:** A user can create a group and add users so that they can access private content within the group. The creator of the group could also delete users or delete the group if needed.

**State:** 
```
Groups: set Group
Name: Group --> one String
Creator: Group --> one User
Members: Group --> set User
```
**Actions:**
```
create(n: Name, creator: User)
    Groups += Group(n,creator,Users= {})
addUser(u: User, g: Group)
    Groups[g] += u
deleteUser(u: User, g: Group)
    Groups[g] -= u
delete(g: Group)
    Groups -= g 
```

5. Filtering[Posts]

**Purpose:** Allows user to filter Snippets based on Snippet tags.

**Principle:** A user can add one or multiple tag(s) in the filter and see that specified content. If the user no longer wants to see content from that tag, they are able to remove it.

**State:** 
```
Tags: set String
Name: Tag --> one String
Posts: set Post
```
**Actions:**
```
add(n: Name, p:Posts, out new: Posts)
    Tags += Tag(name)
    new := Filter(Tags,p)
remove(t:Tag, p:Posts, out p: Posts)
    Tags -= t
    new := Filter(Tags,Posts)
filter(tags: Tags, all: Posts, out p: Posts)
    p := { post | post ∈ all ∧ ∃ t ∈ tags : t ∈ post.Tags }
```

6. FilterGrouping[Tags]

**Purpose:** Allows user to create different filter groupings (modes) and view them separately.

**Principle:** A user can choose to create their own mode by selecting a name and tags for that mode.

**State:** 
```
Modes: set Mode
Name: Mode --> one String
Tags: Mode --> set Tag
```
**Actions:** 
```
create(n: Name, t: Tags, out Mode)
    Modes += Mode(n,t)
addTags(m: Mode,t: Tags)
    Modes[m].Tags += t
removeTags(m: Mode, t: Tags)
    Modes[m].Tags -= t
delete(m: Mode)
    Modes -= m
```

7. Quizzing[Tags]

**Purpose:** Allows users to test their knowledge on Snippets from the mode feed.

**Principle:** When a user is scrolling through the feed of a mode, they will encounter quiz questions about topics from the filter grouping. Users can create quizzes and select tags for the quiz for it to feature on other user feeds.

**State:** 
```
Quizzes: set Quiz
Tags: Quiz --> set Tag
Question: Quiz --> one String
Options: Quiz --> set Option
Answer: Quiz --> one Option
```
**Actions:**
```
create(q: Question, t: Tags, o: Options, a: Answer)
    Quizs += Quiz (q,t,o,a)
modifyOptions(i: Quiz, o: Options)
    Quiz[i].Options := o
modifyQuestion(i: Quiz, q: Question)
    Quiz[i].Question := q
modifyFilters(i: Quiz, t: Tags)
    Quiz[i].Filters := t
delete(i:Quiz)
    Quizs -= i
```

## Synchronizations
```
include Authenticating
include Sessioning[User]
include Posting[User,Tags]
include Grouping[User]
include Filtering[Tags,Posts]
include FilterGrouping[Tags]
include Quizzing[Tags]

sync CreateUser(u: String, p: String, g:Group)
    User1 := Authenticating.register(u,p)
    Grouping.addUser(User1,g)

sync startSession(u: String, p: String) 
    User1 := Authenticating(u, p) 
    Sessioning.start(User1)

sync endSession(s:Session)
    Sessioning.end(s)

sync AddMember(c: Creator, u: User, g:group)
    Creator1 := Authenticating.authenticate(u.username,u.password)
    if Creator1 === g.Creator:
        Grouping.addUser(u)

sync DeleteMember(c: Creator, u: User, g:group)
    Creator1 := Authenticating.authenticate(u.username,u.password)
    if Creator1 === g.Creator:
        Grouping.deleteUser(u)

sync DeleteGroup(c: Creator, u: User, g:group)
    Creator1 := Authenticating.authenticate(u.username,u.password)
    if Creator1 === g.Creator:
        Grouping.delete(u)

sync FilterMode(u: User, n: String, t:Tags, p: Posts)
    newMode := FilterGrouping.Create(n,t)
    Filtering.Filter(newMode.Tags,p)
```

## Dependency Diagram
![Dependency](/assets/Dependency.png)

## Wireframes
Work Mode Feed
![Home](/assets/Home.png)\
Work Mode Feed with Quiz
![Quiz](/assets/Trivia.png)\
Snippet on Profile
![Snippet](/assets/Snippet.png)\
Community Page
![Community](/assets/Community.png)


## Design Trade-Off
1. Specializing Quizzes\
**Option 1:** Separate Quizzing and Posting Concepts\
**Option 2:** Generalize Posting to include Quizzing
I chose to keep quizzes as a separate concept from posting. While it's possible to treat quizzes as another media within the posting concept (since they appear in the feed similarly), quizzes have additional functionalities that require a distinct framework. These include multiple variables and interactions specific to quizzes, which are difficult to manage under the broader posting concept.

2. Multi-Creator Posting\
**Option 1:** Posting can only have one creator\
**Option 2:** Posting can have multiple creators
SnippetCollab is a feature I wanted to integrate into the app. Rather than building it separately, I realized allowing the posting concept to have multiple creators makes the design more cohesive. This approach simplifies the app architecture, making it modular and easier to manage.

3. Loosening Filtering\
**Option 1:** Combine FilterGrouping and Filtering as one concept\
**Option 2:** Separate FilterGrouping and Filtering
I opted to separate FilterGrouping from Filtering. Combining them would overcomplicate the FilterGrouping feature by merging both individual and group tag filtering. Separating them ensures that each function remains clear and manageable, reducing confusion and enhancing usability.



