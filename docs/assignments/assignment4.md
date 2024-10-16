---
title: "Assignment 4: Backend Design and Implementation"
layout: doc
---
# Assignment 4: Backend Design and Implementation

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

3. ```Posting[User]```

**State:** 
```
posts: set Post 
creator: one User
content: one String
options?: PostOptions
tags: string[]
```
*PostOptions consists of backgroundColor?: String

4. ```Grouping[User]```

**State:** 
```
groups: set Group
groupName: Group --> one String
author: Group --> one User
members: Group --> set User

```

5. ```Filtering[Posts]```

**State:** 
```
author: one String
name: one String
```

6. ```Quizzing```

**State:** 
```
quizzes: set Quiz
author: one User
tags: Quiz --> set String
question: Quiz --> one String
options: Quiz --> set String
answer: Quiz --> one String
```
## Data Model Diagram
![Data Model Diagram](/assets/ModelDiagram.png)

## Reflection
Building the backend for this project made me rethink some of my original design ideas, especially around filtering. Since filtering was tied to posts, I had to figure out how to structure it properly so that both concepts were separated. Instead, I went with a simpler approach: adding tags directly into the posting system. This way, I didn’t have to create a whole separate labeling system, which made everything easier to manage. I also decided to remove the implementation of filter groupings as I feel that I achieved the same goal through the use of the filtering concept. 

On the technical side, I ran into some issues with converting strings to ObjectId, which was needed to get data flowing properly from util.ts to routes.ts. I also had to add a getter to make sure the data from MongoDB showed up correctly on the frontend (localhost:3000). One more thing I had to keep in mind was using consistent variable names across all files, especially _id in concepting.ts.

## Backend Links
[Vercel](https://a4-eosin.vercel.app/)

[Codebase](https://github.com/EveSilf/A4)
