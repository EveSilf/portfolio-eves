---
title: "Assignment 4: Backend Design and Implementation (Alpha)"
layout: doc
---
# Assignment 4: Backend Design and Implementation (Alpha)

### Table of Contents
1. [Concept States](#concept-states)
2. [Data Model Diagram](#data-model-diagram) 
3. [Backend Links](#backend-links)


## Concept States
1. ```Authenticating```

**State:** 
```
Registered: set User
username, password: registered --> one String
```

2. ```Sessioning[User]```

**State:** 
```
active: set Session
user: active --> one User
```

3. ```Posting[User,Tags]```

**State:** 
```
posts: set Post
creator: one User | set User
caption: Post --> one String
content: Post --> set Media
tags: Post --> set Tag
shared: Post -> set User
* Media could be a picture or video
```

4. ```Grouping[User]```

**State:** 
```
groups: set Group
groupName: Group --> one String
creator: Group --> one User
members: Group --> set User
```

5. ```Filtering[Posts]```

**State:** 
```
tags: set String
name: Tag --> one String
posts: set Post
```

6. ```FilterGrouping[Tags]```

**State:** 
```
modes: set Mode
name: Mode --> one String
tags: Mode --> set Tag
```

7. ```Quizzing[Tags]```

**State:** 
```
quizzes: set Quiz
tags: Quiz --> set Tag
question: Quiz --> one String
options: Quiz --> set Option
answer: Quiz --> one Option
```
## Data Model Diagram
![Data Model Diagram](/assets/ModelDiagram.png)

## Backend Links
[Vercel](https://a4-eosin.vercel.app/)

[Codebase](https://github.com/EveSilf/A4)
